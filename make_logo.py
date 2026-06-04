"""
PLAYDOGS - Collection Logo Generator
Uses the existing PFP to create a premium OpenSea collection logo (350x350).
"""

import os
from PIL import Image, ImageDraw

def create_logo():
    print("Creating PLAYDOGS Collection Logo...")
    
    SIZE = 350
    logo = Image.new("RGBA", (SIZE, SIZE))
    draw = ImageDraw.Draw(logo)
    
    # Premium dark radial gradient background
    for y in range(SIZE):
        for x in range(SIZE):
            dist = ((x - SIZE//2)**2 + (y - SIZE//2)**2)**0.5 / (SIZE * 0.7)
            dist = min(1.0, dist)
            r = int(20 * (1 - dist) + 8 * dist)
            g = int(20 * (1 - dist) + 8 * dist)
            b = int(32 * (1 - dist) + 12 * dist)
            logo.putpixel((x, y), (r, g, b, 255))
    
    # Load the PFP
    pfp_path = os.path.join("build", "opensea_pfp.png")
    pfp = Image.open(pfp_path).convert("RGBA")
    
    # Resize PFP to fit nicely (200x200 centered)
    pfp_size = 190
    pfp = pfp.resize((pfp_size, pfp_size), Image.NEAREST)
    
    pfp_x = (SIZE - pfp_size) // 2
    pfp_y = 22
    
    # Gold glow behind PFP
    glow_layers = [
        (pfp_size + 24, (255, 215, 0, 12)),
        (pfp_size + 16, (255, 215, 0, 18)),
        (pfp_size + 8,  (255, 215, 0, 25)),
    ]
    for glow_size, glow_color in glow_layers:
        glow = Image.new("RGBA", (glow_size, glow_size), glow_color)
        gx = (SIZE - glow_size) // 2
        gy = pfp_y - (glow_size - pfp_size) // 2
        logo.paste(glow, (gx, gy), glow)
    
    # Gold border frame around PFP
    border_w = 3
    border_color = (255, 215, 0, 230)
    # Top
    draw.rectangle([pfp_x - border_w, pfp_y - border_w, pfp_x + pfp_size + border_w - 1, pfp_y - 1], fill=border_color)
    # Bottom
    draw.rectangle([pfp_x - border_w, pfp_y + pfp_size, pfp_x + pfp_size + border_w - 1, pfp_y + pfp_size + border_w - 1], fill=border_color)
    # Left
    draw.rectangle([pfp_x - border_w, pfp_y, pfp_x - 1, pfp_y + pfp_size - 1], fill=border_color)
    # Right
    draw.rectangle([pfp_x + pfp_size, pfp_y, pfp_x + pfp_size + border_w - 1, pfp_y + pfp_size - 1], fill=border_color)
    
    # Paste PFP
    logo.paste(pfp, (pfp_x, pfp_y), pfp)
    
    draw = ImageDraw.Draw(logo)
    
    # "PLAYDOGS" pixel text below
    pixel_size = 6
    title_y = pfp_y + pfp_size + 28
    
    letters = {
        'P': [(0,0),(1,0),(2,0),(0,1),(2,1),(0,2),(1,2),(2,2),(0,3),(0,4)],
        'L': [(0,0),(0,1),(0,2),(0,3),(0,4),(1,4),(2,4)],
        'A': [(1,0),(0,1),(2,1),(0,2),(1,2),(2,2),(0,3),(2,3),(0,4),(2,4)],
        'Y': [(0,0),(2,0),(0,1),(2,1),(1,2),(1,3),(1,4)],
        'D': [(0,0),(1,0),(0,1),(2,1),(0,2),(2,2),(0,3),(2,3),(0,4),(1,4)],
        'O': [(1,0),(0,1),(2,1),(0,2),(2,2),(0,3),(2,3),(1,4)],
        'G': [(1,0),(2,0),(0,1),(0,2),(2,2),(0,3),(2,3),(1,4),(2,4)],
        'S': [(1,0),(2,0),(0,1),(1,2),(2,3),(0,4),(1,4)]
    }
    
    title = "PLAYDOGS"
    letter_spacing = 4 * pixel_size
    total_w = len(title) * letter_spacing
    start_x = (SIZE - total_w) // 2
    
    # Glow behind letters
    for i, ch in enumerate(title):
        lx = start_x + i * letter_spacing
        if ch in letters:
            for px, py in letters[ch]:
                gx = lx + px * pixel_size
                gy = title_y + py * pixel_size
                draw.rectangle([gx-2, gy-2, gx+pixel_size+1, gy+pixel_size+1], fill=(255, 215, 0, 15))
    
    # Main letter pixels - white/cream
    for i, ch in enumerate(title):
        lx = start_x + i * letter_spacing
        if ch in letters:
            for px, py in letters[ch]:
                gx = lx + px * pixel_size
                gy = title_y + py * pixel_size
                draw.rectangle([gx, gy, gx+pixel_size-1, gy+pixel_size-1], fill=(255, 250, 235, 255))
    
    # Gold accent line under title
    line_y = title_y + 5 * pixel_size + 10
    line_w = total_w - 30
    draw.rectangle([(SIZE - line_w)//2, line_y, (SIZE + line_w)//2, line_y + 2], fill=(255, 215, 0, 255))
    
    # "NFT COLLECTION" subtitle
    sub_pixel = 3
    subtitle = "NFT COLLECTION"
    sub_spacing = sub_pixel + 2
    sub_w = len(subtitle) * sub_spacing
    sub_x = (SIZE - sub_w) // 2
    sub_y = line_y + 10
    
    for i, ch in enumerate(subtitle):
        sx = sub_x + i * sub_spacing
        if ch != ' ':
            draw.rectangle([sx, sub_y, sx + sub_pixel, sub_y + sub_pixel + 1], fill=(160, 165, 185, 200))
    
    # Corner accents (small decorative)
    accent_color = (255, 215, 0, 120)
    # Top-left
    draw.rectangle([8, 8, 28, 10], fill=accent_color)
    draw.rectangle([8, 8, 10, 28], fill=accent_color)
    # Top-right
    draw.rectangle([SIZE-28, 8, SIZE-8, 10], fill=accent_color)
    draw.rectangle([SIZE-10, 8, SIZE-8, 28], fill=accent_color)
    # Bottom-left
    draw.rectangle([8, SIZE-10, 28, SIZE-8], fill=accent_color)
    draw.rectangle([8, SIZE-28, 10, SIZE-8], fill=accent_color)
    # Bottom-right
    draw.rectangle([SIZE-28, SIZE-10, SIZE-8, SIZE-8], fill=accent_color)
    draw.rectangle([SIZE-10, SIZE-28, SIZE-8, SIZE-8], fill=accent_color)
    
    # Save
    output_path = os.path.join("build", "opensea_logo.png")
    logo = logo.convert("RGB")
    logo.save(output_path, "PNG", quality=100)
    print(f"Logo saved: {output_path} ({SIZE}x{SIZE})")

if __name__ == "__main__":
    create_logo()
    print("Done!")
