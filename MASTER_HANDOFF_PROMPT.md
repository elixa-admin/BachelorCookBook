# Master Handoff Prompt — The Ultimate Bachelor Cookbook
## For Cross-Platform AI Execution (AntiGravity, Z.AI, Claude, etc.)

**Last Updated:** 2026-07-06  
**Project Status:** Production-ready, tested, deployed  
**Next Phase:** Recipe standardization & content depth expansion  

---

## EXECUTIVE SUMMARY

You are inheriting **The Ultimate Bachelor Cookbook** — a sophisticated, interactive single-page app (no build step, no framework) that serves 72 carefully curated recipes across 4 tiers: Signature, Aspirational, Heritage, and Adopted.

**Current State:**
- ✅ Live production app at `public/tub/tub-app.html` (2800+ lines, self-contained)
- ✅ 72 recipes with full ingredient lists, step-by-step guidance, shopping lists, meal planner, pantry-driven discovery
- ✅ 58 recipes with storage/reheating guidance
- ✅ All major features live: timeline, substitutes/adapts panel, drinks pairing, plating guidance, story/provenance
- ✅ Design system locked (colors, typography, layout spacing)
- ✅ Theme: Dark & Moody (wine-red/gold/teal/fresh-green editorial aesthetic)
- ✅ Voice: Warm Premium (sensory, unhurried, never instructional)

**Your mission:** Execute Recipe Standardization Phase (Phase A–E, estimated 50-80k tokens, 3–5 sessions).

---

## FOLDER & FILE STRUCTURE

### Core Application
```
public/tub/
├── tub-app.html                   ← PRIMARY APP FILE (2800+ lines, self-contained)
│   ├── Lines 1-200: CSS variables & color system (LOCKED)
│   ├── Lines 202-208: Pantry Secrets .dsection--lore styling (Fresh Green #A8D651)
│   ├── Lines 294-305: Timeline CSS (Option 1: grouped PREP/COOK)
│   ├── Lines 929-974: Substitutes panel CSS (card-based layout)
│   ├── Lines 541-547: Plating section styling
│   ├── Lines 2017: timelineHTML() function (renders grouped phases)
│   ├── Lines 2173-2181: Drinks pairing rendering (capitalized)
│   ├── Lines 2212: plateHTML() function (plating list format)
│   ├── Lines 2230: STORY tab section order (reordered for Pantry Secrets)
│   ├── Lines 2480-2549: Substitutes swapInSitu() function (card layout)
│   ├── Lines 2885-2891: capitalizeWords() utility function
│   └── Window objects: RECIPES, PANTRY_LORE, SUBS, COCKTAILS, RETAILERS
└── recipes/
    ├── recipes-data.js            ← 32 Signature + Aspirational recipes (window.RECIPES)
    ├── fullcook-conversions.js    ← 27 Heritage recipes
    ├── sa-additions-2.js          ← 13 SA Heritage recipes
    ├── storage-reheating.js       ← Storage/reheating guidance for 58 recipes
    ├── recipes-images.js          ← Image URL mapping for 72 recipes
    ├── substitutes.js             ← Ingredient alternatives (window.SUBS)
    ├── cocktails.js               ← Cocktail recipes for pairings (window.COCKTAILS)
    └── retailers.js               ← SA retail sources
```

### Documentation & Config
```
.
├── CLAUDE.md                      ← Project rules & AI Agent OS (read FIRST)
├── RECIPE_STANDARDIZATION_SPEC.md ← Execution blueprint (10 sections, locked)
├── HANDOVER_SPRINT_65.md          ← Latest sprint summary & file locations
├── README.md                      ← Project architecture & development workflow
├── MASTER_HANDOFF_PROMPT.md       ← THIS FILE
├── knowledge/
│   ├── ROADMAP.md                 ← Strategic direction & session history
│   ├── PROJECT_BRIEF.md           ← Voice, positioning, design rules (IMMUTABLE)
│   └── recipes/                   ← Legacy recipe markdown (reference only)
└── .claude/
    └── projects/
        └── -Users-brandondienar-Projects-BachelorCookBook/
            └── memory/
                ├── MEMORY.md                      ← Session memory index
                └── sprint_65_complete.md          ← Latest sprint completion notes
```

