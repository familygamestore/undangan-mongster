# EVENT MONGSTER — Community Invitation Studio

Versi upgrade dengan konsep **mobile-first**, khusus untuk membuat undangan EVENT MONGSTER untuk setiap komunitas, tameng, atau tim.

## Fitur utama
- Event Studio / Admin builder
- Nama komunitas/tameng dapat diubah
- Nama event, venue, deskripsi undangan
- Setup jadwal main: tanggal + jam WIB
- Format, match, hadiah, dan jumlah slot
- WhatsApp admin dengan pesan konfirmasi otomatis
- Instagram, TikTok, YouTube, Discord, Facebook
- Generate link unik `/invite/[slug]`
- Data event disimpan di URL sehingga link bisa langsung dibagikan tanpa database
- Halaman undangan memiliki countdown
- Tombol Konfirmasi Hadir + Chat Admin
- Desain responsif untuk HP, iPhone, iPad, tablet, dan desktop
- Poster-style visual yang tetap rapi ketika dibuka di banyak ukuran layar
- Siap deploy ke Vercel

## Cara menjalankan
```bash
npm install
npm run dev
```
Buka:
- `/` landing
- `/admin` Event Studio
- `/invite/nama-komunitas?...` halaman undangan hasil generate

## Cara membuat link
1. Masuk ke `/admin`.
2. Isi nama komunitas/tameng.
3. Atur tanggal dan jam main.
4. Isi format, match, hadiah, slot.
5. Masukkan link social media dan WhatsApp.
6. Klik **GENERATE INVITATION LINK**.
7. Copy link atau share lewat WhatsApp.
8. Link tersebut dapat dibuka langsung oleh komunitas di HP maupun desktop.

## Catatan arsitektur
Versi ini tetap **tanpa database**. Konfigurasi event disimpan sebagai parameter pada URL hasil generate. Karena itu link hasil generate sudah membawa data komunitas, jadwal, teks, dan social media.

Jika nantinya diperlukan dashboard yang menyimpan banyak event secara permanen, edit/hapus event, statistik klik, RSVP tersimpan, atau satu link pendek yang tidak panjang, tahap berikutnya sebaiknya memakai database/API.
