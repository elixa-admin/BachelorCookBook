# Phase 1 Continuation Guide — Ingredient Taxonomy Completion

**Status:** 65/100 canonical ingredients complete in `ingredient-taxonomy.js`

**What's been done:**
- ✅ Canonical ingredient structure designed and validated
- ✅ 65 top-frequency ingredients extracted and taxonomized
- ✅ Nested ID convention working: `category.item.variant.state`
- ✅ Match rules engine structure defined with `requiredTerms`, `preferredTerms`, `excludeTerms`
- ✅ SA localization integrated (Pick n Pay product names, SA regional products)

---

## Immediate Tasks for AntiGravity (35-50 ingredients remaining)

### 1. Complete Top 100 Ingredients

The existing taxonomy has 65 entries. Your list of remaining top-frequency ingredients from all recipes:

**These still need entries (research + add to taxonomy):**
- Mayonnaise (good, homemade)
- Capers
- Gherkins / cornichons
- Parsley (flat-leaf)
- Apricots (dried)
- Rocket / arugula
- Breadcrumbs (dried)
- Sour cream (already done ✅)
- Cloves (whole and ground)
- Bay leaves
- Thyme (fresh)
- Green cardamom pods
- Eggs (large)
- Lemon zest (already covered under fresh-lemon ✅)
- Peppercorn (whole black)
- Soy sauce
- Mirin
- Ginger (fresh)
- Biscuits (digestive, tennis biscuits — already done ✅)
- Honey
- Brown vinegar
- Rice vinegar
- Worcestershire sauce
- Fish sauce
- Coconut milk
- Stock (beef, vegetable, fish)
- Tomato paste (already covered ✅)

**For each missing ingredient:**

1. Create a canonical ID following the pattern: `{category}.{item}.{variant}.{state}`
2. Add to `window.INGREDIENT_TAXONOMY` object in `ingredient-taxonomy.js`
3. Copy the structure from an existing entry (e.g., `spice.cinnamon.ground` or `produce.onion.yellow`)
4. Fill in: `displayName`, `category`, `aliases`, `matchRules` (with `requiredTerms`, `preferredTerms`, `excludeTerms`)
5. Include SA-specific product names in aliases if applicable

**Example to copy:**

```js
"produce.parsley.flat-leaf": {
  id: "produce.parsley.flat-leaf",
  displayName: "Flat-leaf parsley",
  category: "produce",
  subcategory: "herb",
  aliases: ["parsley", "flat-leaf parsley", "italian parsley"],
  culinaryRole: ["garnish", "flavor", "finish"],
  physicalState: "fresh leaves",
  dietaryAttributes: ["vegan", "gluten-free", "paleo"],
  matchRules: {
    requiredTerms: ["parsley"],
    preferredTerms: ["flat-leaf", "fresh", "leaves"],
    excludeTerms: ["dried", "powder", "curly"],
    minScore: 45
  }
}
```

### 2. Validate Existing 65 Entries

Read through the completed 65 and check for:
- ✅ Consistent structure across all entries
- ✅ No duplicate IDs
- ✅ Match rules make sense (would correctly identify products with those terms)
- ✅ SA product names are accurate (verify ingredient names match Pick n Pay, Woolworths)
- ✅ Aliases cover regional/international variants

### 3. Test the Taxonomy

Once you add the remaining ingredients, test the structure:

```bash
# Load the file and check for syntax errors
node -e "require('./public/tub/recipes/ingredient-taxonomy.js'); console.log('Loaded:', Object.keys(window.INGREDIENT_TAXONOMY).length)"
```

---

## Next Phase (Phase 2): Recipe-to-Ingredient Mapping

Once Phase 1 is complete (100 canonical ingredients), you'll create `recipe-ingredient-map.js`:

```js
window.RECIPE_INGREDIENT_MAP = {
  "recipe-slug": [
    {
      groupName: "The protein",
      index: 0,
      canonicalId: "protein.chicken.thigh.boneless",
      displayText: "500 g deboned chicken thighs",
      quantity: 500,
      unit: "g",
      optional: false
    },
    // ... all ingredients for this recipe
  ]
}
```

**For each recipe in the codebase:**
1. Extract every ingredient tuple from the `ing` array
2. Find the best matching canonical ID from INGREDIENT_TAXONOMY
3. Record the displayText (original recipe wording), quantity, unit
4. Build the complete map

This is a large task (~228 recipes × 5-15 ingredients per recipe = 1,500+ mappings).

---

## Key Rules (Do Not Break)

1. **Never fabricate products** — The matching engine will reference real SA retailer products
2. **Use SA ingredient names** — "cake wheat flour" not "all-purpose", "fresh cream" not "heavy cream"
3. **Keep canonical IDs consistent** — Once assigned, do not change. Products will reference these IDs
4. **Match rules must be deterministic** — No subjective scoring; only include/exclude terms that would clearly identify or reject products
5. **Test as you go** — Each new ingredient should be validated against existing products (coming in Phase 3)

---

## Resources

**SA Retail Product Databases:**
- Woolworths online: https://www.woolworths.co.za
- Pick n Pay online: https://www.pnp.co.za
- Checkers online: https://www.checkers.co.za

**Ingredient Research:**
- Serious Eats: https://www.seriouseats.com
- Food 52: https://food52.com
- SA Food Culture: https://www.capetownmagazine.com/food

---

## Estimated Time & Token Cost

| Task | Estimate |
|---|---|
| Complete 35+ remaining ingredients | 2-3k tokens |
| Validate all 100 entries | 1k tokens |
| Phase 2 (recipe mapping, 228 recipes) | 8-12k tokens |
| **Total Phase 1 → 2** | **12-16k tokens** |

---

## Questions for User

Before proceeding to Phase 2, confirm:
1. ✅ Taxonomy structure is correct?
2. ✅ SA ingredient names match Pick n Pay availability?
3. ✅ Ready to scale to all 228 recipes for Phase 2?
4. ✅ Commit to GitHub, or hold until all phases done?

---

**Status: READY FOR CONTINUATION**

The foundation is set. Proceed with confidence. 🚀
