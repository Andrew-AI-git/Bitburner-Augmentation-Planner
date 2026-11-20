// ============================================================================
// Application State, Formatting Utilities & LocalStorage Persistence
// ============================================================================

/** @type {string} LocalStorage key for planner state */
const STORE_KEY = 'bb_aug_planner_gh_v3';

/** @type {Set<string>} Augmentation names selected for purchase */
let want = new Set();

/** @type {Set<string>} Augmentation names already owned/installed (Browser catalog) */
let owned = new Set();

/** @type {Set<string>} Non-faction special/Grafting/Labyrinth augmentations recognized from saves */
let specialOwned = new Set();

/** @type {number} Player's current cash balance */
let cash = 0;

/** @type {string} Active Browser table sort column */
let sCol = 'price';

/** @type {boolean} Active Browser table sort direction (true = ascending) */
let sAsc = true;

/** @type {Array<object>} Most recent filtered Browser list for bulk selection */
let lastFiltered = [];

/**
 * Formats a dollar amount using Bitburner shorthand suffixes (k, m, b, t, q).
 * @param {number} n - Numeric dollar value.
 * @returns {string} Formatted currency string (e.g. "$1.250b").
 */
function fmtM(n) {
  if (!n) return '$0';
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1e15) return sign + '$' + (abs / 1e15).toFixed(3) + 'q';
  if (abs >= 1e12) return sign + '$' + (abs / 1e12).toFixed(3) + 't';
  if (abs >= 1e9) return sign + '$' + (abs / 1e9).toFixed(3) + 'b';
  if (abs >= 1e6) return sign + '$' + (abs / 1e6).toFixed(3) + 'm';
  if (abs >= 1e3) return sign + '$' + (abs / 1e3).toFixed(2) + 'k';
  return sign + '$' + Math.round(abs).toLocaleString();
}

/**
 * Formats a reputation or integer count with locale thousand separators.
 * @param {number} n - Numeric value.
 * @returns {string} Rounded locale-formatted string.
 */
function fmtN(n) {
  return Math.round(n).toLocaleString();
}

/**
 * Escapes HTML special characters for safe interpolation inside templates.
 * @param {string} str - Raw string.
 * @returns {string} HTML-escaped string.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Reads the augmentation price multiplier from the top input bar.
 * @returns {number} Multiplier (defaults to 1.9).
 */
function getMult() {
  return parseFloat(document.getElementById('multIn').value) || 1.9;
}

/**
 * Reads the number of additional NeuroFlux Governor levels to append.
 * @returns {number} Non-negative integer count.
 */
function getNfgCnt() {
  return Math.max(0, parseInt(document.getElementById('nfgIn').value, 10) || 0);
}

/**
 * Reads the player's current installed/queued NeuroFlux Governor level.
 * @returns {number} Non-negative integer level.
 */
function getNfgBase() {
  return Math.max(0, parseInt(document.getElementById('nfgBaseIn').value, 10) || 0);
}

/**
 * Parses the cash input field (supporting k/m/b/t/q suffixes), updates `cash`,
 * formats the input display, and persists/re-renders.
 */
function parseCash() {
  const input = document.getElementById('cashIn');
  const raw = input.value.trim().toLowerCase().replace(/[$,]/g, '');
  const multipliers = { k: 1e3, m: 1e6, b: 1e9, t: 1e12, q: 1e15 };
  const suffix = raw.slice(-1);
  const mult = multipliers[suffix];

  cash = mult ? (parseFloat(raw.slice(0, -1)) * mult || 0) : (parseFloat(raw) || 0);
  input.value = fmtM(cash);
  saveAndRender();
}

/**
 * Serializes current planner state into localStorage.
 */
function saveState() {
  try {
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        cash,
        mult: getMult(),
        nfg: getNfgCnt(),
        nfgBase: getNfgBase(),
        factions: FACTIONS.map((f) => [f.name, f.joined ? 1 : 0, f.rep]),
        want: [...want],
        owned: [...owned],
        specialOwned: [...specialOwned]
      })
    );
  } catch (err) {
    // Ignore storage quota or privacy-mode errors
  }
}

/**
 * Hydrates planner state from localStorage if available, automatically migrating
 * any legacy augmentation names to their canonical official Bitburner names.
 */
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY));
    if (!saved) return;

    cash = saved.cash || 0;
    document.getElementById('cashIn').value = fmtM(cash);

    if (saved.mult) document.getElementById('multIn').value = saved.mult;
    if (saved.nfg !== undefined) document.getElementById('nfgIn').value = saved.nfg;
    if (saved.nfgBase !== undefined) document.getElementById('nfgBaseIn').value = saved.nfgBase;

    if (saved.factions) {
      const factionByName = Object.fromEntries(saved.factions.map((entry) => [entry[0], entry]));
      FACTIONS.forEach((faction) => {
        const entry = factionByName[faction.name];
        if (entry) {
          faction.joined = !!entry[1];
          faction.rep = entry[2] || 0;
        }
      });
    }

    let migrated = false;

    if (Array.isArray(saved.want)) {
      want = new Set();
      for (const rawName of saved.want) {
        const canon = resolveAugName(rawName);
        if (canon && augMap[canon]) {
          want.add(canon);
          if (canon !== rawName) migrated = true;
        } else if (rawName) {
          migrated = true;
        }
      }
    }

    if (Array.isArray(saved.owned)) {
      owned = new Set();
      specialOwned = new Set();
      for (const rawName of saved.owned) {
        const canon = resolveAugName(rawName);
        if (canon && augMap[canon]) {
          owned.add(canon);
          if (canon !== rawName) migrated = true;
        } else if (canon && specialAugMap[canon]) {
          specialOwned.add(canon);
          if (canon !== rawName) migrated = true;
        } else if (rawName) {
          migrated = true;
        }
      }
    }

    if (Array.isArray(saved.specialOwned)) {
      for (const rawName of saved.specialOwned) {
        const canon = resolveAugName(rawName);
        if (canon && specialAugMap[canon]) {
          specialOwned.add(canon);
          if (canon !== rawName) migrated = true;
        }
      }
    }

    if (migrated) {
      saveState();
    }
  } catch (err) {
    // Ignore corrupted storage payloads
  }
}

/**
 * Clears persisted planner state and reloads the page to defaults.
 */
function resetStorage() {
  localStorage.removeItem(STORE_KEY);
  location.reload();
}
