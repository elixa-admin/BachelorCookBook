# BachelorCookBook File Structure & Architecture Guide

## Overview
This document maps every important file, folder, and its purpose. Use it to navigate the project and understand data flow.

---

## Root Directory: `/Users/brandondienar/Projects/BachelorCookBook`

### Project Configuration Files
```
├── package.json              Next.js config (legacy, not used currently)
├── next.config.ts           Redirects root → /tub/tub-app.html
├── tsconfig.json            TypeScript config (for legacy build)
├── tailwind.config.ts        Tailwind CSS config (legacy)
├── CLAUDE.md                 Project instructions (read this first)
├── HANDOVER_SESSION_20260705.md  HANDOVER DOCUMENT ← READ THIS
├── NEXT_SESSION_CHECKLIST.md     Quick-start guide for next batch
├── FILE_STRUCTURE_GUIDE.md   This file
└── README.md                 Project overview
```

### Git & Deployment
```
├── .git/                     Git repository (commits, history)
├── .vercel/                  Vercel project config
│   ├── project.json         Project ID: prj_2eP2Z8d3qahsFS5AXJrbIDt3WkFA
│   └── README.txt           Why .vercel folder exists
├── .gitignore               Files not tracked (node_modules, .env, etc.)
└── .github/                 GitHub config (if any)
```

---

## Public Directory: `/public/` — THE LIVE APP

### Main App File
```
public/
└── tub/
    ├── tub-app.html         ⭐ THE LIVE APP — single self-contained file
    │                        No build step, no framework, vanilla HTML/CSS/JS
    │                        Lines: ~1700
    │                        Contains:
    │                          - All CSS (variables, dark theme, components)
    │                          - HTML structure (nav, grid, detail panes)
    │                          - JavaScript (init, event handlers, rendering)
    │                          - Script tags loading all recipe batches
    │
    ├── tub-original.html    (Backup, original version)
    ├── chip-preview.html    (Design preview file)
    └── recipes/             ← All recipe data files
        
        ┌─ RECIPE BATCHES (main content)
        ├── batch-new-sa.js                  ⭐ NEW: 8 SA recipes (this session)
        ├── sa-heritage-batch.js             13 heritage recipes (Braai, Potjiekos, etc.)
        ├── sa-additional-batch.js           13 additional SA recipes
        ├── recipes-data.js                  32 core recipes (Bourguignon, Carbonara, etc.)
        ├── recipes-batch5.js                Foundation recipes
        ├── foundation-batch.js              More foundations
        ├── global-exotic-batch.js           9 global recipes (Thai, Indian, etc.)
        ├── premium-batch.js                 7 premium recipes
        ├── compendium-batch.js              Compendium batch
        ├── fullcook-batch.js                Full-cook formatted recipes
        │
        ┌─ STORY & CLASSIFICATION
        ├── stories.js                       Story content (existing recipes)
        ├── stories-new-sa.js                ⭐ NEW: Stories for 8 new recipes
        ├── roster-classes.js                Recipe tiers/categories (tier, cat, cut)
        │
        ┌─ SUPPORTING DATA (curriculum, skills, methods, etc.)
        ├── masterclass.js                   Masterclass content
        ├── masterclass-extra.js
        ├── courses.js                       Course definitions
        ├── curriculum.js                    Curriculum structure
        ├── skill-tiers.js                   Skill level definitions
        ├── method-timings.js                Cooking method metadata
        ├── equipment.js                     Equipment reference
        ├── regions.js                       Cuisine regions
        ├── appliances.js                    Appliance types
        ├── education-atlas.js               Educational content
        │
        ┌─ THEMING & HELPERS
        ├── themes.js                        Theme definitions
        ├── glossary.js                      Glossary entries
        ├── recipes-tips.js                  Cooking tips
        ├── substitutes.js                   Ingredient substitutions
        ├── methods.js                       Cooking methods reference
        ├── nomenclature.js                  Naming conventions
        ├── culinary-extra.js                Extra culinary data
        │
        ┌─ SPECIAL FEATURES
        ├── sa-additions.js                  Additional SA data
        ├── sa-additions-2.js                More SA data
        ├── sa-batch.js                      SA batch recipes
        ├── sa-drinks.js                     SA drinks pairings
        ├── fullcook-conversions.js          Conversion utilities
        ├── retrofit.js                      Retrofit/legacy mappings
        └── pantry-tiers.js                  ⭐ NEW: Ingredient tiers for pantry discovery
```

