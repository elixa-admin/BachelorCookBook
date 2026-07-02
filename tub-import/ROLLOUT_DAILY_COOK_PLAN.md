# Rollout — "The Daily Cook" (Major)

**Goal:** Turn TUB from a premium *reference* cookbook into a *daily cooking companion* — the app you open every day to plan, shop and cook — and make it installable on your phone (offline-ready).

**Locked decisions (brainstorm Q&A):** Focus = Daily Cook · Content = +top-20 full-cook · Delivery = PWA.

---

## Pillars

### P1 — Meal Planner (flagship)
Plan the week's cooking; auto-feeds the shopping list; one tap into the guided cook.
- 7-day dinner planner (one slot/day), tap a slot → pick from library / pantry / favorites / 🎲 surprise.
- Servings per day remembered; planner scales ingredients for the shopping list.
- "Cook from my pantry this week" + light balance nudge (don't plan 5 curries).
- **Today view**: what's on tonight, one tap to `startCook`.
- Persists in `localStorage` (`tub_plan`).

### P2 — Shopping List (auto-generated)
- Aggregate the week's (or any selected) ingredients, **scaled to servings**, deduped & smart-grouped (produce / pantry / dairy / protein / spice).
- Check-off; persists (`tub_list`). "Add to list" from any single recipe too.
- **Pantry-aware**: items already in your pantry flagged ("you have this").

### P3 — Favorites / Cookbook + Recently Cooked
- Heart any dish → "My Cookbook" (`tub_favs`); a new occasion/view.
- Track cooked dishes (`tub_cooked`) → "Cook again" + recently-cooked row.

### P4 — Top-20 Full-Cook Conversion (content)
- Author full guided cooks (prov + brief + scaled ings + timeline + steps + pairing) for ~20 highest-traffic "coming soon" dishes.
- 100% accurate, SA-localized; ideal for a **parallel fan-out** (1 dish = 1 independent unit) with a light accuracy review.
- Selection proposed & approved before authoring.

### P5 — PWA Packaging (delivery)
- `manifest.json` (name, icons, theme `#9B2C33`, `display:standalone`).
- Service worker: cache the shell + recipe data JS + the verified images → **offline-capable**.
- Add-to-home-screen; works on the plane / data-free.

### P0 — Generative premium tiles (folded-in quick win)
- The paused visual wave: domain-tinted generative tiles for all 133 photo-less dishes + grid polish. Lowest token, instant visual uplift; lands the "unified theme treatment" half of #26. Does **not** block real-photo restoration.

---

## Sequencing (3 sprints, ~110–170k tokens)
| Phase | What | Est. | Notes |
|------|------|------|-------|
| 0 | Generative tiles + grid polish | 5–10k | quick win, parallel-safe, do first |
| 1 | Favorites + Recently-cooked | 8–15k | lays the localStorage + view infra |
| 2 | Shopping list | 15–25k | reuses pantry ingredient-normalisation |
| 3 | Meal planner (flagship) | 25–40k | builds on favs + list + pantry |
| 4 | Top-20 full-cook (parallel fan-out) | 40–80k | heaviest; accuracy-reviewed |
| 5 | PWA (manifest + service worker) | 8–15k | wraps everything for install/offline |

`/compact` + handoff between sprints (per global protocol). Phases 4 and 0 can run in parallel with 1–3 (independent files).

---

## Open sub-decisions (to sharpen before build)
1. **Planner interaction model** — week-of-dinners (7 slots) vs free queue (3–7 picks) vs full day×meal grid. *(asked below)*
2. **Top-20 selection** — I'll propose the list from traffic/prominence for your approval.
3. **PWA offline depth** — shell+data+verified-images (recommended) vs full-everything.

## Integrity / constraints carried forward
100% accuracy (never fabricate recipes/URLs) · SA localization (°C/g/tsp, beef mince, spring onion, makrut — never cups/oz/°F) · browser data untrusted · pantry localStorage OK · single-file app + `recipes/*.js` data files · mobile-first (60%).
