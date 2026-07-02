# TUB — Handoff / Status (2026-06-28)

> Read first when continuing. Single source of truth for session state.

## Product
The Ultimate Bachelor Cookbook — "the cookbook for the eligible man": eat well solo, impress a date, host a table. **Voice = Warm Premium.** Tagline "Dinner is on you." Occasions Solo/Date/Host, v1 **date-led** (~50/35/15).

## Projects
- **`~/Projects/BachelorCookBook` (BCB)** = de-facto canonical. Locked brand, `DESIGN.md`, **Signature 12** (12 date-led markdown recipes) + `design/exports/` imagery, app code (occasion routes, serving scaling), all specs. **NOTE: BCB has a worktree bg-isolation guard** — this background session cannot edit it directly without a worktree or `"worktree":{"bgIsolation":"none"}` in BCB `.claude/settings.json`.
- **`~/tub-cookbook` (:3010)** = earlier divergent app, **richer engine** (tapered scaling, "why" callouts, kJ nutrition, methodOptions, pairings). Candidate to PORT into BCB.
- Canonical (tub / BCB / **merge**) NOT explicitly confirmed by owner. Recommend **merge**.

## Live previews
- tub-cookbook → http://localhost:3010
- BCB → http://localhost:3030

## Decisions LOCKED
- **Design = EXECUTIVE SANS** — neutral charcoal darks (`#0E0F11`/`#161719`, NO brown), **grotesque type** (Inter Tight/Geist, **NO serif**), steel `#6E7E8E` or emerald `#4E7A5A` accent. Replaces prior brown "Dark & Moody" + Fraunces (owner: too brown/"cartoon", not premium).
- **Content model v2** (`knowledge/CONTENT_MODEL_V2_PROPOSAL.md`): region/cuisine, timed parallel steps, method_options+best, `## Brief` gate, nutrition (kJ), per-step "why", pairings.
- **Library**: target 100 (52 solo/35 date/13 host), SA-named; Signature 12 anchors; gap-fills Korean/Vietnamese/Greek/African/Lebanese. Date-led pilot 8.
- **Guided Cook** (`knowledge/GUIDED_COOK_SPEC.md`): Brief → Timeline → Cook (parallel-aware; buffers + manual resync).

## Specs on disk (BCB)
`knowledge/`: ROADMAP, CONTENT_MODEL_V2_PROPOSAL, GUIDED_COOK_SPEC, LIBRARY_PLAN. `design/ELEVATION_PROPOSAL.md` (⚠ pre-Executive-Sans — needs re-aligning to grotesque/no-serif). 100-dish shortlist: job tmp `shortlist-100.md`.

## THE FOUR-DIMENSION PREMIUM REBUILD (owner's consolidated feedback)
1. **Design** → Executive Sans (locked).
2. **Imagery** → audit + fix mismatches; accurate, on-brand (low-key, food-as-jewel). `design/exports` may be AI-misgenerated.
3. **Functionality** → implement Guided Cook + themes/menus + timing/scheduling (specced).
4. **Content quality** → rewrite recipes: proper English, cooking-method-accurate, strong explanations + drink pairings, Warm Premium voice. The writing IS the product.

## Blockers to resolve before building
- Worktree isolation (see Projects note) — need a worktree or guard disabled to edit BCB.
- `/compact` — owner-initiated; I can't trigger it. This handoff preserves state.

## Next (proposed)
A **vertical pilot** — take ONE Signature-12 recipe (e.g. `pan-seared-steak-butter-thyme`) to **full premium end-to-end**: Executive Sans redesign + rewritten content (voice, cooking-method-accurate steps, strong explanation + drink pairing, proper English) + accurate hero image + serving scaling. Nail the bar on one, then scale 12 → 100 and layer functionality.
