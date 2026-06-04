// PLAYDOGS Studio - App Controller & State Management

// ----------------------------------------------------
// RARITY DEFINITIONS & WEIGHTS
// ----------------------------------------------------
const BREED_WEIGHTS = {
  golden_retriever: { weight: 0.10, name: "Golden Retriever", rarity: "Common" },
  labrador: { weight: 0.10, name: "Labrador", rarity: "Common" },
  shiba_inu: { weight: 0.08, name: "Shiba Inu", rarity: "Common" },
  husky: { weight: 0.07, name: "Husky", rarity: "Uncommon" },
  german_shepherd: { weight: 0.07, name: "German Shepherd", rarity: "Uncommon" },
  beagle: { weight: 0.06, name: "Beagle", rarity: "Uncommon" },
  corgi: { weight: 0.06, name: "Corgi", rarity: "Uncommon" },
  pug: { weight: 0.05, name: "Pug", rarity: "Uncommon" },
  rottweiler: { weight: 0.05, name: "Rottweiler", rarity: "Uncommon" },
  pitbull: { weight: 0.05, name: "Pitbull", rarity: "Uncommon" },
  bulldog: { weight: 0.05, name: "Bulldog", rarity: "Uncommon" },
  border_collie: { weight: 0.04, name: "Border Collie", rarity: "Rare" },
  doberman: { weight: 0.04, name: "Doberman", rarity: "Rare" },
  samoyed: { weight: 0.03, name: "Samoyed", rarity: "Rare" },
  pomeranian: { weight: 0.03, name: "Pomeranian", rarity: "Rare" },
  dalmatian: { weight: 0.02, name: "Dalmatian", rarity: "Rare" },
  great_dane: { weight: 0.02, name: "Great Dane", rarity: "Rare" },
  akita: { weight: 0.015, name: "Akita", rarity: "Legendary" },
  chihuahua: { weight: 0.01, name: "Chihuahua", rarity: "Legendary" },
  cane_corso: { weight: 0.005, name: "Cane Corso", rarity: "Mythic" }
};

const SKIN_WEIGHTS = {
  normal: { weight: 0.82, name: "Normal (Standard)", rarity: "Common" },
  zombie: { weight: 0.07, name: "Zombie Skin", rarity: "Rare" },
  robot: { weight: 0.06, name: "Robot Skin", rarity: "Rare" },
  gold: { weight: 0.04, name: "Gold Skin", rarity: "Legendary" },
  alien: { weight: 0.01, name: "Alien Skin", rarity: "Mythic" }
};

const BACKGROUND_WEIGHTS = {
  "cyan-blue": { weight: 0.20, name: "Neon Cyan-Blue" },
  "pink-orange": { weight: 0.20, name: "Sunset Pink-Orange" },
  "purple-dark": { weight: 0.15, name: "Void Purple-Dark" },
  "green-teal": { weight: 0.15, name: "Acid Green-Teal" },
  "solid-gray": { weight: 0.15, name: "Classic Gray" },
  "matrix-code": { weight: 0.10, name: "Digital Matrix" },
  "gold-glow": { weight: 0.05, name: "Golden Aura" }
};

