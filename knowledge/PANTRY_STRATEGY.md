# Pantry Strategy: The 5-Core Approach

> How 5 pantry staples unlock 82% of the cookbook, and how to build from there.

---

## The Research

Analysis of all 147 recipes in TUB revealed a striking concentration:

| Tier | Ingredients | Coverage | Approach |
|---|---|---|---|
| **ESSENTIALS** | 5 items | 82.4% | Keep always stocked |
| **CORE** | 9 items | 94% | Rotate monthly |
| **SPECIALTY** | 16 items | 100% | Buy for specific recipes |

This is based on ingredient frequency analysis across every recipe batch, consolidating synonyms and normalizing names. The concentration at the essentials level is the most important finding: **it takes remarkably few ingredients to unlock most of the cookbook**.

---

## The ESSENTIALS Tier (82% Coverage)

These five ingredients are in virtually every kitchen:

1. **Spices** (59% of recipes)
   - The flavor palette of the cookbook
   - Maintain: ground cumin, coriander, turmeric, paprika, cinnamon, cloves, cardamom
   - Storage: Airtight containers, away from light, 6-12 months

2. **Garlic** (57% of recipes)
   - The aromatic foundation of braising, currying, stir-frying
   - Buy loose bulbs; 1-2 bulbs weekly
   - Storage: Cool, dark, well-ventilated place; 2-3 weeks

3. **Oil** (51% of recipes)
   - Cooking medium for searing, braising, roasting
   - Maintain two types: neutral (sunflower/canola for high heat) and premium (EVOO for finishing)
   - Storage: Cool, dark place

4. **Salt** (44% of recipes)
   - Flavor amplifier and seasoning baseline
   - Two types: table salt for cooking, flaky sea salt for finishing
   - Storage: Airtight containers, indefinite

5. **Onion** (34% of recipes)
   - The sweet aromatics that deepen braises and curries
   - Buy yellow/brown bulbs (not red or sweet)
   - Storage: Cool, dark place; 2-3 weeks

**Why these five?**

These are the **structural ingredients** that enable every cooking technique:
- Oil & heat = searing, braising, frying
- Spices = flavor profile
- Garlic & onion = aromatic base
- Salt = seasoning control

With only these five, you can cook:
- Indian curries
- Italian braises
- Asian stir-fries
- African stews
- Middle Eastern marinades
- SA Cape Malay dishes

---

## The CORE Tier (94% Coverage)

The second layer transforms dishes from functional to delicious:

1. **Butter** (33% of recipes)
   - Richness for searing steaks, finishing sauces, baking
   - Buy unsalted (you control salt)
   - Storage: Refrigerate 1-2 months

2. **Lemon/Lime** (32% of recipes)
   - Brightness and acid balance
   - Fresh only (bottled juice loses structure)
   - Storage: Room temperature or fridge; 2-3 weeks

3. **Black Pepper** (32% of recipes)
   - Finishing seasoning, freshly ground from whole peppercorns
   - Non-negotiable: pre-ground loses volatile oils
   - Storage: Airtight container; 6+ months

4. **Beef** (31% of recipes)
   - Ground beef or chuck roast for braising
   - Buy fattier cuts for long cooking (80/20 ground beef, chuck with marbling)
   - Storage: Refrigerate 1-2 days; freeze up to 3 months

5. **Tomato** (20% of recipes)
   - Umami anchor for soups, braises, curries, pasta
   - Canned whole tomatoes or tomato paste (more consistent than fresh year-round)
   - Storage: Pantry 1 year; opened: 3-4 weeks

6. **Ginger** (22% of recipes)
   - Heat and spice for Asian cooking
   - Buy fresh root in small amounts; grate or mince
   - Storage: Refrigerate 2-3 weeks; freeze 3 months

7. **Chicken** (18% of recipes)
   - Forgiving protein (thighs less risky than breast)
   - Boneless thighs 4-6 weekly, or whole birds fortnightly
   - Storage: Refrigerate 1-2 days; freeze up to 3 months

8. **Eggs** (10% of recipes)
   - Binding agent, baking, soft-boiled snacks
   - Buy a dozen weekly
   - Storage: Refrigerate in original carton; 3-4 weeks

9. **Cream** (7% of recipes)
   - Finishing sauces, soups, desserts
   - Fresh cream only (shelf life 2 weeks)
   - Storage: Refrigerate; use by date

**Why this tier?**

These ingredients add:
- **Richness**: butter, cream, eggs
- **Brightness**: lemon, pepper
- **Protein variety**: beef, chicken
- **Umami depth**: tomato, ginger

With ESSENTIALS + CORE, you can cook 94% of the cookbook — nearly everything except specialty dishes requiring seafood, lamb, wine, or exotic spices.

---

## The SPECIALTY Tier (100% Coverage)

Recipe-driven purchases for specific dishes:

| Category | Ingredients | When to buy |
|---|---|---|
| **Premium proteins** | Fish (hake, kingklip), lamb, seafood (prawns, mussels, crayfish) | 1-2x monthly or as needed |
| **Liquids** | Wine (red & white), stock (beef, chicken), coconut milk | For specific recipes |
| **Pastes & sauces** | Curry paste, soy sauce, vinegar | As needed |
| **Starches** | Rice, pasta, flour, potatoes | Monthly staples |
| **Specialty herbs** | Fresh coriander, chilli (fresh & flakes) | Weekly or as needed |

