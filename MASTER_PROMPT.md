# The Ultimate Bachelor Cookbook — Master Prompt

**Status:** Live production app (`public/tub/tub-app.html`) with 146 dishes, story narratives, shopping list, meal planner, and pantry-driven "cook tonight" feature.

---

## Project Identity

**The Ultimate Bachelor Cookbook** is the cookbook for the **eligible man** — capable, self-assured, in command of his life. Cooking is his unfair advantage.

### Tagline
- **Hero:** "Dinner is on you."
- **Lede:** "Feed yourself well. Impress everyone else."

### Positioning
Cook **solo** on weeknights (eat well, fast), **impress a date on Friday** (showstoppers), and **host a table on Saturday** (look effortless, be generous). Not survival food — a toolkit for a man who wants every meal to say something about him.

---

## Voice & Tone — Warm Premium

**Philosophy:** Sensory, unhurried, assured. Write like a calm host who knows exactly what he's doing — atmosphere over punch, generosity over swagger.

**Style:**
- Lead with senses (smell, heat, sound); short, confident sentences; let it breathe.
- Cooking is leverage and generosity — **never consolation**. Forbidden: pity framings ("never eat alone again," "you deserve"), sad-solo copy, desperation.
- *Right example:* "A great steak is less recipe than ritual. Salt it early, let the pan get properly hot, baste in foaming butter and thyme. Cook it for someone you'd like to keep talking to."
- *Wrong:* "Steak. The cheat code. You're a legend." (too punchy/wingman)

---

## Design System — Dark & Moody

**Visual identity:** "The cookbook after dark." Candlelit, intimate, cinematic. Low-key lighting, deep warm backgrounds, food as the jewel caught in a glint.

### Color Palette
- **Primary accent:** Wine-red (`#BC3A42`, used for borders, highlights, dinner-fact boxes)
- **Gold accents:** Warm highlights on dish names and emphasis
- **Neutrals:** Dark grays/blacks for backgrounds, off-white for text
- **Surface:** Deep, near-black canvas (`#0D0D0D`)

### Typography
- **Display:** Oswald (bold, all-caps headers, recipe titles)
- **Body:** Inter Tight (clean, readable, premium)
- **Editorial/serif:** Optional serif for prose emphasis
- **No serifs in UI chrome** — serif reserved for editorial/voice moments

### Spacing & Layout
- Generous whitespace, never cramped
- Max-width constraints on prose (72ch for story narratives)
- Padding/margins in rem for rhythm (1rem, 1.5rem, 2rem)
- Border-radius: `2px` for cards, minimal rounding (editorial elegance, not Apple)

---

## Current Architecture — TUB (Vanilla HTML/CSS/JS)

**Live app:** `public/tub/tub-app.html` (single self-contained file, no build step)

### Why Vanilla?
- No framework overhead; instant load on mobile next to the stove
- Direct control over styling and interactivity
- CSS custom properties for theming
- Global window object for data sharing

### Key Files
- **`public/tub/tub-app.html`** — Main app (81K+ of CSS + JS + HTML)
- **`public/tub/recipes/*.js`** — 35+ data files (recipes, images, glossary, stories, methods, etc.)
  - `recipes-data.js` — 146 recipes with fields: slug, title, blurb, cuisine, difficulty, time, servings, ingredients, steps, etc.
  - `recipes-images.js` — Image URLs for each dish (wine-red/gold palette)
  - `stories.js` — **55 narratives** (para1, para2, para3, para4, dinner_fact) — see "Story Tab" below
  - `glossary.js` — Cooking terms + tooltips (abbr hover)
  - `recipes-tips.js`, `nomenclature.js`, etc. — Localized content, substitutes, etymology
  - `recipes-nutrition.js`, `equipment.js` — Optional supplementary data

### Data Flow
1. **HTML** loads topbar, occasion buttons, search, detail pane
2. **External scripts** populate `window.RECIPES`, `window.RECIPE_STORIES`, `window.IMAGES`, etc.
3. **JavaScript functions** (`renderGrid()`, `openRecipe()`, `storyHTML()`, etc.) handle interactivity
4. **CSS variables** (`--text`, `--accent-bright`, `--line-soft`, etc.) drive theming

### Occasions (7 Collections)
1. **01 Cooking for One** — Solo weeknight (fast, assured, repeatable)
2. **02 Cooking for Two** — Date night (romantic, showstoppers)
3. **03 Entertaining** — Host/table (gather, look effortless)
4. **04 From My Pantry** — Pantry-driven "cook tonight" (rank by what you can make now)
5. **05 The Skill Path** — Curriculum (novice → capable → chef)
6. **06 My Cookbook** — Saved favorites + recently cooked
7. **07 Accompaniments & Components** — Sides, breads, sauces (not standalone)

---

## What We Just Built — Story Tab

### The Feature
Every recipe now has a **Story tab** alongside Cook and Learn. Clicking reveals an **editorial narrative** that paints the dish's context, etymology, cooking principle, and memorable wisdom — written to linger with readers.

