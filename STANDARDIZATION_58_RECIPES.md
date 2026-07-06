# Standardization Roadmap — 58 Curated Recipes

**Collection Status:** LOCKED (58 recipes)  
**Date:** 2026-07-06  
**Objective:** Apply consistent standards across all 58 recipes

---

## What "Consistent Standards" Means

### ✅ Look & Feel (Theme)
- **Colors:** Wine-red, gold, fresh-green, teal (locked CSS vars)
- **Typography:** Oswald (headings), Inter Tight (body), JetBrains Mono (technical)
- **Layout:** 52px section padding, 2-3px left borders, 8-12px radius
- **Images:** Dark-moody aesthetic (warm lighting, no clinical whites)

### ✅ Functionality
- **Timeline:** PREP (blue) → COOK (gold/rust gradient) with timed steps
- **Storage:** Fridge/freezer/reheat guidance (fridge: X days, freezer: X months, reheat: method + temp)
- **Substitutes:** Card-based layout with "Don't Have" option
- **Drinks Pairing:** Capitalized, SA-only brands, non-alcoholic alternatives where appropriate
- **Plating:** Guided list format (not card grid) with universal 4-principle grid

### ✅ Content Depth
- **Story/Provenance (prov):** 80-150 words, sensory language, warm premium voice, cultural context
- **Pantry Secrets:** 40-70 words, historical/cultural facts, "Did you know?" format
- **Images:** All 58 recipes have high-quality dark-moody images (600px+ width)

---

## Current State (Audit)

| Aspect | Coverage | Status |
|--------|----------|--------|
| **Storage** | ~58/58 (100%) | ✅ Complete (category defaults applied) |
| **Timeline** | 1/58 (2%) | ⏳ Needs timed steps |
| **Images** | ~33/58 (57%) | ⏳ Missing ~25 images |
| **Story/Prov** | ~58/58 (100%) | ⏳ Needs depth review (sensory voice) |
| **Pantry Secrets** | 0/58 (0%) | ⏳ Needs 58 unique facts |
| **Drinks Pairing** | ~58/58 (100%) | ⏳ Needs SA constraint verification |

---

## Execution Plan (3 Phases)

### Phase 1: Foundation (10-15k tokens, 2-3 hours)
**Goal:** Audit all 58 recipes, identify gaps

**Tasks:**
- [ ] Verify all 58 have storage guidance (expected: yes, all have category defaults)
- [ ] Check story/prov word counts (target: 80-150 per tier)
- [ ] Count missing images (estimate: 20-25)
- [ ] Verify timeline present on all (estimate: only 1-2 have timed steps)
- [ ] Audit drinks pairing for SA constraint (estimate: needs refinement)

**Output:** `AUDIT_58_RECIPES.md` (gap report by recipe)

**Recommended Model:** Haiku (read-only, fast scan)

---

### Phase 2: Content Depth (15-25k tokens, 4-6 hours)
**Goal:** Deepen story/prov, add Pantry Secrets, source missing images

**Tasks (can parallelize):**

**2A: Enhance Story/Prov (8-12k tokens)**
- Review all 58 recipes' story/prov fields
- Ensure warm premium voice (sensory, cultural, unhurried)
- Target: 80-150 words per tier
- Add cultural context where missing
- Verify no instructional tone

**2B: Create 58 Pantry Secrets (5-8k tokens)**
- Research historical/cultural fact for each recipe
- Write 40-70 word facts
- Format: "**Did you know?** [fact]"
- Verify accuracy

**2C: Source 25 Missing Images (6-10k tokens)**
- Identify which 25 are missing
- Search high-quality dark-moody images
- Verify 600px+ width, theme match
- Update recipes-images.js

**Recommended Models:** 2A = Sonnet, 2B = Sonnet, 2C = Haiku

---

### Phase 3: Polish & Verification (5-10k tokens, 2-3 hours)
**Goal:** Final consistency check, production verification

**Tasks:**
- [ ] Voice audit: all stories warm premium, never instructional
- [ ] Visual consistency: all images dark-moody, theme-matched
- [ ] Functionality check: storage, timeline, drinks, substitutes working on all 58
- [ ] Navigation test: filters, search, recipe detail on all 58
- [ ] No console errors (Wake Lock warnings only expected)
- [ ] Mobile responsive: test on preview at multiple sizes

**Output:** Production-ready site (58 curated recipes)

**Recommended Model:** Haiku (testing/verification)

---

## Session Timeline

**Session 1 (Next — Today's work):**
- ✅ Collection locked (58 recipes)
- ✅ Roster finalized (171 recipes marked cut)
- ⏭️ **Phase 1: Audit** (2-3 hours, 10-15k tokens)

**Session 2 (Following day):**
- Phase 2A: Enhance stories (Sonnet, 4-6 hours, 8-12k tokens)
- OR Phase 2B: Create Pantry Secrets (Sonnet, 3-4 hours, 5-8k tokens)
- OR Phase 2C: Source images (Haiku, 2-3 hours, 6-10k tokens)
- **Recommendation:** Run 2A + 2B in parallel (different models), then 2C

**Session 3:**
- Phase 3: Polish & verification (Haiku, 2-3 hours, 5-10k tokens)
- Production test

---

## Success Criteria (Phase Complete)

**Phase 1 Complete:**
- [ ] Gap audit finished
- [ ] All 58 recipes scanned for compliance
- [ ] Priority list generated (highest gaps first)

**Phase 2 Complete:**
- [ ] All 58 stories warm premium voice (80-150 words per tier)
- [ ] All 58 have unique Pantry Secrets (40-70 words)
- [ ] All 58 have images (dark-moody theme verified)
- [ ] Drinks pairing SA constraint enforced

**Phase 3 Complete:**
- [ ] No console errors
- [ ] All functionality works (timeline, storage, substitutes, drinks, plating)
- [ ] Theme consistent across all pages
- [ ] Mobile responsive
- [ ] Production-ready

---

## Token Budget

| Phase | Tokens | Session | Status |
|-------|--------|---------|--------|
| Phase 1 (Audit) | 10-15k | 1 | Ready |
| Phase 2A (Stories) | 8-12k | 2 | Ready |
| Phase 2B (Pantry) | 5-8k | 2 | Ready |
| Phase 2C (Images) | 6-10k | 2 | Ready |
| Phase 3 (Polish) | 5-10k | 3 | Ready |
| **TOTAL** | **34-55k** | **3 sessions** | **Fits in 200k sprint** |

**Remaining buffer:** 145-166k tokens for revisions, cross-platform handoff, deployment

---

## Ready to Start Phase 1?

**Phase 1 Audit — Recommended First Step**

Audit all 58 recipes against RECIPE_STANDARDIZATION_SPEC.md standards:
- Story/prov word counts ✓
- Timeline presence ✓
- Image coverage ✓
- Storage completeness ✓
- Drinks pairing format ✓

**Effort:** 2-3 hours | **Cost:** 10-15k tokens | **Model:** Haiku

**Output:** `AUDIT_58_RECIPES.md` with:
- Gap summary (what's missing)
- Per-recipe checklist
- Priority order (highest gaps first)

Ready to proceed?
