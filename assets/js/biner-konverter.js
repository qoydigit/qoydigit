    function triggerSwitch(btnElement) {
            const sw = document.getElementById("modeSwitch");
            const inputField = document.getElementById("mainInput");
            const outputField = document.getElementById("mainOutput");
            const labelInput = document.getElementById("labelInput");
            const labelOutput = document.getElementById("labelOutput");

            if (!sw || !inputField || !outputField) return;

            if (btnElement) {
            btnElement.classList.add("rotate-anim");
            setTimeout(
                () => btnElement.classList.remove("rotate-anim"),
                400
            );
        }

        const currentInput = inputField.value.trim();
        const currentOutput = outputField.value.trim();

        sw.checked = !sw.checked;

        if (!sw.checked) {
        if (labelInput) labelInput.innerText = "Masukkan Teks:";
        if (labelOutput)
            labelOutput.innerText = "Hasil Konversi (Biner):";
        inputField.placeholder = "Ketik atau tempel teks di sini...";
        } else {
        if (labelInput) labelInput.innerText = "Masukkan Kode Biner:";
        if (labelOutput)
            labelOutput.innerText = "Hasil Konversi (Teks):";
        inputField.placeholder = "Contoh: 01001000 01101001...";
        }

        if (currentInput === "" && currentOutput === "") {
        inputField.value = "";
        outputField.value = "";
        return;
        }

        if (
        currentOutput !== "" &&
        !currentOutput.includes("valid") &&
        !currentOutput.includes("Kesalahan")
        ) {
        inputField.value = currentOutput;
        }

        if (inputField.value.trim() !== "") {
        convert();
        } else {
        outputField.value = "";
        }
    }

    function convert() {
        const inputField = document.getElementById("mainInput");
        const outputField = document.getElementById("mainOutput");
        const sw = document.getElementById("modeSwitch");

        if (!inputField || !outputField) return;

        const input = inputField.value.trim();
        const isChecked = sw ? sw.checked : false;

        if (!input) {
        outputField.value = "";
        return;
        }

        try {
        let result = "";
        if (!isChecked) {
            // Mode: Teks ke Biner
            result = input
            .split("")
            .map((char) =>
                char.charCodeAt(0).toString(2).padStart(8, "0")
            )
            .join(" ");
        } else {
            // Mode: Biner ke Teks
            result = input
            .split(/\s+/)
            .map((bin) => {
                if (!/^[01]+$/.test(bin)) return "";
                return String.fromCharCode(parseInt(bin, 2));
            })
            .join("");
        }

        outputField.value = result || "Format biner tidak valid";
        } catch (e) {
        outputField.value = "Kesalahan konversi!";
        }
    }

    function useExample() {
        const sw = document.getElementById("modeSwitch");
        const inputField = document.getElementById("mainInput");
        if (!sw || !inputField) return;

        inputField.value = !sw.checked
        ? "Halo Dunia"
        : "01001000 01100001 01101100 01101111";
        convert();
        inputField.focus();
    }

    function copyResult() {
        const outputField = document.getElementById("mainOutput");
        const btn = document.getElementById("copyBtn");
        const text = outputField.value;

        if (!text || text.includes("valid") || text.includes("Kesalahan"))
        return;

        navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML =
            '<i class="bi bi-check2-all me-2"></i>Berhasil Disalin!';
        btn.classList.replace("btn-dark", "btn-success");

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.replace("btn-success", "btn-dark");
        }, 2000);
        });
    }

    function resetTool() {
        const inputField = document.getElementById("mainInput");
        if (inputField) {
        inputField.value = "";
        convert();
        inputField.focus();
        }
    }