function formatRupiah(angka) {
    let number_string = angka.replace(/[^,\d]/g, "").toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
    let separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
    }
    return rupiah;
}

function formatInputRupiah(input) {
    input.value = formatRupiah(input.value);
}

function parseNumber(str) {
    return parseFloat(str.replace(/\./g, "")) || 0;
}

function hitungTabungan() {
    const inputTarget = document.getElementById("targetUang").value;
    const inputBulanan =
    document.getElementById("tabunganBulanan").value;

    const target = parseNumber(inputTarget);
    const bulanan = parseNumber(inputBulanan);

    if (target > 0 && bulanan > 0) {
    let totalBulan = Math.ceil(target / bulanan);
    const displayUtama = document.getElementById("hasilTahun");
    const displayTotalBulan = document.getElementById("hasilBulan");

    if (totalBulan >= 12) {
        const thn = Math.floor(totalBulan / 12);
        const sisaBln = totalBulan % 12;
        displayUtama.innerText =
        thn + " Tahun " + (sisaBln > 0 ? sisaBln + " Bulan" : "");
    } else {
        displayUtama.innerText = totalBulan + " Bulan";
    }

    // Ini tidak akan error lagi karena ID sudah ada di HTML
    displayTotalBulan.innerText = "Total: " + totalBulan + " Bulan";

    // Scroll ke hasil jika di layar mobile (< 992px)
    if (window.innerWidth < 992) {
        document.getElementById("cardHasil").scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    }
    } else {
    alert("Masukkan nominal target dan tabungan bulanan.");
    }
}

function resetForm() {
    document.getElementById("targetUang").value = "";
    document.getElementById("tabunganBulanan").value = "";
    document.getElementById("hasilTahun").innerText = "0 Bulan";
    document.getElementById("hasilBulan").innerText =
    "Total: 0 Bulan";
}