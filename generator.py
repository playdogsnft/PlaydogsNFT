# PLAYDOGS Studio - 10,000 NFT Generative Collection Builder (Local Python Script)
# Requires 'Pillow' library (PIL)

import os
import json
import random
import hashlib
from PIL import Image, ImageDraw

# ----------------------------------------------------
# CONFIGURATION & PRESETS
# ----------------------------------------------------
BREED_PRESETS = {
    "golden_retriever": {
        "name": "Golden Retriever", "rarity": "Common", "weight": 0.10,
        "base": "#e6b85c", "shade": "#c69324", "muzzle": "#f7d58f", "eye": "#593e1a",
        "earType": "floppy", "earSize": (4, 8), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 1
    },
    "labrador": {
        "name": "Labrador", "rarity": "Common", "weight": 0.10,
        "base": "#f5e1b5", "shade": "#dcc187", "muzzle": "#fbf3dc", "eye": "#3a2512",
        "earType": "floppy", "earSize": (4, 7), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0
    },
    "shiba_inu": {
        "name": "Shiba Inu", "rarity": "Common", "weight": 0.08,
        "base": "#e07a3f", "shade": "#b24d15", "muzzle": "#ffffff", "eye": "#422817",
        "earType": "pointy", "earSize": (4, 5), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "shiba"
    },
    "husky": {
        "name": "Husky", "rarity": "Uncommon", "weight": 0.07,
        "base": "#616e7d", "shade": "#424d5a", "muzzle": "#f5f5f7", "eye": "#00f0ff",
        "earType": "pointy", "earSize": (4, 6), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "husky"
    },
    "german_shepherd": {
        "name": "German Shepherd", "rarity": "Uncommon", "weight": 0.07,
        "base": "#b3743b", "shade": "#804c1c", "muzzle": "#222222", "eye": "#4a2c11",
        "earType": "pointy", "earSize": (4, 7), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "gsd"
    },
    "beagle": {
        "name": "Beagle", "rarity": "Uncommon", "weight": 0.06,
        "base": "#b76e2e", "shade": "#854917", "muzzle": "#fdfefe", "eye": "#4e342e",
        "earType": "long_floppy", "earSize": (4, 9), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "beagle"
    },
    "corgi": {
        "name": "Corgi", "rarity": "Uncommon", "weight": 0.06,
        "base": "#e58b3c", "shade": "#bb6215", "muzzle": "#ffffff", "eye": "#3e2723",
        "earType": "pointy", "earSize": (5, 7), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "shiba"
    },
    "pug": {
        "name": "Pug", "rarity": "Uncommon", "weight": 0.05,
        "base": "#dfc29e", "shade": "#bf9e75", "muzzle": "#26252d", "eye": "#2c1c0e",
        "earType": "floppy", "earSize": (3, 5), "snoutType": "squashed", "snoutSize": (10, 4), "fluffiness": 0, "hasMask": "pug"
    },
    "rottweiler": {
        "name": "Rottweiler", "rarity": "Uncommon", "weight": 0.05,
        "base": "#24252a", "shade": "#121316", "muzzle": "#c6702b", "eye": "#523218",
        "earType": "floppy", "earSize": (4, 6), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "rottweiler"
    },
    "pitbull": {
        "name": "Pitbull", "rarity": "Uncommon", "weight": 0.05,
        "base": "#a3a5a8", "shade": "#74767a", "muzzle": "#e6e8ea", "eye": "#a1887f",
        "earType": "cropped", "earSize": (3, 4), "snoutType": "standard", "snoutSize": (10, 5), "fluffiness": 0
    },
    "bulldog": {
        "name": "Bulldog", "rarity": "Uncommon", "weight": 0.05,
        "base": "#cc9e78", "shade": "#9c714c", "muzzle": "#eae5e1", "eye": "#5d4037",
        "earType": "floppy", "earSize": (3, 5), "snoutType": "squashed", "snoutSize": (12, 6), "fluffiness": 0, "hasMask": "bulldog"
    },
    "border_collie": {
        "name": "Border Collie", "rarity": "Rare", "weight": 0.04,
        "base": "#1d1f21", "shade": "#0b0c0d", "muzzle": "#f8f9fa", "eye": "#5d4037",
        "earType": "cropped", "earSize": (4, 5), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "collie"
    },
    "doberman": {
        "name": "Doberman", "rarity": "Rare", "weight": 0.04,
        "base": "#2c2d35", "shade": "#1a1b1f", "muzzle": "#b56930", "eye": "#422e20",
        "earType": "cropped", "earSize": (3, 7), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "doberman"
    },
    "samoyed": {
        "name": "Samoyed", "rarity": "Rare", "weight": 0.03,
        "base": "#fbfcfc", "shade": "#d5dbdb", "muzzle": "#f2f4f4", "eye": "#1a1d20",
        "earType": "pointy", "earSize": (4, 6), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 2
    },
    "pomeranian": {
        "name": "Pomeranian", "rarity": "Rare", "weight": 0.03,
        "base": "#f0983d", "shade": "#c97116", "muzzle": "#f7c78f", "eye": "#2d1f10",
        "earType": "pointy", "earSize": (3, 4), "snoutType": "squashed", "snoutSize": (6, 4), "fluffiness": 3
    },
    "dalmatian": {
        "name": "Dalmatian", "rarity": "Rare", "weight": 0.02,
        "base": "#f5f6f8", "shade": "#d5d8dc", "muzzle": "#ffffff", "eye": "#5d4037",
        "earType": "floppy", "earSize": (4, 7), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 0, "hasMask": "spots"
    },
    "great_dane": {
        "name": "Great Dane", "rarity": "Rare", "weight": 0.02,
        "base": "#616a6b", "shade": "#424949", "muzzle": "#2c3e50", "eye": "#34495e",
        "earType": "cropped", "earSize": (3, 9), "snoutType": "long", "snoutSize": (8, 7), "fluffiness": 0
    },
    "akita": {
        "name": "Akita", "rarity": "Legendary", "weight": 0.015,
        "base": "#e3914a", "shade": "#bc6b25", "muzzle": "#f7ebe1", "eye": "#3d2314",
        "earType": "pointy", "earSize": (5, 6), "snoutType": "standard", "snoutSize": (8, 5), "fluffiness": 2, "hasMask": "shiba"
    },
    "chihuahua": {
        "name": "Chihuahua", "rarity": "Legendary", "weight": 0.01,
        "base": "#d2a679", "shade": "#9c714c", "muzzle": "#ebd9c6", "eye": "#42230b",
        "earType": "chihuahua_ears", "earSize": (6, 8), "snoutType": "squashed", "snoutSize": (6, 4), "fluffiness": 0
    },
    "cane_corso": {
        "name": "Cane Corso", "rarity": "Mythic", "weight": 0.005,
        "base": "#383d41", "shade": "#232628", "muzzle": "#181a1c", "eye": "#5a4534",
        "earType": "cropped", "earSize": (3, 6), "snoutType": "standard", "snoutSize": (10, 6), "fluffiness": 0
    }
}