---

## THEME & DESIGN SYSTEM (LOCKED, IMMUTABLE)

### Color Palette (CSS Variables)
```css
/* Primary Brand Colors */
--gold: rgba(212, 175, 55)           /* Primary accent, timelines, side elevation */
--fresh-green: #A8D651               /* Pantry Secrets secondary accent */
--teal: rgba(85, 183, 221)            /* Storage sections tertiary accent */
--wine-red: rgba(110, 30, 36)         /* Emphasis, timeline labels, brand identity */
--dark-bg: #0a0a0a                    /* Main background */
--surface-1: #1a1a1a                  /* Card/section backgrounds */
--text-primary: #ffffff               /* Body text */
--text-secondary: #b0b0b0             /* Secondary text */
--border: rgba(255, 255, 255, 0.1)    /* Subtle borders */
```

### Typography (LOCKED)
- **Display/Headings:** Oswald (weights: 400, 500, 700)
- **Body/UI Copy:** Inter Tight (weights: 400, 500, 600)
- **Technical/Timing:** JetBrains Mono (monospace for precision)
- **Editorial Serif:** (for Pantry Secrets quotations, if applicable)

### Layout Spacing (LOCKED)
- Section padding: 52px vertical
- Left-border editorial accents: 2–3px
- Border radius: 8px (compact components), 12px (cards)
- Grid gaps: 12–20px
- Card hover: +4px drop shadow, background color shift to `surface-1`

### Theme Application
- All `.dsection` (recipe section) elements must adhere to spacing rules
- Left-border colors rotate: wine-red → fresh-green → teal → wine-red (repeating pattern)
- No element should break the dark-moody editorial aesthetic
- Images must match dark-moody theme (warm, intimate lighting; avoid bright/clinical)

---

## RECIPE DATA STRUCTURE (LOCKED)

### Standard Recipe Object
```javascript
{
  slug: "recipe-slug",              // unique kebab-case identifier
  t: "Recipe Title",                // display title (sentence case, no all-caps)
  tier: "Signature",                // [Signature|Aspirational|Heritage|Adopted|Component]
  tierName: "Signature Collection", // display tier name
  cui: "South African",             // cuisine/origin
  diff: "Medium",                   // [Novice|Capable|Chef]
  method: "Stovetop",               // cooking method
  course: "Main",                   // meal course
  time: "1 hr",                     // total time
  blurb: "Short 1-liner",           // teaser for grid card
  brief: {                          // "Before you start" section
    lead: "150-200 words sensory", 
    expect: [["What", "Why"], ...],
    stats: [["~650 kcal", "ENERGY"], ...],
    kit: ["equipment list"]
  },
  prov: {                           // Story/provenance section
    consists_of: "Core components",
    [other fields per recipe]       // dialect, cultural notes
  },
  ing: [                            // Ingredients (2D array of groups)
    [["group-label", [[mode, base, unit, raw], ...]], ...],
  ],
  steps: [                          // Timed steps (Signature only, 8-12 steps)
    ["Step name", "Why", "HH:MM", ["ing1", "ing2"], {timer: "4 min"}],
  ] OR "brief",                     // non-Signature use "brief" string
  plating: "Recipe-specific or universal notes",
  pair: [                           // Drinks pairing (3-4 for Signature, 2-3 for others)
    ["With steak", "Malbec", "Mendoza, Argentina", "Dark fruit notes"],
  ],
  image: "url-from-recipes-images.js"
}
```

### Field Order (MUST BE MAINTAINED)
`slug` → `t` → `tier` → `tierName` → `cui` → `diff` → `method` → `course` → `time` → `blurb` → `brief` → `prov` → `ing` → `steps` → `plating` → `pair` → `image`

**Do NOT add new fields without updating RECIPE_STANDARDIZATION_SPEC.md Section 6.**

---

## IMAGE LOCATIONS & SOURCING

### Current Status
- ~56% of recipes have images (41/72 complete)
- All existing images stored via recipe-images.js (window mapping)
- Images are external URLs (not committed to repo)

