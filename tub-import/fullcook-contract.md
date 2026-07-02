# TUB Full-Cook Recipe Authoring Contract

Produce complete FULL-COOK recipe records that match this schema EXACTLY (the app breaks if the shape is wrong). Read `recipes/foundation-batch.js` first — each dish already has slug/tier/cui/occ/blurb/prov. KEEP slug/tier/cui/occ identical; you are ADDING time/method/diff/brief/ing/tl/steps/pair and may refine blurb/prov.

## Schema
```json
{
  "slug": "<exact existing slug>",
  "t": "<title>",
  "tier": "<existing tier>",
  "cui": "<existing cuisine>",
  "occ": ["<existing occasions>"],
  "time": "<e.g. '1 hr 30 min (plus proving)'>",
  "method": "<e.g. 'Oven · bake'>",
  "diff": "Easy|Medium|Hard",
  "blurb": "<one evocative line>",
  "prov": {"popular_in":"...","famous_for":"...","consists_of":"...","name_origin":"...","why_loved":"...","method_detail":"..."},
  "brief": {"lead":"<2-3 sentence opening>","expect":["Serves 2.","<ready time>","<one-liner>"],"stats":["~<kcal>/serv","<difficulty>"],"kit":["<tool>","<tool>"]},
  "ing": [[ "<group name>", [ ["<mode>", <base>, "<unit>", "<ingredient name>"] ] ]],
  "tl": [[ "<timecode>", "<title>", "<desc>", <passive_seconds_int> ]],
  "steps": [[ "<title>", "<body>", "<why>", <timer_seconds_int_or_null> ]],
  "pair": [[ "<kind>", "<drink>", "<origin · style>", "<why>" ]]
}
```

## Ingredient modes (base = quantity for 2 servings)
- `"countX"`: scalable with a unit (g/ml). `["countX", 800, "g", "boneless skinless chicken thighs, cut into 3cm pieces"]`
- `"linear"`: scales linearly with a unit (oils, liquids). `["linear", 2, "tbsp", "olive oil"]`, `["linear", 150, "ml", "milk"]`
- `"taper"`: salt, pepper, spices (scales with diminishing returns). `["taper", 1, "tsp", "salt"]`, `["taper", 0.5, "tsp", "black pepper"]`
- `"countN"`: countable items. `["countN", 2, "", "eggs"]`, `["countN", 1, "", "onion, finely diced"]`. Unit is `""`.
- Do NOT use `"static"`.

## South African ingredients (MANDATORY)
beef mince (not ground beef) · lamb mince · chicken mince · coriander (not cilantro) · spring onion (not scallion/green onion) · aubergine (not eggplant) · baby marrow (not zucchini) · prawn (not shrimp) · capsicum (not bell pepper) · cake flour / plain flour / self-raising flour / bread flour · bicarbonate of soda (not baking soda) · icing sugar (not powdered/confectioners) · rocket (not arugula) · makrut lime (NEVER kaffir) · sunflower oil · butternut · mealie meal / pap · boerewors · peppercorn · free-range eggs.

## South African measurements (MANDATORY)
ml, g, kg, °C, cm, tsp, tbsp. NEVER cups, oz, lb, °F. Oven temps in °C.

## Accuracy rules
- Real, correct recipes: accurate quantities, times, oven temps (°C), techniques. BASE = 2 servings.
- `steps`: 5–8 steps, each with a clear body and a short "why" (the culinary principle). timer = seconds of active cooking (int), or `null` for prep/no-timer.
- `tl`: a 3–6 entry make-ahead timeline ending at serve; `passive_seconds` for hands-off waits (marinating, proving, resting, slow-cooking). Timecodes like `T−60:00`, `T−00:00`.
- `pair`: REAL drinks (wine/beer/spirit/cider/non-alcoholic) that genuinely fit the dish. Lead with the drink.
- `brief.stats`: realistic kcal per serving + difficulty.
- If genuinely unsure of an exact figure, use a sound professional default — never fabricate implausible values.

## Output
Return ONLY a JSON array of the records. Valid JSON: double quotes, no trailing commas, no markdown fences, no commentary.