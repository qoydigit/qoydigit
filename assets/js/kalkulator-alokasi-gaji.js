// Fungsi format rupiah yang konsisten
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

function hitungBudget() {
    const gajiStr = document.getElementById("inputGaji").value;
    const gaji = parseNumber(gajiStr);

    if (gaji > 0) {
    // Logika 50/30/20
    const kebutuhan = gaji * 0.5;
    const keinginan = gaji * 0.3;
    const tabungan = gaji * 0.2;

    // Update Tampilan
    document.getElementById("resKebutuhan").innerText =
        "Rp " + formatRupiah(kebutuhan.toString());
    document.getElementById("resKeinginan").innerText =
        "Rp " + formatRupiah(keinginan.toString());
    document.getElementById("resTabungan").innerText =
        "Rp " + formatRupiah(tabungan.toString());

    // Auto scroll di mobile
    if (window.innerWidth < 992) {
        document.getElementById("cardHasilBudget").scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    }
    } else {
    alert("Silakan masukkan nominal pendapatan Anda.");
    }
}

function resetBudget() {
    document.getElementById("inputGaji").value = "";
    document.getElementById("resKebutuhan").innerText = "Rp 0";
    document.getElementById("resKeinginan").innerText = "Rp 0";
    document.getElementById("resTabungan").innerText = "Rp 0";
}