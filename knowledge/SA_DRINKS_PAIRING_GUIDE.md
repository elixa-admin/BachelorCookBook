# South African Drinks Pairing Guide

> **Canonical standard for drinks pairing in The Ultimate Bachelor Cookbook.**
> All recipes — existing and future — draw their drinks pairings from this guide.
> The app's `sa-drinks-atlas.js` is the queryable implementation of these rules.

**Status:** LOCKED — the SA drinks constraint is non-negotiable (CLAUDE.md, PROJECT_BRIEF.md).
**Last updated:** 2026-07-07

---

## The SA-Only Constraint

**Every drink recommended on this site must be available in South Africa.** No exceptions.
- ✅ SA wine varietals and named estates
- ✅ SA beers (commercial + craft)
- ✅ SA spirits (brandy, gin, liqueur)
- ✅ SA non-alcoholic (rooibos, ginger beer, Appletiser, grape juice)
- ❌ No foreign estates (no Bordeaux, no Napa, no Champagne — use SA equivalents)
- ❌ No foreign beer brands (no Heineken, no Corona — use Castle, Windhoek, craft)

*MCC (Méthode Cap Classique) is the SA equivalent of Champagne. Pinotage is the SA signature red.*

---

## The Taste-Profile Matching Principle

Pairing is **taste-profile driven, not recipe-driven**. Any dish — whether it exists as a recipe in the database or not — can be matched by identifying its dominant characteristics and looking up the matching drinks.

### Step 1: Identify the dish's taste profile

Every dish maps to one or more **taste-profile axes**:

| Axis | Values | What it means |
|------|--------|---------------|
| **protein** | `beef` `lamb` `pork` `chicken` `fish-shellfish` `vegetable` `game` | The main protein — drives wine body |
| **richness** | `lean` `rich` `fatty` | How heavy/fatty the dish is — drives tannin/acidity need |
| **spice** | `none` `mild` `medium` `hot` | Chilli/curry heat — drives sweetness/off-dry need |
| **method** | `grilled-braaied` `roasted` `braised-stewed` `fried` `raw` `steamed` | Cooking method — drives smoke/char matching |
| **sauce** | `none` `cream` `tomato` `curry` `citrus` `pan-jus` `sweet` | Dominant sauce — drives flavour echo |
| **course** | `main` `starter` `dessert` `bread-side` `condiment` | Where it sits in the meal — drives drink category |

### Step 2: Look up matching SA drinks

Each taste-profile combination maps to recommended SA drinks (see the atlas data file). The matching logic:

1. **Body matches weight** — rich red meat → full-bodied red; delicate fish → crisp white
2. **Acidity cuts fat** — fatty/fried dishes need high-acid drinks (Sauvignon Blanc, MCC, lager)
3. **Sweetness tames spice** — hot/curried dishes need off-dry or sweet (Chenin Blanc, Late Harvest, rooibos)
4. **Tannin stands up to protein** — beef/lamb need tannic reds (Cabernet, Shiraz, Pinotage)
5. **Smoke echoes char** — grilled/braaied dishes love oaked/smoky wines or dark beer
6. **Effervescence cleanses** — fried food and rich curries benefit from bubbles (MCC, lager, ginger beer)

---

## The SA Drinks Taxonomy (canonical)

### Wine — White
| Varietal | Body | Profile | Best with |
|----------|------|---------|-----------|
| **Sauvignon Blanc** (Elgin, Stellenbosch) | Light-crisp | Zesty citrus, green fig, mineral | Fish, shellfish, salads, goat's cheese, light chicken |
| **Chenin Blanc — Unwooded** (Stellenbosch, Swartland) | Medium-dry | Apple, pear, honeyed florality | Mild curry, pork, chicken, white fish |
| **Chenin Blanc — Wooded** (Stellenbosch) | Medium-full | Oak spice, baked apple, richness | Rich chicken, pork, creamy sauces, bobotie |
| **Chardonnay** (Hemel-en-Aarde, Robertson) | Medium-full | Citrus, oak, butter, stone fruit | Roast chicken, creamy pasta, fish in sauce |
| **Off-dry / Semi-sweet Riesling** (Elgin, Darling) | Light-off-dry | Lime, petrol, floral sweetness | Hot curry, Thai spice, chilli, Asian food |
| **Noble Late Harvest** (Constantia, Nederburg) | Sweet | Honey, apricot, botrytis richness | Dessert, fruit tart, blue cheese |

