    const beratInput = document.getElementById("beratBadan");
    const tinggiInput = document.getElementById("tinggiBadan");
    const hitungBtn = document.getElementById("hitungBMIBtn");
    const resetBtn = document.getElementById("resetBMIBtn");

    hitungBtn.addEventListener("click", function () {
    const berat = parseFloat(beratInput.value);
    const tinggiCm = parseFloat(tinggiInput.value);

    if (!berat || !tinggiCm) {
        alert("Mohon isi berat dan tinggi badan.");
        return;
    }

    const tinggiM = tinggiCm / 100;
    const bmi = (berat / (tinggiM * tinggiM)).toFixed(1);
    const idealMin = (18.5 * (tinggiM * tinggiM)).toFixed(1);
    const idealMax = (24.9 * (tinggiM * tinggiM)).toFixed(1);

    let kategori = "";
    let warnaClass = "";
    let pesan = "";
    let barWidth = 0;

    if (bmi < 18.5) {
        kategori = "Kekurangan Berat Badan";
        warnaClass = "bg-warning text-dark";
        pesan =
        "Cobalah tingkatkan asupan nutrisi dan konsultasikan dengan ahli gizi untuk mencapai berat badan yang ideal.";
        barWidth = 25;
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        kategori = "Normal (Ideal)";
        warnaClass = "bg-success text-white";
        pesan =
        "Luar biasa! Pertahankan pola makan sehat dan rutin berolahraga untuk tetap menjaga kondisi fisik anda.";
        barWidth = 50;
    } else if (bmi >= 25 && bmi <= 29.9) {
        kategori = "Berat Badan Berlebih";
        warnaClass = "bg-warning text-dark";
        pesan =
        "Anda berada dalam kategori pra-obesitas. Mulailah kurangi asupan kalori dan tingkatkan aktivitas fisik.";
        barWidth = 75;
    } else {
        kategori = "Obesitas";
        warnaClass = "bg-danger text-white";
        pesan =
        "Perhatian! Anda berada dalam kategori risiko kesehatan tinggi. Sangat disarankan untuk memulai pola hidup yang sehat.";
        barWidth = 100;
    }

    document.getElementById("resSkorBMI").innerText = bmi;
    document.getElementById("resKategoriBMI").innerText = kategori;
    document.getElementById(
        "resKategoriBMI"
    ).className = `badge rounded-4 mt-2 px-4 py-3 fw-semibold text-uppercase ${warnaClass}`;
    document.getElementById("rangeIdeal").innerText =
        idealMin + " kg - " + idealMax + " kg";
    document.getElementById(
        "descBMI"
    ).innerHTML = `<p class="small mb-0 fw-semibold text-dark">${pesan}</p>`;
    document.getElementById("bmiBar").style.width = barWidth + "%";
    document.getElementById("bmiBar").className = `progress-bar ${
        warnaClass.split(" ")[0]
    }`;
    document.getElementById("infoIdeal").classList.remove("d-none");

    // UX Scroll Mobile
    if (window.innerWidth < 992) {
        setTimeout(() => {
        document
            .getElementById("hasilBMI")
            .scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }
    });

    resetBtn.addEventListener("click", function () {
    beratInput.value = "";
    tinggiInput.value = "";
    document.getElementById("resSkorBMI").innerText = "0.0";
    document.getElementById("resKategoriBMI").innerText = "Input Data Anda";
    document.getElementById("resKategoriBMI").className =
        "badge rounded-pill mt-2 px-3 py-2 bg-secondary fw-bold text-uppercase";
    document.getElementById("bmiBar").style.width = "0%";
    document.getElementById("infoIdeal").classList.add("d-none");
    document.getElementById("descBMI").innerHTML =
        '<p class="text-muted small mb-0">Silakan masukkan data berat dan tinggi badan untuk melihat analisis kesehatan anda.</p>';
    beratInput.focus();
    });