const inputArea = document.getElementById("inputText");
const outputArea = document.getElementById("outputText");

function showToast(message, type = "bg-success") {
    const toastEl = document.getElementById("copyToast");
    const toastMsg = document.getElementById("toastMsg");
    
    toastMsg.innerText = message;
    toastEl.className = `toast align-items-center text-white border-0 rounded-4 shadow ${type}`;
    
    const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
    toast.show();
}

function processText() {
    let text = inputArea.value;
    if (!text) {
        outputArea.value = "";
        return;
    }

    text = text.replace(/[\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]/g, " ");

    const isCleanSpaces = document.getElementById("optCleanSpaces").checked;
    const isRemoveEmpty = document.getElementById("optRemoveEmpty").checked;
    const isTrim = document.getElementById("optTrim").checked;
    const isRemoveList = document.getElementById("optRemoveList").checked;
    const isRemoveSymbols = document.getElementById("optRemoveSymbols").checked;
    const isJoinLines = document.getElementById("optJoinLines").checked;

    let lines = text.split("\n");

    lines = lines.map((line) => {
        let temp = line;
        if (isRemoveList) temp = temp.replace(/^(\d+[\.\)]|[\*\-\•])\s+/, "");
        if (isRemoveSymbols) temp = temp.replace(/[^a-zA-Z0-9\s]/g, "");
        if (isCleanSpaces) temp = temp.replace(/[ \t]+/g, " ").replace(/^\s+/, "");
        if (isTrim) temp = temp.trim();
        return temp;
    });

    if (isRemoveEmpty) lines = lines.filter((line) => line.trim().length > 0);

    let result = lines.join("\n");

    if (isJoinLines) {
        result = result.replace(/\n+/g, " ");
        if (isCleanSpaces) result = result.replace(/\s+/g, " ");
    }

    outputArea.value = result.trim();
}

function clearAll() {
    if (inputArea.value) {
        inputArea.value = "";
        outputArea.value = "";
        document.getElementById("optRemoveEmpty").checked = false;
        document.getElementById("optTrim").checked = false;
        document.getElementById("optRemoveList").checked = false;
        document.getElementById("optRemoveSymbols").checked = false;
        document.getElementById("optJoinLines").checked = false;
        processText();
        showToast("Teks dan pengaturan dihapus", "bg-dark");
    }
}

function loadExample() {
        inputArea.value = `1.  Halo   Dunia! @#$
2.  Ini contoh   teks   berantakan.
-   Baris   ketiga   dengan   simbol %^&*.
   
    Baris   yang   terpisah   jauh.`;
        processText();
      }

function copyResult() {
    const outputArea = document.getElementById('outputText');
    if (!outputArea.value) {
        showToast("Hasil kosong, tidak ada yang disalin", "bg-danger");
        return;
    }

    navigator.clipboard.writeText(outputArea.value).then(() => {
        showToast("Hasil pembersihan berhasil disalin!");
    });
}