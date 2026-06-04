"""
PLAYDOGS - OpenSea Banner Generator
Creates a 1400x400 banner using real generated NFT images in a CryptoPunks grid style.
"""

import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_opensea_banner():
    print("Creating OpenSea Banner (1400x400)...")
    
    BANNER_W, BANNER_H = 1400, 400
    banner = Image.new("RGBA", (BANNER_W, BANNER_H))
    draw = ImageDraw.Draw(banner)
    
    # Dark gradient background
    for y in range(BANNER_H):
        for x in range(BANNER_W):
            # Deep dark gradient from charcoal to near-black
            t = (x + y) / (BANNER_W + BANNER_H)
            r = int(18 + 12 * t)
            g = int(18 + 8 * t)
            b = int(28 + 15 * t)
            banner.putpixel((x, y), (r, g, b, 255))
    
    # Add subtle grid pattern overlay
    for x in range(0, BANNER_W, 4):
        for y in range(0, BANNER_H, 4):
            if random.random() < 0.03:
                banner.putpixel((x, y), (57, 255, 20, 15))
    
    img_dir = os.path.join("build", "images")
    
    # Pick a diverse set of NFTs for display
    # Take specific ones + random selection for variety
    picks = [1, 42, 100, 200, 350, 500, 777, 888, 999, 1234, 
             1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 
             5555, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 9999]
    
    # Add some random ones to fill gaps
    all_ids = list(range(1, 10001))
    random.seed(42)  # Reproducible
    extra = random.sample([i for i in all_ids if i not in picks], 20)
    picks = sorted(picks + extra)
    
    # ========================================
    # LEFT SIDE: Cascading grid of NFTs
    # ========================================
    cell_size = 80  # Each NFT thumbnail
    padding = 4
    
    # Grid: fill left ~60% of banner with NFT grid
    grid_width = 900
    cols = grid_width // (cell_size + padding)
    rows = BANNER_H // (cell_size + padding)
    
    idx = 0
    for row in range(rows + 1):
        # Offset every other row for honeycomb effect
        offset_x = (cell_size // 2 + padding // 2) if row % 2 == 1 else 0
        for col in range(cols + 1):
            if idx >= len(picks):
                idx = 0
            
            nft_id = picks[idx]
            img_path = os.path.join(img_dir, f"{nft_id}.png")
            
            if os.path.exists(img_path):
                nft_img = Image.open(img_path).convert("RGBA")
                nft_img = nft_img.resize((cell_size, cell_size), Image.NEAREST)
                
                x = col * (cell_size + padding) + offset_x
                y = row * (cell_size + padding) - 10
                
                if x < grid_width + cell_size and y < BANNER_H + cell_size:
                    # Add subtle border
                    border_img = Image.new("RGBA", (cell_size + 4, cell_size + 4), (0, 0, 0, 180))
                    banner.paste(border_img, (x - 2, y - 2), border_img)
                    banner.paste(nft_img, (x, y), nft_img)
            
            idx += 1
    
    # ========================================
    # RIGHT SIDE: Title & branding
    # ========================================
    # Semi-transparent dark overlay on right side for text readability
    overlay = Image.new("RGBA", (550, BANNER_H), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    
    # Gradient overlay from transparent to dark
    for x in range(550):
        alpha = int(min(255, (x / 550) * 220 + 60))
        for y in range(BANNER_H):
            overlay.putpixel((x, y), (15, 15, 25, alpha))
    
    banner.paste(overlay, (850, 0), overlay)
    draw = ImageDraw.Draw(banner)
    
    # Title text area (right side)
    text_x = 960
    
    # "PLAYDOGS" title - large pixel text using rectangles
    title_y = 140
    pixel_size = 8
    
    # Draw "PLAYDOGS" letter by letter using pixel blocks
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
    
    # Draw glow effect behind text
    for i, ch in enumerate(title):
        lx = text_x + i * letter_spacing
        if ch in letters:
            for px, py in letters[ch]:
                # Glow
                gx = lx + px * pixel_size
                gy = title_y + py * pixel_size
                draw.rectangle([gx-3, gy-3, gx+pixel_size+2, gy+pixel_size+2], fill=(57, 255, 20, 25))
    
    # Draw main title pixels
    for i, ch in enumerate(title):
        lx = text_x + i * letter_spacing
        if ch in letters:
            for px, py in letters[ch]:
                gx = lx + px * pixel_size
                gy = title_y + py * pixel_size
                # White with slight golden tint
                draw.rectangle([gx, gy, gx+pixel_size-1, gy+pixel_size-1], fill=(255, 248, 230, 255))
    
    # Accent line under title
    line_y = title_y + 5 * pixel_size + 15
    draw.rectangle([text_x, line_y, text_x + 320, line_y + 3], fill=(255, 215, 0, 255))
    draw.rectangle([text_x, line_y + 5, text_x + 200, line_y + 7], fill=(57, 255, 20, 180))
    

    
    # Small decorative elements
    # Corner accents
    draw.rectangle([BANNER_W - 50, 10, BANNER_W - 10, 14], fill=(57, 255, 20, 150))
    draw.rectangle([BANNER_W - 14, 10, BANNER_W - 10, 50], fill=(57, 255, 20, 150))
    draw.rectangle([BANNER_W - 50, BANNER_H - 14, BANNER_W - 10, BANNER_H - 10], fill=(255, 215, 0, 150))
    draw.rectangle([BANNER_W - 14, BANNER_H - 50, BANNER_W - 10, BANNER_H - 10], fill=(255, 215, 0, 150))
    
    # Save banner
    output_path = os.path.join("build", "opensea_banner.png")
    banner = banner.convert("RGB")
    banner.save(output_path, "PNG", quality=100)
    print(f"Banner saved to: {output_path}")
    print(f"Dimensions: {BANNER_W} x {BANNER_H}")
    
    # Also create a collection logo (350x350) 
    create_collection_logo()
    
    return output_path

def create_collection_logo():
    """Create a 350x350 collection logo for OpenSea"""
    print("\nCreating Collection Logo (350x350)...")
    
    SIZE = 350
    logo = Image.new("RGBA", (SIZE, SIZE))
    draw = ImageDraw.Draw(logo)
    
    # Dark background with subtle radial gradient
    for y in range(SIZE):
        for x in range(SIZE):
            dist = ((x - SIZE//2)**2 + (y - SIZE//2)**2)**0.5 / (SIZE * 0.7)
            dist = min(1.0, dist)
            r = int(25 * (1 - dist) + 10 * dist)
            g = int(25 * (1 - dist) + 10 * dist)
            b = int(35 * (1 - dist) + 15 * dist)
            logo.putpixel((x, y), (r, g, b, 255))
    
    # Place a featured NFT in the center
    featured_path = os.path.join("build", "images", "1.png")
    if os.path.exists(featured_path):
        nft = Image.open(featured_path).convert("RGBA").resize((200, 200), Image.NEAREST)
        # Center it
        nx = (SIZE - 200) // 2
        ny = 30
        
        # Glow behind NFT
        glow = Image.new("RGBA", (220, 220), (255, 215, 0, 30))
        logo.paste(glow, (nx - 10, ny - 10), glow)
        
        # Border
        border = Image.new("RGBA", (204, 204), (255, 215, 0, 200))
        logo.paste(border, (nx - 2, ny - 2), border)
        logo.paste(nft, (nx, ny), nft)
    
    # "PLAYDOGS" text below using pixel blocks
    pixel_size = 5
    title_y = 250
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
    total_w = len(title) * 4 * pixel_size
    start_x = (SIZE - total_w) // 2
    
    for i, ch in enumerate(title):
        lx = start_x + i * 4 * pixel_size
        if ch in letters:
            for px, py in letters[ch]:
                gx = lx + px * pixel_size
                gy = title_y + py * pixel_size
                draw.rectangle([gx, gy, gx+pixel_size-1, gy+pixel_size-1], fill=(255, 248, 230, 255))
    
    # Gold accent line
    accent_y = title_y + 5 * pixel_size + 8
    accent_w = total_w - 20
    draw.rectangle([(SIZE - accent_w)//2, accent_y, (SIZE + accent_w)//2, accent_y + 2], fill=(255, 215, 0, 255))
    
    # "NFT COLLECTION" below
    tag = "NFT COLLECTION"
    tag_size = 3
    tag_w = len(tag) * (tag_size + 2)
    tag_x = (SIZE - tag_w) // 2
    tag_y = accent_y + 10
    for i, ch in enumerate(tag):
        tx = tag_x + i * (tag_size + 2)
        if ch != ' ':
            draw.rectangle([tx, tag_y, tx + tag_size - 1, tag_y + tag_size + 1], fill=(150, 155, 180, 200))
    
    output_path = os.path.join("build", "opensea_logo.png")
    logo = logo.convert("RGB")
    logo.save(output_path, "PNG")
    print(f"Logo saved to: {output_path}")

if __name__ == "__main__":
    create_opensea_banner()
    print("\n✅ All OpenSea assets generated!")
