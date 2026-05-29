// ClearSpace — Declutter App v2
// Kategori berdasarkan ruangan + Panduan dari tabel

const STORAGE_KEY = 'clearspace_items';
const GAS_KEY = 'clearspace_gas_url';

// ==========================================
// KATEGORI: berdasarkan RUANGAN
// ==========================================
const CAT_ICONS = {
  kamar_mandi: '🚿', dapur: '🍳', laundry: '👗',
  lemari_pakaian: '👔', kamar_tidur: '🛏️', ruang_tamu: '🛋️',
  gudang: '🏚️', lainnya: '📦'
};

const CAT_LABELS = {
  kamar_mandi: 'Kamar Mandi', dapur: 'Dapur', laundry: 'Laundry',
  lemari_pakaian: 'Lemari Pakaian', kamar_tidur: 'Kamar Tidur',
  ruang_tamu: 'Ruang Tamu', gudang: 'Gudang', lainnya: 'Lainnya'
};

const ACTION_ICONS = { keep: '🏠', donasi: '💝', buang: '🗑️', jual: '💰' };
const COND_LABELS = { baik: '✅ Baik', rusak_ringan: '⚠️ Rusak Ringan', rusak: '❌ Rusak' };

// ==========================================
// PANDUAN DECLUTTER per RUANGAN (dari tabel)
// ==========================================
const GUIDE = {
  kamar_mandi: {
    label: 'Kamar Mandi/WC',
    icon: '🚿',
    items: [
      { no:1,  name: 'Botol sampo bocor',      action: 'Tidak layak' },
      { no:2,  name: 'Botol sabun kosong',      action: 'Menumpuk' },
      { no:3,  name: 'Obat kadaluarsa',         action: 'Sedang dipakai' },
      { no:4,  name: 'Sikat gigi lama',         action: '>3 bulan' },
      { no:5,  name: 'Parfum kosong',           action: 'Tidak dipakai' },
      { no:6,  name: 'Botol',                   action: 'Kotor' },
      { no:7,  name: 'Gayung pecah',            action: 'Tidak nyaman' },
      { no:8,  name: 'Rak berkarat',            action: 'Sulit dibersihkan' },
      { no:9,  name: 'Handuk kusut',            action: 'Bau/kusam' },
      { no:10, name: 'Produk diskon',           action: 'Tidak terpakai' },
      { no:11, name: 'Sisir patah',             action: 'Rusak' },
      { no:12, name: 'Sample skincare',         action: 'Menumpuk' },
      { no:13, name: 'Sabun banyak jenis',      action: 'Duplikat' },
      { no:14, name: 'Sabun berlebih',          action: 'Terlalu banyak' },
      { no:15, name: 'Selang air',              action: 'Tidak berfungsi' },
      { no:16, name: 'Alat cuir lika',          action: 'Tumpul' },
      { no:17, name: 'Kapas lama',              action: 'Kotor' },
      { no:18, name: 'Botol cream duplikat',    action: 'Kadaluarsa' },
      { no:19, name: 'Obat lama',               action: 'Kadaluarsa' },
    ]
  },
  dapur: {
    label: 'Dapur',
    icon: '🍳',
    items: [
      { no:1,  name: 'Piring retak',            action: 'Tidak aman' },
      { no:2,  name: 'Gelas pecah',             action: 'Retak' },
      { no:3,  name: 'Ember bocor',             action: 'Tidak layak' },
      { no:4,  name: 'Pwangg kosong',           action: 'Tidak dipakai' },
      { no:5,  name: 'Botol plastik',           action: 'Berkibihan' },
      { no:6,  name: 'Pisau tumpul',            action: 'Tidak dipakai' },
      { no:7,  name: 'Talenan jamuran',         action: 'Sulit dibersihkan' },
      { no:8,  name: 'Tutup panci tanpa panci', action: 'Tidak lengkap' },
      { no:9,  name: 'Tutup tanpa wadah',       action: 'Tidak terpakai' },
      { no:10, name: 'Botol plastik',           action: 'Berkibihan' },
      { no:11, name: 'Botol kecap',             action: 'Habis' },
      { no:12, name: 'Saos lama',               action: 'Kadaluarsa' },
      { no:13, name: 'Plastik belanja',         action: 'Berlebihan' },
      { no:14, name: 'Sedotan banyak',          action: 'Jarang dipakai' },
      { no:15, name: 'Plastik laundry',         action: 'Menumpuk' },
      { no:16, name: 'Handuk dapur',            action: 'Kusam' },
      { no:17, name: 'Spons lama',              action: 'Bau' },
      { no:18, name: 'Lap dapur kusam',         action: 'Terlalu lusuh' },
      { no:19, name: 'Alat dapur duplikat',     action: 'Terlalu banyak dipakai' },
    ]
  },
  laundry: {
    label: 'Laundry',
    icon: '👗',
    items: [
      { no:1,  name: 'Hanger bengkok',          action: 'Tidak stabil' },
      { no:2,  name: 'Ember bocor',             action: 'Tidak layak' },
      { no:3,  name: 'Detergen lama',           action: 'Menggumpal' },
      { no:4,  name: 'Pewangi kosong',          action: 'Tidak dipakai' },
      { no:5,  name: 'Botol kain banyak',       action: 'Berkibihan' },
      { no:6,  name: 'Kain lap banyak',         action: 'Berkibihan' },
      { no:7,  name: 'Jemuran rusak',           action: 'Tidak stabil' },
      { no:8,  name: 'Jepitan pakaian',         action: 'Tidak layak' },
      { no:9,  name: 'Sikat baju rusak',        action: 'Bulu habis' },
      { no:10, name: 'Kabel mesin cuci rusak',  action: 'Bahaya' },
      { no:11, name: 'Selang bocor',            action: 'Tidak efisien' },
      { no:12, name: 'Deterjen banyak merek',   action: 'Tidak efisien' },
      { no:13, name: 'Plastik laundry',         action: 'Menumpuk' },
      { no:14, name: 'Plastik tali hilang',     action: 'Menumpuk' },
      { no:15, name: 'Kantung belanja lama',    action: 'Kusam' },
      { no:16, name: 'Handuk laundry',          action: 'Kusam' },
      { no:17, name: 'Karung belakang',         action: 'Tidak berguna' },
      { no:18, name: 'Papan gosok lama',        action: 'Tidak berguna' },
    ]
  },
  lemari_pakaian: {
    label: 'Lemari Pakaian',
    icon: '👔',
    items: [
      { no:1,  name: 'Baju koleksi',            action: 'Tidak must' },
      { no:2,  name: 'Baju kebesaran',          action: 'Tidak dipakai' },
      { no:3,  name: 'Baju kotor',              action: 'Kotor' },
      { no:4,  name: 'Celana sobek',            action: 'Rusak' },
      { no:5,  name: 'Baju dalam cacat',        action: 'Tidak layak' },
      { no:6,  name: 'Kaos tidak disukai',      action: 'Tidak nyaman' },
      { no:7,  name: 'Kaos laki bolong',        action: 'Rusak' },
      { no:8,  name: 'Baju promosi',            action: 'Tidak dipakai' },
      { no:9,  name: 'Seragam lama',            action: 'Tidak dipakai' },
      { no:10, name: 'Obat lama',               action: 'Kadaluarsa' },
      { no:11, name: 'Mislah lama',             action: 'Menumpuk' },
      { no:12, name: 'Ikat pinggang retak',     action: 'Pecah' },
      { no:13, name: 'Sol lepas',               action: 'Tidak layak' },
      { no:14, name: 'Sandal lama',             action: 'Tidak nyaman' },
      { no:15, name: 'Olahraga lama',           action: 'Tidak nyaman' },
      { no:16, name: 'Aksesoris rusak',         action: 'Tidak dipakai' },
      { no:17, name: 'Baju sentimental',        action: 'Tidak dipakai' },
      { no:18, name: 'Plastik pembungkus',      action: 'Menumpuk' },
    ]
  },
  kamar_tidur: {
    label: 'Kamar Tidur',
    icon: '🛏️',
    items: [
      { no:1,  name: 'Charger tidak berfungsi', action: 'Tidak dipakai' },
      { no:2,  name: 'Kabel tidak jelas',       action: 'Tidak dipakai' },
      { no:3,  name: 'Kardus kosong',           action: 'Tidak dipakai' },
      { no:4,  name: 'Sprei kusam',             action: 'Rusak' },
      { no:5,  name: 'Bantal kotor sobek',      action: 'Tidak layak' },
      { no:6,  name: 'Pajangan dobuan',         action: 'Tidak jelas' },
      { no:7,  name: 'Boneka lama',             action: 'Menumpuk' },
      { no:8,  name: 'Lampu rusak',             action: 'Tidak berfungsi' },
      { no:9,  name: 'Mislah lama',             action: 'Menumpuk' },
      { no:10, name: 'Obat lama lebih banyak',  action: 'Menumpuk' },
      { no:11, name: 'Kipas kecil rusak',       action: 'Tidak berfungsi' },
      { no:12, name: 'Kertas catatan lama',     action: 'Tidak penting' },
      { no:13, name: 'Barang anti dipakai',     action: 'Tidak jelas' },
    ]
  },
  ruang_tamu: {
    label: 'Ruang Tamu',
    icon: '🛋️',
    items: [
      { no:1,  name: 'Dekorasi berlibihan',     action: 'Tidak penting' },
      { no:2,  name: 'Majalah lama',            action: 'Menumpuk' },
      { no:3,  name: 'Remote kontrol',          action: 'Tidak jelas' },
      { no:4,  name: 'Kabel semrawut',          action: 'Tidak jelas' },
      { no:5,  name: 'Vas bunga rusak',         action: 'Tidak dipakai' },
      { no:6,  name: 'Kalender lama',           action: 'Tidak relevan' },
      { no:7,  name: 'Mainan anak',             action: 'Menghambat' },
      { no:8,  name: 'Tanaman mati',            action: 'Tidak terawat' },
      { no:9,  name: 'Karpet kusam',            action: 'Sulit dibersihkan' },
      { no:10, name: 'Sofa rusak',              action: 'Tidak nyaman' },
      { no:11, name: 'Bantal sofa berlebih',    action: 'Tidak dipakai' },
      { no:12, name: 'Helm lama',               action: 'Rusak' },
      { no:13, name: 'Kolom lama banyak',       action: 'Tidak relevan' },
      { no:14, name: 'Peralatan proyek lama',   action: 'Tidak relevan' },
    ]
  },
  gudang: {
    label: 'Gudang',
    icon: '🏚️',
    items: [
      { no:1,  name: 'Kardus bekas',            action: 'Tidak diperlukan' },
      { no:2,  name: 'Barang rusak',            action: 'Tidak diperlukan' },
      { no:3,  name: 'Kabel random',            action: 'Tidak diperlukan' },
      { no:4,  name: 'Sparpart lama',           action: 'Tidak diperlukan' },
      { no:5,  name: 'Cat sisa lama',           action: 'Kering' },
      { no:6,  name: 'Paku/strip retak',        action: 'Tidak terorganisasi' },
      { no:7,  name: 'Helm lama',               action: 'Tidak aman' },
      { no:8,  name: 'Mesin rusak',             action: 'Tidak diperlukan' },
      { no:9,  name: 'Kopor rusak',             action: 'Tidak diperlukan' },
      { no:10, name: 'Tanaman mati',            action: 'Tidak terawat' },
      { no:11, name: 'Elektronik mati',         action: 'Tidak diperlukan' },
      { no:12, name: 'Alat lama',               action: 'Tidak aman' },
      { no:13, name: 'Furniture rusak',         action: 'Tidak diperlukan' },
      { no:14, name: 'Kaya silos',              action: 'Menumpuk' },
      { no:15, name: 'Barang mystery box',      action: 'Tidak diketahui' },
    ]
  }
};