const TRAIT_WEIGHTS = {
  hat: {
    chance: 0.35, // 35% chance to have a hat
    items: {
      "beanie-red": { weight: 0.25, name: "Red Beanie", rarity: "Common" },
      "beanie-blue": { weight: 0.25, name: "Blue Beanie", rarity: "Common" },
      "cap-forward": { weight: 0.20, name: "Cap Forward", rarity: "Uncommon" },
      "cap-backward": { weight: 0.15, name: "Cap Backward", rarity: "Uncommon" },
      "cowboy": { weight: 0.10, name: "Cowboy Hat", rarity: "Rare" },
      "tophat": { weight: 0.04, name: "Top Hat", rarity: "Rare" },
      "crown": { weight: 0.01, name: "Royal Crown", rarity: "Legendary" }
    }
  },
  glasses: {
    chance: 0.30, // 30% chance
    items: {
      "shades-dark": { weight: 0.40, name: "Classic Shades", rarity: "Common" },
      "glasses-3d": { weight: 0.30, name: "3D Glasses", rarity: "Uncommon" },
      "vr-headset": { weight: 0.18, name: "VR Headset", rarity: "Rare" },
      "laser-red": { weight: 0.08, name: "Laser Eyes (Red)", rarity: "Legendary" },
      "laser-blue": { weight: 0.04, name: "Laser Eyes (Blue)", rarity: "Mythic" }
    }
  },
  neck: {
    chance: 0.35, // 35% chance
    items: {
      "spike-collar": { weight: 0.35, name: "Spike Collar", rarity: "Common" },
      "silver-chain": { weight: 0.25, name: "Silver Chain", rarity: "Uncommon" },
      "gold-chain": { weight: 0.15, name: "Gold Chain", rarity: "Rare" },
      "hoodie-red": { weight: 0.08, name: "Red Hoodie", rarity: "Rare" },
      "hoodie-blue": { weight: 0.08, name: "Blue Hoodie", rarity: "Rare" },
      "hoodie-purple": { weight: 0.06, name: "Purple Hoodie", rarity: "Legendary" },
      "hoodie-black": { weight: 0.03, name: "Black Hoodie", rarity: "Legendary" }
    }
  },
  mouth: {
    chance: 0.20, // 20% chance
    items: {
      "bubblegum": { weight: 0.70, name: "Bubblegum Bubble", rarity: "Uncommon" },
      "cigar": { weight: 0.30, name: "Smoking Cigar", rarity: "Rare" }
    }
  },
  headphones: {
    chance: 0.15, // 15% chance
    items: {
      "headphones-classic": { weight: 1.0, name: "Street Headphones", rarity: "Uncommon" }
    }
  }
};

// ----------------------------------------------------
// WEB AUDIO API SOUND SYNTHESIS
// ----------------------------------------------------
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

// Retro sound generator
function playBeep(freq, duration, type = "square") {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log("Audio play error", e);
  }
}

function playRandomizeSound() {
  playBeep(220, 0.05, "sine");
  setTimeout(() => playBeep(440, 0.05, "sine"), 40);
  setTimeout(() => playBeep(880, 0.08, "triangle"), 80);
}

function playSuccessSound() {
  playBeep(523.25, 0.1, "sine"); // C5
  setTimeout(() => playBeep(659.25, 0.1, "sine"), 80); // E5
  setTimeout(() => playBeep(783.99, 0.1, "sine"), 160); // G5
  setTimeout(() => playBeep(1046.50, 0.25, "triangle"), 240); // C6
}

// ----------------------------------------------------
// APP STATE & ELEMENTS
// ----------------------------------------------------
const canvas = document.getElementById("nft-canvas");
const breedSelect = document.getElementById("breed-select");
const styleSelect = document.getElementById("style-select");
const bgSelect = document.getElementById("bg-select");

const traitHatCheck = document.getElementById("trait-hat");
const hatTypeSelect = document.getElementById("hat-type");
const traitGlassesCheck = document.getElementById("trait-glasses");
const glassesTypeSelect = document.getElementById("glasses-type");
const traitNeckCheck = document.getElementById("trait-neck");
const neckTypeSelect = document.getElementById("neck-type");
const traitMouthCheck = document.getElementById("trait-mouth");
const mouthTypeSelect = document.getElementById("mouth-type");
const traitHeadphonesCheck = document.getElementById("trait-headphones");
const headphonesTypeSelect = document.getElementById("headphones-type");

const randomizeBtn = document.getElementById("randomize-btn");
const downloadPngBtn = document.getElementById("download-png-btn");
const downloadJsonBtn = document.getElementById("download-json-btn");
const soundToggleBtn = document.getElementById("sound-toggle-btn");

const batchSizeInput = document.getElementById("batch-size");
const generateBatchBtn = document.getElementById("generate-batch-btn");
const downloadZipBtn = document.getElementById("download-zip-btn");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const progressStatus = document.getElementById("progress-status");
const galleryGrid = document.getElementById("gallery-grid");
const galleryCount = document.getElementById("gallery-count");
const previewRarityBadge = document.getElementById("preview-rarity-badge");
const activeTraitsList = document.getElementById("active-traits-list");

// Global array to store batch generated NFTs
let mintedCollection = [];

