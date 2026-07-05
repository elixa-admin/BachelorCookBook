/**
 * INGREDIENT TAXONOMY — Phase 1 Canonical Ingredient Identity Layer
 *
 * Maps raw recipe ingredient descriptions to canonical ingredient IDs.
 * This is the foundation of the ingredient-to-product matching engine.
 *
 * Structure:
 *   window.INGREDIENT_TAXONOMY = {
 *     "category.item.variant.state": {
 *       id, displayName, category, aliases, matchRules, etc.
 *     }
 *   }
 *
 * ID Convention: {category}.{item}.{variant}.{state}
 *   category: protein, dairy, produce, pantry, spice, oil, wine, other
 *   item: chicken, cream, onion, salt, etc.
 *   variant: optional specificity (fresh, dried, mature, boneless, extra-virgin)
 *   state: raw, cooked, ground, whole, etc.
 *
 * COMPLETION STATUS: 65/100 top ingredients
 * TODO: Expand with remaining 35 + additional variants (AntiGravity will complete)
 */

window.INGREDIENT_TAXONOMY = {
  // ===== PROTEINS =====
  "protein.chicken.thigh.boneless": {
    id: "protein.chicken.thigh.boneless",
    displayName: "Deboned chicken thighs",
    category: "protein",
    subcategory: "poultry",
    aliases: ["boneless chicken thighs", "chicken thigh fillets", "deboned thighs", "skinless chicken thighs"],
    culinaryRole: ["primary protein"],
    physicalState: "raw",
    color: "pale pink to white",
    dietaryAttributes: ["gluten-free", "dairy-free"],
    matchRules: {
      requiredTerms: ["chicken", "thigh"],
      preferredTerms: ["deboned", "boneless", "fillet", "skinless"],
      excludeTerms: ["crumbed", "marinated", "cooked", "smoked", "flavoured", "processed"],
      minScore: 50
    },
    packFormats: ["per kg", "kg pack", "portion"]
  },

  "protein.fish.snoek.smoked": {
    id: "protein.fish.snoek.smoked",
    displayName: "Smoked snoek",
    category: "protein",
    subcategory: "fish",
    aliases: ["snoek fillet", "smoked snoek fillet", "snoek", "thyrsites atun"],
    culinaryRole: ["primary protein", "starter"],
    physicalState: "smoked",
    regionalName: "Snoek (Cape)",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo"],
    matchRules: {
      requiredTerms: ["snoek", "fish"],
      preferredTerms: ["smoked", "fillet", "deboned"],
      excludeTerms: ["canned", "tinned", "paste"],
      minScore: 60
    }
  },

  "protein.crustacean.crayfish.tail": {
    id: "protein.crustacean.crayfish.tail",
    displayName: "Rock lobster tails",
    category: "protein",
    subcategory: "crustacean",
    aliases: ["crayfish", "south african rock lobster", "langoustine tail"],
    culinaryRole: ["primary protein", "luxury"],
    physicalState: "raw",
    regionalName: "Crayfish (SA)",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo"],
    matchRules: {
      requiredTerms: ["crayfish", "lobster", "rock lobster"],
      preferredTerms: ["tail", "fresh", "frozen"],
      excludeTerms: ["cooked", "canned", "paste"],
      minScore: 55
    },
    packFormats: ["per kg", "tail", "whole"]
  },

  "protein.fish.hake.fillet": {
    id: "protein.fish.hake.fillet",
    displayName: "Hake fillet",
    category: "protein",
    subcategory: "fish",
    aliases: ["hake", "white fish", "hake portions"],
    culinaryRole: ["primary protein"],
    physicalState: "raw",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo"],
    matchRules: {
      requiredTerms: ["hake", "fish"],
      preferredTerms: ["fillet", "boneless", "skinless"],
      excludeTerms: ["smoked", "canned", "cooked"],
      minScore: 50
    }
  },

  "protein.fish.kingklip.fillet": {
    id: "protein.fish.kingklip.fillet",
    displayName: "Kingklip fillet",
    category: "protein",
    subcategory: "fish",
    aliases: ["kingklip", "white fish"],
    culinaryRole: ["primary protein", "luxury"],
    physicalState: "raw",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo"],
    matchRules: {
      requiredTerms: ["kingklip"],
      preferredTerms: ["fillet", "boneless"],
      excludeTerms: ["smoked", "canned"],
      minScore: 55
    }
  },

  "protein.fish.sardine.whole": {
    id: "protein.fish.sardine.whole",
    displayName: "Fresh sardines",
    category: "protein",
    subcategory: "fish",
    aliases: ["sardine", "whole sardine"],
    culinaryRole: ["primary protein"],
    physicalState: "raw",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo", "omega-3"],
    matchRules: {
      requiredTerms: ["sardine"],
      preferredTerms: ["fresh", "whole", "gutted"],
      excludeTerms: ["canned", "tinned", "smoked", "dried"],
      minScore: 50
    }
  },

  "protein.beef.prime-rib": {
    id: "protein.beef.prime-rib",
    displayName: "Prime rib roast",
    category: "protein",
    subcategory: "beef",
    aliases: ["ribeye roast", "prime rib", "ribeye", "rib roast"],
    culinaryRole: ["primary protein", "showstopper"],
    physicalState: "raw",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo"],
    gradePreferred: "Prime or AAA",
    matchRules: {
      requiredTerms: ["prime", "rib", "beef"],
      preferredTerms: ["roast", "standing rib", "bone-in"],
      excludeTerms: ["ground", "diced", "stewing"],
      minScore: 55
    },
    packFormats: ["per kg", "whole rib", "section"]
  },

  "protein.lamb.shoulder": {
    id: "protein.lamb.shoulder",
    displayName: "Lamb shoulder",
    category: "protein",
    subcategory: "lamb",
    aliases: ["lamb shoulder roast", "lamb shoulder steaks"],
    culinaryRole: ["primary protein"],
    physicalState: "raw",
    dietaryAttributes: ["gluten-free", "dairy-free", "paleo"],
    matchRules: {
      requiredTerms: ["lamb", "shoulder"],
      preferredTerms: ["bone-in", "braising cut", "slow-cook"],
      excludeTerms: ["ground", "mince", "processed"],
      minScore: 50
    }
  },

  // ===== DAIRY =====
  "dairy.cream.pouring": {
    id: "dairy.cream.pouring",
    displayName: "Fresh pouring cream",
    category: "dairy",
    subcategory: "cream",
    aliases: ["fresh cream", "pouring cream", "heavy cream", "thickened cream"],
    culinaryRole: ["enrichment", "sauce base"],
    physicalState: "liquid",
    fat_percent: "35-40%",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["cream"],
      preferredTerms: ["fresh", "pouring", "pure"],
      excludeTerms: ["whipped", "aerosol", "spray"],
      minScore: 50
    },
    packFormats: ["250ml", "500ml", "1L"]
  },

  "dairy.cheese.cheddar.mature": {
    id: "dairy.cheese.cheddar.mature",
    displayName: "Mature cheddar cheese",
    category: "dairy",
    subcategory: "cheese",
    aliases: ["cheddar", "aged cheddar", "sharp cheddar"],
    culinaryRole: ["primary ingredient", "finishing"],
    physicalState: "solid",
    age: "12+ months",
    flavor_profile: "sharp, complex, slightly crystalline",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["cheddar", "cheese"],
      preferredTerms: ["mature", "aged", "sharp"],
      excludeTerms: ["mild", "young", "processed"],
      minScore: 55
    },
    packFormats: ["250g", "500g", "1kg block"]
  },

  "dairy.cheese.cream": {
    id: "dairy.cheese.cream",
    displayName: "Cream cheese",
    category: "dairy",
    subcategory: "cheese",
    aliases: ["cream cheese", "soft cheese", "philadelphia"],
    culinaryRole: ["primary ingredient", "enrichment"],
    physicalState: "soft paste",
    fat_percent: "33%",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["cream", "cheese"],
      preferredTerms: ["full-fat", "soft", "spreadable"],
      excludeTerms: ["low-fat", "diet"],
      minScore: 55
    },
    packFormats: ["250g", "500g"]
  },

  "dairy.sour-cream": {
    id: "dairy.sour-cream",
    displayName: "Sour cream",
    category: "dairy",
    subcategory: "cream",
    aliases: ["sour cream", "creme fraiche", "cultured cream"],
    culinaryRole: ["enrichment", "topping"],
    physicalState: "thick liquid",
    fat_percent: "18-20%",
    acidity: "acidified by lactobacillus",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["sour", "cream"],
      preferredTerms: ["natural", "cultured"],
      excludeTerms: ["whipped", "spray"],
      minScore: 50
    }
  },

  "dairy.milk.full-cream": {
    id: "dairy.milk.full-cream",
    displayName: "Full-cream milk",
    category: "dairy",
    subcategory: "milk",
    aliases: ["whole milk", "full milk", "full-fat milk"],
    culinaryRole: ["sauce base", "custard base"],
    physicalState: "liquid",
    fat_percent: "3.5-4%",
    pasteurization: "pasteurized",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["milk"],
      preferredTerms: ["full-cream", "whole", "full-fat"],
      excludeTerms: ["skim", "low-fat", "powdered"],
      minScore: 50
    },
    packFormats: ["1L", "2L"]
  },

  // ===== PRODUCE =====
  "produce.onion.yellow": {
    id: "produce.onion.yellow",
    displayName: "Yellow onion",
    category: "produce",
    subcategory: "onion",
    aliases: ["onion", "brown onion", "spanish onion"],
    culinaryRole: ["aromatic base", "foundational"],
    physicalState: "fresh",
    color: "yellow-brown papery skin",
    flavor: "sweet when cooked, sharp when raw",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["onion"],
      preferredTerms: ["yellow", "brown", "large"],
      excludeTerms: ["green", "spring", "red", "white"],
      minScore: 45
    }
  },

  "produce.garlic.fresh": {
    id: "produce.garlic.fresh",
    displayName: "Fresh garlic",
    category: "produce",
    subcategory: "garlic",
    aliases: ["garlic", "garlic cloves", "fresh garlic bulb"],
    culinaryRole: ["aromatic", "foundational"],
    physicalState: "fresh bulb",
    preservation: "cured, room temperature stable",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["garlic"],
      preferredTerms: ["fresh", "clove"],
      excludeTerms: ["powder", "minced", "jarred", "paste"],
      minScore: 40
    }
  },

  "produce.lemon.fresh": {
    id: "produce.lemon.fresh",
    displayName: "Fresh lemon",
    category: "produce",
    subcategory: "citrus",
    aliases: ["lemon", "lemon fruit", "fresh lemon"],
    culinaryRole: ["acid", "brightness", "finishing"],
    physicalState: "fresh fruit",
    color: "bright yellow",
    juice_per_fruit: "2-3 tbsp",
    zest_yield: "1-2 tsp per fruit",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["lemon"],
      preferredTerms: ["fresh", "juice", "zest"],
      excludeTerms: ["concentrate", "bottled", "powder"],
      minScore: 45
    }
  },

  "produce.chilli.fresh.red": {
    id: "produce.chilli.fresh.red",
    displayName: "Red chilli",
    category: "produce",
    subcategory: "chilli",
    aliases: ["red chilli", "fresh chilli", "chilli pepper"],
    culinaryRole: ["heat", "flavor"],
    physicalState: "fresh fruit",
    heat_level: "variable (5,000-100,000 SHU)",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["chilli", "red"],
      preferredTerms: ["fresh", "whole"],
      excludeTerms: ["dried", "powder", "flakes", "processed"],
      minScore: 50
    }
  },

  "produce.spring-onion": {
    id: "produce.spring-onion",
    displayName: "Spring onion",
    category: "produce",
    subcategory: "onion",
    aliases: ["scallion", "green onion", "spring onion", "shallot"],
    culinaryRole: ["garnish", "accent", "finish"],
    physicalState: "fresh",
    color: "white root, green tops",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["spring", "onion"],
      preferredTerms: ["fresh", "whole"],
      excludeTerms: ["dried", "powder"],
      minScore: 45
    }
  },

  "produce.coriander.fresh": {
    id: "produce.coriander.fresh",
    displayName: "Fresh coriander",
    category: "produce",
    subcategory: "herb",
    aliases: ["coriander", "cilantro", "fresh coriander", "dhanya"],
    culinaryRole: ["garnish", "flavor", "finish"],
    physicalState: "fresh leaves",
    culinaryRegion: ["Indian", "Thai", "SA Cape Malay"],
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["coriander"],
      preferredTerms: ["fresh", "bunch", "leaves"],
      excludeTerms: ["dried", "ground", "powder"],
      minScore: 50
    }
  },

  "produce.carrot": {
    id: "produce.carrot",
    displayName: "Carrot",
    category: "produce",
    subcategory: "root vegetable",
    aliases: ["carrot", "orange carrot"],
    culinaryRole: ["aromatic", "body builder", "sweetness"],
    physicalState: "fresh root",
    color: "orange",
    sweetness: "subtle, increases when cooked",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["carrot"],
      preferredTerms: ["fresh", "whole"],
      excludeTerms: ["pre-grated", "canned", "baby carrots (unless specified)"],
      minScore: 40
    }
  },

  "produce.celery": {
    id: "produce.celery",
    displayName: "Celery",
    category: "produce",
    subcategory: "stalk",
    aliases: ["celery", "celery stalks", "celery bunch"],
    culinaryRole: ["aromatic", "body"],
    physicalState: "fresh stalk",
    color: "pale to medium green",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["celery"],
      preferredTerms: ["fresh", "stalk"],
      excludeTerms: ["salt", "powder"],
      minScore: 40
    }
  },

  "produce.potato.floury": {
    id: "produce.potato.floury",
    displayName: "Floury potato",
    category: "produce",
    subcategory: "potato",
    aliases: ["floury potato", "starchy potato", "mashing potato", "russet"],
    culinaryRole: ["base", "thickener"],
    physicalState: "fresh tuber",
    starch_content: "high (15-20%)",
    culinaryUse: "mashing, baking",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["potato"],
      preferredTerms: ["floury", "mashing", "russet"],
      excludeTerms: ["waxy", "salad potato", "new potato"],
      minScore: 45
    }
  },

  "produce.tomato": {
    id: "produce.tomato",
    displayName: "Tomato",
    category: "produce",
    subcategory: "fruit vegetable",
    aliases: ["tomato", "fresh tomato", "slicing tomato"],
    culinaryRole: ["flavor", "acidity", "body"],
    physicalState: "fresh fruit",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["tomato"],
      preferredTerms: ["fresh", "ripe"],
      excludeTerms: ["canned", "paste", "sauce"],
      minScore: 40
    }
  },

  "produce.tomato.cherry": {
    id: "produce.tomato.cherry",
    displayName: "Cherry tomato",
    category: "produce",
    subcategory: "fruit vegetable",
    aliases: ["cherry tomato", "baby tomato", "small tomato"],
    culinaryRole: ["garnish", "flavor", "finish"],
    physicalState: "fresh small fruit",
    size: "walnut to small plum",
    sweetness: "pronounced",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cherry", "tomato"],
      preferredTerms: ["fresh", "small"],
      excludeTerms: ["canned"],
      minScore: 50
    }
  },

  // ===== PANTRY STAPLES =====
  "pantry.salt.sea.flaky": {
    id: "pantry.salt.sea.flaky",
    displayName: "Flaky sea salt",
    category: "pantry",
    subcategory: "salt",
    aliases: ["sea salt flakes", "fleur de sel", "maldon salt"],
    culinaryRole: ["seasoning", "finishing"],
    physicalState: "dry crystals",
    crystal_structure: "large pyramidal flakes",
    origin: "evaporated seawater",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["salt"],
      preferredTerms: ["flaky", "sea", "fleur de sel"],
      excludeTerms: ["table salt", "fine salt", "iodized"],
      minScore: 55
    }
  },

  "pantry.pepper.black.cracked": {
    id: "pantry.pepper.black.cracked",
    displayName: "Cracked black pepper",
    category: "pantry",
    subcategory: "pepper",
    aliases: ["cracked pepper", "black pepper", "peppercorn"],
    culinaryRole: ["seasoning", "finishing"],
    physicalState: "cracked or whole berries",
    flavor: "peppery, slightly floral when freshly cracked",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["pepper", "black"],
      preferredTerms: ["cracked", "freshly ground", "whole"],
      excludeTerms: ["pre-ground", "white pepper", "table"],
      minScore: 50
    }
  },

  "pantry.rice.basmati": {
    id: "pantry.rice.basmati",
    displayName: "Basmati rice",
    category: "pantry",
    subcategory: "rice",
    aliases: ["basmati", "aromatic rice", "long-grain rice"],
    culinaryRole: ["primary starch", "base"],
    physicalState: "dry grain",
    grain_length: "long and slender",
    aroma: "floral, nutty",
    origin: "South Asia",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["basmati", "rice"],
      preferredTerms: ["long-grain", "fragrant"],
      excludeTerms: ["broken", "brown rice"],
      minScore: 55
    }
  },

  "pantry.flour.wheat.cake": {
    id: "pantry.flour.wheat.cake",
    displayName: "Cake wheat flour",
    category: "pantry",
    subcategory: "flour",
    aliases: ["cake flour", "soft wheat flour", "low-protein flour"],
    culinaryRole: ["baking base"],
    physicalState: "dry powder",
    protein_content: "7-9%",
    culinaryUse: "cakes, pastries, desserts",
    origin: "Common in SA as 'cake wheat flour'",
    dietaryAttributes: ["vegan", "gluten-full"],
    matchRules: {
      requiredTerms: ["flour", "cake"],
      preferredTerms: ["wheat", "soft"],
      excludeTerms: ["all-purpose", "bread flour", "self-raising"],
      minScore: 60
    }
  },

  "pantry.biscuit.tennis": {
    id: "pantry.biscuit.tennis",
    displayName: "Tennis biscuit",
    category: "pantry",
    subcategory: "biscuit",
    aliases: ["tennis biscuit", "digestive biscuit", "sweet biscuit"],
    culinaryRole: ["base", "crumb layer"],
    physicalState: "dry baked biscuit",
    regionalName: "Tennis (SA/AU), Digestive (UK)",
    dietaryAttributes: ["vegetarian"],
    matchRules: {
      requiredTerms: ["tennis", "biscuit"],
      preferredTerms: ["plain", "sweet"],
      excludeTerms: ["savoury", "wholemeal"],
      minScore: 55
    }
  },

  "pantry.cornflour": {
    id: "pantry.cornflour",
    displayName: "Cornflour",
    category: "pantry",
    subcategory: "thickener",
    aliases: ["cornflour", "maizena", "cornstarch"],
    culinaryRole: ["thickener", "binder"],
    physicalState: "dry powder",
    thickening_power: "about 2x flour",
    regionalName: "Maizena (SA)",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["cornflour", "maizena", "cornstarch"],
      preferredTerms: ["pure", "white"],
      excludeTerms: ["flour blend"],
      minScore: 55
    }
  },

  "pantry.sugar.caster": {
    id: "pantry.sugar.caster",
    displayName: "Caster sugar",
    category: "pantry",
    subcategory: "sugar",
    aliases: ["caster sugar", "superfine sugar", "castor sugar"],
    culinaryRole: ["sweetener", "baking"],
    physicalState: "fine dry crystals",
    crystal_size: "very fine",
    dietaryAttributes: ["vegan"],
    matchRules: {
      requiredTerms: ["caster", "sugar"],
      preferredTerms: ["fine", "white"],
      excludeTerms: ["granulated", "brown", "icing"],
      minScore: 50
    }
  },

  "pantry.sugar.brown": {
    id: "pantry.sugar.brown",
    displayName: "Brown sugar",
    category: "pantry",
    subcategory: "sugar",
    aliases: ["brown sugar", "soft brown sugar"],
    culinaryRole: ["sweetener", "richness", "baking"],
    physicalState: "moist crystals",
    molasses_content: "3-5%",
    flavor: "deeper, caramel-like",
    dietaryAttributes: ["vegan"],
    matchRules: {
      requiredTerms: ["brown", "sugar"],
      preferredTerms: ["soft", "dark"],
      excludeTerms: ["granulated"],
      minScore: 50
    }
  },

  // ===== OILS & FATS =====
  "oil.olive.extra-virgin": {
    id: "oil.olive.extra-virgin",
    displayName: "Extra virgin olive oil",
    category: "oil",
    subcategory: "olive oil",
    aliases: ["extra virgin olive oil", "evoo", "virgin olive oil"],
    culinaryRole: ["finishing", "drizzling", "dressing"],
    physicalState: "liquid oil",
    smoke_point: "160°C (lower, for finishing)",
    flavor: "peppery, grassy, fruity",
    extraction: "cold-pressed, first pressing",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["olive", "oil"],
      preferredTerms: ["extra virgin", "cold-pressed"],
      excludeTerms: ["light", "pomace", "regular", "refined"],
      minScore: 60
    }
  },

  "oil.olive": {
    id: "oil.olive",
    displayName: "Olive oil",
    category: "oil",
    subcategory: "olive oil",
    aliases: ["olive oil", "pure olive oil", "light olive oil"],
    culinaryRole: ["cooking", "general purpose"],
    physicalState: "liquid oil",
    smoke_point: "210°C (suitable for cooking)",
    extraction: "refined or blend",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["olive", "oil"],
      preferredTerms: ["pure", "light"],
      excludeTerms: ["extra virgin", "pomace"],
      minScore: 55
    }
  },

  "oil.sunflower": {
    id: "oil.sunflower",
    displayName: "Sunflower oil",
    category: "oil",
    subcategory: "vegetable oil",
    aliases: ["sunflower oil", "vegetable oil"],
    culinaryRole: ["frying", "cooking"],
    physicalState: "liquid oil",
    smoke_point: "450°F / 230°C",
    extraction: "pressed",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["sunflower", "oil"],
      preferredTerms: ["pure"],
      excludeTerms: ["blended"],
      minScore: 50
    }
  },

  "oil.canola": {
    id: "oil.canola",
    displayName: "Canola oil",
    category: "oil",
    subcategory: "vegetable oil",
    aliases: ["canola oil", "rapeseed oil"],
    culinaryRole: ["frying", "cooking", "baking"],
    physicalState: "liquid oil",
    smoke_point: "450°F / 230°C",
    extraction: "pressed",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["canola"],
      preferredTerms: ["oil"],
      excludeTerms: ["blended"],
      minScore: 50
    }
  },

  "oil.butter": {
    id: "oil.butter",
    displayName: "Unsalted butter",
    category: "oil",
    subcategory: "dairy fat",
    aliases: ["butter", "unsalted butter", "sweet butter"],
    culinaryRole: ["enrichment", "cooking", "baking"],
    physicalState: "solid at room temp, liquid when heated",
    water_content: "15-17%",
    milk_fat: "80-82%",
    smoke_point: "177°C",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["butter"],
      preferredTerms: ["unsalted", "sweet", "pure"],
      excludeTerms: ["salted", "clarified", "spreadable"],
      minScore: 55
    }
  },

  // ===== SPICES =====
  "spice.coriander.ground": {
    id: "spice.coriander.ground",
    displayName: "Ground coriander",
    category: "spice",
    subcategory: "spice",
    aliases: ["ground coriander", "coriander powder", "coriander seed powder"],
    culinaryRole: ["warming spice", "base"],
    physicalState: "ground powder",
    origin: "Coriander seed (Coriandrum sativum)",
    flavor: "warm, citrusy, slightly floral",
    heat_level: "none",
    regionalUse: ["Indian", "Cape Malay"],
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["coriander"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["whole", "fresh"],
      minScore: 50
    }
  },

  "spice.cumin.ground": {
    id: "spice.cumin.ground",
    displayName: "Ground cumin",
    category: "spice",
    subcategory: "spice",
    aliases: ["ground cumin", "cumin powder"],
    culinaryRole: ["warming spice", "base"],
    physicalState: "ground powder",
    origin: "Cumin seed (Cuminum cyminum)",
    flavor: "warm, nutty, earthy",
    heat_level: "none",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cumin"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["whole"],
      minScore: 50
    }
  },

  "spice.turmeric.ground": {
    id: "spice.turmeric.ground",
    displayName: "Ground turmeric",
    category: "spice",
    subcategory: "spice",
    aliases: ["ground turmeric", "turmeric powder"],
    culinaryRole: ["coloring", "warming spice"],
    physicalState: "ground powder",
    origin: "Turmeric root (Curcuma longa)",
    flavor: "warm, slightly bitter, earthy",
    color: "golden yellow",
    heat_level: "none",
    regionalUse: ["Indian", "Cape Malay"],
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["turmeric"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["fresh root"],
      minScore: 50
    }
  },

  "spice.cinnamon.ground": {
    id: "spice.cinnamon.ground",
    displayName: "Ground cinnamon",
    category: "spice",
    subcategory: "spice",
    aliases: ["ground cinnamon", "cinnamon powder"],
    culinaryRole: ["warming spice", "sweetness"],
    physicalState: "ground powder",
    origin: "Cinnamon bark (Cinnamomum)",
    flavor: "warm, sweet, slightly woody",
    heat_level: "none",
    regionalUse: ["SA desserts", "baking"],
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cinnamon"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["stick", "whole"],
      minScore: 50
    }
  },

  "spice.cardamom.ground": {
    id: "spice.cardamom.ground",
    displayName: "Ground cardamom",
    category: "spice",
    subcategory: "spice",
    aliases: ["ground cardamom", "cardamom powder"],
    culinaryRole: ["warming spice", "flavor"],
    physicalState: "ground powder",
    origin: "Cardamom pod (Elettaria cardamomum)",
    flavor: "warm, citrusy, slightly floral",
    heat_level: "none",
    regionUse: ["Indian", "Cape Malay"],
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cardamom"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["pods", "whole"],
      minScore: 50
    }
  },

  "spice.chilli.flakes.red": {
    id: "spice.chilli.flakes.red",
    displayName: "Chilli flakes",
    category: "spice",
    subcategory: "spice",
    aliases: ["red chilli flakes", "chilli flakes", "crushed chilli"],
    culinaryRole: ["heat"],
    physicalState: "dried and crushed",
    heat_level: "medium to hot (30,000-50,000 SHU)",
    flavor: "fruity, smoky, hot",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["chilli", "flakes"],
      preferredTerms: ["red", "crushed"],
      excludeTerms: ["powder", "fresh"],
      minScore: 50
    }
  },

  "spice.mustard.dijon": {
    id: "spice.mustard.dijon",
    displayName: "Dijon mustard",
    category: "spice",
    subcategory: "condiment",
    aliases: ["dijon", "dijon mustard", "whole grain mustard"],
    culinaryRole: ["flavor", "emulsifier", "seasoning"],
    physicalState: "paste",
    origin: "Dijon, France (traditional)",
    flavor: "sharp, slightly tangy, complex",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["dijon", "mustard"],
      preferredTerms: ["stone-ground", "whole grain"],
      excludeTerms: ["yellow", "bright"],
      minScore: 55
    }
  },

  // ===== CONDIMENTS & EXTRACTS =====
  "pantry.extract.vanilla": {
    id: "pantry.extract.vanilla",
    displayName: "Vanilla extract",
    category: "pantry",
    subcategory: "extract",
    aliases: ["vanilla extract", "pure vanilla extract"],
    culinaryRole: ["flavoring", "sweetness"],
    physicalState: "liquid",
    alcohol_content: "35%",
    origin: "Vanilla bean (Vanilla planifolia)",
    flavor: "sweet, floral, complex",
    purity: "extract vs. essence vs. flavoring",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["vanilla", "extract"],
      preferredTerms: ["pure", "real", "madagascar"],
      excludeTerms: ["imitation", "essence", "flavoring"],
      minScore: 55
    }
  },

  // ===== PRESERVED ITEMS =====
  "pantry.apricot.jam": {
    id: "pantry.apricot.jam",
    displayName: "Apricot jam",
    category: "pantry",
    subcategory: "jam",
    aliases: ["apricot jam", "apricot conserve"],
    culinaryRole: ["sweetness", "flavor", "binder"],
    physicalState: "thick paste",
    fruit_content: "varies (50-70%)",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["apricot", "jam"],
      preferredTerms: ["preserve", "conserve"],
      excludeTerms: ["low-sugar"],
      minScore: 50
    }
  },

  "pantry.tamarind.paste": {
    id: "pantry.tamarind.paste",
    displayName: "Tamarind paste",
    category: "pantry",
    subcategory: "paste",
    aliases: ["tamarind paste", "tamarind concentrate", "tamarind puree"],
    culinaryRole: ["acid", "sourness", "flavor"],
    physicalState: "thick paste",
    origin: "Tamarind tree (Tamarindus indica)",
    flavor: "sour, tangy, fruity",
    acidity: "high",
    regionalUse: ["Indian", "Cape Malay", "Southeast Asian"],
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["tamarind"],
      preferredTerms: ["paste", "concentrate"],
      excludeTerms: ["powder", "whole"],
      minScore: 55
    }
  },

  // ===== BEVERAGES =====
  "beverage.wine.brandy": {
    id: "beverage.wine.brandy",
    displayName: "Brandy",
    category: "beverage",
    subcategory: "wine",
    aliases: ["brandy", "cognac", "south african brandy"],
    culinaryRole: ["flambé", "flavor", "richness"],
    physicalState: "liquid alcohol",
    abv: "40%",
    origin: "Distilled from wine",
    regionalProduct: "KWV, Van Ryn (SA)",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["brandy"],
      preferredTerms: ["south african", "kwv", "van ryn"],
      excludeTerms: ["low-alcohol"],
      minScore: 60
    }
  },

  "beverage.wine.white.dry": {
    id: "beverage.wine.white.dry",
    displayName: "Dry white wine",
    category: "beverage",
    subcategory: "wine",
    aliases: ["white wine", "dry white", "sauvignon blanc", "chenin blanc"],
    culinaryRole: ["deglazing", "sauce building", "cooking"],
    physicalState: "liquid alcohol",
    abv: "11-13%",
    acidity: "medium to high",
    flavor: "dry, crisp, fruity",
    regionalOptions: ["Sauvignon Blanc (Constantia, Durbanville)", "Chenin Blanc (Stellenbosch)"],
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["wine", "white"],
      preferredTerms: ["dry", "sauvignon blanc", "chenin blanc"],
      excludeTerms: ["sweet", "dessert"],
      minScore: 50
    }
  },

  // ===== EGGS =====
  "protein.egg.large": {
    id: "protein.egg.large",
    displayName: "Large egg",
    category: "protein",
    subcategory: "egg",
    aliases: ["egg", "large egg", "chicken egg"],
    culinaryRole: ["binder", "enrichment", "primary ingredient"],
    physicalState: "raw",
    size: "large (50-60g)",
    dietaryAttributes: ["vegetarian", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["egg"],
      preferredTerms: ["large", "free-range", "farm"],
      excludeTerms: ["powdered", "dried"],
      minScore: 50
    }
  },

  // ===== FRESH HERBS =====
  "produce.ginger.fresh": {
    id: "produce.ginger.fresh",
    displayName: "Fresh ginger",
    category: "produce",
    subcategory: "herb",
    aliases: ["ginger", "fresh ginger root", "ginger root"],
    culinaryRole: ["flavor", "warmth", "accent"],
    physicalState: "fresh root",
    color: "tan skin, yellow flesh",
    flavor: "pungent, warm, slightly sweet",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["ginger"],
      preferredTerms: ["fresh", "root"],
      excludeTerms: ["powdered", "ground", "dried", "candied"],
      minScore: 50
    }
  },

  "produce.basil.fresh": {
    id: "produce.basil.fresh",
    displayName: "Fresh basil",
    category: "produce",
    subcategory: "herb",
    aliases: ["basil", "sweet basil", "fresh basil leaves"],
    culinaryRole: ["flavor", "garnish", "finish"],
    physicalState: "fresh leaves",
    flavor: "sweet, peppery, anise-like",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["basil"],
      preferredTerms: ["fresh", "sweet"],
      excludeTerms: ["dried", "powder"],
      minScore: 50
    }
  },

  "produce.thyme.fresh": {
    id: "produce.thyme.fresh",
    displayName: "Fresh thyme",
    category: "produce",
    subcategory: "herb",
    aliases: ["thyme", "fresh thyme sprigs", "english thyme"],
    culinaryRole: ["flavor", "aromatic"],
    physicalState: "fresh sprigs",
    flavor: "subtle, slightly minty, earthy",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["thyme"],
      preferredTerms: ["fresh", "sprigs"],
      excludeTerms: ["dried", "powder"],
      minScore: 45
    }
  },

  "produce.oregano.dried": {
    id: "produce.oregano.dried",
    displayName: "Dried oregano",
    category: "produce",
    subcategory: "herb",
    aliases: ["oregano", "dried oregano", "oregano powder"],
    culinaryRole: ["flavor", "aromatic"],
    physicalState: "dried leaves",
    flavor: "peppery, minty, slightly bitter",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["oregano"],
      preferredTerms: ["dried"],
      excludeTerms: ["fresh"],
      minScore: 50
    }
  },

  // ===== VEGETABLES =====
  "produce.asparagus": {
    id: "produce.asparagus",
    displayName: "Asparagus",
    category: "produce",
    subcategory: "vegetable",
    aliases: ["asparagus", "green asparagus", "asparagus spears"],
    culinaryRole: ["vegetable", "side"],
    physicalState: "fresh spears",
    color: "bright green",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["asparagus"],
      preferredTerms: ["fresh", "green", "spears"],
      excludeTerms: ["canned", "white"],
      minScore: 50
    }
  },

  "produce.green-bean": {
    id: "produce.green-bean",
    displayName: "Green bean",
    category: "produce",
    subcategory: "vegetable",
    aliases: ["green bean", "french bean", "string bean", "snap pea"],
    culinaryRole: ["vegetable", "side"],
    physicalState: "fresh pod",
    color: "bright green",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["green", "bean"],
      preferredTerms: ["fresh", "snap"],
      excludeTerms: ["canned", "dried"],
      minScore: 50
    }
  },

  "produce.potato.waxy": {
    id: "produce.potato.waxy",
    displayName: "Waxy potato",
    category: "produce",
    subcategory: "potato",
    aliases: ["waxy potato", "salad potato", "new potato"],
    culinaryRole: ["base", "salad"],
    physicalState: "fresh tuber",
    starch_content: "low (10-12%)",
    culinaryUse: "boiling, salads",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["potato"],
      preferredTerms: ["waxy", "salad", "new"],
      excludeTerms: ["floury", "mashing"],
      minScore: 50
    }
  },

  "produce.rocket": {
    id: "produce.rocket",
    displayName: "Rocket",
    category: "produce",
    subcategory: "green",
    aliases: ["rocket", "arugula", "rucola"],
    culinaryRole: ["salad", "garnish"],
    physicalState: "fresh leaves",
    flavor: "peppery, spicy",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["rocket", "arugula"],
      preferredTerms: ["fresh", "wild"],
      excludeTerms: ["bagged", "pre-washed"],
      minScore: 50
    }
  },

  // ===== CONDIMENTS & SAUCES =====
  "pantry.mayonnaise.good": {
    id: "pantry.mayonnaise.good",
    displayName: "Good mayonnaise",
    category: "pantry",
    subcategory: "sauce",
    aliases: ["mayonnaise", "mayo", "homemade mayo"],
    culinaryRole: ["sauce base", "enrichment"],
    physicalState: "thick emulsion",
    fat_content: "70-80% oil",
    dietaryAttributes: ["vegetarian", "gluten-free"],
    matchRules: {
      requiredTerms: ["mayonnaise"],
      preferredTerms: ["good", "quality", "homemade"],
      excludeTerms: ["light", "low-fat"],
      minScore: 55
    }
  },

  "pantry.capers": {
    id: "pantry.capers",
    displayName: "Capers",
    category: "pantry",
    subcategory: "pickled",
    aliases: ["capers", "caper berries"],
    culinaryRole: ["flavor", "acid", "garnish"],
    physicalState: "brined small buds",
    flavor: "salty, tangy, slightly bitter",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["capers"],
      preferredTerms: ["brined", "nonpareil"],
      excludeTerms: ["powder"],
      minScore: 55
    }
  },

  "pantry.gherkins": {
    id: "pantry.gherkins",
    displayName: "Gherkins",
    category: "pantry",
    subcategory: "pickled",
    aliases: ["gherkins", "cornichons", "pickled cucumber"],
    culinaryRole: ["garnish", "flavor", "acid"],
    physicalState: "brined small cucumber",
    flavor: "sour, salty, crunchy",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["gherkin", "cornichon"],
      preferredTerms: ["pickled", "small"],
      excludeTerms: ["powder"],
      minScore: 55
    }
  },

  // ===== SPICES (CONTINUED) =====
  "spice.clove.whole": {
    id: "spice.clove.whole",
    displayName: "Whole cloves",
    category: "spice",
    subcategory: "spice",
    aliases: ["clove", "whole clove", "clove bud"],
    culinaryRole: ["warming spice", "aromatic"],
    physicalState: "dried whole",
    flavor: "warm, sweet, slightly bitter",
    heat_level: "none",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["clove"],
      preferredTerms: ["whole", "buds"],
      excludeTerms: ["ground", "powder"],
      minScore: 50
    }
  },

  "spice.clove.ground": {
    id: "spice.clove.ground",
    displayName: "Ground cloves",
    category: "spice",
    subcategory: "spice",
    aliases: ["clove powder", "ground clove"],
    culinaryRole: ["warming spice", "baking"],
    physicalState: "ground powder",
    flavor: "warm, sweet, pungent",
    heat_level: "none",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["clove"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["whole"],
      minScore: 50
    }
  },

  "pantry.bay-leaf": {
    id: "pantry.bay-leaf",
    displayName: "Bay leaf",
    category: "pantry",
    subcategory: "herb",
    aliases: ["bay leaf", "laurel leaf", "bay leaves"],
    culinaryRole: ["aromatic", "body builder"],
    physicalState: "dried leaf",
    flavor: "subtle, slightly floral",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["bay"],
      preferredTerms: ["leaf", "leaves"],
      excludeTerms: ["powder", "ground"],
      minScore: 50
    }
  },

  "spice.cardamom.pods.green": {
    id: "spice.cardamom.pods.green",
    displayName: "Green cardamom pods",
    category: "spice",
    subcategory: "spice",
    aliases: ["green cardamom", "cardamom pods", "elaichi"],
    culinaryRole: ["warming spice", "flavor"],
    physicalState: "dried whole pods",
    flavor: "warm, citrusy, slightly floral",
    heat_level: "none",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cardamom", "pods"],
      preferredTerms: ["green", "whole"],
      excludeTerms: ["ground", "black"],
      minScore: 50
    }
  },

  // ===== CONDIMENTS =====
  "pantry.soy-sauce": {
    id: "pantry.soy-sauce",
    displayName: "Soy sauce",
    category: "pantry",
    subcategory: "sauce",
    aliases: ["soy sauce", "shoyu", "tamari"],
    culinaryRole: ["seasoning", "umami"],
    physicalState: "liquid",
    flavor: "salty, umami, slightly sweet",
    saltiness: "high",
    dietaryAttributes: ["vegan", "gluten-free (tamari)"],
    matchRules: {
      requiredTerms: ["soy"],
      preferredTerms: ["sauce", "quality"],
      excludeTerms: ["light", "low-sodium"],
      minScore: 50
    }
  },

  "pantry.worcestershire-sauce": {
    id: "pantry.worcestershire-sauce",
    displayName: "Worcestershire sauce",
    category: "pantry",
    subcategory: "sauce",
    aliases: ["worcestershire", "lea & perrins"],
    culinaryRole: ["seasoning", "umami", "depth"],
    physicalState: "liquid",
    flavor: "tangy, savory, slightly spicy",
    dietaryAttributes: ["vegetarian (some brands)", "gluten-free (some)"],
    matchRules: {
      requiredTerms: ["worcestershire"],
      preferredTerms: ["classic", "original"],
      excludeTerms: ["reduced sodium"],
      minScore: 55
    }
  },

  "pantry.fish-sauce": {
    id: "pantry.fish-sauce",
    displayName: "Fish sauce",
    category: "pantry",
    subcategory: "sauce",
    aliases: ["fish sauce", "nam pla", "nuoc mam"],
    culinaryRole: ["seasoning", "umami"],
    physicalState: "liquid",
    flavor: "pungent, salty, umami",
    regionalUse: ["Thai", "Vietnamese", "Southeast Asian"],
    dietaryAttributes: ["vegan: no", "gluten-free"],
    matchRules: {
      requiredTerms: ["fish", "sauce"],
      preferredTerms: ["quality", "nam pla"],
      excludeTerms: ["reduced"],
      minScore: 55
    }
  },

  "pantry.mirin": {
    id: "pantry.mirin",
    displayName: "Mirin",
    category: "pantry",
    subcategory: "sauce",
    aliases: ["mirin", "sweet rice wine", "aji-mirin"],
    culinaryRole: ["sweetness", "gloss", "flavor"],
    physicalState: "liquid",
    flavor: "sweet, slightly alcoholic",
    sugar_content: "high (40-50%)",
    regionalUse: ["Japanese"],
    dietaryAttributes: ["vegan", "gluten-free (check)"],
    matchRules: {
      requiredTerms: ["mirin"],
      preferredTerms: ["hon-mirin", "sweet rice wine"],
      excludeTerms: ["aji-mirin (lower quality)"],
      minScore: 55
    }
  },

  // ===== OILS & VINEGARS =====
  "pantry.vinegar.brown": {
    id: "pantry.vinegar.brown",
    displayName: "Brown vinegar",
    category: "pantry",
    subcategory: "vinegar",
    aliases: ["brown vinegar", "malt vinegar"],
    culinaryRole: ["acid", "seasoning"],
    physicalState: "liquid",
    acidity: "4-6% acetic acid",
    flavor: "malty, slightly sweet",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["vinegar", "brown"],
      preferredTerms: ["malt"],
      excludeTerms: ["white", "apple cider"],
      minScore: 50
    }
  },

  "pantry.vinegar.rice": {
    id: "pantry.vinegar.rice",
    displayName: "Rice vinegar",
    category: "pantry",
    subcategory: "vinegar",
    aliases: ["rice vinegar", "rice wine vinegar"],
    culinaryRole: ["acid", "seasoning"],
    physicalState: "liquid",
    acidity: "4-5% acetic acid",
    flavor: "mild, slightly sweet",
    regionalUse: ["Japanese", "Asian"],
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["rice", "vinegar"],
      preferredTerms: ["unseasoned"],
      excludeTerms: ["seasoned"],
      minScore: 50
    }
  },

  "pantry.vinegar.wine": {
    id: "pantry.vinegar.wine",
    displayName: "Wine vinegar",
    category: "pantry",
    subcategory: "vinegar",
    aliases: ["wine vinegar", "red wine vinegar", "white wine vinegar"],
    culinaryRole: ["acid", "finishing", "dressing"],
    physicalState: "liquid",
    acidity: "5-7% acetic acid",
    flavor: "complex, fruity, slightly tannic",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["wine", "vinegar"],
      preferredTerms: ["red", "white"],
      excludeTerms: ["balsamic"],
      minScore: 50
    }
  },

  // ===== STOCKS =====
  "pantry.stock.beef": {
    id: "pantry.stock.beef",
    displayName: "Beef stock",
    category: "pantry",
    subcategory: "stock",
    aliases: ["beef stock", "beef broth"],
    culinaryRole: ["base", "body builder"],
    physicalState: "liquid",
    flavor: "deep, savory, rich",
    homemade_vs_boxed: "homemade preferred",
    dietaryAttributes: ["gluten-free (check)"],
    matchRules: {
      requiredTerms: ["beef", "stock"],
      preferredTerms: ["homemade", "quality"],
      excludeTerms: ["bouillon cube"],
      minScore: 55
    }
  },

  "pantry.stock.vegetable": {
    id: "pantry.stock.vegetable",
    displayName: "Vegetable stock",
    category: "pantry",
    subcategory: "stock",
    aliases: ["vegetable stock", "vegetable broth"],
    culinaryRole: ["base", "body builder"],
    physicalState: "liquid",
    flavor: "mild, neutral, clean",
    homemade_vs_boxed: "homemade preferred",
    dietaryAttributes: ["vegan", "gluten-free (check)"],
    matchRules: {
      requiredTerms: ["vegetable", "stock"],
      preferredTerms: ["homemade", "quality"],
      excludeTerms: ["bouillon cube"],
      minScore: 55
    }
  },

  "pantry.stock.fish": {
    id: "pantry.stock.fish",
    displayName: "Fish stock",
    category: "pantry",
    subcategory: "stock",
    aliases: ["fish stock", "fish broth"],
    culinaryRole: ["base", "body builder"],
    physicalState: "liquid",
    flavor: "delicate, oceanic, clean",
    homemade_vs_boxed: "homemade strongly preferred",
    dietaryAttributes: ["gluten-free"],
    matchRules: {
      requiredTerms: ["fish", "stock"],
      preferredTerms: ["homemade", "white fish"],
      excludeTerms: ["bouillon"],
      minScore: 60
    }
  },

  // ===== LIQUIDS & PANTRY =====
  "pantry.honey": {
    id: "pantry.honey",
    displayName: "Honey",
    category: "pantry",
    subcategory: "sweetener",
    aliases: ["honey", "raw honey", "liquid honey"],
    culinaryRole: ["sweetness", "gloss", "richness"],
    physicalState: "viscous liquid",
    flavor: "sweet, floral, slightly complex",
    crystallization: "varies by type",
    dietaryAttributes: ["vegan: no", "gluten-free"],
    matchRules: {
      requiredTerms: ["honey"],
      preferredTerms: ["raw", "liquid"],
      excludeTerms: ["crystallized"],
      minScore: 50
    }
  },

  "pantry.coconut-milk": {
    id: "pantry.coconut-milk",
    displayName: "Coconut milk",
    category: "pantry",
    subcategory: "liquid",
    aliases: ["coconut milk", "canned coconut milk"],
    culinaryRole: ["enrichment", "base", "creaminess"],
    physicalState: "liquid emulsion",
    fat_content: "13-20%",
    flavor: "rich, sweet, coconut",
    regionalUse: ["Thai", "Indian", "Southeast Asian"],
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["coconut", "milk"],
      preferredTerms: ["full-fat", "canned"],
      excludeTerms: ["lite", "low-fat"],
      minScore: 55
    }
  },

  "pantry.condensed-milk": {
    id: "pantry.condensed-milk",
    displayName: "Condensed milk",
    category: "pantry",
    subcategory: "dairy",
    aliases: ["condensed milk", "sweetened condensed milk"],
    culinaryRole: ["sweetness", "richness", "binder"],
    physicalState: "thick liquid",
    sugar_content: "high (45-50%)",
    flavor: "very sweet, creamy, caramel",
    dietaryAttributes: ["vegetarian"],
    matchRules: {
      requiredTerms: ["condensed", "milk"],
      preferredTerms: ["sweetened"],
      excludeTerms: ["evaporated"],
      minScore: 55
    }
  },

  // ===== NUTS & SEEDS =====
  "pantry.almond": {
    id: "pantry.almond",
    displayName: "Almond",
    category: "pantry",
    subcategory: "nut",
    aliases: ["almond", "blanched almond", "slivered almond"],
    culinaryRole: ["texture", "richness", "garnish"],
    physicalState: "whole or sliced",
    flavor: "mild, slightly sweet, nutty",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["almond"],
      preferredTerms: ["blanched", "sliced", "whole"],
      excludeTerms: ["powder (unless specified)"],
      minScore: 50
    }
  },

  "pantry.hazelnut": {
    id: "pantry.hazelnut",
    displayName: "Hazelnut",
    category: "pantry",
    subcategory: "nut",
    aliases: ["hazelnut", "filbert"],
    culinaryRole: ["flavor", "richness", "garnish"],
    physicalState: "whole or chopped",
    flavor: "rich, warm, slightly sweet",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["hazelnut"],
      preferredTerms: ["roasted", "whole"],
      excludeTerms: ["powder"],
      minScore: 50
    }
  },

  "pantry.sesame-seed": {
    id: "pantry.sesame-seed",
    displayName: "Sesame seed",
    category: "pantry",
    subcategory: "seed",
    aliases: ["sesame seed", "sesame seeds", "white sesame"],
    culinaryRole: ["garnish", "texture", "nutty flavor"],
    physicalState: "dry seeds",
    flavor: "nutty, slightly sweet",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["sesame"],
      preferredTerms: ["seed", "white"],
      excludeTerms: ["oil", "paste"],
      minScore: 50
    }
  },

  // ===== PRESERVED FRUITS =====
  "pantry.apricot.dried": {
    id: "pantry.apricot.dried",
    displayName: "Dried apricot",
    category: "pantry",
    subcategory: "dried fruit",
    aliases: ["dried apricot", "apricots"],
    culinaryRole: ["sweetness", "flavor", "texture"],
    physicalState: "dried fruit halves",
    flavor: "sweet, tangy, fruity",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["apricot", "dried"],
      preferredTerms: ["whole", "unsulfured"],
      excludeTerms: ["jam"],
      minScore: 50
    }
  },

  // ===== BREADCRUMBS & SIMILAR =====
  "pantry.breadcrumb.dried": {
    id: "pantry.breadcrumb.dried",
    displayName: "Dried breadcrumb",
    category: "pantry",
    subcategory: "coating",
    aliases: ["breadcrumb", "dried breadcrumb", "panko"],
    culinaryRole: ["coating", "binder", "texture"],
    physicalState: "dry crumbs",
    grain_size: "fine to medium",
    dietaryAttributes: ["vegetarian", "contains gluten"],
    matchRules: {
      requiredTerms: ["breadcrumb"],
      preferredTerms: ["dried", "fine"],
      excludeTerms: ["fresh"],
      minScore: 50
    }
  },

  // ===== SPICE VARIANTS =====
  "spice.ginger.ground": {
    id: "spice.ginger.ground",
    displayName: "Ground ginger",
    category: "spice",
    subcategory: "spice",
    aliases: ["ground ginger", "ginger powder"],
    culinaryRole: ["warming spice", "baking"],
    physicalState: "ground powder",
    flavor: "warm, peppery, sweet",
    heat_level: "mild",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["ginger"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["fresh", "candied"],
      minScore: 50
    }
  },

  "spice.peppercorn.black": {
    id: "spice.peppercorn.black",
    displayName: "Black peppercorn",
    category: "spice",
    subcategory: "pepper",
    aliases: ["black peppercorn", "whole black pepper"],
    culinaryRole: ["seasoning", "toasting"],
    physicalState: "whole dried berries",
    flavor: "peppery, slightly floral",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["peppercorn", "black"],
      preferredTerms: ["whole"],
      excludeTerms: ["ground"],
      minScore: 50
    }
  },

  // ===== FINAL 15 INGREDIENTS (completing 100/100) =====

  "produce.mint.fresh": {
    id: "produce.mint.fresh",
    displayName: "Fresh mint",
    category: "produce",
    subcategory: "herb",
    aliases: ["mint", "fresh mint leaves", "peppermint"],
    culinaryRole: ["garnish", "flavor", "cooling"],
    physicalState: "fresh leaves",
    flavor: "cool, sweet, slightly peppery",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["mint"],
      preferredTerms: ["fresh", "leaves"],
      excludeTerms: ["dried", "extract"],
      minScore: 50
    }
  },

  "produce.spinach": {
    id: "produce.spinach",
    displayName: "Spinach",
    category: "produce",
    subcategory: "green",
    aliases: ["spinach", "fresh spinach", "baby spinach"],
    culinaryRole: ["base", "vegetable"],
    physicalState: "fresh leaves",
    flavor: "earthy, slightly bitter",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["spinach"],
      preferredTerms: ["fresh", "leaves"],
      excludeTerms: ["frozen", "canned"],
      minScore: 50
    }
  },

  "pantry.nutmeg": {
    id: "pantry.nutmeg",
    displayName: "Ground nutmeg",
    category: "pantry",
    subcategory: "spice",
    aliases: ["nutmeg", "ground nutmeg"],
    culinaryRole: ["warming spice", "baking"],
    physicalState: "ground powder",
    flavor: "warm, sweet, slightly bitter",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["nutmeg"],
      preferredTerms: ["ground", "powder"],
      excludeTerms: ["whole"],
      minScore: 50
    }
  },

  "produce.orange": {
    id: "produce.orange",
    displayName: "Orange",
    category: "produce",
    subcategory: "citrus",
    aliases: ["orange", "fresh orange"],
    culinaryRole: ["acid", "flavor", "finishing"],
    physicalState: "fresh fruit",
    color: "bright orange",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["orange"],
      preferredTerms: ["fresh", "juice", "zest"],
      excludeTerms: ["concentrate", "bottled"],
      minScore: 50
    }
  },

  "produce.lime": {
    id: "produce.lime",
    displayName: "Lime",
    category: "produce",
    subcategory: "citrus",
    aliases: ["lime", "fresh lime"],
    culinaryRole: ["acid", "brightness", "finishing"],
    physicalState: "fresh fruit",
    color: "bright green",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["lime"],
      preferredTerms: ["fresh", "juice", "zest"],
      excludeTerms: ["concentrate"],
      minScore: 50
    }
  },

  "pantry.walnut": {
    id: "pantry.walnut",
    displayName: "Walnut",
    category: "pantry",
    subcategory: "nut",
    aliases: ["walnut", "walnuts", "toasted walnut"],
    culinaryRole: ["texture", "richness", "garnish"],
    physicalState: "whole or chopped",
    flavor: "earthy, slightly bitter, rich",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["walnut"],
      preferredTerms: ["whole", "toasted"],
      excludeTerms: ["powder"],
      minScore: 50
    }
  },

  "pantry.cashew": {
    id: "pantry.cashew",
    displayName: "Cashew",
    category: "pantry",
    subcategory: "nut",
    aliases: ["cashew", "cashews", "roasted cashew"],
    culinaryRole: ["richness", "creaminess", "texture"],
    physicalState: "whole or pieces",
    flavor: "rich, buttery, slightly sweet",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cashew"],
      preferredTerms: ["roasted", "whole"],
      excludeTerms: ["powder"],
      minScore: 50
    }
  },

  "pantry.pine-nut": {
    id: "pantry.pine-nut",
    displayName: "Pine nut",
    category: "pantry",
    subcategory: "nut",
    aliases: ["pine nut", "pine nuts", "pignoli"],
    culinaryRole: ["texture", "richness", "garnish"],
    physicalState: "whole nuts",
    flavor: "rich, buttery, slightly resinous",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["pine", "nut"],
      preferredTerms: ["toasted"],
      excludeTerms: [],
      minScore: 55
    }
  },

  "produce.garlic.roasted": {
    id: "produce.garlic.roasted",
    displayName: "Roasted garlic",
    category: "produce",
    subcategory: "garlic",
    aliases: ["roasted garlic", "garlic puree"],
    culinaryRole: ["flavor", "richness"],
    physicalState: "roasted cloves or puree",
    flavor: "sweet, mellow, no harsh bite",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["garlic", "roasted"],
      preferredTerms: ["roasted"],
      excludeTerms: ["raw"],
      minScore: 55
    }
  },

  "pantry.miso": {
    id: "pantry.miso",
    displayName: "Miso paste",
    category: "pantry",
    subcategory: "paste",
    aliases: ["miso", "miso paste", "white miso"],
    culinaryRole: ["umami", "depth", "seasoning"],
    physicalState: "thick paste",
    flavor: "salty, umami, fermented",
    regionalUse: ["Japanese"],
    dietaryAttributes: ["vegan", "gluten-free (check)"],
    matchRules: {
      requiredTerms: ["miso"],
      preferredTerms: ["paste", "white", "red"],
      excludeTerms: [],
      minScore: 55
    }
  },

  "pantry.coconut-cream": {
    id: "pantry.coconut-cream",
    displayName: "Coconut cream",
    category: "pantry",
    subcategory: "liquid",
    aliases: ["coconut cream", "thick coconut milk"],
    culinaryRole: ["richness", "creaminess", "base"],
    physicalState: "thick liquid",
    fat_content: "20-30%",
    flavor: "rich, sweet, coconut",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["coconut", "cream"],
      preferredTerms: ["full-fat", "canned"],
      excludeTerms: ["lite"],
      minScore: 55
    }
  },

  "produce.basil.purple": {
    id: "produce.basil.purple",
    displayName: "Purple basil",
    category: "produce",
    subcategory: "herb",
    aliases: ["purple basil", "opal basil", "red basil"],
    culinaryRole: ["flavor", "garnish", "finish"],
    physicalState: "fresh leaves",
    color: "deep purple to black",
    flavor: "peppery, clove-like, less sweet than green",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["basil", "purple"],
      preferredTerms: ["fresh", "opal"],
      excludeTerms: ["dried"],
      minScore: 50
    }
  },

  "spice.anise": {
    id: "spice.anise",
    displayName: "Anise seed",
    category: "spice",
    subcategory: "spice",
    aliases: ["anise", "anise seed", "aniseed"],
    culinaryRole: ["warming spice", "flavor"],
    physicalState: "whole seeds",
    flavor: "sweet, licorice-like",
    heat_level: "none",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["anise"],
      preferredTerms: ["seed", "whole"],
      excludeTerms: ["powder"],
      minScore: 50
    }
  },

  "pantry.sumac": {
    id: "pantry.sumac",
    displayName: "Sumac",
    category: "pantry",
    subcategory: "spice",
    aliases: ["sumac", "sumac powder"],
    culinaryRole: ["acid", "tartness", "color"],
    physicalState: "ground powder",
    color: "deep red-purple",
    flavor: "sour, tangy, lemony",
    regionalUse: ["Middle Eastern", "Mediterranean"],
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["sumac"],
      preferredTerms: ["powder", "ground"],
      excludeTerms: [],
      minScore: 55
    }
  },

  "produce.cucumber": {
    id: "produce.cucumber",
    displayName: "Cucumber",
    category: "produce",
    subcategory: "vegetable",
    aliases: ["cucumber", "fresh cucumber", "slicing cucumber"],
    culinaryRole: ["vegetable", "cooling", "refreshment"],
    physicalState: "fresh fruit",
    color: "pale to dark green",
    flavor: "mild, refreshing, slightly watery",
    dietaryAttributes: ["vegan", "gluten-free", "paleo"],
    matchRules: {
      requiredTerms: ["cucumber"],
      preferredTerms: ["fresh", "slicing"],
      excludeTerms: ["pickled"],
      minScore: 50
    }
  },

  "pantry.panko-breadcrumb": {
    id: "pantry.panko-breadcrumb",
    displayName: "Panko breadcrumb",
    category: "pantry",
    subcategory: "coating",
    aliases: ["panko", "panko breadcrumb", "japanese breadcrumb"],
    culinaryRole: ["coating", "crunch", "texture"],
    physicalState: "dry flakes",
    grain_size: "coarse, light and airy",
    dietaryAttributes: ["vegetarian", "contains gluten"],
    matchRules: {
      requiredTerms: ["panko"],
      preferredTerms: ["breadcrumb"],
      excludeTerms: ["fine"],
      minScore: 50
    }
  },

  "pantry.maple-syrup": {
    id: "pantry.maple-syrup",
    displayName: "Maple syrup",
    category: "pantry",
    subcategory: "sweetener",
    aliases: ["maple syrup", "pure maple syrup"],
    culinaryRole: ["sweetness", "gloss", "flavor"],
    physicalState: "thick liquid",
    flavor: "sweet, slightly woody, complex",
    origin: "North American maple tree sap",
    dietaryAttributes: ["vegan", "gluten-free"],
    matchRules: {
      requiredTerms: ["maple", "syrup"],
      preferredTerms: ["pure", "organic"],
      excludeTerms: ["pancake syrup", "artificial"],
      minScore: 55
    }
  }

  // NOTE: Taxonomy now includes 100 canonical ingredients ✅
  // Coverage: All Batch 1 SA + legacy recipes fully supported
  // Ready for Phase 2: Recipe-to-Ingredient Mapping (5 recipes started)
  // Next: Complete recipe mapping (223 remaining), then Phase 3-4
};

console.log('✅ Ingredient Taxonomy loaded. ' + Object.keys(window.INGREDIENT_TAXONOMY).length + ' canonical ingredients registered.');

console.log('✅ Ingredient Taxonomy loaded. ' + Object.keys(window.INGREDIENT_TAXONOMY).length + ' canonical ingredients registered.');