let items = [];
let currentFilter = 'all';
let currentAction = null;
let currentSort = 'newest';
let editId = null;

/* ==============================
   INIT
============================== */
document.addEventListener('DOMContentLoaded', () => {
  loadItems();
  document.getElementById('gas-url').value = localStorage.getItem(GAS_KEY) || '';
});

/* ==============================
   SPLASH
============================== */
function closeSplash() {
  const s = document.getElementById('splash');
  s.classList.add('exit');
  setTimeout(() => {
    s.classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    renderItems();
  }, 500);
}

/* ==============================
   DATA LAYER
============================== */
function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    items = raw ? JSON.parse(raw) : getSampleItems();
  } catch { items = getSampleItems(); }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  updateStats();
}

function getSampleItems() {
  return [
    { id: uid(), name: 'Kemeja kotak-kotak lama', cat: 'lemari_pakaian', action: 'donasi', cond: 'baik', price: 0, note: 'Masih bagus tapi sudah jarang dipakai', ts: Date.now() - 3e5 },
    { id: uid(), name: 'Charger HP lama', cat: 'kamar_tidur', action: 'buang', cond: 'rusak', price: 0, note: 'Tidak berfungsi', ts: Date.now() - 1e5 },
    { id: uid(), name: 'Piring retak', cat: 'dapur', action: 'buang', cond: 'rusak', price: 0, note: '', ts: Date.now() - 5e5 },
    { id: uid(), name: 'Deterjen lama menggumpal', cat: 'laundry', action: 'buang', cond: 'rusak', price: 0, note: 'Sudah menggumpal', ts: Date.now() - 8e5 },
    { id: uid(), name: 'Sikat gigi > 3 bulan', cat: 'kamar_mandi', action: 'buang', cond: 'rusak', price: 0, note: 'Sudah terlalu lama', ts: Date.now() - 2e5 },
    { id: uid(), name: 'Sofa tamu masih bagus', cat: 'ruang_tamu', action: 'keep', cond: 'baik', price: 0, note: '', ts: Date.now() - 9e5 },
    { id: uid(), name: 'Kardus bekas tumpukan', cat: 'gudang', action: 'buang', cond: 'baik', price: 0, note: 'Tidak diperlukan lagi', ts: Date.now() - 4e5 },
  ];
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

/* ==============================
   RENDER
============================== */
function renderItems() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  let list = [...items];

  if (currentFilter !== 'all') list = list.filter(i => i.cat === currentFilter);
  if (currentAction) list = list.filter(i => i.action === currentAction);
  if (query) list = list.filter(i =>
    i.name.toLowerCase().includes(query) ||
    (i.note && i.note.toLowerCase().includes(query))
  );

  if (currentSort === 'newest') list.sort((a,b) => b.ts - a.ts);
  else if (currentSort === 'oldest') list.sort((a,b) => a.ts - b.ts);
  else if (currentSort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));

  const grid = document.getElementById('items-grid');
  const empty = document.getElementById('empty-state');

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  grid.innerHTML = list.map((item, idx) => `
    <div class="item-card" style="animation-delay:${idx*0.04}s" onclick="openDrawer('${item.id}')">
      <button class="item-del-btn" onclick="event.stopPropagation();deleteItem('${item.id}')" title="Hapus">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <span class="item-cat-icon">${CAT_ICONS[item.cat] || '📦'}</span>
      <div class="item-cat-name">${CAT_LABELS[item.cat] || item.cat}</div>
      <div class="item-name">${escHtml(item.name)}</div>
      <div class="item-badges">
        <span class="action-badge ${item.action}">${ACTION_ICONS[item.action]} ${item.action.toUpperCase()}</span>
        <span class="cond-badge">${COND_LABELS[item.cond] || ''}</span>
        ${item.action === 'jual' && item.price ? `<div class="item-price">Rp ${fmt(item.price)}</div>` : ''}
      </div>
    </div>
  `).join('');
}

