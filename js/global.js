// Tahun Terkini
document.addEventListener('DOMContentLoaded', (event) => {
    const tahunSekarang = document.getElementById('tahun');
    if (tahunSekarang) {
        tahunSekarang.textContent = new Date().getFullYear();
    }
});

// Cookie Banner
document.addEventListener("DOMContentLoaded", function () {
    initCookieBanner();
});

function initCookieBanner() {
    const consent = localStorage.getItem("qoydigit_cookie_consent");
    if (consent) return;
    const style = document.createElement('style');
    style.innerHTML = `
        #qoy-cookie-box {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            width: 91%;
            max-width: 550px;
            animation: qoyFadeIn 0.5s ease-in-out;
        }
        @keyframes qoyFadeIn {
            from { opacity: 0; bottom: 0; }
            to { opacity: 1; bottom: 20px; }
        }
    `;
    document.head.appendChild(style);

    const bannerHTML = `
    <div id="qoy-cookie-box">
        <div class="card shadow-lg border rounded-4">
            <div class="card-body p-3 p-md-4">
                <div class="d-flex align-items-start gap-3">
                    <span class="fs-4">
                    <img
                        src="/assets/logo/qoydigit_logo_circle.png"
                        height="46"
                        alt="qoydigit_logo"
                    />
                    </span>
                    <div>
                        <p class="small text-dark mb-3">
                            <strong>Privasi & Data</strong>
                            <br>
                            Situs ini menggunakan cookie untuk meningkatkan pengalaman anda dan menampilkan konten relevan. Dengan memilih "Setuju", anda menyetujui penggunaan cookie. 
                            <a href="/cookie-policy" class="text-decoration-none text-success">Kebijakan Cookie</a>
                        </p>
                        <div class="d-flex gap-2 justify-content-start">
                        <button id="qoyAccept" class="btn btn-success btn-sm px-4 rounded-3 fw-semibold">Setuju</button>
                            <button id="qoyReject" class="btn btn-link btn-sm text-secondary text-decoration-none fw-semibold">Tolak</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', bannerHTML);

    const cookieBox = document.getElementById("qoy-cookie-box");
    document.getElementById("qoyAccept").addEventListener("click", () => {
        localStorage.setItem("qoydigit_cookie_consent", "accepted");
        cookieBox.remove();
    });

    document.getElementById("qoyReject").addEventListener("click", () => {
        localStorage.setItem("qoydigit_cookie_consent", "rejected");
        cookieBox.remove();
    });
}

// Search and kategori -> Halaman Alat
const allTools = [
    // Alat Teks
    {
        name: "Penghitung Kata",
        cat: "teks",
        desc: "Hitung jumlah kata, karakter, kalimat hingga estimasi membaca dilengkapi dengan analisis dalam satu alat.",
        link: "/alat/penghitung-kata",
    },
    {
        name: "Pengubah Huruf",
        cat: "teks",
        desc: "Ubah teks menjadi huruf besar, huruf kecil, kapital hingga format kalimat secara real-time dan praktis.",
        link: "/alat/pengubah-huruf",
    },
    {
        name: "Pembersih Teks",
        cat: "teks",
        desc: "Bersihkan teks dari spasi berlebih, baris kosong, simbol dan format tidak rapi secara otomatis dan mudah.",
        link: "/alat/pembersih-teks",
    },
    {
        name: "Penghapus Baris Duplikat",
        cat: "teks",
        desc: "Hapus baris teks yang sama secara otomatis untuk membuat dan daftar menjadi lebih rapi dan terstruktur.",
        link: "/alat/penghapus-baris-duplikat",
    },
    {
        name: "Hapus Tanda Baca",
        cat: "teks",
        desc: "Hapus tanda baca, spasi ganda dan ubah teks menjadi satu baris secara cepat dengan cepat dan mudah.",
        link: "/alat/hapus-tanda-baca",
    },
    // Alat Kalkulator
    {
        name: "Kalkulator Harga Diskon",
        cat: "kalkulator",
        desc: "Hitung harga setelah diskon dengan akurat termasuk potongan diskon tambahan cepat dan mudah digunakan.",
        link: "/alat/kalkulator-harga-diskon",
    },
    {
        name: "Kalkulator BMI",
        cat: "kalkulator",
        desc: "Hitung BMI (Body Mass Index) untuk mengetahui kategori berat badan berdasarkan tinggi dan berat badan dengan cepat.",
        link: "/alat/kalkulator-bmi",
    },
    {
        name: "Kalkulator PPN",
        cat: "kalkulator",
        desc: "Hitung PPN 12% dari nominal harga untuk mengetahui total pembayaran dengan cepat dan akurat.",
        link: "/alat/kalkulator-ppn",
    },
    {
        name: "Kalkulator Target Tabungan",
        cat: "kalkulator",
        desc: "Hitung berapa lama waktu yang dibutuhkan untuk mencapai target tabungan berdasarkan jumlah uang setiap bulan.",
        link: "/alat/kalkulator-target-tabungan",
    },
    {
        name: "Kalkulator Alokasi Gaji",
        cat: "kalkulator",
        desc: "Kelola gaji otomatis dengan metode 50/30/20 untuk atur kebutuhan, keinginan, dan tabungan secara ideal.",
        link: "/alat/kalkulator-alokasi-gaji",
    },
];

// Alat Terkait
function displayRelatedTools() {
    const container = document.getElementById("relatedToolsContent");
    const buttonContainer = document.getElementById("relatedButtonContainer");
    if (!container) return;

    const currentPath = window.location.pathname;

    const currentTool = allTools.find(tool => currentPath.includes(tool.link));
    
    if (!currentTool) return;

    const related = allTools.filter(tool => 
        tool.cat === currentTool.cat && !currentPath.includes(tool.link)
    );

    const toolsToShow = related.slice(0, 3);

    let html = "";
    toolsToShow.forEach(tool => {
        html += `
        <div class="col-lg-4 col-md-6">
            <div class="card list-card h-100 border shadow-sm rounded-4 p-4 bg-white position-relative card-hover">
                
                <div class="mb-3">
                    <span class="badge rounded-3 bg-success text-white px-3 py-2 xx-small xx-letspacing fw-bold text-uppercase border-0">
                        ${tool.cat}
                    </span>
                </div>

                <div class="mb-3">
                    <h2 class="fw-bold text-dark fs-5 mb-2">${tool.name}</h2>
                    <p class="text-secondary small mb-0">
                        ${tool.desc}
                    </p>
                </div>

                <div class="mt-auto">
                    <div class="text-success d-inline-flex align-items-center fw-semibold rounded-3 small">
                        Buka Alat <i class="bi bi-arrow-right ms-2"></i>
                    </div>
                </div>

                <a href="${tool.link || "#"}" class="stretched-link" aria-label="Buka alat digital"></a>
            </div>
        </div>`;
    });

    container.innerHTML = html;
    if (buttonContainer) {
        buttonContainer.innerHTML = `
        <div class="text-center">
            <a href="/alat" class="btn btn-success rounded-4 px-4 py-3 fw-semibold">
                Lihat Semua Alat <i class="bi-grid-fill ms-2"></i>
            </a>
        </div>`;
    }
}
// Jalankan otomatis saat halaman siap
document.addEventListener("DOMContentLoaded", displayRelatedTools);

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

// let filteredData = [...allTools];
let filteredData = shuffleArray([...allTools]);
const itemsPerPage = 6;
let currentPage = 1;

function renderTools() {
const grid = document.getElementById("toolsGrid");
grid.innerHTML = "";

const start = (currentPage - 1) * itemsPerPage;
const end = start + itemsPerPage;
const paginatedItems = filteredData.slice(start, end);

if (paginatedItems.length === 0) {
    grid.innerHTML =
    '<div class="text-center text-secondary mt-5">Tidak ada alat ditemukan.</div>';
    renderPagination(0);
    return;
}

paginatedItems.forEach((tool) => {
    grid.innerHTML += `
<div class="col-lg-4 col-md-6 mb-2">
    <div class="card list-card h-100 border shadow-sm rounded-4 p-4 bg-white position-relative card-hover">
        
        <div class="mb-3">
            <span class="badge rounded-3 bg-success text-white px-3 py-2 xx-small xx-letspacing fw-bold text-uppercase border-0">
                ${tool.cat}
            </span>
        </div>

        <div class="mb-3">
            <h2 class="fw-bold text-dark fs-5 mb-2">${tool.name}</h2>
            <p class="text-secondary small mb-0">
                ${tool.desc}
            </p>
        </div>

        <div class="mt-auto">
            <div class="text-success d-inline-flex align-items-center fw-semibold rounded-3 small">
                Buka Alat <i class="bi bi-arrow-right ms-2"></i>
            </div>
        </div>

        <a href="${tool.link || "#"}" class="stretched-link" aria-label="Buka alat digital"></a>
    </div>
</div>
`;
});
renderPagination(Math.ceil(filteredData.length / itemsPerPage));
}

function renderPagination(totalPages) {
const container = document.getElementById("paginationControls");
container.innerHTML = "";
if (totalPages <= 1) return;

const prevDisabled = currentPage === 1;
container.innerHTML += `
    <li class="page-item">
    <button class="btn btn-outline-dark rounded-3 fw-bold d-flex align-items-center" 
            ${prevDisabled ? "disabled opacity-50" : ""} 
            onclick="goToPage(${currentPage - 1})">
        <i class="bi bi-chevron-left"></i>
    </button>
    </li>
`;

const range = 1;
for (let i = 1; i <= totalPages; i++) {
    if (
    i === 1 ||
    i === totalPages ||
    (i >= currentPage - range && i <= currentPage + range)
    ) {
    const isActive = i === currentPage;
    const btnClass = isActive
        ? "btn-success text-white shadow"
        : "btn-outline-secondary text-dark bg-white border-light-subtle";

    container.innerHTML += `
        <li class="page-item mx-1">
        <button class="btn ${btnClass} rounded-3 px-2 py-2 fw-bold" style="min-width: 35px; font-size: 0.85rem;" onclick="goToPage(${i})">
            ${i}
        </button>
        </li>
    `;
    } else if (
    i === currentPage - range - 1 ||
    i === currentPage + range + 1
    ) {
    container.innerHTML += `<li class="page-item mx-0 align-self-center text-muted small">...</li>`;
    }
}

const nextDisabled = currentPage === totalPages;
container.innerHTML += `
    <li class="page-item">
    <button class="btn btn-outline-dark rounded-3 fw-bold d-flex align-items-center" 
            ${nextDisabled ? "disabled opacity-50" : ""} 
            onclick="goToPage(${currentPage + 1})">
        <i class="bi bi-chevron-right"></i>
    </button>
    </li>
`;
}

window.goToPage = function (page) {
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
if (page < 1 || page > totalPages) return;
currentPage = page;
renderTools();
window.scrollTo({
    top: document.getElementById("searchInput").offsetTop - 130,
    behavior: "smooth",
});
};

function applyFilters() {
const term = document.getElementById("searchInput").value.toLowerCase();
const cat = document.getElementById("categorySelect").value;
filteredData = allTools.filter(
    (t) =>
    t.name.toLowerCase().includes(term) &&
    (cat === "all" || t.cat === cat)
);
currentPage = 1;
renderTools();
}

document
.getElementById("searchInput")
.addEventListener("input", applyFilters);
document
.getElementById("categorySelect")
.addEventListener("change", applyFilters);

renderTools();