# Resumption Guide — Matching Engine Phases 2-4

**Last Updated:** 2026-07-05 | **Session:** Continued (Hybrid Path D)  
**Status:** Ready to resume Phase 2 (Recipe Mapping) → Phase 4 (Matching Code)

---

## ✅ COMPLETED IN PREVIOUS SESSIONS

### Phase 1: Story Enhancement (124/147 recipes)
**Files:**
- `/public/tub/recipes/stories-new-sa.js` — 8 SA recipes with editorial depth ✅
- `/public/tub/recipes/stories.js` — 56 legacy recipes with editorial depth ✅
- `/public/tub/recipes/stories-extra.js` — ~60 recipes with editorial depth ✅

**Status:** 124 recipes have 300-400 word editorial narratives covering history, culture, technique, philosophy.  
**Missing:** 23 recipes still need stories (lower priority — handle when convenient)

---

### Phase 1.5: Ingredient Taxonomy (100/100 ✅ — Actually 102)
**File:** `/public/tub/recipes/ingredient-taxonomy.js`

**Status:** COMPLETE with 102 canonical ingredients

**Breakdown by category:**
- Proteins (9): chicken, fish (5 types), crustacean, beef, lamb
- Dairy (5): cream, cheeses (cheddar, cream), sour cream, milk
- Produce (26): onion, garlic, lemon, chilli, spring onion, coriander, carrot, celery, potato (2 types), tomato (2 types), asparagus, green bean, rocket, mint, spinach, basil (2 types), purple basil, ginger, cucumber, orange, lime
- Pantry (42): salt, pepper (3 types), rice, flour, biscuits (2), cornflour, sugars (2), breadcrumbs (2), vinegars (3), stocks (3), sauces (5), honey, condiments, nuts (4), seeds (1), spices (9), apricots (2), tamarind, jam, miso, coconut (2), maple syrup
- Oils (5): olive (2), sunflower, canola, butter
- Spices (13): coriander, cumin, turmeric, cinnamon, cardamom (2), chilli flakes, cloves (2), ginger (ground), bay leaf, anise, sumac, nutmeg
- Beverages (2): brandy, white wine

**Validation:** All entries validated for syntax, match rules, and SA localization.

---

### Phase 2: Recipe-Ingredient Mapping (5/228 ✅ Started)
**File:** `/public/tub/recipes/recipe-ingredient-map.js`

**Completed (5 recipes):**
1. ✅ `snoek-pate` (12 ingredients mapped)
2. ✅ `crayfish-bisque` (12 ingredients mapped)
3. ✅ `cape-malay-lamb-braised` (19 ingredients mapped)
4. ✅ `denningvleis` (8 ingredients mapped)
5. ✅ `butter-chicken` (7 ingredients mapped)

**Pattern established and validated:**
```javascript
{
  groupName: "ingredient section",
  canonicalId: "category.item.variant.state",
  displayText: "original recipe wording",
  quantity: number or null,
  unit: "g", "ml", "count", "tbsp", etc.,
  optional: boolean
}
```

**Status:** Template proven. Ready for bulk completion.

---

## ⏳ NEXT PHASE: Recipe Mapping (223 remaining)

### File to Edit
**`/public/tub/recipes/recipe-ingredient-map.js`**

### How to Continue

**Step 1: Identify recipe sources**
```
Recipe data lives in:
- /public/tub/recipes/batch-new-sa.js (8 recipes, 5 mapped, 3 remaining)
- /public/tub/recipes/stories.js (56 legacy recipes, 1 mapped, 55 remaining)
- /public/tub/recipes/stories-extra.js (~60 recipes, 0 mapped)
- /public/tub/recipes/retrofit/batch-*.js (multiple batches, ~100 recipes)
```

**Step 2: Extract recipe structure**
Each recipe object contains:
```javascript
{
  slug: 'recipe-slug',
  t: 'Recipe Title',
  ing: [
    ['Group Name', [
      ['linear/static/countN', quantity, 'unit', 'description'],
      ...
    ]],
    ...
  ],
  // ... other fields
}
```

**Step 3: Map each ingredient**
For each ingredient tuple in `ing` array:
1. Extract: `['linear', 500, 'g', 'Deboned chicken thighs']`
2. Find matching `canonicalId` from `window.INGREDIENT_TAXONOMY` (e.g., `protein.chicken.thigh.boneless`)
3. Create mapping entry with all 6 fields (groupName, canonicalId, displayText, quantity, unit, optional)
4. For `static` ingredients (quantity='', unit=''), set `optional: true`

**Step 4: Bulk workflow**
For efficiency, group recipes by cuisine/origin:
- **Batch A (SA):** snoek-pate (✅), crayfish-bisque (✅), cape-malay-lamb-braised (✅), fish-cakes, milk-tart-cheesecake, kingklip-en-papillote, sardines-braai-lemon, prime-rib-roast
- **Batch B (Mediterranean):** denningvleis (✅), lamb-tagine, lasagne-bolognese, cacio-e-pepe, spanakopita
- **Batch C (Indian):** butter-chicken (✅), chicken-biryani, doro-wat
- **Batch D (European):** steak, roast-leg-lamb, creme-brulee, tiramisu, croissants, quiche-lorraine
- **Batch E (American/Other):** bunny-chow, eggs-benedict-hollandaise, flapjacks, peppermint-crisp-tart, etc.

