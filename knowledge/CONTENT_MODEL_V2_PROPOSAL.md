# Content Model v2 Proposal

> Extended frontmatter + body schema to support owner's directives 3–7: regions/themes, timed parallel steps, method options, before-you-start gate, nutrition, technique callouts, scaling hints, and pairings.

---

## New frontmatter fields

```yaml
---
# v1 fields (unchanged)
title: Pan-Seared Steak, Basted in Butter & Thyme
slug: pan-seared-steak-butter-thyme
category: dinner
occasion: date
signature: true
time_min: 25
difficulty: medium
servings: 2
tags: [showstopper, date-night, high-protein, one-pan]
kitchen_gear: [frying-pan, tongs, spoon]
image: design/exports/pan-seared-steak-butter-thyme.jpg
source: original

# v2 additions
cuisine: French                # for regional themes (directive 4)
region: Europe                 # broader theme grouping
energy_kJ: 2840                # per-serving nutrition (directive 7)
energy_kcal: 680
protein_g: 52
carbs_g: 2
fat_g: 56
 fibre_g: 0
sugar_g: 0
sodium_mg: 1120

method_options:               # directive 5: best-method recommendation
  - method: stovetop
    label: Cast-iron skillet
    time: "12 min"
    temp: "high"
    best: true
  - method: grill
    label: BBQ grill
    time: "10 min"
    temp: "high"
  - method: oven
    label: Reverse-sear
    time: "25 min"
    temp: "135°C → 220°C"

pairings:                      # directive 7
  - type: wine
    name: Malbec
    detail: Full-bodied, with dark fruit and earth that stands up to the rich fat.
  - type: cocktail
    name: Negroni
    detail: Bitter-sweet, poured before she arrives.

# v2 body structure (below)
---
```

---

## v2 Body structure

### 1. Brief block (directive 6: "Before you start" gate)

```markdown
## Brief

**One pan, 20 minutes.** Salt early, get the pan hot, baste in foaming butter — the kitchen smells like a brasserie.

**What you'll do:** Salt steaks → Sear hard → Baste with butter-thyme → Rest → Slice.

**What to expect:** Dark crust, pink centre, buttery finish. The smell alone starts the conversation.

**Watch out for:** Don't crowd the pan. Don't flip constantly. Let the crust form.

**Kit:** Frying pan (cast-iron is ideal), tongs, spoon.
```

### 2. Ingredients with scaling hints (directive 7)

```markdown
## Ingredients

**Protein**
- 2 thick ribeye or sirloin steaks, ~250g each
  *Scales by the steak. Taper salt/pepper: season to taste.*

**Aromatics & finish**
- 60g butter
- 4 sprigs thyme
- 2 garlic cloves, smashed in their skins
- Flaky salt and cracked black pepper
- 2 tbsp neutral oil
```

### 3. Timed, parallel-aware steps (directive 5: timing + parallel tracks)

```markdown
## Steps

{group: "prep", duration: 5, passive: false}
1. **Pat steaks dry; salt generously.** Forty-five minutes ahead if you can — let them sit at room temperature.

{group: "sear", duration: 6, passive: false, depends_on: "prep"}
2. **Get the pan properly hot** with the oil, just smoking.
3. **Lay the steaks in.** Sear about 2 minutes a side for medium-rare, turning every minute so the fat renders.

{group: "baste", duration: 2, passive: false, depends_on: "sear"}
4. **Lower the heat.** Add the butter, garlic, and thyme; tilt the pan and spoon the foaming butter over the steaks for a minute.

{group: "rest", duration: 5, passive: true, depends_on: "baste"}
5. **Rest on a warm plate**, 5–8 minutes. Slice, then pour the resting juices back over.
```

**Step annotations:**
- `group`: phase ID for parallel-track choreography
- `duration_min`: estimated time for progress bar
- `passive`: true = hands-off (resting, simmering)
- `depends_on`: precedences that must complete first
- Parallel groups can run simultaneously (e.g., "prep rice" while "prep protein")

### 4. Technique callouts (directive 7)

```markdown
## Why this works

**Basting seasons the crust.** The foaming butter cooks the top and infuses garlicky-thyme flavour. Spoon, don't flip-and-pray.

**Resting is not optional.** Juice redistributes; the crust softens just enough. Slice too soon and you lose the finish on the plate.
```

---

## Fully-worked example: Pan-seared steak in v2 schema

