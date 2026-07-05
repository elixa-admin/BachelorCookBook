# Nutrition Standard — The Ultimate Bachelor Cookbook

## Overview

Nutrition data must be **accurate, transparent, and honest about variability.** This document establishes the single source of truth for how all 117 recipes report nutrition information.

---

## 1. Data Source & Calculation Method

### Calculation Approach
All nutrition data is calculated using:
- **USDA FoodData Central** for ingredient baseline values
- **Nutrition calculator tool:** [Specify: MyFitnessPal, Cronometer, manual USDA lookup, etc.]
- **Verification:** Each recipe verified by [role: Dietitian / Chef / Automated tool]

### Ingredient Standard (Baseline)
Every recipe defines its ingredient baseline explicitly. This is the recipe "as written" in the cooking instructions.

**Example — Cacio e Pepe baseline:**
- Pasta: Dry spaghetti (225g per 2 servings)
- Cheese: Pecorino Romano, block, grated fresh (55g per 2 servings)
- Oil: Extra-virgin olive oil, unrefined (45mL per 2 servings)
- Pepper: Black peppercorns, freshly ground (1 tsp per 2 servings)

### Why This Matters
- Different brands = different nutrition (e.g., Pecorino vs. Grana Padano = ±5% calories, ±15% sodium)
- Different preparations = different nutrition (fresh grated vs. pre-shredded cheese has binding agents)
- Consistent baseline = trustworthy data

---

## 2. Display Format

### Layout: Fixed Value + Substitution Context

For recipes with ingredient variability, use this format:

```
NUTRITION
┌─────────────────────────────────────────┐
│ 525 kcal · 2197 kJ                      │
│                                         │
│ 18g PROTEIN  |  72g CARBS  |  18g FAT  │
│                                         │
│ Vegetarian · Nut-Free                  │
│                                         │
│ KNOW THIS                               │
│ Cheese choice matters: Grana Padano     │
│ saves ~30 kcal/serving (milder, less   │
│ fat). Parmesan works too.               │
│                                         │
│ Using olive oil instead of butter       │
│ changes fat profile (less saturated).   │
└─────────────────────────────────────────┘

Per serving (scales with serving size)
Based on: Pecorino Romano, olive oil, dry spaghetti
```

### Key Elements

1. **Main macros** — Calorie count + protein/carbs/fat (always per-serving)
2. **Dietary tags** — Vegetarian, Nut-Free, Vegan, Dairy-Free, etc.
3. **KNOW THIS section** — Flags high-impact substitutions
4. **Per-serving clarity** — Notes that nutrition scales with servings
5. **Ingredient baseline** — Which specific ingredients were used to calculate

---

## 3. Handling Ingredient Variability

### Categorize each recipe's variability

