# Lars Sea Vegetables - Premium E-Commerce

Website e-commerce ini dibangun dengan arsitektur React (Frontend) dan Node.js/Express (Backend) untuk tugas kampus. Dilengkapi dengan animasi modern (Framer Motion), desain *coastal-elegant* (Tailwind CSS), serta integrasi payment gateway Midtrans dan notifikasi WhatsApp otomatis menggunakan Fonnte.

## Fitur Utama
1. **Premium UI/UX**: Desain "coastal-elegant" menggunakan palet warna laut dalam (Deep Teal/Navy) dipadukan dengan aksen Emas (Gold) dan Pasir (Sand).
2. **Animasi Halus**: Menggunakan Framer Motion untuk *scroll reveal* dan transisi.
3. **Midtrans Payment Gateway**: Integrasi Snap API (mode Sandbox) mendukung berbagai metode pembayaran (QRIS, E-Wallet, Kartu Kredit).
4. **Fonnte WhatsApp API**: Menerima webhook dari Midtrans dan meneruskannya menjadi pesan WhatsApp ke nomor penjual/pembeli.
5. **Local Storage Cart**: Keranjang belanja ringan tanpa memerlukan setup database user.

## Struktur Direktori
- `frontend/`: Berisi kode ReactJS (Vite, TailwindCSS, Framer Motion, React Router).
- `backend/`: Berisi server ExpressJS untuk melayani API checkout Midtrans dan menangkap Webhook Fonnte.

---

## 🚀 Cara Menjalankan Proyek (Local Development)

### 1. Setup Backend (Midtrans & Fonnte)
1. Buka terminal, masuk ke folder backend: `cd backend`
2. Install dependensi (jika belum): `npm install`
3. Buka file `.env` di dalam folder backend dan isikan API Keys Anda:
   - **MIDTRANS_SERVER_KEY**: Dapatkan dari Dashboard Midtrans (Environment Sandbox) > Settings > Access Keys.
   - **MIDTRANS_CLIENT_KEY**: (Masukkan juga di file `frontend/index.html` pada script Snap.js).
   - **FONNTE_TOKEN**: Daftar di [Fonnte.com](https://fonnte.com), lalu ambil Token dari menu Device/API.
   - **SELLER_WA_NUMBER**: Masukkan nomor WA Anda (gunakan kode negara `08...` atau `628...` sesuai standar Fonnte).
4. Jalankan server backend:
   ```bash
   node server.js
   ```
   *Server akan berjalan di http://localhost:5000*

### 2. Setup Frontend (React)
1. Buka terminal baru, masuk ke folder frontend: `cd frontend`
2. Install dependensi (jika belum): `npm install`
3. Jalankan server frontend:
   ```bash
   npm run dev
   ```
4. Buka link yang muncul di terminal (biasanya `http://localhost:5173`).

---

## 🛠️ Cara Kerja Sistem (Alur Pembayaran)
1. Pengguna memilih produk olahan rumput laut dan menekan **Add to Cart**.
2. Pengguna pergi ke halaman **Checkout** dan mengisi form data diri (Nama, No WA, Alamat).
3. Saat pengguna menekan **Pay with Midtrans**, frontend akan mengirim data ke `POST http://localhost:5000/api/checkout`.
4. Backend meneruskan data ke Midtrans untuk membuat transaksi, lalu mengembalikan `snapToken` ke Frontend.
5. Frontend memunculkan **Popup Midtrans Snap**. Pengguna pura-pura membayar (gunakan mode Sandbox).
6. Setelah pembayaran sukses, Midtrans akan mengirimkan notifikasi asinkron ke `POST /api/webhook/midtrans` (Di komputer lokal, Anda perlu **Ngrok** agar Midtrans bisa mengakses localhost Anda).
7. Jika status pembayaran adalah `settlement`, backend akan menembak API Fonnte untuk mengirim pesan WhatsApp berisi detail order.

---

## 🌐 Saran Deployment
- **Frontend**: Sangat mudah di-deploy ke **Vercel** atau **Netlify**. Cukup hubungkan repository GitHub Anda.
- **Backend**: Dapat di-deploy secara gratis ke **Render.com** (Web Service) atau **Railway.app**. Pastikan Anda mengatur *Environment Variables* di dashboard hosting tersebut.