```markdown
---
title: Pan-Seared Steak, Basted in Butter & Thyme
slug: pan-seared-steak-butter-thyme
category: dinner
occasion: date
signature: true
time_min: 25
difficulty: medium
servings: 2
tags: [showstopper, date-night, high-protein, one-pan]
kitchen_gear: [frying-pan, tongs, spoon]
image: design/exports/pan-seared-steak-butter-thyme.jpg
source: original
cuisine: French
region: Europe
energy_kJ: 2840
energy_kcal: 680
protein_g: 52
carbs_g: 2
fat_g: 56
fibre_g: 0
sugar_g: 0
sodium_mg: 1120
method_options:
  - method: stovetop
    label: Cast-iron skillet
    time: "12 min"
    temp: "high"
    best: true
  - method: grill
    label: BBQ grill
    time: "10 min"
    temp: "high"
  - method: oven
    label: Reverse-sear
    time: "25 min"
    temp: "135°C → 220°C"
pairings:
  - type: wine
    name: Malbec
    detail: Full-bodied, with dark fruit and earth that stands up to the rich fat.
  - type: cocktail
    name: Negroni
    detail: Bitter-sweet, poured before she arrives.
---

# Pan-Seared Steak, Basted in Butter & Thyme

> A great steak is less recipe than ritual. Salt it early, let the pan get properly hot,
> and baste it in foaming butter and thyme until the kitchen smells like a brasserie.
> Twenty minutes for something that tastes like you booked the table — cook it for someone
> you'd like to keep talking to.

## Brief

**One pan, 20 minutes.** Salt early, get the pan hot, baste in foaming butter — the kitchen smells like a brasserie.

**What you'll do:** Salt steaks → Sear hard → Baste with butter-thyme → Rest → Slice.

**What to expect:** Dark crust, pink centre, buttery finish. The smell alone starts the conversation.

**Watch out for:** Don't crowd the pan. Don't flip constantly. Let the crust form.

**Kit:** Frying pan (cast-iron is ideal), tongs, spoon.

## Ingredients

**Protein**
- 2 thick ribeye or sirloin steaks, ~250g each
  *Scales by the steak. Taper salt/pepper: season to taste.*

**Aromatics & finish**
- 60g butter
- 4 sprigs thyme
- 2 garlic cloves, smashed in their skins
- Flaky salt and cracked black pepper
- 2 tbsp neutral oil

## Steps

{group: "prep", duration_min: 5, passive: false}
1. **Pat steaks dry; salt generously.** Forty-five minutes ahead if you can — let them sit at room temperature.

{group: "sear", duration_min: 6, passive: false, depends_on: "prep"}
2. **Get the pan properly hot** with the oil, just smoking.
3. **Lay the steaks in.** Sear about 2 minutes a side for medium-rare, turning every minute so the fat renders.

{group: "baste", duration_min: 2, passive: false, depends_on: "sear"}
4. **Lower the heat.** Add the butter, garlic, and thyme; tilt the pan and spoon the foaming butter over the steaks for a minute.

{group: "rest", duration_min: 5, passive: true, depends_on: "baste"}
5. **Rest on a warm plate**, 5–8 minutes. Slice, then pour the resting juices back over.

## Why this works

**Basting seasons the crust.** The foaming butter cooks the top and infuses garlicky-thyme flavour. Spoon, don't flip-and-pray.

**Resting is not optional.** Juice redistributes; the crust softens just enough. Slice too soon and you lose the finish on the plate.
```

---

## Migration impact

### `src/lib/markdown.ts` changes

**New parsers required:**
- `parseBrief(md: string)`: extracts `## Brief` block
- `parseMethodOptions(frontmatter: any): MethodOption[]`
- `parsePairings(frontmatter: any): Pairing[]`
- `parseNutrition(frontmatter: any): Nutrition`
- `parseStepAnnotations(line: string): { group, duration_min, passive, depends_on }`

**Step parser update:**
```ts
// Current: splitIngredients doesn't handle step annotations
// v2: parseSteps extracts {group, duration, passive, depends_on} from curly braces
```

### `src/lib/scale.ts` changes

**Current behaviour:** Regex-based line scaling (integer/decimal/fraction).

**v2 additions needed:**
- Parse tapered scaling notes from italic asterisk comments
- Handle nutrition scaling (kJ-first, then kcal)
- Respect `scaling` hint flags if added to ingredient lines (e.g., `(taper: salt)`)

**No breaking change:** Existing `scaleLine` works; v2 adds structured scaling hints as parallel metadata.

---

## New fields summary

**Frontmatter additions:**
1. `cuisine`, `region` — for themes by region
2. `energy_kJ`, `energy_kcal`, `protein_g`, `carbs_g`, `fat_g`, `fibre_g`, `sugar_g`, `sodium_mg` — nutrition
3. `method_options` — method variants with `best` flag
4. `pairings` — drink/side matches

**Body structure additions:**
5. `## Brief` block — overview/arc/expect/watch-out/kit for before-you-start gate
6. Step annotations — `duration_min`, `group`, `passive`, `depends_on` for parallel timing
7. `## Why this works` — technique callouts per step or whole dish
8. Ingredient italic notes — scaling hints (tapered, per-serving-friendly)

---

## Biggest schema decision for the owner

**Step annotation syntax.** The curly-brace inline format (`{group: "sear", duration_min: 6...}`) keeps steps readable in markdown while enabling parallel-track choreography. Alternatives considered: YAML frontmatter array (less readable), separate `TIMING.md` file (fragmented). This choice prioritises **cook-facing readability** (markdown stays prose-like) while giving the UI enough structure for timing calculations and parallel-track visualisation.

**Trade-off:** Markdown is no longer pure prose — annotations add syntax. But this single convention unlocks directive 5's timing + parallel tracks without duplicating content.
