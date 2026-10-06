
// script.js
const STORAGE_KEY = 'MINI_POS_CART';
let cart = [];

// Format angka ke format Rupiah (Contoh: Rp 50.000)
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    renderCart();

    // Event Listener untuk Form Tambah Barang
    document.getElementById('formBarang').addEventListener('submit', function(e) {
        e.preventDefault();
        tambahBarang();
    });

    // Event Listener untuk Tombol Bayar
    document.getElementById('btnBayar').addEventListener('click', prosesPembayaran);

    // Event Listener untuk Tombol Reset Transaksi
    document.getElementById('btnReset').addEventListener('click', resetTransaksi);
});

// --- MODUL LOCALSTORAGE ---
function loadCartFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        cart = JSON.parse(data);
    }
}

function saveCartToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

// --- MODUL VALIDASI FORM ---
function clearErrors() {
    document.getElementById('errorNama').innerText = "";
    document.getElementById('errorHarga').innerText = "";
    document.getElementById('errorQty').innerText = "";
}

function tambahBarang() {
    clearErrors();
    
    const nama = document.getElementById('namaBarang').value.trim();
    const harga = parseInt(document.getElementById('hargaSatuan').value);
    const qty = parseInt(document.getElementById('qty').value);
    
    let isValid = true;

    // Validasi Nama Barang (Wajib, min 3 karakter)
    if (nama.length < 3) {
        document.getElementById('errorNama').innerText = "Nama barang minimal 3 karakter!";
        isValid = false;
    }

    // Validasi Harga (Minimal Rp 500)
    if (isNaN(harga) || harga < 500) {
        document.getElementById('errorHarga').innerText = "Harga wajib diisi & minimal Rp 500!";
        isValid = false;
    }

    // Validasi Qty (Minimal 1)
    if (isNaN(qty) || qty < 1) {
        document.getElementById('errorQty').innerText = "Jumlah barang minimal 1!";
        isValid = false;
    }

    if (isValid) {
        const subtotal = harga * qty;
        
        // Masukkan data ke array cart
        cart.push({
            nama: nama,
            harga: harga,
            qty: qty,
            subtotal: subtotal
        });

        saveCartToStorage(); // Simpan persisten
        renderCart();        // Update tabel
        
        // Reset form setelah berhasil
        document.getElementById('formBarang').reset();
    }
}

// --- MODUL RENDER TABEL & KALKULATOR TOTAL ---
function renderCart() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = ''; // Bersihkan tabel
    
    let totalBelanja = 0;

    cart.forEach((item, index) => {
        totalBelanja += item.subtotal;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.nama}</td>
            <td>${formatRupiah(item.harga)}</td>
            <td>${item.qty}</td>
            <td>${formatRupiah(item.subtotal)}</td>
            <td><button class="btn btn-delete" onclick="hapusBarang(${index})">Hapus</button></td>
        `;
        cartBody.appendChild(row);
    });

    kalkulasiTotal(totalBelanja);
}

// Hapus item berdasarkan index
function hapusBarang(index) {
    cart.splice(index, 1);
    saveCartToStorage();
    
    // Sembunyikan hasil pembayaran jika ada perubahan cart
    document.getElementById('hasilPembayaran').className = 'payment-result hidden'; 
    document.getElementById('uangBayar').value = '';
    
    renderCart();
}

// --- MODUL KALKULATOR DISKON & TOTAL AKHIR ---
let grandTotal = 0; // Variabel global untuk menyimpan total akhir yang harus dibayar

function kalkulasiTotal(total) {
    let diskon = 0;
    
    // Diskon 10% jika total >= 50.000
    if (total >= 50000) {
        diskon = total * 0.10;
    }
    
    grandTotal = total - diskon;

    document.getElementById('totalBelanja').innerText = formatRupiah(total);
    document.getElementById('nominalDiskon').innerText = formatRupiah(diskon);
    document.getElementById('totalAkhir').innerText = formatRupiah(grandTotal);
}

// --- MODUL PEMBAYARAN & KEMBALIAN ---
function prosesPembayaran() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    const uangBayar = parseInt(document.getElementById('uangBayar').value);
    const hasilDiv = document.getElementById('hasilPembayaran');
    hasilDiv.className = 'payment-result'; // tampilkan div

    if (isNaN(uangBayar)) {
        hasilDiv.innerText = "Silakan masukkan nominal uang pembayaran!";
        hasilDiv.className = 'payment-result error';
        return;
    }

    if (uangBayar < grandTotal) {
        // Uang Kurang
        const kurang = grandTotal - uangBayar;
        hasilDiv.innerText = `Uang belum mencukupi! Kurang: Rp ${kurang.toLocaleString('id-ID')}`;
        hasilDiv.className = 'payment-result error';
    } else {
        // Uang Pas / Lebih (Kembalian)
        const kembalian = uangBayar - grandTotal;
        hasilDiv.innerText = `Pembayaran Berhasil! Kembalian Anda: Rp ${kembalian.toLocaleString('id-ID')}`;
        hasilDiv.className = 'payment-result success';
    }
}

// --- MODUL RESET TRANSAKSI ---
function resetTransaksi() {
    if(confirm("Apakah Anda yakin ingin memulai transaksi baru? Seluruh data keranjang akan dihapus.")) {
        cart = [];
        saveCartToStorage();
        renderCart();
        
        // Reset modul pembayaran
        document.getElementById('uangBayar').value = '';
        document.getElementById('hasilPembayaran').className = 'payment-result hidden';
        clearErrors();
        document.getElementById('formBarang').reset();
    }
}