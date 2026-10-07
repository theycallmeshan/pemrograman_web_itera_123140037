let angkaHari = 3; 
let namaHari;

switch (angkaHari) {
    case 1:
        namaHari = "Monday";
        break;
    case 2:
        namaHari = "Tuesday";
        break;
    case 3:
        namaHari = "Wednesday";
        break;
    case 4:
        namaHari = "Thursday";
        break;
    case 5:
        namaHari = "Friday";
        break;
    case 6:
        namaHari = "Saturday";
        break;
    case 7:
        namaHari = "Sunday";
        break;
    default:
        namaHari = "Input tidak valid. Masukkan angka 1-7.";
}

console.log(`Angka hari ke-${angkaHari} adalah ${namaHari}`);