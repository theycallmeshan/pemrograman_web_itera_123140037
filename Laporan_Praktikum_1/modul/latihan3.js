let usia = 20;
let kategori;

if (usia < 12) {
    kategori = "Anak-anak";
} else if (usia >= 12 && usia <= 17) {
    kategori = "Remaja";
} else if (usia >= 18 && usia <= 59) {
    kategori = "Dewasa";
} else if (usia >= 60) {
    kategori = "Lansia";
}

console.log(`Usia ${usia} tahun termasuk kategori: ${kategori}`);