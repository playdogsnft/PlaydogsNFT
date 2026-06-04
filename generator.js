// PLAYDOGS Studio - Procedural Pixel Art Generator Engine (32x32)

// Breed Presets Database
const BREED_PRESETS = {
  golden_retriever: {
    name: "Golden Retriever",
    baseColor: "#e6b85c", shadeColor: "#c69324", muzzleColor: "#f7d58f",
    earType: "floppy", earSize: [4, 8], snoutType: "standard", snoutSize: [8, 5],
    fluffiness: 1, eyeColor: "#593e1a"
  },
  husky: {
    name: "Husky",
    baseColor: "#616e7d", shadeColor: "#424d5a", muzzleColor: "#f5f5f7",
    earType: "pointy", earSize: [4, 6], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "husky", eyeColor: "#00f0ff"
  },
  german_shepherd: {
    name: "German Shepherd",
    baseColor: "#b3743b", shadeColor: "#804c1c", muzzleColor: "#222222",
    earType: "pointy", earSize: [4, 7], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "gsd", eyeColor: "#4a2c11"
  },
  shiba_inu: {
    name: "Shiba Inu",
    baseColor: "#e07a3f", shadeColor: "#b24d15", muzzleColor: "#ffffff",
    earType: "pointy", earSize: [4, 5], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "shiba", eyeColor: "#422817"
  },
  labrador: {
    name: "Labrador",
    baseColor: "#f5e1b5", shadeColor: "#dcc187", muzzleColor: "#fbf3dc",
    earType: "floppy", earSize: [4, 7], snoutType: "standard", snoutSize: [8, 5],
    eyeColor: "#3a2512"
  },
  pug: {
    name: "Pug",
    baseColor: "#dfc29e", shadeColor: "#bf9e75", muzzleColor: "#26252d",
    earType: "floppy", earSize: [3, 5], snoutType: "squashed", snoutSize: [10, 4],
    hasMask: "pug", eyeColor: "#2c1c0e"
  },
  rottweiler: {
    name: "Rottweiler",
    baseColor: "#24252a", shadeColor: "#121316", muzzleColor: "#c6702b",
    earType: "floppy", earSize: [4, 6], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "rottweiler", eyeColor: "#523218"
  },
  border_collie: {
    name: "Border Collie",
    baseColor: "#1d1f21", shadeColor: "#0b0c0d", muzzleColor: "#f8f9fa",
    earType: "cropped", earSize: [4, 5], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "collie", eyeColor: "#5d4037"
  },
  beagle: {
    name: "Beagle",
    baseColor: "#b76e2e", shadeColor: "#854917", muzzleColor: "#fdfefe",
    earType: "long_floppy", earSize: [4, 9], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "beagle", eyeColor: "#4e342e"
  },
  doberman: {
    name: "Doberman",
    baseColor: "#2c2d35", shadeColor: "#1a1b1f", muzzleColor: "#b56930",
    earType: "cropped", earSize: [3, 7], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "doberman", eyeColor: "#422e20"
  },
  corgi: {
    name: "Corgi",
    baseColor: "#e58b3c", shadeColor: "#bb6215", muzzleColor: "#ffffff",
    earType: "pointy", earSize: [5, 7], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "shiba", eyeColor: "#3e2723"
  },
  pitbull: {
    name: "Pitbull",
    baseColor: "#a3a5a8", shadeColor: "#74767a", muzzleColor: "#e6e8ea",
    earType: "cropped", earSize: [3, 4], snoutType: "standard", snoutSize: [10, 5],
    fluffiness: 0, eyeColor: "#a1887f"
  },
  bulldog: {
    name: "Bulldog",
    baseColor: "#cc9e78", shadeColor: "#9c714c", muzzleColor: "#eae5e1",
    earType: "floppy", earSize: [3, 5], snoutType: "squashed", snoutSize: [12, 6],
    hasMask: "bulldog", eyeColor: "#5d4037"
  },
  samoyed: {
    name: "Samoyed",
    baseColor: "#fbfcfc", shadeColor: "#d5dbdb", muzzleColor: "#f2f4f4",
    earType: "pointy", earSize: [4, 6], snoutType: "standard", snoutSize: [8, 5],
    fluffiness: 2, eyeColor: "#1a1d20"
  },
  pomeranian: {
    name: "Pomeranian",
    baseColor: "#f0983d", shadeColor: "#c97116", muzzleColor: "#f7c78f",
    earType: "pointy", earSize: [3, 4], snoutType: "squashed", snoutSize: [6, 4],
    fluffiness: 3, eyeColor: "#2d1f10"
  },
  dalmatian: {
    name: "Dalmatian",
    baseColor: "#f5f6f8", shadeColor: "#d5d8dc", muzzleColor: "#ffffff",
    earType: "floppy", earSize: [4, 7], snoutType: "standard", snoutSize: [8, 5],
    hasMask: "spots", eyeColor: "#5d4037"
  },
  great_dane: {
    name: "Great Dane",
    baseColor: "#616a6b", shadeColor: "#424949", muzzleColor: "#2c3e50",
    earType: "cropped", earSize: [3, 9], snoutType: "long", snoutSize: [8, 7],
    eyeColor: "#34495e"
  },
  akita: {
    name: "Akita",
    baseColor: "#e3914a", shadeColor: "#bc6b25", muzzleColor: "#f7ebe1",
    earType: "pointy", earSize: [5, 6], snoutType: "standard", snoutSize: [8, 5],
    fluffiness: 2, hasMask: "shiba", eyeColor: "#3d2314"
  },
  chihuahua: {
    name: "Chihuahua",
    baseColor: "#d2a679", shadeColor: "#9c714c", muzzleColor: "#ebd9c6",
    earType: "chihuahua_ears", earSize: [6, 8], snoutType: "squashed", snoutSize: [6, 4],
    eyeColor: "#42230b"
  },
  cane_corso: {
    name: "Cane Corso",
    baseColor: "#383d41", shadeColor: "#232628", muzzleColor: "#181a1c",
    earType: "cropped", earSize: [3, 6], snoutType: "standard", snoutSize: [10, 6],
    eyeColor: "#5a4534"
  }
};

