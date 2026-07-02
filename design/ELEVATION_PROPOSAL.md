# Design Elevation Proposal — The Ultimate Bachelor Cookbook

> Deepen Dark & Moody into a highly professional, "wow" system while respecting the locked palette and type.

## Executive Summary

The current implementation shows strong adherence to the design language (consistent tokens, card components, editorial typography) but lacks three critical layers for professional polish:

1. **No responsive breakpoint system** — components lack mobile/tablet/desktop variants
2. **No motion language** — animations are ad-hoc, not standardized
3. **Missing elevation depth** — flat surfaces without glass/glow treatment

This proposal introduces concrete token values and techniques to elevate the system without breaking the locked foundation.

---

## 1. Motion & Animation Language

**Technique: CSS + Motion One (lightweight, 2.7KB)**

Motion One provides declarative, GPU-accelerated animations with clean syntax and auto-completion. Framer Motion is overkill for this use-case (87KB+), and pure CSS limits choreography.

### Motion Tokens (add to `globals.css`)

```css
@theme {
  /* Durations (ms) — unhurried, confident */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;

  /* Easing — warm, smooth, never bouncy */
  --ease-out: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Stagger offsets for list reveals */
  --stagger-tight: 50ms;
  --stagger-base: 100ms;
  --stagger-relaxed: 150ms;
}
```

### Motion Patterns

| Interaction | Technique | Duration | Easing |
|------------|-----------|----------|--------|
| **Entrance** | `inView` fade-up (staggered) | 600ms | `ease-out` |
| **Hover** | CSS `transform` + `transition` | 300ms | `ease-out` |
| **Card lift** | `translate-y` + `shadow-lg` | 300ms | `ease-out` |
| **Image zoom** | CSS `scale-105` | 500ms | `ease-out` |
| **Mode switch** | View Transition API | 300ms | `ease-in-out` |
| **Scroll reveal** | Motion One `inView` + threshold | 800ms | `ease-out` |

**Implementation:**
```tsx
// Example: Staggered recipe grid entrance
import { inView } from 'motion-one'

<RecipeGrid className="grid gap-6">
  {recipes.map((recipe, i) => (
    <RecipeCard
      key={recipe.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={inView({ opacity: 1, y: 0 })}
      transition={{ delay: i * 0.1, duration: 0.6 }}
    />
  ))}
</RecipeGrid>
```

---

## 2. Elevation, Depth, Glass & Glow Tokens

**Derived ONLY from locked palette** — no new colors introduced.

### New Surface Tokens (add to `globals.css`)

```css
@theme {
  /* Glass surfaces — bean/ember with opacity */
  --glass-card: rgba(32, 25, 19, 0.6);
  --glass-raised: rgba(42, 33, 24, 0.7);
  --glass-subtle: rgba(21, 17, 13, 0.4);

  /* Glow accents — brandy/paprika with radial blur */
  --glow-brandy: rgba(201, 154, 75, 0.15);
  --glow-paprika: rgba(192, 74, 34, 0.12);
  --glow-oxblood: rgba(110, 36, 32, 0.2);

  /* Shadow stack — warm, not gray */
  --shadow-sm: 0 1px 2px rgba(21, 17, 13, 0.3);
  --shadow-card: 0 4px 12px rgba(21, 17, 13, 0.4), 0 2px 4px rgba(21, 17, 13, 0.2);
  --shadow-lg: 0 12px 32px rgba(21, 17, 13, 0.5), 0 4px 8px rgba(21, 17, 13, 0.3);
  --shadow-glow: 0 0 40px var(--glow-brandy);

  /* Border glow — hover states */
  --border-glow-brandy: 0 0 0 1px rgba(201, 154, 75, 0.3);
}
```

### Glass & Glow Technique

```tsx
// Glass card with subtle glow
<div className="
  bg-glass-card backdrop-blur-xl
  border border-line/50
  shadow-card hover:shadow-lg hover:border-glow-brandy
  transition-all duration-300 ease-out
">
  {/* Content */}
</div>

// Brandy glow accent for CTAs
<button className="
  relative bg-brandy text-espresso
  before:absolute before:inset-0 before:bg-brandy/20
  before:blur-xl before:opacity-0 hover:before:opacity-100
  before:transition-opacity before:duration-500
">
  The Move
</button>
```

---

## 3. Type & Spacing Refinements

