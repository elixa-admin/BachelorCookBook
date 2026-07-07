/* SA Drinks Atlas — taste-profile relation for South African drink pairings.
   The queryable implementation of knowledge/SA_DRINKS_PAIRING_GUIDE.md.

   Works for ANY dish: existing recipes, future recipes, or dishes not in the
   database. Identify the dish's taste profile and saDrinkPair() returns
   SA-sourced drink recommendations with reasoning.

   Usage:
     saDrinkPair(recipeObject)              // auto-profile from recipe data
     saDrinkPair({ t:"Green Papaya Salad",  // manual profile for any dish
       _profile:{protein:"vegetable",spice:"hot",method:"raw",course:"starter"}})

   If a recipe already has explicit pair data, that takes precedence — the
   atlas is the fallback and the authoring reference for new recipes. */
(function(){
window.SA_DRINKS_ATLAS = {
  version: "1.0",
  updated: "2026-07-07",

  /* The canonical SA drinks catalogue. Each entry: [name, region, descriptor]. */
  catalogue: {
    white: {
      sauvignon_blanc:   ["Sauvignon Blanc", "Elgin or Stellenbosch", "Crisp, zesty citrus and mineral"],
      chenin_unwooded:   ["Unwooded Chenin Blanc", "Stellenbosch", "Dry, apple-pear, honeyed florality"],
      chenin_wooded:     ["Wooded Chenin Blanc", "Stellenbosch", "Oak spice, baked apple, richer body"],
      chardonnay:        ["Chardonnay", "Hemel-en-Aarde or Robertson", "Citrus, oak, butter, stone fruit"],
      riesling_offdry:   ["Off-dry Riesling", "Elgin or Darling", "Lime, floral, gentle sweetness"],
      late_harvest:      ["Noble Late Harvest", "Constantia or Nederburg", "Honey, apricot, botrytis richness"]
    },
    red: {
      pinotage:          ["Pinotage", "Stellenbosch (Kanonkop benchmark)", "Dark berry, tobacco, earthy grip"],
      cabernet:          ["Cabernet Sauvignon", "Stellenbosch or Paarl", "Blackcurrant, cedar, firm tannin"],
      shiraz:            ["Shiraz", "Stellenbosch or Swartland", "Black pepper, dark fruit, smoke"],
      pinot_noir:        ["Pinot Noir", "Hemel-en-Aarde", "Red cherry, earth, silky tannin"],
      merlot:            ["Merlot", "Stellenbosch", "Plum, soft tannin, easy drinking"]
    },
    sparkling: {
      mcc:               ["Méthode Cap Classique (MCC)", "Robertson or Stellenbosch", "Brioche, citrus, fine bubbles"],
      pinotage_rose:     ["Pinotage Rosé", "Stellenbosch", "Strawberry, cranberry, crisp dry"],
      cinsault_rose:     ["Cinsault Rosé", "Swartland", "Red apple, floral, delicate"]
    },
    beer: {
      castle:            ["Castle Lager", "South Africa", "Crisp, clean, biscuity"],
      windhoek:          ["Windhoek Lager", "Namibia / SA", "Pure-malt, clean, fuller body"],
      craft_ipa:         ["SA Craft IPA", "Western Cape", "Hoppy, bitter, citrus"],
      craft_stout:       ["SA Craft Stout", "Western Cape", "Dark, roasty, coffee, chocolate"],
      amber_ale:         ["Amber Ale (Jack Black Lumberjack)", "Western Cape", "Caramel, malt, balanced"]
    },
    spirit: {
      brandy:            ["KWV or Van Ryn's Brandy", "Western Cape", "Oak, dried fruit, warmth"],
      amarula:           ["Amarula", "South Africa", "Marula cream, caramel, toffee"],
      cape_gin:          ["Cape Fynbos Gin (Inverroche)", "Still Bay", "Fynbos botanicals, juniper, aromatic"]
    },
    non: {
      rooibos_plain:     ["Rooibos tea", "Cederberg, SA", "Earthy, honeyed, caffeine-free"],
      rooibos_spiced:    ["Spiced rooibos iced tea", "South Africa", "Warm spice, cinnamon, clove"],
      rooibos_vanilla:   ["Vanilla rooibos iced tea", "South Africa", "Soft vanilla, honeyed, smooth"],
      ginger_beer:       ["Ginger beer (Stoney or Craftsman)", "South Africa", "Spicy, sweet, fiery fizz"],
      appletiser:        ["Appletiser", "Western Cape", "Sparkling apple, clean, gently sweet"],
      grape_red:         ["Red grape juice", "South Africa", "Sweet, fruity, full-bodied"],
      grape_white:       ["White grape juice", "South Africa", "Sweet, crisp, light"],
      sparkling_water:   ["Sparkling water with citrus", "—", "Clean, neutral, effervescent"]
    }
  },

  /* Taste-profile → drink recommendation rules.
     Each rule: { when: {axis:value,...}, rec: [category, key, whyTemplate] }
     The matcher checks all axes in 'when'; value may be array (any-of). */
  rules: [
    /* === RED MEAT === */
    { when:{protein:"beef",method:"grilled-braaied",richness:"rich"}, rec:[
      ["Wine","cabernet","The firm tannin and cassis depth of Stellenbosch Cabernet stand up to charred, dry-aged beef — tannin binds the protein, fruit echoes the caramelised crust."],
      ["Wine","pinotage","Pinotage's tobacco-and-earth grip is the SA answer to braaied beef — born for the coals."],
      ["Beer","craft_stout","A roasty stout wraps charred beef in dark malt and coffee, a hearty braai-side match."]
    ]},
    { when:{protein:"beef",method:"roasted"}, rec:[
      ["Wine","cabernet","Cabernet's structure and cedar grip frame a carved prime rib — tannin cuts the fat, dark fruit matches the maillard crust."],
      ["Wine","shiraz","Peppery Shiraz echoes the beef's depth and stands up to any jus or glaze."],
      ["Beer","amber_ale","Caramel-malt amber ale mirrors the roast's browned edges and sticky jus."]
    ]},
    { when:{protein:"beef",method:"braised-stewed"}, rec:[
      ["Wine","shiraz","Shiraz's pepper and dark fruit sink into a slow-braised beef stew — the wine's weight matches the rich, reduced sauce."],
      ["Wine","pinotage","Pinotage's earthy depth and smoky edge suit oxtail and short-rib braises."],
      ["Spirit","brandy","A small KWV brandy alongside — its dried-fruit warmth echoes the braising liquid."]
    ]},
    /* === LAMB === */
    { when:{protein:"lamb",method:"grilled-braaied"}, rec:[
      ["Wine","shiraz","Shiraz and braaied lamb is the canonical match — the pepper in the wine echoes the char, the fruit matches the meat's sweetness."],
      ["Wine","cabernet","Cabernet's firm tannin cuts lamb's fat; blackcurrant plays against the gaminess."]
    ]},
    { when:{protein:"lamb",method:"braised-stewed",spice:"mild"}, rec:[
      ["Wine","shiraz","Spiced lamb braises love Shiraz — the wine's pepper and smoke echo the cinnamon, clove and cardamom in the pot."],
      ["Wine","pinotage","Pinotage's earthy, smoky depth suits long-cooked Karoo lamb."]
    ]},
    { when:{protein:"lamb",method:"roasted"}, rec:[
      ["Wine","cabernet","Roast lamb and Cabernet is the Sunday-classic — tannin cuts the fat, fruit matches the maillard crust."],
      ["Wine","pinot_noir","For a gentler lamb roast (rack, leg), Pinot Noir's silk and cherry let the meat lead."]
    ]},
    /* === PORK === */
    { when:{protein:"pork",richness:"rich",method:"grilled-braaied"}, rec:[
      ["Wine","chenin_wooded","Wooded Chenin's oak spice and baked-apple richness match pork's sweetness and stand up to char."],
      ["Beer","amber_ale","Caramel-malt amber ale mirrors sticky grilled pork and glazed edges."]
    ]},
    { when:{protein:"pork",richness:"lean"}, rec:[
      ["Wine","chenin_unwooded","Unwooded Chenin's crisp apple-pear freshness complements lean pork without weighing it down."],
      ["Beer","castle","A clean Castle Lager refreshes alongside pork, cutting any fattiness."]
    ]},
    /* === CHICKEN === */
    { when:{protein:"chicken",richness:"rich",sauce:"cream"}, rec:[
      ["Wine","chardonnay","Oaked Chardonnay's butter and citrus are the classic partner to creamy chicken — weight matches weight."],
      ["Wine","chenin_wooded","Wooded Chenin adds oak-spice depth to a rich, saucy chicken dish."]
    ]},
    { when:{protein:"chicken",richness:"lean"}, rec:[
      ["Wine","chenin_unwooded","Crisp Chenin Blanc complements lean, simply-cooked chicken — apple freshness, no heaviness."],
      ["Wine","sauvignon_blanc","Sauvignon Blanc's zesty acidity lifts grilled or roasted chicken."]
    ]},
    /* === CURRY / SPICE (cross-protein) === */
    { when:{spice:"hot"}, rec:[
      ["Wine","riesling_offdry","Off-dry Riesling's lime and gentle sweetness tame chilli heat — sugar quenches fire, acid cuts fat."],
      ["Wine","chenin_unwooded","Off-dry Chenin's fruity softness cools a hot curry without fighting the spice."],
      ["Beer","castle","An ice-cold lager is the curry-house classic — crisp carbonation cleanses the palate between bites."],
      ["Non","ginger_beer","Spicy-sweet ginger beer echoes curry's warmth and fizz, cooling the heat with each sip."]
    ]},
    { when:{spice:"medium",sauce:"curry"}, rec:[
      ["Wine","chenin_wooded","Wooded Chenin's spice and richness match a medium Cape Malay curry — weight to weight, spice to spice."],
      ["Wine","shiraz","For lamb-based medium curries, peppery Shiraz echoes the spice blend."],
      ["Beer","windhoek","A fuller Windhoek lager stands up to medium curry with clean malt."]
    ]},
    /* === FISH & SHELLFISH === */
    { when:{protein:"fish-shellfish",richness:"lean",method:"grilled-braaied"}, rec:[
      ["Wine","sauvignon_blanc","Sauvignon Blanc's zesty lime and sea-spray minerality is electric against grilled fish — acid cuts oil, fruit lifts char."],
      ["Wine","cinsault_rose","A dry Cinsault rosé's red-apple freshness suits grilled fish without overpowering it."]
    ]},
    { when:{protein:"fish-shellfish",method:"fried"}, rec:[
      ["Wine","mcc","MCC's fine bubbles and crisp citrus cut through fried batter — effervescence cleanses the fat."],
      ["Beer","castle","An ice-cold lager is the fish-and-chips classic — carbonation scrubs fried oil clean."]
    ]},
    { when:{protein:"fish-shellfish",sauce:"cream"}, rec:[
      ["Wine","chardonnay","Chardonnay's butter and citrus echo a creamy fish sauce — weight matches weight."],
      ["Wine","sauvignon_blanc","Sauvignon's bright acid cuts through cream and lifts the fish."]
    ]},
    /* === GAME === */
    { when:{protein:"game",method:"roasted"}, rec:[
      ["Wine","pinot_noir","Pinot Noir's earth, cherry and silk are the classic game match — elegance to elegance."],
      ["Wine","shiraz","For richer game (venison), peppery Shiraz stands up to the depth."]
    ]},
    /* === VEGETABLE / VEGETARIAN === */
    { when:{protein:"vegetable",method:"grilled-braaied"}, rec:[
      ["Wine","cinsault_rose","A dry rosé's freshness suits charred vegetables without dominating them."],
      ["Wine","sauvignon_blanc","Sauvignon's herbal edge echoes grilled vegetables' green, smoky notes."]
    ]},
    { when:{protein:"vegetable",sauce:"cream"}, rec:[
      ["Wine","chardonnay","Chardonnay's weight matches creamy vegetable dishes like a gratin."],
      ["Non","appletiser","Sparkling apple offers a clean, fruity counterpoint to rich vegetable bakes."]
    ]},
    /* === DESSERT / SWEET === */
    { when:{course:"dessert",sauce:"sweet"}, rec:[
      ["Wine","late_harvest","Noble Late Harvest's honeyed botrytis richness is the classic dessert wine — sweeter than the dish, the rule."],
      ["Wine","mcc","MCC's fine bubbles and toasty brioche lift a dessert without cloying."],
      ["Spirit","amarula","Amarula's marula-cream caramel folds into chocolate, malva pudding or cheesecake — glass and dessert in conversation."],
      ["Non","rooibos_vanilla","Vanilla rooibos's soft sweetness and warmth complement dessert without alcohol."]
    ]},
    /* === BREAD / SIDE === */
    { when:{course:"bread-side"}, rec:[
      ["Beer","castle","A clean lager is the universal braai-side companion to bread and carbs."],
      ["Wine","chenin_unwooded","Crisp Chenin refreshes alongside bread without competing."],
      ["Non","rooibos_plain","Earthy rooibos is the caffeine-free companion to any bread or side."]
    ]}
  ],

  /* Fallback by course if no rule matches. */
  fallback: {
    main:    [["Wine","shiraz","Stellenbosch Shiraz's pepper and dark fruit suit most hearty mains."],["Beer","castle","A clean Castle Lager refreshes alongside any main."],["Non","ginger_beer","Spicy ginger beer is the lively alcohol-free choice."]],
    starter: [["Wine","mcc","MCC's crisp bubbles and citrus open a meal with elegance."],["Non","appletiser","Sparkling apple is a bright, alcohol-free opener."]],
    dessert: [["Wine","late_harvest","Noble Late Harvest's honeyed richness is the dessert classic."],["Spirit","amarula","Amarula's marula cream complements most desserts."],["Non","rooibos_vanilla","Vanilla rooibos's warmth suits sweet endings."]],
    condiment: [["Beer","castle","A clean lager refreshes alongside any condiment-led plate."],["Non","ginger_beer","Spicy ginger beer echoes a relish or pickle's bite."]],
    "bread-side": [["Beer","castle","A clean lager is the universal braai-side companion."],["Non","rooibos_plain","Earthy rooibos pairs with any bread."]]
  },

  /* Always-include non-alcoholic option. */
  nonAlcoholicDefault: ["Non","rooibos_plain","Earthy rooibos tea — caffeine-free, pairs with everything."],

  /* === PROFILE INFERENCE ===
     Derive a taste profile from a recipe object when _profile isn't given. */
  inferProfile: function(r){
    if(r._profile) return Object.assign({}, r._profile);
    var p = {};
    var t = (r.t||"").toLowerCase(), cui = (r.cui||"").toLowerCase(), method = (r.method||"").toLowerCase();
    var blurb = ((r.blurb||"")+" "+(r.prov&&r.prov.consists_of||"")).toLowerCase();
    // protein
    if(/beef|steak|brisket|short rib|oxtail|mince/.test(t+" "+blurb)) p.protein="beef";
    else if(/lamb|mutton/.test(t+" "+blurb)) p.protein="lamb";
    else if(/pork|belly|bacon|wors|boerewors|chorizo/.test(t+" "+blurb)) p.protein="pork";
    else if(/chicken| poultry/.test(t+" "+blurb)) p.protein="chicken";
    else if(/fish|salmon|prawn|shrimp|crayfish|mussel|oyster|calamari|sardine|hake|kingklip|snoek/.test(t+" "+blurb)) p.protein="fish-shellfish";
    else if(/duck|venison|game|ostrich/.test(t+" "+blurb)) p.protein="game";
    else p.protein="vegetable";
    // richness
    if(/butter|cream|cheese|fatty|rich|confit|braise|stew/.test(blurb)) p.richness="rich";
    else if(/lean|light|fresh/.test(blurb)) p.richness="lean";
    else p.richness="rich";
    // spice
    if(/vindaloo|phall|hot|fiery|scotch bon|ghost/.test(blurb)) p.spice="hot";
    else if(/curry|chilli|spic|peri-peri|masala|berbere|harissa/.test(blurb+cui)) p.spice="medium";
    else if(/pepper|paprika|cumin/.test(blurb)) p.spice="mild";
    else p.spice="none";
    // method
    if(/braai|grill|char|bbq/.test(method+blurb)) p.method="grilled-braaied";
    else if(/roast|oven|bake/.test(method+blurb)) p.method="roasted";
    else if(/braise|stew|simmer|slow/.test(method+blurb)) p.method="braised-stewed";
    else if(/fry|crisp/.test(method+blurb)) p.method="fried";
    else if(/raw|carpaccio|tartare|ceviche|sashimi/.test(method+blurb)) p.method="raw";
    else p.method="steamed";
    // sauce
    if(/cream|bechamel/.test(blurb)) p.sauce="cream";
    else if(/curry|masala/.test(blurb+cui)) p.sauce="curry";
    else if(/tomato/.test(blurb)) p.sauce="tomato";
    else if(/citrus|lemon|orange/.test(blurb)) p.sauce="citrus";
    else if(/jus|gravy|pan sauce|red wine/.test(blurb)) p.sauce="pan-jus";
    else if(/sweet|sugar|caramel|chocolate|honey/.test(blurb)) p.sauce="sweet";
    else p.sauce="none";
    // course
    if(/dessert|pudding|tart|cake|cheesecake|sweet/.test(t+cui)) p.course="dessert";
    else if(/bread|roti|naan|pap|rice|yellow rice/.test(t)) p.course="bread-side";
    else if(/relish|chutney|sambal|atchar|chakalaka|sauce/.test(t)) p.course="condiment";
    else p.course="main";
    return p;
  },

  /* Resolve a [categoryLabel, drinkKey] pair into [name, region, descriptor]
     by searching all style subcategories in the catalogue. The categoryLabel
     (e.g. "Wine","Beer") is display-only; drinkKey (e.g. "cabernet") is the
     catalogue key found under a style (e.g. catalogue.red.cabernet). */
  resolve: function(drinkKey){
    var self = window.SA_DRINKS_ATLAS;
    for(var style in self.catalogue){
      if(self.catalogue[style][drinkKey]) return self.catalogue[style][drinkKey];
    }
    return null;
  },

  /* Category label for display: "Wine","Beer","Spirit","Non-alcoholic". */
  categoryLabel: function(displayLabel){
    return displayLabel === "non" ? "Non-alcoholic"
      : (displayLabel.charAt(0).toUpperCase()+displayLabel.slice(1));
  },

  /* === MATCHER ===
     Returns [[category, drinkName, region, why], ...] for any dish. */
  matchRules: function(profile){
    var self = window.SA_DRINKS_ATLAS;
    var matches = [];
    for(var i=0;i<self.rules.length;i++){
      var rule = self.rules[i];
      var ok = true;
      for(var axis in rule.when){
        var want = rule.when[axis];
        var vals = Array.isArray(want)?want:[want];
        if(vals.indexOf(profile[axis])===-1){ ok=false; break; }
      }
      if(ok){
        rule.rec.forEach(function(r){
          var entry = self.resolve(r[1]);
          if(entry) matches.push([self.categoryLabel(r[0]), entry[0], "South Africa · "+entry[1], r[2]]);
        });
        if(matches.length>=3) break; // enough recommendations
      }
    }
    if(matches.length===0){
      var fb = self.fallback[profile.course]||self.fallback.main;
      fb.forEach(function(r){
        var entry = self.resolve(r[1]);
        if(entry) matches.push([self.categoryLabel(r[0]), entry[0], "South Africa · "+entry[1], r[2]]);
      });
    }
    // ensure a non-alcoholic option is always present
    var hasNon = matches.some(function(m){ return /non/i.test(m[0]); });
    if(!hasNon){
      var nd = self.catalogue.non.rooibos_plain;
      matches.push([self.nonAlcoholicDefault[0], nd[0], "South Africa · "+nd[1], self.nonAlcoholicDefault[2]]);
    }
    // dedupe by drink name, cap at 4
    var seen = {}; var out = [];
    matches.forEach(function(m){ if(!seen[m[1]]){ seen[m[1]]=true; out.push(m); } });
    return out.slice(0,4);
  },

  /* === PUBLIC API === */
  saDrinkPair: function(dish){
    var profile = window.SA_DRINKS_ATLAS.inferProfile(dish);
    return window.SA_DRINKS_ATLAS.matchRules(profile);
  },

  /* Expose for debugging / authoring new recipes. */
  describeProfile: function(dish){
    var p = window.SA_DRINKS_ATLAS.inferProfile(dish);
    return Object.keys(p).map(function(k){ return k+": "+p[k]; }).join(", ");
  }
};
window.saDrinkPair = window.SA_DRINKS_ATLAS.saDrinkPair;
})();
