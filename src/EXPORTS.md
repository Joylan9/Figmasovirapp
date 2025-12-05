# Asset Export Guide

## Overview
This document provides guidelines for exporting assets from the React implementation for use in FlutterFlow or other platforms.

---

## Export Folder Structure

```
/exports/
├── icons/
│   ├── mail.svg
│   ├── google.svg
│   ├── apple.svg
│   ├── camera.svg
│   ├── upload.svg
│   ├── eye.svg
│   ├── eye-off.svg
│   ├── check.svg
│   ├── check-circle.svg
│   ├── alert-circle.svg
│   ├── moon.svg
│   └── sun.svg
├── images/
│   ├── profile-placeholder@1x.png
│   ├── profile-placeholder@2x.png
│   └── profile-placeholder@3x.png
├── animations/
│   ├── confetti.json (Lottie)
│   ├── confetti-fallback.gif
│   └── success-ripple.json (Lottie)
└── screenshots/
    ├── light-mode/
    │   ├── screen-1-start.png
    │   ├── screen-2-create.png
    │   ├── screen-3-profile.png
    │   └── screen-4-success.png
    └── dark-mode/
        ├── screen-1-start.png
        ├── screen-2-create.png
        ├── screen-3-profile.png
        └── screen-4-success.png
```

---

## Icon Exports

### Format: SVG
**Source:** lucide-react package (inline SVGs in components)

All icons used in the application:
- `mail` - Email icon (Register with Email button)
- `google` - Google logo (Continue with Google)
- `apple` - Apple logo (Continue with Apple)
- `camera` - Camera icon (Profile picture upload)
- `upload` - Upload icon (Profile picture hover)
- `eye` - Show password icon
- `eye-off` - Hide password icon
- `check` - Checkmark (Checkboxes, chips)
- `check-circle` - Success icon (Registration successful)
- `alert-circle` - Error icon (Validation messages)
- `moon` - Dark mode icon
- `sun` - Light mode icon

### Export Guidelines
```bash
# From lucide-react, icons are already optimized SVGs
# No additional compression needed
# ViewBox: 0 0 24 24
# Stroke width: 2
# Color: currentColor (inherits from parent)
```

### Naming Convention
```
icon_<name>.svg
Example: icon_mail.svg, icon_google.svg
```

### Optimization
- Already optimized by lucide-react
- File size: < 2KB per icon
- Use SVGO if further compression needed: `svgo icon.svg`

---

## Image Exports

### Raster Images
**Format:** PNG (transparency support)

**Density variants:**
- @1x: Base size (72 DPI)
- @2x: Retina (144 DPI)
- @3x: High-density Android (216 DPI)

### Profile Picture Placeholder
```
Size: 128×128px circular

@1x: 128×128px
@2x: 256×256px
@3x: 384×384px

File sizes (target):
@1x: < 10KB
@2x: < 25KB
@3x: < 50KB
```

### Compression
Use tools:
- **TinyPNG:** https://tinypng.com (web)
- **ImageOptim:** (macOS app)
- **pngquant:** (CLI tool)

```bash
# Example CLI compression
pngquant --quality=80-95 profile-placeholder@3x.png
```

---

## Animations

### Confetti Animation (Lottie)
**Format:** Lottie JSON  
**Max size:** 500KB  
**Duration:** 600ms  
**Loop:** false

**Specifications:**
- 20 particles
- Colors: primary_500, success_500, warning_500, #FF6B9D, #C084FC
- Movement: vertical + rotation
- Easing: cubic-bezier(0.22, 0.9, 0.33, 1)

**Fallback:** GIF animation (< 1MB) or CSS particles (current implementation)

### Success Ripple (Lottie)
**Format:** Lottie JSON  
**Max size:** 200KB  
**Duration:** 1200ms  
**Loop:** true (3 cycles)

**Specifications:**
- 3 expanding rings
- Color: success_500 with fade
- Stagger: 400ms between rings

**Fallback:** CSS animation (current implementation)

### Optimization
```bash
# Compress Lottie files
npm install -g lottie-resizer
lottie-resizer --input confetti.json --output confetti-optimized.json --quality 80
```

### GIF Fallback Creation
```bash
# Convert Lottie to GIF using gifski
# 1. Export frames from After Effects/Lottie
# 2. Use gifski for high-quality compression

gifski --fps 30 --quality 90 --output confetti.gif frame-*.png
```

---

## Screenshots

### Purpose
- Documentation
- App store listings
- Marketing materials
- Developer handoff

### Specifications
**Resolution:** 390×844px (iPhone 14 Pro viewport)  
**Format:** PNG  
**DPI:** 144 (2x)

### Capture Guidelines
1. **Light Mode:**
   - Clean browser window (no dev tools)
   - Full screen height
   - No scrollbars visible
   - Theme toggle visible in top-right

2. **Dark Mode:**
   - Same composition as light mode
   - Show theme contrast differences
   - Ensure all elements visible

### Tools
- **Browser:** Chrome/Safari (native device simulation)
- **Capture:** Built-in screenshot tools or:
  - macOS: Cmd+Shift+4 (select area)
  - Windows: Snipping Tool
  - Chrome DevTools: Device toolbar → "Capture screenshot"

