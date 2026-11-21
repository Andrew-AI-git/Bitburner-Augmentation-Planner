// ============================================================================
// Scheduling Engine, Availability Calculator & Highest-Rep Auto-Fill
// ============================================================================

/**
 * Evaluates faction availability and reputation readiness for an augmentation.
 * @param {object} aug - Augmentation record from AUGS.
 * @param {number} [reqRepOverride] - Optional reputation override (used for NFG scaling).
 * @returns {{
 *   avail: boolean,
 *   best: {name: string, cat: string, joined: boolean, rep: number}|null,
 *   maxR: number,
 *   ready: boolean,
 *   short: number
 * }} Availability and reputation gap details.
 */
function getInfo(aug, reqRepOverride) {
  const reqRep = reqRepOverride !== undefined ? reqRepOverride : getEffectiveRep(aug);
  const factionByName = Object.fromEntries(FACTIONS.map((f) => [f.name, f]));
  const joinedProviders = aug.factions
    .map((name) => factionByName[name])
    .filter((f) => f && f.joined);

  let best = null;
  let maxR = -1;
  for (const faction of joinedProviders) {
    if (faction.rep > maxR) {
      maxR = faction.rep;
      best = faction;
    }
  }

  return {
    avail: joinedProviders.length > 0,
    best,
    maxR,
    ready: joinedProviders.length > 0 && maxR >= reqRep,
    short: joinedProviders.length > 0 ? Math.max(0, reqRep - maxR) : reqRep
  };
}

/**
 * Computes the discounted chain-weight (Sidney/Horn priority index) for an ordered
 * sequence of purchases under exponential cost scaling `mult^step`.
 * Minimizing `sum(basePrice_i * mult^i)` across independent blocks is achieved by
 * ordering blocks in descending order of this exact equivalent flat price.
 * Uses `beta = 1 / mult` when `mult > 1` to avoid floating-point overflow on large stacks.
 * @param {Array<{basePrice: number}>} seq - Ordered step sequence within a block.
 * @param {number} mult - Per-purchase exponential cost multiplier.
 * @returns {number} Equivalent discounted block weight.
 */
function computeChainWeight(seq, mult) {
  const len = seq.length;
  if (len === 0) return 0;
  if (len === 1) return seq[0].basePrice;

  if (Math.abs(mult - 1) < 1e-9) {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += seq[i].basePrice;
    return sum / len;
  }

  if (mult > 1) {
    const beta = 1 / mult;
    let weightedSum = 0;
    let betaPow = beta;
    for (let i = len - 1; i >= 0; i--) {
      weightedSum += seq[i].basePrice * betaPow;
      betaPow *= beta;
    }
    // At loop exit, betaPow equals beta^(len + 1), so beta^len = betaPow / beta = betaPow * mult
    const betaLen = betaPow * mult;
    const denom = 1 - betaLen;
    return denom > 0 ? ((mult - 1) * weightedSum) / denom : seq[0].basePrice;
  }

  let weightedSum = 0;
  let mPow = 1;
  for (let i = 0; i < len; i++) {
    weightedSum += seq[i].basePrice * mPow;
    mPow *= mult;
  }
  return ((1 - mult) * weightedSum) / (1 - mPow);
}

/**
 * Computes the minimum-cost purchase order for a target set of augmentations
 * and additional NeuroFlux Governor levels while respecting prerequisite dependencies
 * and Bitburner's shared `mult^step` exponential price scaling.
 * @param {Set<string>} targetSet - Selected augmentation names.
 * @param {number} mult - Per-purchase exponential cost multiplier (default 1.9).
 * @param {number} nfgCnt - Number of additional NeuroFlux Governor levels to include.
 * @param {number} nfgBase - Current installed/queued NeuroFlux Governor level.
 * @returns {{schedule: Array<object>, totalCost: number}} Ordered buy steps and total cost.
 */