function updateStats() {
  const cnt = { keep: 0, donasi: 0, buang: 0, jual: 0 };
  items.forEach(i => { if (cnt[i.action] !== undefined) cnt[i.action]++; });
  document.getElementById('cnt-keep').textContent = cnt.keep;
  document.getElementById('cnt-donate').textContent = cnt.donasi;
  document.getElementById('cnt-trash').textContent = cnt.buang;
  document.getElementById('cnt-sell').textContent = cnt.jual;
}

/* ==============================
   FILTERS
============================== */
function setCategory(el, cat) {
  document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  currentFilter = cat;
  currentAction = null;
  renderItems();
}

function filterByAction(action) {
  currentAction = (currentAction === action) ? null : action;
  currentFilter = 'all';
  document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-cat="all"]').classList.add('active');
  renderItems();
}

const sorts = ['newest', 'oldest', 'name'];
const sortLabels = { newest: 'Terbaru', oldest: 'Terlama', name: 'A-Z' };
let sortIdx = 0;
function cycleSort() {
  sortIdx = (sortIdx + 1) % sorts.length;
  currentSort = sorts[sortIdx];
  document.getElementById('sort-label').textContent = sortLabels[currentSort];
  renderItems();
}

/* ==============================
   ADD / EDIT MODAL
============================== */
function openAddModal(prefillCat) {
  editId = null;
  document.getElementById('modal-add-title').textContent = '✦ Tambah Barang';
  clearForm();
  if (prefillCat) document.getElementById('f-cat').value = prefillCat;
  document.getElementById('modal-add').classList.remove('hidden');
}

