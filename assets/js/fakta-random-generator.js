let storageFakta = [];
let shuffledFakta = [];
let currentIndex = 0;
let isDataLoaded = false;

const btnNext = document.getElementById("next-btn");
const mainContent = document.getElementById("main-content");
const collapseEl = document.getElementById("collapseDetail");

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

async function loadJSON() {
try {
    const response = await fetch("/assets/json/fakta.json");
    if (!response.ok) throw new Error();
    storageFakta = await response.json();

    shuffledFakta = shuffleArray([...storageFakta]);
    isDataLoaded = true;
    currentIndex = 0;
} catch (error) {
    isDataLoaded = false;
    console.error("Gagal memuat JSON.");
}
}

function renderNextFact() {
if (!isDataLoaded) {
    document.getElementById("fact-detail").innerHTML =
    `<div class="text-center py-5"><i class="bi bi-cloud-slash display-4 text-danger mb-3"></i><p>Gagal memuat data fakta selanjutnya.</p></div>`;
    return;
}

mainContent.classList.add("is-hidden");

setTimeout(() => {
    const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
    if (bsCollapse) bsCollapse.hide();

    const currentFact = shuffledFakta[currentIndex];

    document.getElementById("fact-category").innerText = currentFact.kat;
    document.getElementById("fact-text").innerText =
    `"${currentFact.teks}"`;
    document.getElementById("src-name").innerText = currentFact.src;

    const factDetailElement = document.getElementById("fact-detail");

    if (currentFact.detail) {
    const paragraphs = currentFact.detail.split("<br><br>");
    let finalHTML = "";
    const midPoint = 0;

    paragraphs.forEach((para, index) => {
        finalHTML += `<p>${para}</p>`;

        if (index === midPoint && currentFact.img) {
        finalHTML += `
        <figure class="figure mb-0 pb-2">
            <img src="${currentFact.img}" class="figure-img img-fluid rounded" alt="${currentFact.teks}">
            <figcaption class="figure-caption">
                Foto oleh: <strong>${currentFact.credit || "Kontributor Pexels"}</strong> (Pexels)
            </figcaption>
        </figure>
    `;
        }
    });
    factDetailElement.innerHTML = finalHTML;
    } else {
    factDetailElement.innerHTML = `<p>Tidak ada detail penjelasan tersedia.</p>`;
    }
    document.querySelector(".scroll-area").scrollTop = 0;
    mainContent.classList.remove("is-hidden");

    currentIndex++;

    if (currentIndex >= shuffledFakta.length) {
    shuffledFakta = shuffleArray([...storageFakta]);
    currentIndex = 0;
    console.log(
        "Semua fakta telah ditampilkan. Mengacak ulang daftar...",
    );
    }
}, 400);
}

btnNext.addEventListener("click", renderNextFact);
const collapseDetail = document.getElementById("collapseDetail");

collapseDetail.addEventListener("shown.bs.collapse", function () {
collapseDetail.scrollIntoView({
    behavior: "smooth",
    block: "start",
});
});
window.onload = loadJSON;