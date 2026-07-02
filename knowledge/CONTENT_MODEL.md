# Content Model — Recipes

> How a recipe is structured. Recipes live as markdown files with frontmatter, so
> search, filtering, serving-scaling, badges, and occasion modes work without
> hardcoded pages.

## Recipe frontmatter schema

```yaml
---
title: Pan-Seared Steak for Two
slug: pan-seared-steak-for-two
category: dinner            # breakfast | brunch | lunch | dinner | snacks | dessert
occasion: date              # solo | date | host
signature: true             # part of the Signature 12?
time_min: 25
difficulty: medium          # easy | medium | hard
servings: 2                 # default portion; UI scales 1 / 2 / 4 / 6
tags: [showstopper, date-night, high-protein]
kitchen_gear: [frying-pan, tongs, meat-thermometer]
image: design/exports/pan-seared-steak-for-two.jpg
source: original            # original | adapted | linked
---
```

## Occasion

Every recipe carries a primary occasion — the three modes the product is built around:
- `solo` — weeknight for one. Feed yourself like you matter.
- `date` — cook to impress. The showstoppers.
- `host` — scaled for a table. Be generous.

A dish can suit more than one; pick the **primary**, use `tags` for the rest.
**v1 leads with `date`** — seed the Signature 12 there first, then Solo and Host.

## Scalable servings

`servings` is the recipe's natural default, **not a hard cap**. The UI lets the reader
choose 1 / 2 / 4 / 6 and re-calculates quantities. Write ingredients as per-serving-
friendly values (e.g. "1 steak", "200g per person") so scaling stays clean.

## The Signature 12

A curated dozen — `signature: true` — the dishes every man should own by heart. These
anchor the brand: tight, impressive, repeatable. Don't tag a recipe `signature` lightly;
it's the hall of fame.

## Body

Every recipe opens with an H1 title and a leading blockquote intro (Warm Premium voice —
`src/lib/markdown.ts`'s `firstBlockquote` extracts this for the recipe detail header),
then four sections in order:

```markdown
# Pan-Seared Steak for Two

> A great steak is less recipe than ritual. Salt it early, let the pan get properly hot...

## Ingredients
- 2 ribeye steaks (≈250g each)
- Flaky salt, cracked pepper
- 2 tbsp butter, 2 garlic cloves, 2 thyme sprigs

*Scales by the steak: 1 person, 1 steak, ~30g butter.*

## Steps
1. Salt the steaks 45 min ahead; rest at room temp.
2. Sear hot in a dry pan, ~2 min per side, basting with butter.

## The move
Basting isn't garnish — the foaming butter cooks the top and seasons the crust.

## To drink
A Malbec, or a Negroni poured before she arrives. No alcohol? Sparkling water with citrus.
```

- **`## Ingredients`** — a scaling note in italics (`*...*`) is optional but recommended
  when quantities don't scale linearly (spices, salt); `src/lib/markdown.ts`'s
  `splitIngredients` strips italic lines from the list automatically.
- **`## Steps`** — numbered, imperative, sensory. Teach the technique inline.
- **`## The move`** — one crystallized technique insight, not a recap of the steps.
  Rendered in its own callout card; collapses under "Straight to it" detail mode.
- **`## To drink`** — one pairing, alcohol + non-alcohol option, one or two sentences.
  All 12 Signature recipes carry this; treat it as required, not optional.

## Rules

- Set `occasion` and an honest `servings` on every recipe.
- Add new frontmatter fields here before using them in the UI.

## Status

**v1 schema is locked and in active use** for the Target 100 library expansion
(`LIBRARY_PLAN.md`). A v2 proposal exists — `CONTENT_MODEL_V2_PROPOSAL.md`
(nutrition, pairings, method options, timed/parallel steps) — but per the owner's
decision in `ROADMAP.md` ("Minimal" schema scope), it is **deferred**: new recipes
should keep using this v1 shape, not the v2 fields, until that track is prioritised.
