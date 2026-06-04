# 🚀 PLAYDOGS — Deployment Guide (FREE Hosting + .xyz Domain)

## Step-by-Step: Get Your Website Live on the Internet

---

## STEP 1: Create a GitHub Account (FREE)

1. Go to **https://github.com/signup**
2. Sign up with your PlayDogs email
3. Username suggestion: `playdogsnft`
4. It's 100% free — no credit card needed

---

## STEP 2: Install Git on Your Computer

1. Go to **https://git-scm.com/download/win**
2. Download and install Git for Windows
3. During install, just click "Next" on everything (defaults are fine)
4. After install, open **PowerShell** and type:
   ```
   git --version
   ```
   If it shows a version number, you're good!

---

## STEP 3: Create a Repository on GitHub

1. Go to **https://github.com/new**
2. Repository name: `playdogsnft.github.io` (THIS EXACT NAME is important!)
3. Set it to **Public**
4. DON'T check "Add a README file"
5. Click **Create repository**

---

## STEP 4: Prepare Your Website Files

Your website files need to be organized. Here's what to upload:

```
playdogsnft.github.io/
├── index.html          ← Rename website.html to this!
├── studio.html         ← Rename current index.html to this
├── generator.js
├── app.js
├── styles.css
├── web3-mint.js
└── build/
    ├── images/         ← Your 10,000 NFT images
    │   ├── 1.png
    │   ├── 2.png
    │   └── ...
    └── _metadata.json
```

### Important Renames:
- `website.html` → `index.html` (GitHub Pages looks for index.html as homepage)
- `index.html` (old generator) → `studio.html`
- Update links inside both files to match new names

### Run these commands in PowerShell:

```powershell
cd e:\dogs

# Rename files
Rename-Item "website.html" "index.html"
Rename-Item "index.html" "studio.html"   # If website.html was already renamed

# Fix links inside the files
(Get-Content "index.html") -replace 'index.html', 'studio.html' | Set-Content "index.html"
(Get-Content "studio.html") -replace 'website.html', 'index.html' | Set-Content "studio.html"
```

---

## STEP 5: Push to GitHub

Run these commands in PowerShell (one by one):

```powershell
cd e:\dogs

# Initialize git
git init

# Add your files (this may take a while with 10,000 images)
git add index.html studio.html generator.js app.js styles.css web3-mint.js
git add build/_metadata.json

# For images, add a subset first (GitHub has a 1GB limit for free)
# Add first 500 images to start
git add build/images/

# Commit
git commit -m "Initial PlayDogs website launch"

# Connect to your GitHub repository
git remote add origin https://github.com/playdogsnft/playdogsnft.github.io.git

# Push
git branch -M main
git push -u origin main
```

### ⚠️ Important Note About Images:
GitHub Pages has a **1GB limit** for free repositories. 10,000 PNG images might exceed this.

**Solution:** Use **GitHub Large File Storage (LFS)** or host images on IPFS:
- For launch, upload just the first 100-500 images
- Later, host all 10,000 on IPFS (Pinata.cloud has a free tier)
- Update image URLs to point to IPFS

---

## STEP 6: Your Site is LIVE! 🎉

After pushing, wait 1-2 minutes, then visit:

**https://playdogsnft.github.io**

Your website is now live on the internet for FREE!

---

## STEP 7: Buy Your .xyz Domain ($1/year)

1. Go to **https://porkbun.com** (cheapest & most trusted)
   - Alternative: **https://namecheap.com**
2. Search for `playdogs.xyz`
3. Add to cart — should be **~$1/year**
4. Create account and pay ($1)
5. You now own `playdogs.xyz`!

---

## STEP 8: Connect .xyz Domain to GitHub Pages

### On GitHub:
1. Go to your repository: `github.com/playdogsnft/playdogsnft.github.io`
2. Click **Settings** → **Pages**
3. Under "Custom domain", type: `playdogs.xyz`
4. Click **Save**
5. Check ✅ "Enforce HTTPS"

### On Porkbun (or your domain registrar):
1. Go to **Domain Management** → **DNS Records**
2. Delete any existing A records
3. Add these **4 A records**:

| Type | Host | Answer |
|------|------|--------|
| A | (leave blank) | 185.199.108.153 |
| A | (leave blank) | 185.199.109.153 |
| A | (leave blank) | 185.199.110.153 |
| A | (leave blank) | 185.199.111.153 |

4. Add this **CNAME record**:

| Type | Host | Answer |
|------|------|--------|
| CNAME | www | playdogsnft.github.io |

5. Wait 10-30 minutes for DNS to propagate

---

## STEP 9: DONE! 🐶🔥

Your website is now live at:
- **https://playdogs.xyz** ← Your custom domain!
- **https://www.playdogs.xyz** ← Also works!
- **https://playdogsnft.github.io** ← Still works as backup!

All for just **$1/year** total cost.

---

## 📝 Quick Summary

| What | Cost | Where |
|------|------|-------|
| Website hosting | **$0** (GitHub Pages) | github.com |
| HTTPS/SSL certificate | **$0** (automatic) | github.com |
| Domain: `playdogs.xyz` | **$1/year** | porkbun.com |
| **TOTAL** | **$1/year** | |

---

## 🔧 Future: Hosting All 10,000 Images

When you're ready to host all images:

1. Go to **https://pinata.cloud** (free tier: 500MB)
2. Upload your `build/images/` folder
3. You get an IPFS hash like: `ipfs://QmXxx...`
4. Use a gateway URL: `https://gateway.pinata.cloud/ipfs/QmXxx.../1.png`
5. Update your website to load images from IPFS instead of local `build/images/`

This gives you decentralized, permanent image hosting — exactly what NFT buyers expect!

---

*Created for the PLAYDOGS team. Total launch cost: $1. LFG! 🚀🐶*