function closeAddModal() {
  document.getElementById('modal-add').classList.add('hidden');
  clearForm();
}

function clearForm() {
  document.getElementById('f-name').value = '';
  document.getElementById('f-cat').value = '';
  document.getElementById('f-cond').value = 'baik';
  document.getElementById('f-note').value = '';
  document.getElementById('f-price').value = '';
  document.getElementById('f-id').value = '';
  document.getElementById('price-group').style.display = 'none';
  document.querySelectorAll('.action-pick').forEach(b => b.classList.remove('selected'));
}

function pickAction(el) {
  document.querySelectorAll('.action-pick').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  const isSell = el.dataset.action === 'jual';
  document.getElementById('price-group').style.display = isSell ? 'block' : 'none';
}

function saveItem() {
  const name = document.getElementById('f-name').value.trim();
  const cat = document.getElementById('f-cat').value;
  const cond = document.getElementById('f-cond').value;
  const note = document.getElementById('f-note').value.trim();
  const price = parseFloat(document.getElementById('f-price').value) || 0;
  const actionEl = document.querySelector('.action-pick.selected');

  if (!name) return toast('⚠️ Nama barang wajib diisi');
  if (!cat) return toast('⚠️ Pilih ruangan dulu');
  if (!actionEl) return toast('⚠️ Pilih keputusan dulu');

  const action = actionEl.dataset.action;

  if (editId) {
    const idx = items.findIndex(i => i.id === editId);
    if (idx > -1) items[idx] = { ...items[idx], name, cat, action, cond, price, note, ts: Date.now() };
    toast('✅ Barang diperbarui');
  } else {
    items.unshift({ id: uid(), name, cat, action, cond, price, note, ts: Date.now() });
    toast('✅ Barang ditambahkan');
  }

  persist();
  renderItems();
  closeAddModal();
  syncGas();
}

