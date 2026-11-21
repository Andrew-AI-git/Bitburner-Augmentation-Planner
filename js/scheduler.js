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
 * Computes the minimum-cost purchase order for a target set of augmentations
 * while respecting prerequisite dependencies and NeuroFlux Governor scaling.
 * @param {Set<string>} targetSet - Selected augmentation names.
 * @param {number} mult - Per-purchase exponential cost multiplier (default 1.9).
 * @param {number} nfgCnt - Number of additional NeuroFlux Governor levels to append.
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

  const items = [...required].map((name) => augMap[name]);
  const inDegree = {};
  const children = {};

  items.forEach((item) => {
    inDegree[item.name] = 0;
    children[item.name] = [];
  });

  items.forEach((item) => {
    if (item.prereq && required.has(item.prereq)) {
      inDegree[item.name]++;
      children[item.prereq].push(item.name);
    }
  });

  // Priority equals the highest effective base price reachable down each prerequisite branch
  const memo = {};
  const priority = (name) => {
    if (memo[name] !== undefined) return memo[name];
    memo[name] = Math.max(getEffectivePrice(augMap[name]), ...children[name].map(priority));
    return memo[name];
  };

  const ready = items.filter((item) => inDegree[item.name] === 0);
  const schedule = [];

  while (ready.length) {
    ready.sort(
      (a, b) =>
        priority(b.name) - priority(a.name) ||
        getEffectivePrice(b) - getEffectivePrice(a) ||
        a.name.localeCompare(b.name)
    );
    const current = ready.shift();
    schedule.push({
      aug: current,
      reason: targetSet.has(current.name) ? 'Selected' : 'Auto-Prereq',
      basePrice: getEffectivePrice(current),
      reqRep: getEffectiveRep(current),
      isNFG: false
    });
    children[current.name].forEach((childName) => {
      if (--inDegree[childName] === 0) {
        ready.push(augMap[childName]);
      }
    });
  }

  // Append NeuroFlux Governor levels at the end using Bitburner's 1.14^(L-1) cost & rep scaling
  const nfgAug = augMap['NeuroFlux Governor'];
  const bnRepMult = getBnRepMult();
  const bnCostMult = getBnCostMult();
  for (let k = 0; k < nfgCnt; k++) {
    const lvlMinusOne = nfgBase + k;
    const levelMult = Math.pow(1.14, lvlMinusOne);
    schedule.push({
      aug: { ...nfgAug, name: `NeuroFlux Governor (Lvl ${lvlMinusOne + 1})` },
      reason: 'NFG Stack',
      basePrice: 750000 * levelMult * bnCostMult,
      reqRep: 500 * levelMult * bnRepMult,
      isNFG: true
    });
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
 * (`500 * 1.14^(L-1) * AugmentationRepCost`) and remaining post-cart cash
 * (`750000 * 1.14^(L-1) * AugmentationMoneyCost * mult^step`).
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
  const bnCostMult = getBnCostMult();

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

  // 2. Cash ceiling: cumulative 750k * 1.14^(nfgBase + k) * bnCostMult * mult^(regularCount + k) <= availCash
  let cashMaxAdd = 0;
  let cashMaxCost = 0;
  let nextCashCost = 750000 * Math.pow(1.14, nfgBase) * bnCostMult * Math.pow(mult, regularCount);
  while (cashMaxAdd < NFG_MAX_SEARCH_LEVELS) {
    const stepCost =
      750000 * Math.pow(1.14, nfgBase + cashMaxAdd) * bnCostMult * Math.pow(mult, regularCount + cashMaxAdd);
    if (cashMaxCost + stepCost <= availCash) {
      cashMaxCost += stepCost;
      cashMaxAdd++;
    } else {
      nextCashCost = stepCost;
      break;
    }
  }
  if (cashMaxAdd >= NFG_MAX_SEARCH_LEVELS) {
    nextCashCost =
      750000 * Math.pow(1.14, nfgBase + cashMaxAdd) * bnCostMult * Math.pow(mult, regularCount + cashMaxAdd);
  }

  // 3. Combined purchasable maximum
  const buyableMaxAdd = bestFaction ? Math.min(repMaxAdd, cashMaxAdd) : 0;
  let buyableCost = 0;
  for (let k = 0; k < buyableMaxAdd; k++) {
    buyableCost +=
      750000 * Math.pow(1.14, nfgBase + k) * bnCostMult * Math.pow(mult, regularCount + k);
  }

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
    const reason =
      cap.repMaxAdd === 0
        ? `need ${fmtN(cap.nextRepShortfall)} more rep at ${cap.bestFaction.name}`
        : `need ${fmtM(cap.nextCashCost - cap.availCash)} more remaining cash`;
    showToast(`0 additional NeuroFlux Governor levels affordable (${reason}).`, 'warn');
    return;
  }

  showToast(
    `Set NFG levels to +${cap.buyableMaxAdd} (Lvl ${cap.buyableMaxTotalLvl}) via ${cap.bestFaction.name} for ${fmtM(cap.buyableCost)}.`,
    'success'
  );
}

