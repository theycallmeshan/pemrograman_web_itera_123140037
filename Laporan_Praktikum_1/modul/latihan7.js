function hitungFaktorial(n) {
    if (n === 0 || n === 1) return 1;
    
    let hasil = 1;
    for (let i = 2; i <= n; i++) {
        hasil *= i;
    }
    return hasil;
}

// Contoh penggunaan
let angka = 5;
console.log(`Faktorial dari ${angka} adalah ${hitungFaktorial(angka)}`);