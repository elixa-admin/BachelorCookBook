# TUB — Handover Document
**Date:** 2026-07-06  
**Branch:** main (production)  
**Status:** Production-ready ✅

---

## What This Project Is

**The Ultimate Bachelor Cookbook** — a single-file progressive web app.  
Tagline: *"Dinner is on you."*

**Live file:** `public/tub/tub-app.html`  
No build step. No framework. Edit and refresh.

---

## Current State

### Recipe Collection
- **64 active recipes** visible in the library
- Sources: `recipes-data.js` (45 base) + `sa-additions.js`, `sa-additions-2.js`, `fullcook-conversions.js`
- All recipes have: timeline, ingredients, story, drinks pairing
- 58 recipes have Pantry Secrets (pantry-lore.js)

### Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Recipe library + filters | ✅ Working | COLLECTION / TYPE / SKILL / REGION |
| Occasion nav (01–07) | ✅ Working | 01–05 active; 06 = saved; 07 = empty |
| Search (full-text) | ✅ Working | Keyword highlight in results |
| COOK tab (timeline + ingredients) | ✅ Working | 4-phase: PREP/COOK/REST/SERVE |
| STORY tab | ✅ Working | Story + Pantry Secrets + Plating |
| LEARN tab | ✅ Working | Chef Upgrade / Health-Forward / Dietary / Masterclass / Substitutes / Nutrition |
| Serve With section | ✅ Fixed | Green styling, clean bullet list |
| Ingredient Swap (hover-reveal) | ✅ Working | Group-level button, modal selection |
| Start Timer (every step) | ✅ Working | All timeline steps have timer button |
| Shopping List | ✅ Fixed | Was hidden behind Plan overlay |
| Meal Planner | ✅ Working | 7-night calendar, surprise fill, pantry fill |
| What can I cook tonight? | ✅ Working | Pantry-match scoring |
| Mobile responsive | ✅ Working | Tested 375px / 768px / 1280px |
| Pantry Secrets | ✅ Fixed | Lookup was broken; now correct by recipe slug |

---

## Bugs Fixed This Session

### 1. Pantry Secrets never showing (critical)
**File:** `public/tub/tub-app.html` — `pantryLoreHTML()` function  
**Problem:** Function matched recipe slugs against ingredient names (impossible match), then called `.length` on a string (returning character index).  
**Fix:** Direct lookup by `r.slug` from `window.PANTRY_LORE`, render full string.

### 2. Shopping List hidden behind Meal Planner
**File:** `public/tub/tub-app.html` — `openShop()`  
**Problem:** Both `#shop` and `#plan` were `position:fixed; z-index:100; open` simultaneously. Plan was added to DOM after Shop, so it sat on top.  
**Fix:** `openShop()` now removes `plan.open` before adding `shop.open`.

### 3. Back to Library leaving overlays open
**File:** `public/tub/tub-app.html` — `goBrowse()`  
**Problem:** Only removed `#detail.open`. Shop and Plan could remain open underneath browse, causing stale state.  
**Fix:** `goBrowse()` now removes open class from shop, plan, and methods.

### 4. Serving section showing "—" dashes
**File:** `public/tub/tub-app.html` — `renderIgs()`  
**Problem:** `isServing` check ran after `static` item check; SERVING items (stored as `["static",...]`) hit the dash renderer first.  
**Fix:** `isServing` check runs first. Header renamed "Serve with", green styling matching SERVE timeline section.

### 5. Chilli spelling (site-wide)
**Files:** 12 files across `public/tub/`  
**Problem:** 36 instances of American spellings (chili, chile, chiles).  
**Fix:** Standardised to British/SA: chilli / chillies. Chilean (nationality) preserved.

---

## Architecture

