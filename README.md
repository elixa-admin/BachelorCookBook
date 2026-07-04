# The Ultimate Bachelor Cookbook

The cookbook for the eligible man — "Dinner is on you." Built to cook to impress:
solo on weeknights, a date on Friday, a table on Saturday.

## Start here

**`public/tub/tub-app.html`** is the live product — a single self-contained
HTML file (no build step, no framework) covering 117 dishes, guided
step-by-step cooking, shopping list, meal planner, and a pantry-driven "cook
tonight" finder. The site root (`/`) redirects there. Edit it and
`public/tub/recipes/*.js` directly; changes are visible on refresh.

Read in this order before making changes:
1. `CLAUDE.md` — project rules, read first by every agent
2. `knowledge/ROADMAP.md` — current state, what's superseded, session history
3. `tub-import/RECIPE_STANDARD.md` — recipe authoring standard
4. `knowledge/` — canonical source of truth for the (dormant) Next.js build

## Run it locally

```bash
npm install
npm run dev   # http://localhost:3000, redirects to /tub/tub-app.html
```

No build step is needed to edit TUB itself — it's static HTML/CSS/JS served
from `public/`. `npm run dev` is only for the redirect + the dormant Next.js
app under `src/`.

## Deployment

Published to GitHub (`elixa-admin/BachelorCookBook`) and Vercel. Pushing to
`main` triggers a deployment automatically.

## Repo layout

```
public/tub/
├── tub-app.html          # the live app — all CSS + JS + HTML in one file
└── recipes/              # ~33 data files loaded by tub-app.html
    ├── recipes-data.js       # core recipe content (window.RECIPES)
    ├── roster-classes.js     # which recipes are live vs. cut, tier, category
    ├── premium-batch.js, global-exotic-batch.js, ...   # additional recipe batches
    ├── stories.js             # editorial narratives (Story tab)
    └── ...                    # nutrition, images, glossary, methods, equipment, etc.

knowledge/            # canonical docs for the dormant Next.js build + roadmap
tub-import/           # full archive: scripts, audits, screenshots, provenance
src/                  # dormant Next.js build (not the live product — see ROADMAP.md)
AUDIT_WEEK*.md, RECIPE_AUDIT_FRAMEWORK.md, MASTER_PROMPT.md   # recipe QA working docs
```

## Current state (see `knowledge/ROADMAP.md` for the full history)

- **117 live recipes**, all at full-cook completeness (ingredients + steps).
- Recipe content audit in progress: Signature 12 recipes validated against
  chef consensus (Pépin, Keller, Ramsay, Waters); see `RECIPE_AUDIT_FRAMEWORK.md`.
- Known gap: ~20 recipes classified as proper meals in `tub-import/RECIPE_REVIEW.md`
  (Gatsby, Harira, Pozole, Tamales, Bun Cha, Nasi Lemak, and others) have never
  been authored — no ingredients or steps exist yet.

## Rules

- Never duplicate documentation — update, don't recreate.
- Never duplicate functionality.
- Never break the design language (wine-red/gold dark editorial, Oswald + Inter Tight).
- Every architectural decision must be explainable.

Full detail in `CLAUDE.md`.
