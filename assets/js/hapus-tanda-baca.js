function showToast(message, type = "bg-success") {
    const toastEl = document.getElementById("copyToast");
    const toastMsg = document.getElementById("toastMsg");
    toastMsg.innerText = message;
    toastEl.className = `toast align-items-center text-white border-0 rounded-4 shadow ${type}`;
    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
}

function processPunctuation() {
    const input = document.getElementById("inputText").value;
    const isCleanSpasi = document.getElementById("optCleanSpasi").checked;
    const isOneLine = document.getElementById("optRemoveLineBreak").checked;

    if (!input) {
        document.getElementById("outputText").value = "";
        return;
    };

    let result = input.replace(/[^a-zA-Z0-9\s\n]/gi, " ");

    if (isOneLine) {
        result = result.replace(/\n/g, " ");
    }

    if (isCleanSpasi) {
        if (isOneLine) {
            result = result.replace(/\s+/g, " ").trim();
        } else {
            result = result
                .split("\n")
                .map((line) => line.replace(/[ \t]+/g, " ").trim())
                .join("\n");
            result = result.replace(/\n\s*\n/g, "\n").trim();
        }
    }
    document.getElementById("outputText").value = result;
}

function loadExample() {
    const exampleText = "Halo, Dunia! Apa kabar? @Ini #adalah %contoh &teks *yang (penuh) -tanda _baca.";
    document.getElementById("inputText").value = exampleText;
    processPunctuation();
    showToast("Contoh teks berhasil dimuat", "bg-dark");
}

function clearAll() {
    if (document.getElementById("inputText").value) {
        document.getElementById("inputText").value = "";
        document.getElementById("outputText").value = "";
        document.getElementById("optRemoveLineBreak").checked = false;
        document.getElementById("optCleanSpasi").checked = true;
        showToast("Data berhasil dihapus", "bg-dark");
    }
}

function copyToClipboard() {
    const output = document.getElementById("outputText");
    if (!output.value) {
        showToast("Hasil kosong, tidak ada yang disalin", "bg-danger");
        return;
    }

    navigator.clipboard.writeText(output.value).then(() => {
        showToast("Teks berhasil disalin!");
    });
}