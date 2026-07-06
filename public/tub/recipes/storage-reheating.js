/* Storage & Reheating Guidelines — Signature/Aspirational recipe storage.
   GAP-FILL merge: only adds entries that storage.js has NOT already defined.
   storage.js loads first (HTML <script> order) with rich, food-safety-correct
   entries; this file fills the gaps for recipes storage.js misses. This
   preserves the high-quality data and prevents terse defaults overwriting it. */
window.RECIPE_STORAGE = (function(existing){
  var gaps = {
  // RISOTTO
  "risotto-milanese-saffron": {
    fridge: "<b>Up to 3 days</b> in an airtight container. Risotto degrades quickly — the rice grains will firm up and separate.",
    freezer: "Freezes for up to 1 month, though texture will never fully recover.",
    reheat: "Reheat gently in a saucepan over low heat with a splash of warm broth or water, stirring constantly. The dish should return to a creamy flow. <b>Do not microwave</b> — uneven heat dries out the rice."
  },

  // STEAK
  "steak": {
    fridge: "<b>Up to 3 days</b> wrapped tightly in foil or in an airtight container. Steak is best fresh.",
    freezer: "<b>Up to 1 month</b> — freezes well with minimal quality loss if wrapped airtight.",
    reheat: "Slice cold, then warm briefly in a hot pan with butter (30 seconds per side). <b>Do not reheat whole</b> — the interior stays cold while the exterior overcooks. Slice first. <b>Never microwave.</b>"
  },

  // PASTA
  "cacio-e-pepe": {
    fridge: "Not recommended. Serve immediately.",
    freezer: "Not recommended.",
    reheat: "Not recommended. This emulsion of starch, cheese, and pasta water cannot be reliably recreated. <b>Best eaten fresh.</b>"
  },

  "pasta-carbonara": {
    fridge: "<b>Up to 2 days</b> in an airtight container. The sauce will firm up.",
    freezer: "Not recommended for the finished pasta. The creamy sauce breaks.",
    reheat: "Warm gently in a large pan over low heat with a splash of pasta water, stirring constantly. <b>Do not microwave.</b> The original emulsion should hold — do not add cream."
  },

  // FISH
  "pan-seared-branzino": {
    fridge: "<b>Up to 2 days</b> in an airtight container. The delicate flesh is best fresh.",
    freezer: "<b>Do not freeze</b> — the texture breaks down irreversibly.",
    reheat: "Eat cold, or slice and warm very briefly in a hot pan with butter (10 seconds per side). <b>Do not fully reheat</b> — the fillet will dry out. Cold fish with a warm sauce is often better."
  },

  // CURRY
  "home-chicken-curry": {
    fridge: "<b>Up to 4 days</b> in an airtight container. Curries actually improve overnight as flavors meld.",
    freezer: "<b>Up to 3 months</b> — curries freeze excellently.",
    reheat: "Reheat on the stovetop over medium heat, stirring occasionally. Add a splash of water if the sauce has thickened. Or microwave at 50% power for 2-3 minutes, stirring halfway. <b>Curries are forgiving.</b>"
  },

  // ROASTED VEGETABLES
  "roasted-broccolini-garlic-chilli": {
    fridge: "<b>Up to 3 days</b> in an airtight container.",
    freezer: "Not recommended — texture suffers.",
    reheat: "Reheat in a hot oven (400°F/200°C) for 3-4 minutes until warmed through. Or eat cold as a salad. <b>Never microwave</b> — vegetables become soggy."
  },

  // BAKED & SWEET
  "molten-chocolate-fondant": {
    fridge: "Bake fresh to order — do not store.",
    freezer: "Not applicable.",
    reheat: "Not applicable. The warm, molten center is the entire point. <b>This dish cannot be made in advance.</b>"
  },

  // BRAISED MEAT
  "braai-lamb-chops-chimichurri": {
    fridge: "<b>Up to 3 days</b> for the cooked chops. Chimichurri can be stored separately for up to 1 week in a glass jar.",
    freezer: "<b>Up to 1 month</b> for the lamb. Chimichurri does not freeze well.",
    reheat: "Warm the chops gently in a low oven (300°F/150°C) for 10-15 minutes. Serve with fresh chimichurri or the reserved sauce warmed gently. Lamb chops are best served warm but not piping hot."
  },

  // STEWS & POTJIES
  "oxtail-potjie": {
    fridge: "<b>Up to 5 days</b> in an airtight container. Flavors deepen with time.",
    freezer: "<b>Up to 3 months</b> — braises freeze excellently.",
    reheat: "Reheat on the stovetop over medium-low heat, stirring occasionally. Slow-cooked braises are very forgiving — flavors continue to meld when reheated."
  },

  // SOUPS
  "butternut-squash-sage-soup": {
    fridge: "<b>Up to 4 days</b> in an airtight container.",
    freezer: "<b>Up to 3 months</b> — texture may change slightly but flavor holds.",
    reheat: "Reheat gently on the stovetop or microwave. If the soup has thickened, add broth or water to restore consistency. Puréed soups are very stable when reheated."
  },

  // GRAINS & RICE
  "pilau-rice-sa": {
    fridge: "<b>Up to 3 days</b> in an airtight container.",
    freezer: "<b>Up to 1 month</b> — rice freezes adequately.",
    reheat: "Reheat on the stovetop in a covered pot with a splash of water over medium heat, stirring frequently. Or microwave at 50% power for 2-3 minutes. <b>Adding moisture prevents drying out.</b>"
  },

  // ADDITIONAL RECIPES (using category defaults)
  "beef-ribs-sticky-braise": window.STORAGE_DEFAULTS?.main_meat || {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat in low oven 300°F, 15-20 min"},
  "beef-teriyaki": window.STORAGE_DEFAULTS?.main_meat || {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat gently on stovetop"},
  "bobotie": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat at 350°F for 15-20 min"},
  "borscht": {fridge:"<b>Up to 5 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat on stovetop, add broth if needed"},
  "butter-chicken": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat gently on stovetop"},
  "cape-malay-chicken-curry": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat on stovetop"},
  "chakalaka": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat in oven or microwave"},
  "chicken-biryani": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat in oven at 350°F covered, 15 min"},
  "chicken-stir-fry": {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Reheat quickly in hot pan or wok"},
  "churros-chocolate": {fridge:"<b>1 day</b> in airtight container",freezer:"Not recommended",reheat:"Best fresh. Warm chocolate gently"},
  "creme-brulee": {fridge:"<b>Up to 2 days</b> refrigerated",freezer:"Not recommended",reheat:"Serve chilled. Torch fresh before serving"},
  "crepes": {fridge:"<b>Up to 3 days</b> stacked with parchment",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently in pan or microwave"},
  "croissants": {fridge:"<b>1-2 days</b> in airtight container",freezer:"<b>Up to 1 month</b>",reheat:"Warm in oven at 350°F for 5-8 min"},
  "denningvleis": {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat gently in oven or stovetop"},
  "doro-wat": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat on stovetop"},
  "egg-fried-rice": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat in wok or pan over high heat"},
  "eggs-benedict-hollandaise": {fridge:"Sauce up to 2 days, eggs best fresh",freezer:"Not recommended",reheat:"Make fresh. Warm sauce gently"},
  "espetada": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently in oven or pan"},
  "falafel-plate": {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm falafel in oven at 350°F"},
  "fattoush": {fridge:"Best fresh, up to 1 day",freezer:"Not recommended",reheat:"Assemble fresh, do not reheat"},
  "fish-tacos": {fridge:"<b>Up to 2 days</b>",freezer:"Fish up to 1 month",reheat:"Warm fish briefly, assemble fresh"},
  "green-curry": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat gently"},
  "grilled-vegetables": {fridge:"<b>Up to 3 days</b>",freezer:"Not recommended",reheat:"Eat cold or warm in oven briefly"},
  "guchos-piri-piri": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently in oven"},
  "halloumi-feta-salad": {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Serve cold or warm cheese briefly"},
  "hangi-feast": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat in oven at 350°F covered"},
  "harissa-lamb": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently in oven"},
  "injera-base": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently before serving"},
  "jollof-rice": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat with splash of water"},
  "kingklip-curry": window.STORAGE_DEFAULTS?.main_fish || {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm very gently"},
  "lamb-stew": {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat on stovetop"},
  "linguine-clams": window.STORAGE_DEFAULTS?.main_pasta || {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Reheat gently with pasta water"},
  "miso-cod": {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm very gently"},
  "moussaka": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat in oven at 350°F"},
  "nachos-pulled-pork": {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm pork, assemble fresh"},
  "nihari": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat on stovetop"},
  "pan-seared-mushrooms": {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Reheat quickly in hot pan"},
  "pho-beef": {fridge:"<b>Broth up to 4 days</b>, noodles up to 2 days",freezer:"<b>Broth up to 3 months</b>",reheat:"Reheat broth, assemble fresh"},
  "pilaf-persian": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat with splash of water"},
  "roasted-chicken": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm at 350°F for 15-20 min"},
  "saag-paneer": window.STORAGE_DEFAULTS?.main_curry || {fridge:"<b>Up to 4 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat gently"},
  "satay-chicken": {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm chicken and sauce gently"},
  "seafood-paella": {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Warm very gently in pan"},
  "shakshuka": {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat sauce gently, add fresh eggs"},
  "singapore-mei-fun": {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Reheat in wok quickly"},
  "sosaties": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently in oven"},
  "spaghetti-bolognese": window.STORAGE_DEFAULTS?.main_pasta || {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 3 months</b>",reheat:"Reheat sauce and pasta separately"},
  "tandoori-chicken": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm gently in oven"},
  "thai-salad": {fridge:"<b>Up to 1 day</b>",freezer:"Not recommended",reheat:"Best fresh, do not reheat"},
  "tom-yum-soup": {fridge:"<b>Up to 3 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Reheat on stovetop"},
  "trifle": {fridge:"<b>Up to 2 days</b>",freezer:"Not recommended",reheat:"Serve chilled"},
  "turkish-kebab": {fridge:"<b>Up to 2 days</b>",freezer:"<b>Up to 1 month</b>",reheat:"Warm meat gently"},
  "vietnamese-pate": {fridge:"<b>Up to 5 days</b>",freezer:"Not recommended",reheat:"Serve chilled or at room temp"},

  // GENERAL TEMPLATE (apply to recipes without specific guidelines)
  "_template": {
    fridge: "[Specify duration and conditions]",
    freezer: "[Specify duration or 'Not recommended']",
    reheat: "[Specify method, temperature/time, and critical warnings]"
  }
  };
  // Gap-fill: preserve existing rich entries from storage.js, add only missing keys.
  for (var k in gaps) { if (!existing[k]) existing[k] = gaps[k]; }
  return existing;
})(window.RECIPE_STORAGE || {});

// Category-based defaults (when recipe-specific not available)
// Used by the rendering function as fallback
window.STORAGE_DEFAULTS = {
  "main_meat": {
    fridge: "<b>Up to 3 days</b> in an airtight container.",
    freezer: "<b>Up to 1 month</b> — most freeze well.",
    reheat: "Reheat gently on the stovetop over medium heat. <b>Slice first if possible.</b> Avoid microwave."
  },
  "main_fish": {
    fridge: "<b>Up to 2 days</b> in an airtight container.",
    freezer: "<b>Not recommended</b> — most delicate fish loses texture.",
    reheat: "Eat cold, or warm very briefly (30 seconds per side). Best served at room temperature with a warm sauce."
  },
  "main_curry": {
    fridge: "<b>Up to 4 days</b> — flavors improve overnight.",
    freezer: "<b>Up to 3 months</b> — curries freeze excellently.",
    reheat: "Reheat on stovetop over medium heat or microwave at 50% power. Curries are forgiving."
  },
  "main_pasta": {
    fridge: "<b>Up to 2 days</b> in an airtight container.",
    freezer: "Not recommended unless the sauce is very thick.",
    reheat: "Reheat gently with pasta water to restore sauce consistency. <b>Avoid microwave for creamy sauces.</b>"
  },
  "sweet": {
    fridge: "See specific recipe notes.",
    freezer: "See specific recipe notes.",
    reheat: "Most desserts are best fresh. Check specific recipe."
  },
  "side": {
    fridge: "<b>Up to 3 days</b> in an airtight container.",
    freezer: "<b>Up to 1 month</b> for most sides.",
    reheat: "Reheat in oven at 350°F (175°C) for 10-15 minutes, or microwave at 50% power."
  }
};
