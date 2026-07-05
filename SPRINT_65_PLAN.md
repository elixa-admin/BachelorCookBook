# SPRINT 65: Comprehensive Recipe Build-Out

**Goal:** Ensure all 72 recipes have complete feature set: verified recipe, ingredients, storage, alternatives, pairing, story, plating, images.

**Session completed:** Plating redesign + storage foundation  
**Status:** Foundation ready; systematic build-out in progress

---

## ✅ COMPLETED THIS SESSION

1. **Plating section redesign** (Option D → guided list)
   - Changed from card grid to clean left-border list format
   - File: `tub-app.html` lines 541-547 (CSS), 2173 (function)
   - Status: Live and verified

2. **Storage/Reheating data foundation**
   - Created `storage-reheating.js` with detailed storage for 10+ recipes
   - Data structure: `RECIPE_STORAGE[slug] = { fridge: "...", freezer: "...", reheat: "..." }`
   - Includes category defaults (meat, fish, curry, pasta, sides, sweet)
   - Status: Integrated, ready for expansion

---

## 🔄 NEXT PHASES (Estimated token cost per phase)

### PHASE 1: EXPAND STORAGE DATA (5-8k tokens)
**Target:** All 72 recipes

**Current coverage:** 10 recipes (steak, risotto, pasta, fish, curry, etc.)

**Action items:**
1. Extend `storage-reheating.js` with remaining 62 recipes
   - Use category defaults where recipe-specific not needed
   - Group by tier: Signature (8) → Aspirational (12) → SA Heritage (27) → Newer (13)
2. Test storage tab rendering for 3-4 recipes per tier

**Quick template for batch additions:**
```javascript
"recipe-slug": {
  fridge: "<b>Up to X days</b> in airtight container. [Details]",
  freezer: "[Duration] — [Notes]",
  reheat: "[Method], [Temperature/time]. <b>[Critical warning if needed]</b>"
}
```

---

### PHASE 2: DRINKS PAIRING RESTRUCTURE (8-12k tokens)
**Target:** Restructure to: Before dinner → With course → Alternative + NA option

**Current state:** Pairing data stored as `pair: [["kind", "name", "origin", "description"], ...]` arrays in recipe data

**Files involved:**
- `tub-app.html` line ~2080: `plateHTML()` function renders pairing section
- `cocktails.js`: Cocktail recipes (reference, not pairing structure)
- Recipe data files: Pairing arrays embedded in each recipe

**Required changes:**

1. **Update data structure** (in recipes-data.js and batch files):
   ```javascript
   // OLD: pair: [["With steak", "Malbec", "...", "..."], ["Beforehand", "Negroni", "...", "..."]]
   
   // NEW: pair structure (one of two approaches):
   // Option A: Keep arrays, add tier field
   pair: {
     before_dinner: ["Negroni", "Equal parts gin · Campari · sweet vermouth", "Bitter and bright..."],
     with_course: ["Malbec", "Mendoza, Argentina · full-bodied red", "Dark fruit, a lick..."],
     alternative: ["Kanonkop Pinotage", "Stellenbosch · full-bodied red", "Dark berry..."],
     non_alcoholic: ["Virgin Mojito or Seedlip Spice", "...", "..."]
   }
   
   // Option B: Array of objects with tier
   pair: [
     { tier: "before_dinner", name: "Negroni", ... },
     { tier: "with_course", name: "Malbec", ... },
     ...
   ]
   ```

2. **Update rendering** (plateHTML function):
   - Change from grid layout to sequential tiers
   - Add "Before dinner", "With the course", "Alternative", "Non-alcoholic" labels
   - Update CSS if needed (`.pair` grid → flex column or modified grid)

3. **Populate NA options for all recipes**
   - Most recipes missing non-alcoholic option
   - Create mapping: [Spirit-based cocktail] → [NA equivalent]
   - Examples:
     - Negroni → Virgin Negroni (Seedlip Spice 94) or NA bitter spritz
     - Malbec → Sparkling grape juice or premium NA wine
     - Champagne → Quality sparkling cider or NA sparkling

---

### PHASE 3: TIMED STEP-BY-STEP COOKS (12-20k tokens)
**Target:** Signature tier (8 recipes) — expand to Aspirational (12) in Phase 4

**Current state:** Only steak has full timed steps

**Files:**
- Recipe data files (recipes-data.js) — recipes have `.brief` (cooking guide) but need `.steps` (timed, parallel-cooked steps)
- `tub-app.html` line ~2140: `renderCook()` renders the step-by-step interface

**Required format:**
```javascript
steps: [
  ["Step name", "What happens / why", "00:00", ["ingredient1", "ingredient2"], { parallel: "pan-sear", timer: "4 min" }],
  ["Rest", "Protein relaxes and juices redistribute", "13:00", [], { hold: true }],
  ...
]
```

