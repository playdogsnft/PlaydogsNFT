# PLAYDOGS Studio - OpenSea Brand Assets Generator (PFP & Banner)
# Reuses the drawing logic from generator.py to output custom brand assets

import os
from PIL import Image, ImageDraw
import generator

def main():
    print("----------------------------------------------------")
    print("PLAYDOGS OpenSea Assets Builder")
    print("----------------------------------------------------")

    out_dir = "build"
    os.makedirs(out_dir, exist_ok=True)

    # 1. Create a Premium Profile Picture (PFP)
    print("Generating Profile Picture (PFP)...")
    # PFP: Legendary Akita with Golden Crown and shades
    pfp_img = generator.draw_dog(
        breed_id="akita", 
        skin_style="gold", 
        bg_type="cyan-blue", 
        traits={"hat": "crown", "glasses": "shades-dark"}
    )
    pfp_path = os.path.join(out_dir, "opensea_pfp.png")
    pfp_img.save(pfp_path, "PNG")
    print(f"PFP saved to: {pfp_path}")

    # 2. Create a Wide Banner (1500x500)
    print("\nGenerating 1500x500 Banner Showcase...")
    banner = Image.new("RGBA", (1500, 500))
    draw = ImageDraw.Draw(banner)

    # Draw continuous horizontal neon gradient for background
    for x in range(1500):
        # Interpolate from Neon Pink (#ff007f) to Neon Cyan (#00f0ff) to Purple (#7b2cbf)
        if x < 750:
            pct = x / 750.0
            r = int(0xff + (0x00 - 0xff) * pct)
            g = int(0x00 + (0xf0 - 0x00) * pct)
            b = int(0x7f + (0xff - 0x7f) * pct)
        else:
            pct = (x - 750) / 750.0
            r = int(0x00 + (0x7b - 0x00) * pct)
            g = int(0xf0 + (0x2c - 0xf0) * pct)
            b = int(0xff + (0xbf - 0xff) * pct)
        
        # Draw column
        draw.line([(x, 0), (x, 500)], fill=(r, g, b, 255))

    # Add a retro grid pattern overlay at the bottom half
    grid_color = (255, 255, 255, 20)
    for y in range(250, 500, 20):
        draw.line([(0, y), (1500, y)], fill=grid_color)
    for x in range(0, 1500, 40):
        # Draw perspective lines expanding outwards
        centerX = 750
        offset = x - centerX
        draw.line([(centerX + offset // 4, 250), (x, 500)], fill=grid_color)

    # Line up 5 featured dogs (sized 256x256 each) on the grid floor
    dog_configs = [
        ("husky", "normal", {"glasses": "vr-headset"}),
        ("chihuahua", "normal", {"hat": "beanie-red", "mouth": "bubblegum"}),
        ("golden_retriever", "normal", {"hat": "cowboy", "neck": "silver-chain"}),
        ("german_shepherd", "robot", {"glasses": "laser-red"}),
        ("cane_corso", "alien", {"neck": "gold-chain", "mouth": "cigar"})
    ]

    print("Adding dogs to the banner...")
    positions = [120, 390, 660, 930, 1200] # X positions
    for idx, (breed, skin, traits) in enumerate(dog_configs):
        # Generate 32x32 dog, scale to 256x256
        dog_raw = generator.draw_dog(breed, skin, "solid-gray", traits)
        
        # Remove background to make it transparent
        # Solid-gray background color is #5c6b73 -> RGB (92, 107, 115)
        bg_rgb = (92, 107, 115, 255)
        dog_raw = dog_raw.convert("RGBA")
        datas = dog_raw.getdata()
        
        new_data = []
        for item in datas:
            # Check if it matches background gray color
            if item[0] == 92 and item[1] == 107 and item[2] == 115:
                new_data.append((0, 0, 0, 0)) # transparent
            else:
                new_data.append(item)
        dog_raw.putdata(new_data)

        # Scale down to 240x240 for banner placing
        dog_scaled = dog_raw.resize((240, 240), resample=Image.NEAREST)
        
        # Paste onto banner (Y = 160 puts them resting on the grid horizon)
        banner.paste(dog_scaled, (positions[idx], 160), dog_scaled)

    banner_path = os.path.join(out_dir, "opensea_banner.png")
    banner.save(banner_path, "PNG")
    print(f"Banner saved to: {banner_path}")
    print("----------------------------------------------------")
    print("Assets generated successfully!")

if __name__ == "__main__":
    main()