### Wine — Red
| Varietal | Body | Profile | Best with |
|----------|------|---------|-----------|
| **Pinotage** (Kanonkop, Stellenbosch) | Full | Dark berry, tobacco, earthy, banana | Braaied beef, game, oxtail, bobotie |
| **Cabernet Sauvignon** (Stellenbosch, Paarl) | Full-tannic | Blackcurrant, cedar, grippy tannin | Prime rib, steak, beef stew, lamb |
| **Shiraz / Syrah** (Stellenbosch, Swartland) | Full-peppery | Black pepper, dark fruit, smoke | Spiced lamb, Cape Malay curries, braaied meats |
| **Pinot Noir** (Hemel-en-Aarde, Elgin) | Light-medium | Red cherry, earth, silk | Duck, game birds, mushroom dishes, salmon |
| **Merlot** (Stellenbosch, Paarl) | Medium-soft | Plum, soft tannin, easy drinking | Pasta, pork, chicken, mid-week mains |

### Wine — Sparkling & Rosé
| Style | Body | Profile | Best with |
|-------|------|---------|-----------|
| **MCC — Méthode Cap Classique** (Graham Beck, Cap Classique) | Light-bubbly | Brioche, citrus, fine bubbles, toasty | Oysters, canapés, desserts, fried food, brunch |
| **Pinotage Rosé** (various) | Light-dry | Strawberry, cranberry, crisp | Salads, grilled fish, light curries, summer |
| **Cinsault Rosé** (Swartland) | Light-dry | Red apple, floral, delicate | Charcuterie, quiche, light lunch |

### Beer
| Style | Profile | Best with |
|-------|---------|-----------|
| **Castle Lager** | Crisp, clean, biscuity | Braai, curry, fish, thirst-quenching universal |
| **Windhoek Lager** (Namibia/SA) | Pure-malt, clean, slightly fuller | Braai, boerewors, robust mains |
| **SA Craft IPA** | Hoppy, bitter, citrus | Fried food, spicy curries, bold flavour |
| **SA Craft Stout** | Dark, roasty, coffee, chocolate | Beef stew, chocolate dessert, braai |
| **Amber Ale** (Jack Black Lumberjack) | Caramel, malt, balanced | Pork, sticky glazes, charred meats |

### Spirits & Liqueur
| Spirit | Profile | Best with |
|--------|---------|-----------|
| **KWV / Van Ryn's Brandy** | Oak, dried fruit, warmth | Winter desserts, after-dinner, rich stews |
| **Amarula** | Marula cream, caramel, toffee | Chocolate, malva pudding, cheesecake, coffee |
| **Cape Gin** (Inverroche, Jorgensen's) | Fynbos botanicals, juniper | Oysters, fish, cured meat, martini-style |

### Non-Alcoholic
| Drink | Profile | Best with |
|-------|---------|-----------|
| **Rooibos tea / iced tea** | Earthy, honeyed, caffeine-free | Any dish (spiced rooibos for curry; vanilla for dessert) |
| **Ginger beer** (Stoney, Craftsman) | Spicy, sweet, fiery fizz | Curry, bobotie, fried food, braai |
| **Appletiser / Peartiser** | Sparkling fruit, clean, sweet | Dessert, brunch, light dishes, kids |
| **Grape juice** (red/white) | Sweet, fruity, full | Any wine-paired dish (alcohol-free substitute) |
| **Sparkling water with citrus** | Clean, neutral, effervescent | Everything — the universal palate cleanser |

---

## How to use the atlas

The companion data file `public/tub/recipes/sa-drinks-atlas.js` implements these rules as a queryable relation. Usage:

```javascript
// For any recipe (existing or future):
var pair = saDrinkPair(recipe);  // returns [[category, drink, region, why], ...]

// For a dish that isn't in the database:
var pair = saDrinkPair({ cui: "Thai", t: "Green Papaya Salad",
  _profile: { protein: "vegetable", spice: "hot", method: "raw" } });
```

If a recipe has explicit `pair` data, that takes precedence. The atlas is the **fallback and the authoring reference** — use it when adding new recipes, so every dish gets a SA-correct pairing without bespoke research.

---

## Authoring rule for new recipes

When adding a recipe to the collection:
1. Identify its taste profile (protein, richness, spice, method, sauce, course)
2. Query `saDrinkPair()` or consult the taxonomy above
3. Write 2-3 pairings into the recipe's `pair` array: `[["Wine","Stellenbosch Shiraz","South Africa","why"],...]`
4. Always include one non-alcoholic option
5. Every drink name must be SA-available — verify against the taxonomy
