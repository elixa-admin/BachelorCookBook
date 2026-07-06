// Pantry Tiers: Strategic ingredient selection for maximum recipe coverage
// Built from analysis of 147 recipes: 5 core ingredients unlock 82.4% of the cookbook

window.PANTRY_TIERS = {

  essentials: {
    tier: 1,
    name: 'Essentials',
    tagline: 'The foundation — keep always stocked',
    description: 'Five ingredients that unlock 82% of the cookbook. These are the non-negotiable base layer: the aromatic foundations (garlic, onion), the cooking medium (oil), the seasoning bedrock (salt), and the flavor palette (spices).',
    coverage: 82,
    ingredients: [
      {
        slug: 'spices',
        name: 'Spices',
        category: 'Seasoning',
        coverage: 59,
        description: 'The flavor backbone of most dishes. Maintain: ground cumin, coriander, turmeric, paprika, cinnamon, cloves, cardamom. Also keep: whole spices for toasting (coriander seeds, cumin seeds, cloves).',
        essentials: ['Ground cumin', 'Ground coriander', 'Ground turmeric', 'Sweet paprika', 'Ground cinnamon', 'Whole cloves', 'Green cardamom pods'],
        storage: 'Airtight containers, away from light, 6-12 months',
        notes: 'Buy whole spices when possible; grind fresh for maximum flavor. Label with purchase date.',
        uses: 'Every cuisine: Indian curries, Middle Eastern marinades, Asian stir-fries, African stews, European braises'
      },
      {
        slug: 'garlic',
        name: 'Garlic',
        category: 'Aromatic',
        coverage: 57,
        description: 'The most-used ingredient across all cuisines. Buy loose bulbs, store cool and dry. Minced garlic in a jar is a backup but use fresh as primary.',
        essentials: ['Fresh garlic bulbs (1-2 heads weekly)', 'Minced garlic (backup)'],
        storage: 'Cool, dark, well-ventilated place; 2-3 weeks. Refrigerate minced; 3-4 weeks.',
        notes: 'Avoid sprouted garlic. One head yields 8-10 cloves. Pre-minced is convenient but oxidizes faster.',
        uses: 'Asian, Indian, Italian, Middle Eastern, African — nearly every savory dish'
      },
      {
        slug: 'oil',
        name: 'Oil',
        category: 'Fat',
        coverage: 51,
        description: 'Two types: neutral (for cooking high-heat) and premium (for finishing). Neutral = sunflower, canola, or vegetable oil. Premium = good extra virgin olive oil.',
        essentials: ['Neutral oil (1L bottle, sunflower or canola)', 'Extra virgin olive oil (smaller bottle for finishing)'],
        storage: 'Cool, dark place. Neutral oil 1-2 years, EVOO 6-12 months after opening.',
        notes: 'Replace EVOO annually; it degrades. Neutral oil is your workhorse; EVOO adds depth only at the end.',
        uses: 'Every technique: pan-frying, braising, dressing, sautéing, roasting'
      },
      {
        slug: 'salt',
        name: 'Salt',
        category: 'Seasoning',
        coverage: 44,
        description: 'Table salt for cooking, flaky sea salt for finishing. Most recipes use both: one for in-pot seasoning (dissolves), one for garnish (texture, brightness).',
        essentials: ['Fine sea salt or table salt (large container)', 'Flaky sea salt (finishing salt, smaller)'],
        storage: 'Airtight containers, indefinite shelf life.',
        notes: 'Flaky salt (Maldon-style) is not just for show — it provides a textural element and slower dissolve that enhances flavors at the bite.',
        uses: 'Every dish requires salt; it amplifies all other flavors and controls seasoning baseline'
      },
      {
        slug: 'onion',
        name: 'Onion',
        category: 'Aromatic',
        coverage: 34,
        description: 'Yellow/brown onions are the workhorse. They sweeten and deepen as they cook. Buy loose bulbs, store in a cool, dark place. Lasts 2-3 weeks.',
        essentials: ['Yellow/brown onions (3-4 bulbs weekly)'],
        storage: 'Cool, dark, well-ventilated place; 2-3 weeks. Not in the fridge (condensation).',
        notes: 'Do not substitute with red onions (too sharp) or sweet onions (too mild) for cooking bases. These are for taming; use others for raw/finishing.',
        uses: 'Sautéing bases for braises, curries, soups; caramelizing for depth; sweating for soufflés'
      }
    ]
  },

  core: {
    tier: 2,
    name: 'Core',
    tagline: 'Rotate these monthly — brings you to 94% coverage',
    description: 'The second tier: fats (butter), acids (lemon, vinegar), brightness (pepper), proteins (beef, chicken), and umami anchors (tomato, ginger). These transform dishes from functional to delicious.',
    coverage: 94,
    ingredients: [
      {
        slug: 'butter',
        name: 'Butter',
        category: 'Fat',
        coverage: 33,
        description: 'Unsalted butter for control. Use for pan-frying steaks, finishing sauces, baking, and tempering spices. The richness separates good food from great.',
        essentials: ['Unsalted butter (1-2 blocks weekly)'],
        storage: 'Refrigerate; 1-2 months. Freezer: 6 months.',
        notes: 'Always unsalted — you control salt levels. Salted butter is for toast.',
        uses: 'Searing proteins, finishing sauces, baking, tempering spices (tadka), brown butter for drizzling'
      },
      {
        slug: 'lemon-lime',
        name: 'Lemon/Lime',
        category: 'Acid',
        coverage: 32,
        description: 'Fresh citrus is non-negotiable for brightness. Lemon for classical European/SA dishes; lime for Asian/Mexican. Buy 4-6 at a time; they last 2 weeks.',
        essentials: ['Fresh lemons (4-6 weekly)', 'Fresh limes (optional, for Asian cooking)'],
        storage: 'Room temperature, or refrigerate in a sealed bag; 2-3 weeks.',
        notes: 'Bottled juice loses structure within days. Fresh only. Room temp before juicing yields more juice.',
        uses: 'Finishing soups, dressing salads, brightening sauces, poaching fish, balancing spice heat'
      },
      {
        slug: 'black-pepper',
        name: 'Black Pepper',
        category: 'Seasoning',
        coverage: 32,
        description: 'Whole peppercorns, freshly ground. Pre-ground loses volatile oils in weeks. A pepper mill is a worthwhile investment. Use at the end of cooking for maximum impact.',
        essentials: ['Black peppercorns (1 container)', 'Pepper mill'],
        storage: 'Airtight container, away from light; 6+ months',
        notes: 'Freshly cracked black pepper tastes like a different ingredient vs. pre-ground. Non-negotiable.',
        uses: 'Finishing seasoning for soups, steaks, eggs, salads; part of spice blends'
      },
      {
        slug: 'beef',
        name: 'Beef',
        category: 'Protein',
        coverage: 31,
        description: 'Ground beef or chuck roast for braising. Buy in bulk, freeze in portions. Lean cuts dry out in long cooks; fattier cuts improve with time.',
        essentials: ['Ground beef 500g-1kg weekly, or', 'Beef chuck roast for braising (1.5-2kg monthly)'],
        storage: 'Refrigerate 1-2 days; freeze up to 3 months. Thaw in fridge overnight.',
        notes: 'Ask butcher for 80/20 ground beef (80% lean, 20% fat) — better for flavor. Chuck develops gelatin when braised, making silky sauces.',
        uses: 'Braises (oxtail, chuck), ground (burgers, mince curries), steaks (high-heat sears)'
      },
      {
        slug: 'tomato',
        name: 'Tomato',
        category: 'Vegetable/Umami',
        coverage: 20,
        description: 'Canned whole tomatoes or tomato paste. Canned are more consistent year-round than fresh. Paste is concentrated flavor — a little goes far.',
        essentials: ['Canned whole tomatoes (1-2 x 400g tins weekly)', 'Tomato paste (1 small tube)'],
        storage: 'Pantry: 1 year. Once opened, tomato paste: refrigerate in airtight container 3-4 weeks.',
        notes: 'San Marzano cans are premium but pricey. Regular canned works fine. Paste is intense: use sparingly.',
        uses: 'Pasta sauces, curries, soups, braises, shakshuka, chilli'
      },
      {
        slug: 'ginger',
        name: 'Ginger',
        category: 'Aromatic',
        coverage: 22,
        description: 'Fresh root ginger. Buy a small knob (thumbnail-sized piece lasts a week). Grate or mince into curries, stir-fries, teas. Peel only if skin is thick.',
        essentials: ['Fresh ginger root (1 small knob weekly)'],
        storage: 'Refrigerate in a paper bag; 2-3 weeks. Freezer: grate while frozen, use as-is; 3 months.',
        notes: 'Frozen ginger is less flavorful but convenient. Fresh is superior.',
        uses: 'Asian curries, stir-fries, braises, soups, marinades, baking, teas'
      },
      {
        slug: 'chicken',
        name: 'Chicken',
        category: 'Protein',
        coverage: 18,
        description: 'Boneless thighs or whole chicken. Thighs are forgiving (less drying than breast); whole birds are economical for stock and multiple meals.',
        essentials: ['Boneless chicken thighs 4-6 pieces weekly, or', 'Whole chicken 1.5-2kg fortnightly'],
        storage: 'Refrigerate 1-2 days; freeze up to 3 months.',
        notes: 'Thighs are your friend: darker meat, forgiving, never dry. Breasts are lean; risk overcooking.',
        uses: 'Pan-frying, braising, curries, stir-fries, stocks, roasting'
      },
      {
        slug: 'eggs',
        name: 'Eggs',
        category: 'Protein',
        coverage: 10,
        description: 'Buy a dozen at a time. Use for binding (breadcrumbs), baking, soft-boiled snacks, scrambles, omelets. One of the most versatile ingredients.',
        essentials: ['Eggs (1 dozen, buy fresh weekly)'],
        storage: 'Refrigerate in original carton; 3-4 weeks (not on door)',
        notes: 'Room-temperature eggs cook more evenly. Take out 30 min before baking/whisking.',
        uses: 'Baking, binding (meatballs, fish cakes), scrambles, soft-boiled, omelets, custards'
      },
      {
        slug: 'cream',
        name: 'Cream',
        category: 'Fat',
        coverage: 7,
        description: 'Heavy cream or fresh cream for sauces, soups, desserts. A little goes far. Keep a carton in the fridge for emergencies.',
        essentials: ['Fresh cream 200ml (optional, as needed)', 'Or: heavy cream if unavailable'],
        storage: 'Refrigerate; use by date (usually 2 weeks)',
        notes: 'Whipping cream has less fat than heavy cream — both work. Room temp before whisking for whipped cream.',
        uses: 'Finishing sauces (stroganoff, cream soups), desserts, bisques'
      }
    ]
  },

  specialty: {
    tier: 3,
    name: 'Specialty',
    tagline: 'Buy for specific recipes — unlocks the rest',
    description: 'Proteins (fish, lamb, seafood), premium ingredients (wine, quality olive oil), and specialized items (curry pastes, coconut milk). These are recipe-driven buys, not staples.',
    coverage: 100,
    ingredients: [
      {
        slug: 'fish',
        name: 'Fish (Hake, Kingklip)',
        category: 'Protein',
        coverage: 15,
        description: 'SA white fish. Hake is most accessible and affordable. Kingklip is premium. Buy fresh if possible, freeze same day otherwise.',
        essentials: ['Hake fillets 400-600g, or', 'Kingklip fillets 200-300g (premium)'],
        storage: 'Use same day if fresh. Freeze up to 3 months.',
        notes: 'Ask fishmonger for skin-off. Quality matters: fresh fish smells clean, not "fishy".',
        uses: 'Pan-frying, poaching, en papillote, fish cakes, curry'
      },
      {
        slug: 'lamb',
        name: 'Lamb',
        category: 'Protein',
        coverage: 16,
        description: 'Shoulder (for braising/curries), neck fillet (for quick cooks), chops (for grilling). Braising cuts improve with long, slow heat.',
        essentials: ['Lamb shoulder 800g-1.2kg for braises, or', 'Lamb chops 4-6 for grilling'],
        storage: 'Refrigerate 1-2 days; freeze up to 3 months.',
        notes: 'Shoulder is economical and becomes silky when braised. Chops are weekend grilling.',
        uses: 'Braising curries (Cape Malay), sosaties (skewers), roasting, slow-cook stews'
      },
      {
        slug: 'seafood',
        name: 'Seafood (Prawns, Mussels, Crayfish)',
        category: 'Protein',
        coverage: 8,
        description: 'Seasonal and perishable. Buy same day as cooking. Prawns year-round; crayfish (creef) seasonal (November-May).',
        essentials: ['Large green prawns 400-600g, or', 'Live mussels 500g, or', 'Rock lobster/crayfish when in season'],
        storage: 'Use same day. Mussels: refrigerate in damp cloth, 1-2 days.',
        notes: 'Prawns should smell of sea, not ammonia. Tap mussels — discard if they don\'t close.',
        uses: 'Pan-frying prawns with garlic/lemon, moules marinière, bisques, curries'
      },
      {
        slug: 'wine',
        name: 'Wine (Red & White)',
        category: 'Liquid',
        coverage: 7,
        description: 'Dry red (for braises) and dry white (for poaching/deglazing). Cooking-grade is fine — don\'t use expensive bottles.',
        essentials: ['Dry red wine (Cabernet or Shiraz) 750ml', 'Dry white wine (Sauvignon Blanc or Chenin) 750ml'],
        storage: 'Cool, dark place. Once opened: 3-5 days in fridge.',
        notes: 'Never use "cooking wine" from the supermarket (has added salt). Any dry table wine works.',
        uses: 'Beef braises, deglazing pans for pan sauces, poaching fish, bouillabaisse'
      },
      {
        slug: 'coconut-milk',
        name: 'Coconut Milk',
        category: 'Liquid',
        coverage: 5,
        description: 'Full-fat canned coconut milk for curries and Asian dishes. Shake well before opening (cream separates).',
        essentials: ['Full-fat coconut milk 1-2 x 400ml tins (as needed)'],
        storage: 'Pantry: 1 year. Opened: refrigerate 1-2 days.',
        notes: 'Full-fat is crucial — lite versions are watery. Some recipes specify cream layer; shake for uniform consistency.',
        uses: 'Thai curries (green, red, massaman), Asian soups (Tom Yum), creamy braises'
      },
      {
        slug: 'curry-paste',
        name: 'Curry Paste (Red, Green, or Mild)',
        category: 'Seasoning',
        coverage: 7,
        description: 'Save time with quality paste. Thai Kitchen and Thai Gold are reliable. Use 1-2 tbsp per curry pot.',
        essentials: ['Red curry paste 1 jar', 'Green curry paste 1 jar (optional)'],
        storage: 'Refrigerate after opening; 2 months in airtight container.',
        notes: 'Homemade is superior but time-consuming. Paste cuts 30 min of spice grinding/toasting.',
        uses: 'Thai curries, quick Asian braises, marinades'
      },
      {
        slug: 'soy-sauce',
        name: 'Soy Sauce',
        category: 'Seasoning',
        coverage: 9,
        description: 'Regular soy sauce (not tamari unless cooking gluten-free). Adds umami depth to Asian dishes. A little goes far.',
        essentials: ['Soy sauce 1 bottle 600ml'],
        storage: 'Pantry; indefinite.',
        notes: 'Light soy is for dipping/raw; dark soy for cooking. We use regular (medium).',
        uses: 'Stir-fries, marinades, soups, dipping sauces, braises'
      },
      {
        slug: 'rice',
        name: 'Rice',
        category: 'Starch',
        coverage: 7,
        description: 'Jasmine rice for Asian dishes, long-grain white for general use. Buy in bulk; stores indefinitely.',
        essentials: ['Jasmine or long-grain white rice 2kg bag'],
        storage: 'Airtight container or original bag; indefinite.',
        notes: 'Jasmine has slight floral note; white rice is neutral. Basmati for Indian.',
        uses: 'Curries, stir-fries, meals, porridge, risotto base'
      },
      {
        slug: 'pasta',
        name: 'Pasta',
        category: 'Starch',
        coverage: 5,
        description: 'Spaghetti or penne. Buy dried (not fresh). Italian brands are superior but any decent pasta works.',
        essentials: ['Spaghetti 500g box', 'Penne 500g box (optional)'],
        storage: 'Pantry; 2+ years.',
        notes: 'Bronze-cut (rough texture) sauces stick better than smooth varieties.',
        uses: 'Pasta carbonara, aglio e olio, bolognese, marinara'
      },
      {
        slug: 'stock',
        name: 'Stock (Beef/Chicken)',
        category: 'Liquid',
        coverage: 12,
        description: 'Liquid stock in tetra packs or quality cubes. Homemade is superior but time-intensive. Liquid stock tastes better than powder.',
        essentials: ['Beef stock 1L tetra pack', 'Chicken stock 1L tetra pack'],
        storage: 'Pantry: 1 year. Opened: refrigerate 3-4 days.',
        notes: 'Look for low-sodium versions; adjust salt in recipe.',
        uses: 'Risottos, braises, soups, pan sauces, curries'
      },
      {
        slug: 'vinegar',
        name: 'Vinegar (Balsamic or White)',
        category: 'Acid',
        coverage: 4,
        description: 'White vinegar for cooking and pickling. Balsamic for finishing salads. Different acids suit different dishes.',
        essentials: ['White vinegar 1 bottle 500ml', 'Balsamic vinegar 1 small bottle (finishing)'],
        storage: 'Pantry; indefinite.',
        notes: 'Balsamic is expensive but a splash takes a salad from good to excellent.',
        uses: 'Pickling, deglazing, salad dressings, marinades'
      },
      {
        slug: 'sugar',
        name: 'Sugar (Caster & Brown)',
        category: 'Sweetener',
        coverage: 20,
        description: 'Caster sugar for cooking (dissolves faster). Brown sugar for baking and caramel. Keep both on hand.',
        essentials: ['Caster sugar 1kg bag', 'Brown sugar 500g bag'],
        storage: 'Airtight containers; indefinite. Brown sugar: seal well to prevent hardening.',
        notes: 'Caster is finer than granulated; dissolves better in sauces. Brown is hygroscopic — seal tightly.',
        uses: 'Baking, caramels, braises (small amounts for depth), sauces'
      },
      {
        slug: 'flour',
        name: 'Flour (Cake Wheat & Bread)',
        category: 'Dry Goods',
        coverage: 7,
        description: 'Cake wheat flour for baking/thickening. Bread flour (higher protein) for breads and laminated pastry.',
        essentials: ['Cake wheat flour 2kg bag', 'Bread flour 1kg bag (optional)'],
        storage: 'Airtight containers, cool place; 3-6 months.',
        notes: 'SA standard: cake wheat = US all-purpose. Bread flour has more gluten, develops chew.',
        uses: 'Baking cakes/biscuits, thickening sauces, breads, pastry'
      },
      {
        slug: 'chilli',
        name: 'Chilli (Fresh & Flakes)',
        category: 'Seasoning',
        coverage: 16,
        description: 'Fresh red chillies for heat and color. Chilli flakes (dried) for consistent heat without moisture.',
        essentials: ['Fresh red chillies 2-3 weekly', 'Chilli flakes 1 small jar'],
        storage: 'Chillies: refrigerate 1-2 weeks. Flakes: airtight, away from light; 6+ months.',
        notes: 'Heat is in the seeds and white membrane. Remove for milder dishes. Flakes are shelf-stable alternative.',
        uses: 'Curries, stir-fries, finishing touch for soups, hot dips, marinades'
      },
      {
        slug: 'coriander-leaf',
        name: 'Coriander (Fresh Leaf)',
        category: 'Herb',
        coverage: 16,
        description: 'Fresh coriander (dhanya) for finishing. Strongly aromatic. Buy bunches, use within 3-4 days.',
        essentials: ['Fresh coriander bunch (as needed)'],
        storage: 'Wrap in damp paper towel, refrigerate in bag; 3-4 days.',
        notes: 'SA staple, especially in Cape Malay cooking. Some people find it soapy-tasting (genetic).',
        uses: 'Finishing curries, Indian gravies, Thai soups, salads, sides'
      },
      {
        slug: 'potato',
        name: 'Potatoes',
        category: 'Starch',
        coverage: 5,
        description: 'Floury potatoes (King Edward, Maris Piper) for mashing/baking. Waxy (Charlotte, Desiree) for salads/boiling.',
        essentials: ['Floury potatoes 2kg bag'],
        storage: 'Cool, dark, well-ventilated place; 2-3 weeks. Not in fridge (starch converts to sugar).',
        notes: 'Floury varieties break down more, creating creamy mash. Waxy hold shape.',
        uses: 'Mashed potato, baking, gratins, fish cakes, sides'
      }
    ]
  }
};

