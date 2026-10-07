let skor = 78;

// Menggunakan nested ternary operator untuk membagi grade
let grade = skor >= 90 ? "A" 
          : skor >= 80 ? "B" 
          : skor >= 70 ? "C" 
          : skor >= 60 ? "D" 
          : "E";

console.log(`Skor Anda ${skor}, sehingga mendapat Grade: ${grade}`);