```
public/tub/
├── tub-app.html          ← THE app. All CSS, HTML, JS in one file (~3,300 lines)
│
├── recipes/              ← Data files (loaded via <script src>)
│   ├── recipes-data.js       Base recipe objects (45 recipes, array)
│   ├── sa-additions.js       SA recipe additions (array)
│   ├── sa-additions-2.js     More SA additions (array)
│   ├── fullcook-conversions.js  Full cook recipe data
│   ├── stories.js            RECIPE_STORIES object {slug: {para1, para2, ...}}
│   ├── stories-extra.js      More stories
│   ├── stories-new-sa.js     SA-specific stories
│   ├── pantry-lore.js        PANTRY_LORE {slug: "Did you know? ..."}
│   ├── storage-reheating.js  RECIPE_STORAGE {slug: {fridge, freezer, reheat}}
│   ├── recipes-images.js     RECIPE_IMAGES {slug: url} (supplement to r.image)
│   ├── substitutes.js        Ingredient swap alternatives
│   ├── masterclass.js        Technique lessons
│   ├── roster-classes.js     Active/cut recipe list
│   └── [30+ more data files]
│
└── data/                 ← SA-specific metadata
    ├── sa-ingredient-retailers.js
    ├── sa-ingredient-seasonality.js
    ├── sa-ingredient-cost-variants.js
    ├── sa-ingredient-pack-sizes.js
    └── sa-ingredient-substitutes.js
```

### Key Global Variables
| Variable | Type | Description |
|----------|------|-------------|
| `window.RECIPES` | Array | Base recipe objects (45) |
| `window.SA_ADDITIONS` | Array | SA recipe additions |
| `window.SA_ADDITIONS_2` | Array | More SA additions |
| `window.FULLCOOK_BATCH` | Array | Full cook data |
| `window.RECIPE_STORIES` | Object | Stories keyed by slug |
| `window.RECIPE_STORAGE` | Object | Storage data keyed by slug |
| `window.PANTRY_LORE` | Object | "Did you know?" facts keyed by slug |
| `window.RECIPE_IMAGES` | Object | Image URLs keyed by slug |
| `window.MASTERCLASS` | Array | Technique lessons |

### Navigation Functions
```javascript
goBrowse()          // Return to library (closes all overlays)
openRecipe(slug)    // Open recipe detail
openShop()          // Open shopping list
openPlan()          // Open meal planner
openMethods()       // Open culinary methods hub
switchRecipeTab(t)  // Switch to 'cook', 'story', or 'learn'
```

### Recipe Object Shape
```javascript
{
  slug: 'beef-teriyaki',
  t: 'Beef Teriyaki',           // title
  blurb: '...',                 // one-liner
  tier: 'global',               // heritage | adopted | aspirational | component
  cui: 'Japanese',              // cuisine
  occ: ['solo', 'date'],        // occasions
  time: '30 min',
  method: 'Grill',
  diff: 'easy',
  image: 'https://...',         // hero image URL
  ing: [...],                   // ingredient groups
  tl: [...],                    // timeline steps
  pair: {...},                  // drinks pairing
  storage: {...},               // storage guidance (or in RECIPE_STORAGE)
  chef_upgrade: '...',
  health_forward: '...',
  diets: {...},
  mistakes: [...]
}
```

---

## Design Tokens (CSS Variables)
```css
--ink:     #0a0a0a         /* background */
--gold:    rgba(212,175,55)  /* primary accent */
--wine:    rgba(110,30,36)   /* heritage red */
--fresh:   #A8D651          /* serve/component green */
--teal:    rgba(85,183,221)  /* storage blue */
--text:    #e8e8e8
--muted:   #9a9a9a
--display: 'Oswald', sans-serif
--font:    'Inter Tight', sans-serif
--mono:    'JetBrains Mono', monospace
```

---

## Voice & Tone Rules (Non-Negotiable)
- **Warm Premium.** Sensory, unhurried, assured. Never instructional.
- Cooking is leverage and generosity — **never consolation**
- No sad-solo, "you deserve", or pity framing — ever
- British/SA English throughout: chilli, colour, flavour, aubergine
- Sentence case for body; Oswald caps for display headings

---

## Known Gaps / Next Phase Work

### Content
- Occasion 07 (Accompaniments) has no active recipes — needs content
- Pantry Secrets: ~58/64 recipes have facts; new additions need entries in `pantry-lore.js`
- Storage guidance: some SA additions rely on category defaults; explicit entries preferred

### Features
- Occasion 06 (My Cookbook) — favourites/recent list works but empty until user interacts
- "From My Pantry" filter (Occasion 04) — functional but pantry must be populated first
- Recipe ratings/reviews — not yet built
- Image optimisation — all external URLs (Pexels/Unsplash); no CDN yet

### Technical
- Service worker (`sw.js`) present but local dev auto-unregisters — verify production caching
- No test suite — changes verified manually via preview
- Script load order matters (roster-classes.js must load after all batch files)
