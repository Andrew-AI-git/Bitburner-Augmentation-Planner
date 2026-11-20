// ============================================================================
// UI Rendering, Toast Notifications, Layout Controls & Event Delegation
// ============================================================================

/** @type {'auto'|'table'|'card'} Active layout mode */
let viewMode = localStorage.getItem('bb_view_mode') || 'auto';

/** @type {boolean} Collapsed state of the Factions & Reputation panel */
let facCollapsed = localStorage.getItem('bb_fac_collapsed') === '1';

/**
 * Displays a non-blocking status toast notification in the bottom-right corner.
 * @param {string} message - Plain text notification message.
 * @param {'info'|'success'|'warn'|'error'} [variant='info'] - Visual severity style.
 * @param {number} [durationMs=4500] - Auto-dismiss delay in milliseconds (0 = sticky).
 */
function showToast(message, variant = 'info', durationMs = 4500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${variant}`;

  const msgSpan = document.createElement('span');
  msgSpan.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'toast-close';
  closeBtn.setAttribute('aria-label', 'Dismiss notification');
  closeBtn.textContent = '×';

  const dismiss = () => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  };
  closeBtn.addEventListener('click', dismiss);

  toast.appendChild(msgSpan);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  if (durationMs > 0) {
    setTimeout(dismiss, durationMs);
  }
}

/**
 * Applies either Table or Card layout to `#augPanel` based on `viewMode` and viewport width.
 */
function applyResponsiveLayout() {
  const panel = document.getElementById('augPanel');
  const useCards = viewMode === 'card' || (viewMode === 'auto' && window.innerWidth < 1400);
  panel.classList.toggle('card-mode', useCards);

  document.getElementById('vAutoBtn').classList.toggle('active-view', viewMode === 'auto');
  document.getElementById('vTableBtn').classList.toggle('active-view', viewMode === 'table');
  document.getElementById('vCardBtn').classList.toggle('active-view', viewMode === 'card');
}

/**
 * Switches and persists the Table/Card layout preference.
 * @param {'auto'|'table'|'card'} mode - Selected layout mode.
 */
function setViewMode(mode) {
  viewMode = mode;
  localStorage.setItem('bb_view_mode', mode);
  applyResponsiveLayout();
}

/**
 * Toggles and persists the collapsible Factions panel state.
 */
function toggleFacPanel() {
  facCollapsed = !facCollapsed;
  localStorage.setItem('bb_fac_collapsed', facCollapsed ? '1' : '0');
  updateFacCollapseUI();
}

/**
 * Syncs the Factions panel body visibility and toggle button label.
 */
function updateFacCollapseUI() {
  const wrap = document.getElementById('facBodyWrap');
  const btn = document.getElementById('toggleFacBtn');
  wrap.classList.toggle('collapsed', facCollapsed);
  btn.innerHTML = facCollapsed ? '&#9656; Show Factions' : '&#9662; Hide Factions';
}

/**
 * Marks all factions as joined or unjoined and refreshes the planner.
 * @param {boolean} joined - Target joined state.
 */
function setAllFac(joined) {
  FACTIONS.forEach((faction) => {
    faction.joined = joined;
  });
  saveAndRender();
}

/**
 * Renders the Factions & Reputation grid according to `#fSearch`.
 */
function renderFac() {
  const query = document.getElementById('fSearch').value.toLowerCase();
  const container = document.getElementById('fBody');
  container.innerHTML = '';
  let joinedCount = 0;

  FACTIONS.forEach((faction, index) => {
    if (faction.joined) joinedCount++;
    if (query && !faction.name.toLowerCase().includes(query) && !faction.cat.toLowerCase().includes(query)) {
      return;
    }

    const safeName = escapeHtml(faction.name);
    const safeCat = escapeHtml(faction.cat);
    const item = document.createElement('div');
    item.className = 'fac-item' + (faction.joined ? ' joined' : '');
    item.innerHTML = `
      <div class="fac-left">
        <input type="checkbox" data-role="joined" data-faction-index="${index}" ${faction.joined ? 'checked' : ''}>
        <div class="fac-meta">
          <div class="fac-name" style="color:${faction.joined ? 'var(--text)' : 'var(--muted)'}" title="${safeName}">${safeName}</div>
          <div class="fac-cat">${safeCat}</div>
        </div>
      </div>
      <input class="rep-in" type="number" data-role="rep" data-faction-index="${index}" value="${faction.rep}" step="1000">
    `;
    container.appendChild(item);
  });

  document.getElementById('joinedFacCnt').textContent = joinedCount;
}

/**
 * Updates active Browser table sort column or flips direction, then re-renders.
 * @param {string} col - Sort key ('want'|'own'|'name'|'price'|'rep'|'stat').
 */
function sortBy(col) {
  if (sCol === col) sAsc = !sAsc;
  else {
    sCol = col;
    sAsc = true;
  }
  renderAug();
}

/**
 * Selects or deselects all currently filtered augmentations (excluding NFG).
 * @param {boolean} state - True to add to cart, false to remove.
 */
function bulkSelectFiltered(state) {
  lastFiltered.forEach((aug) => {
    if (aug.name === 'NeuroFlux Governor') return;
    if (state && !aug.own) want.add(aug.name);
    else want.delete(aug.name);
  });
  saveAndRender();
}

/**
 * Filters, sorts, and renders the Augmentation Browser table/cards.
 */
function renderAug() {
  const query = document.getElementById('aSearch').value.toLowerCase();
  const accessFilter = document.getElementById('accF').value;
  const tagFilter = document.getElementById('tagF').value;
  const hideOwned = document.getElementById('hideOwn').checked;
  let availCount = 0;

  const list = AUGS.map((aug) => {
    const inf = getInfo(aug);
    const own = owned.has(aug.name) && aug.name !== 'NeuroFlux Governor';
    if (inf.avail && !own) availCount++;
    return { ...aug, inf, own, w: want.has(aug.name) };
  });
  document.getElementById('availCnt').textContent = availCount;

  const filtered = list.filter((aug) => {
    if (hideOwned && aug.own) return false;
    if (accessFilter === 'avail' && !aug.inf.avail) return false;
    if (accessFilter === 'ready' && !aug.inf.ready) return false;
    if (tagFilter !== 'ALL' && aug.tag !== tagFilter) return false;
    if (query && !(aug.name + ' ' + aug.desc + ' ' + aug.factions.join(' ')).toLowerCase().includes(query)) {
      return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    let cmp = 0;
    if (sCol === 'want') cmp = (b.w ? 1 : 0) - (a.w ? 1 : 0);
    else if (sCol === 'own') cmp = (b.own ? 1 : 0) - (a.own ? 1 : 0);
    else if (sCol === 'name') cmp = a.name.localeCompare(b.name);
    else if (sCol === 'price') cmp = a.price - b.price;
    else if (sCol === 'rep') cmp = a.rep - b.rep;
    else if (sCol === 'stat') cmp = a.inf.short - b.inf.short;
    return sAsc ? cmp : -cmp;
  });
  lastFiltered = filtered;

  const tbody = document.getElementById('aBody');
  tbody.innerHTML = '';

  for (const aug of filtered) {
    const safeName = escapeHtml(aug.name);
    const isNFG = aug.name === 'NeuroFlux Governor';
    const statusBadge = aug.own
      ? '<span class="badge b-info">Owned</span>'
      : !aug.inf.avail
        ? '<span class="badge b-bad">Not Joined</span>'
        : aug.inf.ready
          ? `<span class="badge b-ok">Ready (${escapeHtml(aug.inf.best.name)})</span>`
          : `<span class="badge b-warn">Need ${fmtN(aug.inf.short)}</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Add to Cart">${
        isNFG
          ? '<span style="color:var(--muted)" title="Use NFG ADD LEVELS box above">Top</span>'
          : `<input type="checkbox" data-role="want" data-aug-name="${safeName}" ${aug.w ? 'checked' : ''} ${aug.own ? 'disabled' : ''}>`
      }</td>
      <td data-label="Owned">${
        isNFG
          ? '—'
          : `<input type="checkbox" data-role="own" data-aug-name="${safeName}" ${aug.own ? 'checked' : ''}>`
      }</td>
      <td class="card-title">
        <div style="font-weight:bold;color:${aug.w ? 'var(--accent)' : 'var(--text)'}">${safeName}</div>
        <span class="badge b-info" style="font-size:10px">${escapeHtml(aug.tag)}</span>
      </td>
      <td data-label="Base Price" class="nowrap">${fmtM(aug.price)}</td>
      <td data-label="Rep Req" class="nowrap">${fmtN(aug.rep)}</td>
      <td data-label="Status">${statusBadge}</td>
      <td data-label="Prereq" class="text-muted-sm">${aug.prereq ? escapeHtml(aug.prereq) : '—'}</td>
      <td data-label="Factions" class="col-factions">${escapeHtml(aug.factions.join(', '))}</td>
      <td data-label="Effects" class="col-effects${aug.lore ? ' has-lore' : ''}"${aug.lore ? ` title="${escapeHtml(aug.lore)}"` : ''}>${escapeHtml(aug.desc)}</td>
    `;
    tbody.appendChild(tr);
  }
}

/**
 * Computes and renders the Optimal Buy Order table and summary stat counters.
 */
function renderOrd() {
  const sched = buildSchedule();
  const tbody = document.getElementById('oBody');
  tbody.innerHTML = '';
  let runningTotal = 0;

  sched.forEach((step, idx) => {
    runningTotal = step.runningTotal;
    const inf = getInfo(step.aug, step.reqRep);
    const repBadge = !inf.avail
      ? '<span class="badge b-bad">Join Faction</span>'
      : inf.ready
        ? '<span class="badge b-ok">Ready</span>'
        : `<span class="badge b-warn">Need ${fmtN(inf.short)}</span>`;

    const bestFactionText = inf.best
      ? `${escapeHtml(inf.best.name)} (${fmtN(inf.maxR)} rep)`
      : escapeHtml(step.aug.factions.slice(0, 3).join(', '));

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td data-label="Step" style="color:var(--blue);font-weight:bold">#${idx + 1}</td>
      <td class="card-title" style="font-weight:bold">${escapeHtml(step.aug.name)}</td>
      <td data-label="Type"><span class="badge ${step.reason === 'Selected' ? 'b-ok' : 'b-warn'}">${escapeHtml(step.reason)}</span></td>
      <td data-label="Base Price" class="nowrap">${fmtM(step.basePrice)}</td>
      <td data-label="Actual Cost" class="nowrap" style="color:var(--accent);font-weight:bold">${fmtM(step.actualCost)}</td>
      <td data-label="Running Total" class="nowrap">${fmtM(runningTotal)}</td>
      <td data-label="Rep Status">${repBadge}</td>
      <td data-label="Best Faction" class="col-factions">${bestFactionText}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('cntStat').textContent = sched.length;
  document.getElementById('ordCnt').textContent = sched.length;
  document.getElementById('costStat').textContent = fmtM(runningTotal);

  const remaining = cash - runningTotal;
  const remEl = document.getElementById('remStat');
  remEl.textContent = fmtM(remaining);
  remEl.style.color = remaining >= 0 ? 'var(--accent)' : 'var(--danger)';
}

/**
 * Switches between the Augmentation Browser and Optimal Buy Order tabs.
 * @param {'aug'|'ord'} activeTab - Tab identifier.
 */
function tab(activeTab) {
  document.getElementById('tAug').classList.toggle('active', activeTab === 'aug');
  document.getElementById('tOrd').classList.toggle('active', activeTab === 'ord');
  document.getElementById('vAug').style.display = activeTab === 'aug' ? 'block' : 'none';
  document.getElementById('vOrd').style.display = activeTab === 'ord' ? 'block' : 'none';
}

/**
 * Saves current state to localStorage and re-renders all planner views.
 */
function saveAndRender() {
  saveState();
  renderFac();
  renderAug();
  renderOrd();
}

/**
 * Wires all static control listeners and delegated container listeners.
 */
function bindEvents() {
  // Top bar actions & stat inputs
  document.getElementById('saveFile').addEventListener('change', loadSave);
  document.getElementById('autoFillBtn').addEventListener('click', autoFillHighestRep);
  document.getElementById('exportBtn').addEventListener('click', exportNetscript);
  document.getElementById('resetBtn').addEventListener('click', resetStorage);

  document.getElementById('cashIn').addEventListener('change', parseCash);
  document.getElementById('multIn').addEventListener('change', saveAndRender);
  document.getElementById('nfgIn').addEventListener('change', saveAndRender);
  document.getElementById('nfgBaseIn').addEventListener('change', saveAndRender);

  // Factions panel controls & delegated faction grid listener
  document.getElementById('toggleFacBtn').addEventListener('click', toggleFacPanel);
  document.getElementById('fSearch').addEventListener('input', renderFac);
  document.getElementById('joinAllBtn').addEventListener('click', () => setAllFac(true));
  document.getElementById('joinNoneBtn').addEventListener('click', () => setAllFac(false));

  document.getElementById('fBody').addEventListener('change', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLInputElement)) return;
    const idx = parseInt(target.dataset.factionIndex, 10);
    if (Number.isNaN(idx) || !FACTIONS[idx]) return;

    if (target.dataset.role === 'joined') {
      FACTIONS[idx].joined = target.checked;
      saveAndRender();
    } else if (target.dataset.role === 'rep') {
      FACTIONS[idx].rep = parseFloat(target.value) || 0;
      saveAndRender();
    }
  });

  // Tabs & layout switcher
  document.getElementById('tAug').addEventListener('click', () => tab('aug'));
  document.getElementById('tOrd').addEventListener('click', () => tab('ord'));
  document.getElementById('vAutoBtn').addEventListener('click', () => setViewMode('auto'));
  document.getElementById('vTableBtn').addEventListener('click', () => setViewMode('table'));
  document.getElementById('vCardBtn').addEventListener('click', () => setViewMode('card'));

  // Augmentation Browser filters & bulk actions
  document.getElementById('aSearch').addEventListener('input', renderAug);
  document.getElementById('accF').addEventListener('change', renderAug);
  document.getElementById('tagF').addEventListener('change', renderAug);
  document.getElementById('hideOwn').addEventListener('change', renderAug);
  document.getElementById('selectFilteredBtn').addEventListener('click', () => bulkSelectFiltered(true));
  document.getElementById('deselectFilteredBtn').addEventListener('click', () => bulkSelectFiltered(false));
  document.getElementById('clearCartBtn').addEventListener('click', () => {
    want.clear();
    saveAndRender();
  });

  // Delegated sortable headers for Augmentation Browser
  document.getElementById('augTableHead').addEventListener('click', (ev) => {
    const th = ev.target.closest('th[data-sort]');
    if (th) sortBy(th.dataset.sort);
  });

  // Delegated Buy / Own checkboxes in Augmentation Browser
  document.getElementById('aBody').addEventListener('change', (ev) => {
    const target = ev.target;
    if (!(target instanceof HTMLInputElement)) return;
    const augName = target.dataset.augName;
    if (!augName) return;

    if (target.dataset.role === 'want') {
      if (target.checked) want.add(augName);
      else want.delete(augName);
      saveAndRender();
    } else if (target.dataset.role === 'own') {
      if (target.checked) {
        owned.add(augName);
        want.delete(augName);
      } else {
        owned.delete(augName);
      }
      saveAndRender();
    }
  });

  window.addEventListener('resize', applyResponsiveLayout);
}

/**
 * Bootstraps saved state, layout preferences, event delegation, and initial render.
 */
function initApp() {
  loadState();
  updateFacCollapseUI();
  applyResponsiveLayout();
  bindEvents();
  renderFac();
  renderAug();
  renderOrd();
}

document.addEventListener('DOMContentLoaded', initApp);
