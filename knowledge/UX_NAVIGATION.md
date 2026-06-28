# Navigation & Personalisation — UX direction

> How the site routes and adapts to the reader. Recommended pattern (best practice for a
> premium feel); open to revision.

## Principle: host, don't interrogate

A premium cooking brand should feel like a confident host seating you — not a form to
fill. So we **guide with a soft prompt, never a hard gate**. Decision fatigue is the
enemy of premium; make a strong default and let people adjust in the moment.

## 1. Occasion as the entry point (soft, not blocking)

The homepage hero *is* the occasion choice and the brand in one:

- Full-bleed hero with the tagline ("Dinner is on you."), then three large cards:
  **Just me** (Solo) · **A date** (Date) · **A table** (Host).
- Clicking sets the `occasion` and filters the library (Signature 12 first).
- A compact **OccasionSwitch** stays sticky in the nav to change mode anywhere.
- **Never block:** deep links to a recipe (from Google/social) land straight on it; the
  recipe shows its own occasion badge and offers the switch.
- Remember the last choice (localStorage now; account later) so a returning user lands in
  their usual mode.

*Rationale:* the brand's three-occasion spine becomes the navigation itself — elegant,
on-message, and zero friction for first-time and SEO visitors.

## 2. Skill level — adaptive, not a quiz

Forced onboarding quizzes ("rate your cooking 1–5") are friction *and* people misjudge
themselves. Instead:

- **Difficulty badges** (easy / medium / hard — already in the schema) do the passive
  signalling: the reader sees fit at a glance.
- **Per-recipe detail control:** a confidence slider on the recipe page —
  *More hand-holding ↔ Straight to it* — that expands/collapses technique explanations,
  timers, and "the move" tips inline. The user controls depth in the moment, per dish.
- Default the slider from an **optional, one-tap** preference ("I'm new / I cook often /
  Show me everything"), offered once, skippable, stored in settings. No wall.

*Rationale:* adaptive detail without a gate — beginners get hand-holding only when they
want it; confident cooks aren't slowed; nobody is made to feel called out.

## 3. What we deliberately avoid

- A blocking "who are you / how good are you" modal on first load.
- Forcing an occasion before showing any recipe.
- Account walls in v1.

## Components (see DESIGN.md)

`OccasionSwitch` (hero + sticky), `ServingScaler`, and a new **`DetailSlider`**
(adaptive instruction depth) — add `DetailSlider` to DESIGN.md when building.

## Status

Recommended direction, delegated to best practice. **Next:** confirm, then fold
`DetailSlider` into DESIGN.md and sketch the homepage hero.
