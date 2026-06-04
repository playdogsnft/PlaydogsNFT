# PLAYDOGS Studio - Pixel Art Dog NFT Generator

PLAYDOGS Studio is a high-fidelity, interactive, retro-cyberpunk themed web application that procedurally generates unique 8-bit dog portrait avatars in a CryptoPunks-inspired style. It features 20 distinct dog breeds, multiple skin overlays (Alien, Gold, Zombie, Robot), and various accessory layering (hats, eyewear, collars, headphones, cigars).

## Features
- **Dog Lab Customizer**: Manually select breeds, styles, backgrounds, and stack accessories. Includes an active rarity score calculator.
- **Bulk Generative Minting**: Generate up to 1,000 unique NFT combinations at once. The engine automatically checks for duplicate configuration collisions.
- **Dynamic Chiptune Sounds**: 8-bit sound effects synthesized in real-time via the Web Audio API (can be muted).
- **Metadata Packaging**: Compiles generated canvases and OpenSea-compatible JSON metadata files into a single structured ZIP file using JSZip.
- **High-Res Export**: Single PNG export scales the pixelated 32x32 canvas up to a crisp 512x512 PNG using point-filtering algorithms for sharp print and presentation quality.

## Tech Stack
- **Core**: HTML5, Vanilla JavaScript, CSS3
- **Graphics**: HTML5 2D Canvas context with pixelated image-rendering.
- **Sound**: Web Audio API (real-time wave oscillators).
- **Libraries (CDN)**:
  - FontAwesome (UI Icons)
  - JSZip (Zip file construction)
  - Google Fonts (Press Start 2P, Orbitron, Inter)

## How to Run
1. Double-click the `index.html` file to open it in any modern web browser (Chrome, Firefox, Safari, Edge).
2. Enjoy the ambient sounds and interactive buttons.
3. Generate a batch of dogs (e.g., 50 or 100), inspect their traits in the gallery, and download the full set in one click.

## Directory Structure
- `index.html` - Core layout structure.
- `styles.css` - Neo-cyberpunk aesthetics, CRT overlays, scanlines, animation keyframes.
- `generator.js` - Procedural drawing engine mapping coordinates, masks, and accessories onto a 32x32 pixel grid.
- `app.js` - UI management, random generation weighted distributions, rarity math, and zip compilation.
- `README.md` - Technical setup and documentation.
