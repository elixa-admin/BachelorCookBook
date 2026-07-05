# Nutrition Audit Framework — All 117 Recipes

## Overview

This document outlines the systematic audit of all 117 recipes' nutrition data for accuracy, completeness, and compliance with [NUTRITION_STANDARD.md](NUTRITION_STANDARD.md).

---

## Current State

**Data location:** `public/tub/recipes/recipes-nutrition.js`
**Format:** `window.NUTRITION` object with recipe slugs as keys

**Current structure:**
```javascript
"recipe-slug": {
  srv: 2,           // number of servings
  kcal: 525,        // kilocalories per serving
  kJ: 2197,         // kilojoules per serving (or auto-calc from kcal × 4.184)
  protein: 18,      // grams
  carbs: 72,        // grams
  fat: 18,          // grams
  diet: ["vegetarian", "nut-free"]  // dietary tags
}
```

**Status:** 71 recipes have nutrition data; 46 are missing

---

## Phase 1: Spot-Check Audit (5 pilot recipes)

### Purpose
Validate our calculation methodology before rolling out to all 117. Catch data issues early.

### Recipes to Verify

Pick 5 recipes spanning tiers and complexity:
1. **Cacio e Pepe** (Signature, simple, variable ingredients)
2. **Beef Bourguignon** (Signature, complex ingredients, meat-based)
3. **Thai Green Curry** (Exotic, high variability—coconut cream swaps)
4. **Risotto Milanese** (Signature, simple, creamy)
5. **Roast Chicken** (Simple baseline, meat, no pasta/dairy)

### Verification Checklist

For each recipe:

```
RECIPE: _____________________ SLUG: ________________

INGREDIENT AUDIT
□ Ingredient list matches "based on" declaration
□ Quantities documented (with units)
□ Standard baseline selected (e.g., "full-fat coconut milk", not "light")

CALCULATION VERIFICATION
□ Source tool selected: [ ] USDA FoodData [ ] Cronometer [ ] MyFitnessPal [ ] Manual
□ Each ingredient looked up in source
□ Per-ingredient macros recorded:
  - ________________: __kcal, __g protein, __g carbs, __g fat
  - ________________: __kcal, __g protein, __g carbs, __g fat
  - ________________: __kcal, __g protein, __g carbs, __g fat
  - ________________: __kcal, __g protein, __g carbs, __g fat

TOTAL FOR RECIPE (pre-serving split)
  kcal: _____ protein: _____g carbs: _____g fat: _____g

SERVING SIZE VERIFICATION
□ Serving count from recipe: ____ servings
□ Per-serving kcal: _____ ÷ ____ servings = _____ kcal/serving
□ Per-serving protein: _____ ÷ ____ = _____g
□ Per-serving carbs: _____ ÷ ____ = _____g
□ Per-serving fat: _____ ÷ ____ = _____g

MATH CHECK
□ Macros add up: (protein × 4) + (carbs × 4) + (fat × 9) = _____ kcal
   Stored: _____ kcal
   Variance: _____ % (acceptable if <5%)

DIETARY TAGS
□ Vegetarian: (no meat/fish/poultry?) YES / NO / EDIT
□ Vegan: (no animal products?) YES / NO / EDIT
□ Dairy-Free: (no milk/cheese/butter?) YES / NO / EDIT
□ Gluten-Free: (no wheat/barley/rye?) YES / NO / EDIT
□ Nut-Free: (no tree nuts/peanuts?) YES / NO / EDIT
□ Low-Carb: (<50g carbs/serving?) YES / NO / EDIT
□ High-Protein: (>25g protein/serving?) YES / NO / EDIT

HIGH-VARIABILITY ASSESSMENT
Does this recipe have ingredient swaps that change nutrition >10%?
□ NO  → Use fixed value + KNOW THIS callouts
□ YES, 1-2 swaps → Use fixed value + KNOW THIS for each
□ YES, major variation → Use ranges OR multiple profiles

Substitutions identified:
  - ________________: ±___% impact
  - ________________: ±___% impact

CONFIDENCE LEVEL
Rate this recipe's nutrition accuracy:
□ ⭐⭐⭐⭐⭐ Verified (dietitian + USDA checked)
□ ⭐⭐⭐⭐ High confidence (USDA + calculator)
□ ⭐⭐⭐ Moderate (manual USDA, not verified)
□ ⭐⭐ Low (estimated, needs verification)
□ ⭐ Unverified (no source documented)

DECISION
□ APPROVE as-is
□ REVISE (new kcal/macros below)
□ FLAG for dietitian review
□ NEEDS DATA SOURCES (mark incomplete)

Notes:
_________________________________________________
_________________________________________________

DATA SOURCE CITATION
Source tool/database: _____________________________
Lookup date: _____________________________
Confidence notes: _____________________________
```

---

## Phase 2: Full Audit (All 117 Recipes)

### Workflow

**Step 1: Categorize by confidence**
- Tier 1 (16 recipes): Already audited in Phase 1 + 15 pilot images
- Tier 2 (71 recipes): Have nutrition data, need verification
- Tier 3 (30 recipes): Missing nutrition data, needs calculation

**Step 2: Batch audit by tier**

| Batch | Recipes | Method | Owner | Timeline |
|-------|---------|--------|-------|----------|
| 1 | 16 pilot | Phase 1 checklist | Nutrition lead | Week 1 |
| 2 | 20 recipes | USDA lookup | Batch processor | Week 2 |
| 3 | 20 recipes | USDA lookup | Batch processor | Week 2 |
| 4 | 20 recipes | USDA lookup | Batch processor | Week 3 |
| 5 | 21 recipes | USDA lookup | Batch processor | Week 3 |

