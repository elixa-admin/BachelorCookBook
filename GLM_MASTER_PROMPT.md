# GLM 5.2 Master Prompt — The Ultimate Bachelor Cookbook

**Project:** The Ultimate Bachelor Cookbook (TUB)  
**Codebase:** `/Users/brandondienar/Projects/BachelorCookBook`  
**Live app:** `public/tub/tub-app.html` (single HTML file, no build step)

---

## Your Role

You are building features for **The Ultimate Bachelor Cookbook** — a premium, dark-moody cooking app for the modern man. You write code directly into `public/tub/tub-app.html` and its companion data files in `public/tub/recipes/`. No build step required; changes are visible on browser refresh.

---

## The App in One Paragraph

A single-file progressive web app with 64 curated recipes. Users browse by occasion (Solo / Date Night / Entertaining / From My Pantry / Skill Path), filter by collection/type/skill/region, and open any recipe for a 3-tab experience: **COOK** (scaled ingredients + 4-phase illustrated timeline + "Start Timer" on every step + Pantry Secrets), **STORY** (cultural provenance + plating), and **LEARN** (chef upgrade / health-forward / dietary fit / technique masterclass / ingredient substitutes / nutrition). Supporting features: Meal Planner (7-night calendar), Shopping List (aisle-sorted, auto-scaled), and "What can I cook tonight?" pantry matching.

---

## Design Language (Locked — Do Not Change)

```css
--ink:   #0a0a0a          /* page background */
--gold:  rgba(212,175,55) /* primary accent, headings, highlights */
--wine:  rgba(110,30,36)  /* heritage red, borders */
--fresh: #A8D651          /* SERVE section green */
--teal:  rgba(85,183,221) /* storage blue */
--text:  #e8e8e8
--muted: #9a9a9a
--display: 'Oswald', sans-serif   /* all caps display headers */
--font:  'Inter Tight', sans-serif
--mono:  'JetBrains Mono', monospace
```

**Cards:** dark surface, gold accent line, recipe image hero, 2-column grid desktop / 1-column mobile.  
**Timeline sections:** PREP (blue) → COOK (gold) → REST (burgundy) → SERVE (green).  
**Typography:** Oswald for display; Inter Tight for body; JetBrains Mono for quantities.

---

## Voice Rules (Non-Negotiable)

- **Warm Premium.** Sensory, unhurried, assured. Write like a calm host who knows what he's doing.
- Atmosphere over instructions. *"A great steak is less recipe than ritual…"* not *"Cook steak for 4 minutes."*
- British/SA English: **chilli** (not chili), colour, flavour, aubergine, courgette
- Cooking is leverage and generosity — **never consolation**
- No sad-solo, "treat yourself", "you deserve it", or pity framing — ever
- Recipe stories lead with cultural history, never with instructions

---

## File Structure

```
public/tub/
├── tub-app.html              ← THE app. ~3,300 lines. All CSS + HTML + JS.
├── recipes/
│   ├── recipes-data.js       window.RECIPES (Array, 45 base recipes)
│   ├── sa-additions.js       window.SA_ADDITIONS (Array)
│   ├── sa-additions-2.js     window.SA_ADDITIONS_2 (Array)
│   ├── fullcook-conversions.js  window.FULLCOOK_BATCH (Array)
│   ├── stories.js            window.RECIPE_STORIES {slug: {para1, para2...}}
│   ├── stories-extra.js      (more stories, same format)
│   ├── stories-new-sa.js     (SA stories, same format)
│   ├── pantry-lore.js        window.PANTRY_LORE {slug: "Did you know? ..."}
│   ├── storage-reheating.js  window.RECIPE_STORAGE {slug: {fridge,freezer,reheat}}
│   ├── recipes-images.js     window.RECIPE_IMAGES {slug: imageUrl}
│   ├── substitutes.js        Ingredient swap data
│   ├── masterclass.js        window.MASTERCLASS (technique lessons array)
│   └── roster-classes.js     Active recipe list (controls what shows in library)
└── data/
    ├── sa-ingredient-retailers.js
    ├── sa-ingredient-seasonality.js
    ├── sa-ingredient-cost-variants.js
    ├── sa-ingredient-pack-sizes.js
    └── sa-ingredient-substitutes.js
```

---

## Recipe Object Shape

```javascript
{
  slug: 'beef-teriyaki',         // URL-safe identifier (kebab-case)
  t: 'Beef Teriyaki',            // display title
  blurb: 'Japanese home...',     // one-line description
  tier: 'adopted',               // 'heritage' | 'adopted' | 'aspirational' | 'component'
  cui: 'Japanese',               // cuisine display name
  occ: ['solo', 'date'],         // ['solo','date','host']
  time: '30 min (plus marinating)',
  method: 'Grill',
  diff: 'easy',                  // 'easy' | 'medium' | 'hard'
  image: 'https://...',          // hero image URL (dark-moody, no clinical whites)
  ing: [                         // ingredient groups
    ['Marinade', [               // [groupName, [items]]
      ['linear', 125, 'ml', '<b>soy sauce</b>'],   // [mode, qty, unit, name]
      ['static', '', 'to taste', 'flaky salt'],     // static item
    ]],
    ['SERVING', [                // SERVING group = "Serve with" section (read-only)
      ['static', '', 'steamed rice'],
    ]]
  ],
  tl: [                          // timeline steps
    ['Marinate', 'Combine...', 'Why callout', 1200],  // [title, instruction, why, durationSeconds]
  ],
  pair: {                        // drinks pairing
    wine: {name:'...', temp:'chilled', why:'...'},
    beer: {name:'...', temp:'ice-cold', why:'...'},
  },
  storage: {fridge:'3 days', freezer:'2 months', reheat:'Pan on medium heat'},
  chef_upgrade: 'Upgrade tip...',
  health_forward: 'Lighter version...',
  diets: {vegetarian: false, vegan: false, glutenFree: true},
  diet_notes: 'Use tamari for gluten-free',
  mistakes: ['Common mistake 1', 'Common mistake 2'],
}
```

