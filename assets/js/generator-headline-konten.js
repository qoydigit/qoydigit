    const canvas = document.getElementById("mainCanvas"),
        ctx = canvas.getContext("2d");
      const inputs = [
        "imgLoad",
        "brandLoad",
        "captionText",
        "wmText",
        "fsSlider",
        "lsSlider",
        "lhSlider",
        "fontFamily",
        "fontWeight",
        "lSizeSlider",
        "lPosYSlider",
        "lightMode",
        "darkMode",
      ];
      const el = {};
      inputs.forEach((id) => (el[id] = document.getElementById(id)));

      canvas.width = 1080;
      canvas.height = 1350;
      let mainImg = null,
        brandImg = null;

      const placeholderURL =
        "https://images.unsplash.com/photo-1583251633146-d0c6c036187d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

      function loadPlaceholder() {
        mainImg = new Image();
        mainImg.crossOrigin = "anonymous";
        mainImg.onload = render;
        mainImg.src = placeholderURL;
      }

      function render() {
        const isDark = el.darkMode.checked;
        ctx.fillStyle = isDark ? "#000" : "#fff";
        ctx.fillRect(0, 0, 1080, 1350);
        const textColor = isDark ? "#fff" : "#000";
        const placeholderColor = isDark ? "#fff" : "#000";

        if (mainImg) {
          const ratio = mainImg.width / mainImg.height,
            tRatio = 1080 / 880;
          let sw, sh, sx, sy;
          if (ratio > tRatio) {
            sh = mainImg.height;
            sw = mainImg.height * tRatio;
            sx = (mainImg.width - sw) / 2;
            sy = 0;
          } else {
            sw = mainImg.width;
            sh = mainImg.width / tRatio;
            sx = 0;
            sy = (mainImg.height - sh) / 2;
          }
          ctx.drawImage(mainImg, sx, sy, sw, sh, 0, 0, 1080, 880);
        } else {
          ctx.fillStyle = isDark ? "#111827" : "#f8fafc";
          ctx.fillRect(0, 0, 1080, 880);
          ctx.fillStyle = isDark ? "#374151" : "#cbd5e1";
          ctx.textAlign = "center";
          ctx.font = "700 32px 'Plus Jakarta Sans'";
          ctx.fillText("MASUKKAN FOTO", 540, 440);
        }

        const fSize = parseInt(el.fsSlider.value);
        const lSpacing = parseInt(el.lsSlider.value);
        const lHeight = parseFloat(el.lhSlider.value);
        const fWeight = el.fontWeight.value;

        document.getElementById("fsLabel").innerText = fSize;
        document.getElementById("lsLabel").innerText = lSpacing;
        document.getElementById("lhLabel").innerText = lHeight;

        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.font = `${fWeight} ${fSize}px ${el.fontFamily.value}`;
        ctx.letterSpacing = lSpacing + "px";

        const hasText = el.captionText.value.trim().length > 0;
        ctx.fillStyle = hasText ? textColor : placeholderColor;
        const rawCaption = hasText
          ? el.captionText.value.toUpperCase()
          : "CAPTION";

        const lines = wrapText(ctx, rawCaption, 960);
        let currentY = 880 + 60;
        const lineJump = fSize * lHeight;

        for (let line of lines) {
          if (currentY + fSize > 1220) {
            ctx.fillText("...", 60, currentY);
            break;
          }
          ctx.fillText(line, 60, currentY);
          currentY += lineJump;
        }

        if (brandImg) {
          const h = parseInt(el.lSizeSlider.value),
            y = parseInt(el.lPosYSlider.value);
          document.getElementById("lSizeLabel").innerText = h;
          document.getElementById("lPosYLabel").innerText = y;
          ctx.letterSpacing = "0px";
          ctx.drawImage(
            brandImg,
            1020 - (brandImg.width / brandImg.height) * h,
            y,
            (brandImg.width / brandImg.height) * h,
            h,
          );
        } else {
          ctx.letterSpacing = "0px";
          ctx.textAlign = "right";
          ctx.font = "800 50px 'Plus Jakarta Sans'";
          const hasWm = el.wmText.value.trim().length > 0;
          ctx.fillStyle = hasWm ? (isDark ? "#fff" : "#000") : placeholderColor;
          ctx.fillText(hasWm ? el.wmText.value : "username", 1020, 1250);
        }
      }

      function wrapText(ctx, text, maxWidth) {
        let words = text.split(" "),
          lines = [],
          current = "";
        for (let word of words) {
          let test = current + word + " ";
          if (ctx.measureText(test).width > maxWidth) {
            lines.push(current.trim());
            current = word + " ";
          } else {
            current = test;
          }
        }
        lines.push(current.trim());
        return lines;
      }

      el.imgLoad.onchange = (e) => {
        if (!e.target.files[0]) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          mainImg = new Image();
          mainImg.onload = render;
          mainImg.src = ev.target.result;
          document.getElementById("imgLabel").classList.add("active-upload");
          document.getElementById("removeMainImg").style.display = "block";
        };
        reader.readAsDataURL(e.target.files[0]);
      };

      document.getElementById("removeMainImg").onclick = () => {
        el.imgLoad.value = "";
        document.getElementById("removeMainImg").style.display = "none";
        document.getElementById("imgLabel").classList.remove("active-upload");
        loadPlaceholder();
      };

      el.brandLoad.onchange = (e) => {
        if (!e.target.files[0]) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          brandImg = new Image();
          brandImg.onload = () => {
            render();
            document.getElementById("removeBrand").style.display = "block";
            document.getElementById("logoControls").style.display = "block";
            document
              .getElementById("brandLabel")
              .classList.add("active-upload");
          };
          brandImg.src = ev.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      };

      document.getElementById("removeBrand").onclick = () => {
        brandImg = null;
        el.brandLoad.value = "";
        document.getElementById("removeBrand").style.display = "none";
        document.getElementById("logoControls").style.display = "none";
        document.getElementById("brandLabel").classList.remove("active-upload");
        render();
      };

      inputs.forEach((id) => (el[id].oninput = render));
      document.getElementById("saveImage").onclick = () => {
        const link = document.createElement("a");
        link.download = `result.png`;
        link.href = canvas.toDataURL("image/png", 1.0);
        link.click();
      };

      async function init() {
        loadPlaceholder();
      }
      init();