# The Ultimate Bachelor Cookbook — Master Roadmap

> **Consolidated source-of-truth roadmap** synthesizing current state, full feature roadmap, execution order, and the tub-cookbook divergence analysis. This is THE roadmap going forward.

## SESSION UPDATE (2026-07-04): critical bugs fixed, recipe count reconciled, RECIPE_REVIEW.md pruning question resolved

**Two bugs were making the live site far less functional than it appeared in review:**
1. A line in `tub-app.html` used smart/curly quotes (`'pantry'`) instead of
   straight quotes as JS string delimiters. That's a syntax error, and a syntax
   error anywhere in a `<script>` block prevents the whole block from parsing —
   so every click handler, tab, and render function was silently undefined.
   Recipe data loaded (from a separate file), but nothing was clickable.
2. An extra closing `</div>` in the recipe detail template closed the Cook tab's
   pane early, leaking the full step-by-step method into the Story and Learn
   tabs on every recipe.

Both fixed. Also fixed in the same pass: Shopping List and Meal Planner had no
default `display:none` (unlike Detail/Methods/Cook, which all follow that
pattern) and rendered permanently in-page below the recipe grid instead of as
overlays; Surprise Me silently did nothing when invoked from the Skill Path
tab; the mobile search box overflowed the viewport at narrow widths.

**Recipe count reconciled — the "146 dishes" figure was stale.** Actual live
roster before this session: 83 (verified by replicating the browser's exact
script-load order and merge/cut logic in Node, not by reading claims). Two
independent problems were suppressing content:
- `fullcook-conversions.js` referenced `FULLCOOK_CONV` before ever declaring
  it (missing the `window.` prefix every other batch file uses), throwing a
  `ReferenceError` on every load and silently dropping the 27 recipes inside
  it. Fixed — one-line prefix fix.
- 162 step explanations across 32 recipes had a redundant `"WHY:"`/`"Why "`
  prefix baked into the stored text, which doubled up with the UI's own bold
  WHY label. Stripped programmatically, verified zero remaining.
- 78 recipes were flagged `cut:true` in `roster-classes.js`. Cross-referencing
  against `tub-import/RECIPE_REVIEW.md` (which proposed pruning the roster to
  83 "proper meals," cutting 63 non-meals + 3 duplicates) showed the cut set
  didn't match that proposal — it had also swept up genuine proper-meal mains
  that review explicitly listed to *keep* (Beef Wellington, Mussakhan, Bibimbap,
  Dan Dan Noodles, Palak Paneer, Malai Kofta, Borscht, Bouillabaisse, Banh Mi,
  Char Siu Pork, plus older Signature-tier mains like Beef Bourguignon, Beef
  Rendang, Peking Duck). 34 of the 78 had complete ingredients + steps sitting
  unused; restored them. Live roster: **117**, all full-cook.
- This resolves the "pending content-pruning sign-off" item noted below —
  decision: don't prune to 83; the review's own classification shows most of
  what was cut belongs in the book.

**Known gap surfaced, not yet actioned:** cross-referencing the remaining 44
cut-and-empty slugs against `RECIPE_REVIEW.md` shows roughly 20 of them are
also classified as proper meals there (Gatsby, Harira, Pozole, Tamales, Bun
Cha, Nasi Lemak, Khachapuri, Southern Fried Chicken, Whole Roast Sea Bass,
Cape Malay Apricot Chicken, Okonomiyaki, Banh Xeo, and others) but have never
been authored — no ingredients or steps exist anywhere. The other ~17-18
(Biltong, Droëwors, snacks, drinks, condiments, the 3 confirmed duplicates)
correctly correspond to the review's non-meal prune list and are fine left as
they are. Authoring ~20 new full recipes to `RECIPE_STANDARD.md`'s bar is a
real, separate body of work — not attempted this session.

Full detail on the bug fixes: git log (`fix: critical bugs breaking site
interactivity and navigation`, `content: fix WHY-field formatting bug and
restore 34 complete recipes`). Recipe-by-recipe audit trail:
`RECIPE_AUDIT_FRAMEWORK.md`, `AUDIT_WEEK1_SIGNATURE3.md`, `AUDIT_WEEK2_SIGNATURE3.md`.

