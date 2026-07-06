# Build Phase Beacon

**Last updated:** 2026-07-06
**Build status:** 🟢 GREEN — production-ready

A single-pane health indicator for the build, deploy, and site state.

---

## Current state: LIVE & HEALTHY

| Check | Status | Evidence |
|---|---|---|
| Lint (`npm run lint`) | 🟢 pass | ESLint clean on trimmed `src/` |
| Format (`npm run format:check`) | 🟢 pass | Prettier clean on governed targets |
| Production build (`npm run build`) | 🟢 pass | Next.js 16 / Turbopack, 4 static pages |
| Local preview (`localhost:3000`) | 🟢 up | `/` → redirect → `/tub/tub-app.html` (354 KB) |
| Vercel production deploy | 🟢 (updated at deploy time) | see deploy section below |
| Storage bug fix | 🟢 verified | 182 storage keys resolve (Heritage + Signature) |

## Architecture in production
- **Live app:** `public/tub/tub-app.html` — single-file PWA, no build step.
- **Wrapper:** Next.js project; root `/` redirects to the TUB app.
- **Data:** `public/tub/recipes/*.js` (52 files) + `public/tub/data/*.js` (6 SA files).
- **Routing:** `/` → `/tub/tub-app.html` (non-permanent redirect in `next.config.ts`).

## Deploy trigger
- Vercel auto-deploys on push to `main` (production branch).
- No `vercel.json` / no GitHub Actions — native Vercel git integration only.
- Production URL: the Vercel project `bachelorcookbook` default domain.

## Verification ports (preferred)
`3002` · `3010` · `8080` — though the standard Next.js dev server runs on `3000`.

## How to re-verify locally
```bash
npm install
npm run lint
npm run format:check
npm run build        # production build (what Vercel runs)
npm run dev          # local preview at http://localhost:3000
```
Then walk the golden path: library → filter → open recipe → COOK / STORY / LEARN.

## Known acceptable warnings
- Wake Lock permission warnings in browser console (harmless; cook-mode feature).
