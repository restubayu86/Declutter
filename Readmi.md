# ClearSpace — Declutter App 🏠

Aplikasi PWA untuk decluttering dengan sinkronisasi Google Sheets via Apps Script.

## Fitur
- ✦ Tambah, edit, hapus barang
- 📂 9 kategori default (Pakaian, Elektronik, Buku, Perabot, Dapur, Mainan, Dokumen, Olahraga, Lainnya)
- 🏷️ 4 keputusan: **Keep**, **Donasi**, **Buang**, **Jual**
- 💰 Estimasi harga jual per barang
- 📊 Statistik ringkasan
- 🔍 Search & filter kategori/keputusan
- ☁️ Sinkron ke Google Sheets
- 📱 PWA — bisa diinstall di HP
- 🔌 Offline support (Service Worker)

## Cara Deploy ke GitHub Pages

1. Buat repo baru di GitHub, misal `clearspace-app`
2. Upload semua file **kecuali** `Code.gs` ke repo
3. GitHub repo Settings → Pages → Branch: `main`, folder: `/ (root)` → Save
4. Akses di: `https://<username>.github.io/clearspace-app`

## Cara Setup Google Apps Script

1. Buka [script.google.com](https://script.google.com) → New Project
2. Hapus kode default, paste isi `Code.gs`
3. Klik **Deploy** → **New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Klik **Deploy** → authorize → copy URL
5. Di aplikasi ClearSpace, klik icon ⚙️ → paste URL → Simpan

Data akan tersimpan otomatis ke Google Sheets setiap kali ada perubahan.

## Struktur File
```
clearspace-app/
├── index.html      ← App utama
├── styles.css      ← Styling
├── app.js          ← Logic JavaScript
├── manifest.json   ← PWA manifest
├── sw.js           ← Service Worker
├── Code.gs         ← Google Apps Script (upload terpisah)
└── README.md
```

## Ikon PWA (opsional)
Buat folder `icons/` dan tambahkan:
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)

Bisa generate gratis di [favicon.io](https://favicon.io)
