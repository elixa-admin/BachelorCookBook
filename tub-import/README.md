# TUB import — raw archive, not yet integrated

> This directory is a **complete, unmodified mirror** of a background Claude Code job
> (`~/.claude/jobs/d2505485/`) that spent 2026-06-28 → 2026-07-02 building a much more
> advanced version of this same product under the working name "TUB." It could not
> write directly into this repo (worktree isolation guard blocks background sessions
> from editing a foreground-active project), so it built and iterated in its own job
> scratch space instead. Mirrored here 2026-07-02 to preserve it before that job
> directory can be cleaned up. **Nothing in this folder has been reviewed, pruned, or
> integrated yet** — treat it as source material, not as running code.

## What's actually running

The live app (`tub-app.html` + `recipes/*.js` + icons + manifest) is also copied,
unmodified, into `public/tub/` so it's servable from this repo's own dev server at
`/tub/tub-app.html` — independent of the original job's Python server. That's the
fastest way to look at the real thing. **This folder (`tub-import/`) is the archive;
`public/tub/` is the running copy.**

## Key docs to read first

- `PROJECT_SPEC.md` — onboarding doc: architecture, data model, conventions, hard
  constraints (SA localization, metric-only units, no emoji, uppercase headings).
- `HANDOFF.md` — session state as of 2026-06-28. **Two things in it are stale per
  owner decision (2026-07-02):** the "Executive Sans" (steel/emerald) design note was
  superseded — the wine-red/gold dark editorial actually built is canonical. Its
  "BCB = de-facto canonical, tub = candidate to port into BCB" framing is now the
  confirmed direction.
- `RECIPE_STANDARD.md` — the authoring standard actually used: consensus-driven
  (≈65%+ source agreement), 12 required sections per recipe, SA palate/terminology
  rules. Materially more rigorous than this repo's `prompts/write-recipe.md`.
- `RECIPE_REVIEW.md` — flags ~83 proper meals vs ~63 non-meals and 3 duplicates in the
  146-dish roster, **pending owner sign-off on what to prune.** Unresolved.

## Data model (very different from this repo's markdown + frontmatter)

`recipe-atlas.json` (146 dishes) + ~34 `recipes/*.js` files, each assigning a
`window.SOME_GLOBAL` that `tub-app.html` merges at runtime. Ingredients carry a
scaling *type* per line (`linear` / `taper` / `countN` / `countX` / `static`) rather
than the regex-guessed scaling this repo's `src/lib/scale.ts` does. See
`PROJECT_SPEC.md` §3 for the assembly logic and the lexical-closure-vars gotcha
(`R`, `FULL`, `favs`, `cooked`, `shop`, `plan` are not on `window`; read via
function calls or `localStorage`, not `window.x`).

## Known open decisions (not resolved by this import)

- Content pruning sign-off (`RECIPE_REVIEW.md`).
- ~95 of 146 dishes still lack real photos (generative gradient tiles stand in).
- Target schema for the actual Next.js port: adopt this JSON/JS model close to
  as-is, or fold its richness into this repo's `CONTENT_MODEL_V2_PROPOSAL.md`
  markdown-based schema. Not yet decided.
