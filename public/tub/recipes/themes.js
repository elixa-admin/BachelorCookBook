/* TUB — The Ultimate Bachelor Cookbook. Global Flavour Atlas.
   Cross-cutting taste themes showing commonalities across cooking styles.
   Real culinary intelligence for recreating regional tastes on purpose.
   Grounded in window.CULINARY term names and actual recipe library. */

window.THEMES = [
  {
    id:"smoke-and-fire",
    name:"Smoke & Fire",
    icon:"",
    essence:"The universal draw of char, ember and wood-smoke — the flavour of the open flame, prized in nearly every grilling culture. From South African braai to Argentine asado, Thai yang to American hickory-smoked, the Maillard reaction combined with wood smoke creates irresistible depth that transcends borders.",
    commonalities:"Three levers recur everywhere: (1) fierce dry heat to char the surface (Maillard reaction at 140-165°C), (2) wood or charcoal to lay down smoke compounds, (3) a little fat to carry and spread the smoke flavour. The technique differs, the logic is shared.",
    how_to:"Recreate it anywhere: get the heat screaming hot, render a little fat onto the food, and add smoke at the end (a handful of wood chips, a drop of liquid smoke, or a tea-smoke). South Africa says braai; Argentina says asado a-la-parrilla; Thailand says yang; the US says hickory-smoked low-and-slow — same three levers.",
    cuisines:[
      {region:"South Africa", styles:["braai","skottel","charcoal-grilled"], recreate:"Hardwood or charcoal coals, salt-only seasoning, fat from the meat itself (boerewors). The traditional skottel is a one-pan outdoor meal where everything cooks over the same coals.", dishes:["braai-lamb-chops","boerewors"]},
      {region:"Argentina", styles:["asado","a-la-parrilla"], recreate:"Slow over embers, salt only, patience; chimichurri to finish. The parrilla is the grill itself — a grate over charcoal where the fire's intimacy with the meat is everything.", dishes:[]},
      {region:"Thailand", styles:["yang","moo-ping"], recreate:"Charcoal grill, a sweet marinade that caramelises, a char that bites. Moo ping (pork skewers) get their sweetness from palm sugar, their depth from coriander and garlic.", dishes:["chicken-satay"]},
      {region:"United States", styles:["hickory-smoked","low-and-slow","pit-smoked","charbroiled"], recreate:"Low indirect smoke for hours, a spice rub, a sweet-sour sauce at the end. The pit-smoked tradition turns collagen into gelatin while hickory lays down smoke.", dishes:["smash-burgers-special-sauce"]},
      {region:"China", styles:["tea-smoked","char-siu","sigri"], recreate:"Tea-leaves + sugar + rice under a wok lid for smoke; or a lacquered char-siu roast. Tea-smoking creates delicate aromatic smoke; char-siu is Cantonese barbecue with honey-soy glaze.", dishes:["char-siu-pork","peking-duck"]}
    ]
  },
  {
    id:"umami-and-fermentation",
    name:"Umami & Fermentation",
    icon:"",
    essence:"The deep savoury satisfaction that comes from proteins transformed by time and microbes. Fermentation breaks down proteins into glutamic acid — the amino acid that screams umami. Every cuisine has its ferments: Japanese miso, Korean gochujang, Thai fish sauce, Italian Parmigiano, French wine reduction.",
    commonalities:"The science is universal: microbes (bacteria, yeast, mold) break down proteins into amino acids, particularly glutamate. Time + salt + controlled decay = depth. Whether it's soybeans fermenting into miso (months), fish fermenting into nam pla (months), or wine reducing into demi-glace (hours), the logic is concentration through transformation.",
    how_to:"Recreate umami anywhere: add something fermented or aged. Japanese miso paste bloomed in oil; Thai fish sauce splashed into a stir-fry; Korean gochujang melted into a stew; Parmigiano grated into a risotto; French wine reduced into a glaze. Each brings the same deep savoury satisfaction through the same chemical pathway (glutamate).",
    cuisines:[
      {region:"Japan", styles:["miso","tsukemono"], recreate:"Miso paste (fermented soybeans) bloomed in fat or dissolved into dashi. The longer the fermentation, the deeper the flavour. Use white miso for sweetness, red for power.", dishes:["miso-soup","ramen"]},
      {region:"Thailand", styles:["nam-prik","jeow"], recreate:"Fish sauce (nam pla) or soy sauce (si-iu) for salt and umami. Nam prik is chilli relish — fermented fish, chillies, garlic. A splash transforms a stir-fry.", dishes:["thai-green-curry","tom-yum-goong"]},
      {region:"Korea", styles:["gochujang","doenjang"], recreate:"Gochujang (fermented chilli paste) or doenjang (fermented soybean paste). Both bring sweet heat and deep umami. Bloom in oil before adding liquid.", dishes:["bibimbap","tteokbokki","kimchi-jjigae"]},
      {region:"Italy", styles:["parmigiano"], recreate:"Parmigiano-Reggiano aged 24+ months, grated into risotto or pasta. The crystalline amino acids provide sharp umami punch. In cacio e pepe, Pecorino Romano creates emulsion.", dishes:["risotto-milanese-saffron","cacio-e-pepe"]},
      {region:"France", styles:["bourguignon","consomme","reduce"], recreate:"Red wine reduction (bourguignon) or clarified stock (consommé). Long simmering concentrates glutamates. In beef bourguignon, a whole bottle of wine reduces into velvety depth.", dishes:["beef-bourguignon","coq-au-vin","french-onion-soup"]}
    ]
  },
  {
    id:"sweet-sour-salty-balance",
    name:"Sweet–Sour–Salty Balance",
    icon:"",
    essence:"The holy trinity of flavour balance that defines great cuisines. Sweet rounds out acid; acid cuts through fat; salt amplifies both. Whether it's Thai (palm sugar, lime, fish sauce), French (butter, wine, sea salt), or Chinese (sugar, vinegar, soy), the dance of three elements creates harmony.",
    commonalities:"Every balanced cuisine plays the same three notes: sweetness (sugar, fruit, honey), sourness (citrus, vinegar, fermentation), and saltiness (salt, soy, fish sauce). The ratios differ — Thai leans sweet-sour, French leans butter-acid, Chinese leans soy-sugar-vinegar — but the principle is identical: contrast creates completeness.",
    how_to:"Balance by tasting and adjusting. Too sharp? Add sweet (honey, sugar, fruit). Too flat? Add acid (citrus juice, vinegar). Too bland? Add salt (soy, fish sauce, salt). The great cuisines teach us that all three must be present: French hollandaise has butter (fat) + lemon (acid) + salt; Thai tom yum has palm sugar (sweet) + lime (sour) + fish sauce (salty).",
    cuisines:[
      {region:"Thailand", styles:["tom-yum","yum"], recreate:"Palm sugar + lime juice + fish sauce. In tom yum goong, the trio creates hot-sour-salty-sweet harmony. Adjust until all four taste notes are present.", dishes:["tom-yum-goong"]},
      {region:"France", styles:["hollandaise","bearnaise","meuniere"], recreate:"Butter + lemon + salt. In meuniere, brown butter (nutty sweet) meets lemon (sharp) and salt. In bearnaise, tarragon adds herbaceous brightness.", dishes:["cacio-e-pepe","moules-marinieres"]},
      {region:"China", styles:["sweet-sour","char-siu-sauce","teriyaki-sauce"], recreate:"Sugar + vinegar + soy sauce. The classic sweet-sour trio. Cantonese char-siu glaze is honey + soy + vinegar. Katsu sauce is sugar + vinegar + soy + Worcestershire.", dishes:["char-siu-pork"]},
      {region:"Italy", styles:["agrodolce","salsa-verde"], recreate:"Sugar + vinegar. Agrodolce (sweet-sour) is Sicilian: raisins or honey + vinegar. In salsa verde, capers and anchovy provide salt, vinegar provides acid, no sweet needed.", dishes:[]},
      {region:"Vietnam", styles:["nuoc-cham","banh-mi"], recreate:"Fish sauce + lime + sugar + garlic + chilli. Nuoc cham is the perfect balance: salty (fish sauce), sour (lime), sweet (sugar), aromatic (garlic, chilli). Poured over banh mi.", dishes:["banh-mi"]}
    ]
  },
  {
    id:"herb-and-allium-brightness",
    name:"Herb & Allium Brightness",
    icon:"",
    essence:"The spark that cuts through richness: fresh herbs and alliums (onions, garlic, shallots, leeks, spring onions) added at the end. Whether it's coriander on Thai curry, parsley on French bouillabaisse, or spring onions on Chinese stir-fry, the same principle animates every cuisine: freshness creates contrast.",
    commonalities:"Two families recur everywhere: the alliums (onion, garlic, shallot, spring onion, leek, chive) and the leafy herbs (coriander, parsley, basil, mint, dill, spring onion tops). The technique is universal: aromatics cooked at the start for depth, fresh herbs added at the end for brightness. This is how every cuisine balances richness with refreshment.",
    how_to:"Layer your aromatics. Cook alliums (onion, garlic, shallot) in fat at the start to build base. Add fresh herbs (coriander, parsley, basil, mint) at the very end, off the heat, to preserve their volatile oils. Thai green curry gets Thai basil at the end; French bouillabaisse gets parsley; Mexican carnitas get coriander and onion.",
    cuisines:[
      {region:"Thailand", styles:["gaeng","yum","pad"], recreate:"Cook garlic, shallots, galangal in coconut milk at start. Finish with Thai basil, coriander, mint. Herbs wilt instantly — add off heat for perfume.", dishes:["thai-green-curry","tom-yum-goong"]},
      {region:"France", styles:["bouillabaisse","provençal","fines-herbes"], recreate:"Bouillabaisse gets parsley at the end. Provençal cooking uses herbes de Provence (thyme, rosemary, oregano, marjoram). Fines herbes (chervil, parsley, tarragon, chives) finish omelettes.", dishes:["bouillabaisse","coq-au-vin"]},
      {region:"Mexico", styles:["salsa-fresca","guacamole"], recreate:"Coriander + white onion + lime. The trinity of freshness. Sprinkle over carnitas, fold into guacamole, stir into salsa. Added at the end for bright contrast.", dishes:["carnitas-tacos"]},
      {region:"China", styles:["wok-fry","stir-fry","tadka"], recreate:"Cook garlic, ginger, spring onion whites in oil at start. Finish with spring onion greens. In Cantonese cooking, spring onion oil (spring onion oil) is poured over at the end.", dishes:["char-siu-pork"]},
      {region:"Middle East", styles:["tabbouleh","tzatziki"], recreate:"Parsley + mint. Tabbouleh is parsley-heavy with mint for coolness. Tzatziki gets fresh dill. Herbs provide the fresh contrast to rich yoghurt and olive oil.", dishes:["shakshuka-crusty-bread"]}
    ]
  },
  {
    id:"low-and-slow-braise",
    name:"Low-&-Slow Braise",
    icon:"",
    essence:"The transformation of tough cuts into melting tenderness through time and gentle heat. From French coq au vin to Greek stifado, Indian nihari to South African potjie, the logic is identical: collagen breaks down into gelatin at 65-80°C over 3-6 hours, creating succulence that no quick cooking can match.",
    commonalities:"Five steps recur in every braise: (1) sear meat for Maillard flavour, (2) sauté aromatics (onion, carrot, celery) for depth, (3) deglaze with wine or liquid, (4) add liquid and cook gently at 65-80°C, (5) finish with fresh elements. The vessel changes — Dutch oven, clay pot, wok — the method is shared.",
    how_to:"Braise anywhere: choose collagen-rich meat (shoulder, shank, short rib, oxtail, lamb neck), sear hard, add aromatics and liquid, cook at bare simmer (65-80°C) for 3-6 hours. French coq au vin uses wine; Greek stifado uses tomato and vinegar; Indian nihari uses yoghurt and slow heat; South African potjie uses layered ingredients in a cast-iron pot.",
    cuisines:[
      {region:"France", styles:["braise","stew","bourguignon","coq-au-vin"], recreate:"Sear meat, sauté onion-carrot-celery (mirepoix), deglaze with wine, simmer at 75°C for 2-3 hours. Coq au vin uses Burgundy; beef bourguignon uses full-bodied red.", dishes:["coq-au-vin","beef-bourguignon","french-onion-soup"]},
      {region:"Greece", styles:["stifado","kokkinisto","magirefto"], recreate:"Stifado is slow-braised beef or rabbit with onions, tomato, vinegar, cinnamon. Kokkinisto is braised in tomato sauce. Magirefto is home-style slow cooking. All use gentle heat and time.", dishes:[]},
      {region:"India", styles:["nihari","bhuna","rogan-josh","dum"], recreate:"Nihari is slow-cooked overnight stew. Bhuna fry spices until oil separates, then slow-cooks. Rogan josh is aromatic slow-cooked curry. Dum is sealed-pot steam cooking. Collagen needs time.", dishes:["rogan-josh","beef-rendang"]},
      {region:"South Africa", styles:["potjie","potjiekos","bredie","oxtail-potjie"], recreate:"Potjie is layered slow-cooked stew in cast-iron pot. Potjiekos means 'small pot food' — layered ingredients, minimal stirring, coals underneath. Bredie is tomato-based slow stew.", dishes:["oxtail-potjie"]},
      {region:"Spain", styles:["estofado","guisado"], recreate:"Estofado is slow-cooked stew. Guisado is braised or stewed. Both use gentle heat to transform tough cuts into tenderness. Estofado often includes wine; guisado may be tomato-based.", dishes:[]}
    ]
  },
  {
    id:"spice-and-heat-layering",
    name:"Spice & Heat Layering",
    icon:"",
    essence:"The art of building heat and aromatic complexity through spice layers. From Sichuan's mala (numbing-spicy) to Thailand's prik (chilli) to India's masala blends, great cuisines teach us that heat without aroma is blunt, but heat layered with aromatics creates complexity.",
    commonalities:"Three spice tiers recur: (1) whole spices toasted or bloomed in fat, (2) ground spices added for punch, (3) fresh heat (chilli, pepper, Sichuan peppercorn) for bite. The sequence matters — fat carries flavour, heat releases aromatics, timing prevents burning. Indian tadka, Thai curry paste blooming, Sichuan wok hei all follow this logic.",
    how_to:"Layer heat intelligently. Start with whole spices (cumin, coriander, cardamom) toasted in dry pan or bloomed in oil. Add ground spices (chilli powder, turmeric, cumin) and cook 30 seconds until fragrant. Finish with fresh heat (dried chillies, Sichuan peppercorns, black pepper). This is how India builds masala, Thailand builds curry paste, Sichuan builds mala.",
    cuisines:[
      {region:"India", styles:["tadka","masala","bhuna","madras","rogan-josh"], recreate:"Tadka (tempering) is blooming whole spices in hot oil or ghee, then pouring over dal. Bhuna fry spices until oil separates. Masala blends vary by region — Kashmiri uses fennel, Chettinad uses pepper.", dishes:["rogan-josh","chicken-tikka-masala","dan-dan-noodles"]},
      {region:"Thailand", styles:["gaeng","pad","kua","laab"], recreate:"Gaeng (curry) paste fried in coconut cream until oil separates (cha krathiam). Pad stir-fries use garlic, chilli, holy basil. Kua is dry stir-fried. Laab uses dried chilli powder with lime and fish sauce.", dishes:["thai-green-curry","tom-yum-goong"]},
      {region:"Sichuan", styles:["wok-fry","dry-fry","mala","dan-dan"], recreate:"Mala (numbing-spicy) from Sichuan peppercorns + dried chillies. Bloom peppercorns and chillies in oil before adding meat. Dan dan noodles build chilli heat into the sauce.", dishes:["dan-dan-noodles"]},
      {region:"Korea", styles:["gochujang","gochugaru"], recreate:"Gochujang (fermented chilli paste) brings sweet heat and umami. Gochugaru (chilli flakes) provides sharp heat. Layer them — bloom gochugaru in oil, finish with gochujang.", dishes:["bibimbap","tteokbokki"]},
      {region:"Mexico", styles:["molcajete","salsa-molcajete"], recreate:"Toast dried chillies (guajillo, ancho, arbol) on dry comal, then rehydrate and blend. Layer with roasted alliums, tomatoes. This builds complexity beyond raw heat.", dishes:["carnitas-tacos","shakshuka-crusty-bread"]}
    ]
  },
  {
    id:"crisp-and-crunch",
    name:"Crisp & Crunch",
    icon:"",
    essence:"The satisfaction of bite and contrast — the fry, the crisp, the crunch. From Japanese tempura to Southern fried chicken, Thai golden bags to Spanish croquetas, every cuisine treasures the interplay of crispy exterior and tender interior. It's about texture as much as flavour.",
    commonalities:"Four elements create crunch: (1) flour/starch coating (dredge, batter, breading), (2) fat at right temperature (170-190°C for crispy exterior without burning), (3) moisture management (double-fry, steam-finish, par-cook), (4) timing (eat immediately). The coating varies (rice flour, wheat flour, cornstarch, panko) but the physics is shared.",
    how_to:"Achieve crunch anywhere: coat food in starch, fry at 170-190°C, drain well, and serve immediately. Japanese tempura uses light batter and ice water for lacy crispness. Southern fried uses buttermilk soak and flour dredge. Chinese double-fry (par-fry at 130°C, finish at 190°C). Thai uses cornstarch for shatteringly crisp coating.",
    cuisines:[
      {region:"Japan", styles:["tempura","karaage","katsu"], recreate:"Tempura: light batter (flour, cornstarch, ice water) fried at 180°C for lacy crispness. Karaage: marinated chicken coated in potato starch, fried twice. Katsu: panko-crusted cutlet, deep-fried.", dishes:["katsu-curry","tempura-udon"]},
      {region:"United States", styles:["southern-fried","country-fried","chicken-fried"], recreate:"Buttermilk soak (tenderises), flour dredge with salt and pepper, fried at 175°C. Southern fried is crispy seasoned crust; country-fried adds gravy; chicken-fried is the technique applied to steak.", dishes:[]},
      {region:"China", styles:["double-fry","velvet","deep-fry"], recreate:"Double-fry technique: par-fry at 130°C until cooked through, cool, then finish-fry at 190°C for crispness. Velvet (coating meat in cornstarch-egg white) protects during stir-fry.", dishes:["char-siu-pork"]},
      {region:"Thailand", styles:["tod","golden-bags"], recreate:"Tod means deep-fried. Golden bags (thung thong) are crispy pastry filled with minced meat and vegetables. Cornstarch coating creates shattering crunch.", dishes:["chicken-satay"]},
      {region:"Spain", styles:["rebozado","empanado","croquetas"], recreate:"Rebozado is battered then fried. Empanado is breaded and fried. Croquetas are béchamel fritters — creamy inside, golden outside. All achieve crunch through starch coating + hot fat.", dishes:[]}
    ]
  },
  {
    id:"fat-and-emulsion",
    name:"Fat & Emulsion",
    icon:"",
    essence:"The magic of combining fat and water into smooth, velvety sauces. From French hollandaise to Japanese mayonnaise, Italian cacio e pepe to Thai curry, emulsification creates richness no single ingredient can achieve. The science is universal: fat + liquid + emulsifier (protein, starch, or heat) = silk.",
    commonalities:"Three elements make emulsions: (1) fat (butter, oil, cream), (2) water/acid (wine, vinegar, citrus, stock), (3) emulsifier (egg yolk, starch, cheese protein, or heat/energy). The technique: introduce fat slowly while whisking vigorously, or use heat to create temporary emulsion. Break the balance and sauce separates; nail it and you get velvet.",
    how_to:"Emulsify anywhere: whisk oil into acid drop by drop (mayonnaise, vinaigrette), or melt butter into hot wine reduction (beurre monté), or use starch to bind (cream, flour slurry), or use cheese proteins (Pecorino in cacio e pepe). French hollandaise uses egg yolk as emulsifier; Thai curry uses coconut cream fat; Japanese mayonnaise uses egg yolk and MSG.",
    cuisines:[
      {region:"France", styles:["hollandaise","bearnaise","beurre-monté","veloute"], recreate:"Hollandaise: egg yolk emulsifies butter + lemon juice over gentle heat. Béarnaise adds tarragon. Beurre monté is butter emulsified into water (no egg) — chefs' secret for velvety sauce.", dishes:["cacio-e-pepe"]},
      {region:"Italy", styles:["cacio-e-pepe","carbonara","risotto"], recreate:"Cacio e pepe: Pecorino cheese + pasta water emulsify into creamy coating. Carbonara: egg yolks + pecorino + pasta water create sauce without cream. Risotto: rice starch creates natural emulsion.", dishes:["cacio-e-pepe","risotto-milanese-saffron"]},
      {region:"Japan", styles:["mayonnaise","dashi"], recreate:"Japanese mayonnaise: egg yolk emulsifies oil + rice vinegar + MSG (ajinomoto). Dashi (kombu + bonito) creates flavour base but not emulsion — for that, miso paste or tofu cream can thicken.", dishes:[]},
      {region:"Thailand", styles:["gaeng","curry-emulsion"], recreate:"Thai green curry: coconut milk fat separates when paste is fried (cha krathiam), then emulsifies into sauce. The high coconut cream content (first press) creates richness.", dishes:["thai-green-curry"]},
      {region:"China", styles:["velveting","cornstarch-thickened"], recreate:"Velveting: meat coated in cornstarch-egg white mixture, protecting texture during stir-fry. Cornstarch slurry thickens sauces into glossy emulsion. Both create silky mouthfeel.", dishes:["dan-dan-noodles","char-siu-pork"]}
    ]
  },
  {
    id:"earth-and-warm-spice",
    name:"Earth & Warm Spice",
    icon:"",
    essence:"The grounding, comforting flavours of roots, bulbs, and warming spices. From ginger and garlic in Asian stir-fries to onions and carrots in French mirepoix, from cinnamon in Moroccan tagines to nutmeg in béchamel, earth and warm spice provide the foundation upon which bright flavours dance.",
    commonalities:"Two families create earth and warmth: (1) root vegetables and aromatics (onion, garlic, ginger, carrot, celery, leek), (2) warming spices (cinnamon, nutmeg, clove, cardamom, allspice, star anise). The technique: cook roots in fat to build base, add warming spices for depth. Every cuisine starts here before adding bright elements.",
    how_to:"Build earth and warmth: sauté onion, garlic, ginger, carrot, celery in fat (butter, oil, ghee) until softened and sweet. Add warming spices (cinnamon, cloves, nutmeg) for depth. This is French mirepoix (onion-carrot-celery), Italian soffritto (onion-carrot-celery + garlic + parsley), Chinese aromatics (ginger, garlic, spring onion), Indian bhuna base (onion, ginger, garlic).",
    cuisines:[
      {region:"France", styles:["mirepoix","brunoise","sachet-d'epices"], recreate:"Mirepoix: diced onion, carrot, celery cooked in butter. Brunoise: very small dice of same for refined texture. Sachet d'épices: cheesecloth bundle of peppercorns, cloves, thyme, bay leaf infusing into stock.", dishes:["beef-bourguignon","coq-au-vin","french-onion-soup"]},
      {region:"India", styles:["bhuna-base","garam-masala","tadka"], recreate:"Bhuna base: onion, ginger, garlic fried until browned, then tomatoes and spices. Garam masala (warming spice blend) added at end for aroma. Tadka whole spices bloomed in oil.", dishes:["rogan-josh","chicken-tikka-masala"]},
      {region:"China", styles:["aromatics-base","ginger-garlic","five-spice"], recreate:"Ginger, garlic, spring onion whites cooked in oil. Five-spice powder (star anise, cloves, cinnamon, Sichuan pepper, fennel) provides warmth to braises and roasts.", dishes:["char-siu-pork","peking-duck"]},
      {region:"Middle East", styles:["baharat","ras-el-hanout","advieh"], recreate:"Baharat (all-spice blend): black pepper, cumin, coriander, cinnamon, cloves. Ras el hanout (North African): warming spices including cardamom, nutmeg, allspice. Advieh (Persian): roses, cinnamon, cardamom.", dishes:["shakshuka-crusty-bread"]},
      {region:"Morocco", styles:["ras-el-hanout","couscous"], recreate:"Ras el hanout spice blend (up to 30 spices) provides earthy warmth. Couscous steamed over aromatic broth spiced with cinnamon, ginger, turmeric. Warm spices ground fresh provide perfume.", dishes:[]}
    ]
  },
  {
    id:"one-pot-comfort",
    name:"One-Pot Comfort",
    icon:"",
    essence:"The alchemy of ingredients melding in a single vessel — rice, liquid, aromatics, protein, vegetables transforming into something greater than the sum of parts. From Spanish paella to Indian biryani, Chinese clay-pot to South African potjie, one-pot cooking creates depth through proximity.",
    commonalities:"Four principles recur: (1) layered cooking (aromatics first, then protein, then starch), (2) minimal liquid (rice absorbs flavoured broth), (3) tight lid (steam does the work), (4) no stirring (preserves texture). The vessel changes — clay pot, Dutch oven, wok, paella pan — the physics is shared: steam transforms.",
    how_to:"One-pot anywhere: layer aromatics (onion, garlic, spices) in fat, add protein to brown, add rice or starch, add measured liquid, cover tightly, cook over gentle heat. Do not stir. Spanish paella: saffron-infused broth absorbed by rice. Indian biryani: layered rice and meat steamed together. Chinese clay-pot: rice, meat, vegetables steamed in earthenware.",
    cuisines:[
      {region:"Spain", styles:["paella","arroz-con-pollo"], recreate:"Paella: bomba rice cooked in wide shallow pan with saffron-infused broth. No stirring allowed — socarrat (crispy bottom) is prized. Arroz con pollo uses same technique with chicken.", dishes:[]},
      {region:"India", styles:["biryani","pulao","khichdi"], recreate:"Biryani: layered rice and meat, steamed together with saffron, aromatics. Pulao: rice cooked with light spices. Khichdi: rice and lentils cooked together — comfort food.", dishes:["vegetable-biryani"]},
      {region:"China", styles:["clay-pot","hot-pot","congee"], recreate:"Clay pot: rice, meat, vegetables steamed in earthenware. Hot pot: broth simmered at table, ingredients cooked by diners. Congee: rice cooked until broken down into silky porridge.", dishes:[]},
      {region:"South Africa", styles:["potjie","potjiekos"], recreate:"Potjie: layered ingredients in cast-iron pot, cooked over coals. Potjiekos means 'small pot food' — minimal stirring, steam does work. Meat at bottom, vegetables layered above, rice on top.", dishes:["oxtail-potjie"]},
      {region:"France", styles:["pot-au-feu","cassoulet"], recreate:"Pot-au-feu: boiled beef and vegetables. Cassoulet: slow-cooked bean and meat casserole. Both one-pot comfort, but cassoulet requires oven baking for crust.", dishes:[]}
    ]
  },
  {
    id:"char-and-maillard",
    name:"Char & Maillard",
    icon:"",
    essence:"The primal appeal of sear and scorch — the flavours that only high heat can create. From American smash burgers to Japanese tataki, from French steak au poivre to Thai pad char, the Maillard reaction (140-165°C) creates hundreds of new flavour compounds that don't exist in raw ingredients.",
    commonalities:"Three conditions trigger Maillard: (1) high heat (140-165°C minimum), (2) protein surface, (3) reducing sugars. Dry meat sears better; pressing increases contact (smash burger). The result: browned flavour, crisp texture, visual appeal. Every cuisine that prizes sear — steakhouse French, American smash burger, Japanese tataki — understands this chemistry.",
    how_to:"Maximise Maillard: dry meat thoroughly, press into hot surface (smash burger) or sear in smoking-hot pan (steak). Don't move — let the crust form. Flip once. American smash burger: press beef into screaming-hot griddle. French steak: sear in butter. Japanese tataki: sear briefly, leave raw inside.",
    cuisines:[
      {region:"United States", styles:["smash-burger","blackened","pan-seared"], recreate:"Smash burger: beef ball smashed onto smoking-hot griddle, maximising surface contact for crust. Blackened: spice crust seared until blackened. Pan-seared: hard sear in ripping-hot pan.", dishes:["smash-burgers-special-sauce"]},
      {region:"France", styles:["au-poivre","steak-frites","sear"], recreate:"Steak frites: steak seared hard, served with frites. Au poivre: crust of cracked pepper seared onto steak. The French understand that sear = flavour.", dishes:["steak-frites-cafe-de-paris"]},
      {region:"Japan", styles:["tataki","aburi","teppanyaki"], recreate:"Tataki: briefly seared, raw inside (usually fish). Aburi: flame-seared (often sushi). Teppanyaki: seared on flat iron griddle. All prize sear contrast.", dishes:[]},
      {region:"Thailand", styles:["pad","kua","char"], recreate:"Pad is stir-fried — high heat wok creates char. Kua is dry stir-fried. Char edges are prized in Thai cooking for flavour contrast.", dishes:[]},
      {region:"Argentina", styles:["a-la-parrilla","asado"], recreate:"A la parrilla: grilled over charcoal. Asado: slow-roasted over embers but seared first. The Argentine grill masters heat and crust.", dishes:[]}
    ]
  },
  {
    id:"citrus-and-acid",
    name:"Citrus & Acid",
    icon:"",
    essence:"The bright sharpness that cuts through richness and awakens the palate. From Thai lime in tom yum to French lemon in beurre blanc, from Mexican orange in carnitas to Chinese vinegar in stir-fry, acid provides the counterpoint that makes rich food sing.",
    commonalities:"Three acid sources recur: (1) citrus (lemon, lime, orange, yuzu), (2) vinegar (wine vinegar, rice vinegar, cider vinegar), (3) fermented acids (fish sauce, tamarind, yoghurt). The technique: add acid at the end (preserves brightness) or balance fat throughout (hollandaise). Acid cuts fat, highlights sweet, amplifies salt.",
    how_to:"Balance with acid: taste your dish, then add acid drop by drop until flavours pop. Too rich? Add lemon juice. Too flat? Add vinegar. Too heavy? Add lime. Thai tom yum uses lime; French hollandaise uses lemon juice; Mexican carnitas use orange juice; Chinese stir-fry uses rice vinegar; Middle Eastern uses sumac or pomegranate molasses.",
    cuisines:[
      {region:"Thailand", styles:["tom-yum","yum","pad"], recreate:"Tom yum: lime juice provides essential sour note. Yum (spicy salad) uses lime for brightness. Pad thai uses tamarind or vinegar for sweet-sour balance.", dishes:["tom-yum-goong","thai-green-curry"]},
      {region:"France", styles:["beurre-blanc","hollandaise","meuniere"], recreate:"Beurre blanc: white wine + vinegar reduced, then emulsified with butter. Hollandaise: lemon juice provides acid. Meuniere: brown butter + lemon. Acid cuts butter richness.", dishes:[]},
      {region:"Mexico", styles:["salsa","carnitas","marinade"], recreate:"Carnitas: orange juice in braising liquid cuts pork richness. Salsa: lime juice brightens tomato and chilli. Marinades often use lime or orange to tenderise and brighten.", dishes:["carnitas-tacos"]},
      {region:"China", styles:["stir-fry","black-vinegar","red-cook"], recreate:"Stir-fry uses rice vinegar for brightness. Black vinegar provides depth and acid in noodles. Red-cooking uses soy but sometimes vinegar for balance.", dishes:["dan-dan-noodles"]},
      {region:"Middle East", styles:["sumac","pomegranate-molasses","lemon"], recreate:"Sumac (ground berry) provides tart, lemony acidity. Pomegranate molasses adds sweet-sour depth. Lemon juice brightens hummus, yoghurt dishes, grilled meats.", dishes:["shakshuka-crusty-bread"]}
    ]
  }
];