**Respect existing scales** — tighten for dark-background optimization.

### Type Tweaks

```css
@layer base {
  /* Tighten tracking on dark (fraunces benefits) */
  .font-display {
    letter-spacing: -0.02em;
  }

  /* Body tracking */
  body {
    letter-spacing: 0.01em;
  }

  /* Selection brandy glow */
  ::selection {
    background: var(--color-paprika);
    color: var(--color-parchment);
    text-shadow: 0 0 20px var(--glow-paprika);
  }
}
```

### Spacing Additions (fill gaps in 4px scale)

```css
@theme {
  /* Add 20px step for card padding sweet spot */
  --spacing-20: 1.25rem;  /* 20px — card padding */
}
```

---

## 4. Mobile-First Responsive Breakpoint System

**Use case: "gorgeous propped up next to the stove"**

### Breakpoint Tokens

```css
@theme {
  /* Mobile-first breakpoints */
  --breakpoint-sm: 640px;   /* Phones landscape + tablets */
  --breakpoint-md: 768px;   /* Tablets portrait */
  --breakpoint-lg: 1024px;  /* Desktop + tablets landscape */
  --breakpoint-xl: 1280px;  /* Wide desktop */
}
```

### Responsive Patterns

| Element | Mobile | Tablet (sm) | Desktop (lg) |
|---------|--------|-------------|--------------|
| **Grid cols** | 1 col | 2 cols | 3 cols |
| **Card padding** | 16px | 20px | 24px |
| **Title size** | 2.5rem | 3.5rem | 4.5rem |
| **Recipe view width** | 100% | 640px | 768px |
| **Hero image height** | 300px | 400px | 500px |

```tsx
// Example responsive card
<div className="
  px-4 py-5 sm:px-5 sm:py-6 lg:px-6 lg:py-8
  text-2xl sm:text-3xl lg:text-4xl
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
">
  {/* Content */}
</div>
```

---

## 5. Component Upgrades

### 5.1 RecipeCard (elevate existing)

```tsx
// Add: glass surface, entrance animation, glow hover
<div className="
  group relative bg-bean border border-line
  hover:bg-glass-raised hover:border-glow-brandy
  hover:shadow-lg hover:-translate-y-1
  transition-all duration-300 ease-out
  rounded-card overflow-hidden
">
  <img
    className="transition-transform duration-500 group-hover:scale-105"
    alt={recipe.title}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent" />
</div>
```

### 5.2 RecipeView (upgrade serving scaler)

```tsx
// Active state: brandy glow
<button className={`
  ${isActive ? 'bg-brandy text-espresso shadow-glow' : 'bg-ember text-parchment hover:bg-glass-raised'}
  transition-all duration-300 ease-out
  px-4 py-3 rounded-full font-semibold
`}>
  {servings}
</button>
```

### 5.3 CookBrief (new component — intro card before recipe)

```tsx
<div className="
  bg-glass-card backdrop-blur-sm
  border border-line/50
  px-6 py-5 sm:px-8 sm:py-6
  rounded-card mb-8
  shadow-sm
">
  <h3 className="font-display text-2xl text-brandy mb-2">The Brief</h3>
  <p className="text-parchment leading-relaxed">
    {cookBrief}
  </p>
</div>
```

### 5.4 CookSession (new component — active cooking mode)

```tsx
// Focus mode: single step, timer integration, reduced UI
<div className="
  fixed inset-0 bg-espresso z-50
  flex items-center justify-center p-6
">
  <div className="max-w-2xl w-full bg-bean rounded-card border border-line shadow-lg p-8">
    {/* Current step + timer + next/prev */}
  </div>
</div>
```

### 5.5 OccasionSwitch (new component — solo/date/host toggle)

```tsx
<div className="flex gap-2 bg-ember p-1.5 rounded-full">
  {['solo', 'date', 'host'].map(occasion => (
    <button
      key={occasion}
      className={`
        ${isActive ? 'bg-brandy text-espresso' : 'text-taupe hover:text-parchment'}
        px-5 py-2.5 rounded-full font-medium capitalize
        transition-all duration-300 ease-out
      `}
    >
      {occasion}
    </button>
  ))}
</div>
```

### 5.6 ServingScaler (extract from RecipeView)

```tsx
// Standalone component for reuse in menu cards
<div className="inline-flex gap-1 bg-ember p-1 rounded-full border border-line/50">
  {[1, 2, 4, 6].map(n => (
    <button key={n} className={activeClasses}>{n}</button>
  ))}
</div>
```

