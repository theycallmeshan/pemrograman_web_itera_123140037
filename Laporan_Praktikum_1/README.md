# Kasir Sederhana - Mini POS Kampus - Web App

## Identitas
- **Nama Lengkap:** M. Reyshandi
- **NIM:** 123140037
- **Kelas Praktikum:** [Praktikum_PAW_RA]

## Deskripsi Aplikasi
Aplikasi Kasir dan Keranjang Belanja Sederhana (Mini POS) adalah sistem berbasis web yang dirancang untuk kasir kantin atau toko kampus. Tujuan pembuatan aplikasi ini adalah untuk mempermudah pencatatan transaksi barang, perhitungan subtotal dan total akhir secara otomatis, serta manajemen uang kembalian secara interaktif. Studi kasus yang dipilih adalah simulasi kasir dengan fitur diskon otomatis 10% untuk pembelanjaan dengan nominal mencapai Rp 50.000.

## Panduan Menjalankan
1. Buka aplikasi Visual Studio Code (VS Code).
2. Pastikan Anda telah menginstal ekstensi **Live Server** di VS Code.
3. Buka folder `mreyshandi_123140037_pertemuan1` ke dalam VS Code.
4. Klik kanan pada file `index.html` di panel *Explorer*, lalu pilih **"Open with Live Server"**.
5. Aplikasi akan otomatis terbuka dan berjalan di *browser* lokal Anda.

## Daftar Fitur
- [x] **Validasi Form Input:** Mencegah input kosong, nama barang < 3 karakter, harga < Rp 500, dan Qty < 1 dengan menampilkan pesan error berwarna merah.
- [x] **Kalkulator Subtotal & Total:** Menghitung otomatis `Harga x Qty` per baris dan menjumlahkan seluruh belanja di keranjang.
- [x] **Diskon Otomatis:** Memberikan potongan harga 10% jika total belanja mencapai minimal Rp 50.000.
- [x] **Kalkulator Pembayaran & Kembalian:** Menghitung uang bayar dikurangi total akhir. Dilengkapi peringatan jika uang yang diinputkan kurang.
- [x] **Manajemen List & LocalStorage:** Menyimpan data keranjang belanja secara persisten sehingga tidak hilang saat halaman di-*refresh*, dilengkapi fitur hapus item dan reset transaksi.

## Tangkapan Layar (Screenshot)
*(Catatan: Letakkan file gambar di folder yang sama dan ganti nama file di bawah ini sesuai gambar screenshot Anda)*

1. **Tampilan Form Input Utama:**
   ![Tampilan Utama](tampilan_halaman_utama.png)
2. **Tampilan Saat Validasi Error Muncul:**
   ![Validasi Error](screenshot_error.png)
3. **Tampilan Hasil Perhitungan dan Tabel Data:**
   ![Hasil Perhitungan](screenshot_tabel_kembalian.png)

## Penjelasan Teknis Singkat
- **Penanganan Validasi Input:** Validasi dikelola dalam fungsi `tambahBarang()`. Nilai (*value*) diambil dari elemen input HTML. Jika data tidak sesuai (misalnya string length < 3), *flag* `isValid` diubah menjadi `false` dan fungsi DOM `.innerText` akan mnampilkan pesan error ke dalam tag `` di bawah form. Jika gagal, proses push data ke *array* dihentikan.
- **Algoritma Kalkulator Keuangan:** Setiap kali ada penambahan atau penghapusan barang, fungsi `renderCart()` berjalan untuk menjumlahkan subtotal ke variabel `totalBelanja`. Diskon dieksekusi menggunakan blok kondisional `if (total >= 50000)`, yang memotong 10% dari total. Kembalian dihitung dengan mengurangkan input "Uang Bayar" dengan total akhir.
- **Mekanisme Serialisasi LocalStorage:** Penyimpanan data ditangani oleh fungsi `saveCartToStorage()`. Array JavaScript `cart` diserialisasi menjadi format string menggunakan `JSON.stringify()` agar dapat disimpan di memori *browser*. Saat halaman pertama kali dimuat, `JSON.parse()` digunakan untuk mengonversi string tersebut kembali menjadi objek JavaScript yang siap di-*render* ke tabel HTML.