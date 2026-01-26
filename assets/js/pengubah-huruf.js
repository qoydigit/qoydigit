const inputArea = document.getElementById("textInput");
const outputArea = document.getElementById("textOutput");
const charCount = document.getElementById("charCount");

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
    charCount.innerText = text.length + " Karakter";

    const checkedOption = document.querySelector('input[name="caseOption"]:checked');
    if (!checkedOption) return;

    const option = checkedOption.value;

    if (!text) {
        outputArea.value = "";
        return;
    }

    if (option === "upper") {
        outputArea.value = text.toUpperCase();
    } else if (option === "lower") {
        outputArea.value = text.toLowerCase();
    } else if (option === "title") {
        outputArea.value = text
            .toLowerCase()
            .replace(/\b\w/g, (s) => s.toUpperCase());
    } else if (option === "sentence") {
        let lower = text.toLowerCase();
        outputArea.value = lower.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
            return c.toUpperCase();
        });
    }
}

function copyResult() {
    if (!outputArea.value) {
        showToast("Tidak ada teks untuk disalin!", "bg-danger");
        return;
    }

    navigator.clipboard.writeText(outputArea.value).then(() => {
        showToast("Teks berhasil disalin!");
    });
}

function clearAll() {
    if (inputArea.value) {
        inputArea.value = "";
        outputArea.value = "";
        charCount.innerText = "0 Karakter";
        showToast("Data berhasil dihapus", "bg-dark");
    }
}