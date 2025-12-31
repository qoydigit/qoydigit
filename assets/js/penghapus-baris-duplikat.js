    const inputDup = document.getElementById("inputDup");
    const outputDup = document.getElementById("outputDup");

    function processDuplicate() {
        let text = inputDup.value;
        if (!text) {
            outputDup.value = "";
            return;
        }

        const isTrim = document.getElementById("optTrimLines").checked;
        const isIgnoreEmpty = document.getElementById("optIgnoreEmpty").checked;

        let lines = text.split(/\r?\n/);
        let uniqueLines = [];
        let seen = new Set();

        for (let line of lines) {
            // 1. Buat versi "sangat bersih" untuk pengecekan duplikat (Internal Only)
            // Kita hapus spasi pinggir DAN spasi ganda di tengah hanya untuk cek duplikat
            let internalCheck = line.trim().replace(/\s+/g, " ");
            
            if (!seen.has(internalCheck)) {
                seen.add(internalCheck);

                // 2. Tentukan apa yang ditampilkan di kotak HASIL
                if (isTrim) {
                    // Jika opsi AKTIF: tampilkan yang sudah bersih dari spasi ganda & pinggir
                    uniqueLines.push(internalCheck);
                } else {
                    // Jika opsi MATI: tampilkan teks ASLI (tapi duplikat tetap hilang)
                    uniqueLines.push(line);
                }
            }
        }

        // 3. Filter baris kosong
        if (isIgnoreEmpty) {
            uniqueLines = uniqueLines.filter((line) => line.trim().length > 0);
        }

        outputDup.value = uniqueLines.join("\n");
    }

    function loadDupExample() {
    inputDup.value = `   Apel

    Jeruk
      Apel
    Mangga
      Jeruk
    Apel
    Pisang`;

    processDuplicate();
}

    function clearDup() {
    inputDup.value = "";
    outputDup.value = "";

    document.getElementById("optTrimLines").checked = false;
    document.getElementById("optIgnoreEmpty").checked = false;
    processDuplicate();
    inputDup.focus();
    }

    function copyDupResult() {
    if (!outputDup.value) return;
    navigator.clipboard.writeText(outputDup.value).then(() => {
        const notify = document.getElementById("copyNotifyDup");
        notify.style.display = "block";
        setTimeout(() => {
        notify.style.display = "none";
        }, 2000);
    });
    }