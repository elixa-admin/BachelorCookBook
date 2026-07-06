# The Ultimate Bachelor Cookbook — Project Guide

> "Dinner is on you." — Tagline

A sophisticated, interactive cookbook for the eligible man who cooks to impress. The site guides users through **58 carefully curated recipes** across Signature, Aspirational, Heritage, and Adopted collections. Each recipe includes step-by-step guidance, scaled servings, shopping lists, pantry-driven discovery, and drink pairings.

---

## Quick Start

### Local Development
```bash
npm install        # first time only
npm run dev
# Opens dev server on http://localhost:3000
# Site root redirects to the live app: public/tub/tub-app.html (no build step required)
```

### Project Structure
```
.
├── public/tub/
│   ├── tub-app.html                    [PRIMARY APP — single HTML file, no framework]
│   ├── recipes/                        [52 recipe & reference data files]
│   │   ├── recipes-data.js             [authored recipe collection — window.RECIPES]
│   │   ├── fullcook-conversions.js     [full-cook conversion batch]
│   │   ├── storage.js + storage-reheating.js  [window.RECIPE_STORAGE, merged]
│   │   ├── recipes-images.js           [image URL mapping]
│   │   ├── pantry-lore.js              [Pantry Secrets facts]
│   │   └── ...                         [stories, substitutes, masterclass, etc.]
│   └── data/                           [6 SA ingredient metadata files]
├── knowledge/                          [canonical source of truth — briefs, roadmap, specs]
├── docs/                               [canonical planning artifacts — see PROJECT_INDEX.html]
├── tools/                              [dev utilities]
├── src/                                [Next.js shell — root redirect → TUB app]
├── CLAUDE.md                           [project rules — read first]
├── RECIPE_STANDARDIZATION_SPEC.md      [10-section spec for recipe standardization]
└── DESIGN.md                           [legacy design doc for Next.js build]
```

---

## Architecture Overview

### Frontend (Live)
**Tech:** Vanilla HTML/CSS/JavaScript (no build step, no framework)  
**File:** `public/tub/tub-app.html` (2800+ lines, self-contained)  
**Why:** Fast, simple, zero dependencies, works offline

### Recipe Data
**Format:** JavaScript objects exported to window.RECIPES  
**Files:** 4 recipe files (recipes-data.js + 3 batches)  
**Coverage:** 58 recipes total across 4 tiers (locked collection)  
**Data flow:** HTML imports .js files → renders dynamically

### Styling System
**Colors (locked):**
- Gold: `rgba(212,175,55)` — primary accent, timelines, side elevation
- Fresh Green: `#A8D651` — Pantry Secrets, secondary accent
- Teal: `rgba(85,183,221)` — Storage sections, tertiary accent
- Wine-red: `rgba(110,30,36)` — emphasis, timeline labels, brand

**Typography (locked):**
- Oswald (headings, display)
- Inter Tight (body, UI copy)
- JetBrains Mono (timing, technical details)

**Layout (locked):**
- Section padding: 52px vertical
- Left-border accents: 2-3px
- Border radius: 8px (compact), 12px (cards)
- Grid gaps: 12-20px

---

## Current Features (Sprint 65)

### Timeline (Grouped PREP/COOK)
- ✅ Blue background for prep phase (pre-cooking)
- ✅ Gold→burgundy gradient for cook phase
- ✅ Section labels: "PREP" / "COOK"
- ✅ Time stamps and timed steps with timers
- Location: `public/tub/tub-app.html` lines 294-305 (CSS), line 2017 (function)