**Step 5: Use template from existing entries**
Copy structure from `snoek-pate`, `crayfish-bisque`, or `butter-chicken` entries. Replace canonicalIds only.

---

## 📊 Token Budget Status

| Item | Used | Budget |
|---|---|---|
| Previous session (2026-07-05) | ~100k | 200k |
| This session | ~42k | 200k |
| **Total consumed** | **~142k** | **200k** |
| **Remaining** | **~58k** | N/A |
| **Stop threshold** | 160k | 80% of 200k |

**Current position:** 71% of sprint budget used. ~18k tokens until stop threshold (160k).

**Implication:** We can continue recipe mapping, but should commit work frequently and document stopping points clearly.

---

## 🎯 NEXT SESSION PRIORITIES

### If Starting Fresh (New Sprint)
**Token budget: Fresh 200k**

**Priority 1: Finish Recipe Mapping (223 remaining)** — 25-40k tokens
- Batch A: 5 SA recipes remaining (15-20 min)
- Batch B-E: Legacy + retrofit recipes (3-4 hours)
- Use bulk/parallel approach where possible

**Priority 2: Phase 3 (Product Database)** — 15-20k tokens
- Research SA retailer products for top 100 ingredients
- Populate `retailer-products.js` with verified seed data
- Mark all as `sourceType: "manual"`, `dataConfidence: "high"`

**Priority 3: Phase 4 (Matching Engine Code)** — 5-8k tokens
- Build `product-matcher.js` with deterministic scoring
- Create `ingredient-product-matches.js` pre-computed results
- Validate matching logic

### If Resuming in This Session (Token-Constrained)
**Remaining ~18k tokens before stop threshold**

**Recommended approach:**
1. Decide: Continue mapping aggressively, or preserve for Phase 4?
2. If mapping: Get as many recipes as possible, document stopping point clearly
3. Commit with WORK_IN_PROGRESS.md showing exact recipes mapped ✅ vs. ⏳

---

## 🔧 TECHNICAL DETAILS

### Ingredient Matching Rules

All 102 canonical ingredients have match rules:

```javascript
matchRules: {
  requiredTerms: ["chicken", "thigh"],      // Must appear in product name
  preferredTerms: ["deboned", "boneless"],  // Boost score +10 each
  excludeTerms: ["crumbed", "cooked"],      // Disqualify (score -100)
  minScore: 50                               // Minimum to be recommended
}
```

**When mapping recipes:** Validate that ingredient descriptions would match against products using these rules.

### SA Localization Checklist

For SA recipes, verify:
- ✅ Product names use SA terminology ("cake wheat flour" not "all-purpose")
- ✅ Regional dishes properly attributed (Cape Malay, Durban, etc.)
- ✅ Ingredient sources realistic for Pick n Pay / Woolworths
- ✅ Spice blends match Cape Malay heritage (not generic curry)

---

## 📁 Files to Know

**Core matching engine:**
- `ingredient-taxonomy.js` — 102 canonical ingredients ✅
- `recipe-ingredient-map.js` — Recipe → ingredient mappings (5/228 ✅)
- `retailer-products.js` — SA retailer products (TODO)
- `product-matcher.js` — Scoring engine (TODO)
- `ingredient-product-matches.js` — Pre-computed results (TODO)

**Supporting:**
- `stories-new-sa.js`, `stories.js`, `stories-extra.js` — Recipe stories ✅
- `batch-new-sa.js`, `batch-*.js` — Recipe data source

**Documentation:**
- `RECIPE_DEVELOPMENT_STANDARD.md` — Editorial guidelines
- `PHASE_1_CONTINUATION_GUIDE.md` — Taxonomy completion notes
- `SPRINT_DELIVERY_HYBRID_PATH_COMPLETE.md` — Previous summary
- This file — Resumption instructions

---

## ✅ Pre-Resumption Checklist

Before starting the next session:

- [ ] Verify `ingredient-taxonomy.js` loads (102 ingredients)
- [ ] Verify `recipe-ingredient-map.js` loads (5 recipes mapped)
- [ ] Confirm `window.INGREDIENT_TAXONOMY` and `window.RECIPE_INGREDIENT_MAP` both defined
- [ ] Decide: Continue mapping (aggressive) vs. preserve tokens for Phase 3-4
- [ ] Plan bulk workflow if doing mapping (SA batch, European batch, etc.)

---

## 🚀 Quick Start Command

To verify current state:

```bash
node -e "
global.window = {};
require('./public/tub/recipes/ingredient-taxonomy.js');
require('./public/tub/recipes/recipe-ingredient-map.js');
console.log('Taxonomy:', Object.keys(window.INGREDIENT_TAXONOMY).length, 'ingredients');
console.log('Mapped recipes:', Object.keys(window.RECIPE_INGREDIENT_MAP).length, '/ 228');
"
```

---

## 📝 Notes for Next Session

- **Stories are done** — Don't re-do them unless specifically requested
- **Taxonomy is complete** — Don't add more ingredients; use what we have
- **Phase 2 has a proven template** — Copy structure, vary only canonicalIds
- **Token management is critical** — Commit frequently, document progress
- **Phase 4 (matching code) is the ROI** — Get recipe mapping done so we can build matching logic

---

**Status: READY TO RESUME. All infrastructure in place. Proceed with Phase 2 bulk work or Phase 3-4 as prioritized.**