### 5.7 MenuCard (new component — occasion summary)

```tsx
<div className="
  bg-bean border border-line rounded-card
  hover:border-brandy/50 hover:shadow-card
  transition-all duration-300 ease-out
  p-6
">
  <h3 className="font-display text-xl text-brandy mb-3">{occasion}</h3>
  <p className="text-taupe text-sm mb-4">{recipeCount} recipes</p>
  <ServingScaler />
</div>
```

### 5.8 Badge (elevate existing)

```tsx
// Add: subtle glass effect
<span className={`
  inline-flex px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
  bg-${tone}/10 border border-${tone}/30 backdrop-blur-sm
  text-${tone} transition-colors duration-300
`}>
  {children}
</span>
```

---

## 6. Micro-Interactions & States

### Loading States

```tsx
// Skeleton loader for recipe cards
<div className="bg-bean rounded-card overflow-hidden animate-pulse">
  <div className="aspect-[4/3] bg-ember/50" />
  <div className="p-5 space-y-3">
    <div className="h-4 bg-ember/30 rounded w-3/4" />
    <div className="h-3 bg-ember/20 rounded w-1/2" />
  </div>
</div>
```

### Empty States

```tsx
<div className="text-center py-12">
  <div className="text-4xl mb-4">🍷</div>
  <p className="text-taupe text-lg">No recipes match this filter.</p>
</div>
```

### Focus States (accessibility)

```css
/* Add to globals.css */
@layer base {
  *:focus-visible {
    outline: 2px solid var(--color-brandy);
    outline-offset: 2px;
  }
}
```

---

## 7. Imagery Treatment

**Low-key, food-as-jewel** — reinforce photography direction from DESIGN.md.

```css
/* Image treatments */
.recipe-hero {
  filter: contrast(1.1) saturate(0.9);
  mask-image: linear-gradient(to bottom, black 70%, transparent 100%);
}

.recipe-thumb {
  filter: brightness(0.9) contrast(1.05);
  transition: filter 500ms ease-out;
}

.recipe-thumb:hover {
  filter: brightness(1) contrast(1.1);
}
```

---

## 8. Implementation Priority

### Phase 1 (High Impact, Low Effort)
1. Add motion tokens + Motion One (entrance animations)
2. Add glass/glow tokens to `globals.css`
3. Elevate RecipeCard with glass + glow hover
4. Add focus states for accessibility

### Phase 2 (Component Polish)
1. Upgrade RecipeView serving scaler (brandy glow active)
2. Extract ServingScaler component
3. Build OccasionSwitch component
4. Elevate Badge with glass effect

### Phase 3 (New Components)
1. CookBrief component
2. MenuCard component
3. CookSession component (focus mode)
4. Loading/empty states

---

## 9. Missing Tokens Analysis

**The locked palette is COMPLETE** — no new color tokens needed. All elevation effects derive from existing colors via opacity/blur.

**One gap identified:**
- **Success state** — no green in palette. Consider: use `brandy` glow for all positive feedback (completion, saved, etc.) to stay in-brand. Or add `--vermouth: #3A4A3A` (muted olive) for success if needed — but brandy glow maintains candlelit warmth.

**Recommendation:** Use `brandy` glow for all success states (timer complete, recipe saved, etc.) — reinforces brand identity and avoids palette bloat.

---

## 10. Influences Integration

Per `INFLUENCES.md`:

- **Bourdain's warmth** → unhurried motion tokens (`duration-slower`, `ease-out`)
- **Ramsay's precision** → crisp focus states, sharp radius choices
- **Babish's teaching** → clear step-by-step states in CookSession component
- **Oliver's accessibility** → mobile-first breakpoints, touch-friendly buttons

Motion language reflects "the cookbook after dark" — nothing flashy, everything confident and considered.

---

## Conclusion

**Three highest-impact "wow" moves:**

1. **Glass + glow hover states** on RecipeCard — instant premium feel, reinforces candlelit mood
2. **Staggered entrance animations** (Motion One) — cinematic page load, editorial polish
3. **Brandy glow focus/active states** — ties accessibility to brand identity

**No missing tokens** — locked palette is sufficient for all elevation effects via opacity/blur. Success states use brandy glow to maintain candlelit warmth.
