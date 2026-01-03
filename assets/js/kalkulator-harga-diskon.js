    const inputHarga = document.getElementById("hargaAsli");
    const toggleDiskon2 = document.getElementById("toggleDiskon2");
    const containerDiskon2 = document.getElementById("containerDiskon2");
    const diskon2Input = document.getElementById("diskon2");
    const hitungBtn = document.getElementById("hitungBtn");

    // Logic Toggle
    toggleDiskon2.addEventListener("change", function () {
    if (this.checked) {
        containerDiskon2.classList.remove("d-none");
    } else {
        containerDiskon2.classList.add("d-none");
        diskon2Input.value = "";
    }
    });

    // Format ribuan
    inputHarga.addEventListener("input", function () {
    let value = this.value.replace(/[^0-9]/g, "");
    this.value =
        value !== "" ? new Intl.NumberFormat("id-ID").format(value) : "";
    });

    function formatRupiah(angka) {
    return "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(angka));
    }

    hitungBtn.addEventListener("click", function () {
    const rawHarga = inputHarga.value.replace(/\./g, "");
    const hargaAsli = parseFloat(rawHarga) || 0;
    const d1 = parseFloat(document.getElementById("diskon1").value) || 0;
    const d2 = toggleDiskon2.checked
        ? parseFloat(diskon2Input.value) || 0
        : 0;

    if (rawHarga === "") {
        alert("Silakan masukkan nominal harga awal.");
        return;
    }

    const h1 = hargaAsli - hargaAsli * (d1 / 100);
    const hargaAkhir = h1 - h1 * (d2 / 100);
    const totalPotongan = hargaAsli - hargaAkhir;
    const persen = ((totalPotongan / hargaAsli) * 100).toFixed(0);

    document.getElementById("resHargaAwal").innerText =
        formatRupiah(hargaAsli);
    document.getElementById("resPotongan").innerText =
        "- " + formatRupiah(totalPotongan);
    document.getElementById("resHargaAkhir").innerText =
        formatRupiah(hargaAkhir);
    document.getElementById("persenTotal").innerText = persen;
    document.getElementById("badgeHemat").classList.remove("d-none");

    if (window.innerWidth < 992) {
        document.getElementById('hasilPerhitungan').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    });

    const resetBtn = document.getElementById("resetBtn");

    resetBtn.addEventListener("click", function () {
    inputHarga.value = "";
    document.getElementById("diskon1").value = "";
    document.getElementById("diskon2").value = "";

    if (toggleDiskon2.checked) {
        toggleDiskon2.checked = false;
        containerDiskon2.classList.add("d-none");
    }

    document.getElementById("resHargaAwal").innerText = "Rp 0";
    document.getElementById("resPotongan").innerText = "- Rp 0";
    document.getElementById("resHargaAkhir").innerText = "Rp 0";

    document.getElementById("badgeHemat").classList.add("d-none");

    inputHarga.focus();
    });