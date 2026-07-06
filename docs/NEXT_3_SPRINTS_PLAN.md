# Next 3 Sprints Plan

**Last updated:** 2026-07-06
**Horizon:** Sprints 67–69 (post baseline-standardization)
**Recipe collection:** 58 locked

> The baseline (format, structure, docs, deploy) is now clean. The next three
> sprints return to **content depth** — making the 58 recipes consistently rich,
> then extending features on top of a stable foundation.

---

## Sprint 67 — Phase A audit + quick content wins

**Goal:** Know exactly what each recipe is missing; land the visible quick wins.

- **Phase A audit** (~8–10k tokens): scan all 58 recipes against
  `RECIPE_STANDARDIZATION_SPEC.md` §7 (depth table). Output a gap report +
  per-tier checklist. **Do this first** — it de-risks everything below.
- **Pantry Secrets → full coverage**: confirm every active slug has a
  40–70 word historical/cultural fact in `pantry-lore.js`.
- **Image audit**: confirm 58/58 dark-moody images load; fill any gaps in
  `recipes-images.js`.

**Exit criteria:** audit report committed; no recipe missing a story, pantry
secret, storage entry, or image.

---

## Sprint 68 — Signature tier timed cooks + story depth

**Goal:** Premium tier earns its depth.

- Add timed step-by-step cooks (`tl` arrays) to the remaining Signature recipes
  (steak is the only one fully timed today). Target 8–12 timed steps each with
  PREP/COOK/REST/SERVE phases.
- Deepen Signature `prov`/story fields to 200+ words, Warm Premium voice,
  cultural grounding (see `RECIPE_STANDARDIZATION_SPEC.md`).

**Exit criteria:** all Signature recipes have timed cooks + 200-word stories.

---

## Sprint 69 — Standardize remaining tiers + feature extensions

**Goal:** Consistent depth across the long tail; start features.

- Aspirational (150+ words) and Heritage (150+ words, authenticity-checked)
  story standardization.
- Adopted/Component field completeness.
- Feature candidates (pick by priority with owner):
  - Favourites pre-seed (Occasion 06 is empty until user interacts)
  - Occasion 07 (Accompaniments) — needs component recipes
  - Linked recipes ("see also" between related dishes)
  - Print-friendly recipe view

**Exit criteria:** tier depth progression clear end-to-end; one new feature shipped.

---

## Out of scope for these sprints
- No UI redesign — design language is locked.
- No framework change — TUB stays a single-file PWA.
- No new recipe roster changes — 58 is locked.
