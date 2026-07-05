# BachelorCookBook Handover Document
> **Session End Date:** 2026-07-05  
> **Model:** Claude Haiku 4.5  
> **Status:** Development in progress → Phase 2 Planning  
> **Next Handover To:** AntiGravity / ZAI GLM5.2 or equivalent

---

## Executive Summary

**The Ultimate Bachelor Cookbook (TUB)** is a vanilla HTML/CSS/JS single-page app serving **147 curated recipes** for elegant home cooking. This session achieved:

- ✅ Added 8 fully-developed SA recipes (Snoek Pâté, Crayfish Bisque, Cape Malay Lamb, Fish Cakes, Milk Tart Cheesecake, Kingklip en Papillote, Sardines, Prime Rib)
- ✅ Created comprehensive recipe development standards (10 standards documented)
- ✅ Built pantry tiers system (5-core strategy unlocking 82% of cookbook)
- ✅ Established ingredient-based recipe discovery framework
- ✅ Fixed NEW_BATCH_SA integration bug (R now loads all 147 recipes)
- ✅ Created deployment-ready artifact at `https://bachelorcookbook.vercel.app`

**Total Recipe Count:** 139 → 147 recipes  
**App Status:** Fully functional, deployed, requires UI work for new features  
**Next Priority:** Build Batch 2 (9 British/European recipes) + integrate pantry tiers UI

---

## Project Goals & Vision

### Primary Goal
Build the **most elegant, accessible cookbook for the eligible male** — focused on **cooking to impress** with recipes that are:
- Achievable (clear instructions, manageable techniques)
- Impressive (restaurant-quality results, showstopper presentations)
- Occasion-specific (Solo, Date, Host categories)
- Culturally-rooted (SA-first, with authentic stories)

### Voice & Design
- **Voice:** Warm Premium — sensory, unhurried, assured (never patronizing, never sad-solo framing)
- **Design:** Dark & Moody — wine-red/gold theme, editorial typography (Oswald display, Inter Tight body)
- **Platform:** No build step, vanilla HTML/CSS/JS (future-proof, maintenance-light)

### Target Audience
South African men aged 25-45, primarily in urban centers, cooking at home for personal, romantic, and social occasions.

---

## Current State: What We've Built

### Session Accomplishments

#### 1. Recipe Data Layer
**File:** `public/tub/recipes/batch-new-sa.js` (416 lines)
- 8 fully-developed SA recipes with complete cook data:
  - Snoek Pâté (heritage, special)
  - Crayfish Bisque (signature, special)
  - Cape Malay Braised Lamb (heritage, main)
  - Fish Cakes with Tartare Sauce (heritage, main)
  - Milk Tart Cheesecake (heritage, sweet)
  - Kingklip en Papillote (signature, main)
  - Sardines Grilled with Garlic & Lemon (heritage, main)
  - Prime Rib Roast (signature, main)

Each recipe includes:
- Full metadata (slug, tier, cuisine, occasions, time, method, difficulty)
- Brief section (lead narrative, expectations, stats, equipment)
- Provenance section (fallback for story rendering)
- Complete ingredients list with dual measurements (metric + practical)
- Timeline and step-by-step cook instructions
- Wine/beer/cocktail/non-alcoholic pairings (SA-specific)

