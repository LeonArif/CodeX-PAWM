# Aplikasi Pembelajaran Pemrograman

Aplikasi ini adalah platform pembelajaran interaktif untuk bahasa pemrograman, dengan fitur-fitur utama berikut:

## Fitur Utama

- **Tutorial Interaktif**  
  Belajar pemrograman melalui berbagai modul:  
  - Python Introduction
  - Python If-Else  
  - Python Loops  
  - Python Arrays  
  - Python Functions  
  - Python Exercise  
  Tiap modul dilengkapi penjelasan, contoh kode, dan latihan langsung di browser melalui code runner.

- **Sidebar Navigasi Progress**  
  Sidebar menampilkan daftar modul beserta progress pengguna (tanda centang ✓ jika modul telah dipelajari).

- **Code Runner**  
  Jalankan dan uji kode Python langsung di halaman tutorial dengan feedback output secara real-time.

## Fitur Backend

- **Autentikasi Google OAuth**  
  Pengguna login menggunakan akun Google. Setelah login, aplikasi menyimpan token JWT untuk verifikasi identitas pengguna.

- **Penyimpanan Progress Belajar**  
  Progress pengguna setiap modul akan disimpan di database (Supabase) secara otomatis saat pengguna menyelesaikan materi (misal scroll ke bawah halaman).  
  Progress ini akan ditampilkan di sidebar setiap kali pengguna login.

- **API Progress**  
  - GET `/api/progress` : Mengambil status progress modul pengguna yang sedang login.
  - POST `/api/progress` : Menyimpan atau memperbarui progress modul pengguna.

- **Proteksi API**  
  Semua endpoint progress dilindungi autentikasi JWT, sehingga hanya pengguna terverifikasi yang bisa mengakses/mengupdate progress mereka.

## Cara Kerja Singkat

1. **User login** via Google → mendapatkan token JWT.
2. **Token JWT disimpan** di localStorage.
3. Setiap kali user menyelesaikan satu modul (misal scroll ke bawah), aplikasi otomatis **POST progress ke backend**.
4. Backend **menyimpan progress** ke Supabase sesuai akun user.
5. Progress ditampilkan kembali ke user di sidebar setiap kali login.

## Link Deploy

1. Front End : https://code-x-pawm.vercel.app/
2. Back End: https://code-x-pawm-s49d.vercel.app/