**Key Batches by Role:**
- **Data input:** `batch-*.js`, `sa-*-batch.js` (user-created, follow pattern)
- **Story content:** `stories*.js` (user-created, narrative text)
- **Metadata:** `roster-classes.js` (user-created, tier/category/cut flags)
- **Support:** Everything else (pre-built, rarely modified)

---

## Knowledge Base: `/knowledge/` — CANONICAL DOCUMENTATION

```
knowledge/
├── RECIPE_DEVELOPMENT_STANDARD.md ⭐ REQUIRED: Read before creating recipes
│                                 10 standards + full schema + examples
│                                 Contains: master recipe list (Batch 1-7)
│                                 Lines: 350+
│
├── PANTRY_STRATEGY.md             ⭐ NEW: Ingredient research + tier system
│                                 5-core strategy (82% coverage)
│                                 30 ingredients with full metadata
│                                 UI implementation guidance
│                                 Lines: 275+
│
├── ROADMAP.md                     Current state, what's live vs dormant
│                                 Context for major decisions
│
├── PROJECT_BRIEF.md               Positioning, voice, target audience
│                                 Why this project exists, what it means
│
├── DESIGN.md                      Color palette, typography (legacy Next.js)
│
├── index.html                     (Auto-generated navigation portal)
│
└── recipes/                       (Legacy Next.js recipes, dormant)
    ├── *.md                       Markdown versions of recipes
    └── (56 .md files, NOT maintained)
```

**Hierarchy of truth:**
1. `RECIPE_DEVELOPMENT_STANDARD.md` — governs all new recipe development
2. `PANTRY_STRATEGY.md` — governs ingredient selection & pairing
3. `tub-app.html` — the running implementation
4. Everything else — context/documentation

---

## Legacy Code: `/src/` — DORMANT (do not use)

```
src/
├── app/                     Next.js app router (legacy)
├── components/              React components (legacy)
│   ├── RecipeCard.tsx
│   ├── RecipeDetail.tsx
│   └── ...
├── lib/                     Utilities (legacy)
├── styles/                  Tailwind CSS (legacy)
├── pages/                   Next.js pages (legacy, API routes)
├── data/                    Recipe data (legacy format)
│   ├── recipes.ts
│   └── ...
│
└── .next/                   Built output (legacy, ignore)
```

**Why it's kept:**
- Historical reference
- Type definitions used by some builds
- Original architecture still visible for educational context

**Why not used:**
- TUB (`public/tub/tub-app.html`) is the live app
- Next.js build is opt-in, not the default
- Vanilla approach is lower-maintenance, faster

---

## Git Workflow: `.git/`

```
.git/
├── HEAD                    Current branch pointer
├── refs/heads/main        Main branch reference
├── objects/               All commits, trees, blobs
├── logs/                  Commit history
└── hooks/                 Git hooks (if any)

Key commits (recent):
- 8473175: feat: add 8 new SA recipes batch
- 67da4d5: feat: add pantry tiers system  
- 3e63224: docs: pantry strategy guide
- 5cb6658: fix: include NEW_BATCH_SA in recipe grid building
```

---

## Vercel Deployment: `.vercel/`

```
.vercel/
├── project.json           Project metadata
│   - projectId: prj_2eP2Z8d3qahsFS5AXJrbIDt3WkFA
│   - orgId: team_NKrIKaAio2zZxLFx7Pil3Uk5
│   - projectName: bachelorcookbook
│
└── README.txt            Explanation of .vercel folder
```

**Deployment flow:**
1. `git push origin main`
2. GitHub notifies Vercel
3. Vercel rebuilds from `main` branch
4. Output: `https://bachelorcookbook.vercel.app` (auto live in 60 seconds)