### Image Requirements (LOCKED)
- **Dimensions:** 600px width minimum
- **Aspect ratio:** 16:9 landscape (preferred) or 4:3
- **Aesthetic:** Dark-moody, warm lighting (candlelit or golden-hour)
- **Avoid:** Bright/white backgrounds, clinical plating, artificial light
- **Theme:** Wine-red/gold editorial aesthetic (matches app colors)

### Adding New Images
1. Source high-quality dark-moody images matching theme
2. Add URL to `recipes-images.js` mapping
3. Link recipe slug → URL in the mapping
4. Test on recipe detail page to verify load and theme match

### Current Image Mapping
See `public/tub/recipes/recipes-images.js` for complete list. Structure:
```javascript
window.RECIPE_IMAGES = {
  "recipe-slug": "https://image-url",
  ...
}
```

---

## VOICE & CONTENT STANDARDS (LOCKED, IMMUTABLE)

### Core Voice: Warm Premium
- Sensory, unhurried, assured
- Atmosphere over punch
- Cultural/historical respect
- Why it matters (to cook or diner)

### Story/Provenance (prov field)
- **Word count:** 80–150 words (Signature), 150+ words (Aspirational/Heritage), 80+ (Adopted), 50+ (Component)
- **Tone:** Warm, sensory, never instructional
- **Structure:** [Opening context] — [Cultural/historical significance] — [Why it matters] — [Sensory/emotional note]
- **Example:** "Risotto Milanese is the soul of Lombardy's cooking — saffron-kissed rice, creamy and luxurious, built on stock and patience. It's not just a dish; it's ritual. The constant stirring, the gradual coax of starch into creaminess, is how you honor the technique. Best served fresh, fragrant, to someone worth the effort."

### Pantry Secrets / Did You Know (PANTRY_LORE)
- **Word count:** 40–70 words
- **Tone:** Historical/cultural, surprising, credible
- **Structure:** [Ingredient/technique] was historically [fact] — [cultural context] — [relevance]
- **Example:** "In the 19th century, vinegar was a popular cosmetic. Women drank diluted vinegar to achieve a pale, delicate, 'romantic' complexion, which was the beauty standard of the era."
- **Format:** "**Did you know?** [fact]"

### Storage Guidance (storage-reheating.js)
- **Fridge:** `<b>Up to X days</b> in [container]. [Key condition]`
- **Freezer:** `<b>Up to X months</b> — [Quality note] OR 'Not recommended'`
- **Reheat:** `[Method], [temp/time]. <b>[Critical warning if applicable]</b>`

### Drinks Pairing (SA Constraint)
- **Brands only:** South African retail brands (available through most major retailers)
- **Non-alcoholic:** Include coffee, tea, masala chai, etc. (especially for breakfast/dessert)
- **Cocktails:** Include full recipe if suggesting a mixed drink
- **Capitalization:** Proper sentence case ("Wooded Chenin Blanc", "Light Lager")

### Plating Guidance (plating field)
- **Format:** List (not cards) with left-border styling
- **Structure:** Universal 4-principle grid + recipe-specific notes
- **Examples:** "Elevate with...", "Plate on...", "Finish with..."
- **Avoid:** Generic "Complete the plate" if not in original recipe

---

## RECIPE TIERS & CONTENT DEPTH

| Tier | Count | Story | Ingredients | Steps | Storage | Pairing | Notes |
|------|-------|-------|-------------|-------|---------|---------|-------|
| **Signature** | 8 | 200+ words | 3-4 groups | 8-12 timed | Detailed | 3-4 options | Premium, foundational techniques, showstoppers |
| **Aspirational** | 12 | 150+ words | 2-3 groups | Brief only | Category default | 2-3 options | Intermediate, special occasion |
| **Heritage** | 27 | 150+ words | 2-3 groups | Brief only | Category default | 2-3 options | Cultural/SA authentic, family recipes |
| **Adopted** | 12 | 80+ words | 1-2 groups | Brief only | Category default | 1-2 options | International favorites |
| **Component** | 13 | 50+ words | 1 group | Brief only | N/A | 1 option | Sides, breads, basics |

