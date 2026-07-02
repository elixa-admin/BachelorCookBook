# TUB — Provenance Block (Content Spec, 2026-06-28)

Extends `CONTENT_MODEL_V2_PROPOSAL.md`. Every recipe gets a structured **provenance**
story. Lives in frontmatter so the UI can render individual atoms (method chip, popularity
tag, etymology callout) and so cards can surface highlights.

## Schema (frontmatter)
```yaml
provenance:
  popular_in:  "<where it's most popular — specific city/region + reach>"
  famous_for:  "<one line: what makes it iconic / its cultural claim>"
  consists_of: "<short summary of components & key ingredients, SA-named>"
  name_origin: "<if foreign-language: what the name means + why; else 'Self-descriptive.'>"
  why_loved:   "<what drives its appeal — texture, technique, occasion, economy>"
  method:      "<dominant cooking method + technique family>"
```
- SA naming throughout (`beef mince`, `spring onion`, `coriander`, `makrut (kaffir) lime`).
- Each field ≤ ~25 words; tight, editorial, Warm Premium voice.
- `method` doubles as a filter facet (stovetop/oven/braai/air-fryer/no-cook + technique family).

## UI render (Executive Sans)
A **"Provenance"** panel on the recipe page — labelled rows, quiet typography, generous
whitespace. `method` → chip; `name_origin` → distinct etymology callout; `popular_in` →
tag row. Also feeds: card subtitle, cuisine/region browse facets, the Brief readiness gate.

## Occasion framing (design directive)
The three occasions set the page's *mode* — provenance + brief tone adapt:
- **Solo** → efficient mastery, weeknight speed.
- **Date** → impression, romance, a closer.
- **Host** → scale, theatre, feeds a table.
Premium = a successful bachelor cooking for himself, for two, or for a room.

---

## Worked examples (the editorial bar)

### Beef rendang (Exotic → candidate Premium)
```yaml
provenance:
  popular_in:  "West Sumatra, Indonesia — the Minangkabau heartland; across Southeast Asia and at celebrations worldwide"
  famous_for:  "Often voted the world's most delicious dish — a dry curry where coconut milk cooks down for hours until the beef is cloaked in toasted spice"
  consists_of: "Beef braised in coconut milk with lemongrass, galangal, ginger, garlic, chilli and makrut lime, plus a roasted spice paste (rempah), until the sauce splits and fries in its own oil"
  name_origin: "From the Minang word 'randang' — the slow reduction that turns a wet braise into a dry, intensely coated dish. The name describes the technique, not an ingredient."
  why_loved:   "Patience is the ingredient: hours of gentle cooking concentrate flavour and tenderise the beef until it's almost candied. It improves overnight and feeds a room."
  method:      "Stovetop — slow braise-reduction (wet-to-dry curry)"
```

### Cacio e pepe (Signature)
```yaml
provenance:
  popular_in:  "Rome, Lazio — the trattoria classic, now global"
  famous_for:  "The minimalist masterpiece: pasta, cheese, pepper — nothing else, and the hardest of the Roman pastas to nail"
  consists_of: "Tonnarelli or spaghetti, Pecorino Romano, cracked black pepper, and the pasta's own cooking water"
  name_origin: "Roman dialect — cacio ('cheese', Pecorino) + e pepe ('and pepper'). The name is literally the ingredient list."
  why_loved:   "Ten minutes, four ingredients, restaurant-grade — if the emulsion holds. The starch-water, fat and cheese sauce is pure technique made visible."
  method:      "Stovetop — emulsion (starch water + cheese + fat)"
```

### Bobotie (Premium, SA)
```yaml
provenance:
  popular_in:  "South Africa — widely regarded as the national dish; rooted in the Cape Malay kitchen"
  famous_for:  "SA's sweet-savourory comfort classic — spiced beef mince baked under a golden, custardy egg topping"
  consists_of: "Beef mince with curry spices, chutney, sultanas and a hit of vinegar, topped with a milk-and-egg custard and bay leaves, baked until just set"
  name_origin: "From the Malay 'botok' — a steamed spiced meat dish; the Cape version was adapted and baked under custard by the Malay community."
  why_loved:   "One pan, deeply aromatic, and it stretches to feed a table — the sweet-sharp-spice balance is unmistakably South African."
  method:      "Oven — bake (spiced mince base + set custard top)"
```