### Structure (55 recipes covered)
Each narrative has:
- **para1** — Geography, provenance, cultural context. **Dish name is bolded at opening** for visual impact.
- **para2** — Etymology & naming — the honest meaning behind the words
- **para3** — Cooking principle — the technique or science that defines the dish
- **para4** — Lasting wisdom — a memorable insight or philosophy that sticks
- **dinner_fact** — Conversational trivia for the table (or solo cook reflection)

### Example (Cacio e Pepe)
```
para1: "Cacio e Pepe comes from the Castelli Romani hills outside Rome, where shepherds 
watched their flocks with nothing but hard cheese, dried pasta, black pepper, and access 
to water."

para2: "The name: Literally honest — cacio (Pecorino Romano cheese) and pepe (black pepper). 
No mystique, no hidden history."

para3: "The cooking reveals a principle: The starch from pasta water becomes the binding agent, 
the cheese must be finely grated and cold when it meets heat, the pepper blooms at exactly 
the right moment. This dish teaches you emulsification under constraint — no cream to rescue 
a broken sauce, only understanding and precision."

para4: "There's a lesson in poverty transformed into poetry. Shepherds with nothing invented 
a sauce that restaurants now fight over. Cacio e Pepe teaches that mastery isn't about 
ingredients — it's about attention. When you have three things and you understand them 
completely, you can create something infinite."

dinner_fact: "Cacio e Pepe has no cream. The sauce is made entirely from pasta water and 
cheese — a shepherd's lesson in doing more with less, now one of the world's most 
sought-after pastas."
```

### Styling
- **`.story-body`** — 72ch max-width for readability + 12px padding
- **`.story-p`** — 17px font, 1.9 line-height, 32px margins, subtle letter-spacing (0.008em)
- **`.dinner-fact`** — Wine-red box: 3px left border, 48px top margin, rgba(188,58,66,0.08) bg
  - `.df-label` — Small caps label, 11px, letter-spacing 0.14em, wine-red text, 600 weight
  - Paragraph inside — 16px, 1.75 line-height

### Implementation Details
- **Function:** `storyHTML(slug)` (line 1250 in tub-app.html)
  - Retrieves story from `window.RECIPE_STORIES[slug]`
  - Parses para1 to find " comes " and wraps dish name in `<strong>` for bold opening
  - Falls back to provenance if no story exists
- **Tab switching:** Cook / Story / Learn tabs route to correct content pane
- **All 55 recipes covered:** Comprehensive narrative depth across the entire library

---

## Key Components & Patterns

### Recipe Detail View
- **Header:** Recipe title, blurb, difficulty/method/cuisine metadata
- **Tabs:** Cook (full recipe) | Story (editorial narrative) | Learn (techniques/tips)
- **Cook tab includes:**
  - The Brief (sensory lead, at-its-core summary, expectations, stats, kit)
  - Servings scaler (1/2/4/6 — ingredients auto-scale)
  - Ingredients & prep list
  - Timeline (visual prep/cook boundary)
  - Step-by-step instructions with WHY explanations
  - Pairing suggestions (wine/drink, starter, side)
  - Chef's upgrade, health-forward variants
- **Story tab:** The narrative (what we just built)
- **Learn tab:** Methods, tips, etymology, nutrition, dietary adaptations

### Recipe Browser
- **Occasion filters** (7 collections)
- **Tier badges** (Signature, Premium, etc.)
- **Time, cuisine, region tags**
- **Search** (full-text across title, cuisine, blurb, tier, occasion)
- **Pantry filter** ("only show dishes I can make right now" — ranks by ingredient match)
- **Save to cookbook** (heart icon)

### Supporting Features
- **Shopping List** — Add ingredients from recipes; they scale to servings, sort by aisle, flag pantry items
- **Meal Planner** ("The Week Ahead") — Lay out 7 nights, auto-calculate shopping list
- **Pantry Manager** — Add ingredients on hand; "Cook Tonight" ranks recipes by what you can make now
- **Glossary tooltips** — Hover cooking terms (abbr) for definitions

---

## Recipe Content Model

Each recipe contains:
- **Metadata:** slug, title, blurb, cuisine, region, difficulty, occasion(s), tier, time (prep/cook)
- **Brief section:** lead (sensory), expectations (4 bullet points), stats (active/simmer/serves/doneness), kit list
- **Ingredients:** sectioned by building block (aromatics, spice, finish, etc.)
- **Steps:** 6–8 step cards, each with: title, instruction, WHY explanation, optional timer
- **Variants:** serving size scaling (1/2/4/6 persons)
- **Pairings:** wine/drink + starting course recommendations
- **Extras:** chef's upgrade, health-forward variant, dietary fit, common mistakes, serve-with suggestions, storage
- **Story:** (new) Editorial narrative (55 recipes)

---