function deleteItem(id) {
  if (!confirm('Hapus barang ini?')) return;
  items = items.filter(i => i.id !== id);
  persist();
  renderItems();
  toast('🗑️ Barang dihapus');
  syncGas();
}

/* ==============================
   DRAWER (ITEM DETAIL)
============================== */
function openDrawer(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;

  document.getElementById('drawer-content').innerHTML = `
    <div class="modal-handle"></div>
    <span class="drawer-cat-icon">${CAT_ICONS[item.cat] || '📦'}</span>
    <div class="drawer-cat-label">${CAT_LABELS[item.cat] || item.cat}</div>
    <h2 class="drawer-name">${escHtml(item.name)}</h2>
    <div class="drawer-meta">
      <div class="drawer-field">
        <div class="drawer-field-label">Keputusan</div>
        <div class="drawer-field-val">
          <span class="action-badge ${item.action}">${ACTION_ICONS[item.action]} ${item.action.toUpperCase()}</span>
        </div>
      </div>
      <div class="drawer-field">
        <div class="drawer-field-label">Ruangan</div>
        <div class="drawer-field-val">${CAT_ICONS[item.cat]} ${CAT_LABELS[item.cat] || item.cat}</div>
      </div>
      <div class="drawer-field">
        <div class="drawer-field-label">Kondisi</div>
        <div class="drawer-field-val">${COND_LABELS[item.cond] || '-'}</div>
      </div>
      ${item.action === 'jual' ? `
      <div class="drawer-field">
        <div class="drawer-field-label">Harga Jual</div>
        <div class="drawer-field-val" style="color:var(--sell)">Rp ${fmt(item.price)}</div>
      </div>` : `
      <div class="drawer-field">
        <div class="drawer-field-label">Ditambahkan</div>
        <div class="drawer-field-val" style="font-size:0.85rem">${fmtDate(item.ts)}</div>
      </div>`}
    </div>
    ${item.note ? `<div class="drawer-note">📝 ${escHtml(item.note)}</div>` : ''}
    <div class="drawer-actions">
      <button class="drawer-btn-edit" onclick="openEditFromDrawer('${item.id}')">✏️ Edit</button>
      <button class="drawer-btn-del" onclick="deleteFromDrawer('${item.id}')">🗑️ Hapus</button>
    </div>
  `;

  document.getElementById('drawer').classList.remove('hidden');
}

