function updateLength(val) {
    document.getElementById("lengthVal").innerText = val;
}

function checkManualStrength(pass) {
    if (pass.length === 0) {
    document.getElementById("strengthBar").style.width = "0%";
    document.getElementById("strengthText").innerHTML =
        "Kekuatan: -";
    return;
    }

    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSymbol = /[!@#$%^&*()_+]/.test(pass);
    const length = pass.length;

    updateStrength(
    pass,
    hasUpper && hasLower,
    hasNumber,
    hasSymbol,
    length
    );
}

function generatePass() {
    const length = document.getElementById("passLength").value;
    const hasUpper = document.getElementById("incUppercase").checked;
    const hasNumber = document.getElementById("incNumbers").checked;
    const hasSymbol = document.getElementById("incSymbols").checked;

    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+";

    let allChars = lowerChars;
    if (hasUpper) allChars += upperChars;
    if (hasNumber) allChars += numChars;
    if (hasSymbol) allChars += symbolChars;

    let password = "";
    for (let i = 0; i < length; i++) {
    password += allChars.charAt(
        Math.floor(Math.random() * allChars.length)
    );
    }

    document.getElementById("passOutput").value = password;
    updateStrength(password, hasUpper, hasNumber, hasSymbol, length);
}

function updateStrength(pass, u, n, s, len) {
    const bar = document.getElementById("strengthBar");
    const text = document.getElementById("strengthText");
    let score = 0;

    // Logika Skor
    if (len >= 8) score++;
    if (len >= 12) score++;
    if (u) score++;
    if (n) score++;
    if (s) score++;

    let width = (score / 5) * 100;
    bar.style.width = width + "%";

    if (score <= 2) {
    bar.className = "progress-bar progress-bar-animated bg-danger";
    text.innerHTML =
        'Kekuatan: <span class="text-danger fw-bold">Lemah</span>';
    } else if (score <= 4) {
    bar.className = "progress-bar progress-bar-animated bg-warning";
    text.innerHTML =
        'Kekuatan: <span class="text-warning fw-bold">Cukup Kuat</span>';
    } else {
    bar.className = "progress-bar progress-bar-animated bg-success";
    text.innerHTML =
        'Kekuatan: <span class="text-success fw-bold">Sangat Kuat</span>';
    }
}

function copyPassword() {
    const copyText = document.getElementById("passOutput");
    if (copyText.value === "") return;
    navigator.clipboard.writeText(copyText.value);

    const btn = event.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML =
    '<i class="bi bi-check2-all me-2"></i>Berhasil disalin!';
    btn.classList.replace("btn-dark", "btn-outline-dark");

    setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.classList.replace("btn-outline-dark", "btn-dark");
    }, 2000);
}

window.onload = generatePass;