// Helper: Calculate recipe coverage given a set of selected ingredients
function calculatePantryCoverage(selectedIngredients) {
  if (!window.R) return { cookable: 0, total: 0, pct: 0, recipes: [] };

  const pantrySet = new Set(selectedIngredients.map(s => s.toLowerCase()));
  const cookable = [];

  R.forEach(recipe => {
    if (!recipe.ing || !Array.isArray(recipe.ing)) return;

    const recipeIngredients = [];
    recipe.ing.forEach(category => {
      if (Array.isArray(category) && category[1]) {
        category[1].forEach(ing => {
          if (Array.isArray(ing) && ing[3]) {
            const normalized = ing[3].toLowerCase()
              .replace(/\(.*?\)/g, '')
              .replace(/,.*$/, '')
              .trim();
            recipeIngredients.push(normalized);
          }
        });
      }
    });

    // Check if most ingredients are in pantry (allow 20% leeway for specialty items)
    const covered = recipeIngredients.filter(i =>
      pantrySet.has(i) ||
      pantrySet.has(i.split(' ')[0]) // Match on first word
    ).length;

    const coverage = recipeIngredients.length > 0 ? covered / recipeIngredients.length : 0;
    if (coverage >= 0.8) {
      cookable.push({ slug: recipe.slug, name: recipe.t, coverage: Math.round(coverage * 100) });
    }
  });

  return {
    cookable: cookable.length,
    total: R.length,
    pct: Math.round((cookable.length / R.length) * 100),
    recipes: cookable
  };
}

// Export helpers for use in tub-app.js
if (typeof window !== 'undefined') {
  window.calculatePantryCoverage = calculatePantryCoverage;
}
