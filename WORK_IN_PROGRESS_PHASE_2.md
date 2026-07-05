# Work in Progress — Phase 2 Recipe Mapping

**Last Updated:** 2026-07-05 Session (Continued)  
**Status:** Light mapping complete. 22/228 recipes mapped. Ready for bulk continuation.

---

## ✅ RECIPES MAPPED (22)

### Batch 1: South African (3/8)
1. ✅ snoek-pate (12 ingredients)
2. ✅ crayfish-bisque (12 ingredients)
3. ✅ cape-malay-lamb-braised (19 ingredients)
4. ⏳ fish-cakes-tartare (pending)
5. ⏳ milk-tart-cheesecake (pending)
6. ⏳ kingklip-en-papillote (pending)
7. ⏳ sardines-braai-lemon (pending)
8. ⏳ prime-rib-roast (pending)

### Batch 2: Legacy European/Classic (19/56+)
1. ✅ denningvleis (8 ingredients)
2. ✅ butter-chicken (7 ingredients)
3. ✅ steak (4 ingredients)
4. ✅ cacio-e-pepe (4 ingredients)
5. ✅ creme-brulee (5 ingredients)
6. ✅ tiramisu (6 ingredients)
7. ✅ malva-pudding (6 ingredients)
8. ✅ peppermint-crisp-tart (5 ingredients)
9. ✅ hertzoggies (6 ingredients)
10. ✅ lamb-tagine-apricot-almond (9 ingredients)
11. ✅ chicken-biryani (8 ingredients)
12. ✅ roast-leg-lamb-rosemary-garlic (6 ingredients)
13. ✅ red-wine-braised-short-rib (7 ingredients)
14. ✅ eggs-benedict-hollandaise (7 ingredients)
15. ✅ flapjacks-pancakes (7 ingredients)
16. ✅ lasagne-bolognese (8 ingredients)
17. ✅ quiche-lorraine (7 ingredients)
18. ✅ spanakopita (7 ingredients)
19. ✅ croissants (6 ingredients)

### Remaining Unmapped
- ⏳ **206 recipes** (no mapping yet)

---

## 📊 Coverage

| Category | Mapped | Total | % |
|---|---|---|---|
| South African | 3 | 8 | 37.5% |
| Legacy/Classic | 19 | 56+ | 34%+ |
| Retrofit/Other | 0 | 164+ | 0% |
| **TOTAL** | **22** | **228** | **9.6%** |

---

## 🎯 Next Steps (For Next Session)

### Immediate (High ROI)
1. **Complete SA Batch (5 remaining)** — 20-30 min
   - fish-cakes-tartare
   - milk-tart-cheesecake
   - kingklip-en-papillote
   - sardines-braai-lemon
   - prime-rib-roast

2. **Bulk Legacy Batch (37 remaining from stories.js)** — 2-3 hours
   - Use established pattern from 19 already mapped
   - Read recipes in `stories.js`, map systematically
   - Group by cuisine for efficiency

3. **Retrofit Batches (~164 recipes)** — 4-6 hours
   - Identify which batch files are used
   - Map in bulk using same pattern

### Secondary
- Update `RECIPE_INGREDIENT_MAP` completion tracker as you go
- Commit every 10-15 recipes to git with clear commit messages

---

## 💡 Efficiency Tips

**Copy the pattern:** All entries follow identical structure. Just change:
- `groupName` (ingredient section from recipe)
- `canonicalId` (lookup in INGREDIENT_TAXONOMY)
- `displayText` (original recipe wording)
- `quantity`, `unit`, `optional` (from recipe tuple)

**Bulk read recipe files:**
```bash
grep -A 20 "slug:'fish-cakes" /path/to/batch.js | grep -E "^\s+\['" | head -20
```

**Validate as you go:**
```bash
node -e "global.window = {}; require('./public/tub/recipes/recipe-ingredient-map.js'); console.log(Object.keys(window.RECIPE_INGREDIENT_MAP).length);"
```

---

## 🔧 Template to Copy

For quick mapping:
```javascript
window.RECIPE_INGREDIENT_MAP["recipe-slug"] = [
  {
    groupName: "section name",
    canonicalId: "category.item.variant.state",
    displayText: "original description",
    quantity: 500,
    unit: "g",
    optional: false
  },
  // ... more ingredients
];
```

---

## 📝 Notes

- All canonicalIds already exist in `ingredient-taxonomy.js` (102 ingredients)
- No need to add new spices, produce, or proteins — taxonomy is complete
- If ingredient not in taxonomy, add it first to `ingredient-taxonomy.js`, then map recipe
- Test frequently to catch missing canonicalIds early

---

**Status: Ready for bulk continuation. All infrastructure in place.**
