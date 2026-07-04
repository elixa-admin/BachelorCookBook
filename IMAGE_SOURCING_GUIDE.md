# Image Sourcing Guide — 101 Remaining Recipes

## Current Status
- ✅ **15 pilot recipes** with Unsplash images (13% coverage)
- ⏳ **102 recipes** awaiting images (87% remaining)
- ✅ Image rendering system fully functional and tested

## Recipes With Images (Pilot Complete)
**Signature Tier (8):**
- Risotto Milanese, Saffron
- Thai Green Curry
- Carnitas Tacos
- Mussels, White Wine & Garlic
- Cacio e Pepe ✨
- Shakshuka, Crusty Bread
- Molten Chocolate Fondant
- Smash Burgers, Special Sauce

**Premium Tier (7):**
- Beef Rendang
- Bobotie
- Beef Bourguignon
- Peking Duck
- Slow-Roast Lamb Kleftiko
- Grilled Crayfish, Garlic Butter
- Osso Buco, Gremolata
- Paella Mixta

## How to Source Images

### Step 1: Choose Your Source
- **Unsplash** (free, high-quality) — `images.unsplash.com`
- **Pexels** (free) — `images.pexels.com`
- **Pixabay** (free) — `pixabay.com`
- **AI-Generated** — Midjourney, DALL-E (ensure dark/moody aesthetic)
- **Stock Photos** — Shutterstock, iStock (if budget allows)

### Step 2: Image Requirements
- **Format:** Direct CDN URL
- **Dimensions:** Minimum 400×300px (ideally 500×500px)
- **Style:** Dark & moody, warm tones preferred
- **Subject:** Clear focus on the finished dish
- **Query parameters:** `?w=500&q=80` for optimization

### Step 3: Collect URLs

Format for submission (JSON):
```json
{
  "recipe-slug": {
    "image": "https://images.unsplash.com/photo-XXXX?w=500&q=80",
    "imageAlt": "Brief 2-5 word description of dish"
  }
}
```

Example:
```json
{
  "butter-chicken": {
    "image": "https://images.unsplash.com/photo-1234567890?w=500&q=80",
    "imageAlt": "Creamy butter chicken curry with rice"
  }
}
```

## Recipes Needing Images (101)

### Global Tier (17 recipes)
Butter Chicken, Pad Thai, Tacos al Pastor, Tonkotsu Ramen, Spaghetti Bolognese, and 12 others

### Exotic Tier (17 recipes)
Khao Soi, Massaman Curry, Pho Bo, Moussaka, Jollof Rice, and 12 others

### Heritage Tier (35 recipes)
Bobotie, Bunny Chow, Umngqusho, Home Chicken Curry, Cape Malay Chicken, and 30 others

### Adopted Tier (25 recipes)
Butter Chicken, Biryani, Kibbeh, Palak Paneer, Mussakhan, and 20 others

### Component Tier (6 recipes)
Potbrood, Chakalaka, Focaccia, and 3 others

## Next Steps

1. **Select sourcing strategy** (which platform(s) to use)
2. **Batch source images** (e.g., 20 recipes at a time)
3. **Submit URLs** via JSON format
4. **Verify rendering** (I'll merge and test on production)
5. **Iterate** until all 117 recipes have photography

## Testing Verification

All functionality tested and working:
- ✅ Responsive design (mobile 375px, tablet 768px, desktop 1280px)
- ✅ Image lazy-loading
- ✅ Recipe detail navigation
- ✅ Occasion filtering (solo/date/host)
- ✅ Tier/collection filtering
- ✅ Search functionality
- ✅ All 117 recipes properly loaded
- ✅ Navigation between recipes working

---

**Ready for images:** Submit recipes in batches. No build step needed — changes deploy instantly to production.
