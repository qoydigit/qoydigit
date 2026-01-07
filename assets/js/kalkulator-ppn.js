    const options = { day: "2-digit", month: "short", year: "numeric" };
    document.getElementById("currentDate").innerText = new Date()
        .toLocaleDateString("id-ID", options)
        .toUpperCase();

    function prosesInput(input) {
        let value = input.value.replace(/[^0-9]/g, "");
        let nominal = parseFloat(value) || 0;

        input.value = nominal.toLocaleString("id-ID");

        hitungPajak(nominal);
    }

    function hitungPajak(harga) {
        const lHarga = document.getElementById("labelHarga");
        const nPajak = document.getElementById("nominalPajak");
        const tBayar = document.getElementById("totalBayar");

        if (harga > 0) {
        const pajak = harga * 0.12;
        const total = harga + pajak;

        lHarga.innerText = formatRupiah(harga);
        nPajak.innerText = "+ " + formatRupiah(pajak);
        tBayar.innerText = formatRupiah(total);
        } else {
        lHarga.innerText = "Rp 0";
        nPajak.innerText = "+ Rp 0";
        tBayar.innerText = "Rp 0";
        }
    }

    function formatRupiah(angka) {
        return (
        "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(angka))
        );
    }