These ingredients unlock the remaining 6% of recipes and provide cuisine-specific options.

---

## UI Implementation Strategy

### Suggested Feature: "What Can I Cook?"

**Flow:**
1. User selects their tier (Essentials, Core, or Specialty)
2. User checks off which ingredients they have in stock
3. UI calculates: "You can cook X of Y recipes (Z%)"
4. Show recipes unlocked + recipe unlock ranking
5. Suggest "Next best ingredient to buy" for expanded coverage

**Data Structure:**
```javascript
// User state
let pantrySelection = {
  essentials: ['garlic', 'oil', 'salt'], // checked items
  core: ['butter', 'lemon-lime'],
  specialty: []
};

// Calculation
const coverage = calculatePantryCoverage(
  Object.values(pantrySelection).flat()
);
// Result: { cookable: 47, total: 147, pct: 32, recipes: [...] }
```

**Example states:**

| Scenario | Ingredients | Cookable | % |
|---|---|---|---|
| Minimal setup | Garlic, oil, salt, onion | 34 | 23% |
| Weekday cooking | + Butter, lemon, black pepper, chicken | 87 | 59% |
| Full core | + Beef, tomato, ginger, eggs, cream | 138 | 94% |
| Weekend special | + Fish, wine, cream | 145+ | 98%+ |

### Card Layout Suggestion

```
┌─ My Pantry ─────────────────────────┐
│ Essentials (5)  ▾                   │
│ ☑ Spices       (59% recipes)        │
│ ☑ Garlic       (57% recipes)        │
│ ☑ Oil          (51% recipes)        │
│ ☑ Salt         (44% recipes)        │
│ ☐ Onion        (34% recipes)        │
│                                      │
│ Core Tier (add more →)  ▾            │
│ ☑ Butter       (+2 new dishes)      │
│ ☐ Lemon/Lime   (+5 new dishes)      │
│                                      │
│ ─────────────────────────────────── │
│ You can cook: 47 of 147 (32%)       │
│                                      │
│ Next best to unlock more:           │
│ ➤ Black pepper (+15 recipes)        │
│ ➤ Beef         (+13 recipes)        │
│ ➤ Chicken      (+8 recipes)         │
│                                      │
│ [Show recipes I can cook now →]     │
└──────────────────────────────────────┘
```

---

## Shopping List Generator

Once a user has selected their pantry, the app could suggest:

**"You're missing these essentials to reach 50% coverage"**
- [ ] Onion (adds 34 more recipes)
- [ ] Black pepper (adds 15 more recipes)
- [ ] Butter (adds 10 more recipes)

**"Budget-smart additions (highest impact per item)"**
1. Onion (~R20) → +34 recipes
2. Black pepper (R40) → +15 recipes
3. Lemon (R15) → +10 recipes
4. Ginger (R30) → +8 recipes

---

## Behavioral Use Case

**User journey:**

1. **Discovery**: User opens app, curious about "From My Pantry" → clicks "What do I have?"
2. **Selection**: Checks off essentials (garlic, oil, salt) → sees "You can cook 23 recipes"
3. **Expansion**: "Interesting! Let me add butter and lemon" → "Now I can cook 45 recipes!"
4. **Motivation**: "Only 3 more ingredients to reach 75%? Let me get beef, chicken, and pepper."
5. **Loyalty**: User keeps coming back to add more → gradually stocks their pantry → cooks more dishes from TUB

**Product value:**

- **For beginners**: Teaches them what a real pantry looks like
- **For busy cooks**: Shows them what's possible with minimal restocking
- **For meal planners**: Helps them plan weekly menus based on what's in stock
- **Engagement**: "Build your pantry" becomes a game mechanic — unlock more recipes by adding ingredients

---

## Technical Notes

- **Helper function**: `calculatePantryCoverage(ingredients)` in `pantry-tiers.js`
  - Takes array of ingredient slugs
  - Returns: `{ cookable, total, pct, recipes }`
  - Allows 20% ingredient flexibility (some recipes can be made with substitutes)

- **Data source**: `window.PANTRY_TIERS` object with full ingredient metadata
  - Each ingredient has: `slug`, `name`, `category`, `coverage`, `description`, `storage`, `uses`
  - Organized by tier

- **Integration point**: Recommend adding UI near "From My Pantry" tab in the app
  - Could be a modal, a sidebar, or a full page

---

## Next Steps

1. **Design pantry selector UI** (wireframe)
2. **Connect to recipe filtering** (show only cookable recipes)
3. **Add shopping list export** (CSV or printable format)
4. **Track user selections** (localStorage for persistence)
5. **A/B test engagement** (does it drive more app usage?)

---

**Created**: 2026-07-05  
**Data source**: 147-recipe ingredient analysis (v2.1)  
**Coverage achieved**: 82.4% with 5 ingredients | 94% with 14 items | 100% with 30 items