**Low variability** (use fixed value)
- Beef Bourguignon (beef is beef; starch is starch; variation <5%)
- Risotto (rice is rice; stock doesn't materially change macros)

**Medium variability** (use fixed + note)
- Cacio e Pepe (cheese swap changes ~50 kcal; oil swap changes fat profile)
- Thai Green Curry (coconut milk brand changes <10%; paste brand <5%)
- Format: Fixed value + 1-2 substitution callouts

**High variability** (use ranges or multiple profiles)
- Recipes with major protein swaps (beef vs. tofu, chicken vs. chickpeas)
- Recipes with optional major ingredients (cream-based vs. cream-free)
- Format: "480–560 kcal depending on X" OR multiple profile cards

### Decision Tree

```
Q: Does a major ingredient swap change nutrition by >10%?
  ├─ NO → Use fixed value + KNOW THIS callout
  ├─ YES (1-2 swaps) → Use fixed value + KNOW THIS for each swap
  └─ YES (major variation) → Use ranges OR multiple profiles
```

---

## 4. Substitution Callout Rules (KNOW THIS)

For each substitution, include:
1. **What changes** (e.g., "Cheese choice")
2. **The swap** (e.g., "Grana Padano instead")
3. **The impact** (e.g., "saves ~30 kcal/serving")
4. **Why it matters** (e.g., "less fat, milder flavor")

### Example callouts

```
✓ Good
"Cheese choice matters: Grana Padano saves ~30 kcal/serving 
and has less sodium (milder, excellent melt)."

✗ Vague
"You can use different cheese"

✓ Good
"Using olive oil instead of butter changes fat profile 
from 40% saturated to 15% saturated."

✗ Vague
"Oil affects the dish"
```

---

## 5. Scaling Clarity

### Per-Serving vs. Total Nutrition

Every nutrition section must state: **"Per serving (scales with serving size)"**

This clarifies:
- If you see 525 kcal and cook for 2, you're eating 262 kcal per person
- If you cook for 4, you're eating 131 kcal per person
- The PER-SERVING macros stay the same; total dish macros scale

### Serving Size Language

Avoid ambiguity:
```
✓ Good
"Per serving (scales with serving size)
Based on: 2 servings"

✗ Confusing
"Nutrition data" (per what? per dish? per serving?)
"Serving size: 225g" (is that the whole recipe or one serving?)
```

---

## 6. Dietary Tags (Standardized)

Use ONLY these tags (bold = always verify):

✅ **Vegetarian** — No meat, fish, or poultry
✅ **Vegan** — No animal products
✅ **Dairy-Free** — No milk, cheese, butter, cream
✅ **Gluten-Free** — No wheat, barley, rye
✅ **Nut-Free** — No tree nuts or peanuts
✅ **Low-Carb** — <50g carbs per serving
✅ **High-Protein** — >25g protein per serving
✅ **Pescatarian** — Fish/seafood allowed, no other meat

Do NOT invent tags. If a recipe doesn't cleanly fit a category, omit the tag.

---

## 7. Verification & Accuracy

### Confidence Levels

Rate each recipe's nutrition accuracy:

| Level | Verification | Example |
|-------|---|---|
| ⭐⭐⭐⭐⭐ **Verified** | Verified by dietitian + USDA data checked | Signature recipes; chef-approved |
| ⭐⭐⭐⭐ **High confidence** | USDA data + automated calculator (Cronometer/MyFitnessPal) | Most recipes |
| ⭐⭐⭐ **Moderate** | Manual USDA lookup, not independently verified | Recipes with complex prep |
| ⭐⭐ **Low confidence** | Estimated or sourced from recipe site | Flag for re-verification |
| ⭐ **Unverified** | No source documented | Must re-verify before publish |

**Store confidence level in recipe metadata** (e.g., `"nutrition_confidence": "high"`)

---

## 8. Recipe-Level Template

Every recipe's nutrition section includes:

```html
<div class="nutrition-section">
  <h2>Nutrition</h2>
  <p class="subtitle">Per serving (scales with serving size)</p>
  
  <!-- Main display -->
  <div class="macros">
    <span class="calories">525 kcal</span>
    <span class="macro">18g Protein</span>
    <span class="macro">72g Carbs</span>
    <span class="macro">18g Fat</span>
  </div>
  
  <!-- Dietary tags -->
  <div class="tags">
    <span>Vegetarian</span>
    <span>Nut-Free</span>
  </div>
  
  <!-- Ingredient baseline -->
  <div class="baseline">
    <p class="label">Based on (2 servings):</p>
    <ul>
      <li>225g dry spaghetti</li>
      <li>55g Pecorino Romano</li>
      <li>45mL extra-virgin olive oil</li>
    </ul>
  </div>
  
  <!-- Substitution callouts -->
  <div class="know-this">
    <h4>KNOW THIS</h4>
    <p><strong>Cheese choice:</strong> Grana Padano saves ~30 kcal/serving and has lower sodium.</p>
    <p><strong>Oil swap:</strong> Using olive oil instead of butter changes fat profile (less saturated).</p>
  </div>
  
  <!-- Metadata (not displayed) -->
  <meta data-confidence="high" data-source="USDA+Cronometer" />
</div>
```

---

## 9. Audit Checklist

For each recipe, verify:

- [ ] Ingredient baseline explicitly defined
- [ ] Calorie count verified against USDA (±5% acceptable)
- [ ] Macros add up: (protein × 4) + (carbs × 4) + (fat × 9) ≈ calories
- [ ] Dietary tags accurate (tested if claiming Vegan/GF/etc.)
- [ ] High-variability subs called out with impact estimates
- [ ] "Per serving" language clear
- [ ] Confidence level documented
- [ ] Source cited (USDA, Cronometer, dietitian review, etc.)

---

## 10. Migration Plan (for existing 117 recipes)

### Phase 1: Update Standards
- [ ] Approve this standard
- [ ] Choose calculation tool (USDA FoodData Central? Cronometer? Combined?)
- [ ] Identify nutrition expert for verification

### Phase 2: Cacio e Pepe (Pilot)
- [ ] Verify/recalculate nutrition
- [ ] Add ingredient baseline
- [ ] Add KNOW THIS callouts
- [ ] Test layout in app

### Phase 3: Audit all 117
- [ ] Categorize by variability (low/medium/high)
- [ ] Recalculate all with standard method
- [ ] Verify dietary tags
- [ ] Assign confidence levels
- [ ] Add callouts where needed

### Phase 4: Launch
- [ ] All 117 recipes updated
- [ ] UI displays new format
- [ ] User-facing documentation (what the nutrition tags mean)

---

## 11. Common Mistakes (Don't Do These)

❌ "525 kcal" without per-serving clarity
❌ Dietary tags without verification (claiming GF when there's shared equipment risk)
❌ Ignoring major substitutions (olive oil vs. butter = 2×different fat profiles)
❌ Citing a recipe website instead of USDA
❌ Macros that don't add up (18+72+18 ≠ 525)
❌ Varying calculation methods across recipes (use ONE consistent source)

---

## 12. Serving Size Variance

Some recipes scale naturally (Cacio e Pepe: 2, 4, 6 servings).
Others have fixed portions (a whole cake, 1 steak).

**Rule:** Report per-serving nutrition only if serving is variable.
If fixed (whole cake, 1 steak), clarify: "Per 1 steak" or "Per whole cake (6 servings)"

---

## Questions for Implementation

1. **Calculation tool:** Which source for USDA data? (Cronometer, MyFitnessPal, direct USDA API, manual lookup?)
2. **Verification:** Who verifies? (Dietitian consultant? Author review? Spot-check sample?)
3. **Timeline:** Audit all 117 at once, or batch-audit by recipe tier?
4. **Confidence threshold:** What's the minimum accuracy (⭐⭐⭐?) before launch?

---

## Next Steps

1. ✅ This standard is approved
2. → Update Cacio e Pepe as pilot
3. → Audit all 117 recipes
4. → Deploy new nutrition display

