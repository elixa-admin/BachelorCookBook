# Next Session Quick-Start Checklist

## Pre-Work: 5 minutes
- [ ] Read `HANDOVER_SESSION_20260705.md` (← you are here)
- [ ] Read `knowledge/RECIPE_DEVELOPMENT_STANDARD.md` (standards + schema)
- [ ] Read `knowledge/PANTRY_STRATEGY.md` (ingredient research)
- [ ] Clone repo: `git clone https://github.com/elixa-admin/BachelorCookBook.git`
- [ ] Verify Vercel live: https://bachelorcookbook.vercel.app/tub/tub-app.html

## Batch 2: British & European (9 recipes, ~2-3 hours)

### Recipes to develop
1. Roast Beef with Yorkshire Pudding
2. Beef Steak & Ale Pie
3. Bangers & Mash
4. Sunday Roast
5. Sticky Toffee Pudding
6. Shepherd's Pie
7. Hungarian Goulash
8. Lancashire Hotpot
9. Crêpes Suzette

### Files to create/update
1. **`public/tub/recipes/batch-british-european.js`**
   - Use `public/tub/recipes/batch-new-sa.js` as template
   - Define: `window.BATCH_BRITISH_EUROPEAN = [...]`
   - 9 full recipe objects (prov, ing, steps, wine required)
   - Follow RECIPE_DEVELOPMENT_STANDARD.md schema exactly

2. **`public/tub/recipes/stories-british-european.js`**
   - Define: `window.RECIPE_STORIES = Object.assign(window.RECIPE_STORIES||{}, {...})`
   - 9 recipes × 4 paragraphs + dinner_fact each
   - See `public/tub/recipes/stories-new-sa.js` for tone & structure

3. **`public/tub/recipes/roster-classes.js`**
   - Add 9 entries at the end before closing `}`
   - Format: `"slug": { "cat": "main"|"sweet"|"special", "tier": "heritage"|"signature"|"adopted" }`

4. **`public/tub/tub-app.html`**
   - **Line ~872:** Add script tag: `<script src="recipes/batch-british-european.js"></script>`
   - **Line ~872:** Add script tag: `<script src="recipes/stories-british-european.js"></script>`
   - **Line 1025:** Update array to include `window.BATCH_BRITISH_EUROPEAN`:
     ```javascript
     [window.NEW_BATCH_SA,window.BATCH_BRITISH_EUROPEAN,window.COMPENDIUM,...
     ```

### Research sources per recipe
Use this hierarchy (from RECIPE_DEVELOPMENT_STANDARD.md):
1. **SA First** — local food sites (Woolworths Taste, SA Food & Home, Jan Braai, Pick n Pay Fresh Living)
2. **Technique** — Serious Eats, Jacques Pépin, Samin Nosrat
3. **Crowd consensus** — BBC Good Food (high-rated), AllRecipes (1000+ reviews), NYT Cooking
4. **Chef reference** — Heston, Ramsay, Ottolenghi

For British/European: BBC Good Food is your goldmine.

### SA Localization Checklist
Before finalizing each recipe, verify:
- [ ] All ingredients available at Pick n Pay on a Tuesday
- [ ] Flour = "cake wheat flour" (not all-purpose)
- [ ] Cream = "fresh cream" / "whipping cream" (not heavy cream)
- [ ] Wine = SA wine estates where possible
- [ ] Beer = local brands (Castle, Hansa, Windhoek)
- [ ] Meat = SA butcher cuts & terminology
- [ ] Spices = SA supplier availability confirmed

### Ingredient Substitution Table
See `knowledge/RECIPE_DEVELOPMENT_STANDARD.md` lines 39-62 for the full mapped list.

### Data Structure Template
```javascript
{
  slug: 'recipe-slug',
  t: 'Recipe Title',
  tier: 'heritage|signature|adopted|premium',
  cui: 'Region · Subregion',  // e.g., 'British · Somerset'
  occ: ['solo', 'date', 'host'],  // which occasions
  time: '1 hr 30 min',
  method: 'Oven · roast',  // primary method
  diff: 'Easy|Medium|Hard',
  blurb: 'One-line card description — sensory, appetizing.',
  
  brief: {
    lead: '2-3 sentence narrative. Set the scene.',
    expect: [['Heading', 'Body text'], ...],  // 3-5 expectations
    stats: [['value', 'unit', 'label'], ...],  // time, servings, etc.
    kit: ['Equipment list', ...]
  },
  
  prov: {
    popular_in: 'Where/when/who',
    famous_for: 'What makes it special',
    consists_of: 'Main components',
    name_origin: 'Etymology or history',
    why_loved: 'Why this dish matters',
    method_detail: 'Cooking technique overview'
  },
  
  ing: [
    ['Category', [
      ['linear', qty, 'unit', 'Ingredient (practical note)'],
      ['countX', n, '', 'Count items'],
      ['countN', n, '', 'Count loose items'],
      ['static', '', '', 'To taste / no measure']
    ]]
  ],
  
  timeline: [
    ['T-H:MM', 'Action'],
    ['T+H:MM', 'Milestone']
  ],
  
  steps: [
    { title: 'Step title', body: 'Clear instruction.' },
    // ...
  ],
  
  wine: [
    { wine: 'Wine name', region: 'SA estate', note: 'Why it pairs.' },
    // beer, cocktail, non-alcoholic also needed
  ]
}
```

