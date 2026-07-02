# Guided Cook Spec

> The three-phase flow that synthesizes themed menus, parallel scheduling, and readiness gates.

## Phase 1: Brief — The readiness gate

Before the user commits to cooking, they see a concise briefing that answers "what am I walking into?" This is directive (6) — the before-you-start gate.

**Content:**
- **Recipe header:** title, occasion, total time, difficulty, servings
- **Ingredient overview:** grouped by role (base, aromatics, finish), with the pantry staples called out separately
- **The arc:** 3-5 high-level bullets that sketch the whole shape — "sear high, rest low, finish with butter" — so they hold the structure before stepping into it
- **What to expect:** the one moment that matters (the flip, the emulsion, the pull temp) and where it goes wrong (overcrowding the pan, skipping the rest)
- **Recommended method + kit:** primary cooking method (pan-roast, braise, stir-fry) and the essential gear (cast-iron skillet, tongs, instant-read)
- **Call-to-action:** "Start cooking" — locked in, ready to go

**Content model fields:** `brief.title`, `brief.occasion`, `brief.time_min`, `brief.difficulty`, `brief.servings`, `brief.ingredients_grouped`, `brief.arc`, `brief.critical_moment`, `brief.failure_mode`, `brief.method`, `brief.method_best`, `brief.kitchen_gear`

## Phase 2: Timeline — Reverse-engineered choreography

Directive (5) — per-dish timing and parallel tracks for multi-course menus. The algorithm takes target finish time and works backward, staggering steps so everything lands hot.

**Inputs (from content model):**
- `duration_min` — per-step duration
- `depends_on` — step dependencies (step 3 requires step 1 complete)
- `passive` — boolean flag on steps (simmering, resting, baking = true; active work = false)
- `parallel_group` — steps that can run concurrently (e.g., "prep aromatics" while "water boils")
- `method_best` — preferred method when multiple exist

**Algorithm (high-level):**
1. Parse all steps into nodes with `(duration, dependencies, passive, parallel_group)`
2. Build dependency graph — edges from `depends_on` to dependent steps
3. Identify critical path: longest chain of dependent steps
4. For multi-course menus: interleave courses by target finish time (main → sides → starter)
5. Passive gaps become free windows: schedule prep tasks into simmering/resting periods
6. Output: Gantt-style timeline with staggered start times and parallel-track indicators

**Output visualization:** Horizontal timeline with parallel lanes, step markers at start times, passive periods shaded as free windows, cross-course dependencies marked.

## Phase 3: Cook — Guided step mode

Step-by-step execution with current-step focus, inline timers, technique callouts, and parallel-track awareness.

**Per-step content:**
- Step instruction (the action)
- Timer (if duration exists and is user-paced)
- "Why" callout (technique explanation — "resting redistributes juices")
- Parallel-track prompt ("while this simmers, start step 4: prep the salad")
- Completion checkpoint (sensory cue — "golden and fragrant")

**Client state model:**
```typescript
{
  currentStep: number,
  activeTimers: { stepId: number, remainingSec: number, paused: boolean }[],
  parallelSteps: number[], // steps available to start now
  completedSteps: number[],
  timeline: { stepId: number, startOffset: number, duration: number, parallelWith: number[] }[]
}
```

## Component breakdown

- `BriefGate` — phase 1 readout, grouped ingredients, arc bullets, method badge, "Start cooking" CTA
- `TimelineView` — phase 2 Gantt chart, parallel lanes, passive windows shaded, cross-course sync points
- `StepRunner` — phase 3 current step focus, inline timer controls, "why" expanders, parallel-step prompts, completion checkbox
- `MethodPicker` — when `method_best` differs from alternatives, show recommendation with rationale
- `ParallelWorkTracker` — sidebar/banner surfacing available parallel tasks during passive gaps

## Content model additions

Extend `CONTENT_MODEL.md` frontmatter:
```yaml
method_best: pan-roast                    # when multiple methods exist
parallel_group: prep                      # groups steps that can run together
depends_on: [1, 2]                        # step dependencies (on step IDs)
passive: true                             # simmering, resting, baking
brief:
  arc: ["sear hard", "rest low", "finish butter"]
  critical_moment: "the flip"
  failure_mode: "overcrowding the pan"
```

---

**Three-phase flow (one sentence each):**
1. Brief shows what you're making, the arc of how it comes together, the one moment that matters, and locks you in with "Start cooking."
2. Timeline reverse-engineers from target finish time, staggers steps across parallel tracks, and fills passive gaps with prep work.
3. Cook walks you step-by-step with current-step focus, inline timers, technique explanations, and prompts for parallel tasks you can start now.

**Single biggest algorithmic risk:** The parallel scheduler assumes step durations are predictable and dependencies are correctly modeled — but real cooking has variability (pan heat, ingredient temp, human pace) that can break the staggered timeline if the critical path drifts. Safety margin buffers and user-controlled "pause + resync" are mitigation.