### Pantry Secrets
- ✅ Repositioned below "Name & Meaning" in STORY tab
- ✅ Fresh Green (#A8D651) accent styling
- ✅ Left-border editorial styling
- ✅ 40-70 word historical/cultural facts
- Location: `public/tub/tub-app.html` lines 202-208 (CSS), line 2230 (section order)

### Storage & Reheating
- ✅ 58 recipes with fridge/freezer/reheat guidance
- ✅ Tabbed interface (3 tabs per recipe)
- ✅ Consistent formatting: duration + method + warnings
- Location: `public/tub/recipes/storage-reheating.js`

### Substitutes Panel
- ✅ Card-based layout (instead of inline buttons)
- ✅ "Don't Have" option to mark ingredients unavailable
- ✅ Gold-tinted background, clean hierarchy
- Location: `public/tub/tub-app.html` lines 929-974 (CSS), 2480-2549 (JS)

### Drinks Pairing
- ✅ Properly capitalized drink names ("Wooded Chenin Blanc", "Light Lager")
- ✅ SA retail brands only (South Africa constraint)
- ✅ Non-alcoholic options available
- Location: Recipe data files + rendering in `public/tub/tub-app.html` line 2173

### Plating Guidance
- ✅ Guided list format (instead of card grid)
- ✅ Universal 4-principle grid + recipe-specific notes
- ✅ Left-border styling for visual hierarchy
- Location: `public/tub/tub-app.html` lines 541-547 (CSS), 2212 (function)

---

## Recipe Data Structure (Locked)

```javascript
{
  slug: "recipe-slug",              // unique identifier
  t: "Recipe Title",                // display title (sentence case)
  tier: "Signature",                // Signature | Aspirational | Heritage | Adopted | Component
  tierName: "Signature Collection", // display tier name
  cui: "South African",             // cuisine/origin
  diff: "Medium",                   // Novice | Capable | Chef
  method: "Stovetop",               // cooking method
  course: "Main",                   // meal course
  time: "1 hr",                     // total time
  blurb: "Short 1-liner",           // teaser for grid
  brief: {                          // "Before you start" section
    lead: "150-200 words sensory", 
    expect: [["What", "Why you'll learn it"],...],
    stats: [["~520 kcal/serving", "ENERGY"], ...],
    kit: ["equipment list"]
  },
  prov: {                           // Story/provenance
    consists_of: "Core components",
    [other fields]                  // dialect/cultural context if applicable
  },
  ing: [                            // Ingredients
    [["group-label", [[mode, base, unit, raw], ...]], ...],
    ...
  ],
  steps: [                          // Timed step-by-step (Signature only)
    ["Step name", "Why", "HH:MM", ["ing1", "ing2"], {timer: "4 min"}],
    ...
  ],
  plating: "Recipe-specific notes", // Plating principles (can be universal or custom)
  pair: [                           // Drinks pairing
    ["With steak", "Malbec", "Mendoza, Argentina", "Dark fruit..."],
    ...
  ],
  image: "url-from-recipes-images.js"
}
```

**Field order is locked.** Do not reorder or add new fields without updating RECIPE_STANDARDIZATION_SPEC.md.

---

## Recipe Tiers (Content Depth)

| Tier | Count | Story | Ingredients | Steps | Storage | Pairing | Notes |
|------|-------|-------|-------------|-------|---------|---------|-------|
| Signature | 8 | 200+ words | 3-4 groups | 8-12 timed | Detailed | 3-4 options | Premium, foundational techniques |
| Aspirational | 12 | 150+ words | 2-3 groups | Brief only | Category default | 2-3 options | Intermediate, special occasion |
| Heritage | 27 | 150+ words | 2-3 groups | Brief only | Category default | 2-3 options | Cultural/SA authentic |
| Adopted | 12 | 80+ words | 1-2 groups | Brief only | Category default | 1-2 options | International favorites |
| Component | 13 | 50+ words | 1 group | Brief only | N/A | 1 option | Sides, components, basics |

---

## Voice Guidelines (Locked, Immutable)

**Core voice: Warm Premium**  
Sensory, unhurried, assured. Atmosphere over punch.

**Rules:**
- ✅ Sensory language (taste, texture, aroma, appearance)
- ✅ Cultural/historical context (respect origins)
- ✅ Why it matters (to cook or diner)
- ✅ Never instructional ("Learn to make..." ❌)
- ✅ 80-150 words for story (prov)
- ✅ 40-70 words for Pantry Secrets
- ❌ No sad-solo framing ("you deserve" ❌)
- ❌ No pity ("consolation" ❌)

**Example:**
> "Risotto Milanese is the soul of Lombardy's cooking — saffron-kissed rice, creamy and luxurious, built on stock and patience. It's not just a dish; it's ritual. The constant stirring, the gradual coax of starch into creaminess, is how you honor the technique. Best served fresh, fragrant, to someone worth the effort."

---

## Next Phase: Recipe Standardization

**Status:** Queued (task_d3082ab3, ready for autonomous execution)

**Scope:** Audit and standardize all 58 recipes across story depth, pantry secrets, storage, images, and function format.

**Execution plan:** 5 phases (50-80k tokens, 3-5 sessions)
1. **Phase A:** Comprehensive audit (8-10k tokens)
2. **Phase B:** Tier-based standardization by depth (30-50k tokens)
3. **Phase C:** Pantry Secrets expansion to all 58 recipes (5-8k tokens)
4. **Phase D:** Image standardization for theme consistency (6-10k tokens)
5. **Phase E:** Polish & final verification (3-5k tokens)

**Detailed spec:** See `RECIPE_STANDARDIZATION_SPEC.md`

---

## Development Workflow

### Testing a Recipe Change
```bash
npm run dev
# Then in browser:
1. Navigate to the recipe
2. Verify story reads naturally (sensory, cultural context)
3. Check storage tabs (if recipe has storage data)
4. Verify Pantry Secrets displays (Fresh Green styling)
5. Check images load with dark-moody theme
6. Test substitutes panel, drinks pairing, plating
7. Test scaling (1/2/4/6 servings)
8. Test shopping list feature
```

### Adding Storage to a Recipe
```javascript
// In storage-reheating.js, add:
"recipe-slug": {
  fridge: "<b>Up to X days</b> in [container]. [Details]",
  freezer: "<b>Up to X months</b> — [Notes] OR 'Not recommended'",
  reheat: "[Method], [temp/time]. <b>[Critical warning]</b>"
}
```

### Committing Changes
```bash
git add [files]
git commit -m "feat|fix|docs: [SCOPE] [description]"
# Example: "feat: standardize Signature recipes (risotto, steak, carbonara)"
```

---

## Known Gaps

| Gap | Coverage | Next Steps |
|-----|----------|-----------|
| Timed cooks | 1/8 Signature | Add 7 more timed recipes (Phase B) |
| Storage | 58/58 recipes | Complete (merging fix applied) |
| Images | ~56% | Source 40+ missing images (Phase D) |
| Pantry Secrets | Most recipes | Verify full coverage in Phase A audit |
| Drinks pairing | All recipes | SA constraint enforcement (background task) |

---

## Key Files for Continuation

**Must read first:**
- `CLAUDE.md` — Project rules (read first; TUB banner up top)
- `docs/CURRENT_SPRINT.md` — What just shipped + next action
- `docs/BUILD_PHASE_BEACON.md` — Build/deploy health
- `knowledge/PROJECT_BRIEF.md` — Immutable voice/design rules

**Reference during work:**
- `RECIPE_STANDARDIZATION_SPEC.md` — The execution blueprint
- `docs/NEXT_3_SPRINTS_PLAN.md` — Forward content-depth roadmap
- `public/tub/recipes/recipes-data.js` — Recipe data structure
- `public/tub/tub-app.html` — Live app (read sections as needed)

**Test against:**
- Browser preview (`npm run dev`)
- The 58 active recipe pages

---

## Handoff & Continuation

**For the next agent/session:**
1. Read `docs/CURRENT_SPRINT.md` (latest state + next action)
2. Read `docs/CROSS_PLATFORM_HANDOFF_CONTRACT.md` (authority + handoff format)
3. Follow `RECIPE_STANDARDIZATION_SPEC.md` (execution blueprint)
4. Start with Phase A (audit) or jump to tier-based work per `docs/NEXT_3_SPRINTS_PLAN.md`
5. Test in preview server after every 2-3 recipe updates
6. Commit frequently with clear messages
7. Reference voice/design rules in `knowledge/PROJECT_BRIEF.md` (locked)

**All specifications, file locations, and success criteria documented.** Ready for continuation.

---

## Support

- **Project index:** `docs/PROJECT_INDEX.html` (generated portal)
- **Git history:** `git log --oneline` for prior decisions
- **Design reference:** `DESIGN.md` (legacy, for reference)
- **Voice reference:** `knowledge/PROJECT_BRIEF.md` (LOCKED)
- **Standardization spec:** `RECIPE_STANDARDIZATION_SPEC.md` (detailed)

---

**Last updated:** 2026-07-06 (Sprint 66 — baseline standardization complete)  
**Status:** Production-ready, verified, deploying to main  
**Ready for:** Content-depth roadmap (see `docs/NEXT_3_SPRINTS_PLAN.md`)
