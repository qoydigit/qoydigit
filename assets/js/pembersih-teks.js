const inputArea = document.getElementById("inputText");
      const outputArea = document.getElementById("outputText");

      function processText() {
        let text = inputArea.value;
        if (!text) {
          outputArea.value = "";
          return;
        }

        // Bersihkan spasi unicode & siluman secara global
        text = text.replace(
          /[\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000]/g,
          " "
        );

        const isCleanSpaces = document.getElementById("optCleanSpaces").checked;
        const isRemoveEmpty = document.getElementById("optRemoveEmpty").checked;
        const isTrim = document.getElementById("optTrim").checked;
        const isRemoveList = document.getElementById("optRemoveList").checked;
        const isRemoveSymbols =
          document.getElementById("optRemoveSymbols").checked;
        const isJoinLines = document.getElementById("optJoinLines").checked;

        let lines = text.split("\n");

        lines = lines.map((line) => {
          let temp = line;

          // 1. Hapus List/Penomoran (1. , - , * , dll)
          if (isRemoveList) {
            temp = temp.replace(/^(\d+[\.\)]|[\*\-\•])\s+/, "");
          }

          // 2. Hapus Simbol (Hanya sisakan huruf, angka, dan spasi)
          if (isRemoveSymbols) {
            temp = temp.replace(/[^a-zA-Z0-9\s]/g, "");
          }

          // 3. Hapus Spasi Ganda & Rata Kiri
          if (isCleanSpaces) {
            temp = temp.replace(/[ \t]+/g, " ").replace(/^\s+/, "");
          }

          // 4. Rapikan (Trim)
          if (isTrim) {
            temp = temp.trim();
          }

          return temp;
        });

        // 5. Hapus Baris Kosong
        if (isRemoveEmpty) {
          lines = lines.filter((line) => line.trim().length > 0);
        }

        // Gabungkan kembali
        let result = lines.join("\n");

        // 6. Gabung Jadi 1 Baris (Menghapus semua newline)
        if (isJoinLines) {
          result = result.replace(/\n+/g, " ");
          // Rapikan lagi spasi jika setelah digabung jadi ganda
          if (isCleanSpaces) result = result.replace(/\s+/g, " ");
        }

        outputArea.value = result.trim();
      }

      function loadExample() {
        inputArea.value = `1.  Halo   Dunia! @#$
2.  Ini contoh   teks   berantakan.
-   Baris   ketiga   dengan   simbol %^&*.
   
    Baris   yang   terpisah   jauh.`;
        processText();
      }

      function clearAll() {
        inputArea.value = "";
        outputArea.value = "";
        processText();
      }

      function copyResult() {
        const outputArea = document.getElementById('outputText'); // Pastikan ID sesuai
        const notify = document.getElementById('copyNotify');

        if (!outputArea.value) return;

        navigator.clipboard.writeText(outputArea.value).then(() => {
           if (notify) {
            notify.classList.remove("d-none"); 

            setTimeout(() => {
                notify.classList.add("d-none");
            }, 2000);
        }
        });
    }