/* EQUIPMENT / UTENSIL GATHER LAYER — "Before you start" gear
   Turns the equipment need into a "gather" block in the detail view — the real
   gear each dish requires, plus a utensil glossary for bachelors who need to
   know what a "Dutch oven" or "microplane" actually is.
   - EQUIPMENT          : per-slug explicit gear lists (what + why)
   - UTENSIL_GLOSSARY   : ~24 common tools explained in plain English
   - deriveEquipment(r) : heuristic fallback for any slug not in EQUIPMENT
   SA-localized copy: °C / cm / min / braai. No cups / oz / °F. */
(function(){
window.EQUIPMENT={
  /* — SIGNATURE (23 dishes) — */
  'bunny-chow':{
    gather:[
      {item:'Large heavy-based pot or Dutch oven',why:'Holds heat steady for a slow, even curry simmer'},
      {item:'Sharp knife & cutting board',why:'For prepping onions, tomatoes and the aromatics'},
      {item:'Strong bread knife',why:'To hollow out the loaf without tearing'},
      {item:'Slotted spoon',why:'Lifts meat chunks without splashing the gravy'}
    ]
  },
  'durban-mutton-curry':{
    gather:[
      {item:'Heavy-bottomed pot or Dutch oven',why:'Distributes heat evenly — no scorching spots during the long simmer'},
      {item:'Sharp knife & cutting board',why:'Prepping mutton, onions and the curry base'},
      {item:'Wooden spoon',why:'Stir without scratching the pot'},
      {item:'Ladle',why:'Serving the curry gravy over rice'}
    ]
  },
  'boerewors':{
    gather:[
      {item:'Braai grid or tongs',why:'Turn the wors without piercing it'},
      {item:'Sharp knife',why:'Snip the wors rope into portions'},
      {item:'Cutting board',why:'Resting surface after the braai'},
      {item:'Meat thermometer (optional)',why:'Check doneness without cutting — 71 °C internal'}
    ],
    altAppliance:'stovetop'
  },
  'shisa-nyama':{
    gather:[
      {item:'Braai grid or tongs',why:'Handle mixed meats over hot coals'},
      {item:'Sharp knife & cutting board',why:'Prep the marinades and portion meats'},
      {item:'Brush or mop',why:'Baste meats with marinade as they grill'},
      {item:'Serving platter',why:'The communal spread — pap, chakalaka and grilled meat together'}
    ]
  },
  'sosaties':{
    gather:[
      {item:'Flat or skewered metal skewers (bamboo soaked)',why:'Holds the meat-and-apricot stack together'},
      {item:'Braai grid or tongs',why:'Turn skewers without losing the fruit'},
      {item:'Small saucepan',why:'Heat the basting marinade'},
      {item:'Brush',why:'Glaze the skewers as they cook'}
    ],
    altAppliance:'oven'
  },
  'breyani':{
    gather:[
      {item:'Heavy pot with tight-fitting lid',why:'Steam-trapping — the dum cooking method'},
      {item:'Large bowl for marinating',why:'Space to coat meat in the yoghurt-spice blend'},
      {item:'Colander or sieve',why:'Rinse and drain the basmati rice'},
      {item:'Wide serving platter',why:'Spreads the layered rice and meat for the table'}
    ]
  },
  'pickled-fish':{
    gather:[
      {item:'Wide shallow pan or skillet',why:'Even frying of the fish pieces'},
      {item:'Slotted spoon or fish slice',why:'Lift fish gently without breaking'},
      {item:'Glass or ceramic dish with lid',why:'Non-reactive vessel for pickling'},
      {item:'Measuring jug',why:'Pour the cooled pickling liquid evenly'}
    ]
  },
  'pap':{
    gather:[
      {item:'Heavy-based pot',why:'Prevents scorching during the long stir'},
      {item:' Wooden spoon or spurtle',why:'The traditional stir — no lumps'},
      {item:'Measuring cup',why:'1:2 mealie-meal-to-water ratio, every time'},
      {item:'Ladle',why:'Serving the stiff pap smoothly'}
    ]
  },
  'roosterkoek':{
    gather:[
      {item:'Braai grid',why:'Flat breads need steady heat, no direct flame'},
      {item:'Rolling pin',why:'Even thickness for consistent cooking'},
      {item:'Pastry brush',why:'Oil the dough before braaiing'},
      {item:'Clean cloth or basket',why:'Keep the breads warm and soft at the table'}
    ]
  },
  'mealie-bread':{
    gather:[
      {item:'Loaf tins',why:'Traditional shape, even rise'},
      {item:'Grater or food processor',why:'Fresh sweetcorn kernels off the cob'},
      {item:'Mixing bowls',why:'Room for the wet batter'},
      {item:'Wire rack',why:'Cool the loaves without a soggy bottom'}
    ]
  },
  'droewors':{
    gather:[
      {item:'Mincer with sausage nozzle',why:'Form the long ropes consistently'},
      {item:'Sharp knife or kitchen scissors',why:'Portion into hanging lengths'},
      {item:'Drying hooks or S-hooks',why:'Air-circulate all around the wors'},
      {item:'Cool, dry space',why:'3–5 days of undisturbed curing'}
    ]
  },
  'peppermint-crisp-tart':{
    gather:[
      {item:'Rectangular dish (±20×30 cm)',why:'Even layers, easy serving squares'},
      {item:'Rolling pin',why:'Crush the tennis biscuits uniformly'},
      {item:'Spatula',why:'Spread the caramel and cream smoothly'},
      {item:'Grater',why:'The peppermint crisp chocolate on top'}
    ]
  },
  'umngqusho':{
    gather:[
      {item:'Large heavy pot',why:'Long simmer — samp and beans need time'},
      {item:'Colander',why:'Rinse and drain the soaked samp-and-beans'},
      {item:'Ladle',why:'Serve the soft, creamy starch'},
      {item:'Cheesecloth or muslin (optional)',why:'Tie the bay leaf and spices for easy removal'}
    ]
  },
  'putu-pap':{
    gather:[
      {item:'Heavy-based pot',why:'Scorch-free crumbly texture'},
      {item:'Fork or traditional stirrer',why:'Break up the cooked pap into crumbs'},
      {item:'Measuring cup',why:'Consistent water-to-mealie ratio'},
      {item:'Serving bowl',why:'The crumble needs tossing as you serve'}
    ]
  },
  'morogo':{
    gather:[
      {item:'Large pot',why:'Spinach wilts down — plenty of room'},
      {item:'Sharp knife & cutting board',why:'Chop the onions and tomatoes'},
      {item:'Wooden spoon',why:'Stir without bruising the greens'},
      {item:'Colander',why:'Wash the morogo thoroughly — grit hides in the leaves'}
    ]
  },
  'isidudu':{
    gather:[
      {item:'Heavy pot',why:'Slow, even simmer for the pumpkin'},
      {item:'Masher or potato masher',why:'Break the pumpkin into the porridge'},
      {item:'Wooden spoon',why:'Stir the thickening mixture'},
      {item:'Ladle',why:'Serve the warm porridge'}
    ]
  },
  'umphokoqo':{
    gather:[
      {item:'Heavy-based pot',why:'High heat first, then dry-fluff — no hotspots'},
      {item:'Wooden spoon or fork',why:'Crumble the cooked pap into dry flakes'},
      {item:'Measuring cup',why:'Water ratio matters for the crumb'},
      {item:'Serving bowl',why:'Toss the pap as you spoon it out'}
    ]
  },
  'geelrys':{
    gather:[
      {item:'Saucepan with lid',why:'Steam-absorption method'},
      {item:'Fine-mesh sieve or colander',why:'Rinse the basmati until the water runs clear'},
      {item:'Fork',why:'Fluff the cooked rice without crushing'},
      {item:'Measuring cup',why:'1:1.5 rice-to-water for fluffy turmeric rice'}
    ]
  },
  'tamatiebredie':{
    gather:[
      {item:'Heavy pot or Dutch oven',why:'Long, slow stew — no burning at the bottom'},
      {item:'Sharp knife & cutting board',why:'Prep the mutton and onions'},
      {item:'Wooden spoon',why:'Stir gently as the tomatoes break down'},
      {item:'Ladle',why:'Serve the rich gravy over rice'}
    ]
  },
  'potato-bredie':{
    gather:[
      {item:'Heavy pot or Dutch oven',why:'Even heat for the long simmer'},
      {item:'Sharp knife & cutting board',why:'Cube the potatoes and onions'},
      {item:'Wooden spoon',why:'Stir without breaking the potatoes'},
      {item:'Ladle',why:'Spoon out the tender chunks in gravy'}
    ]
  },
  'dombolo':{
    gather:[
      {item:'Large pot with tight lid',why:'Steam the dumplings — they need the trapped moisture'},
      {item:'Mixing bowls',why:'Space for the dough to rise'},
      {item:'Sharp knife',why:'Portion the dough before steaming'},
      {item:'Slotted spoon',why:'Lift the cooked dumplings out gently'}
    ]
  },
  'magwinya':{
    gather:[
      {item:'Deep heavy pot or wok',why:'Oil depth — the dough must swim'},
      {item:'Slotted spoon or spider',why:'Lift the fried vetkoek without dripping'},
      {item:'Thermometer (optional)',why:'Keep oil at 175–180 °C for crisp, not greasy'},
      {item:'Wire rack',why:'Drain the fried dough — paper towels make it soggy'}
    ]
  },
  'buttermilk-rusks':{
    gather:[
      {item:'Large baking trays',why:'Rusks need space — the overnight dry'},
      {item:'Sharp knife or dough scraper',why:'Cut the baked slab into fingers'},
      {item:'Wire racks',why:'Cool completely before the twice-bake'},
      {item:'Airtight tins',why:'Store the dried rusks crisp'}
    ]
  },
  'gatsby':{
    gather:[
      {item:'Large sharp knife',why:'Split the baguette lengthwise without squashing'},
      {item:'Frying pan or griddle',why:'Crisp the polony and chips before loading'},
      {item:'Slotted spoon',why:'Liver the chips without splashing oil'},
      {item:'Serving board or platter',why:'The gatsby is monumental — it needs its stage'}
    ]
  },
  'braaibroodjie':{
    gather:[
      {item:'Braai grid or sandwich iron',why:'Press and toast the bread over coals'},
      {item:'Sharp knife',why:'Butter the bread and slice the onion and tomato'},
      {item:'Spatula',why:'Lift the hot sandwich without losing the filling'},
      {item:'Cutting board',why:'Slice the braaibroodjie diagonally to serve'}
    ]
  },
  'frikkadels':{
    gather:[
      {item:'Baking tray',why:'Even browning in the oven — no splatter'},
      {item:'Large mixing bowl',why:'Room to blend the mince, breadcrumbs and egg'},
      {item:'Wire rack',why:'Drain the baked frikkadels — keeps them crisp'},
      {item:'Serving platter',why:'Serve with onion gravy and rice'}
    ],
    altAppliance:'stovetop'
  },
  'vetkoek-curry-mince':{
    gather:[
      {item:'Deep heavy pot or wok',why:'Oil depth — vetkoek must float'},
      {item:'Slotted spoon',why:'Lift the fried dough'},
      {item:'Frying pan',why:'Cook the curried mince filling'},
      {item:'Sharp knife',why:'Slit the vetkoek for stuffing'}
    ]
  },
  'oxtail-potjie':{
    gather:[
      {item:'Potjie or Dutch oven',why:'Slow, even heat — the meat falls from the bone'},
      {item:'Long tongs or spoon',why:'Layer ingredients without stirring'},
      {item:'Ladle',why:'Spoon out the rich gravy'},
      {item:'Fire-resistant gloves',why:'Handling the hot potjie over coals'}
    ]
  },

  /* — PREMIUM (28 dishes) — */
  'mozambican-peri-peri-chicken':{
    gather:[
      {item:'Braai grid or roasting rack',why:'Airflow — crisp skin all over'},
      {item:'Pastry brush',why:'Baste the chicken as it grills'},
      {item:'Sharp knife',why:'Spatchcock the chicken for even cooking'},
      {item:'Meat thermometer (optional)',why:'74 °C at the thickest part — juicy, safe'}
    ],
    altAppliance:'oven'
  },
  'snoek-braai-apricot-jam':{
    gather:[
      {item:'Braai grid or hinged grid',why:'Delicate fish — lift without breaking'},
      {item:'Pastry brush',why:'Baste with the apricot jam glaze'},
      {item:'Sharp knife',why:'Slash the snoek for even cooking'},
      {item:'Serving platter',why:'The fish arrives whole at the table'}
    ]
  },
  'coq-au-vin':{
    gather:[
      {item:'Dutch oven or heavy lidded pot',why:'Braise in wine — even, gentle heat'},
      {item:'Sharp knife & cutting board',why:'Prep the bacon, mushrooms and chicken'},
      {item:'Ladle',why:'Spoon the rich, glossy sauce'},
      {item:'Strainer or cheesecloth',why:'Silken the sauce before serving'}
    ],
    altAppliance:'stovetop'
  },
  'rogan-josh':{
    gather:[
      {item:'Heavy-bottomed pot',why:'Slow braise — scorch-free'},
      {item:'Sharp knife & cutting board',why:'Prep the lamb and aromatics'},
      {item:'Wooden spoon',why:'Stir without damaging the tender meat'},
      {item:'Measuring spoons',why:'Precise spice balance — the Kashmiri signature'}
    ]
  },
  'lamb-shank-red-wine':{
    gather:[
      {item:'Dutch oven or heavy lidded pot',why:'Long oven braise — no evaporation, no scorch'},
      {item:'Sharp knife',why:'Trim the shanks and prep veg'},
      {item:'Ladle',why:'Spoon the melting meat and sauce'},
      {item:'Tongs',why:'Turn the shanks without piercing'}
    ]
  },
  'french-onion-soup':{
    gather:[
      {item:'Heavy pot or Dutch oven',why:'Slow caramelise — the onions need time and even heat'},
      {item:'Sharp knife & cutting board',why:'Thin, even onion slices'},
      {item:'Wooden spoon',why:'Scrape the fond as the onions brown'},
      {item:'Ovenproof soup crocks or ramekins',why:'The Gruyère crouton melts and browns under the grill'}
    ]
  },
  'steak-frites-cafe-de-paris':{
    gather:[
      {item:'Heavy-based frying pan or cast-iron skillet',why:'Holds screaming heat for a deep crust'},
      {item:'Tongs',why:'Turn the steak without piercing it'},
      {item:'Soup spoon, for basting',why:'Spoon foaming butter over the meat'},
      {item:'Sharp knife',why:'Rest the steak on a board, then carve'}
    ]
  },
  'bouillabaisse':{
    gather:[
      {item:'Large wide pot or fish kettle',why:'Simmer the fish stock without crowding'},
      {item:'Slotted spoon or fish slice',why:'Lift the fish pieces gently'},
      {item:'Strainer or cheesecloth',why:'Clarify the stock before serving'},
      {item:'Soup plates',why:'Wide, shallow bowls for the fish and broth'}
    ]
  },
  'duck-a-l-orange':{
    gather:[
      {item:'Roasting tin with rack',why:'Render the fat evenly as the duck roasts'},
      {item:'Sharp knife & cutting board',why:'Score the duck skin and prep the fruit'},
      {item:'Baster or spoon',why:'Glaze the duck as it roasts'},
      {item:'Carving fork',why:'Hold the duck steady for precise serving'}
    ]
  },
  'beef-wellington':{
    gather:[
      {item:'Baking tray',why:'Crisp the pastry bottom evenly'},
      {item:'Sharp knife & cutting board',why:'Trim the beef and spread the duxelles'},
      {item:'Pastry brush',why:'Seal the parcel with egg wash'},
      {item:'Meat thermometer',why:'55 °C internal — medium-rare, perfect'}
    ]
  },
  'braai-lamb-chops-chimichurri':{
    gather:[
      {item:'Braai grid or ridged grill pan',why:'Char the chops without sticking'},
      {item:'Tongs',why:'Turn the chops without piercing the juice'},
      {item:'Sharp knife',why:'Trim excess fat and rest the meat'},
      {item:'Blender or stick blender',why:'Purée the chimichurri smooth'}
    ],
    altAppliance:'stovetop'
  },
  'roast-leg-lamb-rosemary-garlic':{
    gather:[
      {item:'Roasting tin',why:'Catches the juices for gravy'},
      {item:'Sharp knife',why:'Score the fat and insert the garlic slivers'},
      {item:'Meat thermometer',why:'60–65 °C for medium-rare to medium'},
      {item:'Carving fork',why:'Hold the leg steady as you slice'}
    ]
  },
  'pappardelle-venison-wild-mushroom-ragu':{
    gather:[
      {item:'Heavy pot or Dutch oven',why:'Slow braise — venison needs time to tenderise'},
      {item:'Sharp knife & cutting board',why:'Prep the mushrooms and venison'},
      {item:'Wooden spoon',why:'Stir the ragù gently as it thickens'},
      {item:'Tongs',why:'Coat the pappardelle evenly in sauce'}
    ]
  },
  'arroz-negro-black-paella':{
    gather:[
      {item:'Paella pan or wide shallow skillet',why:'The socarrat — crisp rice at the bottom'},
      {item:'Sharp knife & cutting board',why:'Prep the squid and aromatics'},
      {item:'Wooden spoon',why:'Distribute the rice evenly'},
      {item:'Serving platter',why:'Paella arrives whole at the table'}
    ]
  },
  'red-wine-braised-short-rib':{
    gather:[
      {item:'Dutch oven or heavy lidded pot',why:'Long oven braise — meltingly tender'},
      {item:'Sharp knife',why:'Trim the ribs and prep the veg'},
      {item:'Ladle',why:'Spoon the glossy, reduced sauce'},
      {item:'Tongs',why:'Turn the ribs as they sear'}
    ]
  },
  'oysters-mignonette':{
    gather:[
      {item:'Oyster knife',why:'The short, strong blade pops the hinge'},
      {item:'Thick cloth or glove',why:'Hold the oyster safely as you shuck'},
      {item:'Small bowl',why:'Mix the shallot and vinegar for the mignonette'},
      {item:'Oyster plates or bed of ice',why:'Serve immediately — oysters wait for no one'}
    ]
  },
  'steak-tartare':{
    gather:[
      {item:'Very sharp knife',why:'Mince the beef finely — texture is everything'},
      {item:'Cutting board',why:'Clean surface for raw meat prep'},
      {item:'Small mixing bowls',why:'Separate yolks and mix the garnishes'},
      {item:'Ring mould or cookie cutter',why:'Shape the tartare for serving'}
    ]
  },
  'whole-roast-sea-bass':{
    gather:[
      {item:'Roasting tray',why:'Holds the fish and veg together'},
      {item:'Sharp knife or scissors',why:'Scale and score the fish'},
      {item:'Pastry brush',why:'Oil the fish for crisp skin'},
      {item:'Serving platter',why:'The whole fish arrives with ceremony'}
    ]
  },
  'linguine-vongole-clams':{
    gather:[
      {item:'Large wide lidded pan',why:'Steam the clams open, then toss the pasta'},
      {item:'Tongs',why:'Lift clams as they open and coat the linguine'},
      {item:'Slotted spoon',why:'Lift clams without the grit'},
      {item:'Large serving bowls',why:'The clams arrive in their shells'}
    ]
  },
  'cape-malay-apricot-chicken':{
    gather:[
      {item:'Heavy-bottomed pot',why:'Slow braise — the apricots melt into the sauce'},
      {item:'Sharp knife & cutting board',why:'Prep the chicken and fruit'},
      {item:'Wooden spoon',why:'Stir gently as the apricots break down'},
      {item:'Ladle',why:'Serve the sweet-savoury curry'}
    ]
  },
  'mozambican-prawns':{
    gather:[
      {item:'Frying pan or griddle',why:'High heat, quick sear'},
      {item:'Tongs',why:'Turn the prawns without breaking the shells'},
      {item:'Pastry brush',why:'Coat the prawns in peri-peri butter'},
      {item:'Serving platter',why:'The prawns arrive sizzling'}
    ],
    altAppliance:'grill'
  },
  'chicken-liver-parfait':{
    gather:[
      {item:'Blender or stick blender',why:'Silken smooth purée'},
      {item:'Fine-mesh sieve',why:'Strain the livers for absolute silk'},
      {item:'Terrine or loaf tins',why:'Shape the parfait for the set'},
      {item:'Water bath tray',why:'Gentle, even cooking in the oven'}
    ]
  },
  'pampoenkoekies':{
    gather:[
      {item:'Heavy-based frying pan',why:'Even browning, gentle heat'},
      {item:'Slotted spoon or fish slice',why:'Turn the fritters without breaking'},
      {item:'Wire rack',why:'Drain briefly — keeps them crisp'},
      {item:'Serving platter',why:'Serve warm with cinnamon sugar'}
    ]
  },
  'dom-pedro':{
    gather:[
      {item:'Blender',why:'The froth is part of the charm'},
      {item:'Ice cream scoop',why:'Generous domes of vanilla'},
      {item:'Grater',why:'Fresh chocolate or nutmeg on top'},
      {item:'Tall glasses',why:'Room for the stir'}
    ]
  },
  'potjiekos':{
    gather:[
      {item:'Potjie or Dutch oven',why:'Layered steam — the South African way'},
      {item:'Long tongs or spoon',why:'Layer, never stir'},
      {item:'Ladle',why:'Spoon the layered stew'},
      {item:'Fire-resistant gloves',why:'Hot potjie handling'}
    ],
    altAppliance:'oven'
  },
  'lamb-kleftiko':{
    gather:[
      {item:'Roasting tin or deep baking dish',why:'The parcel steams in its own juices'},
      {item:'Sharp knife',why:'Score the lamb and prep the veg'},
      {item:'Kitchen string or foil',why:'Seal the parcel tight'},
      {item:'Serving platter',why:'Open the parcel at the table for drama'}
    ],
    altAppliance:'pressure'
  },
  'waterblommetjie-bredie':{
    gather:[
      {item:'Heavy pot or Dutch oven',why:'Slow simmer — the flowers melt in'},
      {item:'Sharp knife & cutting board',why:'Prep the lamb and onions'},
      {item:'Wooden spoon',why:'Stir gently as the blossoms dissolve'},
      {item:'Ladle',why:'Serve the earthy, floral stew'}
    ]
  },
  'denningvleis':{
    gather:[
      {item:'Heavy-bottomed pot',why:'Slow, even simmer'},
      {item:'Sharp knife & cutting board',why:'Prep the mutton and spices'},
      {item:'Wooden spoon',why:'Stir as the sauce thickens'},
      {item:'Ladle',why:'Spoon the sweet-savoury curry over rice'}
    ]
  },
  'hertzoggies':{
    gather:[
      {item:'Muffin tin or tartlet pan',why:'Individual pastry shells'},
      {item:'Rolling pin',why:'Even pastry thickness'},
      {item:'Pastry brush',why:'Egg wash for golden shine'},
      {item:'Sharp knife',why:'Trim the excess pastry'}
    ]
  },
  'skilpadjies':{
    gather:[
      {item:'Braai grid or frying pan',why:'Crisp the caul fat without burning'},
      {item:'Tongs',why:'Turn gently — the parcels are delicate'},
      {item:'Sharp knife',why:'Trim the caul fat and portion the liver'},
      {item:'Serving platter',why:'Serve hot with maize meal porridge'}
    ],
    altAppliance:'stovetop'
  },
  'mosbolletjies':{
    gather:[
      {item:'Loaf tins',why:'Traditional sweet bread shape'},
      {item:'Rolling pin (optional)',why:'Flatten the dough for cinnamon swirls'},
      {item:'Pastry brush',why:'Glaze the baked loaves with syrup'},
      {item:'Wire rack',why:'Cool the sweet breads without a soggy bottom'}
    ]
  },
  'boeber':{
    gather:[
      {item:'Medium saucepan',why:'Gentle simmer — vermicelli softens fast'},
      {item:'Whisk or spoon',why:'Stir as the sago thickens'},
      {item:'Ladle',why:'Serve the warm, fragrant porridge'},
      {item:'Small bowls',why:'Boeber is a comfort bowl'}
    ]
  },
  'kaiings':{
    gather:[
      {item:'Heavy-bottomed pan or skillet',why:'Even rendering — no burning'},
      {item:'Slotted spoon',why:'Lift the crisped pieces'},
      {item:'Kitchen paper',why:'Drain briefly — keeps the crunch'},
      {item:'Serving bowl',why:'Serve the pork crackling while still hot'}
    ]
  },
  'amadumbe':{
    gather:[
      {item:'Heavy pot',why:'Boil without breaking the yams'},
      {item:'Sharp knife',why:'Peel and chunk the amadumbe'},
      {item:'Colander',why:'Drain the cooked yams'},
      {item:'Masher or fork',why:'Crush lightly with butter'}
    ]
  },
  'umqombothi':{
    gather:[
      {item:'Large brewing vessel or bucket',why:'Fermentation space — the brew foams'},
      {item:'Fine-mesh sieve or cheesecloth',why:'Strain the malt'},
      {item:'Ladle',why:'Stir and pour the fermenting beer'},
      {item:'Airtight bottles',why:'Secondary fermentation — the bubbles develop'}
    ]
  }
};

/* Utensil glossary — bachelards need to know what these tools actually do.
   One-line plain-English defs, practical "bachelor tip" for each. */
window.UTENSIL_GLOSSARY={
  'cast-iron pan':{
    def:'Heavy, seasoned iron skillet that holds heat and develops a non-stick patina with use.',
    tip:'Never soap it — scrub with salt and oil. Heat it gradually to avoid warping.'
  },
  'non-stick pan':{
    def:'Lightweight pan with a coating that prevents food from sticking, ideal for delicate items like eggs and fish.',
    tip:'Use wood or silicone tools only — metal scratches the coating. Low to medium heat only.'
  },
  'heavy-bottomed pot/Dutch oven':{
    def:'Thick-based vessel that distributes heat evenly and holds it steady, perfect for long braises and stews.',
    tip:'Cast iron or enamelled cast iron — either way, it\'s the workhorse for slow cooking.'
  },
  'instant-read thermometer':{
    def:'Digital probe that gives temperature in seconds, essential for checking meat doneness without cutting.',
    tip:'Insert into the thickest part — avoid bone or fat. Calibration drifts — test in boiling water yearly.'
  },
  'microplane':{
    def:'Fine-tooled grater that zests citrus and grates hard spices like nutmeg and ginger into fluffy clouds.',
    tip:'Press gently — the blades are razor-sharp. Rinse immediately after use to prevent clogging.'
  },
  'box grater':{
    def:'Four-sided grater with different hole sizes — coarse shred, fine shred, zest and slice.',
    tip:'Hold it at an angle and use the downward strokes only. The flat side is for resting.'
  },
  'fish slice/spatula':{
    def:'Thin, slotted metal or silicone tool for lifting and turning delicate foods like fish and pancakes.',
    tip:'Slide it fully under — don\'t pry. Metal gives better leverage; silicone won\'t scratch non-stick.'
  },
  'tongs':{
    def:'Scissor-like tool for gripping and turning food without piercing — essential for braai and pan work.',
    tip:'Lock them closed for storage. The scalloped edge gives better grip on slippery food.'
  },
  'whisk':{
    def:'Wire loop tool for incorporating air into liquids — emulsions, beaten eggs, smooth sauces.',
    tip:'Use a balloon whisk for maximum volume. Angle the bowl and whisk from the centre out.'
  },
  'balloon whisk':{
    def:'Large, bulbous wire whisk for maximum aeration — beating egg whites, cream, emulsions.',
    tip:'Room-temperature eggs whip better. A touch of cream of tartar stabilises egg whites.'
  },
  'rolling pin':{
    def:'Cylindrical rod for rolling dough to even thickness — essential for pastry, breads and pizza.',
    tip:'Flour lightly and often. Roll from the centre out, not back and forth, for even thickness.'
  },
  'baking tray/sheet':{
    def:'Flat metal tray with low sides, for oven-roasting, baking cookies and catching drips.',
    tip:'Heavy gauge metal prevents warping. Line with parchment for easy cleanup and even browning.'
  },
  'roasting tin':{
    def:'Deep, wide pan for oven-roasting meats and veg, catching juices for gravy.',
    tip:'Choose one with a rack — airflow crisps the skin underneath. Cast iron gives the best browning.'
  },
  'wire rack':{
    def:'Grid on legs for cooling baked goods or draining fried foods, allowing air circulation all around.',
    tip:'Never rest hot pans directly on cold surfaces — thermal shock warps them.'
  },
  'sieve/fine strainer':{
    def:'Mesh bowl for separating solids from liquids, sifting dry ingredients or puréeing sauces.',
    tip:'Use the back of a ladle to press sauces through for a silky texture. Tap the side to clear the mesh.'
  },
  'cheesecloth/muslin':{
    def:'Loose-woven cloth for straining stocks, wrapping herbs or lining cheese moulds.',
    tip:'Rinse and reuse — it\'s cheaper than paper towels in the long run. Boil to sterilise.'
  },
  'cling film':{
    def:'Thin plastic wrap that clings to itself and bowls, for covering food or wrapping marinating meat.',
    tip:'Lay the film directly on the surface of sauces and guacamole to prevent oxidation discolouration.'
  },
  'parchment/baking paper':{
    def:'Heat-resistant, non-stick paper for lining baking trays and wrapping foods for oven cooking.',
    tip:'Save the trimmed pieces — they\'re perfect for covering containers in the fridge.'
  },
  'mortar & pestle':{
    def:'Bowl and club tool for crushing spices, herbs and garlic by hand, releasing oils and flavours.',
    tip:'Dry-roast spices before crushing for maximum flavour. Wash promptly — oils stain the stone.'
  },
  'immersion/stick blender':{
    def:'Handheld blender for puréeing soups and sauces directly in the pot, no transfer needed.',
    tip:'Keep the blade fully submerged — air pockets splatter hot liquid. Pulse to start, then blend.'
  },
  'measuring spoons':{
    def:'Set of spoons in standard measurements (tsp, tbsp) for precise small-quantity measuring.',
    tip:'Level with a knife back for dry ingredients, pour to the brim for liquids. Don\'t heap unless specified.'
  },
  'digital scale':{
    def:'Electronic scale for measuring ingredients by weight, far more accurate than volume cups.',
    tip:'Tare (zero) the bowl before adding each ingredient. Check the battery regularly — drift is common.'
  },
  'sharp chef\'s knife':{
    def:'All-purpose knife with a 20–25 cm blade, for chopping, slicing and dicing nearly everything.',
    tip:'A dull knife is more dangerous than a sharp one — it slips. Steel it before each use for alignment.'
  },
  'cutting board':{
    def:'Flat surface for chopping and prep, protecting your countertops and knife edges.',
    tip:'Wood or plastic only — glass and stone dull knives instantly. Use separate boards for raw meat.'
  }
};

/* Derive equipment for any slug NOT in EQUIPMENT — a heuristic fallback that
   reads method/title/ingredients and infers the gear a bachelor actually needs.
   Mirrors the reasoning of deriveAppliances — sensible, not exhaustive. */
window.deriveEquipment=function(r){
  if(!r)return [];
  if(window.EQUIPMENT&&EQUIPMENT[r.slug])return EQUIPMENT[r.slug].gather.slice();
  var method=(r.method||'').toLowerCase(),t=(r.t||'').toLowerCase(),blurb=(r.blurb||'').toLowerCase();
  var hay=method+' '+t+' '+blurb;
  var gather=[];
  /* Heavy pot — braises, stews, curries, long simmer */
  if(/braise|stew|curry|simmer|slow cook|tagine|bredie|potjie|osso|bourguignon|rag[uù]|casserol|rendang|breyani|dombolo|umngqusho|waterblommetjie|denningvleis|tamatie|potato/.test(hay)){
    gather.push({item:'Heavy-bottomed pot or Dutch oven',why:'Even heat for the long, slow cook'});
  }
  /* Roasting tin — oven roast, bake, whole bird or joint */
  if(/roast|oven ·|bake|wellington|whole chicken|leg of|shoulder|pork belly|duck|lamb rack|sea bass|focaccia|potbrood|mealie bread|khachapuri|hertzoggies|mosbolletjies|buttermilk rusks|malva|sticky toffee|creme brulee|quiche|lasagne|shepherd|cottage|meatloaf|sausage rolls|macaroni|char siu|southern fried|korean fried|spanakopita|gemista|tamales|croissants|waffles/.test(hay)){
    gather.push({item:'Roasting tin or baking tray',why:'Catches juices and provides even oven heat'});
  }
  /* Frying pan/griddle — sear, fry, pan-fry, stir-fry, shallow-fry */
  if(/sear|fry\b|pan-?fry|stir-?fry|shallow-?fry|griddle|steak|burger|patty|chop|wors|boerewors|okra|pampoen|skilpadjies|kaiings|bibimbap|okonomiyaki|banh xeo|jianbing|crêpes|pancakes|french toast|quesadillas|elote|bruschetta|garlic bread|caesar/.test(hay)){
    gather.push({item:'Heavy-based frying pan or griddle',why:'High heat, quick sear'});
  }
  /* Deep pot + slotted spoon — deep-fry */
  if(/deep-?fry|fritter|vetkoek|magwinya|koeksisters|frikkadels|falafel|southern fried|korean fried|fish and chips/.test(hay)){
    gather.push({item:'Deep heavy pot or wok',why:'Oil depth — food must swim'}, {item:'Slotted spoon or spider',why:'Lift fried food without dripping'});
  }
  /* Grill/braai — tongs, grid, brush */
  if(/grill|braai|shisa|nyama|boerewors|sosaties|snoek|roosterkoek|braaibroodjie|chops|wings|beef teriyaki|yakitori|mexican street corn|elote|mozambican/.test(hay)){
    gather.push({item:'Braai grid or tongs',why:'Handle food over hot coals'});
    if(/snoek|sosaties|boerewors|chicken|prawns/.test(hay)){
      gather.push({item:'Pastry brush',why:'Baste with marinade as it cooks'});
    }
  }
  /* Steam — pot with lid, steamer basket or sieve */
  if(/steam|dombolo|mango sticky rice|xiaolongbao|tamales|momos|idli/.test(hay)){
    gather.push({item:'Large pot with tight lid',why:'Trapped steam cooks the food'});
  }
  /* Knife & board — almost everything */
  if(/chop|slice|dice|mince|crush|prep|onion|garlic|ginger|chicken|lamb|beef|fish|vegetables/.test(hay)){
    gather.push({item:'Sharp knife & cutting board',why:'Prepping ingredients'});
  }
  /* Mixing bowls — batters, doughs, marinades */
  if(/batter|dough|marinad|mix|whisk|beat|cream|fold|biscuit|cake|bread|focaccia|croissant|koeksister|vetkoek|pancake|waffle|crepe|frittata|omelette|scrambl/.test(hay)){
    gather.push({item:'Mixing bowls',why:'Room for batters, doughs and marinades'});
  }
  /* Whisk — emulsions, batters, egg work */
  if(/whisk|emulsion|mayo|vinaigrette|cream|meringue|hollandaise|custard|scrambl|omelette|batter|pancake|waffle/.test(hay)){
    gather.push({item:'Whisk or balloon whisk',why:'Incorporate air and emulsify'});
  }
  /* Rolling pin — doughs, pastry, flatbreads */
  if(/roll|dough|pastry|flatbread|naan|focaccia|croissant|pizza|brioche|cinnamon|swirl|cookie|biscuit|roosterkoek|potbrood|khachapuri/.test(hay)){
    gather.push({item:'Rolling pin',why:'Even dough thickness'});
  }
  /* Baking trays/sheets — oven bakes */
  if(/bake|oven|roast|cookie|biscuit|focaccia|potbrood|mealie bread|buttermilk rusks|hertzoggies|mosbolletjies|waffles/.test(hay)){
    gather.push({item:'Baking trays or sheets',why:'Even oven baking'});
  }
  /* Wooden spoon — stirring, scraping */
  if(/stir|sauce|simmer|stew|curry|braise|sauté|sweat|caramelis|render|mix|fold/.test(hay)){
    gather.push({item:'Wooden spoon',why:'Stir and scrape without scratching'});
  }
  /* Ladle — serving soups, stews, curries */
  if(/soup|stew|curry|braise|sauce|gravy|serv|ladle|dombolo|breyani|umngqusho|tamatie|potato|waterblommetjie|denningvleis|boeber|chicken noodle|cream of tomato/.test(hay)){
    gather.push({item:'Ladle',why:'Serve soups, stews and curries'});
  }
  /* Spatula — turning, lifting, spreading */
  if(/spatula|lift|turn|spread|frost|pancake|omelette|frittata|fish slice|burger/.test(hay)){
    gather.push({item:'Spatula or fish slice',why:'Turn and lift gently'});
  }
  /* Tongs — turning meat, serving salad */
  if(/tongs|turn|meat|chicken|lamb|beef|prawn|chop|steak|burger|wors|grill|braai/.test(hay)){
    gather.push({item:'Tongs',why:'Turn meat without piercing'});
  }
  /* Blender/stick blender — purées, smooth sauces */
  if(/purée|blend|smooth|soup|sauce|palak|paneer|mayo|vinaigrette|dom pedro|boeber|cocktail|milkshake|smoothie/.test(hay)){
    gather.push({item:'Blender or stick blender',why:'Purée and blend smooth'});
  }
  /* Sieve/strainer — straining stocks, sifting flour */
  if(/strain|sift|sievel|colander|drain|rinse|wash|stock|sauce|sprinkl|dust|cocoa|icing sugar/.test(hay)){
    gather.push({item:'Sieve or fine-mesh strainer',why:'Strain liquids, sift dry ingredients'});
  }
  /* Grater — cheese, zest, spices */
  if(/grate|zest|cheese|lemon|lime|orange|nutmeg|cinnamon|ginger|microplane|box grater/.test(hay)){
    gather.push({item:'Box grater or microplane',why:'Grate cheese, citrus zest and spices'});
  }
  /* Measuring spoons/cups — precise small quantities */
  if(/tbsp|tsp|ml|g|measure|level|heaped|pinch|dash|exact|precise/.test(hay)){
    gather.push({item:'Measuring spoons',why:'Accurate small-quantity measuring'});
  }
  /* Thermometer — meat doneness */
  if(/meat|chicken|lamb|beef|pork|fish|prawn|temperature|doneness|medium|rare|well|internal/.test(hay)){
    gather.push({item:'Instant-read thermometer (optional)',why:'Check doneness without cutting'});
  }
  /* Baster/spoon — basting, glazing */
  if(/bast|glaze|brush|coat|sizzle|roast|grill|braai|duck|chicken|lamb|beef|ham/.test(hay)){
    gather.push({item:'Basting brush or spoon',why:'Glaze and baste as it cooks'});
  }
  /* Shears/scissors — cutting herbs, trimming meat */
  if(/snip|trim|cut|herb|chive|scall|spring onion|basil|parsley|coriander|dill|mint|chives|kitchen shears|scissors/.test(hay)){
    gather.push({item:'Kitchen shears or scissors',why:'Snip herbs and trim meat'});
  }
  /* Oven mitts/gloves — hot handling */
  if(/oven|hot|potjie|braai|grill|roast|bake|remove|lift|tray|tin|dish/.test(hay)){
    gather.push({item:'Oven mitts or heat-resistant gloves',why:'Handle hot vessels safely'});
  }
  return gather.length?gather:[{item:'Sharp knife & cutting board',why:'The universal prep tools'}];
};
})();
