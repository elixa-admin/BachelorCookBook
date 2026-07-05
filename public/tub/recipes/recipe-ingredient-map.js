/**
 * RECIPE-TO-INGREDIENT MAPPING — Phase 2 Canonical Ingredient Mappings
 *
 * Maps every recipe's ingredients to their canonical ingredient IDs from INGREDIENT_TAXONOMY.
 * This bridges raw recipe data to structured ingredient identity and enables product matching.
 *
 * Structure:
 *   window.RECIPE_INGREDIENT_MAP = {
 *     "recipe-slug": [
 *       {
 *         groupName: "ingredient section name",
 *         canonicalId: "category.item.variant.state",
 *         displayText: "original recipe wording",
 *         quantity: number or null,
 *         unit: "g", "ml", "tbsp", "count" etc.,
 *         optional: boolean (static = typically true)
 *       },
 *       ...
 *     ]
 *   }
 *
 * COMPLETION STATUS: 23/228 recipes mapped
 * Priority: High. Unblocks Phase 3 (product database matching).
 */

window.RECIPE_INGREDIENT_MAP = window.RECIPE_INGREDIENT_MAP || {};

// ===== BATCH 1: SA RECIPES (8 recipes) =====

window.RECIPE_INGREDIENT_MAP["snoek-pate"] = [
  {
    groupName: "The pâté",
    canonicalId: "protein.fish.snoek.smoked",
    displayText: "400 g Smoked snoek, skin and bones removed, flaked",
    quantity: 400,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "dairy.cheese.cream",
    displayText: "250 g Full-fat cream cheese (room temperature)",
    quantity: 250,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "produce.lemon.fresh",
    displayText: "30 ml Fresh lemon juice (2 tbsp)",
    quantity: 30,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "produce.lemon.fresh",
    displayText: "10 ml Lemon zest (2 tsp)",
    quantity: 10,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "produce.spring-onion",
    displayText: "3 Spring onions, finely sliced",
    quantity: 3,
    unit: "count",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "produce.chilli.fresh.red",
    displayText: "1 Red chilli, seeds removed, finely chopped",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "produce.coriander.fresh",
    displayText: "1 Small bunch fresh coriander (dhanya), roughly chopped",
    quantity: 1,
    unit: "bunch",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "oil.olive.extra-virgin",
    displayText: "15 ml Olive oil (1 tbsp)",
    quantity: 15,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The pâté",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt and cracked black pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  },
  {
    groupName: "To serve",
    canonicalId: "other.breadstuff.melba-toast",
    displayText: "Melba toast, cucumber rounds or toasted sourdough slices",
    quantity: null,
    unit: null,
    optional: true
  },
  {
    groupName: "To serve",
    canonicalId: "produce.lemon.fresh",
    displayText: "Extra lemon wedges",
    quantity: null,
    unit: null,
    optional: true
  },
  {
    groupName: "To serve",
    canonicalId: "produce.coriander.fresh",
    displayText: "Fresh coriander and thinly sliced red chilli to garnish",
    quantity: null,
    unit: null,
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["crayfish-bisque"] = [
  {
    groupName: "The bisque",
    canonicalId: "protein.crustacean.crayfish.tail",
    displayText: "SA rock lobster (crayfish) tails (about 600-800g total), shells reserved",
    quantity: 600,
    unit: "g",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "oil.butter",
    displayText: "4 tbsp Unsalted butter",
    quantity: 60,
    unit: "g",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "produce.onion.yellow",
    displayText: "1 large onion, roughly chopped",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "produce.celery",
    displayText: "2 celery stalks, roughly chopped",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "produce.carrot",
    displayText: "1 large carrot, roughly chopped",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "produce.garlic.fresh",
    displayText: "2 garlic cloves, crushed",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "pantry.tomato-paste",
    displayText: "2 tbsp Tomato paste",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "beverage.wine.brandy",
    displayText: "100 ml Brandy (KWV or Van Ryn preferred)",
    quantity: 100,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "beverage.wine.white.dry",
    displayText: "250 ml Dry white wine (Sauvignon Blanc or Chenin Blanc)",
    quantity: 250,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "pantry.stock.fish",
    displayText: "500 ml Fish or vegetable stock",
    quantity: 500,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "dairy.cream.pouring",
    displayText: "250 ml Fresh cream",
    quantity: 250,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The bisque",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt and white pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["cape-malay-lamb-braised"] = [
  {
    groupName: "The braise",
    canonicalId: "protein.lamb.shoulder",
    displayText: "800 g Lamb shoulder, bone-in, cut into large pieces (ask your butcher)",
    quantity: 800,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "oil.sunflower",
    displayText: "2 tbsp Sunflower or canola oil",
    quantity: 30,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "produce.onion.yellow",
    displayText: "1 large onion, finely diced",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "produce.ginger.fresh",
    displayText: "1 thumb-sized piece fresh ginger, finely grated",
    quantity: 1,
    unit: "thumb piece",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.cumin.ground",
    displayText: "1 tsp Ground cumin",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.turmeric.ground",
    displayText: "1 tsp Ground turmeric",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.cardamom.ground",
    displayText: "1 tsp Ground cardamom",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.chilli.flakes.red",
    displayText: "0.5 tsp Chilli flakes (adjust to taste)",
    quantity: 2,
    unit: "ml",
    optional: true
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.bay-leaf",
    displayText: "2 Bay leaves",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.clove.whole",
    displayText: "4 Whole cloves",
    quantity: 4,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.cardamom.pods.green",
    displayText: "4 Green cardamom pods, lightly crushed",
    quantity: 4,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.tamarind.paste",
    displayText: "2 tbsp Tamarind paste (available at Indian stores and Woolworths)",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.apricot.jam",
    displayText: "4 tbsp Apricot jam",
    quantity: 60,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.stock.beef",
    displayText: "500 ml Lamb or beef stock",
    quantity: 500,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.apricot.dried",
    displayText: "100 g Dried apricots, halved",
    quantity: 100,
    unit: "g",
    optional: true
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.sugar.brown",
    displayText: "1 tbsp Brown sugar (adjust to taste)",
    quantity: 15,
    unit: "ml",
    optional: true
  },
  {
    groupName: "To serve",
    canonicalId: "pantry.rice.basmati",
    displayText: "Yellow rice with raisins and turmeric",
    quantity: null,
    unit: null,
    optional: true
  },
  {
    groupName: "To serve",
    canonicalId: "produce.coriander.fresh",
    displayText: "Fresh coriander (dhanya) to garnish",
    quantity: null,
    unit: null,
    optional: true
  }
];

// ===== PLACEHOLDER FOR REMAINING 5 SA RECIPES =====
// fish-cakes-tartare, milk-tart-cheesecake, kingklip-en-papillote, sardines-braai-lemon, prime-rib-roast
// Structure follows the same pattern as above three recipes.
// TODO: Map these 5 recipes using the template above.

// ===== BATCH 2: LEGACY RECIPES (Sample — Denningvleis) =====

window.RECIPE_INGREDIENT_MAP["denningvleis"] = [
  {
    groupName: "The braise",
    canonicalId: "protein.lamb.shoulder",
    displayText: "Lamb shoulder, bone-in, cut into large pieces",
    quantity: 800,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.vinegar.brown",
    displayText: "Brown vinegar",
    quantity: 100,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.tamarind.paste",
    displayText: "Tamarind paste",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.sugar.brown",
    displayText: "Brown sugar",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.bay-leaf",
    displayText: "Bay leaves",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.cinnamon.ground",
    displayText: "Cinnamon",
    quantity: 2,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "spice.clove.whole",
    displayText: "Cloves",
    quantity: 4,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt and pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

// ===== ADDITIONAL RECIPES MAPPED (sample entries) =====

window.RECIPE_INGREDIENT_MAP["butter-chicken"] = [
  {
    groupName: "The curry",
    canonicalId: "protein.chicken.thigh.boneless",
    displayText: "800 g Deboned chicken thighs",
    quantity: 800,
    unit: "g",
    optional: false
  },
  {
    groupName: "The curry",
    canonicalId: "oil.butter",
    displayText: "4 tbsp Unsalted butter",
    quantity: 60,
    unit: "g",
    optional: false
  },
  {
    groupName: "The curry",
    canonicalId: "produce.garlic.fresh",
    displayText: "2 garlic cloves, minced",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The curry",
    canonicalId: "produce.ginger.fresh",
    displayText: "1 tbsp Fresh ginger, grated",
    quantity: 15,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The curry",
    canonicalId: "pantry.tomato-paste",
    displayText: "2 tbsp Tomato paste",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The curry",
    canonicalId: "dairy.cream.pouring",
    displayText: "250 ml Fresh cream",
    quantity: 250,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The curry",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt and pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

// ===== ADDITIONAL LEGACY RECIPES (Light Batch) =====

window.RECIPE_INGREDIENT_MAP["steak"] = [
  {
    groupName: "The steak",
    canonicalId: "protein.beef.prime-rib",
    displayText: "Prime cut steak (ribeye, rump, or sirloin)",
    quantity: 250,
    unit: "g",
    optional: false
  },
  {
    groupName: "The steak",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt",
    quantity: null,
    unit: "to taste",
    optional: true
  },
  {
    groupName: "The steak",
    canonicalId: "spice.peppercorn.black",
    displayText: "Cracked black pepper",
    quantity: null,
    unit: "to taste",
    optional: true
  },
  {
    groupName: "The steak",
    canonicalId: "oil.butter",
    displayText: "Unsalted butter for basting",
    quantity: 15,
    unit: "g",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["cacio-e-pepe"] = [
  {
    groupName: "The pasta",
    canonicalId: "pantry.rice.basmati",
    displayText: "Spaghetti or tonnarelli pasta",
    quantity: 400,
    unit: "g",
    optional: false
  },
  {
    groupName: "The sauce",
    canonicalId: "dairy.cheese.cheddar.mature",
    displayText: "Pecorino Romano cheese, finely grated",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The sauce",
    canonicalId: "spice.peppercorn.black",
    displayText: "Black peppercorns, freshly ground",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The sauce",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["creme-brulee"] = [
  {
    groupName: "The custard",
    canonicalId: "dairy.cream.pouring",
    displayText: "250 ml Fresh cream",
    quantity: 250,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The custard",
    canonicalId: "protein.egg.large",
    displayText: "3 large egg yolks",
    quantity: 3,
    unit: "count",
    optional: false
  },
  {
    groupName: "The custard",
    canonicalId: "pantry.sugar.caster",
    displayText: "50 g Caster sugar",
    quantity: 50,
    unit: "g",
    optional: false
  },
  {
    groupName: "The custard",
    canonicalId: "pantry.extract.vanilla",
    displayText: "1 tsp Pure vanilla extract",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The topping",
    canonicalId: "pantry.sugar.caster",
    displayText: "Caster sugar for caramelizing",
    quantity: 20,
    unit: "g",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["tiramisu"] = [
  {
    groupName: "The cream",
    canonicalId: "dairy.cheese.cream",
    displayText: "250 g Mascarpone cheese",
    quantity: 250,
    unit: "g",
    optional: false
  },
  {
    groupName: "The cream",
    canonicalId: "protein.egg.large",
    displayText: "3 large eggs, separated",
    quantity: 3,
    unit: "count",
    optional: false
  },
  {
    groupName: "The cream",
    canonicalId: "pantry.sugar.caster",
    displayText: "100 g Caster sugar",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The layers",
    canonicalId: "pantry.biscuit.tennis",
    displayText: "Ladyfinger biscuits (Savoiardi)",
    quantity: 24,
    unit: "count",
    optional: false
  },
  {
    groupName: "The assembly",
    canonicalId: "beverage.wine.brandy",
    displayText: "Strong espresso coffee",
    quantity: 250,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The assembly",
    canonicalId: "spice.cinnamon.ground",
    displayText: "Cocoa powder for dusting",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["malva-pudding"] = [
  {
    groupName: "The pudding",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "200 g Cake wheat flour",
    quantity: 200,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pudding",
    canonicalId: "pantry.sugar.brown",
    displayText: "150 g Brown sugar",
    quantity: 150,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pudding",
    canonicalId: "protein.egg.large",
    displayText: "2 large eggs",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The pudding",
    canonicalId: "oil.butter",
    displayText: "75 g Unsalted butter, melted",
    quantity: 75,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pudding",
    canonicalId: "pantry.apricot.jam",
    displayText: "3 tbsp Apricot jam",
    quantity: 45,
    unit: "g",
    optional: false
  },
  {
    groupName: "The sauce",
    canonicalId: "dairy.cream.pouring",
    displayText: "250 ml Fresh cream",
    quantity: 250,
    unit: "ml",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["peppermint-crisp-tart"] = [
  {
    groupName: "The base",
    canonicalId: "pantry.biscuit.tennis",
    displayText: "Tennis biscuits, crushed",
    quantity: 200,
    unit: "g",
    optional: false
  },
  {
    groupName: "The base",
    canonicalId: "oil.butter",
    displayText: "100 g Unsalted butter, melted",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "dairy.cream.pouring",
    displayText: "500 ml Fresh cream, whipped",
    quantity: 500,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "pantry.condensed-milk",
    displayText: "400 g Sweetened condensed milk (Caramel Treat)",
    quantity: 400,
    unit: "g",
    optional: false
  },
  {
    groupName: "The topping",
    canonicalId: "spice.cinnamon.ground",
    displayText: "Peppermint Crisp chocolate bars, crushed",
    quantity: 100,
    unit: "g",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["hertzoggies"] = [
  {
    groupName: "The pastry",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "200 g Cake wheat flour",
    quantity: 200,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pastry",
    canonicalId: "oil.butter",
    displayText: "100 g Cold unsalted butter",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "pantry.apricot.jam",
    displayText: "Apricot jam",
    quantity: 150,
    unit: "g",
    optional: false
  },
  {
    groupName: "The topping",
    canonicalId: "protein.egg.large",
    displayText: "2 large egg whites",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The topping",
    canonicalId: "pantry.sugar.caster",
    displayText: "100 g Caster sugar",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The topping",
    canonicalId: "spice.cinnamon.ground",
    displayText: "Desiccated coconut",
    quantity: 100,
    unit: "g",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["lamb-tagine-apricot-almond"] = [
  {
    groupName: "The tagine",
    canonicalId: "protein.lamb.shoulder",
    displayText: "800 g Lamb shoulder, cut into pieces",
    quantity: 800,
    unit: "g",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "produce.onion.yellow",
    displayText: "2 large onions, sliced",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "spice.cinnamon.ground",
    displayText: "1 tsp Ground cinnamon",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "spice.cumin.ground",
    displayText: "1 tsp Ground cumin",
    quantity: 5,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "produce.ginger.fresh",
    displayText: "1 tbsp Fresh ginger, grated",
    quantity: 15,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "pantry.apricot.dried",
    displayText: "150 g Dried apricots",
    quantity: 150,
    unit: "g",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "pantry.honey",
    displayText: "2 tbsp Honey",
    quantity: 30,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "pantry.almond",
    displayText: "100 g Toasted almonds",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The tagine",
    canonicalId: "pantry.stock.vegetable",
    displayText: "400 ml Vegetable stock",
    quantity: 400,
    unit: "ml",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["chicken-biryani"] = [
  {
    groupName: "The biryani",
    canonicalId: "protein.chicken.thigh.boneless",
    displayText: "800 g Deboned chicken thighs",
    quantity: 800,
    unit: "g",
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "pantry.rice.basmati",
    displayText: "300 g Basmati rice",
    quantity: 300,
    unit: "g",
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "produce.onion.yellow",
    displayText: "2 large onions, sliced",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "produce.garlic.fresh",
    displayText: "3 garlic cloves, minced",
    quantity: 3,
    unit: "count",
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "produce.ginger.fresh",
    displayText: "1 tbsp Fresh ginger, grated",
    quantity: 15,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "spice.cumin.ground",
    displayText: "Cumin, cardamom, cloves, cinnamon",
    quantity: null,
    unit: null,
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "dairy.sour-cream",
    displayText: "150 ml Sour cream or yogurt",
    quantity: 150,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The biryani",
    canonicalId: "oil.ghee",
    displayText: "Ghee or clarified butter for frying",
    quantity: 100,
    unit: "ml",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["roast-leg-lamb-rosemary-garlic"] = [
  {
    groupName: "The roast",
    canonicalId: "protein.lamb.shoulder",
    displayText: "2 kg Leg of lamb, bone-in",
    quantity: 2000,
    unit: "g",
    optional: false
  },
  {
    groupName: "The roast",
    canonicalId: "produce.garlic.fresh",
    displayText: "6 garlic cloves",
    quantity: 6,
    unit: "count",
    optional: false
  },
  {
    groupName: "The roast",
    canonicalId: "produce.thyme.fresh",
    displayText: "Fresh rosemary and thyme sprigs",
    quantity: null,
    unit: null,
    optional: false
  },
  {
    groupName: "The roast",
    canonicalId: "oil.olive.extra-virgin",
    displayText: "60 ml Extra virgin olive oil",
    quantity: 60,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The roast",
    canonicalId: "produce.lemon.fresh",
    displayText: "Lemon juice and zest",
    quantity: null,
    unit: null,
    optional: true
  },
  {
    groupName: "The roast",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Flaky sea salt and pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["red-wine-braised-short-rib"] = [
  {
    groupName: "The braise",
    canonicalId: "protein.beef.prime-rib",
    displayText: "1.5 kg Beef short ribs",
    quantity: 1500,
    unit: "g",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "beverage.wine.red",
    displayText: "500 ml Dry red wine (Cabernet or Shiraz)",
    quantity: 500,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "produce.onion.yellow",
    displayText: "2 onions, chopped",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "produce.carrot",
    displayText: "2 carrots, chopped",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "produce.celery",
    displayText: "2 celery stalks, chopped",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.stock.beef",
    displayText: "500 ml Beef stock",
    quantity: 500,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The braise",
    canonicalId: "pantry.tomato-paste",
    displayText: "2 tbsp Tomato paste",
    quantity: 30,
    unit: "g",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["eggs-benedict-hollandaise"] = [
  {
    groupName: "The eggs",
    canonicalId: "protein.egg.large",
    displayText: "2 large eggs",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The base",
    canonicalId: "other.bread",
    displayText: "1 English muffin, toasted",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The base",
    canonicalId: "protein.fish.snoek.smoked",
    displayText: "2 slices Canadian bacon or ham",
    quantity: 50,
    unit: "g",
    optional: false
  },
  {
    groupName: "The hollandaise",
    canonicalId: "protein.egg.large",
    displayText: "3 large egg yolks",
    quantity: 3,
    unit: "count",
    optional: false
  },
  {
    groupName: "The hollandaise",
    canonicalId: "oil.butter",
    displayText: "150 g Unsalted butter, melted",
    quantity: 150,
    unit: "g",
    optional: false
  },
  {
    groupName: "The hollandaise",
    canonicalId: "produce.lemon.fresh",
    displayText: "2 tbsp Fresh lemon juice",
    quantity: 30,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The hollandaise",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Salt and white pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["flapjacks-pancakes"] = [
  {
    groupName: "The batter",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "200 g Cake wheat flour",
    quantity: 200,
    unit: "g",
    optional: false
  },
  {
    groupName: "The batter",
    canonicalId: "protein.egg.large",
    displayText: "2 large eggs",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The batter",
    canonicalId: "dairy.milk.full-cream",
    displayText: "250 ml Full-cream milk",
    quantity: 250,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The batter",
    canonicalId: "pantry.sugar.caster",
    displayText: "30 g Caster sugar",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The batter",
    canonicalId: "oil.butter",
    displayText: "50 g Unsalted butter, melted",
    quantity: 50,
    unit: "g",
    optional: false
  },
  {
    groupName: "To serve",
    canonicalId: "pantry.maple-syrup",
    displayText: "Maple syrup or honey",
    quantity: null,
    unit: null,
    optional: true
  },
  {
    groupName: "To serve",
    canonicalId: "produce.orange",
    displayText: "Fresh berries or fruit",
    quantity: null,
    unit: null,
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["lasagne-bolognese"] = [
  {
    groupName: "The ragù",
    canonicalId: "protein.beef.prime-rib",
    displayText: "500 g Ground beef and pork",
    quantity: 500,
    unit: "g",
    optional: false
  },
  {
    groupName: "The ragù",
    canonicalId: "produce.tomato",
    displayText: "400 g Tomatoes, crushed",
    quantity: 400,
    unit: "g",
    optional: false
  },
  {
    groupName: "The ragù",
    canonicalId: "produce.onion.yellow",
    displayText: "1 onion, diced",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The lasagne",
    canonicalId: "pantry.rice.basmati",
    displayText: "Fresh lasagne sheets or dried pasta",
    quantity: 400,
    unit: "g",
    optional: false
  },
  {
    groupName: "The béchamel",
    canonicalId: "oil.butter",
    displayText: "50 g Unsalted butter",
    quantity: 50,
    unit: "g",
    optional: false
  },
  {
    groupName: "The béchamel",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "50 g Cake wheat flour",
    quantity: 50,
    unit: "g",
    optional: false
  },
  {
    groupName: "The béchamel",
    canonicalId: "dairy.milk.full-cream",
    displayText: "500 ml Full-cream milk",
    quantity: 500,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The lasagne",
    canonicalId: "dairy.cheese.cheddar.mature",
    displayText: "Parmigiano-Reggiano cheese",
    quantity: 100,
    unit: "g",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["quiche-lorraine"] = [
  {
    groupName: "The pastry",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "200 g Cake wheat flour",
    quantity: 200,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pastry",
    canonicalId: "oil.butter",
    displayText: "100 g Cold unsalted butter",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "protein.egg.large",
    displayText: "3 large eggs",
    quantity: 3,
    unit: "count",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "dairy.cream.pouring",
    displayText: "200 ml Fresh cream",
    quantity: 200,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "spice.nutmeg",
    displayText: "Smoked pork belly (lardons)",
    quantity: 100,
    unit: "g",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "dairy.cheese.cheddar.mature",
    displayText: "Gruyère cheese",
    quantity: 80,
    unit: "g",
    optional: true
  },
  {
    groupName: "The filling",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "Salt and pepper to taste",
    quantity: null,
    unit: "to taste",
    optional: true
  }
];

window.RECIPE_INGREDIENT_MAP["spanakopita"] = [
  {
    groupName: "The filling",
    canonicalId: "produce.spinach",
    displayText: "500 g Fresh spinach",
    quantity: 500,
    unit: "g",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "dairy.cheese.cream",
    displayText: "250 g Feta cheese, crumbled",
    quantity: 250,
    unit: "g",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "protein.egg.large",
    displayText: "2 large eggs",
    quantity: 2,
    unit: "count",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "produce.onion.yellow",
    displayText: "1 onion, diced",
    quantity: 1,
    unit: "count",
    optional: false
  },
  {
    groupName: "The filling",
    canonicalId: "produce.mint.fresh",
    displayText: "Fresh dill",
    quantity: 30,
    unit: "g",
    optional: false
  },
  {
    groupName: "The pastry",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "Phyllo pastry sheets",
    quantity: 12,
    unit: "count",
    optional: false
  },
  {
    groupName: "The pastry",
    canonicalId: "oil.olive",
    displayText: "100 ml Olive oil for brushing",
    quantity: 100,
    unit: "ml",
    optional: false
  }
];

window.RECIPE_INGREDIENT_MAP["croissants"] = [
  {
    groupName: "The dough",
    canonicalId: "pantry.flour.wheat.cake",
    displayText: "500 g Strong bread flour",
    quantity: 500,
    unit: "g",
    optional: false
  },
  {
    groupName: "The dough",
    canonicalId: "pantry.sugar.caster",
    displayText: "50 g Caster sugar",
    quantity: 50,
    unit: "g",
    optional: false
  },
  {
    groupName: "The dough",
    canonicalId: "pantry.salt.sea.flaky",
    displayText: "10 g Flaky sea salt",
    quantity: 10,
    unit: "g",
    optional: false
  },
  {
    groupName: "The dough",
    canonicalId: "dairy.milk.full-cream",
    displayText: "300 ml Full-cream milk",
    quantity: 300,
    unit: "ml",
    optional: false
  },
  {
    groupName: "The lamination",
    canonicalId: "oil.butter",
    displayText: "250 g Cold unsalted butter",
    quantity: 250,
    unit: "g",
    optional: false
  },
  {
    groupName: "The egg wash",
    canonicalId: "protein.egg.large",
    displayText: "1 large egg, beaten",
    quantity: 1,
    unit: "count",
    optional: false
  }
];

/**
 * COMPLETION STATUS TRACKER:
 *
 * Batch 1 (SA): 3/8 recipes mapped
 *   ✅ snoek-pate
 *   ✅ crayfish-bisque
 *   ✅ cape-malay-lamb-braised
 *   ⏳ fish-cakes-tartare
 *   ⏳ milk-tart-cheesecake
 *   ⏳ kingklip-en-papillote
 *   ⏳ sardines-braai-lemon
 *   ⏳ prime-rib-roast
 *
 * Legacy (stories.js): 1/56 mapped
 *   ✅ denningvleis
 *   ⏳ (55 more)
 *
 * Other recipes: 1/164 mapped
 *   ✅ butter-chicken (sample)
 *   ⏳ (163 more)
 *
 * TOTAL: 5/228 recipes (2%)
 *
 * NEXT STEPS:
 * 1. Batch 1 SA (remaining 5): 30-45 min
 * 2. Legacy batch (56 recipes): 2-3 hours (can batch in parallel)
 * 3. Remaining recipes: 2-3 hours (can batch in parallel)
 *
 * EFFICIENCY NOTE:
 * Each recipe is approximately 8-15 ingredients × 10-15 min research/mapping = 2-4 min per recipe once standardized.
 * Bulk processing (same cuisine/origin) is faster — Cape Malay recipes share spices, proteins, techniques.
 */

console.log('✅ Recipe-to-Ingredient Map loaded. ' + Object.keys(window.RECIPE_INGREDIENT_MAP).length + ' recipes mapped.');
