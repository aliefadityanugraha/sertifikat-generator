# Sistem Generate E-Sertifikat Pondok Ramadhan

Aplikasi berbasis web untuk memudahkan pencarian, verifikasi, dan pengunduhan e-Sertifikat kegiatan Pondok Ramadhan secara mandiri oleh peserta didik. Dibangun dengan antar muka yang premium, ringan, dan terintegrasi langsung dengan database Google Sheets melalui Google Apps Script.

![Banner](public/og-image.svg)

## 🌟 Fitur Utama

- **Pencarian Cerdas:** Mencari data peserta berdasarkan kecocokan Nama dan Kelas.
- **Pratinjau Langsung (Live Preview):** Peserta dapat melihat bentuk sertifikat mereka sebelum diunduh.
- **Generate PDF Mandiri:** Dokumen PDF beresolusi tinggi langsung di-generate di perangkat pengguna _(Client-side rendering)_ untuk mengurangi beban biaya server menggunakan `html2canvas` dan `jspdf`.
- **Desain Premium responsif:** UI/UX modern bertemakan _Malam Ramadhan_ menggunakan TailwindCSS, desain _glassmorphism_, dan tipografi elegan Google Fonts (Plus Jakarta Sans & Playfair Display).
- **Admin Dashboard Lengkap:** Akses tersembunyi bagi panitia untuk melakukan (CRUD) manajemen data peserta dan cetak massal secara real-time.
- **Serverless Backend:** Tidak memerlukan database SQL/NoSQL terpisah. 100% menggunakan Google Sheets dan Google Apps Script (Gratis & Kuota Besar).

## 🚀 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **PDF Generation:** [html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://raw.githack.com/MrRio/jsPDF/master/docs/index.html)
- **Backend / Database:** Google Apps Script API + Google Sheets Spreadsheet
- **Routing:** Vue Router
- **Icons:** SVG Native & Tailwind Icons

## 📁 Struktur Direktori Penting

```text
aplikasi-sertifikat-ponrom/
├── public/                 # Aset statis (Favicon, OG Image)
├── src/
│   ├── assets/             # Aset gambar & template sertifikat utama (template.png)
│   ├── components/         # Komponen UI Vue (CertificatePreview, AdminLayout)
│   ├── data/               # Data hardcoded (contoh: kelas.json untuk dropdown list)
│   ├── pages/              # Halaman Utama (PublicPage, AdminLogin, AdminDashboard)
│   ├── services/           # Service Integrasi (api.js, auth.js)
│   ├── utils/              # Skrip Helper (certificateGenerator.js)
│   ├── App.vue             # Root komponen
│   └── main.js             # Entry point aplikasi utama
├── index.html              # Template HTML utama + SEO meta tags
├── tailwind.config.js      # Konfigurasi kustom tema, warna, dan font Tailwind
└── package.json            # Daftar dependensi modul NPM
```

## 🛠️ Panduan Instalasi (Development)

Pastikan Anda sudah menginstal NodeJS versi LTS (Versi 18+ disarankan).

1. **Kloning/Unduh repositori ini** ke komputer lokal Anda.
2. Buka terminal pada folder proyek, lalu instal ketergantungannya:
   ```bash
   npm install
   ```
3. Jalankan server lokal untuk tahap _development_:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:5173` di peramban Anda.

## 🗄️ Konfigurasi Backend (Google Apps Script)

Proyek ini mengambil data dari Google Sheets. Jika Anda ingin menggunakan database sendiri:

1. Buat **Google Sheet Baru** dengan _header_ pada baris ke-1 secara tepat:
   - Kolom A: `ID`
   - Kolom B: `NAMA`
   - Kolom C: `KELAS`
   - Kolom D: `NOMOR`
2. Klik _Extensions (Ekstensi) > Apps Script_. Paste kode script API `.gs` Anda untuk memproses `action=find`, `read`, dll.
3. Simpan dan klik **Deploy > New Deployment (Terapkan > Deployment Baru)**. Pilih tipe **Web App**. Atur akses ke _"Anyone"_ (Siapa saja).
4. Salin Web App URL yang diberikan.
5. Buka `src/services/api.js` pada proyek Vue Anda, lalu tempel (_replace_) `SCRIPT_URL` pada baris pertama dengan URL Anda yang baru.

## 🎨 Kustomisasi Template Sertifikat

Untuk mengubah desain latar/tulisan pada sertifikat:

1. **Ganti Gambar Latar:** Siapkan desain sertifikat baru (Pastikan bagian teks kosong). Simpan dengan ekstensi file `.png` ke direktori `src/assets/template.png`.
2. **Atur Tata Letak Teks:** Buka `src/components/CertificatePreview.vue`. Pada blok HTML `<div id="certificate-content">`, Anda bisa menggeser porsi kelas utilitas posisi top-bottom (`mt-20`, `bottom-16`), warna (`text-gray-800`), font size (`text-[40px]`), atau _tracking_ huruf.

## 🔒 Akses Admin (Tersembunyi)

Pengurus atau kepanitiaan web dapat mengakses sistem manajemen _dashboard_ untuk mengedit data peserta atau membongkar akses _error_ melalui jalur tersembunyi URL `/admin`. Di halaman depan, akses tersebut dikunci berada di **ikon gembok kecil transparan di sudut kanan atas**.

---

Dibuat dengan ❤️ oleh **aliefadityanugraha**