function computeScheduleForSet(targetSet, mult, nfgCnt, nfgBase) {
  const required = new Set();

  const addWithPrereqs = (name) => {
    if (!augMap[name] || owned.has(name) || required.has(name) || name === 'NeuroFlux Governor') {
      return;
    }
    required.add(name);
    if (augMap[name].prereq) {
      addWithPrereqs(augMap[name].prereq);
    }
  };

  targetSet.forEach(addWithPrereqs);

  // Build active scheduling blocks for regular augmentations
  const blockById = new Map();
  const ownerBlock = new Map();

  for (const name of required) {
    const aug = augMap[name];
    const prereqId = aug.prereq && required.has(aug.prereq) ? aug.prereq : null;
    const step = {
      aug,
      reason: targetSet.has(name) ? 'Selected' : 'Auto-Prereq',
      basePrice: getEffectivePrice(aug),
      reqRep: getEffectiveRep(aug),
      isNFG: false
    };
    const blk = {
      id: name,
      seq: [step],
      prereqId,
      childrenIds: new Set(),
      w: step.basePrice
    };
    blockById.set(name, blk);
    ownerBlock.set(name, blk);
  }

  for (const blk of blockById.values()) {
    if (blk.prereqId) {
      ownerBlock.get(blk.prereqId).childrenIds.add(blk.id);
    }
  }

  // Contract prerequisite subtrees using Sidney/Horn discounted chain-weight:
  // whenever a child block has higher weight than its parent block, it must follow
  // its parent immediately in the optimal order, so merge it into the parent block.
  while (true) {
    let bestChild = null;
    for (const blk of blockById.values()) {
      if (!blk.prereqId) continue;
      const parentBlk = ownerBlock.get(blk.prereqId);
      if (blk.w > parentBlk.w && (!bestChild || blk.w > bestChild.w)) {
        bestChild = blk;
      }
    }
    if (!bestChild) break;

    const parentBlk = ownerBlock.get(bestChild.prereqId);
    parentBlk.childrenIds.delete(bestChild.id);
    for (const step of bestChild.seq) {
      parentBlk.seq.push(step);
      ownerBlock.set(step.aug.name, parentBlk);
    }
    for (const grandchildId of bestChild.childrenIds) {
      parentBlk.childrenIds.add(grandchildId);
    }
    parentBlk.w = computeChainWeight(parentBlk.seq, mult);
    blockById.delete(bestChild.id);
  }

  // Model selected NeuroFlux Governor levels (1.14^(L-1)) as a single strictly-increasing
  // prerequisite block so its exact discounted chain-weight interleaves NFG ahead of $0
  // and cheaper augmentations while keeping costlier augmentations first.
  if (nfgCnt > 0) {
    const nfgAug = augMap['NeuroFlux Governor'];
    const bnRepMult = getBnRepMult();
    const bnCostMult = getBnCostMult();
    const nfgSeq = [];
    for (let k = 0; k < nfgCnt; k++) {
      const lvlMinusOne = nfgBase + k;
      const levelMult = Math.pow(1.14, lvlMinusOne);
      nfgSeq.push({
        aug: { ...nfgAug, name: `NeuroFlux Governor (Lvl ${lvlMinusOne + 1})` },
        reason: 'NFG Stack',
        basePrice: 750000 * levelMult * bnCostMult,
        reqRep: 500 * levelMult * bnRepMult,
        isNFG: true
      });
    }
    blockById.set('__NFG_BLOCK__', {
      id: '__NFG_BLOCK__',
      seq: nfgSeq,
      prereqId: null,
      childrenIds: new Set(),
      w: computeChainWeight(nfgSeq, mult)
    });
  }

  const ready = [];
  for (const blk of blockById.values()) {
    if (!blk.prereqId) ready.push(blk);
  }

  const schedule = [];
  while (ready.length) {
    ready.sort(
      (a, b) =>
        b.w - a.w ||
        b.seq[0].basePrice - a.seq[0].basePrice ||
        (a.seq[0].isNFG ? 1 : 0) - (b.seq[0].isNFG ? 1 : 0) ||
        a.seq[0].aug.name.localeCompare(b.seq[0].aug.name)
    );
    const current = ready.shift();
    for (const step of current.seq) {
      schedule.push(step);
    }
    for (const childId of current.childrenIds) {
      const childBlk = blockById.get(childId);
      if (childBlk) ready.push(childBlk);
    }
  }

  let totalCost = 0;
  schedule.forEach((step, idx) => {
    step.actualCost = step.basePrice * Math.pow(mult, idx);
    totalCost += step.actualCost;
    step.runningTotal = totalCost;
  });

  return { schedule, totalCost };
}

/**
 * Builds the buy-order schedule for the current UI cart and settings.
 * @returns {Array<object>} Ordered buy steps.
 */
function buildSchedule() {
  return computeScheduleForSet(want, getMult(), getNfgCnt(), getNfgBase()).schedule;
}

/**
 * Automatically selects the largest affordable set of ready augmentations,
 * prioritizing higher reputation requirements when budget permits.
 */
