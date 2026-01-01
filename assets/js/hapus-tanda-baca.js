    function processPunctuation() {
        const input = document.getElementById("inputText").value;
        const isCleanSpasi = document.getElementById("optCleanSpasi").checked;
        const isOneLine = document.getElementById("optRemoveLineBreak").checked;

        if (!input) return;

        // 1. Ganti semua simbol KECUALI huruf, angka, spasi, dan baris baru (\n) menjadi SPASI
        // Kita tambahkan \n di dalam regex agar enter tidak hilang di tahap ini
        let result = input.replace(/[^a-zA-Z0-9\s\n]/gi, " ");

        // 2. Jika "Jadikan Satu Baris" AKTIF, hapus baris baru
        if (isOneLine) {
          result = result.replace(/\n/g, " ");
        }

        // 3. Bersihkan spasi ganda
        if (isCleanSpasi) {
          if (isOneLine) {
            // Jika satu baris, bersihkan semua spasi ganda secara total
            result = result.replace(/\s+/g, " ").trim();
          } else {
            // Jika tetap berbaris, bersihkan spasi ganda per baris agar enter tidak hilang
            result = result
              .split("\n")
              .map((line) => line.replace(/[ \t]+/g, " ").trim())
              .join("\n");
            // Menghapus baris kosong yang benar-benar tidak ada teksnya
            result = result.replace(/\n\s*\n/g, "\n").trim();
          }
        }

        document.getElementById("outputText").value = result;
    }

      function clearAll() {
        document.getElementById("inputText").value = "";
        document.getElementById("outputText").value = "";
        document.getElementById("optRemoveLineBreak").checked = false;
        document.getElementById("optCleanSpasi").checked = true;
        document.getElementById("inputText").focus();
    }

      function copyToClipboard() {
        const output = document.getElementById("outputText");
        const notify = document.getElementById("copyNotify");

        if (!output.value) return;

        // Proses Salin
        output.select();
        output.setSelectionRange(0, 99999); // Untuk mobile
        document.execCommand("copy");

        // Hilangkan seleksi biru setelah copy (opsional, agar rapi)
        window.getSelection().removeAllRanges();

        // Tampilkan Notifikasi
        notify.classList.remove("d-none");
        notify.classList.add("d-block");

        // Sembunyikan kembali setelah 2 detik
        setTimeout(() => {
          notify.classList.remove("d-block");
          notify.classList.add("d-none");
        }, 2000);
    }