function openEditFromDrawer(id) {
  document.getElementById('drawer').classList.add('hidden');
  const item = items.find(i => i.id === id);
  if (!item) return;
  editId = id;
  document.getElementById('modal-add-title').textContent = '✏️ Edit Barang';
  document.getElementById('f-name').value = item.name;
  document.getElementById('f-cat').value = item.cat;
  document.getElementById('f-cond').value = item.cond;
  document.getElementById('f-note').value = item.note;
  document.getElementById('f-price').value = item.price || '';
  document.getElementById('f-id').value = item.id;
  document.querySelectorAll('.action-pick').forEach(b => {
    b.classList.toggle('selected', b.dataset.action === item.action);
  });
  document.getElementById('price-group').style.display = item.action === 'jual' ? 'block' : 'none';
  document.getElementById('modal-add').classList.remove('hidden');
}

function deleteFromDrawer(id) {
  document.getElementById('drawer').classList.add('hidden');
  setTimeout(() => deleteItem(id), 200);
}

/* ==============================
   PANDUAN DECLUTTER MODAL
============================== */
function openGuide() {
  const keys = Object.keys(GUIDE);
  document.getElementById('guide-content').innerHTML = `
    <div class="guide-tabs">
      ${keys.map((k, i) => `
        <button class="guide-tab ${i===0?'active':''}" data-room="${k}" onclick="switchGuideTab(this,'${k}')">
          ${GUIDE[k].icon} <span>${GUIDE[k].label}</span>
        </button>
      `).join('')}
    </div>
    <div id="guide-table-wrap">
      ${renderGuideTable(keys[0])}
    </div>
  `;
  document.getElementById('modal-guide').classList.remove('hidden');
}

