# Multi-Feature REST API

REST API berbasis Node.js dan Express yang menyediakan berbagai layanan mulai dari downloader media sosial, alat berbasis AI, pencarian data, manajemen pengguna, hingga scraping konten dari berbagai platform. API ini dapat di-deploy langsung ke Vercel dan menggunakan MongoDB sebagai basis data.

---

[English Version](./README.en.md)

---

## Daftar Isi

- [Fitur](#fitur)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Server](#menjalankan-server)
- [Struktur Proyek](#struktur-proyek)
- [Endpoint API](#endpoint-api)
- [Autentikasi API Key](#autentikasi-api-key)
- [Deploy ke Vercel](#deploy-ke-vercel)
- [Lisensi](#lisensi)

---

## Fitur

### Downloader
- TikTok (video & slide)
- Instagram (post, story, reels) - versi 1, 2, dan 3
- YouTube (konversi ke MP3 & MP4, pencarian, play audio/video)
- Twitter / X
- Facebook
- Spotify (unduh & pencarian)
- Terabox
- MediaFire
- SfilesMobi
- Threads
- All-in-One Downloader (berbagai platform)

### Alat AI
- ChatGPT (berbagai versi)
- Google Bard
- Character AI
- GPT berbasis gambar
- GPT berbasis logika
- Generator gambar (Image Generator)
- Cartoonify (mengubah foto menjadi kartun)
- ESRGAN (peningkatan kualitas gambar)
- Remini (mempercantik foto)
- Virtual Girlfriends
- Dystopia AI
- Waifu Generator

### Stalker & Info
- GitHub stalk (profil & repositori)
- npm stalk (informasi paket)
- Instagram stalk (info profil)
- TikTok stalk (info profil)
- Kode Pos Indonesia
- Jadwal hari libur nasional
- Jadwal sepak bola

### Pencarian
- YouTube search
- Pinterest search
- Spotify search
- BukaLapak search
- Chord lagu
- Cerpen random
- Growtopia items

### Manajemen Pengguna (MongoDB)
- Registrasi pengguna
- Login pengguna
- Manajemen alamat
- Keranjang belanja
- Data produk (CRUD)

### Tools Lainnya
- Screenshot website
- Pengubah gaya teks
- NGL (pesan anonim)
- Email subscription
- Foto upscaling & editing
- Rumah misteri & rumah hantu (konten hiburan)

---

## Teknologi yang Digunakan

| Teknologi       | Keterangan                              |
|-----------------|-----------------------------------------|
| Node.js         | Runtime JavaScript sisi server          |
| Express.js      | Framework web minimalis untuk Node.js   |
| MongoDB         | Basis data NoSQL berbasis dokumen       |
| Mongoose        | ODM untuk MongoDB                       |
| Axios           | HTTP client untuk request ke API luar   |
| Cheerio         | HTML scraping berbasis jQuery syntax    |
| EJS             | Template engine untuk halaman HTML      |
| Nodemailer      | Pengiriman email                        |
| dotenv          | Manajemen variabel lingkungan           |
| CORS            | Middleware untuk Cross-Origin Resource  |
| yt-search       | Pencarian konten YouTube                |
| ytdl-core       | Unduh video YouTube                     |
| Vercel          | Platform deploy serverless              |

---

## Instalasi

Pastikan **Node.js** (v18 atau lebih baru) dan **npm** atau **yarn** sudah terinstal.

```bash
# Clone repositori
git clone https://github.com/username/multi-feature-rest-api.git

# Masuk ke direktori proyek
cd multi-feature-rest-api

# Instal dependensi
npm install
# atau menggunakan yarn
yarn install
```

---

## Konfigurasi Environment

Buat file `.env` di root proyek dan isi dengan variabel berikut:

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

> Pastikan MongoDB Atlas atau instance MongoDB lokal sudah aktif sebelum menjalankan server.

---

## Menjalankan Server

```bash
# Mode development (dengan auto-reload menggunakan nodemon)
npm run dev

# Mode production
node server.js
```

Server akan berjalan di `http://localhost:3000` secara default.

---

## Struktur Proyek

```
.
├── config/
│   └── db.js                 # Koneksi MongoDB
├── lib/
│   └── scrappers/
│       ├── index.js           # Ekspor semua fungsi scraper
│       ├── scraper1.js        # Kumpulan scraper bagian 1
│       ├── scraper2.js        # Kumpulan scraper bagian 2
│       └── scraper3.js        # Kumpulan scraper bagian 3
├── middleware/
│   └── authApiKey.js          # Middleware autentikasi API Key
├── models/
│   ├── ApiKey.js              # Model API Key
│   ├── Product.js             # Model produk
│   └── User.js                # Model pengguna
├── routers/
│   ├── index.js               # Pemuat router otomatis
│   ├── User/                  # Endpoint manajemen pengguna
│   ├── Products/              # Endpoint manajemen produk
│   ├── downloader/            # Endpoint downloader
│   ├── tools/                 # Endpoint tools
│   └── email/                 # Endpoint email
├── views/
│   └── index.ejs              # Halaman dokumentasi
├── server.js                  # Entry point aplikasi
├── vercel.json                # Konfigurasi deploy Vercel
├── package.json
└── .gitignore
```

---

## Endpoint API

Semua endpoint dapat dilihat langsung di halaman utama (`/`) setelah server berjalan. Halaman tersebut menampilkan daftar lengkap semua route yang tersedia beserta parameternya.

**Contoh endpoint:**

| Method | Path                     | Keterangan                       |
|--------|--------------------------|----------------------------------|
| GET    | `/`                      | Halaman dokumentasi API          |
| GET    | `/authorization`         | Verifikasi API Key               |
| POST   | `/user/register`         | Registrasi pengguna baru         |
| POST   | `/user/login`            | Login pengguna                   |
| GET    | `/downloader/tiktok`     | Unduh video TikTok               |
| GET    | `/downloader/youtube`    | Unduh video/audio YouTube        |
| GET    | `/downloader/instagram`  | Unduh konten Instagram           |

---

## Autentikasi API Key

Beberapa endpoint memerlukan API Key yang dikirimkan melalui header request:

```
api-key: YOUR_API_KEY_HERE
```

API Key divalidasi terhadap basis data MongoDB. Setiap key memiliki batas penggunaan (limit). Jika limit telah tercapai, request akan ditolak.

---

## Deploy ke Vercel

Proyek ini sudah dikonfigurasi untuk Vercel melalui file `vercel.json`.

```bash
# Instal Vercel CLI
npm install -g vercel

# Login ke akun Vercel
vercel login

# Deploy
vercel --prod
```

Pastikan variabel environment (`MONGO_URI`, `PORT`) sudah dikonfigurasi di dashboard Vercel sebelum deploy.

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**. Lihat file [LICENSE](./LICENSE) untuk informasi lebih lanjut.