function autoFillHighestRep() {
  if (cash <= 0) {
    showToast('Please enter your Current Cash (or load a save file) before running Auto-Fill.', 'warn');
    return;
  }

  const mult = getMult();

  const canChain = (aug) => {
    let cur = aug;
    while (cur) {
      if (owned.has(cur.name)) break;
      const info = getInfo(cur);
      if (!info.ready) return false;
      cur = cur.prereq ? augMap[cur.prereq] : null;
    }
    return true;
  };

  const candidates = AUGS.filter(
    (aug) => aug.name !== 'NeuroFlux Governor' && !owned.has(aug.name) && canChain(aug)
  );

  if (!candidates.length) {
    showToast('No unowned augmentations meet both your Joined Faction and Reputation requirements.', 'warn');
    return;
  }

  // Pass 1: maximize total count by adding lowest effective base-price items first (rep desc tie-break)
  const byCountAndRep = [...candidates].sort(
    (a, b) => getEffectivePrice(a) - getEffectivePrice(b) || getEffectiveRep(b) - getEffectiveRep(a)
  );
  let chosen = new Set();

  for (const cand of byCountAndRep) {
    if (chosen.has(cand.name)) continue;
    const trial = new Set(chosen);
    trial.add(cand.name);
    const { totalCost } = computeScheduleForSet(trial, mult, 0, getNfgBase());
    if (totalCost <= cash) {
      chosen = trial;
    }
  }

  // Pass 2: fill any remaining budget prioritizing highest reputation requirements
  const byHighestRep = [...candidates].sort(
    (a, b) => getEffectiveRep(b) - getEffectiveRep(a) || getEffectivePrice(a) - getEffectivePrice(b)
  );
  for (const cand of byHighestRep) {
    if (chosen.has(cand.name)) continue;
    const trial = new Set(chosen);
    trial.add(cand.name);
    const { totalCost } = computeScheduleForSet(trial, mult, 0, getNfgBase());
    if (totalCost <= cash) {
      chosen = trial;
    }
  }

  want = chosen;
  document.getElementById('nfgIn').value = 0;
  saveAndRender();

  const result = computeScheduleForSet(want, mult, 0, getNfgBase());
  showToast(
    `Auto-Fill complete! Selected ${result.schedule.length} augmentations (including prerequisites) for ${fmtM(result.totalCost)}.`,
    'success'
  );
}

/** @type {number} Upper safety bound for iterative NFG capacity calculation */
const NFG_MAX_SEARCH_LEVELS = 500;

/**
 * Computes maximum purchasable additional NeuroFlux Governor (NFG) levels
 * constrained by both the highest-rep NFG-eligible joined faction
 * (`500 * 1.14^(L-1) * AugmentationRepCost`) and exact post-sort schedule cash
 * via binary search on `computeScheduleForSet`.
 * @param {Set<string>} [targetSet=want] - Selected regular augmentations in cart.
 * @param {number} [mult=getMult()] - Augmentation price multiplier.
 * @param {number} [nfgBase=getNfgBase()] - Current installed/queued NFG level.
 * @returns {{
 *   nfgBase: number,
 *   bestFaction: {name: string, cat: string, joined: boolean, rep: number}|null,
 *   regularCount: number,
 *   regularCost: number,
 *   availCash: number,
 *   repMaxAdd: number,
 *   repMaxTotalLvl: number,
 *   nextRepReq: number,
 *   nextRepShortfall: number,
 *   cashMaxAdd: number,
 *   cashMaxTotalLvl: number,
 *   cashMaxCost: number,
 *   nextCashCost: number,
 *   buyableMaxAdd: number,
 *   buyableMaxTotalLvl: number,
 *   buyableCost: number,
 *   bottleneck: 'no-faction'|'rep'|'cash'|'cap'|'even'
 * }} NFG scaling capacity snapshot.
 */