## MAJOR UPDATE (2026-07-02, same session as the decisions below): TUB discovered

Everything in "Current State Assessment" and "Owner Decisions — LOCKED" below was
written **without knowledge of a much more advanced parallel build.** A background
Claude Code job (unable to write directly into this repo — worktree isolation guard)
spent 2026-06-28 → 2026-07-02 building "TUB": 146 dishes, a working guided-cook flow
with timers, a shopping list, a meal planner, a pantry-driven "cook tonight" finder,
skill/region filters, and PWA groundwork — all against the exact specs referenced
below (`CONTENT_MODEL_V2_PROPOSAL.md`, `GUIDED_COOK_SPEC.md`, `LIBRARY_PLAN.md`). It
was found, reviewed, and **the owner confirmed: TUB is the real direction, port it
into this repo.** Full detail: `tub-import/README.md`. Live copy: `public/tub/tub-app.html`.

**This supersedes, specifically:**
- `DESIGN.md`'s "Dark & Moody" + Fraunces palette — replaced by TUB's actual
  wine-red/gold dark editorial (Oswald + Inter Tight, no serif). `DESIGN.md` has not
  been rewritten yet; treat `public/tub/tub-app.html` as the visual source of truth
  until it is.
- The Solo/Date/Host 3-occasion IA — replaced by TUB's 6-mode nav (Cooking for One /
  Two, Entertaining, From My Pantry, The Skill Path, My Cookbook).
- Today's earlier "Owner Decisions — LOCKED" schema-scope call ("Minimal") — TUB's
  actual data model already exceeds even the "Full" `CONTENT_MODEL_V2_PROPOSAL.md`
  option. Moot; superseded by whatever schema the eventual port adopts.
- Today's earlier content pipeline call ("Template-driven") — TUB's
  `RECIPE_STANDARD.md` is a materially more rigorous, consensus-driven authoring
  standard already in active use. Adopt it over this repo's `prompts/write-recipe.md`.

