const input = document.getElementById("textInput");
input.addEventListener("input", () => {
const text = input.value;

// 1. Penghitungan Kata
const words = text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0);

// 2. Penghitungan Kalimat (Ditambahkan)
const sentences = text
    .split(/[.!?]+/)
    .filter((s) => s.trim().length > 0);

// 3. Penghitungan Paragraf
const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);

// Update UI Statistik Dasar
document.getElementById("wordCount").innerText =
    words.length.toLocaleString();
document.getElementById("charCount").innerText =
    text.length.toLocaleString();
document.getElementById("sentenceCount").innerText =
    sentences.length.toLocaleString(); // Tampilkan kalimat
document.getElementById("paraCount").innerText = paragraphs.length;

const charLimitEl = document.getElementById("charLimit");
if (charLimitEl)
    charLimitEl.innerText = `${text.length.toLocaleString()} Karakter`;

// 4. Kata Unik
const cleanWords = words.map((w) =>
    w.toLowerCase().replace(/[.,!?;:()]/g, "")
);
document.getElementById("uniqueWords").innerText = new Set(
    cleanWords
).size;

// 5. Estimasi Waktu (Standard 110 KPM Bicara, 200 KPM Baca)
const secSpeak = Math.ceil((words.length / 110) * 60);
document.getElementById("speakTime").innerText =
    secSpeak >= 60
    ? `${Math.floor(secSpeak / 60)}m ${secSpeak % 60}d`
    : `${secSpeak} dtk`;

const secRead = Math.ceil((words.length / 200) * 60);
document.getElementById("readTime").innerText =
    secRead >= 60
    ? `${Math.floor(secRead / 60)}m ${secRead % 60}d`
    : `${secRead} dtk`;

// 6. Rata-rata Kalimat & Keterbacaan
const avg =
    sentences.length > 0
    ? (words.length / sentences.length).toFixed(1)
    : 0;
document.getElementById("avgWordsPerSent").innerText = avg;
updateReadability(avg, words.length);

// 7. Kepadatan Kata (Keywords)
const stopWords = [
    "yang",
    "untuk",
    "dalam",
    "dengan",
    "adalah",
    "akan",
    "dari",
    "pada",
    "juga",
    "atau",
    "oleh",
    "serta",
    "telah",
    "bisa",
    "sudah",
];
const dict = {};
cleanWords.forEach((word) => {
    if (word.length > 3 && !stopWords.includes(word)) {
    dict[word] = (dict[word] || 0) + 1;
    }
});

const sorted = Object.entries(dict)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
const densityContainer = document.getElementById("keywordDensity");

if (sorted.length > 0) {
    densityContainer.innerHTML = sorted
    .map(
        (i) => `
<div class="bg-white border border-light-subtle py-2 px-3 rounded-3 small fw-bold text-dark shadow-sm">
    ${i[0]} <span class="text-success ms-1">${(
        (i[1] / words.length) *
        100
        ).toFixed(1)}%</span>
</div>`
    )
    .join("");
} else {
    densityContainer.innerHTML =
    '<span class="text-muted small">Tidak ada data </span>';
}
});

function updateReadability(avg, total) {
const s = document.getElementById("readabilityStatus");
const d = document.getElementById("readabilityDesc");
const b = document.getElementById("readabilityBox");

if (total === 0) {
    s.innerText = "...";
    d.innerText = "Tidak ada data";
    b.className =
    "p-3 rounded-4 bg-light border border-light-subtle h-100 text-dark";
    return;
}

if (total < 5) {
    s.innerText = "...";
    d.innerText = "Teks terlalu pendek.";
    b.className =
    "p-3 rounded-4 bg-dark-subtle border border-dark-subtle h-100 text-dark";
    return;
}

if (avg <= 14) {
    s.innerText = "Mudah";
    d.innerText = "Sangat mudah dibaca";
    b.className =
    "p-3 rounded-4 bg-success-subtle border border-success-subtle h-100 text-success";
} else if (avg <= 20) {
    s.innerText = "Sedang";
    d.innerText = "Cukup mudah dibaca";
    b.className =
    "p-3 rounded-4 bg-warning-subtle border border-warning-subtle h-100 text-warning";
} else {
    s.innerText = "Sulit";
    d.innerText = "Cukup sulit dibaca";
    b.className =
    "p-3 rounded-4 bg-danger-subtle border border-danger-subtle h-100 text-danger";
}
}

function copyStats() {
const keywordsEl = document.getElementById("keywordDensity");
const keywordItems = keywordsEl.querySelectorAll("div");
let topKeywordsText =
    keywordItems.length > 0
    ? Array.from(keywordItems)
        .map((item) => item.innerText.replace(/\s+/g, " ").trim())
        .join(", ")
    : "Tidak ada data";

const report =
    `Hasil Analisis Teks\n` +
    `-------------------\n` +
    `Kata: ${document.getElementById("wordCount").innerText}\n` +
    `Karakter: ${document.getElementById("charCount").innerText}\n` +
    `Kalimat: ${document.getElementById("sentenceCount").innerText}\n` +
    `Paragraf: ${document.getElementById("paraCount").innerText}\n` +
    `Kata Unik: ${document.getElementById("uniqueWords").innerText}\n` +
    `-------------------\n` +
    `Level Baca: ${
    document.getElementById("readabilityStatus").innerText
    }\n` +
    `Waktu Baca: ${document.getElementById("readTime").innerText}\n` +
    `Waktu Bicara: ${
    document.getElementById("speakTime").innerText
    }\n` +
    `Rata-rata: ${
    document.getElementById("avgWordsPerSent").innerText
    } kata/kalimat\n` + 
    `-------------------\n` +
    `Presentase Kata Terbanyak:\n${topKeywordsText}\n` +
    `-------------------`;

copyToSystem(report);
}

function copyToClipboard() {
if (!input.value) return;
copyToSystem(input.value);
}

function copyToSystem(text) {
if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
    .writeText(text)
    .then(() => {
        showNotifyIfStats(text);
    })
    .catch(() => {
        fallbackCopy(text);
    });
} else {
    fallbackCopy(text);
}
}

function fallbackCopy(text) {
const textArea = document.createElement("textarea");
textArea.value = text;
textArea.style.position = "fixed";
textArea.style.left = "-9999px";
textArea.style.top = "0";
document.body.appendChild(textArea);
textArea.focus();
textArea.select();
textArea.setSelectionRange(0, 99999);
try {
    document.execCommand("copy");
    showNotifyIfStats(text);
} catch (err) {
    console.error("Gagal copy");
}
document.body.removeChild(textArea);
}

function showNotifyIfStats(text) {
if (text.includes("-------------------")) {
    const notify = document.getElementById("copyNotify");
    if (notify) {
    notify.style.display = "block";
    setTimeout(() => (notify.style.display = "none"), 3000);
    }
}
}

function clearText() {
input.value = "";
input.dispatchEvent(new Event("input"));
}