---

## EXECUTION ROADMAP: RECIPE STANDARDIZATION (Phases A–E)

**Queued Task ID:** task_d3082ab3  
**Total Estimated Cost:** 50–80k tokens  
**Duration:** 3–5 sessions (parallel phases recommended)

### Phase A: Audit (8–10k tokens)
**Goal:** Identify gaps across all 72 recipes

**Deliverables:**
- [ ] Comprehensive gap report (missing fields, word counts off, image coverage)
- [ ] Recipe list by standardization need (tier-wise)
- [ ] Storage coverage status (58/72 complete)
- [ ] Timed cooks status (1/8 Signature complete)
- [ ] Pantry Secrets coverage (seeded but incomplete)

**Key Files to Audit:**
- `public/tub/recipes/recipes-data.js` (Signature + Aspirational)
- `public/tub/recipes/fullcook-conversions.js` (Heritage)
- `public/tub/recipes/sa-additions-2.js` (SA Heritage)
- `public/tub/recipes/storage-reheating.js` (storage status)

**Success Criteria:**
- [ ] All 72 recipes have been scanned for completeness
- [ ] Audit report broken down by tier and standardization need
- [ ] Prioritized list generated for Phases B-E

---

### Phase B: Tier-Based Standardization (30–50k tokens)
**Goal:** Standardize all 72 recipes to content depth per tier

**Execution Order:**
1. **Signature tier (8 recipes)** — 3-4k tokens per recipe
   - Deep story/prov overhaul (200+ words, sensory, warm premium voice)
   - Timed steps verification (7 more timed recipes needed; steak done)
   - Premium imagery sourcing
   - Drinks pairing review (3-4 options, SA brands)
   - Storage guidance (detailed per recipe)

2. **Aspirational tier (12 recipes)** — 2-3k tokens per recipe
   - Story/prov review + enhancement (150+ words)
   - Drinks pairing review (2-3 options)
   - Image sourcing/verification
   - Storage: apply category defaults

3. **Heritage tier (27 recipes)** — 1-2k tokens per recipe
   - Story/prov consistency check (150+ words)
   - Storage: apply category defaults
   - Image verification (dark-moody theme match)
   - Pantry Secrets coverage

4. **Adopted + Component (25 recipes)** — 0.5-1k tokens per recipe
   - Field order standardization
   - Storage/pairing completeness
   - Brief field depth check (80+ words Adopted, 50+ Component)

**Key Decisions:**
- Signature recipes are premium content (invest heavily in story, timed steps, imagery)
- Heritage recipes authenticate SA cooking (respect cultural context, prioritize provenance)
- Adopted recipes are accessible entry points (lean on voice, not complexity)
- Component recipes are foundations (brief but complete)

**Testing Workflow per Recipe:**
1. Update recipe in data file
2. Test in preview: `npm run dev`
3. Verify story reads naturally (sensory, warm premium voice)
4. Check storage tabs render correctly
5. Verify image loads and matches theme
6. Verify drinks pairing capitalization and SA constraint
7. Test substitutes/adapts panel for accuracy
8. Verify no HTML rendering errors
9. Commit with clear message: `feat: standardize [TIER] recipes ([list])`

**Success Criteria:**
- [ ] All Signature stories 200+ words, sensory, warm premium
- [ ] All 8 Signature recipes have timed steps (7 remaining)
- [ ] All 72 recipes have unique Pantry Secrets (40-70 words)
- [ ] All storage guidance consistent and complete
- [ ] Depth progression visible: Signature > Aspirational > Heritage > Adopted
- [ ] All recipes render without errors

---

### Phase C: Pantry Secrets Expansion (5–8k tokens)
**Goal:** Generate 72 unique historical/cultural facts (one per recipe)

**Sourcing Approach:**
- Research ingredient/technique origin and cultural significance
- Verify facts against credible sources
- Match to main ingredient or central technique
- Format consistently: "**Did you know?** [fact]"
- Add to window.PANTRY_LORE object in tub-app.html