// Main draw dog function
function drawDog(canvas, breedId, skinStyle, bgType, traits) {
  const ctx = canvas.getContext('2d');
  const size = 32;
  ctx.imageSmoothingEnabled = false;

  // 1. Initialize 32x32 color grid
  const grid = Array(size).fill().map(() => Array(size).fill(null));

  // Helper functions for grid manipulation
  function setPixel(x, y, color) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      grid[y][x] = color;
    }
  }

  function getPixel(x, y) {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      return grid[y][x];
    }
    return null;
  }

  function drawRect(x, y, w, h, color) {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        setPixel(x + dx, y + dy, color);
      }
    }
  }

  // Get breed parameters
  const breed = BREED_PRESETS[breedId] || BREED_PRESETS.golden_retriever;

  // Determine skin colors based on style
  let baseColor = breed.baseColor;
  let shadeColor = breed.shadeColor;
  let muzzleColor = breed.muzzleColor;
  let eyeColor = breed.eyeColor;
  let outlineColor = "#000000";

  if (skinStyle === "gold") {
    baseColor = "#ffd700";
    shadeColor = "#b8860b";
    muzzleColor = "#ffe066";
    eyeColor = "#ffffff";
  } else if (skinStyle === "zombie") {
    baseColor = "#739957";
    shadeColor = "#496633";
    muzzleColor = "#8c6c53";
    eyeColor = "#ff3333";
  } else if (skinStyle === "alien") {
    baseColor = "#33f5ff";
    shadeColor = "#00a3cc";
    muzzleColor = "#ccf9ff";
    eyeColor = "#000000";
  } else if (skinStyle === "robot") {
    baseColor = "#a0aab5";
    shadeColor = "#6e7780";
    muzzleColor = "#d1d7db";
    eyeColor = "#39ff14";
  }

  // Dimension details
  const headW = 14;
  const headH = 14;
  const headX = Math.floor((size - headW) / 2); // 9
  const headY = 10;
  
  // ----------------------------------------------------
  // DRAW BODY & NECK
  // ----------------------------------------------------
  // Shoulders and neck
  drawRect(11, 23, 10, 9, baseColor); // main neck
  drawRect(12, 23, 9, 9, shadeColor); // shading on the right/bottom
  
  // Shoulders spread
  drawRect(8, 27, 3, 5, baseColor);
  drawRect(21, 27, 3, 5, shadeColor);
  drawRect(9, 26, 14, 1, baseColor);
  
  // ----------------------------------------------------
  // DRAW EARS (BACK LAYER FOR FLOPPY)
  // ----------------------------------------------------
  if (breed.earType === "floppy" || breed.earType === "long_floppy") {
    const earH = breed.earType === "long_floppy" ? 10 : breed.earSize[1];
    const earW = breed.earSize[0];
    
    // Left ear
    drawRect(headX - earW + 1, headY + 2, earW, earH, baseColor);
    // Right ear (shaded)
    drawRect(headX + headW - 1, headY + 2, earW, earH, shadeColor);
  }

  // ----------------------------------------------------
  // DRAW HEAD BASE
  // ----------------------------------------------------
  drawRect(headX, headY, headW, headH, baseColor);
  // Add some rounded corners on top of head
  setPixel(headX, headY, null);
  setPixel(headX + headW - 1, headY, null);
  
  // Fluffiness for fluffy breeds (Samoyed, Pomeranian, Akita)
  if (breed.fluffiness > 0) {
    const fluff = breed.fluffiness;
    for (let f = 0; f < fluff; f++) {
      // Cheek fluff left
      drawRect(headX - 1 - f, headY + 6, 1, 6, baseColor);
      // Cheek fluff right
      drawRect(headX + headW + f, headY + 6, 1, 6, shadeColor);
    }
  }

  // Apply shading on the right & bottom side of the head
  drawRect(headX + headW - 3, headY + 1, 3, headH - 1, shadeColor);
  drawRect(headX + 1, headY + headH - 2, headW - 2, 2, shadeColor);

  // ----------------------------------------------------
  // DRAW EARS (FRONT LAYER FOR POINTY / CROPPED)
  // ----------------------------------------------------
  if (breed.earType === "pointy" || breed.earType === "cropped" || breed.earType === "chihuahua_ears") {
    const earH = breed.earSize[1];
    const earW = breed.earSize[0];
    
    if (breed.earType === "chihuahua_ears") {
      // Big flared ears
      for (let i = 0; i < earH; i++) {
        const offset = Math.floor(i / 1.5);
        // Left Ear
        drawRect(headX + 1 - offset, headY - 1 - i, Math.max(1, earW - offset), 1, baseColor);
        // Right Ear (shaded)
        drawRect(headX + headW - 2 + offset - Math.max(1, earW - offset), headY - 1 - i, Math.max(1, earW - offset), 1, shadeColor);
      }
    } else {
      // Standard Pointy / Cropped
      for (let i = 0; i < earH; i++) {
        const widthAtHeight = Math.max(1, earW - Math.floor(i / 2));
        // Left Ear
        drawRect(headX + 1, headY - 1 - i, widthAtHeight, 1, baseColor);
        // Right Ear
        drawRect(headX + headW - 1 - widthAtHeight, headY - 1 - i, widthAtHeight, 1, shadeColor);
      }
    }
  }

  // ----------------------------------------------------
  // BREED DISTINCTIVE MASKS & PATTERNS
  // ----------------------------------------------------
  if (skinStyle === "normal") {
    if (breed.hasMask === "husky") {
      // Light mask around eyes and cheeks
      drawRect(headX + 2, headY + 4, 10, 7, "#f5f5f7"); // facial mask
      drawRect(headX + 4, headY + 2, 6, 2, "#f5f5f7"); // forehead white stripe
      // Overwrite bridge of nose with base color
      drawRect(15, headY + 5, 2, 6, baseColor);
    } 
    else if (breed.hasMask === "gsd") {
      // Black mask on muzzle and around eyes
      drawRect(headX + 3, headY + 5, 8, 8, "#222222"); // muzzle and eye area black
      drawRect(headX + 5, headY + 3, 4, 2, "#222222");
    }
    else if (breed.hasMask === "shiba") {
      // White markings on cheeks
      drawRect(headX + 1, headY + 8, 3, 4, "#ffffff"); // left cheek white
      drawRect(headX + headW - 4, headY + 8, 3, 4, "#eaeaea"); // right cheek white (shaded)
    }
    else if (breed.hasMask === "collie") {
      // Symmetrical white split
      drawRect(14, headY, 4, headH, "#f8f9fa"); // central white blaze
      drawRect(13, headY + 8, 6, 6, "#f8f9fa"); // chest white
    }
    else if (breed.hasMask === "beagle") {
      // White snout and chest, tan sides
      drawRect(headX + 3, headY + 8, 8, 6, "#ffffff"); // white mask
      drawRect(headX + 4, headY + 4, 6, 4, baseColor); // brown cap
    }
    else if (breed.hasMask === "rottweiler") {
      // Brown dots above eyes and tan snout
      setPixel(12, 14, "#c6702b"); // left eyebrow dot
      setPixel(19, 14, "#b56221"); // right eyebrow dot
    }
    else if (breed.hasMask === "spots") {
      // Dalmatian spots
      const spotCoords = [[10, 11], [12, 18], [20, 12], [22, 17], [18, 21], [15, 14], [9, 28], [21, 29]];
      spotCoords.forEach(([sx, sy]) => {
        setPixel(sx, sy, "#1d1f21");
      });
    }
    else if (breed.hasMask === "doberman") {
      setPixel(12, 14, "#b56930");
      setPixel(19, 14, "#9c5722");
    }
    else if (breed.hasMask === "bulldog") {
      // White patch on eye
      drawRect(headX + 2, headY + 4, 3, 3, "#ffffff");
    }
    else if (breed.hasMask === "pug") {
      // Dark muzzle and forehead wrinkles
      drawRect(headX + 3, headY + 7, 8, 6, "#26252d");
      setPixel(14, headY + 3, "#1a1a20"); // wrinkle 1
      setPixel(17, headY + 3, "#1a1a20"); // wrinkle 2
    }
  }

  // ----------------------------------------------------
  // DRAW SNOUT & NOSE
  // ----------------------------------------------------
  const snoutW = breed.snoutSize[0];
  const snoutH = breed.snoutSize[1];
  const snoutX = Math.floor((size - snoutW) / 2);
  const snoutY = headY + headH - snoutH - 1; // placed at bottom of face

  // Draw Snout Box
  drawRect(snoutX, snoutY, snoutW, snoutH, muzzleColor);
  
  // Snout Shading (right side of snout)
  const snoutShadeColor = skinStyle === "gold" ? "#d4af37" : (skinStyle === "zombie" ? "#594535" : (skinStyle === "alien" ? "#99e0ff" : (skinStyle === "robot" ? "#b5babe" : "#b5a391")));
  if (skinStyle === "normal" && (breed.muzzleColor === "#ffffff" || breed.muzzleColor === "#fdfefe" || breed.muzzleColor === "#f5f5f7" || breed.muzzleColor === "#f8f9fa")) {
    // White muzzle shade
    drawRect(snoutX + Math.floor(snoutW/2), snoutY, Math.ceil(snoutW/2), snoutH, "#e0e0e0");
  } else if (skinStyle === "normal" && breed.muzzleColor !== "#222222" && breed.muzzleColor !== "#26252d") {
    // Normal brown/tan snout shade
    drawRect(snoutX + Math.floor(snoutW/2), snoutY, Math.ceil(snoutW/2), snoutH, snoutShadeColor);
  }

  // Draw Nose (always 2x1 or 2x2, black/dark grey)
  const noseColor = (skinStyle === "zombie") ? "#3d2211" : "#1a1921";
  drawRect(15, snoutY + 1, 2, 2, noseColor);
  
  // Draw Mouth (horizontal line under nose)
  setPixel(15, snoutY + 3, noseColor);
  setPixel(16, snoutY + 3, noseColor);

  // ----------------------------------------------------
  // DRAW EYES
  // ----------------------------------------------------
  // Position eyes symmetrically
  const eyeY = headY + 5;
  const leftEyeX = headX + 2;
  const rightEyeX = headX + headW - 5;

  if (skinStyle === "alien") {
    // Alien solid black eyes (large 2x3)
    drawRect(leftEyeX, eyeY - 1, 2, 3, "#000000");
    drawRect(rightEyeX, eyeY - 1, 2, 3, "#000000");
  } else {
    // Standard eyes (White sclera, colored pupil)
    // Left eye
    drawRect(leftEyeX, eyeY, 2, 2, "#ffffff");
    setPixel(leftEyeX + 1, eyeY, eyeColor); // pupil
    setPixel(leftEyeX + 1, eyeY + 1, eyeColor);
    
    // Right eye
    drawRect(rightEyeX, eyeY, 2, 2, "#ffffff");
    setPixel(rightEyeX, eyeY, eyeColor); // pupil
    setPixel(rightEyeX, eyeY + 1, eyeColor);
  }

  // Eyebrow highlights
  if (skinStyle !== "alien") {
    setPixel(leftEyeX, eyeY - 2, skinStyle === "gold" ? "#fff3a8" : (skinStyle === "zombie" ? "#a0c287" : (skinStyle === "robot" ? "#d6dbe0" : breed.highlightColor || "#fff")));
    setPixel(rightEyeX + 1, eyeY - 2, skinStyle === "gold" ? "#fff3a8" : (skinStyle === "zombie" ? "#a0c287" : (skinStyle === "robot" ? "#d6dbe0" : breed.highlightColor || "#fff")));
  }

  // ----------------------------------------------------
  // DRAW OUTLINES (DARK BOUNDARY EFFECT)
  // ----------------------------------------------------
  // A pixel-art outline is drawn by checking neighbors and coloring outer pixels
  const tempGrid = JSON.parse(JSON.stringify(grid));
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (tempGrid[y][x] === null) {
        // Check if it has a non-null neighbor
        const neighbors = [
          [x+1, y], [x-1, y], [x, y+1], [x, y-1]
        ];
        let hasDogNeighbor = false;
        for (let n = 0; n < neighbors.length; n++) {
          const nx = neighbors[n][0];
          const ny = neighbors[n][1];
          if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
            if (tempGrid[ny][nx] !== null) {
              hasDogNeighbor = true;
              break;
            }
          }
        }
        if (hasDogNeighbor) {
          // Check if this pixel is on the bottom of the canvas (we don't outline the bottom edge of shoulders)
          if (y < size - 1) {
            setPixel(x, y, outlineColor);
          }
        }
      }
    }
  }

  // ----------------------------------------------------
  // DRAW ACCESSORIES (LAYERS IN STRICT RENDER ORDER)
  // ----------------------------------------------------

  // 1. COLLAR / CHAINS / HOODIE BODY
  if (traits.neck) {
    if (traits.neck === "gold-chain") {
      drawRect(11, 24, 10, 2, "#ffd700"); // gold base
      setPixel(12, 25, "#b8860b"); // shading
      setPixel(14, 25, "#b8860b");
      setPixel(16, 25, "#b8860b");
      setPixel(18, 25, "#b8860b");
    } 
    else if (traits.neck === "silver-chain") {
      drawRect(11, 24, 10, 2, "#e0e0e0"); // silver base
      setPixel(12, 25, "#888888"); // shading
      setPixel(14, 25, "#888888");
      setPixel(16, 25, "#888888");
      setPixel(18, 25, "#888888");
    }
    else if (traits.neck === "spike-collar") {
      drawRect(11, 24, 10, 2, "#c1121f"); // red collar band
      // spikes (white pixels)
      setPixel(11, 23, "#ffffff");
      setPixel(13, 23, "#ffffff");
      setPixel(15, 23, "#ffffff");
      setPixel(17, 23, "#ffffff");
      setPixel(19, 23, "#ffffff");
      setPixel(21, 23, "#ffffff");
    }
    else if (traits.neck.startsWith("hoodie")) {
      const hoodieColors = {
        "hoodie-red": ["#c1121f", "#780000"],
        "hoodie-blue": ["#0077b6", "#03045e"],
        "hoodie-purple": ["#7209b7", "#3f37c9"],
        "hoodie-black": ["#1a1921", "#0d0c10"]
      };
      const [hColor, hShade] = hoodieColors[traits.neck] || hoodieColors["hoodie-red"];
      // Draw hoodie on shoulders and neck, covering base fur
      drawRect(10, 24, 12, 8, hColor);
      drawRect(8, 27, 4, 5, hColor);
      drawRect(20, 27, 4, 5, hShade);
      drawRect(16, 24, 6, 8, hShade); // hoodie shadow side
      // Hoodie neckline cut
      drawRect(14, 24, 4, 2, baseColor); // expose some neck
      drawRect(14, 24, 4, 1, outlineColor); // inner neck shadow
    }
  }

  // 2. CIGAR / BUBBLEGUM (MOUTH)
  if (traits.mouth) {
    if (traits.mouth === "cigar") {
      const mouthX = 17;
      const mouthY = snoutY + 3;
      drawRect(mouthX, mouthY, 4, 1, "#8b5a2b"); // brown cigar body
      setPixel(mouthX + 3, mouthY, "#ff4500"); // glowing red tip
      // Add smoking smoke pixels (injected in actual canvas draw loop for animated particle look)
      setPixel(mouthX + 4, mouthY - 1, "rgba(220, 220, 220, 0.4)");
      setPixel(mouthX + 5, mouthY - 2, "rgba(220, 220, 220, 0.2)");
    } 
    else if (traits.mouth === "bubblegum") {
      const mouthX = 17;
      const mouthY = snoutY + 2;
      drawRect(mouthX, mouthY, 4, 4, "#ff70a6"); // bubble circle
      // round corners
      setPixel(mouthX, mouthY, null);
      setPixel(mouthX + 3, mouthY, null);
      setPixel(mouthX, mouthY + 3, null);
      setPixel(mouthX + 3, mouthY + 3, null);
      // highlight
      setPixel(mouthX + 1, mouthY + 1, "#ff9ebb");
    }
  }

  // 3. EYEWEAR (GLASSES)
  if (traits.glasses) {
    if (traits.glasses === "shades-dark") {
      // Classic sunglasses
      drawRect(headX + 1, eyeY, 12, 2, "#111111"); // frame
      setPixel(headX, eyeY, "#111111");
      setPixel(headX + 13, eyeY, "#111111");
      // Highlights on lenses
      setPixel(headX + 3, eyeY, "#666666");
      setPixel(headX + 10, eyeY, "#666666");
    }
    else if (traits.glasses === "glasses-3d") {
      // 3D glasses white frame
      drawRect(headX + 1, eyeY - 1, 12, 4, "#ffffff");
      setPixel(headX, eyeY, "#ffffff");
      setPixel(headX + 13, eyeY, "#ffffff");
      // Lenses (Left: Red, Right: Blue)
      drawRect(headX + 2, eyeY, 3, 2, "#d90429"); // Red lens
      drawRect(headX + 9, eyeY, 3, 2, "#00b4d8"); // Blue lens
      // Nose bridge gap
      drawRect(15, eyeY, 2, 2, "#ffffff");
    }
    else if (traits.glasses === "vr-headset") {
      // VR Headset
      drawRect(headX + 1, eyeY - 2, 12, 5, "#2b2d42"); // dark visor body
      drawRect(headX + 2, eyeY - 1, 10, 3, "#1a1c23");
      // LED indicator lights
      setPixel(16, eyeY, "#39ff14"); // green center light
      setPixel(15, eyeY, "#00f0ff"); // cyan
      setPixel(17, eyeY, "#00f0ff");
    }
  }

  // 4. HOODIE HOOD
  if (traits.neck && traits.neck.startsWith("hoodie")) {
    const hoodieColors = {
      "hoodie-red": ["#c1121f", "#780000"],
      "hoodie-blue": ["#0077b6", "#03045e"],
      "hoodie-purple": ["#7209b7", "#3f37c9"],
      "hoodie-black": ["#1a1921", "#0d0c10"]
    };
    const [hColor, hShade] = hoodieColors[traits.neck];
    // Draw hood outline around head, covering ears partially
    drawRect(headX, headY, 1, headH - 2, hColor); // Left hood border
    drawRect(headX + headW - 1, headY, 1, headH - 2, hShade); // Right hood border
    drawRect(headX, headY - 1, headW, 2, hColor); // Top hood border
    drawRect(headX + Math.floor(headW/2), headY - 1, Math.ceil(headW/2), 2, hShade); // Top shaded border
    
    // Smooth corners
    setPixel(headX, headY - 1, outlineColor);
    setPixel(headX + headW - 1, headY - 1, outlineColor);
  }

  // 5. AUDIO GEAR (HEADPHONES)
  if (traits.headphones === "headphones-classic") {
    // Draw headband across top
    drawRect(headX + 2, headY - 2, headW - 4, 1, "#e63946");
    // Earcups on sides
    drawRect(headX - 1, eyeY - 2, 2, 6, "#e63946"); // left cup
    setPixel(headX + 1, eyeY, "#1d3557");
    
    drawRect(headX + headW - 1, eyeY - 2, 2, 6, "#c31e2b"); // right cup (shaded)
    setPixel(headX + headW - 2, eyeY, "#1d3557");
  }

  // 6. HATS / CROWNS (TOPWEAR)
  if (traits.hat) {
    if (traits.hat.startsWith("beanie")) {
      const color = traits.hat === "beanie-red" ? "#d90429" : "#0077b6";
      const shade = traits.hat === "beanie-red" ? "#9b001c" : "#005685";
      // Draw beanie cap
      drawRect(headX + 2, headY - 3, 10, 4, color);
      drawRect(headX + 7, headY - 3, 5, 4, shade); // shading
      drawRect(headX + 1, headY - 1, 12, 1, color); // fold edge
      // pompom
      drawRect(15, headY - 4, 2, 1, "#ffffff");
    }
    else if (traits.hat.startsWith("cap")) {
      const color = "#ffb703"; // yellow cap
      const shade = "#fb8500";
      // Draw cap dome
      drawRect(headX + 3, headY - 3, 8, 4, color);
      drawRect(headX + 7, headY - 3, 4, 4, shade);
      if (traits.hat === "cap-forward") {
        // visor extending right
        drawRect(headX + 8, headY - 1, 6, 1, shade);
      } else {
        // visor extending left (backward)
        drawRect(headX, headY - 1, 4, 1, color);
      }
    }
    else if (traits.hat === "tophat") {
      // Tall stovepipe hat
      drawRect(headX, headY - 1, headW, 1, "#111111"); // brim
      drawRect(headX + 2, headY - 9, 10, 8, "#2b2b2b"); // crown
      drawRect(headX + 7, headY - 9, 5, 8, "#1a1a1a"); // shade
      drawRect(headX + 2, headY - 2, 10, 1, "#e63946"); // red ribbon
    }
    else if (traits.hat === "crown") {
      // Gold Royal Crown
      const crownY = headY - 4;
      drawRect(headX + 1, crownY + 2, 12, 2, "#ffd700"); // base
      // spires
      drawRect(headX + 1, crownY, 2, 2, "#ffd700"); // left spire
      drawRect(headX + 6, crownY, 2, 2, "#ffd700"); // middle spire
      drawRect(headX + 11, crownY, 2, 2, "#ffd700"); // right spire
      // jewels
      setPixel(headX + 2, crownY + 2, "#d90429"); // ruby
      setPixel(headX + 6, crownY + 2, "#0077b6"); // sapphire
      setPixel(headX + 10, crownY + 2, "#39ff14"); // emerald
    }
    else if (traits.hat === "cowboy") {
      // Cowboy Hat
      drawRect(headX - 2, headY - 2, headW + 4, 2, "#8b5a2b"); // wide brim
      drawRect(headX + 2, headY - 5, 10, 3, "#8b5a2b"); // crown
      drawRect(headX + 7, headY - 5, 5, 3, "#5c3a1a"); // crown shade
      drawRect(headX + 2, headY - 3, 10, 1, "#000000"); // band
    }
  }

  // 7. LASER EYES
  if (traits.glasses && traits.glasses.startsWith("laser")) {
    const laserColor = traits.glasses === "laser-red" ? "#ff0055" : "#00f0ff";
    const laserGlow = traits.glasses === "laser-red" ? "rgba(255,0,85,0.4)" : "rgba(0,240,255,0.4)";
    
    // Draw laser lines extending left/right
    // Left eye lasers
    for (let x = 0; x < leftEyeX + 1; x++) {
      setPixel(x, eyeY, laserColor);
      setPixel(x, eyeY + 1, laserColor);
    }
    // Right eye lasers
    for (let x = rightEyeX; x < size; x++) {
      setPixel(x, eyeY, laserColor);
      setPixel(x, eyeY + 1, laserColor);
    }
  }

  // ----------------------------------------------------
  // DRAW BACKGROUND & GRADIENT ON CANVAS
  // ----------------------------------------------------
  ctx.clearRect(0, 0, size, size);

  // Set Background
  let gradient;
  if (bgType === "cyan-blue") {
    gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#00f0ff');
    gradient.addColorStop(1, '#0055ff');
  } else if (bgType === "pink-orange") {
    gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#ff007f');
    gradient.addColorStop(1, '#ffaa00');
  } else if (bgType === "purple-dark") {
    gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#7b2cbf');
    gradient.addColorStop(1, '#10002b');
  } else if (bgType === "green-teal") {
    gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#39ff14');
    gradient.addColorStop(1, '#004b49');
  } else if (bgType === "gold-glow") {
    gradient = ctx.createRadialGradient(size/2, size/2, 2, size/2, size/2, size);
    gradient.addColorStop(0, '#fff275');
    gradient.addColorStop(0.5, '#ffb703');
    gradient.addColorStop(1, '#8b5a00');
  } else if (bgType === "matrix-code") {
    ctx.fillStyle = '#050c08';
    ctx.fillRect(0, 0, size, size);
    // Draw matrix code lines
    ctx.fillStyle = 'rgba(57, 255, 20, 0.15)';
    for (let x = 1; x < size; x += 4) {
      const length = Math.floor(Math.random() * 20) + 5;
      const startY = Math.floor(Math.random() * 15);
      ctx.fillRect(x, startY, 1, length);
    }
  } else {
    // classic cryptopunk gray
    ctx.fillStyle = '#5c6b73';
    ctx.fillRect(0, 0, size, size);
  }

  if (bgType !== "matrix-code" && bgType !== "solid-gray") {
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  // ----------------------------------------------------
  // DRAW GRID PIXELS TO CANVAS
  // ----------------------------------------------------
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const color = grid[y][x];
      if (color !== null) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  // Animated smoke effect if cigar is active
  if (traits.mouth === "cigar") {
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.fillRect(22, snoutY + 2, 1, 1);
    ctx.fillStyle = "rgba(200, 200, 200, 0.25)";
    ctx.fillRect(23, snoutY + 1, 1, 1);
    ctx.fillRect(22, snoutY, 1, 1);
  }
}
