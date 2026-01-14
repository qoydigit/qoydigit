    function calculateWater() {
        const weightVal = parseFloat(
        document.getElementById("weightInput").value
        );
        const unit = document.getElementById("unitInput").value;
        const gender = document.getElementById("genderInput").value;
        const activityBonus = parseFloat(
        document.getElementById("activityInput").value
        );

        const resultDisplay = document.getElementById("waterResult");
        const glassDisplay = document.getElementById("glassResult");

        if (!weightVal || weightVal <= 0) {
        resultDisplay.innerText = "0.0 Liter";
        glassDisplay.innerText = "Setara 0 Gelas (250ml)";
        return;
        }

        // Konversi LBS ke KG
        let weightKg = unit === "lbs" ? weightVal * 0.453592 : weightVal;

        let baseRate = gender === "male" ? 35 : 31;

        let totalLiters = (weightKg * baseRate) / 1000 + activityBonus;

        resultDisplay.innerText = totalLiters.toFixed(1) + " Liter";

        let totalGlasses = Math.round((totalLiters * 1000) / 250);
        glassDisplay.innerText =
        "Setara " + totalGlasses + " Gelas (250ml)";
    }