**Content Standard:**
- 40–70 words each
- Historical or cultural angle (not just nutritional)
- Surprising but credible
- Relevant to cook or diner
- Tie to recipe's core ingredient or technique

**Success Criteria:**
- [ ] 72 unique facts written and verified
- [ ] All formatted consistently
- [ ] All display correctly in STORY tab (below Name & Meaning)
- [ ] Fresh Green styling applied (already done)
- [ ] Word counts within 40-70 word range

---

### Phase D: Image Standardization (6–10k tokens)
**Goal:** Source and verify 72 images matching dark-moody theme

**Approach:**
1. Audit current image URLs in recipes-images.js (41/72 complete)
2. Source 31 missing images:
   - Search high-quality dark-moody recipe photography
   - Verify theme match (wine-red/gold editorial aesthetic)
   - Check dimensions (600px+ width)
   - Test load on recipe detail page
3. Update recipes-images.js with new URLs

**Image Standards (LOCKED):**
- Minimum 600px width
- Aspect ratio: 16:9 (preferred) or 4:3
- Dark-moody lighting (candlelit, golden-hour, intimate)
- Wine-red/gold/teal color harmony
- No bright/white backgrounds, no clinical plating, no artificial light

**Testing Workflow:**
1. Update URL in recipes-images.js
2. Reload preview (no build step)
3. Verify image loads, displays without distortion
4. Verify theme consistency (dark moody, warm lighting)
5. Commit with: `feat: add images for [recipes]`

**Success Criteria:**
- [ ] 72/72 recipes have high-quality images
- [ ] All images match dark-moody theme
- [ ] 600px minimum width verified
- [ ] All images load without errors
- [ ] Recipe detail pages display images correctly

---

### Phase E: Polish & Verification (3–5k tokens)
**Goal:** Final consistency sweep and quality assurance

**Checklist:**
- [ ] Voice audit: all story/prov follows warm premium standard (never instructional)
- [ ] Depth verification: Signature > Aspirational > Heritage > Adopted progression clear
- [ ] Storage formatting: all 72 recipes have fridge/freezer/reheat guidance
- [ ] Pantry Secrets: 72 unique facts, properly formatted, displaying
- [ ] Images: 72/72 complete, theme consistent, loading correctly
- [ ] Drinks pairing: capitalized, SA brands only, non-alcoholic for breakfast/dessert
- [ ] No typos, no HTML rendering errors, no missing fields
- [ ] All recipes render without console errors (Wake Lock permission errors OK)
- [ ] Navigation works site-wide (back button, filters, search)
- [ ] Theme consistency verified (colors, typography, spacing)

**Final Testing:**
1. Navigate through all 72 recipes (sample each tier)
2. Test all filters (Collection, Type, Skill, Region)
3. Test search function
4. Test shopping list, meal planner, pantry-driven discovery
5. Verify no functionality broken
6. Test on mobile (responsive view)
7. Take final screenshot portfolio

**Success Criteria (Recipe Standardization Complete):**
- [ ] All 72 recipes complete with consistent structure
- [ ] Story/prov: 200+ (Signature), 150+ (Aspirational/Heritage), 80+ (Adopted), 50+ (Component)
- [ ] Pantry Secrets: 72 unique facts, 40-70 words each
- [ ] Storage: 72/72 complete (fridge/freezer/reheat)
- [ ] Images: 72/72 complete, dark-moody theme verified
- [ ] Drinks pairing: capitalized, SA constraint enforced, non-alcoholic options included
- [ ] Voice audit: warm premium, sensory, never instructional
- [ ] No errors, all functionality working site-wide
- [ ] Production-ready, tested, committed to main branch

---

## DEVELOPMENT WORKFLOW

### Prerequisites
```bash
npm install
npm run dev  # Runs on http://localhost:3000
```

### Testing Recipe Change
1. Edit recipe data file (`recipes-data.js`, `fullcook-conversions.js`, `sa-additions-2.js`, etc.)
2. Save file (HMR reloads automatically)
3. Navigate to recipe in browser
4. Verify:
   - Story reads naturally (sensory, cultural context)
   - Storage tabs populated (if applicable)
   - Pantry Secrets displays (Fresh Green styling)
   - Images load with dark-moody theme
   - Substitutes panel works
   - Drinks pairing capitalized
   - Plating list format displays
   - Scaling (1/2/4/6 servings) works
   - Shopping list updates
