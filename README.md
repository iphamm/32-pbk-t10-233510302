# 📚 Sistem Manajemen Perpustakaan

Aplikasi web ini adalah Sistem Manajemen Perpustakaan yang dikembangkan menggunakan **Vue 3**, **Vue Router**, **Pinia** untuk manajemen state, dan **Vuetify** sebagai framework UI. Data dikelola menggunakan **json-server** untuk simulasi API backend. Proyek ini juga dilengkapi dengan **unit testing menggunakan Vitest**.

---

## 📝 Deskripsi Proyek

Sistem ini dirancang untuk membantu staf perpustakaan dalam mengelola operasional sehari-hari, termasuk manajemen data **buku**, **anggota**, dan **transaksi peminjaman/pengembalian buku**.

---

## ✨ Fitur Utama

### 🔐 Autentikasi Pengguna
- Sistem login untuk staf perpustakaan.

### 📚 Manajemen Buku
- Melihat daftar semua buku.
- Menambah buku baru ke inventaris.
- Mengedit informasi detail buku yang sudah ada.
- Menghapus buku dari inventaris.

### 👥 Manajemen Anggota
- Melihat daftar anggota perpustakaan.
- Menambah anggota baru.
- Mengedit informasi anggota yang sudah terdaftar.
- Menghapus data anggota.

### 🔄 Manajemen Transaksi
- Melihat riwayat peminjaman buku.
- Mencatat peminjaman buku baru.
- Mencatat pengembalian buku .

### 📊 Laporan
- Laporan Peminjaman.
- Laporan Ketersediaan Buku.

### 🧮 Dashboard
- Ringkasan statistik penting perpustakaan.

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- Vue.js 3
- Vue Router 4
- Pinia
- Vuetify 3

### Backend (Simulasi)
- json-server

### Pengujian
- Vitest
- @vue/test-utils

### Build Tool
- Vite

### Lain-lain
- ESLint
- Prettier

---

## 🚀 Instalasi & Menjalankan Proyek

Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan proyek di lingkungan lokal Anda.

### 1. Klon Repository

```bash
git clone <URL_REPOSITORY>
cd nama-folder-proyek 
```

### 2. Instal Dependensi

```bash
npm install
```

### 3. Instal json-server (Global)

Pastikan `json-server` terinstal secara global. Jika belum:

```bash
npm install -g json-server
```

### 4. Jalankan API Backend Simulasi

```bash
npm run json-server
```

> Server API akan berjalan di [http://localhost:3000](http://localhost:3000)

### 5. Jalankan Aplikasi Frontend Vue.js

Buka terminal lain dan jalankan:

```bash
npm run dev
```

> Aplikasi akan tersedia di [http://localhost:5173](http://localhost:5173) _(atau port lain yang tersedia)_.

---

## 🔑 Kredensial Login

Gunakan kredensial berikut untuk masuk ke sistem:

- **Username**: `admin`  
- **Password**: `password123`

---

## 🧪 Menjalankan Unit Tests

Untuk menjalankan unit tests:

```bash
npm run test
```

---

## 🤝 Kontribusi

Proyek ini adalah bagian dari **Tugas Besar/UAS** saya, **M. ILHAM RAMADHANA** pada Mata Kuliah **Pemrograman Berbasis Komponen**. Kontribusi umum tidak diharapkan, namun **saran untuk perbaikan selalu diterima**.