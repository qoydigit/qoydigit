const inputArea = document.getElementById("textInput");
const outputArea = document.getElementById("textOutput");
const charCount = document.getElementById("charCount");
const notify = document.getElementById("copyNotify");

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
    if (!outputArea.value) return;

    navigator.clipboard.writeText(outputArea.value).then(() => {
        if (notify) {
            notify.classList.remove("d-none"); 

            setTimeout(() => {
                notify.classList.add("d-none");
            }, 2000);
        }
    });
}

function clearAll() {
    if (inputArea.value) {
        inputArea.value = "";
        outputArea.value = "";
        charCount.innerText = "0 Karakter";
        
        if (notify) notify.classList.add("d-none");
    }
}