### Story Structure Template (for `stories-british-european.js`)
```javascript
"recipe-slug": {
  para1: "Origin story: where, when, who, why. 3-4 sentences.",
  para2: "Name meaning + what it's called elsewhere. International context.",
  para3: "What makes it special / technique insight. The technique angle.",
  para4: "Deeper cultural meaning or occasion context. When/why we eat it.",
  dinner_fact: "One surprising fact for table conversation."
}
```

## Testing Workflow
1. **Locally:**
   ```bash
   cd /Users/brandondienar/Projects/BachelorCookBook
   npm run dev
   # Visit http://localhost:3000/tub/tub-app.html
   # Click through recipes, verify they appear
   ```

2. **Verify data loads:**
   - Open browser console
   - `R.length` should be 156 (148 + 8 new) or 157 (148 + 9 new)
   - `Object.keys(window.BATCH_BRITISH_EUROPEAN).length === 9`

3. **Test detail pages:**
   - Click a recipe card
   - Verify story loads (4 paragraphs + dinner fact)
   - Check wine pairing shows correctly
   - Ingredients display dual measurements

4. **Deploy & verify production:**
   ```bash
   git add public/tub/recipes/batch-british-european.js
   git add public/tub/recipes/stories-british-european.js
   git add public/tub/recipes/roster-classes.js
   git add public/tub/tub-app.html
   git commit -m "feat: add British & European batch — 9 recipes with full cook data
   
   - Roast Beef with Yorkshire Pudding
   - Beef Steak & Ale Pie
   - Bangers & Mash
   - Sunday Roast
   - Sticky Toffee Pudding
   - Shepherd's Pie
   - Hungarian Goulash
   - Lancashire Hotpot
   - Crêpes Suzette
   
   Co-Authored-By: [Your Name] <[Your Email]>"
   
   git push origin main
   # Vercel deploys automatically
   # Test at https://bachelorcookbook.vercel.app/tub/tub-app.html
   ```

## Time Estimate
- Research & writing: 1.5 hours
- Data structuring: 0.5 hours
- Testing & deployment: 0.5 hours
- **Total: 2-3 hours for 9 fully-researched recipes**

## Common Pitfalls to Avoid
- ❌ Forgetting to update `roster-classes.js` (recipe won't appear)
- ❌ Using international names (must use SA names — "fresh cream" not "heavy cream")
- ❌ Single measurements only (must be dual — grams + cups)
- ❌ Skipping story content (required for every recipe)
- ❌ Wine pairings without explanation (education is part of the spec)
- ❌ Forgetting to add script tags to `tub-app.html`
- ❌ Testing only in Preview (test in real browser at Vercel URL)

## Verification Checklist (Before Commit)
- [ ] All 9 recipe slugs are unique
- [ ] All 9 recipes in `roster-classes.js`
- [ ] All 9 stories in `RECIPE_STORIES` object
- [ ] Both script tags added to `tub-app.html`
- [ ] Array updated at line 1025 to include `window.BATCH_BRITISH_EUROPEAN`
- [ ] All ingredients SA-localized (no "all-purpose flour", "heavy cream", etc.)
- [ ] All dual measurements present (metric + practical)
- [ ] All wine pairings include: cultivar + estate + explanation
- [ ] Beer/cocktail/NA options also included
- [ ] Story = 4 paragraphs + dinner_fact
- [ ] No typos in slugs (consistency matters for rendering)
- [ ] Local test passes: recipes appear, detail pages work, no console errors
- [ ] Production test passes: Vercel URL shows new recipes after 60 seconds

## Batch 3+ (Future)
Once Batch 2 is live, follow the same pattern for:
- **Batch 3:** Seafood (14 recipes, mussels/calamari/tuna/whole fish)
- **Batch 4:** Mains & Proteins (14 recipes)
- **Batch 5:** Salads, Sides & Vegetables (14 recipes)
- **Batch 6:** Baked Goods, Breads & Desserts (17 recipes)
- **Batch 7:** Roasted & Air Fryer (5 recipes)

**Total: ~60 more recipes to reach 200+**

## If You Get Stuck
1. Check `public/tub/recipes/batch-new-sa.js` (use as exact template)
2. Check `public/tub/recipes/stories-new-sa.js` (story tone/structure)
3. Read `knowledge/RECIPE_DEVELOPMENT_STANDARD.md` (schema validation)
4. Verify Vercel URL is live & check network requests (if UI doesn't update)

---

**You've got this. The system is designed to be autonomously extensible.**