### Naming Convention
```
<mode>_screen<number>_<name>.png

Examples:
light_screen1_start.png
light_screen2_create.png
dark_screen1_start.png
dark_screen2_create.png
```

---

## Component Assets

### Gradient Backgrounds
Some components use gradients that cannot be exported as images. Document these as CSS/code:

**Primary Button Gradient:**
```css
background: linear-gradient(90deg, #0A66FF 0%, #1376FF 100%);
```

**Success Icon Gradient (Dark Mode):**
```css
background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
```

---

## Export Process

### Step 1: Prepare Environment
```bash
# Install export tools
npm install -g svgo pngquant lottie-resizer

# Create exports directory
mkdir -p exports/{icons,images,animations,screenshots/{light-mode,dark-mode}}
```

### Step 2: Export Icons
Icons from lucide-react are already SVG. If needed to export to files:
```bash
# Icons are inline in components
# Copy SVG paths from lucide-react documentation
# Save as individual .svg files
```

### Step 3: Export Screenshots
```bash
# 1. Run the application
npm start

# 2. Open in browser at 390×844px viewport
# 3. Navigate through all 4 screens
# 4. Take screenshots (light mode)
# 5. Toggle dark mode
# 6. Take screenshots (dark mode)
# 7. Save to exports/screenshots/
```

### Step 4: Optimize Assets
```bash
# Optimize SVGs
svgo exports/icons/*.svg

# Optimize PNGs
pngquant --ext .png --force exports/images/*.png

# Verify file sizes
du -sh exports/*/*
```

### Step 5: Create Manifest
Create `exports/MANIFEST.md`:
```markdown
# Asset Manifest

## Icons (12 files)
- Total size: ~24KB
- Format: SVG
- Optimized: Yes

## Images (3 files)
- Total size: ~85KB
- Format: PNG
- Densities: 1x, 2x, 3x

## Animations (2 files)
- Total size: ~700KB
- Format: Lottie JSON + GIF fallback

## Screenshots (8 files)
- Total size: ~4.2MB
- Resolution: 390×844px @ 2x
- Modes: Light + Dark
```

---

## FlutterFlow Import

### Icon Import
1. Navigate to: **Assets** → **Upload**
2. Upload all SVG files from `exports/icons/`
3. Use in widgets: `SvgPicture.asset('assets/icon_mail.svg')`

### Image Import
1. Navigate to: **Assets** → **Upload**
2. Upload all PNG variants (@1x, @2x, @3x)
3. FlutterFlow will auto-detect density variants
4. Use in widgets: `Image.asset('assets/profile-placeholder.png')`

### Lottie Import
1. Navigate to: **Assets** → **Upload**
2. Upload `.json` Lottie files
3. Add Lottie widget to screen
4. Select uploaded Lottie asset
5. Configure: `loop: false`, `autoplay: true`

---

## Asset Delivery Checklist

Before handoff to developers:

- [ ] All icons exported as SVG (optimized)
- [ ] Profile placeholders exported in 3 densities
- [ ] Lottie animations < 500KB each
- [ ] GIF fallbacks created and tested
- [ ] Screenshots captured (light + dark)
- [ ] All assets organized in `/exports` folder
- [ ] MANIFEST.md created with file sizes
- [ ] Asset naming follows convention
- [ ] Compression applied and verified
- [ ] File sizes meet targets

---

## Performance Targets

| Asset Type | Target Size | Max Size | Format |
|------------|-------------|----------|--------|
| SVG Icon | < 2KB | 5KB | SVG |
| PNG @1x | < 10KB | 20KB | PNG |
| PNG @2x | < 25KB | 50KB | PNG |
| PNG @3x | < 50KB | 100KB | PNG |
| Lottie | < 300KB | 500KB | JSON |
| GIF Fallback | < 500KB | 1MB | GIF |
| Screenshot | < 500KB | 1MB | PNG |

---

## CDN Recommendations

For production, host assets on CDN:

**Recommended providers:**
- **Cloudflare Images:** Automatic optimization, responsive images
- **imgix:** Real-time image processing, WebP conversion
- **Cloudinary:** Full media management platform

**Configuration:**
```javascript
// Example: Cloudflare Images
const profilePictureUrl = `https://imagedelivery.net/${accountHash}/${imageId}/public`;

// With transformations
const thumbnail = `${profilePictureUrl}/w=128,h=128,fit=cover,format=auto`;
```

---

## Alternative Export Methods

### Design Tools
If recreating in Figma/Sketch:
1. Use token values from `/design-tokens.json`
2. Match exact colors, spacing, typography
3. Export assets using design tool's built-in export
4. Follow naming conventions above

### Automated Export
For CI/CD pipelines:
```bash
# Example: Export screenshots with Playwright
npm install -D @playwright/test

# Create test script to navigate and screenshot each screen
# Run: npx playwright test --project=chromium
```

---

## Support

For questions about asset exports:
1. Review this documentation
2. Check `/design-tokens.json` for exact values
3. Refer to `/component-mapping.csv` for widget equivalents
4. Contact design system team for asset requests

---

**Document Version:** 1.0  
**Last Updated:** December 5, 2025  
**Maintained by:** Design System Team