---

## Ingredient Item Formats

```javascript
['linear', 125, 'ml', 'soy sauce']    // scales linearly with servings
['taper', 1, 'tsp', 'salt']           // scales with diminishing returns
['countN', 2, '', 'garlic cloves']     // whole number count
['countX', 1, '', 'chicken breast']   // count × format
['static', '', 'to taste', 'pepper']  // not scaled, shown as-is
['static', '', '125', 'ml', 'stock']  // static with qty + unit + name (5-element)
```

---

## Key Functions (tub-app.html)

```javascript
goBrowse()              // Return to library (closes all overlays)
openRecipe(slug)        // Open recipe detail view
openShop()              // Open shopping list
openPlan()              // Open meal planner
openMethods()           // Open culinary methods hub
switchRecipeTab(t)      // t = 'cook' | 'story' | 'learn'
renderIgs(ing)          // Render ingredient groups
timelineHTML(r)         // Render 4-section timeline
pantryLoreHTML(r)       // Render "Did you know?" section from PANTRY_LORE[r.slug]
storyHTML(slug)         // Render STORY tab from RECIPE_STORIES[slug]
```

---

## Pantry Lore Format

File: `public/tub/recipes/pantry-lore.js`

```javascript
window.PANTRY_LORE = {
  "beef-teriyaki": "**Did you know?** Teriyaki sauce emerged in Japan during the Edo period...",
  "bobotie": "**Did you know?** Bobotie is Cape Malay cuisine's most iconic dish...",
  // one entry per recipe slug, 40-70 words, **bold** markdown for the opener
};
```

**Lookup:** `PANTRY_LORE[r.slug]` — keyed by recipe slug, not ingredient name.

---

## Story Format

File: `public/tub/recipes/stories.js` (and stories-extra.js, stories-new-sa.js)

```javascript
window.RECIPE_STORIES = {
  "beef-teriyaki": {
    para1: "Beef Teriyaki is a modern classic...",
    para2: "The sauce was traditionally...",
    para3: "The science of teriyaki...",
    dinner_fact: "Teriyaki sauce originally used...",
  }
};
```

---

## What's Been Built (Complete)

✅ 64-recipe library with full filter system  
✅ COOK tab: scaled ingredients + 4-phase timeline + timers  
✅ STORY tab: cultural story + Pantry Secrets + Plating Tips  
✅ LEARN tab: Chef Upgrade + Health-Forward + Dietary + Masterclass + Substitutes + Nutrition  
✅ Ingredient Swap (hover-reveal, group-level, modal)  
✅ "Serve with" section (read-only accompaniments, green styling)  
✅ Meal Planner (7-night, surprise fill, pantry fill)  
✅ Shopping List (aisle-sorted, auto-scaled by servings)  
✅ Search (full-text, keyword highlight)  
✅ Pantry Secrets (58 facts, one per recipe)  
✅ Storage guidance (fridge/freezer/reheat for all recipes)  
✅ Mobile responsive (375px / 768px / 1280px tested)

---

## Suggested Next Phase Work

### Priority 1 — Content Depth
- **Occasion 07 (Accompaniments & Components)**: No active recipes. Add component recipes (sauces, bases, sides) tagged with `occ: ['component']`
- **Recipe images for SA additions**: Some SA batch recipes need dark-moody images (Pexels/Unsplash). Add to `recipes-images.js` keyed by slug
- **Pantry Secrets gaps**: New SA additions need entries in `pantry-lore.js`

### Priority 2 — Feature Extensions
- **Favourites (Occasion 06)**: Heart button saves to localStorage. The occasion tab works but shows 0 until user favourites recipes. Consider pre-seeding with a "starter pack" of 3-5 recommended recipes
- **Rating/notes system**: After cooking, user can rate + add a personal note. Store in localStorage
- **Linked recipes**: "See also" connections between related dishes (e.g., Pan-Seared Steak → Café de Paris Butter)

### Priority 3 — Polish
- **Heritage filter**: Show cultural origin badge more prominently on recipe cards
- **Cook mode improvements**: Full-screen cook mode that prevents screen sleep (Wake Lock API — currently implemented but fails in some browsers)
- **Print recipe**: Printer-friendly format for recipe detail

---

## Constraints

1. **No build step** — everything must work by editing files and refreshing
2. **No external APIs** — all data is local JS files
3. **localStorage only** — no server, no accounts, no sync
4. **One HTML file** — `tub-app.html` is the app; don't split it into components
5. **Script load order matters** — roster-classes.js loads last; it filters what's active

---

## Testing

No test suite. Verify changes by:
1. Opening `http://localhost:3000/tub/tub-app.html` (or via Next.js dev server at port 3000 which redirects `/` to the TUB app)
2. Check browser console for errors (Wake Lock errors are expected/harmless)
3. Test the golden path: Library → filter → open recipe → COOK tab → STORY tab → LEARN tab → Add to shopping list → Open shopping list
4. Test mobile at 375px width

---

*Generated: 2026-07-06 | Repo: /Users/brandondienar/Projects/BachelorCookBook*