function switchGuideTab(el, room) {
  document.querySelectorAll('.guide-tab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('guide-table-wrap').innerHTML = renderGuideTable(room);
}

function renderGuideTable(room) {
  const g = GUIDE[room];
  if (!g) return '';
  return `
    <div class="guide-room-header">
      <span class="guide-room-icon">${g.icon}</span>
      <div>
        <div class="guide-room-title">${g.label}</div>
        <div class="guide-room-sub">${g.items.length} barang yang perlu dicek</div>
      </div>
      <button class="guide-add-all-btn" onclick="importGuideItems('${room}')">+ Tambah Semua</button>
    </div>
    <div class="guide-list">
      ${g.items.map(item => `
        <div class="guide-item">
          <div class="guide-item-num">${item.no}</div>
          <div class="guide-item-body">
            <div class="guide-item-name">${item.name}</div>
            <div class="guide-item-reason">Declutter jika: <em>${item.action}</em></div>
          </div>
          <button class="guide-item-add" onclick="addFromGuide('${room}','${item.no}')" title="Tambah ke daftar">+</button>
        </div>
      `).join('')}
    </div>
  `;
}

function addFromGuide(room, no) {
  const g = GUIDE[room];
  const gi = g.items.find(i => String(i.no) === String(no));
  if (!gi) return;
  document.getElementById('modal-guide').classList.add('hidden');
  setTimeout(() => {
    openAddModal(room);
    document.getElementById('f-name').value = gi.name;
    document.getElementById('f-note').value = 'Declutter jika: ' + gi.action;
  }, 300);
}

function importGuideItems(room) {
  const g = GUIDE[room];
  let added = 0;
  g.items.forEach(gi => {
    const exists = items.find(i => i.name === gi.name && i.cat === room);
    if (!exists) {
      items.unshift({ id: uid(), name: gi.name, cat: room, action: 'buang', cond: 'baik', price: 0, note: 'Declutter jika: ' + gi.action, ts: Date.now() - (added * 1000) });
      added++;
    }
  });
  persist();
  renderItems();
  document.getElementById('modal-guide').classList.add('hidden');
  toast(`✅ ${added} barang dari ${g.label} ditambahkan`);
}

/* ==============================
   STATS MODAL
============================== */
function openStats() {
  const total = items.length;
  const byCat = {};
  const byAction = { keep: 0, donasi: 0, buang: 0, jual: 0 };
  let totalValue = 0;

  items.forEach(i => {
    byCat[i.cat] = (byCat[i.cat] || 0) + 1;
    byAction[i.action] = (byAction[i.action] || 0) + 1;
    if (i.action === 'jual') totalValue += (i.price || 0);
  });

  const catEntries = Object.entries(byCat).sort((a,b) => b[1]-a[1]);

  document.getElementById('stats-content').innerHTML = `
    <div class="stats-row"><span class="s-label">Total Barang</span><span class="s-val">${total}</span></div>
    <div class="stats-row"><span class="s-label">🏠 Keep</span><span class="s-val" style="color:var(--keep)">${byAction.keep}</span></div>
    <div class="stats-row"><span class="s-label">💝 Donasi</span><span class="s-val" style="color:var(--donate)">${byAction.donasi}</span></div>
    <div class="stats-row"><span class="s-label">🗑️ Buang</span><span class="s-val" style="color:var(--trash)">${byAction.buang}</span></div>
    <div class="stats-row"><span class="s-label">💰 Dijual (Est.)</span><span class="s-val" style="color:var(--sell)">Rp ${fmt(totalValue)}</span></div>
    ${catEntries.length ? `
    <h4 style="margin:20px 0 10px;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted)">Per Ruangan</h4>
    <div class="cat-bar">
      ${catEntries.map(([cat, cnt]) => `
        <div class="cat-bar-item">
          <div class="cat-bar-label">
            <span>${CAT_ICONS[cat] || '📦'} ${CAT_LABELS[cat] || cat}</span>
            <span>${cnt}</span>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width:${Math.round(cnt/total*100)}%"></div>
          </div>
        </div>
      `).join('')}
    </div>` : ''}
  `;
  document.getElementById('modal-stats').classList.remove('hidden');
}

/* ==============================
   SETTINGS / GAS
============================== */
function openSettings() {
  document.getElementById('modal-settings').classList.remove('hidden');
}

function saveGasUrl() {
  const url = document.getElementById('gas-url').value.trim();
  if (!url) return toast('⚠️ URL tidak boleh kosong');
  if (!url.startsWith('https://script.google.com')) return toast('⚠️ URL tidak valid');
  localStorage.setItem(GAS_KEY, url);
  toast('✅ URL disimpan, menyinkron...');
  document.getElementById('modal-settings').classList.add('hidden');
  syncGas(true);
}

async function syncGas(showResult = false) {
  const url = localStorage.getItem(GAS_KEY);
  if (!url) return;
  try {
    const body = JSON.stringify({ action: 'sync', items });
    const res = await fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'text/plain' } });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    if (showResult) toast('☁️ Data berhasil disinkron ke Google Sheets!');
  } catch (e) {
    if (showResult) toast('❌ Gagal sinkron: ' + e.message);
  }
}

/* ==============================
   CLOSE MODAL BACKDROP
============================== */
function closeModal(e) {
  if (e.target === e.currentTarget) {
    e.currentTarget.classList.add('hidden');
  }
}

/* ==============================
   HELPERS
============================== */
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.add('hidden'), 2800);
}

function fmt(n) { return Number(n).toLocaleString('id-ID'); }
function fmtDate(ts) { return new Date(ts).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }
function capitalize(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
function escHtml(str) { return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => {}); });
}