SKIN_WEIGHTS = {
    "normal": {"weight": 0.82, "name": "Normal (Standard)", "rarity": "Common"},
    "zombie": {"weight": 0.07, "name": "Zombie Skin", "rarity": "Rare"},
    "robot": {"weight": 0.06, "name": "Robot Skin", "rarity": "Rare"},
    "gold": {"weight": 0.04, "name": "Gold Skin", "rarity": "Legendary"},
    "alien": {"weight": 0.01, "name": "Alien Skin", "rarity": "Mythic"}
}

BACKGROUND_WEIGHTS = {
    "cyan-blue": {"weight": 0.20, "name": "Neon Cyan-Blue"},
    "pink-orange": {"weight": 0.20, "name": "Sunset Pink-Orange"},
    "purple-dark": {"weight": 0.15, "name": "Void Purple-Dark"},
    "green-teal": {"weight": 0.15, "name": "Acid Green-Teal"},
    "solid-gray": {"weight": 0.15, "name": "Classic Gray"},
    "matrix-code": {"weight": 0.10, "name": "Digital Matrix"},
    "gold-glow": {"weight": 0.05, "name": "Golden Aura"}
}

TRAIT_WEIGHTS = {
    "hat": {
        "chance": 0.35,
        "items": {
            "beanie-red": {"weight": 0.25, "name": "Red Beanie", "rarity": "Common"},
            "beanie-blue": {"weight": 0.25, "name": "Blue Beanie", "rarity": "Common"},
            "cap-forward": {"weight": 0.20, "name": "Cap Forward", "rarity": "Uncommon"},
            "cap-backward": {"weight": 0.15, "name": "Cap Backward", "rarity": "Uncommon"},
            "cowboy": {"weight": 0.10, "name": "Cowboy Hat", "rarity": "Rare"},
            "tophat": {"weight": 0.04, "name": "Top Hat", "rarity": "Rare"},
            "crown": {"weight": 0.01, "name": "Royal Crown", "rarity": "Legendary"}
        }
    },
    "glasses": {
        "chance": 0.30,
        "items": {
            "shades-dark": {"weight": 0.40, "name": "Classic Shades", "rarity": "Common"},
            "glasses-3d": {"weight": 0.30, "name": "3D Glasses", "rarity": "Uncommon"},
            "vr-headset": {"weight": 0.18, "name": "VR Headset", "rarity": "Rare"},
            "laser-red": {"weight": 0.08, "name": "Laser Eyes (Red)", "rarity": "Legendary"},
            "laser-blue": {"weight": 0.04, "name": "Laser Eyes (Blue)", "rarity": "Mythic"}
        }
    },
    "neck": {
        "chance": 0.35,
        "items": {
            "spike-collar": {"weight": 0.35, "name": "Spike Collar", "rarity": "Common"},
            "silver-chain": {"weight": 0.25, "name": "Silver Chain", "rarity": "Uncommon"},
            "gold-chain": {"weight": 0.15, "name": "Gold Chain", "rarity": "Rare"},
            "hoodie-red": {"weight": 0.08, "name": "Red Hoodie", "rarity": "Rare"},
            "hoodie-blue": {"weight": 0.08, "name": "Blue Hoodie", "rarity": "Rare"},
            "hoodie-purple": {"weight": 0.06, "name": "Purple Hoodie", "rarity": "Legendary"},
            "hoodie-black": {"weight": 0.03, "name": "Black Hoodie", "rarity": "Legendary"}
        }
    },
    "mouth": {
        "chance": 0.20,
        "items": {
            "bubblegum": {"weight": 0.70, "name": "Bubblegum Bubble", "rarity": "Uncommon"},
            "cigar": {"weight": 0.30, "name": "Smoking Cigar", "rarity": "Rare"}
        }
    },
    "headphones": {
        "chance": 0.15,
        "items": {
            "headphones-classic": {"weight": 1.0, "name": "Street Headphones", "rarity": "Uncommon"}
        }
    }
}

