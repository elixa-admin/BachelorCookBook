# Next Priorities — Sprint 66 & Beyond

**Date:** 2026-07-06  
**Status:** Collection LOCKED to 58 curated recipes | Master handoff ready | Dev branch deployed  
**Target:** Apply consistent standards (look, feel, functionality) across all 58  
**Token Budget:** 200k sprint limit (160k threshold at 80%)  

---

## ✅ CRITICAL COMPLETION: Collection Finalized

**LOCKED:** 58 recipes (curated, production-ready)
- 8 user-selected recipes (exist in data files)
- 50 supporting recipes (quality collection)
- 171 removed (bloat reduction)

**Next phase:** Standardization across all 58

---

## PRIORITY TIER 1: Standardization Foundation (20-30k tokens)

### ⭐ HIGHEST PRIORITY: Phase A Audit
**Effort:** 8-10k tokens | **Time:** 60-90 min | **Model:** Haiku  
**Scope:** Scan all 72 recipes, identify gaps, generate prioritized list for Phase B

**What to do:**
1. Read all 4 recipe data files (recipes-data.js, fullcook-conversions.js, sa-additions-2.js, storage-reheating.js)
2. Check each of 72 recipes against RECIPE_STANDARDIZATION_SPEC.md Section 7 (depth table)
3. Identify missing/incomplete fields: story length, timed steps, storage, images, pantry secrets
4. Generate report: recipes grouped by standardization tier (Signature > Aspirational > Heritage > Adopted)
5. Create prioritized checklist: highest gaps first

**Output:** `AUDIT_SPRINT_66.md` with:
- Gap summary (storage: 58/72, timed cooks: 1/8, images: 41/72, pantry facts: partial)
- Per-recipe status (brief assessment of each 72)
- Top 10 recipes needing work (by gap count)
- Recommended Phase B sequence

**Why:** De-risks Phases B-E; lets us see exactly what's needed before diving into rewrites  
**Success:** Audit complete, no surprises in Phase B execution

---

### 2nd Priority: Generate 72 Pantry Secrets Facts
**Effort:** 5-8k tokens | **Time:** 90-120 min | **Model:** Sonnet  
**Scope:** Research + write 72 unique historical/cultural facts, one per recipe

**What to do:**
1. Research historical/cultural origin for each recipe's main ingredient or technique
2. Write 40-70 word fact for each recipe
3. Format: "**Did you know?** [fact]"
4. Verify accuracy against credible sources
5. Output as JavaScript object for window.PANTRY_LORE

**Example:**
> "**Did you know?** Risotto's constant stirring releases starch from the rice grains, creating its signature creamy texture without cream. This technique dates back to Venetian merchants who brought Arborio rice from the East in the 18th century."

**Output:** `pantry-secrets-batch-1.js` with complete window.PANTRY_LORE object ready to merge into tub-app.html

**Why:** Adds immediate depth to site; visible in STORY tab; quick win  
**Success:** 72 unique facts, 40-70 words each, all displayed correctly on site

---

### 3rd Priority: Source 31 Missing Images
**Effort:** 6-10k tokens | **Time:** 120-150 min | **Model:** Haiku  
**Scope:** Find high-quality dark-moody images for 31 recipes missing images

**What to do:**
1. Identify which 31 recipes are missing images (compare recipes-images.js to full recipe list)
2. For each recipe, search for:
   - High-quality dark-moody recipe photo
   - 600px+ width (landscape preferred)
   - Warm lighting (candlelit, golden-hour, intimate)
   - Match wine-red/gold/teal theme aesthetic
3. Verify no copyright issues (use royalty-free sources)
4. Update recipes-images.js with new URLs
5. Test on preview (load each recipe, verify image displays)

**Sources:** Unsplash, Pexels, Pixabay, other royalty-free sources  
**Output:** Updated `recipes-images.js` with 31 new URLs, all tested and theme-verified

**Why:** Completes visual coverage; improves recipe appeal and professionalism  
**Success:** 72/72 recipes have images, all dark-moody theme-matched, all load correctly

---

### 4th Priority: Add 7 Timed Cooks to Signature Tier
**Effort:** 12-15k tokens | **Time:** 180-240 min | **Model:** Sonnet  
**Scope:** Research + write timed step-by-step for 7 Signature recipes (excluding steak, which is done)

**Recipes (TBD, likely):**
- Risotto Milanese
- Pasta Carbonara
- Beef Wellington
- Lamb Chops (Pan-Seared)
- Pan-Seared Fish (Sea Bass or Halibut)
- Chocolate Fondant
- [1 more Signature to confirm]