**How it works:**
- Vercel watches `main` branch
- Runs build command (if needed; static TUB doesn't need one)
- Serves `/public` as root
- TUB file lives at `/public/tub/tub-app.html` → `bachelorcookbook.vercel.app/tub/tub-app.html`

---

## Data Files: Recipe Structure & Nesting

### How Recipes Flow Through the App

```
┌──────────────────────────────────────────────────────────────┐
│ Recipe Batches (loaded in tub-app.html via <script> tags)   │
│ Each file: window.BATCH_NAME = [...]                        │
│ Contains: 5-15 recipe objects with: prov, ing, steps, wine  │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ├─ window.COMPENDIUM (lightweight)
                     ├─ window.BATCH5 (lightweight)
                     ├─ window.FOUNDATION_BATCH (lightweight)
                     ├─ window.SA_BATCH (lightweight)
                     ├─ window.SA_HERITAGE_BATCH (lightweight)
                     ├─ window.SA_ADDITIONAL_BATCH (lightweight)
                     ├─ window.NEW_BATCH_SA (FULL + lightweight)
                     ├─ window.PREMIUM_BATCH (FULL)
                     └─ window.GLOBAL_EXOTIC_BATCH (FULL)
                     │
                     └─────────────┬──────────────────┘
                                   │
              ┌────────────────────┴─────────────────┐
              │                                      │
      ┌───────▼──────┐                      ┌───────▼──────┐
      │ FULL object  │                      │ Lightweight  │
      │ (prov,       │                      │ (no cooking  │
      │  ing,        │                      │  data, card  │
      │  steps, wine)│                      │  only)       │
      └───────┬──────┘                      └───────┬──────┘
              │                                      │
              │    ┌─────────────────────────────────┤
              │    │                                  │
              └────▼──────────────────┬───────────────┘
                   │                   │
         ┌─────────▼────────────┬─────▼──────────┐
         │                      │                │
    _all array (build from      │                │
    FULL + lightweight)   Stories object    Roster Classes
         │                (RECIPE_STORIES)       (tier, cat, cut)
         │                      │                │
         └───────┬──────────────┴────────────────┘
                 │
         ┌───────▼────────────────┐
         │ R array (final, UI-    │
         │ ready; filtered by     │
         │ cut, sorted by tier)   │
         └───────┬────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
 Recipe cards         Detail pages
 (browse grid)     (full cooking data)
```

### Example: New Recipe File Structure

```javascript
// batch-new-sa.js (or any batch file)
window.NEW_BATCH_SA = [
  {
    slug: 'unique-kebab-case',
    t: 'Display Title',
    tier: 'heritage|signature|adopted|premium',
    cui: 'Region · Subregion',
    occ: ['solo', 'date', 'host'],
    time: 'XhXX min',
    method: 'Cooking Method · Style',
    diff: 'Easy|Medium|Hard',
    blurb: 'One-line card description',
    
    // Only required if prov+ing+steps present (marks as FULL)
    brief: { /* metadata for detail view */ },
    prov: { /* story fallback if no RECIPE_STORIES entry */ },
    ing: [ /* dual measurements */ ],
    steps: [ /* step-by-step instructions */ ],
    wine: [ /* pairings */ ]
  },
  // ... more recipes
];
```

### Story Files Structure

```javascript
// stories-new-sa.js (or any stories file)
window.RECIPE_STORIES = Object.assign(
  window.RECIPE_STORIES || {},
  {
    'recipe-slug-1': {
      para1: 'Origin story...',
      para2: 'Name meaning...',
      para3: 'What makes it special...',
      para4: 'Cultural context...',
      dinner_fact: 'Surprising fact for conversation.'
    },
    'recipe-slug-2': { /* ... */ },
    // ... more recipes
  }
);
```

### Classification Files Structure

```javascript
// roster-classes.js
window.ROSTER_CLASSES = {
  'recipe-slug': {
    cat: 'main|special|sweet|byo',
    tier: 'heritage|signature|adopted|premium',
    cut: false  // true = hidden from browse
  },
  // ... 147+ recipes
};
```

---

## App Initialization Flow (tub-app.html)

**Line 900+: Load recipe batches**
```html
<script src="recipes/batch-new-sa.js"></script>
<script src="recipes/sa-heritage-batch.js"></script>
<!-- ... all batches ... -->
<script src="recipes/pantry-tiers.js"></script>
```

**Line 915: Declare FULL object**
```javascript
const FULL = {
  // Initial recipe data (embedded, not from batches)
};
```

**Line 1015-1021: Merge batches into FULL**
```javascript
if(window.NEW_BATCH_SA) {
  NEW_BATCH_SA.forEach(r => {
    if(r && r.slug && r.prov && r.ing && r.steps) {
      FULL[r.slug] = r;  // Only if "cookable"
    }
  });
}
// ... repeat for all batches
```

**Line 1024: Build _all array**
```javascript
let _all = [...Object.values(FULL)];  // Start with FULL
[COMPENDIUM, BATCH5, ...].forEach(src => {
  // Add lightweight recipes not in FULL
  if(src) src.forEach(r => {
    if(r && r.slug && !FULL[r.slug]) _all.push(r);
  });
});
```

**Line 1028: Build R (final array)**
```javascript
R = _all.filter(r => {
  if(!r.slug) r.slug = slugify(r.t);
  var c = ROSTER_CLASSES[r.slug];
  return !(c && c.cut);  // Filter out cut recipes
}).sort((a,b) => {
  // Sort by tier, then name
});
```

**Line 1029: Enrich R with metadata**
```javascript
R.forEach(r => {
  var cl = ROSTER_CLASSES[r.slug] || {};
  r.tier = cl.tier || 'adopted';
  r.cat = cl.cat || 'main';
  r.tierName = TIERS2[r.tier].n;
  r.tierColor = TIERS2[r.tier].c;
  // ... more enrichment
});
```

**Line 1677: Initialize the app**
```javascript
/* init */
loadPantry(); loadFavs(); loadCooked(); loadShop(); loadPlan();
viewHead(); renderFilters(); renderGrid();
renderShopBadge(); planBadge(); observeReveal();
```

---

## Key Files to Know by Role

### If you're adding recipes:
1. **Read:** `knowledge/RECIPE_DEVELOPMENT_STANDARD.md` (schema + examples)
2. **Template:** Copy `public/tub/recipes/batch-new-sa.js`
3. **Create:** `public/tub/recipes/batch-[name].js`
4. **Create:** `public/tub/recipes/stories-[name].js`
5. **Edit:** `public/tub/recipes/roster-classes.js` (add entries)
6. **Edit:** `public/tub/tub-app.html` (add script tags + FULL merge)

### If you're modifying the UI:
1. **Edit:** `public/tub/tub-app.html` (CSS + HTML + JS, all in one file)
2. **Reference:** `knowledge/DESIGN.md` for color/type/spacing rules
3. **Reference:** `public/tub/recipes/themes.js` for theme constants

### If you're adding a feature (pantry, planner, etc.):
1. **Research:** `knowledge/PANTRY_STRATEGY.md` (if ingredient-driven)
2. **Design:** Make a quick sketch of the flow
3. **Implement:** All in `public/tub/tub-app.html`
4. **Test:** Local dev server, then Vercel

### If you're debugging:
1. **Check:** Browser console in `public/tub/tub-app.html`
2. **Inspect:** `R.length` (should be 147+)
3. **Verify:** `RECIPE_STORIES['slug']` exists
4. **Check:** `ROSTER_CLASSES['slug']` exists
5. **Search:** `public/tub/recipes/*.js` for the recipe

---

## The One File to Rule Them All

**`public/tub/tub-app.html` is the live app.**

Everything else supports it:
- Recipe batches (data)
- Stories (narrative)
- Classifications (metadata)
- Supporting helpers (themes, glossary, tips)

When you want to understand the app, start there. When you want to add recipes, use the batch pattern. When you want to change the UI, edit `tub-app.html`.

The architecture is intentionally simple: one HTML file, external data files, vanilla JavaScript. No build step, no framework, no complexity.

---

## Quick Navigation

| Task | File(s) |
|------|---------|
| Add 9 recipes | `batch-[name].js`, `stories-[name].js`, `roster-classes.js`, `tub-app.html` |
| Change colors/fonts | `tub-app.html` (CSS section, lines 1-800) |
| Fix a recipe | Find in `public/tub/recipes/batch-*.js`, edit directly |
| Add a feature | `tub-app.html` (HTML + JS) |
| Update story | `public/tub/recipes/stories-*.js` |
| Change occasion labels | `tub-app.html` (search `OCC =`) |
| Understand the schema | `knowledge/RECIPE_DEVELOPMENT_STANDARD.md` |
| Understand ingredient tiers | `knowledge/PANTRY_STRATEGY.md` |

---

**This guide is your map. Use it.**
