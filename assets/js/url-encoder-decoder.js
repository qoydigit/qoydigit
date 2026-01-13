    function convert() {
        const inputField = document.getElementById("mainInput");
        const outputField = document.getElementById("mainOutput");
        const sw = document.getElementById("modeSwitch");

        if (!inputField || !outputField) return;

        const input = inputField.value.trim();
        const isDecoding = sw ? sw.checked : false;

        if (input === "") {
        outputField.value = "";
        return;
        }

        try {
        if (!isDecoding) {
            outputField.value = encodeURIComponent(input);
        } else {
            outputField.value = decodeURIComponent(input);
        }
        } catch (e) {
        outputField.value =
            "Kesalahan: Format URL tidak valid untuk di-decode.";
        }
    }

    function triggerSwitch(btnElement) {
        const sw = document.getElementById("modeSwitch");
        const labelIn = document.getElementById("labelInput");
        const labelOut = document.getElementById("labelOutput");
        const inputField = document.getElementById("mainInput");
        const outputField = document.getElementById("mainOutput");

        if (!sw) return;
        sw.checked = !sw.checked;

        if (btnElement) {
        btnElement.classList.add("rotate-anim");
        setTimeout(
            () => btnElement.classList.remove("rotate-anim"),
            400
        );
        }

        if (!sw.checked) {
        labelIn.innerText = "Masukkan URL/Teks:";
        labelOut.innerText = "Hasil Encode:";
        } else {
        labelIn.innerText = "Masukkan URL Ter-encode:";
        labelOut.innerText = "Hasil Decode:";
        }

        const currentOutput = outputField.value.trim();
        if (
        currentOutput !== "" &&
        !currentOutput.includes("Kesalahan")
        ) {
        inputField.value = currentOutput;
        convert();
        } else {
        convert();
        }
    }

    function useExample() {
        const sw = document.getElementById("modeSwitch");
        const inputField = document.getElementById("mainInput");
        if (!sw || !sw.checked) {
        inputField.value =
            "https://qoydigit.web.id/search?q=belajar coding";
        } else {
        inputField.value =
            "https%3A%2F%2Fqoydigit.web.id%2Fsearch%3Fq%3Dbelajar%20coding";
        }
        convert();
    }

    function resetTool() {
        document.getElementById("mainInput").value = "";
        document.getElementById("mainOutput").value = "";
    }

    function copyResult() {
        const outputField = document.getElementById("mainOutput");
        const btn = document.getElementById("copyBtn");

        if (
        !outputField ||
        !outputField.value ||
        outputField.value.includes("Kesalahan")
        )
        return;

        const originalHTML = btn.innerHTML;

        navigator.clipboard.writeText(outputField.value).then(() => {
        // Perubahan sesuai permintaan Anda
        btn.innerHTML =
            '<i class="bi bi-check2-all me-2"></i>Berhasil Disalin!';
        btn.classList.replace("btn-dark", "btn-success");

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.replace("btn-success", "btn-dark");
        }, 2000);
        });
    }