**What to do:**
1. Research cooking timeline for each recipe
2. Break into 8-12 steps with phase labels (PREP/COOK)
3. Add timing in HH:MM format per step
4. Include "Why" explanation for each step (educational value)
5. Tag relevant ingredients per step
6. Test on preview (verify timeline renders correctly with Option 1 styling)
7. Commit per recipe

**Format (from existing steak model):**
```javascript
steps: [
  ["Step name", "Why this step matters", "HH:MM", ["ing1", "ing2"], {timer: "4 min"}],
  ...
]
```

**Output:** 7 recipes with complete timed step-by-step, verified on preview

**Why:** Showcases Signature tier premium content; guides users through complex techniques  
**Success:** All 8 Signature recipes have timed cooks; timeline renders beautifully on each

---

## PRIORITY TIER 2: Medium Effort (15-30k tokens, can parallelize)

### 5th Priority: Standardize Signature Tier Stories
**Effort:** 12-15k tokens | **Time:** 240-300 min | **Model:** Sonnet/Opus  
**Scope:** Deep audit + rewrite of 8 Signature recipes' story/prov fields

**Target:** 200+ words, sensory language, warm premium voice, cultural/historical context  

**Process:**
1. Read current story for each Signature recipe
2. Research historical/cultural background
3. Rewrite to meet Warm Premium standard (sensory, unhurried, assured)
4. Verify 200+ word count
5. Test voice consistency against PROJECT_BRIEF.md
6. Commit per recipe with clear message

**Example Rewrite Target:**
```
Current (if short/generic): "A classic Italian pasta with eggs and bacon"
Target: "Carbonara is Rome's ultimate late-night dish — born in post-war kitchens 
when pasta, eggs, and guanciale (cured pork jowl) were combined by accident. The 
sauce isn't cream; it's the emulsion of hot pasta water, egg yolks, and rendered 
fat that create silken, luxurious coating. Each element matters: the timing of 
heat, the quality of pork, the pasta's starch content. It's a lesson in technique, 
in respect for ingredient, in why Italian cooking demands attention..."
```

**Output:** 8 Signature recipes with deep, sensory, culturally-grounded stories

**Why:** Premium tier deserves premium content; differentiates from Aspirational/Heritage  
**Success:** All Signature stories 200+ words, warm premium voice verified, cultural context honored

---

### 6th Priority: Standardize Aspirational Tier Stories
**Effort:** 8-12k tokens | **Time:** 180-240 min | **Model:** Sonnet  
**Scope:** Review + enhance 12 Aspirational recipes' story/prov fields (150+ words target)

**Similar process to Signature, but lighter touch (150+ words vs. 200+)**

---

### 7th Priority: Standardize Heritage Tier Stories
**Effort:** 8-12k tokens | **Time:** 180-240 min | **Model:** Sonnet  
**Scope:** Audit + preserve cultural authenticity in 27 Heritage recipes (150+ words)

**Critical:** Heritage recipes are SA/cultural classics — verify authenticity, respect origins, avoid appropriation

---

## PRIORITY TIER 3: Full Standardization (30-50k tokens, recommended for dedicated session)

### 8th Priority: Phase B Full Execution
**Effort:** 30-50k tokens | **Time:** 6-10 hours | **Model:** Multi-tier routing  
**Scope:** Complete all tier-based standardization (Signature → Aspirational → Heritage → Adopted/Component)

**Can be parallelized by tier:**
- Signature (8 recipes × 3-4k = 24-32k)
- Aspirational (12 recipes × 2-3k = 24-36k)
- Heritage (27 recipes × 1-2k = 27-54k)
- Adopted/Component (25 recipes × 0.5-1k = 12.5-25k)

**Recommended approach:** Run Signature sequentially (premium, needs care), then parallelize Aspirational/Heritage in separate sessions or use multiple agents

---

## RECOMMENDED EXECUTION SEQUENCE (If Tokens Allow)

### Session 1 (TODAY — Already Done)
- ✅ Site-wide testing
- ✅ Master handoff prompt
- ✅ Dev branch deployed
- **Status:** Ready for Phase A

### Session 2 (RECOMMENDED NEXT: 15-25k tokens)
**Pick ONE:**

**Option A (Fastest Path to Complete):**
- Phase A Audit (8-10k tokens)
- Add 72 Pantry Secrets (5-8k tokens)
- **Total: 13-18k tokens, 2-3 hours**
- **Output:** Clear audit report + site immediately deeper (visible Pantry Secrets)

**Option B (Maximize Visual Impact):**
- Phase A Audit (8-10k tokens)
- Source 31 Images (6-10k tokens)
- **Total: 14-20k tokens, 2-3 hours**
- **Output:** Clear audit report + site immediately more polished (56% → 100% image coverage)