// Initialize UI Options
function initUI() {
  // 1. Populate Breed Dropdown
  Object.keys(BREED_PRESETS).forEach(breedId => {
    const option = document.createElement("option");
    option.value = breedId;
    option.textContent = BREED_PRESETS[breedId].name;
    breedSelect.appendChild(option);
  });

  // 2. Populate Rarity Guide Tables
  const breedRarityBody = document.getElementById("breeds-rarity-tbody");
  Object.keys(BREED_WEIGHTS).forEach(breedId => {
    const row = document.createElement("tr");
    const chance = (BREED_WEIGHTS[breedId].weight * 100).toFixed(1) + "%";
    let styleClass = "text-common";
    if (BREED_WEIGHTS[breedId].rarity === "Uncommon") styleClass = "text-uncommon";
    if (BREED_WEIGHTS[breedId].rarity === "Rare") styleClass = "text-rare";
    if (BREED_WEIGHTS[breedId].rarity === "Legendary") styleClass = "text-legendary";
    if (BREED_WEIGHTS[breedId].rarity === "Mythic") styleClass = "text-epic";

    row.innerHTML = `
      <td>${BREED_WEIGHTS[breedId].name}</td>
      <td class="rarity-val ${styleClass}">${chance}</td>
      <td>${BREED_PRESETS[breedId].earType} ears, ${BREED_PRESETS[breedId].snoutType} snout</td>
    `;
    breedRarityBody.appendChild(row);
  });

  const traitRarityBody = document.getElementById("traits-rarity-tbody");
  
  // Style Skins
  Object.keys(SKIN_WEIGHTS).forEach(skinId => {
    const row = document.createElement("tr");
    const chance = (SKIN_WEIGHTS[skinId].weight * 100).toFixed(1) + "%";
    let styleClass = "text-common";
    if (SKIN_WEIGHTS[skinId].rarity === "Rare") styleClass = "text-rare";
    if (SKIN_WEIGHTS[skinId].rarity === "Legendary") styleClass = "text-legendary";
    if (SKIN_WEIGHTS[skinId].rarity === "Mythic") styleClass = "text-epic";
    row.innerHTML = `
      <td>Skin: ${SKIN_WEIGHTS[skinId].name}</td>
      <td class="rarity-val ${styleClass}">${chance}</td>
      <td><span class="badge" style="background: rgba(255,255,255,0.05)">Skin Type</span></td>
    `;
    traitRarityBody.appendChild(row);
  });

  // Accessories
  Object.keys(TRAIT_WEIGHTS).forEach(category => {
    const baseChance = TRAIT_WEIGHTS[category].chance;
    Object.keys(TRAIT_WEIGHTS[category].items).forEach(itemId => {
      const item = TRAIT_WEIGHTS[category].items[itemId];
      const overallChance = (baseChance * item.weight * 100).toFixed(2) + "%";
      let styleClass = "text-common";
      if (item.rarity === "Uncommon") styleClass = "text-uncommon";
      if (item.rarity === "Rare") styleClass = "text-rare";
      if (item.rarity === "Legendary") styleClass = "text-legendary";
      if (item.rarity === "Mythic") styleClass = "text-epic";
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${category.toUpperCase()}: ${item.name}</td>
        <td class="rarity-val ${styleClass}">${overallChance}</td>
        <td><span class="badge rarity-badge">${item.rarity}</span></td>
      `;
      traitRarityBody.appendChild(row);
    });
  });

  // 3. Attach change event listeners to recalculate and draw
  const inputs = [
    breedSelect, styleSelect, bgSelect,
    traitHatCheck, hatTypeSelect,
    traitGlassesCheck, glassesTypeSelect,
    traitNeckCheck, neckTypeSelect,
    traitMouthCheck, mouthTypeSelect,
    traitHeadphonesCheck, headphonesTypeSelect
  ];
  inputs.forEach(el => {
    el.addEventListener("change", () => {
      // Toggle select box disabled states
      hatTypeSelect.disabled = !traitHatCheck.checked;
      glassesTypeSelect.disabled = !traitGlassesCheck.checked;
      neckTypeSelect.disabled = !traitNeckCheck.checked;
      mouthTypeSelect.disabled = !traitMouthCheck.checked;
      headphonesTypeSelect.disabled = !traitHeadphonesCheck.checked;
      
      playBeep(400, 0.02, "sine");
      updatePreview();
    });
  });
}

// ----------------------------------------------------
// UTILITY: METADATA & RARITY CALCULATOR
// ----------------------------------------------------
function getActiveConfiguration() {
  const config = {
    breed: breedSelect.value,
    style: styleSelect.value,
    background: bgSelect.value,
    traits: {}
  };
  
  if (traitHatCheck.checked) config.traits.hat = hatTypeSelect.value;
  if (traitGlassesCheck.checked) config.traits.glasses = glassesTypeSelect.value;
  if (traitNeckCheck.checked) config.traits.neck = neckTypeSelect.value;
  if (traitMouthCheck.checked) config.traits.mouth = mouthTypeSelect.value;
  if (traitHeadphonesCheck.checked) config.traits.headphones = headphonesTypeSelect.value;

  return config;
}

// Calculate uniqueness and scoring
function calculateRarity(config) {
  // Breed score
  const breedStat = BREED_WEIGHTS[config.breed] || { weight: 0.10 };
  let score = 1 / breedStat.weight;

  // Skin style score
  const skinStat = SKIN_WEIGHTS[config.style] || { weight: 0.82 };
  score += 1 / skinStat.weight;

  // Background score
  const bgStat = BACKGROUND_WEIGHTS[config.background] || { weight: 0.20 };
  score += 1 / bgStat.weight;

  // Accessories scores
  const categories = ["hat", "glasses", "neck", "mouth", "headphones"];
  categories.forEach(cat => {
    const isPresent = config.traits[cat];
    const baseChance = TRAIT_WEIGHTS[cat].chance;
    if (isPresent) {
      const itemKey = config.traits[cat];
      const itemStat = TRAIT_WEIGHTS[cat].items[itemKey] || { weight: 1.0 };
      const overallWeight = baseChance * itemStat.weight;
      score += 1 / overallWeight;
    } else {
      // Reward not having the accessory based on its absence probability
      const absenceWeight = 1 - baseChance;
      score += 1 / absenceWeight;
    }
  });

  // Determine Class
  let rClass = "Common";
  if (score > 400) rClass = "Mythic";
  else if (score > 150) rClass = "Legendary";
  else if (score > 65) rClass = "Rare";
  else if (score > 30) rClass = "Uncommon";

  return {
    score: score.toFixed(2),
    rarityClass: rClass
  };
}

// Generate OpenSea-compatible Metadata JSON
function generateMetadataJSON(id, config, rarity) {
  const attributes = [
    {
      "trait_type": "Breed",
      "value": BREED_WEIGHTS[config.breed].name
    },
    {
      "trait_type": "Skin Style",
      "value": SKIN_WEIGHTS[config.style].name
    },
    {
      "trait_type": "Background",
      "value": BACKGROUND_WEIGHTS[config.background].name
    }
  ];

  // Add accessory traits
  const categories = ["hat", "glasses", "neck", "mouth", "headphones"];
  categories.forEach(cat => {
    if (config.traits[cat]) {
      const traitName = TRAIT_WEIGHTS[cat].items[config.traits[cat]].name;
      attributes.push({
        "trait_type": cat.charAt(0).toUpperCase() + cat.slice(1),
        "value": traitName
      });
    }
  });

  attributes.push({
    "trait_type": "Rarity Class",
    "value": rarity.rarityClass
  });

  attributes.push({
    "display_type": "number",
    "trait_type": "Rarity Score",
    "value": parseFloat(rarity.score)
  });

  return {
    "name": `PlayDog #${id}`,
    "description": `A rare pixel art dog in CryptoPunks-inspired style, procedurally generated by PLAYDOGS Studio.`,
    "image": `image.png`, // placeholder to be corrected by bundle
    "edition": id,
    "attributes": attributes
  };
}

// Render active state on main canvas & update badges
function updatePreview() {
  const config = getActiveConfiguration();
  const rarity = calculateRarity(config);

  // Set badge text and style
  previewRarityBadge.textContent = `Rarity: ${rarity.rarityClass} (${rarity.score})`;
  previewRarityBadge.className = `badge rarity-badge`;
  if (rarity.rarityClass === "Uncommon") previewRarityBadge.classList.add("text-uncommon");
  if (rarity.rarityClass === "Rare") previewRarityBadge.classList.add("text-rare");
  if (rarity.rarityClass === "Legendary") previewRarityBadge.classList.add("text-legendary");
  if (rarity.rarityClass === "Mythic") previewRarityBadge.classList.add("text-epic");

  // Update Active Traits Pills list
  activeTraitsList.innerHTML = "";
  
  // Add base skin if not Normal
  if (config.style !== "normal") {
    const pill = document.createElement("span");
    pill.className = `trait-pill ${SKIN_WEIGHTS[config.style].rarity === "Legendary" ? "legendary" : (SKIN_WEIGHTS[config.style].rarity === "Mythic" ? "mythic" : "")}`;
    pill.innerHTML = `<span class="pill-category">Skin</span>: ${SKIN_WEIGHTS[config.style].name}`;
    activeTraitsList.appendChild(pill);
  }

  // Add accessories
  Object.keys(config.traits).forEach(cat => {
    const val = config.traits[cat];
    const item = TRAIT_WEIGHTS[cat].items[val];
    const pill = document.createElement("span");
    pill.className = `trait-pill ${item.rarity === "Legendary" ? "legendary" : (item.rarity === "Mythic" ? "mythic" : "")}`;
    pill.innerHTML = `<span class="pill-category">${cat}</span>: ${item.name}`;
    activeTraitsList.appendChild(pill);
  });

  if (activeTraitsList.children.length === 0) {
    activeTraitsList.innerHTML = `<span style="color: var(--text-muted); font-size: 0.75rem;">None (Completely clean)</span>`;
  }

  // Draw onto canvas
  drawDog(canvas, config.breed, config.style, config.background, config.traits);
}

// ----------------------------------------------------
// RANDOM GENERATOR LOGIC
// ----------------------------------------------------
function weightedChoice(options) {
  let r = Math.random();
  for (let key in options) {
    r -= options[key].weight;
    if (r <= 0) {
      return key;
    }
  }
  // Fallback
  return Object.keys(options)[0];
}

function generateRandomConfig() {
  const config = {
    breed: weightedChoice(BREED_WEIGHTS),
    style: weightedChoice(SKIN_WEIGHTS),
    background: weightedChoice(BACKGROUND_WEIGHTS),
    traits: {}
  };

  // Roll for accessories
  Object.keys(TRAIT_WEIGHTS).forEach(cat => {
    if (Math.random() < TRAIT_WEIGHTS[cat].chance) {
      config.traits[cat] = weightedChoice(TRAIT_WEIGHTS[cat].items);
    }
  });

  return config;
}

function applyConfigToUI(config) {
  breedSelect.value = config.breed;
  styleSelect.value = config.style;
  bgSelect.value = config.background;

  traitHatCheck.checked = !!config.traits.hat;
  if (config.traits.hat) hatTypeSelect.value = config.traits.hat;
  hatTypeSelect.disabled = !config.traits.hat;

  traitGlassesCheck.checked = !!config.traits.glasses;
  if (config.traits.glasses) glassesTypeSelect.value = config.traits.glasses;
  glassesTypeSelect.disabled = !config.traits.glasses;

  traitNeckCheck.checked = !!config.traits.neck;
  if (config.traits.neck) neckTypeSelect.value = config.traits.neck;
  neckTypeSelect.disabled = !config.traits.neck;

  traitMouthCheck.checked = !!config.traits.mouth;
  if (config.traits.mouth) mouthTypeSelect.value = config.traits.mouth;
  mouthTypeSelect.disabled = !config.traits.mouth;

  traitHeadphonesCheck.checked = !!config.traits.headphones;
  if (config.traits.headphones) headphonesTypeSelect.value = config.traits.headphones;
  headphonesTypeSelect.disabled = !config.traits.headphones;

  updatePreview();
}

// Check configuration equality
function configsAreEqual(c1, c2) {
  if (c1.breed !== c2.breed) return false;
  if (c1.style !== c2.style) return false;
  if (c1.background !== c2.background) return false;
  
  const keys1 = Object.keys(c1.traits);
  const keys2 = Object.keys(c2.traits);
  if (keys1.length !== keys2.length) return false;

  for (let k of keys1) {
    if (c1.traits[k] !== c2.traits[k]) return false;
  }
  return true;
}

// ----------------------------------------------------
// BATCH GENERATOR CORE
// ----------------------------------------------------
function startBatchGeneration() {
  const count = parseInt(batchSizeInput.value) || 20;
  if (count < 5 || count > 10000) {
    alert("Collection size must be between 5 and 10000.");
    return;
  }

  // UI Updates
  generateBatchBtn.disabled = true;
  downloadZipBtn.disabled = true;
  progressContainer.style.display = "block";
  progressBar.style.width = "0%";
  progressBar.textContent = "0%";
  progressStatus.textContent = "Beginning generation...";
  galleryGrid.innerHTML = "";

  mintedCollection = [];
  let generatedConfigs = [];

  let idx = 1;
  const maxAttempts = 1000000; // anti-infinite loop for duplicates (increased for large batches)
  let attempts = 0;

  playBeep(330, 0.1, "triangle");

  function generateNext() {
    if (idx > count) {
      // Completed!
      progressBar.style.width = "100%";
      progressBar.textContent = "100%";
      progressStatus.textContent = `Completed! ${count} unique NFTs minted.`;
      generateBatchBtn.disabled = false;
      downloadZipBtn.disabled = false;
      galleryCount.textContent = count;
      playSuccessSound();
      return;
    }

    if (attempts > maxAttempts) {
      progressStatus.textContent = `Generated ${idx - 1} items. Stopped to prevent duplicate loop.`;
      generateBatchBtn.disabled = false;
      downloadZipBtn.disabled = idx > 1 ? false : true;
      return;
    }

    const cfg = generateRandomConfig();
    
    // Check if configuration already exists in this batch to guarantee 100% uniqueness
    const exists = generatedConfigs.some(existCfg => configsAreEqual(existCfg, cfg));
    if (exists) {
      attempts++;
      // Try again immediately
      generateNext();
      return;
    }

    // Add to configurations
    generatedConfigs.push(cfg);
    attempts = 0;

    // Create temporary canvas to draw this dog
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 32;
    tempCanvas.height = 32;
    drawDog(tempCanvas, cfg.breed, cfg.style, cfg.background, cfg.traits);

    const rarity = calculateRarity(cfg);
    const meta = generateMetadataJSON(idx, cfg, rarity);

    // Save item
    mintedCollection.push({
      id: idx,
      canvas: tempCanvas,
      config: cfg,
      metadata: meta,
      rarity: rarity
    });

    // Render into UI Gallery
    const itemCard = document.createElement("div");
    itemCard.className = `gallery-item ${rarity.rarityClass === "Legendary" ? "super-rare" : (rarity.rarityClass === "Mythic" ? "mythic" : "")}`;
    itemCard.setAttribute("data-index", idx - 1);
    
    const displayCanvas = document.createElement("canvas");
    displayCanvas.width = 32;
    displayCanvas.height = 32;
    const dispCtx = displayCanvas.getContext("2d");
    dispCtx.imageSmoothingEnabled = false;
    dispCtx.drawImage(tempCanvas, 0, 0);

    itemCard.appendChild(displayCanvas);

    const info = document.createElement("div");
    info.className = "gallery-item-info";
    info.innerHTML = `
      <div class="gallery-item-name">#${idx} ${BREED_WEIGHTS[cfg.breed].name}</div>
      <div class="gallery-item-rarity">${rarity.rarityClass} (${rarity.score})</div>
    `;
    itemCard.appendChild(info);

    // Clicking gallery item loads it in customizer
    itemCard.addEventListener("click", () => {
      applyConfigToUI(cfg);
      playBeep(600, 0.05, "sine");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Render into UI Gallery (only for the first 100 to prevent browser lag)
    if (idx <= 100) {
      galleryGrid.appendChild(itemCard);
    }

    // Progress updates
    const percent = Math.floor((idx / count) * 100);
    progressBar.style.width = `${percent}%`;
    progressBar.textContent = `${percent}%`;
    
    if (count > 100) {
      progressStatus.textContent = `Minted #${idx} of ${count}... (Preview limited to first 100 items to prevent browser lag)`;
    } else {
      progressStatus.textContent = `Minted #${idx} of ${count}...`;
    }

    // Make interactive sound tick
    if (idx % 5 === 0 || idx === count) {
      playBeep(440 + percent * 2, 0.02, "sine");
    }

    idx++;
    // Yield threat to let UI draw progress
    requestAnimationFrame(generateNext);
  }

  // Run generation loop
  requestAnimationFrame(generateNext);
}

// ----------------------------------------------------
// BATCH ZIP COMPILER (JSZIP)
// ----------------------------------------------------
function downloadZIPCollection() {
  if (mintedCollection.length === 0) return;

  progressStatus.textContent = "Packaging images and JSON metadata into ZIP...";
  playBeep(400, 0.08, "triangle");

  const zip = new JSZip();
  const imgFolder = zip.folder("images");
  const metaFolder = zip.folder("metadata");

  let completedCount = 0;
  const count = mintedCollection.length;

  mintedCollection.forEach(item => {
    // 1. Get Image blob
    item.canvas.toBlob(blob => {
      imgFolder.file(`${item.id}.png`, blob);
      
      // Update image link inside metadata to match standard folders
      const updatedMeta = JSON.parse(JSON.stringify(item.metadata));
      updatedMeta.image = `ipfs://YOUR_IPFS_CID/images/${item.id}.png`;

      // 2. Add JSON File
      metaFolder.file(`${item.id}.json`, JSON.stringify(updatedMeta, null, 2));

      completedCount++;
      if (completedCount === count) {
        // Master metadata file containing all items
        const masterMetadata = mintedCollection.map(i => {
          const m = JSON.parse(JSON.stringify(i.metadata));
          m.image = `ipfs://YOUR_IPFS_CID/images/${i.id}.png`;
          return m;
        });
        zip.file("_metadata.json", JSON.stringify(masterMetadata, null, 2));

        // Generate and download ZIP file
        zip.generateAsync({ type: "blob" }).then(content => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(content);
          link.download = `PLAYDOGS_collection_${count}.zip`;
          link.click();

          progressStatus.textContent = "ZIP downloaded successfully!";
          playSuccessSound();
        });
      }
    }, "image/png");
  });
}

// ----------------------------------------------------
// EVENT BINDINGS
// ----------------------------------------------------
randomizeBtn.addEventListener("click", () => {
  const config = generateRandomConfig();
  playRandomizeSound();
  applyConfigToUI(config);
});

downloadPngBtn.addEventListener("click", () => {
  const config = getActiveConfiguration();
  // Create a high-res (512x512) canvas export for high quality print
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = 512;
  exportCanvas.height = 512;
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.imageSmoothingEnabled = false;

  // Temporary canvas of 32x32 to draw standard dog
  const temp = document.createElement("canvas");
  temp.width = 32;
  temp.height = 32;
  drawDog(temp, config.breed, config.style, config.background, config.traits);

  // Scale up to 512x512 onto export canvas
  exportCtx.drawImage(temp, 0, 0, 32, 32, 0, 0, 512, 512);

  // Trigger download
  const link = document.createElement("a");
  link.href = exportCanvas.toDataURL("image/png");
  link.download = `PlayDog_${config.breed}_${config.style}.png`;
  link.click();
  playBeep(800, 0.05, "sine");
});

downloadJsonBtn.addEventListener("click", () => {
  const config = getActiveConfiguration();
  const rarity = calculateRarity(config);
  const metadata = generateMetadataJSON(1, config, rarity);

  // Trigger JSON download
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(metadata, null, 2));
  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", `PlayDog_metadata.json`);
  link.click();
  playBeep(800, 0.05, "sine");
});

soundToggleBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    soundToggleBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> <span class="btn-text">SOUND ON</span>`;
    soundToggleBtn.classList.remove("secondary");
    playBeep(600, 0.05, "sine");
  } else {
    soundToggleBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i> <span class="btn-text">SOUND OFF</span>`;
    soundToggleBtn.classList.add("secondary");
  }
});

generateBatchBtn.addEventListener("click", () => {
  startBatchGeneration();
});

downloadZipBtn.addEventListener("click", () => {
  downloadZIPCollection();
});

// Window startup
window.addEventListener("DOMContentLoaded", () => {
  initUI();
  // Randomize initial load
  const initialConfig = generateRandomConfig();
  applyConfigToUI(initialConfig);
});
