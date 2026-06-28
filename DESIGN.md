# DESIGN — The Ultimate Bachelor Cookbook

> The visual source of truth. Do not invent colours, type, spacing, or components
> without updating this file. Design assets arrive as Open Design exports in
> `~/AI-Shared/OpenDesign/Exports` (copied into `design/`).

## Direction: "the cookbook after dark"

Intimate, candlelit, cinematic. Low-key lighting and deep warm backgrounds; food is the
jewel caught in a glint. Generous dark negative space, type does the heavy lifting.
Think Cherry Bombe / Saveur — a supper-club after dark.

## Colour (dark, warm, candlelit)

| Token | Value | Use |
|-------|-------|-----|
| `--espresso` | `#15110D` | Page background — warm near-black |
| `--bean` | `#201913` | Cards / surfaces |
| `--ember` | `#2A2118` | Raised surfaces, hover |
| `--parchment` | `#F1E7D8` | Primary text — warm off-white, never pure white |
| `--taupe` | `#A89886` | Secondary / muted text |
| `--line` | `#34291F` | Borders, dividers |
| `--brandy` | `#C99A4B` | Primary accent — candlelight glow, CTAs, brand |
| `--paprika` | `#C04A22` | Appetite accent — badges, highlights |
| `--oxblood` | `#6E2420` | Romance accent — used sparingly |

Contrast: `--parchment` on `--espresso` ≈ 14:1 (AAA). `--brandy` on `--espresso` ≈ 7:1
(large text / UI). Body text is always `--parchment`; never dip below `--taupe`.

## Photography (this carries the mood)

- Low-key, single light source (candle, window, bare bulb).
- Dark textured backgrounds; shallow depth of field.
- Steam, glossy sauces, char — food as jewel in shadow.
- One hero shot per recipe; no flat bright overheads.

## Typography

- **Display:** Fraunces (serif) — recipe titles, hero. Tighten letter-spacing on dark.
- **Body:** Inter — everything else.
- Scale (rem): `1.125 · 1.25 · 1.5 · 1.875 · 2.5 · 3.5`
- Line-height: 1.65 body, 1.15 display. Max measure 68ch.

## Spacing

4px base: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64`

## Radius

`4 · 8 · 12 · 16 · 9999 (pill)` — favour smaller radii on dark surfaces for a sharper,
more editorial feel.

## Components (seed inventory)

| Component | Purpose |
|-----------|---------|
| `RecipeCard` | Grid tile: hero shot, title, time, occasion badge |
| `IngredientList` | Scalable by servings, checkbox per item |
| `StepList` | Numbered steps, current-step highlight |
| `Timer` | Inline cooking timer per step |
| `Badge` | Tags: date-night, showstopper, 30-min, signature |
| `SearchBar` | Filter recipes |
| `CategoryNav` | Breakfast / Lunch / Dinner / Snacks |
| `OccasionSwitch` | Solo / Date / Host mode toggle (Date leads v1) |
| `ServingScaler` | 1 / 2 / 4 / 6 — recalculates ingredient quantities |

Add new components here before building them.
