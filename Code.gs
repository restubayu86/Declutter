// =============================================
// ClearSpace — Google Apps Script Backend
// File: Code.gs
// Deploy sebagai Web App (akses: Anyone)
// =============================================

const SHEET_NAME = 'Items';
const HEADERS = ['ID', 'Nama', 'Kategori', 'Keputusan', 'Kondisi', 'Harga Jual', 'Catatan', 'Tanggal'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.action === 'sync') {
      syncItems(body.items);
      return jsonResponse({ success: true, message: 'Synced ' + body.items.length + ' items' });
    }
    return jsonResponse({ success: false, message: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ success: false, message: err.toString() });
  }
}

function doGet(e) {
  const action = e.parameter.action || 'list';
  if (action === 'list') {
    const items = getItems();
    return jsonResponse({ success: true, items });
  }
  return jsonResponse({ success: false, message: 'Unknown action' });
}

function syncItems(items) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  // Buat sheet baru jika belum ada
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    styleHeader(sheet);
  }

  // Clear semua data kecuali header
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, HEADERS.length).clearContent();
  }

  if (!items || items.length === 0) return;

  // Tulis ulang semua data
  const rows = items.map(item => [
    item.id || '',
    item.name || '',
    item.cat || '',
    item.action ? item.action.toUpperCase() : '',
    formatCond(item.cond),
    item.action === 'jual' ? (item.price || 0) : '',
    item.note || '',
    item.ts ? new Date(item.ts).toLocaleString('id-ID') : ''
  ]);

  sheet.getRange(2, 1, rows.length, HEADERS.length).setValues(rows);
  colorActionRows(sheet, items);
  autoResizeColumns(sheet);
}

function getItems() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  return data.slice(1).map(row => ({
    id: row[0],
    name: row[1],
    cat: row[2],
    action: row[3] ? row[3].toLowerCase() : '',
    cond: row[4],
    price: row[5] || 0,
    note: row[6],
    ts: row[7]
  }));
}

// =============================================
// STYLING
// =============================================
function styleHeader(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setBackground('#1c1917');
  headerRange.setFontColor('#f5f0e8');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
}

function colorActionRows(sheet, items) {
  const colors = {
    keep: '#d8f3dc',
    donasi: '#ede9fe',
    buang: '#ffe4e6',
    jual: '#fef3c7'
  };

  items.forEach((item, idx) => {
    const row = idx + 2;
    const color = colors[item.action] || '#ffffff';
    sheet.getRange(row, 1, 1, HEADERS.length).setBackground(color);
  });
}

function autoResizeColumns(sheet) {
  for (let i = 1; i <= HEADERS.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

function formatCond(cond) {
  const map = { baik: '✅ Baik', rusak_ringan: '⚠️ Rusak Ringan', rusak: '❌ Rusak' };
  return map[cond] || cond || '';
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// =============================================
// CARA DEPLOY:
// 1. Buka script.google.com → New Project
// 2. Paste seluruh kode ini ke Code.gs
// 3. Klik Deploy → New Deployment
// 4. Type: Web App
// 5. Execute as: Me
// 6. Who has access: Anyone
// 7. Deploy → Copy URL
// 8. Paste URL di aplikasi ClearSpace → Settings
// =============================================
