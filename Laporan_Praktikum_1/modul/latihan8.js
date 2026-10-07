function cekPrima(angka) {
    // Bilangan kurang dari 2 bukan bilangan prima
    if (angka < 2) return false;
    
    // Mengecek pembagi dari 2 hingga akar kuadrat angka tersebut
    for (let i = 2; i <= Math.sqrt(angka); i++) {
        if (angka % i === 0) {
            return false; // Jika bisa dibagi, berarti bukan prima
        }
    }
    return true;
}

// Contoh penggunaan
console.log(`Apakah 7 bilangan prima? ${cekPrima(7)}`);
console.log(`Apakah 10 bilangan prima? ${cekPrima(10)}`);