#### 2. Story & Narrative Layer
**File:** `public/tub/recipes/stories-new-sa.js` (800+ lines)
- 4-paragraph origin stories for all 8 new recipes
- Covers: origin, name meaning, technique insight, cultural context
- Includes dinner_fact (conversation starter for the table)
- Extends (doesn't overwrite) existing RECIPE_STORIES object

#### 3. Recipe Classification
**File:** `public/tub/recipes/roster-classes.js` (updated)
- Added 8 new slug entries with tier/category/cut status:
  ```javascript
  "snoek-pate": { "cat": "special", "tier": "heritage" },
  "crayfish-bisque": { "cat": "special", "tier": "signature" },
  // ... 6 more
  ```

#### 4. Standards & Documentation
**File:** `knowledge/RECIPE_DEVELOPMENT_STANDARD.md` (400+ lines)
- 10 comprehensive standards governing all recipe development:
  1. SA Naming Convention (SA name always wins unless foreign appeal is the point)
  2. Research Standard (3-4 sources, 7/8 consensus, named hierarchies)
  3. Ingredient Availability (Pick n Pay Tuesday test, SA substitutions mapped)
  4. Measurement Standard (SA 250ml cup, metric primary for baking, dual specs)
  5. Cooking Method (primary + secondary only where consensus exists)
  6. Plate Pairing (7/8 source consensus, complete meal presentations)
  7. Drinks Pairing (wine cultivar + estate, beer type, cocktail, non-alcoholic + education)
  8. Story Standard (4 paragraphs + dinner_fact, warm voice)
  9. Substitution Standard (essential/viable/acceptable tiers, dish-specific not generic)
  10. Recipe Data Structure (exact object schema, field definitions)

**File:** `knowledge/PANTRY_STRATEGY.md` (275 lines)
- Research findings: 5 core ingredients unlock 82.4% of cookbook
- 3-tier pantry system (Essentials → Core → Specialty)
- 30 ingredients with full metadata (coverage %, storage, uses, notes)
- UI implementation guidance and user journey scenarios
- Shopping list generator concept

#### 5. Pantry Tiers System
**File:** `public/tub/recipes/pantry-tiers.js` (416 lines)
- Complete ingredient database: `window.PANTRY_TIERS` object
- 30 ingredients across 3 strategic tiers:
  - **Essentials (5):** Spices, Garlic, Oil, Salt, Onion → 82.4% coverage
  - **Core (9):** Butter, Lemon, Pepper, Beef, Tomato, Ginger, Chicken, Eggs, Cream → 94% coverage
  - **Specialty (16):** Fish, Lamb, Seafood, Wine, Stock, Curry Paste, Rice, Pasta, Herbs, etc. → 100% coverage
- Each ingredient includes: slug, name, category, coverage %, description, storage, uses, essentials list
- Helper function: `calculatePantryCoverage(ingredients)` for real-time unlock calculation

#### 6. App Integration
**File:** `public/tub/tub-app.html` (updated)
- Added 2 script tags for new batch files: `batch-new-sa.js`, `stories-new-sa.js`, `pantry-tiers.js`
- Fixed recipe grid building: `NEW_BATCH_SA` now included in `_all` array construction (line 1025)
- FULL merge for NEW_BATCH_SA: validates `prov`, `ing`, `steps` fields (line 1020)
- Result: **R now loads all 147 recipes** (was 139)

---

## Architecture & Project Structure

### Repository Root: `/Users/brandondienar/Projects/BachelorCookBook`

```
BachelorCookBook/
├── public/tub/
│   ├── tub-app.html                 ← MAIN APP FILE (self-contained, no build)
│   └── recipes/
│       ├── *.js                     ← Recipe batch files (loaded via <script>)
│       ├── batch-new-sa.js          ← NEW: 8 SA recipes (Snoek Pâté, Crayfish Bisque, etc.)
│       ├── stories-new-sa.js        ← NEW: Story content for 8 recipes
│       ├── pantry-tiers.js          ← NEW: Ingredient database (30 items, 3 tiers)
│       ├── sa-heritage-batch.js     ← 13 heritage recipes (Braai Chops, Potjiekos, etc.)
│       ├── sa-additional-batch.js   ← 13 additional SA recipes
│       ├── recipes-data.js          ← 32 core recipes (Bourguignon, Carbonara, etc.)
│       ├── recipes-batch5.js        ← Foundation recipes
│       ├── foundation-batch.js      ← more foundations
│       ├── global-exotic-batch.js   ← 9 global recipes (Thai, Indian, etc.)
│       ├── premium-batch.js         ← 7 premium recipes
│       ├── compendium-batch.js      ← Compendium batch
│       ├── roster-classes.js        ← Recipe tiers/categories (tier, cat, cut flags)
│       ├── stories.js               ← Story content for existing recipes
│       ├── fullcook-batch.js        ← Full-cook formatted recipes
│       └── ... (16 more supporting files: themes, methods, skills, curriculum, etc.)
│
├── knowledge/
│   ├── RECIPE_DEVELOPMENT_STANDARD.md    ← NEW: 10 standards + master recipe list
│   ├── PANTRY_STRATEGY.md                ← NEW: Ingredient research + tier system
│   ├── ROADMAP.md                        ← Project state, what's live vs dormant
│   ├── PROJECT_BRIEF.md                  ← Positioning, voice, target audience
│   └── ... (index.md, other guides)
│
├── src/                                  ← DORMANT: Next.js/React build (not current)
├── CLAUDE.md                             ← Project instructions (this file's parent)
├── HANDOVER_SESSION_20260705.md          ← NEW: This document

Git: https://github.com/elixa-admin/BachelorCookBook (main branch, all commits pushed)
Vercel: https://bachelorcookbook.vercel.app/tub/tub-app.html (live deployment)
```

### Data Flow Architecture

```
Recipe Sources (9 batch files)
    ↓
window.COMPENDIUM, BATCH5, FOUNDATION_BATCH, SA_BATCH, SA_HERITAGE_BATCH,
SA_ADDITIONAL_BATCH, NEW_BATCH_SA, PREMIUM_BATCH, GLOBAL_EXOTIC_BATCH
    ↓
FULL object (validated recipes with prov, ing, steps) [line 1015-1021]
    ↓
_all array (combines FULL values + lightweight batches) [line 1024-1026]
    ↓
R array (filtered by cut status, sorted by tier) [line 1028-1029]
    ↓
Recipe enrichment: tier names, colors, region, live status [line 1029]
    ↓
UI: Browse grid, detail pages, shopping list, search
```

### Key Script Blocks in tub-app.html

| Line | Purpose |
|------|---------|
| 868-901 | Script tag declarations (all 12 batch + helper files) |
| 915-1007 | FULL object: initial recipe definitions |
| 1011-1021 | FULL merge: validate & add recipes from batches |
| 1023-1030 | R array building: filter, sort, enrich |
| 1033-1034 | State variables: activeOcc, filters, query |
| 1048-1080 | Filter & grid logic: filter/category/region/skill/search |
| 1082-1100 | renderGrid & cardHTML: render recipe cards |
| 1300-1316 | storyHTML: render story content (RECIPE_STORIES fallback to prov) |
| 1677 | Initialization: loadState, renderGrid, observeReveal |

---

## Design Specification

### Visual Identity
- **Palette:** Dark background (#080b0b), wine-red accents (#9B2C33), gold highlights (#c9a24b)
- **Typography:** 
  - Display: Oswald (headers, titles)
  - Body: Inter Tight (recipe text, descriptions)
  - Monospace: Courier for code/measurements
- **Spacing:** Generous, breathing room, luxury feel
- **Components:** Cards (recipes), modal (detail), nav (bottom icon-only), search (top)

### Responsive Design
- Mobile-first (375px), tablet (768px), desktop (1280px)
- Bottom navigation (icon-only): Browse, Plan, Shopping, More
- Safe areas for notch devices
- Touch-friendly tap targets (44px minimum)

### Accessibility
- WCAG AA compliance
- Semantic HTML
- Color contrast ratios ≥4.5:1
- Keyboard navigation support
- Screen reader friendly

### Design Standards Locked
See `DESIGN.md` (legacy Next.js) and inline CSS vars in `tub-app.html` for current.

---

## Feature Set & Current Capabilities

### Browse by Occasion (5 tabs)
1. **Cooking for One** — Solo meals, fast, assured
2. **Cooking for Two** — Date-night showstoppers
3. **Entertaining** — Host gatherings, scaling recipes
4. **From My Pantry** — Ingredients-driven discovery (backend ready, UI pending)
5. **The Skill Path** — Curated learning arc (novice→chef)

Plus: My Cookbook (favorites), Accompaniments (sides/bases)

### Recipe Detail View
- Hero image + tier badge + save heart
- Metadata: cuisine, time, method, difficulty
- Story (4 paragraphs + dinner fact) or fallback to provenance
- Ingredients (dual measurements: metric + practical)
- Steps (numbered, clear instructions)
- Wine/beer/cocktail/non-alcoholic pairings
- Plate pairing (complete meal suggestion)
- Scaling (1/2/4/6 servings)

### Search & Filter
- Free-text search across title, cuisine, blurb, tier, occasion
- Tier filter: Heritage, Adopted, Aspirational, Component
- Category filter: Mains, Specials, Sweet, Accompaniments
- Region filter: Mediterranean, Asian, Middle Eastern, African, etc.
- Skill filter: Novice, Capable, Chef

### Shopping List
- Add/remove ingredients
- Check off as you shop
- Local storage persistence
- Export option (coming)

### Meal Planner (coming)
- Week view
- Drag-to-plan recipes
- Auto-generate shopping list
- Notification prompts

---

## Next Session: Batch 2 & Beyond

### Batch 2: British & European (9 recipes)
**Expected Timeline:** 2-3 hours  
**Files to Create:**
- `recipes/batch-british-european.js` (9 full recipes)
- `recipes/stories-british-european.js` (story content)
- Update `recipes/roster-classes.js` (9 entries)
- Update `public/tub/tub-app.html` (script tags + FULL merge)

**Recipes:**
1. Roast Beef with Yorkshire Pudding
2. Beef Steak & Ale Pie
3. Bangers & Mash
4. Sunday Roast
5. Sticky Toffee Pudding
6. Shepherd's Pie
7. Hungarian Goulash
8. Lancashire Hotpot
9. Crêpes Suzette

### Batch 3: Seafood (14 recipes)
**Timeline:** 3-4 hours  
**Recipes:** Mussels (4 ways: marinière, garlic, cream, red wine), Calamari (4 ways: fritto, risotto, aioli, grilled), Tuna (4 ways: tartare, steak with wasabi, miso glaze, herb crust), Whole Roasted Fish with Herbs

### Batch 4: Mains & Proteins (14 recipes)
**Timeline:** 3-4 hours  
**Recipes:** Tandoori Chicken, Chicken Schnitzel, Teriyaki Chicken, Crispy Wings, Beef Stew, Chicken Stew, Beef Chili, Chicken Chili, Beef Stroganoff, Minestrone, Korma Curry

### Batch 5: Salads, Sides & Vegetables (14 recipes)
**Timeline:** 2-3 hours  
**Recipes:** Salade Niçoise, Caesar Salad, Caprese, Greek Salad, Watercress, Shrimp & Avocado, Burrata, Gratin Dauphinois, Duchess Potatoes, Twice-Baked Potatoes, Roasted Root Veg, Roasted Cauliflower Steak, Roasted Asparagus, Roasted Shrimp

### Batch 6: Baked Goods, Breads & Desserts (17 recipes)
**Timeline:** 4-5 hours  
**Recipes:** Croissants, Pain au Chocolat, Pavlova, Cheesecake, Flourless Chocolate Cake, Crème Brûlée, Mango Sorbet, Tarte Tatin, Roasted Veg Tart, Spinach & Ricotta Ravioli, Mealiebread, Sourdough, Boerenbread, Naan, Garlic & Parmesan Bread, Sticky Toffee Pudding, Crêpes Suzette

### Batch 7: Roasted & Air Fryer (5 recipes)
**Timeline:** 1-2 hours  
**Recipes:** Roasted Whole Chicken, Air Fryer Spring Rolls, Roast Beef with Yorkshire, Sunday Roast

**Total Remaining:** ~56 recipes across 6 batches  
**Estimated Total Time:** 15-20 hours (3-4 focused sessions)  
**Target:** 200+ recipes, fully researched with SA ingredient localization + story content

---

## Development Standards & Autonomy

### Recipe Development Workflow
1. **Research Phase:** 3-4 sources per recipe, consensus-driven (7/8 agreement)
2. **SA Localization:** All ingredients mapped to SA alternatives (substitution table in RECIPE_DEVELOPMENT_STANDARD.md)
3. **Data Structure:** Exact schema enforced (prov, ing, steps, wine required)
4. **QA Checklist:**
   - ✅ All ingredients available at Pick n Pay / Woolworths
   - ✅ Measurements dual-spec (metric + practical)
   - ✅ Cooking method consensus-validated
   - ✅ Story covers origin, name, technique, cultural context
   - ✅ Wine/beer/cocktail/NA pairings with educational notes
   - ✅ Plate pairing complete (not just the hero dish)
5. **Integration:** Add to `roster-classes.js`, wire into app, commit

### Code Organization Principles
- **No build step:** Vanilla HTML/CSS/JS forever
- **Data-driven:** All recipes external (easily swappable)
- **Progressive enhancement:** Works without JS (basic nav), enhanced with it
- **Single responsibility:** Each batch file = one category/region
- **DRY stories:** RECIPE_STORIES object extends, never overwrites

### Git Workflow
- One commit per completed batch (8-14 recipes)
- Commit message: `feat: add [Batch Name] — [X] recipes with full cook data`
- Include: batch file, stories file, roster entries, HTML updates in single commit
- Always push to main (no PRs for recipe development, staging is for features)

### Testing Strategy
1. **Data validation:** R loads N recipes, all have slug/prov/ing/steps
2. **UI testing:** Click through browse tabs, open detail pages, verify story renders
3. **Search test:** Find a recipe by cuisine, ingredient, occasion
4. **Responsive test:** Mobile (375px), tablet (768px), desktop (1280px)
5. **Deployment test:** Visit vercel.app URL, verify recipe appears

---

## Deployment & CI/CD

### Vercel Integration
- **Project:** bachelorcookbook  
- **URL:** https://bachelorcookbook.vercel.app
- **Branch:** main (auto-deploys on push)
- **Status:** Live ✅

### Testing Environment
- **Local dev:** `npm run dev` → localhost:3000/tub/tub-app.html
- **Preview:** Claude Preview sidebar (has rendering limitation; test in production)
- **Production:** Vercel URL (ground truth)

### Smoke Test Checklist
```
□ Home page loads
□ Occasion button clicks navigate to grid
□ Recipe cards appear with images
□ Detail page opens with full story
□ Search bar finds recipes
□ Bottom nav works (Browse, Plan, Shopping, More)
□ Responsive on mobile/tablet/desktop
□ Wine pairing dropdown visible
□ Story renders (4 paragraphs + dinner fact)
```

---

## Knowledge Base References

All canonical information lives in `/knowledge/`:

| File | Purpose |
|------|---------|
| `RECIPE_DEVELOPMENT_STANDARD.md` | 10 standards + master recipe list + schema |
| `PANTRY_STRATEGY.md` | Ingredient research + tier system + UI specs |
| `ROADMAP.md` | Current state, what's live vs dormant |
| `PROJECT_BRIEF.md` | Positioning, voice, audience, goals |
| `DESIGN.md` | Color palette, typography, components (legacy Next.js) |

---

## Autonomy & Self-Direction

### The App Runs Itself
- **No backend:** Recipes are static data files
- **No database:** Everything in localStorage or memory
- **No CI:** Simple git push = instant deployment
- **Self-documenting:** Recipe schema speaks for itself

### What Needs Human Input
- ✅ Research (recipes take time to vet, stories to write)
- ✅ Ingredient localization (SA substitutions need domain knowledge)
- ✅ Story writing (narrative voice can't be fully automated)
- ✅ Design decisions (what tier for a new recipe?)
- ❌ Coding (batch files follow exact pattern — templates exist)
- ❌ Deployment (git push does it all)

### How to Hand Off
1. **Read this document** (you're doing it now)
2. **Read `RECIPE_DEVELOPMENT_STANDARD.md`** (exact schema + examples)
3. **Pick a batch** (Batch 2: British/European is next logical)
4. **Follow the pattern:** Copy-paste existing recipe structure, fill in data
5. **Test locally:** npm run dev, click through the UI
6. **Commit & push:** Automatic Vercel deployment

**No ceremony required.** The system is designed to be autonomously extensible by any capable AI or developer.

---

## Known Limitations & Quirks

### Preview Sandbox Issue
- The Claude Preview sidebar has a JavaScript context isolation issue
- Script-scoped `let` variables can't be accessed from eval
- **Workaround:** Test in real browser at Vercel URL
- **Why it exists:** It's a sandbox limitation, not a code bug

### Next.js Build (Dormant, Not Deleted)
- `/src/` contains the old Next.js + React build
- It works but isn't the live app
- TUB (`public/tub/tub-app.html`) is the current build
- The Next.js code is kept for reference/historical reasons

### Tier Naming
- `heritage` = Original SA dishes (3+ centuries, deeply rooted)
- `signature` = SA-created, modern interpretation
- `adopted` = International but well-integrated into SA cooking
- `premium` = Aspirational, requires technique (French, haute cuisine)

---

## Sign-Off

This project is **fully documented, deployment-ready, and architected for autonomous extension.**

**What you're taking over:**
- A working app with 147 recipes
- Clear standards for the next 56 recipes
- Self-contained codebase (no build step, no backend, no DevOps)
- A proven recipe data structure that scales
- Complete design system and voice guidelines

**What's next:**
- Batch 2 (9 recipes) — 2-3 hours
- Batch 3 onwards — follow the established pattern

**To pick up immediately:**
1. Clone the repo (it's on GitHub)
2. Read `knowledge/RECIPE_DEVELOPMENT_STANDARD.md`
3. Copy `recipes/batch-new-sa.js` as your template
4. Fill in 9 British/European recipes
5. Push to main

The system will take it from there.

---

**Last Updated:** 2026-07-05  
**By:** Claude Haiku 4.5  
**Next Handoff To:** [Your Platform/Model Here]
