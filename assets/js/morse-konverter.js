    const MORSE_MAP = {
        A: ".-",
        B: "-...",
        C: "-.-.",
        D: "-..",
        E: ".",
        F: "..-.",
        G: "--.",
        H: "....",
        I: "..",
        J: ".---",
        K: "-.-",
        L: ".-..",
        M: "--",
        N: "-.",
        O: "---",
        P: ".--.",
        Q: "--.-",
        R: ".-.",
        S: "...",
        T: "-",
        U: "..-",
        V: "...-",
        W: ".--",
        X: "-..-",
        Y: "-.--",
        Z: "--..",
        1: ".----",
        2: "..---",
        3: "...--",
        4: "....-",
        5: ".....",
        6: "-....",
        7: "--...",
        8: "---..",
        9: "----.",
        0: "-----",
        " ": "/",
    };

    const REVERSE_MORSE = {};
    for (const key in MORSE_MAP) {
        REVERSE_MORSE[MORSE_MAP[key]] = key;
    }

    function convert() {
        const inputField = document.getElementById("mainInput");
        const outputField = document.getElementById("mainOutput");
        const sw = document.getElementById("modeSwitch");
        if (!inputField || !outputField) return;

        const input = inputField.value.trim().toUpperCase();
        const isMorseToText = sw ? sw.checked : false;

        if (input === "") {
        outputField.value = "";
        return;
        }

        if (!isMorseToText) {
        // Teks ke Morse
        const result = input
            .split("")
            .map((char) => MORSE_MAP[char] || "")
            .filter((item) => item !== "")
            .join(" ");
        outputField.value = result;
        } else {
        // Morse ke Teks
        const codes = input.split(/\s+/);
        const result = codes
            .map((code) => REVERSE_MORSE[code] || "")
            .join("");
        outputField.value = result;
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

        // Update Label & Placeholder
        if (!sw.checked) {
        if (labelIn) labelIn.innerText = "Masukkan Teks:";
        if (labelOut) labelOut.innerText = "Hasil Kode Morse:";
        inputField.placeholder = "Ketik atau tempel teks di sini...";
        } else {
        if (labelIn) labelIn.innerText = "Masukkan Kode Morse:";
        if (labelOut) labelOut.innerText = "Hasil Teks:";
        inputField.placeholder = "Ketik atau tempel teks di sini...";
        }

        // Swap Logic
        const oldOut = outputField.value.trim();
        if (oldOut !== "" && !oldOut.includes("valid")) {
        inputField.value = oldOut;
        convert();
        } else {
        convert();
        }
    }

    function useExample() {
        const sw = document.getElementById("modeSwitch");
        const inputField = document.getElementById("mainInput");
        inputField.value =
        !sw || !sw.checked ? "HELLO" : ".... . .-.. .-.. ---";
        convert();
        inputField.focus();
    }

    function resetTool() {
        document.getElementById("mainInput").value = "";
        document.getElementById("mainOutput").value = "";
        document.getElementById("mainInput").focus();
    }

    function copyResult() {
        const outputField = document.getElementById("mainOutput");
        const btn = document.getElementById("copyBtn");
        if (!outputField || !outputField.value) return;

        navigator.clipboard.writeText(outputField.value).then(() => {
        const original = btn.innerHTML;
        btn.innerHTML =
            '<i class="bi bi-check2-all me-2"></i>Berhasil Disalin!';
        btn.classList.replace("btn-dark", "btn-success");

        setTimeout(() => {
            btn.innerHTML = original;
            btn.classList.replace("btn-success", "btn-dark");
        }, 2000);
        });
    }