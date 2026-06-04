"""
PLAYDOGS - Multi-Size Logo Generator
Creates logo in all sizes needed for every platform.
"""

import os
import shutil
from PIL import Image

def create_all_sizes():
    # Source logo
    src = r"C:\Users\ROG G16\.gemini\antigravity-ide\brain\9e5d8b58-66c4-4587-882b-a5a40c58f56b\playdogs_logo_1780056895481.png"
    
    logo = Image.open(src).convert("RGBA")
    
    out_dir = os.path.join("build", "logos")
    os.makedirs(out_dir, exist_ok=True)
    
    # Save the main full-res logo
    main_path = os.path.join(out_dir, "playdogs_logo.png")
    logo.save(main_path, "PNG")
    print(f"Main logo: {main_path}")
    
    sizes = {
        "favicon_16": 16,
        "favicon_32": 32,
        "favicon_48": 48,
        "discord_icon_128": 128,
        "twitter_pfp_400": 400,
        "opensea_logo_350": 350,
        "website_logo_200": 200,
        "website_logo_500": 500,
        "hd_logo_1024": 1024,
    }
    
    for name, size in sizes.items():
        resized = logo.resize((size, size), Image.LANCZOS)
        path = os.path.join(out_dir, f"{name}.png")
        resized.save(path, "PNG")
        print(f"  {name}: {size}x{size} -> {path}")
    
    # Also copy to build root for easy access
    shutil.copy2(main_path, os.path.join("build", "playdogs_logo.png"))
    
    # Create ICO favicon (multi-size)
    ico_sizes = [
        logo.resize((16, 16), Image.LANCZOS),
        logo.resize((32, 32), Image.LANCZOS),
        logo.resize((48, 48), Image.LANCZOS),
    ]
    ico_path = os.path.join(out_dir, "favicon.ico")
    ico_sizes[0].save(ico_path, format="ICO", sizes=[(16,16),(32,32),(48,48)], append_images=ico_sizes[1:])
    print(f"  favicon.ico -> {ico_path}")
    
    print(f"\nAll logos saved to: {out_dir}")
    print(f"Total: {len(sizes) + 2} files")

if __name__ == "__main__":
    create_all_sizes()
    print("Done!")
