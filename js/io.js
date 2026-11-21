// ============================================================================
// Save File Importer (.json / .json.gz) & Netscript Buy-Order Exporter
// ============================================================================

/**
 * Generates and downloads a Bitburner Singularity `buy-augs.js` script
 * matching the current Optimal Buy Order schedule.
 */
function exportNetscript() {
  const sched = buildSchedule();
  if (!sched.length) {
    showToast('Select at least one augmentation (or NFG levels) first.', 'warn');
    return;
  }

  const plan = sched.map((step) => ({
    name: step.isNFG ? 'NeuroFlux Governor' : step.aug.name,
    factions: step.aug.factions
  }));

  const code = `/** @param {NS} ns */
export async function main(ns) {
  ns.disableLog("ALL");
  if (!ns.singularity || typeof ns.singularity.purchaseAugmentation !== "function") {
    ns.tprint("ERROR: Singularity API (Source-File 4) is not unlocked yet. Cannot auto-purchase augmentations.");
    return;
  }
  const plan = ${JSON.stringify(plan, null, 2)};
  let bought = 0, skipped = [];
  for (const step of plan) {
    try {
      const owned = ns.singularity.getOwnedAugmentations(true);
      if (step.name !== "NeuroFlux Governor" && owned.includes(step.name)) {
        ns.tprint(\`SKIP (Already owned/queued): \${step.name}\`);
        continue;
      }
      const prereqs = ns.singularity.getAugmentationPrereq(step.name);
      const missingPrereq = prereqs.find(p => !owned.includes(p));
      if (missingPrereq) {
        skipped.push(\`\${step.name} (missing prereq: \${missingPrereq})\`);
        continue;
      }
      const joined = ns.getPlayer().factions;
      const cost = ns.singularity.getAugmentationPrice(step.name);
      const reqRep = ns.singularity.getAugmentationRepReq(step.name);
      const validFac = step.factions.find(f => joined.includes(f) && ns.singularity.getFactionRep(f) >= reqRep);
      if (!validFac) {
        skipped.push(\`\${step.name} (need \${ns.formatNumber(reqRep)} rep in joined faction)\`);
        continue;
      }
      if (ns.getServerMoneyAvailable("home") < cost) {
        skipped.push(\`\${step.name} (need \${ns.formatNumber(cost)} cash)\`);
        continue;
      }
      if (ns.singularity.purchaseAugmentation(validFac, step.name)) {
        bought++;
        ns.tprint(\`SUCCESS: Purchased \${step.name} from \${validFac} for $\${ns.formatNumber(cost)}\`);
      } else {
        skipped.push(\`\${step.name} (purchase returned false)\`);
      }
    } catch (err) {
      skipped.push(\`\${step.name} (error: \${String(err)})\`);
    }
  }
  ns.tprint(\`=== DONE: Purchased \${bought}/\${plan.length} planned augmentations ===\`);
  if (skipped.length > 0) {
    ns.tprint("Could not purchase:");
    for (const s of skipped) ns.tprint(" - " + s);
  }
}`;

  const blob = new Blob([code], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'buy-augs.js';
  link.click();
  URL.revokeObjectURL(url);

  showToast(`Exported buy-augs.js (${plan.length} planned steps).`, 'success');
}

/**
 * Extracts a Source-File level from a Bitburner PlayerSave object,
 * handling array-of-tuples, JSONMap `{ ctor, data }`, or plain-object formats.
 * @param {object} player - Parsed PlayerSave data object.
 * @param {number} sfNum - Source-File number (e.g. 11 or 12).
 * @returns {number} Active Source-File level (0 if not owned).
 */
function extractSourceFileLevel(player, sfNum) {
  const overrideVal = player?.bitNodeOptions?.sourceFileOverrides?.data
    ? Object.fromEntries(player.bitNodeOptions.sourceFileOverrides.data)[sfNum]
    : undefined;
  if (typeof overrideVal === 'number') return overrideVal;

  const sf = player?.sourceFiles;
  if (!sf) return 0;
  const entries = Array.isArray(sf) ? sf : Array.isArray(sf.data) ? sf.data : Object.entries(sf);
  for (const [k, v] of entries) {
    if (Number(k) === sfNum) return Number(v) || 0;
  }
  return 0;
}

/**
 * Parses an uploaded Bitburner save file (.json or .json.gz) and imports
 * player cash, BitNode multipliers, SF11 price multiplier, joined factions,
 * faction reputation, owned augmentations, and cumulative NFG level.
 * @param {Event} ev - Change event from the `#saveFile` file input.
 * @returns {Promise<void>}
 */
async function loadSave(ev) {
  const file = ev.target.files[0];
  if (!file) return;

  try {
    const rawText = file.name.endsWith('.gz')
      ? await new Response(file.stream().pipeThrough(new DecompressionStream('gzip'))).text()
      : await file.text();

    const parsed = JSON.parse(rawText);
    const data = typeof parsed.data === 'string' ? JSON.parse(parsed.data) : (parsed.data || parsed);
    const playerSave = typeof data.PlayerSave === 'string' ? JSON.parse(data.PlayerSave) : (data.PlayerSave || {});
    const player = playerSave.data || playerSave;
    const factionsSave = typeof data.FactionsSave === 'string' ? JSON.parse(data.FactionsSave) : (data.FactionsSave || {});

    cash = Number(player.money) || 0;
    document.getElementById('cashIn').value = fmtM(cash);

    const bitNodeN = Number(player.bitNodeN) || 1;
    const sf11Lvl = extractSourceFileLevel(player, 11);
    const sf12Lvl = extractSourceFileLevel(player, 12);
    const bnMults = getBitNodeAugMults(bitNodeN, sf12Lvl);

    document.getElementById('bnRepIn').value = Number(bnMults.rep.toFixed(4));
    document.getElementById('bnCostIn').value = Number(bnMults.money.toFixed(4));

    const sf11Scales = [1, 0.96, 0.94, 0.93];
    const augMult = 1.9 * sf11Scales[Math.min(3, Math.max(0, sf11Lvl))];
    document.getElementById('multIn').value = Number(augMult.toFixed(4));

    const joinedSet = new Set(player.factions || []);
    const repMap = {};

    for (const [factionName, factionObj] of Object.entries(factionsSave)) {
      const parsedFaction = typeof factionObj === 'string' ? JSON.parse(factionObj) : factionObj;
      const factionData = parsedFaction.data || parsedFaction;
      if (factionData.isMember) joinedSet.add(factionName);
      if (typeof factionData.playerReputation === 'number') {
        repMap[factionName] = Math.floor(factionData.playerReputation);
      }
    }

    if (player.faction_rep) {
      for (const [factionName, repVal] of Object.entries(player.faction_rep)) {
        repMap[factionName] = Math.floor(repVal);
      }
    }

    FACTIONS.forEach((faction) => {
      faction.joined = joinedSet.has(faction.name);
      faction.rep = repMap[faction.name] || 0;
    });

    owned.clear();
    specialOwned.clear();
    let nfgLvl = 0;

    for (const key of ['augmentations', 'queuedAugmentations']) {
      if (Array.isArray(player[key])) {
        player[key].forEach((entry) => {
          const rawName = typeof entry === 'string' ? entry : entry?.name;
          const canon = resolveAugName(rawName);
          if (!canon) return;

          if (canon === 'NeuroFlux Governor') {
            if (entry && typeof entry.level === 'number') {
              nfgLvl = Math.max(nfgLvl, entry.level);
            } else {
              nfgLvl += 1;
            }
          } else if (augMap[canon]) {
            owned.add(canon);
            want.delete(canon);
          } else if (specialAugMap[canon]) {
            specialOwned.add(canon);
          }
        });
      }
    }

    document.getElementById('nfgBaseIn').value = nfgLvl;
    saveAndRender();

    const specialNote = specialOwned.size ? ` (+${specialOwned.size} special)` : '';
    showToast(
      `Loaded BN${bitNodeN} save! Cash: ${fmtM(cash)} | Joined: ${joinedSet.size} | Owned Augs: ${owned.size}${specialNote} | NFG Lvl: ${nfgLvl}`,
      'success'
    );
  } catch (err) {
    showToast('Error reading save: ' + err.message, 'error');
  } finally {
    // Allow re-selecting the same save file consecutively
    ev.target.value = '';
  }
}