## File Structure (Key Directories)

```
public/tub/
├── tub-app.html              # Main app (81K+ with all CSS + JS)
└── recipes/
    ├── recipes-data.js       # 146 recipes
    ├── recipes-images.js     # Image URLs
    ├── stories.js            # 55 narratives (para1–4 + dinner_fact)
    ├── glossary.js
    ├── recipes-tips.js
    ├── recipes-nutrition.js
    ├── nomenclature.js
    ├── equipment.js
    ├── methods.js
    ├── culinary.js
    ├── [25+ other batch files for data partitioning]

knowledge/
├── ROADMAP.md               # Current state, what's superseded
├── PROJECT_BRIEF.md         # Canonical project positioning
├── DESIGN.md                # Legacy Next.js design (reference only)
├── recipes/                 # [Dormant Next.js recipe markdown]

CLAUDE.md                     # Project instructions (read first)
MASTER_PROMPT.md            # This file
```

---

## Recent Work & Current State

### Completed (Summer 2026)
✅ **146 full recipes** integrated into TUB (vanilla app, no build step)  
✅ **55 story narratives** written with 4-paragraph structure + dinner facts  
✅ **Story tab** implemented with bold dish names, generous typography, wine-red accent boxes  
✅ **Topbar branding** expanded: TUB + "The Ultimate Bachelor Cookbook" subtitle (Option A wordmark)  
✅ **Mobile responsive** — all UI scales from 375px (mobile) to 1280px (desktop)  
✅ **Shopping list, meal planner, pantry manager** — all functional  
✅ **Search & filtering** — occasion, tier, cuisine, time, pantry-driven ranking  

### In Progress / Next
- **Photo imagery** — High-quality dish photos (wine-red/gold palette) for each recipe
- **Polish edge cases** — Responsive refinements, accessibility (WCAG AA), loading states
- **Performance** — Lazy-load images, optimize bundle size
- **Deployment** — Vercel (or equivalent) for production hosting

---

## Design Principles

1. **Voice first** — Every word earns its place. Warm Premium always.
2. **Editorial elegance** — Minimal chrome, generous breathing room, let food shine.
3. **Mobile-first** — Readable and usable propped next to the stove on a phone.
4. **No sad-solo framing** — Cooking for one is mastery, not consolation.
5. **Leverage and generosity** — Every recipe teaches; every pairing lifts the meal.

---

## Testing Ideas (What to Migrate)

When you move this to a separate Chat session, test:
- **Variation on story narratives** — Different lengths, emphasis, philosophical angles
- **Typography experiments** — Font sizing, line-height, color ramps for the Story tab
- **Topbar layout options** — Different branding expansions or secondary navigation
- **Occasion-specific voice shifts** — Does Solo voice differ from Date voice?
- **Ingredient scaling edge cases** — Does 1.5 servings break anything?
- **Search rank/filter combinations** — Occasion + tier + pantry + cuisine
- **Mobile responsiveness** — How does the story tab read on 375px vs. desktop?
- **Accessibility** — Color contrast, semantic HTML, keyboard navigation

---

## Quick Reference: Key Variables & Functions

### Window Object (Global Data)
- `window.RECIPES` — Array of all 146 recipe objects
- `window.RECIPE_STORIES` — Object mapping slug → {para1, para2, para3, para4, dinner_fact}
- `window.IMAGES` — Object mapping slug → image URL
- `window.GLOSS` — Glossary of cooking terms
- `window.NUTRITION` — Nutrition data per recipe
- `window.activeOcc` — Currently selected occasion (solo, date, host, pantry, etc.)

### Key Functions
- `openRecipe(slug)` — Load recipe detail view
- `storyHTML(slug)` — Render story narrative (or fall back to provenance)
- `renderGrid()` — Populate recipe cards in browser view
- `filterCards()` — Search/filter recipes
- `switchRecipeTab(tab)` — Switch between Cook/Story/Learn

---

## Locked Decisions

✅ **Positioning:** Eligible, confident, self-assured man  
✅ **Voice:** Warm Premium (sensory, unhurried, generous)  
✅ **Look:** Dark & Moody (wine-red/gold, minimal chrome, editorial)  
✅ **Tech:** Vanilla HTML/CSS/JS (no build step, instant load)  
✅ **Lead occasion:** Date (v1)  
✅ **Core feature:** Serving scaling, occasion filtering, story-driven browsing  

---

## Questions to Guide Implementation

1. Does every word serve the Warm Premium voice? (Cut anything punchy or desperate.)
2. Does the UI feel generous and uncluttered? (If in doubt, add space.)
3. Can someone use this one-handed, next to the stove, in low light? (Mobile first.)
4. Does the story feel like something they'd actually read aloud at dinner? (Conversational, memorable.)
5. Is cooking being framed as leverage and mastery, never survival? (No pity, ever.)

---

**Use this brief to test ideas, iterate on design, or explore variations. It's the living spec of what we're building.**
