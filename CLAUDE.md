# The Ultimate Bachelor Cookbook

> Project instructions. This file is read FIRST by every AI agent working in this repo.
> This project runs under the **AI Agent OS** — see `AI_AGENT_OS.md`.

## ⚠ Current working copy: TUB (read this first)

**`public/tub/tub-app.html` is the live, primary app — a single self-contained HTML
file (no build step, no framework), covering 146 dishes, guided step-by-step cooking,
shopping list, meal planner, and pantry-driven "cook tonight."** The site root (`/`)
redirects there (see `next.config.ts`). This is the copy to refine going forward.

- Full provenance and what it supersedes: `knowledge/ROADMAP.md`'s "MAJOR UPDATE"
  section and `tub-import/README.md`.
- Edit `public/tub/tub-app.html` and `public/tub/recipes/*.js` directly — it's a
  no-build static app; changes are visible on refresh, no compile step.
- Recipe authoring standard: `tub-import/RECIPE_STANDARD.md` (supersedes
  `prompts/write-recipe.md` below).
- The rest of this file (Signature 12, Solo/Date/Host occasion model, Dark & Moody
  design, shadcn/Next.js recipe stack) describes the **original Next.js build**,
  which still exists (`src/`, `knowledge/recipes/*.md`) but is **dormant, not
  deleted** — real content, not currently the live product. Don't build new features
  there without checking `knowledge/ROADMAP.md` first.

## What this project is

**The Ultimate Bachelor Cookbook** — the cookbook for the **eligible man**, built to
**cook to impress**. Tagline: *"Dinner is on you."*

v1 leads with the **Date** occasion — showstoppers that close the evening — with Solo
and Host to follow. Recipes scale (1 / 2 / 4 / 6) around a Signature 12. See
`knowledge/PROJECT_BRIEF.md` for full positioning.

## Voice & look (locked)

- **Voice — Warm Premium.** Sensory, unhurried, assured. Atmosphere over punch. Write
  like a calm host who knows what he's doing, not a hype man. *("A great steak is less
  recipe than ritual…")*
- **Look — Dark & Moody.** Candlelit, intimate, cinematic. See `DESIGN.md`.
  **Superseded for TUB** by the wine-red/gold dark editorial actually built in
  `public/tub/tub-app.html` (Oswald + Inter Tight, no serif) — see ROADMAP.md.
- Cooking is leverage and generosity, **never consolation**. No sad-solo, "you deserve,"
  or pity framing — ever. **This still applies to TUB.**

Full voice rules in PROJECT_BRIEF.md.

## How to work here (read order)

Before writing any code or content, read in this order:

1. `CLAUDE.md` (this file — see the TUB banner above first)
2. `knowledge/ROADMAP.md` (current state and what's superseded)
3. `DESIGN.md` (legacy Next.js build only)
4. `knowledge/` (canonical source of truth)
5. `docs/index.html` (generated navigation portal)

Then reuse existing components/content before creating new ones.

## Canonical sources

- **Knowledge** lives in `knowledge/*.md` — treat as the single source of truth.
- **Design** lives in `DESIGN.md` — never invent colours, type, spacing, or components without updating it. Applies to the legacy Next.js build; TUB's design lives in its own CSS vars inside `tub-app.html`.
- **Design assets** come from Open Design exports → `~/AI-Shared/OpenDesign/Exports` (copied into `design/`).

## Stack

**TUB (live app):** vanilla HTML/CSS/JS, no build step, no framework. See
`tub-import/PROJECT_SPEC.md` for architecture (data-file assembly, localStorage keys,
verification harnesses).

**Legacy Next.js build (dormant):** TypeScript · React · Next.js (Server Components) ·
Tailwind · shadcn/ui · Radix. Mobile-first, WCAG AA, editorial layouts.

## Rules (from the OS)

- Never duplicate documentation — update, don't recreate.
- Never duplicate functionality.
- Never break the design language.
- Never ignore accessibility.
- Every architectural decision must be explainable.
