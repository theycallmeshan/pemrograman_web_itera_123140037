for (let i = 1; i <= 100; i++) {
    // Pengecekan kelipatan 3 dan 5 (15) harus diletakkan paling atas
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } 
    // Jika kelipatan 3 saja
    else if (i % 3 === 0) {
        console.log("Fizz");
    } 
    // Jika kelipatan 5 saja
    else if (i % 5 === 0) {
        console.log("Buzz");
    } 
    // Jika bukan keduanya, cetak angka asli
    else {
        console.log(i);
    }
}