5. Check browser console for errors (only Wake Lock warnings expected)

### Adding Storage to a Recipe
```javascript
// In storage-reheating.js:
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

# Examples:
git commit -m "feat: standardize Signature recipes (risotto, steak, pasta-carbonara)"
git commit -m "feat: add pantry secrets for Heritage tier"
git commit -m "feat: add images for 15 recipes"
```

### Preview Deployment
```bash
# When ready to deploy dev instance:
git checkout -b dev
git push origin dev
# Vercel auto-deploys (check Vercel dashboard)
```

---

## KNOWN GAPS & CONSTRAINTS

### Incomplete Work
| Item | Coverage | Phase | Priority |
|------|----------|-------|----------|
| Timed cooks | 1/8 Signature | B | High |
| Storage | 58/72 recipes | B | High |
| Pantry Secrets | Partial | C | Medium |
| Images | 41/72 complete | D | Medium |
| Drinks pairing | All recipes | B | Medium (SA constraint) |

### Design Frozen
- **Color palette:** No changes. Use exact RGB values (gold rgba(212,175,55), fresh-green #A8D651, teal rgba(85,183,221), wine-red rgba(110,30,36))
- **Typography:** No changes. Oswald/Inter Tight/JetBrains Mono locked
- **Layout spacing:** No changes. 52px padding, 2-3px borders, 8-12px radius locked
- **Voice:** No changes. Warm Premium, sensory, never instructional — immutable

### Recipe Data Structure
- Field order locked (do not reorder or add fields)
- All 72 recipes must follow exact structure
- No dead code or unused fields

---

## CRITICAL FILE REFERENCES

**Must read first:**
- `RECIPE_STANDARDIZATION_SPEC.md` — The execution blueprint (10 sections)
- `knowledge/PROJECT_BRIEF.md` — Voice/design rules (LOCKED, immutable)
- `HANDOVER_SPRINT_65.md` — Latest sprint summary

**Reference during work:**
- `CLAUDE.md` — Project rules & AI Agent OS
- `public/tub/recipes/storage-reheating.js` — Storage template
- `public/tub/recipes/recipes-data.js` — Recipe data structure
- `public/tub/tub-app.html` — Live app (read sections as needed)

**Test against:**
- Browser preview (npm run dev)
- All 72 recipe pages
- Navigation, filters, search
- Mobile responsive view

---

## TESTING CHECKLIST (Before Declaring Complete)

### Navigation ✅
- [ ] TUB home button returns to grid
- [ ] Collection filters work (All, Heritage, Adopted, Aspirational, Component)
- [ ] Type filters work (Mains, Special evening, Baked & sweet)
- [ ] Skill filters work (Novice, Capable, Chef)
- [ ] Region filters work (S.Asian, E/SE Asian, African, Americas, Mid-East, Med, European)
- [ ] Search works (type recipe name, filter results)
- [ ] Back button on recipe detail returns to grid
- [ ] Heart/favorite button toggles
- [ ] Tabs (COOK, STORY, LEARN) switch correctly

### Functionality ✅
- [ ] All 72 recipes render without errors
- [ ] Ingredients display correctly
- [ ] Scaling works (1/2/4/6 servings)
- [ ] Shopping list builds and updates
- [ ] Substitutes/adapts panel works (card layout, "Don't Have" option)
- [ ] Drinks pairing displays (capitalized, SA brands)
- [ ] Storage tabs populate (fridge/freezer/reheat)
- [ ] Timeline displays (blue PREP, gold/rust COOK)
- [ ] Plating list displays (left-border styling)
- [ ] Pantry Secrets displays (Fresh Green, positioned below Name & Meaning)
- [ ] Story/provenance reads naturally (sensory, warm premium voice)

### Theme Alignment ✅
- [ ] Dark background (#0a0a0a) applied
- [ ] Wine-red accents (rgba(110,30,36)) on labels, buttons, CTAs
- [ ] Gold accents (rgba(212,175,55)) on timelines, side elevation
- [ ] Fresh Green (A8D651) on Pantry Secrets
- [ ] Teal (rgba(85,183,221)) on Storage sections
- [ ] Oswald font on headings
- [ ] Inter Tight on body text
- [ ] JetBrains Mono on timing/technical text
- [ ] 52px section padding consistent
- [ ] 2-3px left borders on sections
- [ ] 8-12px border radius on cards
- [ ] Images match dark-moody theme (warm lighting, no clinical aesthetics)

### Console/Errors ✅
- [ ] No functional errors (only Wake Lock permission warnings expected)
- [ ] All network requests successful (images load)
- [ ] No 404 errors on recipe resources
- [ ] No HTML rendering errors

---

## DEPLOYMENT WORKFLOW

### Dev Instance (Staging)
1. Create `dev` branch from `main`
2. Push to GitHub: `git push origin dev`
3. Vercel auto-deploys (watch dashboard)
4. Test staging URL (provided by Vercel)
5. Verify all functionality works on staging
6. Report URL and testing results

### Production (Main Branch)
1. Complete all testing on `dev`
2. Create pull request: `dev` → `main`
3. Verify CI checks pass
4. Merge PR
5. Vercel auto-deploys to production
6. Verify production URL

### Git Workflow (Standard)
```bash
# For each phase:
git checkout -b standardization/phase-[A-E]
git add [files]
git commit -m "feat: [description]"
git push origin standardization/phase-[A-E]
git pull request (GitHub CLI: gh pr create)
# After merge, delete branch
git branch -d standardization/phase-[A-E]
```

---

## SUCCESS METRICS

**Phase A Complete:**
- ✅ Comprehensive audit report generated
- ✅ Gaps identified by tier and recipe
- ✅ Prioritized list for Phases B-E
- ✅ No anomalies in recipe structure

**Phase B Complete:**
- ✅ All 72 recipes standardized to tier-appropriate depth
- ✅ Signature tier: 200+ word stories, timed steps, premium imagery
- ✅ Aspirational tier: 150+ word stories, 2-3 drinks pairings
- ✅ Heritage tier: 150+ word stories, cultural context preserved
- ✅ Adopted/Component tiers: 80+/50+ word stories, complete fields
- ✅ All storage guidance complete and formatted
- ✅ Drinks pairing capitalized and SA-constrained

**Phase C Complete:**
- ✅ 72 unique Pantry Secrets facts written
- ✅ All 40-70 words, historically/culturally sourced
- ✅ All display correctly with Fresh Green styling
- ✅ Positioned below Name & Meaning in STORY tab

**Phase D Complete:**
- ✅ 72/72 recipes have high-quality images
- ✅ All images match dark-moody theme (wine-red/gold/teal aesthetic)
- ✅ 600px+ width verified
- ✅ All images load without errors on recipe detail pages

**Phase E Complete:**
- ✅ Voice audit: all stories warm premium, never instructional
- ✅ Depth progression visible: Signature > Aspirational > Heritage > Adopted
- ✅ All functionality works site-wide (navigation, filters, search, shopping list, etc.)
- ✅ No console errors (Wake Lock warnings only)
- ✅ All 72 recipes tested and verified
- ✅ Theme consistency verified across all pages
- ✅ Production-ready, committed to main, ready for deployment

---

## HANDOFF COMPLETE

**All specifications, file locations, and success criteria documented above.**

**Ready for autonomous execution.** Pick up at Phase A and proceed through Phase E using this master prompt as your specification bible.

**Questions?** Reference:
- RECIPE_STANDARDIZATION_SPEC.md (detailed standards)
- HANDOVER_SPRINT_65.md (latest sprint state)
- knowledge/PROJECT_BRIEF.md (voice/design rules)
- CLAUDE.md (project rules & AI Agent OS)

---

**Last Status:** Production-ready, tested, deployed  
**Next Agent:** Start with Phase A Audit → Proceed through Phase E  
**Estimated Timeline:** 50-80k tokens, 3-5 sessions (parallel phases recommended)