# Helper to convert hex to RGB tuple
def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

# ----------------------------------------------------
# PROCEDURAL PIXEL DRAWING ENGINE
# ----------------------------------------------------
def draw_dog(breed_id, skin_style, bg_type, traits):
    # 32x32 canvas grid
    size = 32
    grid = [[None for _ in range(size)] for _ in range(size)]

    def set_pixel(x, y, color):
        if 0 <= x < size and 0 <= y < size and color is not None:
            grid[y][x] = hex_to_rgb(color)

    def draw_rect(x, y, w, h, color):
        for dy in range(h):
            for dx in range(w):
                set_pixel(x + dx, y + dy, color)

    breed = BREED_PRESETS[breed_id]
    base_color = breed["base"]
    shade_color = breed["shade"]
    muzzle_color = breed["muzzle"]
    eye_color = breed["eye"]
    outline_color = "#000000"

    # Skin overrides
    if skin_style == "gold":
        base_color, shade_color, muzzle_color, eye_color = "#ffd700", "#b8860b", "#ffe066", "#ffffff"
    elif skin_style == "zombie":
        base_color, shade_color, muzzle_color, eye_color = "#739957", "#496633", "#8c6c53", "#ff3333"
    elif skin_style == "alien":
        base_color, shade_color, muzzle_color, eye_color = "#33f5ff", "#00a3cc", "#ccf9ff", "#000000"
    elif skin_style == "robot":
        base_color, shade_color, muzzle_color, eye_color = "#a0aab5", "#6e7780", "#d1d7db", "#39ff14"

    headW, headH = 14, 14
    headX, headY = (size - headW) // 2, 10

    # 1. Body & Neck
    draw_rect(11, 23, 10, 9, base_color)
    draw_rect(12, 23, 9, 9, shade_color)
    draw_rect(8, 27, 3, 5, base_color)
    draw_rect(21, 27, 3, 5, shade_color)
    draw_rect(9, 26, 14, 1, base_color)

    # 2. Back Ears (floppy)
    if breed["earType"] in ["floppy", "long_floppy"]:
        earH = 10 if breed["earType"] == "long_floppy" else breed["earSize"][1]
        earW = breed["earSize"][0]
        draw_rect(headX - earW + 1, headY + 2, earW, earH, base_color)
        draw_rect(headX + headW - 1, headY + 2, earW, earH, shade_color)

    # 3. Head Base
    draw_rect(headX, headY, headW, headH, base_color)
    set_pixel(headX, headY, None)
    set_pixel(headX + headW - 1, headY, None)

    if breed["fluffiness"] > 0:
        for f in range(breed["fluffiness"]):
            draw_rect(headX - 1 - f, headY + 6, 1, 6, base_color)
            draw_rect(headX + headW + f, headY + 6, 1, 6, shade_color)

    draw_rect(headX + headW - 3, headY + 1, 3, headH - 1, shade_color)
    draw_rect(headX + 1, headY + headH - 2, headW - 2, 2, shade_color)

    # 4. Front Ears (pointy/cropped)
    if breed["earType"] in ["pointy", "cropped", "chihuahua_ears"]:
        earH, earW = breed["earSize"][1], breed["earSize"][0]
        if breed["earType"] == "chihuahua_ears":
            for i in range(earH):
                offset = int(i / 1.5)
                w = max(1, earW - offset)
                draw_rect(headX + 1 - offset, headY - 1 - i, w, 1, base_color)
                draw_rect(headX + headW - 2 + offset - w, headY - 1 - i, w, 1, shade_color)
        else:
            for i in range(earH):
                w = max(1, earW - int(i / 2))
                draw_rect(headX + 1, headY - 1 - i, w, 1, base_color)
                draw_rect(headX + headW - 1 - w, headY - 1 - i, w, 1, shade_color)

    # 5. Masks
    if skin_style == "normal":
        hm = breed.get("hasMask")
        if hm == "husky":
            draw_rect(headX + 2, headY + 4, 10, 7, "#f5f5f7")
            draw_rect(headX + 4, headY + 2, 6, 2, "#f5f5f7")
            draw_rect(15, headY + 5, 2, 6, base_color)
        elif hm == "gsd":
            draw_rect(headX + 3, headY + 5, 8, 8, "#222222")
            draw_rect(headX + 5, headY + 3, 4, 2, "#222222")
        elif hm == "shiba":
            draw_rect(headX + 1, headY + 8, 3, 4, "#ffffff")
            draw_rect(headX + headW - 4, headY + 8, 3, 4, "#eaeaea")
        elif hm == "collie":
            draw_rect(14, headY, 4, headH, "#f8f9fa")
            draw_rect(13, headY + 8, 6, 6, "#f8f9fa")
        elif hm == "beagle":
            draw_rect(headX + 3, headY + 8, 8, 6, "#ffffff")
            draw_rect(headX + 4, headY + 4, 6, 4, base_color)
        elif hm == "rottweiler":
            set_pixel(12, 14, "#c6702b")
            set_pixel(19, 14, "#b56221")
        elif hm == "spots":
            for sx, sy in [[10, 11], [12, 18], [20, 12], [22, 17], [18, 21], [15, 14], [9, 28], [21, 29]]:
                set_pixel(sx, sy, "#1d1f21")
        elif hm == "doberman":
            set_pixel(12, 14, "#b56930")
            set_pixel(19, 14, "#9c5722")
        elif hm == "bulldog":
            draw_rect(headX + 2, headY + 4, 3, 3, "#ffffff")
        elif hm == "pug":
            draw_rect(headX + 3, headY + 7, 8, 6, "#26252d")
            set_pixel(14, headY + 3, "#1a1a20")
            set_pixel(17, headY + 3, "#1a1a20")

    # 6. Snout
    snoutW, snoutH = breed["snoutSize"]
    snoutX = (size - snoutW) // 2
    snoutY = headY + headH - snoutH - 1
    draw_rect(snoutX, snoutY, snoutW, snoutH, muzzle_color)

    snoutShadeColor = "#d4af37" if skin_style == "gold" else ("#594535" if skin_style == "zombie" else ("#99e0ff" if skin_style == "alien" else ("#b5babe" if skin_style == "robot" else "#b5a391")))
    if skin_style == "normal" and muzzle_color in ["#ffffff", "#fdfefe", "#f5f5f7", "#f8f9fa"]:
        draw_rect(snoutX + snoutW//2, snoutY, (snoutW - snoutW//2), snoutH, "#e0e0e0")
    elif skin_style == "normal" and muzzle_color not in ["#222222", "#26252d"]:
        draw_rect(snoutX + snoutW//2, snoutY, (snoutW - snoutW//2), snoutH, snoutShadeColor)

    noseColor = "#3d2211" if skin_style == "zombie" else "#1a1921"
    draw_rect(15, snoutY + 1, 2, 2, noseColor)
    set_pixel(15, snoutY + 3, noseColor)
    set_pixel(16, snoutY + 3, noseColor)

    # 7. Eyes
    eyeY = headY + 5
    leftEyeX, rightEyeX = headX + 2, headX + headW - 5
    if skin_style == "alien":
        draw_rect(leftEyeX, eyeY - 1, 2, 3, "#000000")
        draw_rect(rightEyeX, eyeY - 1, 2, 3, "#000000")
    else:
        draw_rect(leftEyeX, eyeY, 2, 2, "#ffffff")
        set_pixel(leftEyeX + 1, eyeY, eye_color)
        set_pixel(leftEyeX + 1, eyeY + 1, eye_color)
        draw_rect(rightEyeX, eyeY, 2, 2, "#ffffff")
        set_pixel(rightEyeX, eyeY, eye_color)
        set_pixel(rightEyeX, eyeY + 1, eye_color)

    if skin_style != "alien":
        hl = "#fff3a8" if skin_style == "gold" else ("#a0c287" if skin_style == "zombie" else ("#d6dbe0" if skin_style == "robot" else "#ffffff"))
        set_pixel(leftEyeX, eyeY - 2, hl)
        set_pixel(rightEyeX + 1, eyeY - 2, hl)

    # 8. Outline checks
    temp_grid = [row[:] for row in grid]
    for y in range(size):
        for x in range(size):
            if temp_grid[y][x] is None:
                for nx, ny in [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]:
                    if 0 <= nx < size and 0 <= ny < size:
                        if temp_grid[ny][nx] is not None:
                            if y < size - 1:
                                set_pixel(x, y, outline_color)

    # 9. Accessories
    # Chains
    if traits.get("neck") == "gold-chain":
        draw_rect(11, 24, 10, 2, "#ffd700")
        set_pixel(12, 25, "#b8860b")
        set_pixel(14, 25, "#b8860b")
        set_pixel(16, 25, "#b8860b")
        set_pixel(18, 25, "#b8860b")
    elif traits.get("neck") == "silver-chain":
        draw_rect(11, 24, 10, 2, "#e0e0e0")
        set_pixel(12, 25, "#888888")
        set_pixel(14, 25, "#888888")
        set_pixel(16, 25, "#888888")
        set_pixel(18, 25, "#888888")
    elif traits.get("neck") == "spike-collar":
        draw_rect(11, 24, 10, 2, "#c1121f")
        for sx in [11, 13, 15, 17, 19, 21]:
            set_pixel(sx, 23, "#ffffff")
    elif traits.get("neck", "").startswith("hoodie"):
        hc = {"hoodie-red": ("#c1121f", "#780000"), "hoodie-blue": ("#0077b6", "#03045e"), "hoodie-purple": ("#7209b7", "#3f37c9"), "hoodie-black": ("#1a1921", "#0d0c10")}.get(traits["neck"], ("#c1121f", "#780000"))
        draw_rect(10, 24, 12, 8, hc[0])
        draw_rect(8, 27, 4, 5, hc[0])
        draw_rect(20, 27, 4, 5, hc[1])
        draw_rect(16, 24, 6, 8, hc[1])
        draw_rect(14, 24, 4, 2, base_color)
        draw_rect(14, 24, 4, 1, outline_color)

    # Cigar/Bubblegum
    if traits.get("mouth") == "cigar":
        draw_rect(17, snoutY + 3, 4, 1, "#8b5a2b")
        set_pixel(20, snoutY + 3, "#ff4500")
        set_pixel(21, snoutY + 2, "#dcdcdc")
    elif traits.get("mouth") == "bubblegum":
        draw_rect(17, snoutY + 2, 4, 4, "#ff70a6")
        set_pixel(17, snoutY + 2, None)
        set_pixel(20, snoutY + 2, None)
        set_pixel(17, snoutY + 5, None)
        set_pixel(20, snoutY + 5, None)
        set_pixel(18, snoutY + 3, "#ff9ebb")

    # Glasses
    if traits.get("glasses") == "shades-dark":
        draw_rect(headX + 1, eyeY, 12, 2, "#111111")
        set_pixel(headX, eyeY, "#111111")
        set_pixel(headX + 13, eyeY, "#111111")
        set_pixel(headX + 3, eyeY, "#666666")
        set_pixel(headX + 10, eyeY, "#666666")
    elif traits.get("glasses") == "glasses-3d":
        draw_rect(headX + 1, eyeY - 1, 12, 4, "#ffffff")
        set_pixel(headX, eyeY, "#ffffff")
        set_pixel(headX + 13, eyeY, "#ffffff")
        draw_rect(headX + 2, eyeY, 3, 2, "#d90429")
        draw_rect(headX + 9, eyeY, 3, 2, "#00b4d8")
        draw_rect(15, eyeY, 2, 2, "#ffffff")
    elif traits.get("glasses") == "vr-headset":
        draw_rect(headX + 1, eyeY - 2, 12, 5, "#2b2d42")
        draw_rect(headX + 2, eyeY - 1, 10, 3, "#1a1c23")
        set_pixel(16, eyeY, "#39ff14")
        set_pixel(15, eyeY, "#00f0ff")
        set_pixel(17, eyeY, "#00f0ff")

    # Hood
    if traits.get("neck", "").startswith("hoodie"):
        hc = {"hoodie-red": ("#c1121f", "#780000"), "hoodie-blue": ("#0077b6", "#03045e"), "hoodie-purple": ("#7209b7", "#3f37c9"), "hoodie-black": ("#1a1921", "#0d0c10")}.get(traits["neck"], ("#c1121f", "#780000"))
        draw_rect(headX, headY, 1, headH - 2, hc[0])
        draw_rect(headX + headW - 1, headY, 1, headH - 2, hc[1])
        draw_rect(headX, headY - 1, headW, 2, hc[0])
        draw_rect(headX + headW//2, headY - 1, headW//2, 2, hc[1])
        set_pixel(headX, headY - 1, outline_color)
        set_pixel(headX + headW - 1, headY - 1, outline_color)

    # Headphones
    if traits.get("headphones") == "headphones-classic":
        draw_rect(headX + 2, headY - 2, headW - 4, 1, "#e63946")
        draw_rect(headX - 1, eyeY - 2, 2, 6, "#e63946")
        set_pixel(headX + 1, eyeY, "#1d3557")
        draw_rect(headX + headW - 1, eyeY - 2, 2, 6, "#c31e2b")
        set_pixel(headX + headW - 2, eyeY, "#1d3557")

    # Hats
    hat = traits.get("hat", "")
    if hat.startswith("beanie"):
        color = "#d90429" if hat == "beanie-red" else "#0077b6"
        shade = "#9b001c" if hat == "beanie-red" else "#005685"
        draw_rect(headX + 2, headY - 3, 10, 4, color)
        draw_rect(headX + 7, headY - 3, 5, 4, shade)
        draw_rect(headX + 1, headY - 1, 12, 1, color)
        draw_rect(15, headY - 4, 2, 1, "#ffffff")
    elif hat.startswith("cap"):
        color, shade = "#ffb703", "#fb8500"
        draw_rect(headX + 3, headY - 3, 8, 4, color)
        draw_rect(headX + 7, headY - 3, 4, 4, shade)
        if hat == "cap-forward":
            draw_rect(headX + 8, headY - 1, 6, 1, shade)
        else:
            draw_rect(headX, headY - 1, 4, 1, color)
    elif hat == "tophat":
        draw_rect(headX, headY - 1, headW, 1, "#111111")
        draw_rect(headX + 2, headY - 9, 10, 8, "#2b2b2b")
        draw_rect(headX + 7, headY - 9, 5, 8, "#1a1a1a")
        draw_rect(headX + 2, headY - 2, 10, 1, "#e63946")
    elif hat == "crown":
        crownY = headY - 4
        draw_rect(headX + 1, crownY + 2, 12, 2, "#ffd700")
        draw_rect(headX + 1, crownY, 2, 2, "#ffd700")
        draw_rect(headX + 6, crownY, 2, 2, "#ffd700")
        draw_rect(headX + 11, crownY, 2, 2, "#ffd700")
        set_pixel(headX + 2, crownY + 2, "#d90429")
        set_pixel(headX + 6, crownY + 2, "#0077b6")
        set_pixel(headX + 10, crownY + 2, "#39ff14")
    elif hat == "cowboy":
        draw_rect(headX - 2, headY - 2, headW + 4, 2, "#8b5a2b")
        draw_rect(headX + 2, headY - 5, 10, 3, "#8b5a2b")
        draw_rect(headX + 7, headY - 5, 5, 3, "#5c3a1a")
        draw_rect(headX + 2, headY - 3, 10, 1, "#000000")

    # Laser Eyes
    if traits.get("glasses", "").startswith("laser"):
        laserColor = "#ff0055" if traits["glasses"] == "laser-red" else "#00f0ff"
        for x in range(leftEyeX + 1):
            set_pixel(x, eyeY, laserColor)
            set_pixel(x, eyeY + 1, laserColor)
        for x in range(rightEyeX, size):
            set_pixel(x, eyeY, laserColor)
            set_pixel(x, eyeY + 1, laserColor)

    # Convert color matrix to PIL image
    img = Image.new("RGBA", (size, size))
    draw = ImageDraw.Draw(img)

    # Background layer
    if bg_type == "cyan-blue":
        for y in range(size):
            for x in range(size):
                r = int(0x00 + (0x00 - 0x00) * (x+y)/(size*2))
                g = int(0xf0 + (0x55 - 0xf0) * (x+y)/(size*2))
                b = int(0xff + (0xff - 0xff) * (x+y)/(size*2))
                img.putpixel((x, y), (r, g, b, 255))
    elif bg_type == "pink-orange":
        for y in range(size):
            for x in range(size):
                r = int(0xff + (0xff - 0xff) * (x+y)/(size*2))
                g = int(0x00 + (0xaa - 0x00) * (x+y)/(size*2))
                b = int(0x7f + (0x00 - 0x7f) * (x+y)/(size*2))
                img.putpixel((x, y), (r, g, b, 255))
    elif bg_type == "purple-dark":
        for y in range(size):
            for x in range(size):
                r = int(0x7b + (0x10 - 0x7b) * (x+y)/(size*2))
                g = int(0x2c + (0x00 - 0x2c) * (x+y)/(size*2))
                b = int(0xbf + (0x2b - 0xbf) * (x+y)/(size*2))
                img.putpixel((x, y), (r, g, b, 255))
    elif bg_type == "green-teal":
        for y in range(size):
            for x in range(size):
                r = int(0x39 + (0x00 - 0x39) * (x+y)/(size*2))
                g = int(0xff + (0x4b - 0xff) * (x+y)/(size*2))
                b = int(0x14 + (0x49 - 0x14) * (x+y)/(size*2))
                img.putpixel((x, y), (r, g, b, 255))
    elif bg_type == "gold-glow":
        for y in range(size):
            for x in range(size):
                # radial glow mock
                dist = ((x - 16)**2 + (y - 16)**2)**0.5 / 22.0
                dist = min(1.0, dist)
                r = int(0xff * (1-dist) + 0x8b * dist)
                g = int(0xf2 * (1-dist) + 0x5a * dist)
                b = int(0x75 * (1-dist) + 0x00 * dist)
                img.putpixel((x, y), (r, g, b, 255))
    elif bg_type == "matrix-code":
        draw.rectangle([0, 0, size, size], fill=(5, 12, 8, 255))
        for x in range(1, size, 4):
            length = random.randint(5, 20)
            startY = random.randint(0, 15)
            draw.rectangle([x, startY, x, startY+length], fill=(57, 255, 20, 40))
    else:
        # classic gray
        draw.rectangle([0, 0, size, size], fill=(92, 107, 115, 255))

    # Paint grid
    for y in range(size):
        for x in range(size):
            pixel_color = grid[y][x]
            if pixel_color is not None:
                img.putpixel((x, y), pixel_color + (255,))

    # Custom point filter scale to 512x512
    return img.resize((512, 512), resample=Image.NEAREST)

# ----------------------------------------------------
# GENERATOR CONTROLLER
# ----------------------------------------------------
def main():
    print("----------------------------------------------------")
    print("PLAYDOGS 10,000 NFT Local Generation Script Started")
    print("----------------------------------------------------")

    # Output directories
    out_dir = "build"
    img_dir = os.path.join(out_dir, "images")
    meta_dir = os.path.join(out_dir, "metadata")

    os.makedirs(img_dir, exist_ok=True)
    os.makedirs(meta_dir, exist_ok=True)

    count = 10000
    generated_configs = []
    metadata_list = []
    
    # Track configurations to guarantee 100% uniqueness
    seen_hashes = set()

    def get_weighted_choice(weights_dict):
        r = random.random()
        for k, v in weights_dict.items():
            r -= v["weight"]
            if r <= 0:
                return k
        return list(weights_dict.keys())[0]

    idx = 1
    attempts = 0
    max_attempts = 1000000

    while idx <= count and attempts < max_attempts:
        breed = get_weighted_choice(BREED_PRESETS)
        skin = get_weighted_choice(SKIN_WEIGHTS)
        bg = get_weighted_choice(BACKGROUND_WEIGHTS)
        
        traits = {}
        for cat, val in TRAIT_WEIGHTS.items():
            if random.random() < val["chance"]:
                traits[cat] = get_weighted_choice(val["items"])

        # Create config signature to verify uniqueness
        cfg_sig = {
            "breed": breed,
            "style": skin,
            "background": bg,
            "traits": traits
        }
        
        cfg_hash = hashlib.sha256(json.dumps(cfg_sig, sort_keys=True).encode()).hexdigest()
        
        if cfg_hash in seen_hashes:
            attempts += 1
            continue
            
        seen_hashes.add(cfg_hash)
        attempts = 0

        # Draw and Save PNG
        img = draw_dog(breed, skin, bg, traits)
        img_path = os.path.join(img_dir, f"{idx}.png")
        img.save(img_path, "PNG")

        # Compile OpenSea Attributes
        attributes = [
            {"trait_type": "Breed", "value": BREED_PRESETS[breed]["name"]},
            {"trait_type": "Skin Style", "value": SKIN_WEIGHTS[skin]["name"]},
            {"trait_type": "Background", "value": BACKGROUND_WEIGHTS[bg]["name"]}
        ]
        
        for cat in ["hat", "glasses", "neck", "mouth", "headphones"]:
            if cat in traits:
                item_name = TRAIT_WEIGHTS[cat]["items"][traits[cat]]["name"]
                attributes.append({"trait_type": cat.capitalize(), "value": item_name})

        # Calculate score and rarity class
        score = 1.0 / BREED_PRESETS[breed]["weight"]
        score += 1.0 / SKIN_WEIGHTS[skin]["weight"]
        score += 1.0 / BACKGROUND_WEIGHTS[bg]["weight"]
        
        for cat in ["hat", "glasses", "neck", "mouth", "headphones"]:
            isPresent = cat in traits
            base_chance = TRAIT_WEIGHTS[cat]["chance"]
            if isPresent:
                item_w = TRAIT_WEIGHTS[cat]["items"][traits[cat]]["weight"]
                score += 1.0 / (base_chance * item_w)
            else:
                score += 1.0 / (1.0 - base_chance)

        rClass = "Common"
        if score > 400: rClass = "Mythic"
        elif score > 150: rClass = "Legendary"
        elif score > 65: rClass = "Rare"
        elif score > 30: rClass = "Uncommon"

        attributes.append({"trait_type": "Rarity Class", "value": rClass})
        attributes.append({"display_type": "number", "trait_type": "Rarity Score", "value": round(score, 2)})

        metadata = {
            "name": f"PlayDog #{idx}",
            "description": "A rare pixel art dog in CryptoPunks-inspired style, procedurally generated by PLAYDOGS Studio.",
            "image": f"ipfs://YOUR_IPFS_CID/images/{idx}.png",
            "edition": idx,
            "attributes": attributes
        }

        # Save single metadata file
        meta_path = os.path.join(meta_dir, f"{idx}.json")
        with open(meta_path, "w") as f:
            json.dump(metadata, f, indent=2)

        metadata_list.append(metadata)

        if idx % 500 == 0:
            print(f"Generated {idx} of {count} NFTs...")

        idx += 1

    # Save master metadata list
    master_meta_path = os.path.join(out_dir, "_metadata.json")
    with open(master_meta_path, "w") as f:
        json.dump(metadata_list, f, indent=2)

    # Generate Provenance Hash
    # concatenate all single token URI hashes and hash them together
    concat_hashes = ""
    for meta in metadata_list:
        concat_hashes += hashlib.sha256(json.dumps(meta, sort_keys=True).encode()).hexdigest()
    
    provenance_hash = hashlib.sha256(concat_hashes.encode()).hexdigest()
    print("\n----------------------------------------------------")
    print("Generation complete!")
    print(f"Total NFTs: {len(metadata_list)}")
    print(f"Images folder: {img_dir}")
    print(f"Metadata folder: {meta_dir}")
    print(f"Master metadata: {master_meta_path}")
    print(f"PROVENANCE HASH: {provenance_hash}")
    print("----------------------------------------------------")

if __name__ == "__main__":
    main()
