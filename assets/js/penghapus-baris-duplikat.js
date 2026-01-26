const inputDup = document.getElementById("inputDup");
const outputDup = document.getElementById("outputDup");

// Fungsi Helper untuk memicu Toast (Gunakan ID copyToast yang sama)
function showToast(message, type = "bg-success") {
    const toastEl = document.getElementById("copyToast");
    const toastMsg = document.getElementById("toastMsg");
    
    toastMsg.innerText = message;
    toastEl.className = `toast align-items-center text-white border-0 rounded-4 shadow ${type}`;
    
    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
}

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
        let internalCheck = line.trim().replace(/\s+/g, " ");
        
        if (!seen.has(internalCheck)) {
            seen.add(internalCheck);
            if (isTrim) {
                uniqueLines.push(internalCheck);
            } else {
                uniqueLines.push(line);
            }
        }
    }

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
    if (inputDup.value) {
        inputDup.value = "";
        outputDup.value = "";
        document.getElementById("optTrimLines").checked = false;
        document.getElementById("optIgnoreEmpty").checked = false;
        processDuplicate();
        inputDup.focus();
        showToast("Semua baris berhasil dihapus", "bg-dark");
    }
}

function copyDupResult() {
    if (!outputDup.value) {
        showToast("Hasil kosong, tidak ada yang disalin", "bg-danger");
        return;
    }
    
    navigator.clipboard.writeText(outputDup.value).then(() => {
        showToast("Baris Kata berhasil disalin!");
    });
}