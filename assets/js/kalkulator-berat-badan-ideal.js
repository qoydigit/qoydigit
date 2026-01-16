function hitungSemuaMetode() {
    const tinggi = parseFloat(
    document.getElementById("tinggiBadan").value
    );
    const gender = document.querySelector(
    'input[name="gender"]:checked'
    ).value;

    if (!tinggi || tinggi < 50) {
    alert("Masukkan tinggi badan yang valid.");
    return;
    }

    const tinggiInci = tinggi / 2.54;
    const inciDiatas5Kaki = tinggiInci - 60; // 5 kaki = 60 inci (152.4 cm)

    // 1. Rumus Broca
    let broca;
    if (gender === "pria") {
    broca = tinggi - 100 - (tinggi - 100) * 0.1;
    } else {
    broca = tinggi - 100 - (tinggi - 100) * 0.15;
    }

    // Perhitungan Klinis (Hanya jika tinggi > 152.4 cm untuk akurasi terbaik)
    let robinson, miller, devine, hamwi;
    const inciValid = inciDiatas5Kaki > 0 ? inciDiatas5Kaki : 0;

    if (gender === "pria") {
    robinson = 52 + 1.9 * inciValid;
    miller = 56.2 + 1.41 * inciValid;
    devine = 50 + 2.3 * inciValid;
    hamwi = 48 + 2.7 * inciValid;
    } else {
    robinson = 49 + 1.7 * inciValid;
    miller = 53.1 + 1.36 * inciValid;
    devine = 45.5 + 2.3 * inciValid;
    hamwi = 45.5 + 2.2 * inciValid;
    }

    // 6. Rentang BMI (18.5 - 24.9)
    const tMeter = tinggi / 100;
    const bmiMin = (18.5 * (tMeter * tMeter)).toFixed(1);
    const bmiMax = (24.9 * (tMeter * tMeter)).toFixed(1);

    // Render ke Tabel
    document.getElementById(
    "resBroca"
    ).innerHTML = `<strong>${broca.toFixed(1)} kg</strong>`;
    document.getElementById(
    "resRobinson"
    ).innerHTML = `<strong>${robinson.toFixed(1)} kg</strong>`;
    document.getElementById(
    "resMiller"
    ).innerHTML = `<strong>${miller.toFixed(1)} kg</strong>`;
    document.getElementById(
    "resDevine"
    ).innerHTML = `<strong>${devine.toFixed(1)} kg</strong>`;
    document.getElementById(
    "resHamwi"
    ).innerHTML = `<strong>${hamwi.toFixed(1)} kg</strong>`;
    document.getElementById(
    "resBMI"
    ).innerText = `${bmiMin} kg - ${bmiMax} kg`;
}

function hapusForm() {
    document.getElementById("tinggiBadan").value = "";
    document.getElementById("usia").value = "";
    const ids = [
    "resBroca",
    "resRobinson",
    "resMiller",
    "resDevine",
    "resHamwi",
    "resBMI",
    ];
    ids.forEach(
    (id) => (document.getElementById(id).innerText = "-")
    );
}