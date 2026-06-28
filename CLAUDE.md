# The Ultimate Bachelor Cookbook

> Project instructions. This file is read FIRST by every AI agent working in this repo.
> This project runs under the **AI Agent OS** — see `AI_AGENT_OS.md`.

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
- Cooking is leverage and generosity, **never consolation**. No sad-solo, "you deserve,"
  or pity framing — ever.

Full voice rules in PROJECT_BRIEF.md.

## How to work here (read order)

Before writing any code or content, read in this order:

1. `CLAUDE.md` (this file)
2. `DESIGN.md`
3. `knowledge/` (canonical source of truth)
4. `docs/index.html` (generated navigation portal)

Then reuse existing components/content before creating new ones.

## Canonical sources

- **Knowledge** lives in `knowledge/*.md` — treat as the single source of truth.
- **Design** lives in `DESIGN.md` — never invent colours, type, spacing, or components without updating it.
- **Design assets** come from Open Design exports → `~/AI-Shared/OpenDesign/Exports` (copied into `design/`).

## Stack

TypeScript · React · Next.js (Server Components) · Tailwind · shadcn/ui · Radix.
Mobile-first, WCAG AA, editorial layouts.

## Rules (from the OS)

- Never duplicate documentation — update, don't recreate.
- Never duplicate functionality.
- Never break the design language.
- Never ignore accessibility.
- Every architectural decision must be explainable.