**Option C (Premium Content Focus):**
- Add 7 Timed Cooks (12-15k tokens)
- Partial Phase A Audit (5k tokens, focus on Signature tier)
- **Total: 17-20k tokens, 3-4 hours**
- **Output:** Signature tier much deeper + clear roadmap for rest

### Session 3-4 (FOLLOWUP: 20-40k tokens each)
- Complete whatever wasn't done in Session 2
- Begin Phase B by tier (Signature deep standardization)

---

## Token Budget Projection

| Task | Tokens | Status |
|------|--------|--------|
| Phase A Audit | 8-10k | READY |
| 72 Pantry Secrets | 5-8k | READY |
| 31 Images | 6-10k | READY |
| 7 Timed Cooks | 12-15k | READY |
| Signature Stories | 12-15k | READY |
| Aspirational Stories | 8-12k | READY |
| Heritage Stories | 8-12k | READY |
| Adopted/Component Standardization | 5-8k | READY |
| Phase C (Pantry Expansion) | Included above | Part of systematic work |
| Phase D (Image Standardization) | Included above | Covered by "31 Images" task |
| Phase E (Polish/Verification) | 3-5k | After all standardization |
| **TOTAL** | **70-107k** | Fits in 200k sprint (35-53% budget) |

**Buffer remaining:** 93-130k tokens for:
- Unexpected rewrites/revisions
- Extended cross-platform handoff refinement
- Autonomous execution monitoring
- Next sprint features

---

## What NOT to Do

❌ **Don't start Phase B without Phase A audit** — Risk wasted effort standardizing recipes that don't need it  
❌ **Don't rewrite all stories at once** — Bite-sized commits are safer and easier to verify  
❌ **Don't add images without testing** — Verify load + theme match before committing  
❌ **Don't change design/colors** — All design is locked; no exceptions  
❌ **Don't create new fields** — Recipe structure is locked; update spec if needed  

---

## Handoff Readiness

**All files committed and ready for next session OR cross-platform execution:**
- ✅ MASTER_HANDOFF_PROMPT.md (662 lines, copy-paste ready for AntiGravity/Z.AI)
- ✅ RECIPE_STANDARDIZATION_SPEC.md (10-section execution blueprint)
- ✅ HANDOVER_SPRINT_65.md (latest sprint summary)
- ✅ README.md (architecture guide)
- ✅ NEXT_PRIORITIES.md (THIS FILE — prioritized task list)
- ✅ Git: main + dev branches ready
- ✅ Memory: Sprint 66 session state saved

**If token limit hit:** Commit work, push to dev, update this file with stopping point. Next session/agent: Read MASTER_HANDOFF_PROMPT.md → Pick from NEXT_PRIORITIES.md

---

## Success Definition (End of Sprint 66)

**Minimum (Phase A Complete):**
- [ ] Phase A audit complete
- [ ] Clear roadmap for Phase B
- [ ] Vercel dev instance tested
- [ ] All documentation committed

**Recommended (Phase A + Quick Wins):**
- [ ] Phase A audit complete
- [ ] 72 Pantry Secrets added (OR 31 images sourced)
- [ ] Site noticeably deeper/more complete
- [ ] Clear Phase B checklist ready

**Full (Phase A + Phase B Start):**
- [ ] Phase A audit complete
- [ ] 72 Pantry Secrets added
- [ ] 31 images sourced
- [ ] 7 timed cooks added
- [ ] Signature tier stories deep standardized (or in progress)
- [ ] Ready for Aspirational/Heritage phase continuation

---

## Recommended: START WITH PHASE A AUDIT

**Why:**
- De-risks all downstream work
- Identifies exact gaps and priority order
- Only 8-10k tokens, 60-90 minutes
- Output is immediately useful (audit report + checklist)
- Next tasks become crystal clear

**How to invoke (if using AI agent):**
```
Phase A Audit — Comprehensive Recipe Gap Analysis

Read all 72 recipes from:
- public/tub/recipes/recipes-data.js (Signature + Aspirational)
- public/tub/recipes/fullcook-conversions.js (Heritage)
- public/tub/recipes/sa-additions-2.js (SA Heritage)
- public/tub/recipes/storage-reheating.js (storage status)

Compare each recipe against RECIPE_STANDARDIZATION_SPEC.md Section 7 (Depth Table).

Generate report with:
1. Gap summary (storage, timed cooks, images, pantry secrets)
2. Per-tier status (Signature 8/8? Aspirational? Heritage? Adopted? Component?)
3. Top 10 recipes by gap count (most work needed first)
4. Recommended Phase B sequence

Output: AUDIT_SPRINT_66.md
```

---

**Status: Ready for next execution phase**  
**Recommended Next: Phase A Audit (quick, de-risks remaining work)**  
**Backup Options: Pantry Secrets, Images, or Timed Cooks (all quick wins)**