**Priority order for timed cooks:**
1. **Signature tier (do all 8):**
   - ✅ Steak (done)
   - Risotto Milanese
   - Pasta Carbonara
   - Pan-seared branzino
   - Cacio e pepe
   - Chicken piccata
   - [2 more TBD from recipes-data.js]

2. **High-value Aspirational (8 out of 12):**
   - Smash burgers
   - Roast chicken
   - Thai green curry
   - [5 more]

**Effort:** 60-90 min per recipe (research timing, test, format)

---

### PHASE 4: IMAGE AUDIT & THEME MATCHING (6-10k tokens)
**Target:** All 72 recipes

**Current:** recipes-images.js has 131 mapped images; 9 were fixed in Session 20260705

**Gaps identified:**
- ~40 recipes missing images entirely
- Some images don't match dish (legacy or incorrect)
- Need to verify image matches intended theme (wine-red/gold/dark editorial)

**Required:**
1. **Audit script:** Check which recipes lack image URLs
2. **Source missing images:** Wikipedia REST API (proven method in prior session)
3. **Verify existing images:** Check 10 recipes per tier visually
4. **Theme consistency:** Ensure all images align with dark moody aesthetic

**Files:**
- `recipes-images.js`: Mapping of slug → image URL

---

### PHASE 5: COMPLETE ALTERNATIVES/SUBSTITUTES (3-5k tokens)
**Target:** Ensure all recipes reference SUBS window (ingredient substitutes)

**Current state:** substitutes.js has 153 ingredient entries

**Check:**
- Which recipes lack substitutes entry
- Cross-reference `ing` array in recipes against SUBS window
- Ensure each recipe's ingredients map to available substitutes

---

### PHASE 6: POLISH & CONSISTENCY (5-8k tokens)
**Target:** Final pass across all recipes

**Checklist:**
- Voice consistency (warm premium tone)
- Formatting: all section headings, typography
- Cross-tier navigation (links between related recipes)
- Accessibility: alt text on images, semantic markup
- Content gaps flagged clearly ("Coming soon")

---

## DATA AUDIT (Current State)

**Recipe inventory:**
- Total: 72 recipes
- By file:
  - recipes-data.js: 32 (Signature + Aspirational)
  - fullcook-conversions.js: 27 (SA Heritage)
  - sa-additions-2.js: 13 (Newer SA batches)

**Completeness by field (32 recipes in recipes-data.js):**
| Field | Count | Status |
|-------|-------|--------|
| slug | 32 | ✅ Complete |
| tier | 32 | ✅ Complete |
| brief (cooking guide) | 32 | ✅ Complete |
| prov (story) | 32 | ✅ Complete |
| ing (ingredients) | 32 | ✅ Complete |
| storage | 10 | 🟡 Partial (storage-reheating.js) |
| plating | 32 | ✅ Complete (principles grid + recipe notes) |
| steps (timed cook) | 1 | ❌ Critical gap |
| pair (pairing) | ~20 | 🟡 Partial (needs restructure) |
| image | ~25 | 🟡 Partial (40+ missing) |

---

## EXECUTION ORDER (Recommended)

**Session 2:** Expand storage to all 72 (quick wins)  
**Session 3:** Timed cooks for Signature tier (high effort, high value)  
**Session 4:** Drinks pairing restructure + NA options  
**Session 5:** Image audit & fill gaps  
**Session 6:** Final polish & consistency pass

---

## KEY CODE LOCATIONS

**Recipe rendering entry point:**
- `renderCompendium(r)` (line ~2171)
- `plateHTML(r, pair, foodPairs)` (line ~2079) — renders storage, pairing, sides

**Data loading:**
- Scripts loaded: cocktails.js, storage-reheating.js, substitutes.js, images.js
- Window objects: `window.RECIPES`, `window.RECIPE_STORAGE`, `window.SUBS`, `window.COCKTAIL_RECIPES`

**UI components:**
- Storage tabs: `.storage-tabs`, `.storage-pane` (tabs for fridge/freezer/reheat)
- Plating list: `.plating-principles`, `.plating-principle` (left-border list items)
- Pairing grid: `.pair`, `.pcard` (2-column grid with cards)

---

## NOTES FOR FUTURE SESSIONS

- **Token efficiency:** Use subagents for parallel work (e.g., one agent expands storage while another audits images)
- **Testing:** Reload preview after data changes; test 2-3 recipes per tier before bulk work
- **Commit frequency:** Small, focused commits per phase for easier rollbacks
- **Memory:** Update `/memory/MEMORY.md` with sprint progress; link to this document

---

**Last updated:** 2026-07-05  
**Commits:** e740a27 (plating), 24a2859 (storage)  
**Next session starts:** PHASE 1 (Expand storage to all 72)