**Confirmed, not superseded:** the SA-first naming decision — TUB's own hard
constraints (`RECIPE_STANDARD.md`) independently enforce an even more detailed SA
terminology list and metric-only units. Today's 8 Batch 1 recipes and the original
Signature 12 are real, usable content; nothing about them needs to be thrown away,
though they should eventually be re-authored to `RECIPE_STANDARD.md`'s fuller bar
(chef's notes, common mistakes, health-forward variation, etc.) rather than this
repo's current 4-section format.

**RESOLVED (2026-07-02, later same day):** no React port for now. `tub-app.html` is
kept exactly as-is — JSON/JS data model unchanged — as the live working copy. The
site root (`/`) now redirects to it (`next.config.ts`). `public/tub/` is the
deployable copy; `tub-import/` is the full archive (scripts, audits, screenshots,
planning docs) for reference/provenance. Published to GitHub
(`elixa-admin/BachelorCookBook`) and Vercel — see bottom of this file for the URL.
Refine `tub-app.html` and `public/tub/recipes/*.js` directly going forward; no build
step. The legacy Next.js build (`src/`, `knowledge/recipes/*.md`) stays in the repo,
dormant, not deleted — CLAUDE.md flags it as such.

**Still open (unblocked by the above, revisit later):**
~~`RECIPE_REVIEW.md`'s pending content-pruning sign-off~~ — **resolved 2026-07-04,
see SESSION UPDATE at top: decision was not to prune.** Photo coverage remains
open (most of the 117 live dishes still show generative gradient tiles instead
of real photos). New gap surfaced by the same session: ~20 proper-meal recipes
identified in `RECIPE_REVIEW.md` were never authored (no ingredients/steps) —
see SESSION UPDATE for the list.

## Current State Assessment

### WHAT'S LOCKED (immutable foundation)
- **Positioning:** "Dinner is on you." — eligible man, impress date, host table
- **Voice:** Warm Premium (sensory, unhurried, assured; never consolation/pity)
- **Look:** Dark & Moody (espresso #15110D, bean #201913, ember #2A2118, parchment #F1E7D8, taupe #A89886, line #34291F, brandy #C99A4B, paprika #C04A22, oxblood #6E2420)
- **Typography:** Fraunces (display) + Inter (body)
- **Occasion model:** Solo / Date / Host with Date-led v1
- **Stack:** TypeScript · React · Next.js · Tailwind · shadcn/ui · Radix
- **Content model:** Markdown + frontmatter recipes with scalable servings

### WHAT'S ACTUALLY BUILT (Phase 0 complete)
**Infrastructure:**
✅ Next.js 16 + React 19 + TypeScript 5 + Tailwind 4
✅ Dark & Moody design system fully implemented
✅ Markdown recipe parsing with frontmatter
✅ Dynamic routing for occasions and individual recipes
✅ Static generation for all recipe pages
✅ Responsive mobile-first layout

**Recipe System:**
✅ Complete Signature 12 (all 12 recipes written, ~610 total lines)
✅ Full frontmatter schema implementation (occasion, signature, time_min, difficulty, servings, tags, kitchen_gear)
✅ Ingredient scaling system (1/2/4/6 servings)
✅ Recipe categorization by occasion
✅ Warm Premium voice across all recipes

**Components:**
✅ RecipeCard (grid tiles with hero shots, metadata)
✅ RecipeView (full recipe display with serving scaler)
✅ Badge (multi-tone tag system)
✅ ServingScaler (interactive 1/2/4/6)
✅ Detail toggle (More hand-holding / Straight to it)

**Features:**
✅ Occasion-based filtering (solo/date/host)
✅ Signature 12 highlighting
✅ SEO-friendly metadata
✅ Responsive typography

**Content:**
✅ All 12 Signature recipes complete with proper frontmatter and voice
✅ Project documentation suite (CLAUDE.md, DESIGN.md, CONTENT_MODEL.md, PROJECT_BRIEF.md, SIGNATURE_12.md, UX_NAVIGATION.md, INFLUENCES.md)

### WHAT'S STUBBED/PLANNED (next phases)
🟡 DetailSlider — **partially built.** `RecipeView.tsx` already has a working inline
toggle ("More hand-holding" / "Straight to it") that collapses "The move". Missing:
extraction as a reusable component, localStorage persistence, one-tap onboarding preference.
🟡 OccasionSwitch — **partially built.** The homepage hero already IS the occasion
choice (`src/app/page.tsx`). Missing: a sticky switcher on recipe/occasion pages,
localStorage persistence for returning visitors.
⏳ Local storage for occasion + detail preference
🟢 Recipe expansion beyond Signature 12 — **in progress**, see `LIBRARY_PLAN.md` (Batch 1 underway)
⏳ Solo and Host occasion deepening
🔴 Advanced domain features from tub-cookbook — **deferred**, see Owner Decisions below (schema scope: Minimal)
⏳ Regional themes and multi-course menus
🔴 Per-dish timing and parallel tracks — **deferred**, blocked on Content Model v2
🔴 "Before you start" readiness gate — **deferred**, blocked on Content Model v2 (Guided Cook spec)
⏳ Fridge/pantry matcher

## Full Feature Roadmap

### PHASE 1: UX Foundation (Current Sprint)
**Goal:** Complete the premium cooking experience with adaptive personalization.

**1.1 OccasionSwitch Component**
- Sticky navigation component for occasion switching
- Full-bleed hero homepage with occasion cards (Just me / A date / A table)
- localStorage persistence for last chosen occasion
- Deep-link handling (recipe pages show occasion badge + offer switch)

**1.2 DetailSlider Implementation**
- Per-recipe confidence slider (More hand-holding ↔ Straight to it)
- Expands/collapses technique explanations, timers, "the move" tips
- Optional one-tap preference setting ("I'm new / I cook often / Show me everything")
- localStorage persistence for detail preference

**1.3 Homepage Hero**
- Three large occasion cards with copy from UX_NAVIGATION.md
- Signature 12 preview grid (filtered by chosen occasion)
- Smooth transitions between occasion modes

**Dependencies:** None (builds on existing components)

---

### PHASE 2: Domain Engine Enhancement (tub-cookbook Port)
**Goal:** selectively port sophisticated domain features while maintaining markdown simplicity.

**2.1 Tapered Scaling System**
- Port tapered scaling logic: `baseQty * (1 + (multiplier - 1) * 0.8)`
- Apply to spices, salt, leavening (prevent over-seasoning)
- Auto-notes: "Tapered — season to taste (spices don't scale linearly)"
- Extend frontmatter: `scaling_rule: tapered|linear|egg`

**2.2 Per-Step Callouts ("Why it works")**
- Callout library pattern (reusable cooking science explanations)
- Frontmatter extension: `calloutIds: ["dry-before-sear", "preheat-pan"]`
- Collapsible "Why?" buttons in step lists
- Categories: technique, science, substitution, safety, tip
- Scientific sources cited

**2.3 Method Options**
- Multiple cooking methods per recipe (stovetop/oven/air-fryer/grill)
- Frontmatter extension: `methodOptions: [{label, time, temp, note}]`
- Dynamic UI for method switching
- Contextual notes ("Best: crispy skin" vs "Fastest, least mess")

**2.4 Pairings & Sides**
- Drink pairings (wine/cocktail/mocktail/whiskey/beer) with kJ transparency
- Side dish compatibility scores
- Frontmatter extensions: `pairings: [{drink, kJ, localPick}]`, `sides: [{dish, match%}]`
- Local product recommendations (geographic-specific)

**2.5 kJ Nutrition System**
- Dual kJ/kcal display (kJ as primary)
- Comprehensive macro breakdown (protein, carbs, fat, fibre, sugar, sodium)
- Proper nutrition scaling with serving adjustments
- Frontmatter extension: `nutrition: {energyKJ, energyKcal, protein, carbs, fat, fibre, sugar, sodium}`

**Dependencies:** Phase 1 complete, frontmatter schema extensions

---

### PHASE 3: Content Expansion (Top 100 Global Library)
**Goal:** Expand from Signature 12 to comprehensive library with SA naming defaults.

**3.1 Recipe Expansion Pipeline**
- Target: 100 total recipes (current 12 → +88 new)
- Maintain 50/35/15 = Solo/Date/Host ratio
- SA naming defaults enforced (beef mince, coriander, aubergine, spring onion, prawn, rocket, bicarb, cake flour)
- Pan-global reach, no exclusions
- Alcohol-inclusive pairings (non-alc option on every)

**3.2 Regional Theme System**
- Theme categories: "Mexican tonight", "Italian classics", "Asian comfort", "French bistro"
- Multi-course menu builders (appetiser/main/dessert/palate cleanser)
- Occasion-specific theme filters (date-night menus, host spreads)
- Cross-linking between related dishes

**3.3 Technique Coverage Expansion**
- Beyond Signature 12 techniques: braise, stew, grill, roast, poach, steam, fry, bake
- Equipment categories: knife skills, pan work, oven techniques, grill mastery
- Skill progression tracking (beginner → intermediate → advanced techniques)

**Dependencies:** Phase 2 complete (domain features ready for expanded content)

---

### PHASE 4: Advanced Cooking Features
**Goal:** Professional-grade timing and preparation guidance.

**4.1 Per-Dish Timing System**
- Total time breakdown: prep + active + passive + rest
- Per-step timing with dependencies
- "When to start" scheduling (reverse timing from serving time)
- Multi-dish parallel track coordination

**4.2 "Before You Start" Readiness Gate**
- Ingredient overview with quantities
- High-level process arc (prep → cook → finish)
- Equipment checklist
- Time commitment preview
- "What to expect" sensory description
- User confirmation before entering full recipe

**4.3 Multi-Register Ingredient Display**
- Three display modes: precise (grams), volume (tsp/cup), everyday (relatable descriptions)
- Smart UI toggling between modes
- Everyday language: "a glug", "a thumb of butter", "1 palm-sized fillet"
- Substitute suggestions with notes

**4.4 Equipment & Timing Enhancements**
- Required equipment lists per recipe
- Active/passive time separation
- Duration per step with temperature control
- Equipment substitution guidance

**Dependencies:** Phase 3 complete (content foundation for advanced features)

---

### PHASE 5: Fridge/Pantry Matcher (Future)
**Goal:** Reverse recipe discovery based on available ingredients.

**5.1 Ingredient Inventory System**
- Pantry staple tracking
- Fresh ingredient expiry tracking
- "What can I make?" reverse lookup
- Missing ingredient shopping lists

**5.2 Substitution Engine**
- Smart substitution suggestions
- "Good enough" vs "optimal" ingredient flags
- Flavor profile matching

**Dependencies:** Phase 4 complete, content tagging infrastructure mature

---

## Tub-Cookbook Divergence Analysis

### Divergence Status
**tub-cookbook at ~/tub-cookbook is SUPERSEDED but contains a richer domain engine worth selectively porting.**

### Key Features in tub-cookbook (not in BCB)

**High-Value Ports:**
1. **kJ Nutrition System** — Dual kJ/kcal with comprehensive macros, properly scaled
2. **Tapered Scaling** — Prevents over-spicing with non-linear scaling logic
3. **Per-Step Callouts** — Educational "Why it works" content with scientific backing
4. **Method Options** — Multiple cooking methods with time/temp variations
5. **Pairings & Sides** — Drink pairings with kJ transparency, side compatibility scores

**Medium-Value Ports:**
6. **Multi-Register Display** — Everyday + grams + volume with smart toggling
7. **Ingredient Substitutes** — Alternative suggestions with notes
8. **Local Product Recommendations** — Geographic-specific product suggestions
9. **Equipment Lists** — Required equipment per recipe
10. **Active/Passive Time** — Hands-on vs waiting time separation

**Technical Patterns Worth Adopting:**
11. **Pure Functional Scaling** — Immutable operations for predictable transformations
12. **Callout Library Pattern** — Reusable educational content referenced by IDs
13. **Type-First Domain Modeling** — Strong typing prevents data inconsistencies
14. **Content-Code Separation** — Clean separation between recipes and business logic

### Porting Recommendation
**PORT:** Items 1-5 (High-Value) in Phase 2
**DEFER:** Items 6-10 (Medium-Value) to Phase 4
**ADOPT:** Technical patterns 11-14 immediately during Phase 2 implementation

### Key Difference
**tub-cookbook** = TypeScript-first domain modeling with rich type system
**BCB** = Markdown-first content model with minimal frontmatter

**Strategy:** Extend BCB frontmatter schema to capture tub-cookbook domain richness without sacrificing markdown simplicity. Keep content editable; let TypeScript handle validation.

---

## Recommended Execution Order

### Sprint 1: UX Foundation (Phase 1) — 2-3 days
- OccasionSwitch component + homepage hero
- DetailSlider implementation with adaptive detail control
- localStorage persistence for preferences
- Deep-link handling for SEO

### Sprint 2: Domain Engine Core (Phase 2.1-2.3) — 4-5 days
- Tapered scaling system port
- Per-step callouts library + UI
- Method options system
- Frontmatter schema extensions

### Sprint 3: Pairings & Nutrition (Phase 2.4-2.5) — 3-4 days
- kJ nutrition system with comprehensive macros
- Pairings & sides with compatibility scoring
- Multi-register display (everyday/grams/volume)
- Product recommendation system

### Sprint 4: Content Pipeline (Phase 3.1-3.2) — 5-7 days
- Recipe expansion to 50 recipes (Signature 12 + 38 new)
- SA naming enforcement across all recipes
- Regional theme system implementation
- Multi-course menu builders

### Sprint 5: Content Completion (Phase 3.3) — 5-7 days
- Recipe expansion to 100 recipes
- Technique coverage completion
- Occasion ratio balancing (50/35/15)
- Final content polish and voice consistency

### Sprint 6: Advanced Features (Phase 4.1-4.2) — 4-5 days
- Per-dish timing system with dependencies
- "Before you start" readiness gate
- Multi-dish parallel track coordination
- Reverse timing from serving time

### Sprint 7: Polish & Launch — 2-3 days
- Equipment lists and timing refinements
- Cross-linking and related recipes
- Performance optimization
- Accessibility audit

### Sprint 8: Future Foundation (Phase 5 prep) — 2-3 days
- Content tagging infrastructure
- Substitution engine groundwork
- Pantry inventory system planning

---

## Effort Sizing

| Phase | Duration | Complexity | Token Estimate |
|-------|----------|------------|----------------|
| Phase 1: UX Foundation | 2-3 days | Low | 15-25k |
| Phase 2: Domain Engine | 7-9 days | Medium-High | 40-60k |
| Phase 3: Content Expansion | 10-14 days | Medium | 50-70k |
| Phase 4: Advanced Features | 4-5 days | High | 30-45k |
| Phase 5: Fridge Matcher | Future | High | Deferred |

**Total Estimated Effort:** 23-31 days active development, 135-200k tokens

---

## Owner Decisions — LOCKED (2026-07-02)

### DECISION 0: Execution priority
**Chosen: Doc hygiene + Library expansion, now.** Visual elevation
(`ELEVATION_PROPOSAL.md`) and Content Model v2 + Guided Cook are deferred, not
cancelled — revisit once the library has real breadth. Rationale: the roadmap itself
had drifted from what's built (see corrected status above) and the brief's Goal #1
("a browsable, searchable library") is still bottlenecked at 12 of 100 dishes — that's
the highest-leverage gap to close next.

### DECISION 1 (was RISK 1): Frontmatter Schema Complexity vs. Simplicity
**Chosen: Minimal** — tapered scaling notes and technique callouts stay as the
existing v1 conventions (italic scaling note under Ingredients, `## The move` section)
rather than becoming structured frontmatter (`scaling_rule`, `calloutIds`). Nutrition,
pairings, and method options from `CONTENT_MODEL_V2_PROPOSAL.md` are **not** being
built right now. New recipes — including the Library Plan's 88 — use the v1 schema in
`CONTENT_MODEL.md` as-is. Revisit when Content Model v2 is prioritised.

### DECISION 2 (was RISK 2): Content Expansion Velocity vs. Quality
**Chosen: Template-driven** — structured generation across the board (Option C, not
the recommended hybrid), prioritising velocity to reach library breadth quickly. Voice
consistency is the accepted trade-off — `prompts/write-recipe.md` and the existing 12
Signature recipes are the style reference every new recipe must match; a spot-check
pass against `INFLUENCES.md`'s house synthesis is worth doing after each batch even
without full individual review.

### DECISION 3 (was RISK 3): Regional Focus vs. Global Reach
**Chosen: SA-first** — SA terminology and local product recommendations are the
primary frame, not a stylistic flourish on a global-neutral base (overrides this
doc's earlier Option B recommendation). `LIBRARY_PLAN.md`'s SA-naming glossary is the
enforced default for every recipe, not an optional flavour choice.

---

## Success Metrics

**Phase 1 Complete:**
- User can switch occasions seamlessly
- Detail preference persists across sessions
- Homepage converts visitors to occasion choice

**Phase 2 Complete:**
- All domain features work with markdown recipes
- Frontmatter schema is extensible but not overwhelming
- Scaling intelligence prevents over-seasoning

**Phase 3 Complete:**
- 100 recipes with consistent voice and SA naming
- Regional themes enable multi-course planning
- 50/35/15 occasion ratio maintained

**Phase 4 Complete:**
- Users can coordinate multi-dish timing confidently
- "Before you start" reduces cooking anxiety
- Preparation guidance prevents mid-cooking surprises

**Launch Ready:**
- Deep, premium cooking experience
- Comprehensive but navigable recipe library
- Professional-grade guidance without pretension
- Mobile-optimized for stove-side use

---

**Status:** TUB (`public/tub/tub-app.html`) is the live product, published to GitHub
(`elixa-admin/BachelorCookBook`) and Vercel (2026-07-02). Site root redirects there.
Owner Decisions 0-3 and the Batch 1 pilot recipes from earlier today stand as real,
usable work on the dormant legacy build, not discarded. Live roster is 117 dishes
as of 2026-07-04 (see SESSION UPDATE at top). Next action, whenever picked up:
closing the photo gap, and authoring the ~20 proper-meal recipes identified as
missing — see "Still open" above.