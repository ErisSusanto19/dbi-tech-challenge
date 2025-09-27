# DBI Tech Challenge Submission

Proyek ini merupakan submission untuk tantangan teknis dari DBI. Aplikasi ini dibangun menggunakan Next.js dan mencakup tiga fungsionalitas utama yang diuraikan di bawah ini.

---

## 🚀 Live Demo
🔗 [dbi-tech-challenge.vercel.app](https://dbi-tech-challenge.vercel.app)

---

## Fitur

1.  **Redesign Halaman Utama:**
    -   Implementasi desain ulang halaman utama yang sepenuhnya responsif.
    -   Dibangun dengan komponen React yang dapat dipakai ulang, termasuk carousel interaktif untuk banner.

2.  **Fungsionalitas CRUD Banner:**
    -   Sebuah panel admin di `/admin/banners` untuk melakukan operasi Create, Read, Update, dan Delete (CRUD) pada hero banners.
    -   Menggunakan database Postgres yang di-host di Supabase.
    -   Integrasi dengan Cloudinary untuk upload dan penyimpanan gambar.
    -   Fungsionalitas ini didukung oleh API Routes Next.js.

3.  **Tool "Instagram Checker":**
    -   Sebuah halaman utilitas di `/tools/instagram-checker` untuk mengambil data profil Instagram melalui API pihak ketiga.
    -   Menangani batasan kuota API eksternal dengan menyediakan *toggle* di UI untuk beralih antara panggilan API langsung (Live) dan data sampel (Mock).

---

## Stack Teknologi

-   **Framework:** Next.js 15 (App Router)
-   **Bahasa:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI:** React, Headless UI, Embla Carousel
-   **Database:** Supabase (Postgres)
-   **ORM:** Prisma
-   **Penyimpanan File:** Cloudinary
-   **Deployment:** Vercel

---

## Menjalankan Proyek Secara Lokal

**1. Clone Repositori**
```bash
git clone https://github.com/ErisSusanto19/dbi-tech-challenge
cd dbi-tech-challenge
```

**2. Install Dependencies**
```bash
npm install
```

**3. Konfigurasi Environment**
Salin `.env.example` menjadi `.env.development.local` dan isi variabel yang diperlukan.
```bash
cp .env.example .env.development.local
```

**4. Jalankan Aplikasi**
```bash
npm run dev
```
Aplikasi akan tersedia di `http://localhost:3000`.

---

## Catatan

-   **Akses Fitur:** Tautan ke **Admin Panel** dan **IG Checker Tool** dapat ditemukan di *footer* halaman utama.
-   **IG Checker Tool:** Karena API eksternal memiliki batasan kuota, disarankan untuk menggunakan *toggle* **Mock Data** di halaman tersebut untuk melihat fungsionalitas UI dengan data sampel yang berhasil.