function computeNfgCapacity(targetSet = want, mult = getMult(), nfgBase = getNfgBase()) {
  const baseSched = computeScheduleForSet(targetSet, mult, 0, nfgBase);
  const regularCount = baseSched.schedule.length;
  const regularCost = baseSched.totalCost;
  const availCash = Math.max(0, cash - regularCost);

  const bnRepMult = getBnRepMult();

  const nfgAug = augMap['NeuroFlux Governor'];
  const nfgInfo = getInfo(nfgAug);
  const bestFaction = nfgInfo.best;

  // 1. Reputation ceiling: 500 * 1.14^(nfgBase + k) * bnRepMult <= bestFaction.rep
  let repMaxAdd = 0;
  let nextRepReq = 500 * Math.pow(1.14, nfgBase) * bnRepMult;
  if (bestFaction) {
    while (repMaxAdd < NFG_MAX_SEARCH_LEVELS) {
      const req = 500 * Math.pow(1.14, nfgBase + repMaxAdd) * bnRepMult;
      if (bestFaction.rep >= req) {
        repMaxAdd++;
      } else {
        nextRepReq = req;
        break;
      }
    }
    if (repMaxAdd >= NFG_MAX_SEARCH_LEVELS) {
      nextRepReq = 500 * Math.pow(1.14, nfgBase + repMaxAdd) * bnRepMult;
    }
  }
  const nextRepShortfall = bestFaction ? Math.max(0, nextRepReq - bestFaction.rep) : nextRepReq;

  // 2. Cash ceiling: binary search exact sorted schedule totalCost <= cash
  let cashMaxAdd = 0;
  let cashMaxTotalCost = regularCost;
  if (cash > regularCost) {
    const maxSched = computeScheduleForSet(targetSet, mult, NFG_MAX_SEARCH_LEVELS, nfgBase);
    if (maxSched.totalCost <= cash) {
      cashMaxAdd = NFG_MAX_SEARCH_LEVELS;
      cashMaxTotalCost = maxSched.totalCost;
    } else {
      let low = 0;
      let high = NFG_MAX_SEARCH_LEVELS - 1;
      while (low < high) {
        const mid = (low + high + 1) >> 1;
        const midSched = computeScheduleForSet(targetSet, mult, mid, nfgBase);
        if (midSched.totalCost <= cash) {
          low = mid;
          cashMaxTotalCost = midSched.totalCost;
        } else {
          high = mid - 1;
        }
      }
      cashMaxAdd = low;
    }
  }

  const cashMaxCost = Math.max(0, cashMaxTotalCost - regularCost);
  const nextSched = computeScheduleForSet(targetSet, mult, cashMaxAdd + 1, nfgBase);
  const nextCashCost = Math.max(0, nextSched.totalCost - cashMaxTotalCost);

  // 3. Combined purchasable maximum
  const buyableMaxAdd = bestFaction ? Math.min(repMaxAdd, cashMaxAdd) : 0;
  const buyableCost =
    buyableMaxAdd === 0
      ? 0
      : buyableMaxAdd === cashMaxAdd
        ? cashMaxCost
        : Math.max(0, computeScheduleForSet(targetSet, mult, buyableMaxAdd, nfgBase).totalCost - regularCost);

  let bottleneck = 'even';
  if (!bestFaction) {
    bottleneck = 'no-faction';
  } else if (repMaxAdd >= NFG_MAX_SEARCH_LEVELS && cashMaxAdd >= NFG_MAX_SEARCH_LEVELS) {
    bottleneck = 'cap';
  } else if (repMaxAdd < cashMaxAdd) {
    bottleneck = 'rep';
  } else if (cashMaxAdd < repMaxAdd) {
    bottleneck = 'cash';
  }

  return {
    nfgBase,
    bestFaction,
    regularCount,
    regularCost,
    availCash,
    repMaxAdd,
    repMaxTotalLvl: nfgBase + repMaxAdd,
    nextRepReq,
    nextRepShortfall,
    cashMaxAdd,
    cashMaxTotalLvl: nfgBase + cashMaxAdd,
    cashMaxCost,
    nextCashCost,
    buyableMaxAdd,
    buyableMaxTotalLvl: nfgBase + buyableMaxAdd,
    buyableCost,
    bottleneck
  };
}

/**
 * Sets `NFG ADD LEVELS (+)` to the maximum combined buyable NFG levels
 * and displays a non-blocking status toast explaining the result.
 */
function applyMaxNfg() {
  const cap = computeNfgCapacity();
  document.getElementById('nfgIn').value = cap.buyableMaxAdd;
  saveAndRender();

  if (!cap.bestFaction) {
    showToast('Join an NFG-eligible faction first (Bladeburners, Church of the Machine God, and SoA do not offer NFG).', 'warn');
    return;
  }

  if (cap.buyableMaxAdd === 0) {
    const shortfall = Math.max(0, cap.regularCost + cap.nextCashCost - cash);
    const reason =
      cap.repMaxAdd === 0
        ? `need ${fmtN(cap.nextRepShortfall)} more rep at ${cap.bestFaction.name}`
        : `need ${fmtM(shortfall)} more cash`;
    showToast(`0 additional NeuroFlux Governor levels affordable (${reason}).`, 'warn');
    return;
  }

  showToast(
    `Set NFG levels to +${cap.buyableMaxAdd} (Lvl ${cap.buyableMaxTotalLvl}) via ${cap.bestFaction.name} for ${fmtM(cap.buyableCost)}.`,
    'success'
  );
}

