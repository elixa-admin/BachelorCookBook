# Current Sprint — Sprint 66 (Baseline Standardization)

**Last updated:** 2026-07-06
**Status:** Baseline standardization complete · deploying to production
**Branch:** `dev` → fast-forward merge to `main` (Vercel production)

---

## Objective

Establish one standard, consistent base across the whole repository — code
format, source structure, documentation, and live-site alignment — then ship it
to production as a clean foundation for feature work.

---

## What shipped this sprint

### Code & format baseline
- Added `.editorconfig`, `.prettierrc.json`, `.prettierignore`; added `prettier`
  as a devDependency with `npm run format` / `format:check` scripts.
- Ran Prettier across the clean targets (`src/`, `public/tub/data/`, configs).
- Stripped 49 trailing-whitespace lines from `tub-app.html` (JS region).
- Added `/* */` headers to the three header-less minified data files
  (`recipes-data.js`, `fullcook-conversions.js`, `glossary.js`).

### Bug fix (behavior change)
- **`RECIPE_STORAGE` collision fixed.** `storage-reheating.js` was overwriting
  `storage.js` on load (both assigned `window.RECIPE_STORAGE`), silently
  discarding every Heritage/SA storage entry (bobotie, breyani, bunny-chow…).
  Changed to merge semantics (`Object.assign`). Verified: 182 storage keys now
  resolve vs ~75 before.

### Repository cleanup (58% file reduction, zero runtime impact)
- Removed 28 obsolete sprint/phase/handover `.md` files from root.
- Removed the dead `tub-import/` archive (264 files; zero runtime references).
- Trimmed dormant Next.js `src/` to a minimal shell (root redirect handles
  routing to the TUB app; removed dead recipe routes/components/lib).
- Renamed `docs/index.html` → `docs/PROJECT_INDEX.html` (AGENTS.md canonical name).
- Added `.claude/worktrees/` to `.gitignore`.

### Documentation
- Created the 5 AGENTS.md-mandated canonical docs (see list below).
- One recipe count everywhere: **58 locked recipes** (no more 58/64/72 split).

## Verification evidence
- `npm run lint` — pass
- `npm run format:check` — pass
- `npm run build` — pass (Next.js 16 / Turbopack, 4 static pages)
- Browser golden path — library → filter → recipe → COOK/STORY/LEARN tabs
- Storage fix confirmed on Heritage (bobotie) + Signature (risotto) recipes
- Vercel production deploy — see `BUILD_PHASE_BEACON.md`

---

## Next action

With the baseline clean and on production, begin the content-depth roadmap
documented in `NEXT_3_SPRINTS_PLAN.md`. Recommended start: **Phase A recipe
audit** (de-risks all downstream content work).