**Step 3: Spot-check high-risk recipes**
- Recipes with major ingredient substitutions (Thai curry, rendang)
- Recipes with unusual serving sizes (paella: 6 servings, tiramisu: 8 servings)
- Recipes with ingredients hard to find USDA matches (South African dishes)

**Step 4: Add missing nutrition**
- 30 recipes without nutrition data need calculation
- Use standardized method (USDA + calculator tool)
- Add ingredient baseline + dietary tags

---

## Phase 3: Enrichment & Callouts

### For Medium/High-Variability Recipes

Add KNOW THIS section to nutrition template:

**Cacio e Pepe example:**
```
"know_this": [
  {
    "label": "Cheese choice",
    "note": "Grana Padano saves ~30 kcal/serving and has lower sodium",
    "impact": "±30 kcal"
  },
  {
    "label": "Oil swap",
    "note": "Olive oil instead of butter changes fat profile from 40% to 15% saturated",
    "impact": "Fat composition change"
  }
]
```

### For High-Variability Recipes

Provide multiple profiles or ranges:

**Thai Green Curry example:**
```
"profiles": [
  {
    "name": "Full-fat coconut milk",
    "kcal": 525,
    "fat": 36,
    "note": "Traditional, rich"
  },
  {
    "name": "Light coconut milk",
    "kcal": 420,
    "fat": 24,
    "note": "Lower calorie option"
  }
]
```

---

## Phase 4: Launch & Monitoring

### Pre-Launch Checklist
- [ ] All 117 recipes have nutrition data
- [ ] All dietary tags verified (spot-check 10 recipes)
- [ ] High-variability recipes have KNOW THIS callouts
- [ ] Ingredient baselines documented for all
- [ ] Confidence levels assigned to all recipes
- [ ] UI updated to display callouts and ingredient baselines

### Ongoing
- [ ] Monitor user feedback for inaccurate nutrition claims
- [ ] Re-audit annually or when recipes change
- [ ] Track confidence levels per recipe (roll up report)

---

## Audit Data Structure

### Extended nutrition object (Phase 4)

Update `recipes-nutrition.js` format to:

```javascript
"cacio-e-pepe": {
  srv: 2,
  kcal: 525,
  kJ: 2197,
  protein: 18,
  carbs: 72,
  fat: 18,
  diet: ["vegetarian", "nut-free"],
  
  // NEW: Metadata
  confidence: "high",          // ⭐⭐⭐⭐ or similar
  source: "USDA+Cronometer",
  verified_date: "2026-01-15",
  baseline: {
    "Pasta": "225g dry spaghetti",
    "Cheese": "55g Pecorino Romano",
    "Oil": "45mL extra-virgin olive oil",
    "Pepper": "1 tsp fresh-ground black pepper"
  },
  
  // NEW: For variable recipes
  know_this: [
    {
      label: "Cheese choice",
      note: "Grana Padano saves ~30 kcal/serving",
      impact: "±30 kcal"
    }
  ],
  
  // NEW: For high-variability recipes (optional)
  profiles: [
    {
      name: "As written",
      kcal: 525,
      fat: 18
    }
  ]
}
```

---

## Common Issues & Fixes

### Issue: Macros don't add up
**Example:** 20g protein + 30g carbs + 10g fat = 260 kcal, but stored as 300 kcal
**Fix:** Recalculate. Check for alcohol (7 kcal/g) or fiber adjustments.

### Issue: Serving size mismatch
**Example:** Recipe says "serves 4" but nutrition calculated for "2 servings"
**Fix:** Verify recipe yield in Cook section, recalculate if needed.

### Issue: Ingredient variability ignored
**Example:** Curry stored as "525 kcal" but coconut milk swap = ±100 kcal
**Fix:** Add KNOW THIS callout or use ranges (Phase 3).

### Issue: Dietary tags are inaccurate
**Example:** Recipe tagged "vegan" but has butter
**Fix:** Test recipe, correct tags, spot-check similar recipes.

### Issue: USDA lookup fails
**Example:** "Bunny chow" not in USDA database
**Fix:** Break recipe into component parts (bread + filling separately) or use recipe-site estimate with disclaimer.

---

## Success Criteria

✅ **All 117 recipes have verified nutrition data**
✅ **Macros pass math check (±5% tolerance)**
✅ **Dietary tags verified (spot-check 20 recipes)**
✅ **High-variability recipes have callouts or ranges**
✅ **Ingredient baselines documented for all**
✅ **Confidence levels assigned (no ⭐ unverified recipes)**
✅ **UI updated to show baselines + callouts**
✅ **User documentation explains nutrition system**

---

## Audit Tracker

| Recipe Slug | Status | Confidence | Notes | Owner | Due |
|---|---|---|---|---|---|
| cacio-e-pepe | In Progress | TBD | Spot-check | - | - |
| beef-bourguignon | To Do | - | - | - | - |
| thai-green-curry | To Do | - | High variability | - | - |
| risotto-milanese | To Do | - | - | - | - |
| roast-chicken | To Do | - | Baseline | - | - |
| ... | ... | ... | ... | ... | ... |

---

## Next Step

1. ✅ Approve NUTRITION_STANDARD.md
2. ✅ Create this audit framework
3. **→ Start Phase 1 spot-check on 5 pilot recipes**
4. → Verify methodology & fix data quality issues
5. → Roll out Phases 2-4 to all 117 recipes

