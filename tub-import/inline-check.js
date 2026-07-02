
const OCC={
  solo:{n:'01',t:'Cooking for One',d:'Eat well on any night — fast, assured, repeatable.'},
  date:{n:'02',t:'Cooking for Two',d:'A dinner for two — showstoppers for the kind of evening worth staying for.'},
  host:{n:'03',t:'Entertaining',d:'Gather the table — scale, theatre, a night that runs late.'},
};
const TIERS={signature:{n:'Signature',c:'var(--t-signature)'},premium:{n:'Premium',c:'var(--t-premium)'},global:{n:'Global',c:'var(--t-global)'},exotic:{n:'Exotic',c:'var(--t-exotic)'},others:{n:'Others',c:'var(--t-others)'}};
const PLATE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/></svg>';

/* ── FULL recipe data (live guided cooks) ── */
const FULL={
steak:{slug:'steak',t:'Pan-Seared Steak, Butter & Thyme',tier:'signature',cui:'Steakhouse · French',occ:['date'],time:'18 min',method:'Stovetop · sear & baste',diff:'Easy',
 blurb:"A great steak is less recipe than ritual — salt early, hot pan, baste in foaming butter and thyme.",
 prov:{popular_in:"The American steakhouse and the French bistro — and any kitchen with a heavy pan and a hot flame",famous_for:"The ritual that turns a cut into a restaurant plate: deep crust, rose-pink centre, basted in foaming butter",consists_of:"A thick sirloin or ribeye, flaky salt, cracked pepper, neutral oil, then butter, thyme and garlic to baste",name_origin:"Self-descriptive — pan-seared for the crust, basted in butter and thyme. The French call the baste arroser.",why_loved:"Minimal ingredients, maximal theatre — the dish that makes a quiet evening feel like an occasion",method_detail:"Stovetop — sear + baste"},
 brief:{lead:"Before the heat goes on, know the shape of the cook — loud and fast at the pan, then quiet while it rests. The crust forms in minutes, the magic is in the baste, the rest is non-negotiable.",
  expect:[["Temper & salt early.","Pull from the fridge, salt it, let it sit — the step most people skip."],["A screaming-hot pan.","The crust only forms if the pan is properly hot before the steak goes in."],["Baste to finish.","Lower the heat, tilt the pan, spoon foaming butter over until it smells of thyme."],["Rest, then slice.","Five to eight minutes off the heat — slice now and the board floods."]],
  stats:[["18","min","Active"],["30","min","Temper"],["2","","Serves 1–6"],["Med-rare","","Doneness"]],
  kit:["Heavy-based pan (cast iron)","Tongs","Spoon for basting","Instant-read thermometer","A warm plate"]},
 ing:[["The steak",[["countX",2,"","ribeye or sirloin steaks, ~250 g each, 3–4 cm thick"]]],["For the sear",[["taper",1,"tsp","<b>flaky sea salt</b>"],["taper",1,"tsp","<b>coarsely cracked black pepper</b>"],["linear",1,"tbsp","neutral oil (canola/grapeseed)"]]],["For the baste",[["linear",60,"g","unsalted <b>butter</b>"],["countN",4,"","sprigs fresh <b>thyme</b>"],["countN",2,"","<b>garlic</b> cloves, smashed in their skins"]]],["To finish",[["static","","Flaky salt, to taste"],["static","","A knob of butter, to melt over"],["static","","Lemon wedge (optional)"]]]],
 tl:[["T−30:00","Salt & temper the steak","Out of the fridge, salt both sides, leave at room temp.",1],["T+00:00","Pan on, high heat","Pat bone-dry, crack pepper. Pan until water dances.",0],["T+02:00","Sear — don't move it","Oil in, steak down. 2 min/side; render the fat cap.",0],["T+06:00","Baste","Lower heat, butter + thyme + garlic. Spoon over, 60–90 sec.",0],["T+08:00","Rest","Warm plate, loosely tented, 5–8 min.",1],["T+16:00","Slice & finish","Against the grain. Flaky salt, butter, lemon."]],
 steps:[["Temper & salt","Season generously with flaky salt 30–45 min ahead and leave out to lose its chill. Just before cooking, pat completely dry.","Salt seasons deep and draws surface moisture for a darker crust; tempering lets it cook evenly instead of seizing cold.",1800],["Dry & pepper","Pat bone-dry, then crack black pepper over both sides — after the salt, not before.","Moisture is the enemy of crust; pepper late so it flavours without scorching.",null],["Get the pan properly hot","Heavy pan, high heat, until a drop of water skitters and vanishes. Then a thin film of oil.","A screaming-hot pan is the only way to build real Maillard crust before the centre overcooks.",240],["Sear — don't touch it","Lay it in away from you. Leave it 2 min. Flip, 2 min. Hold on the fat cap 30–60 sec to render.","Moving it tears the crust; the steak releases when it's ready.",120],["Baste in foaming butter","Drop the heat. Add butter, thyme, smashed garlic. Tilt the pan, spoon foaming butter over 60–90 sec.","Arroser — basting gently cooks the top and perfumes the fat for an even, glossy finish.",90],["Rest","Warm plate, loosely tented, 5–8 min. Don't skip, don't slice early.","Resting redistributes juices; cut now and every drop runs onto the board.",420],["Slice & finish","Slice against the grain. Flaky salt, a knob of butter melting over, lemon if you like.","Across the grain shortens fibres for tenderness; the final salt and butter are the difference between good and unforgettable.",null]],
 pair:[["With the steak","Malbec","Mendoza, Argentina · full-bodied red","Dark fruit, a lick of spice and soft tannins cut the butter and stand up to the char."],["Beforehand","Negroni","Equal parts gin · Campari · sweet vermouth","Bitter and bright — wakes the palate and buys half an hour of easy theatre while the steak tempers."]]},

carbonara:{slug:'carbonara',t:'Spaghetti Carbonara',tier:'signature',cui:'Italian · Roman',occ:['solo','date'],time:'20 min',method:'Stovetop · emulsion',diff:'Medium',
 blurb:"Four ingredients, no cream — the Roman classic where technique is everything and the sauce is silk.",
 prov:{popular_in:"Rome — the trattoria classic; beloved worldwide",famous_for:"The four-ingredient pasta that proves restraint is a flex",consists_of:"Spaghetti, guanciale, egg yolks, Pecorino Romano and black pepper — bound by the pasta's own water",name_origin:"From carbonaro — 'charcoal burner'. The pepper looks like coal dust; a hearty meal for Apennine workers.",why_loved:"Ready in the time the water takes to boil; rich, salty, silky — a weeknight turned into an event",method_detail:"Stovetop — emulsion"},
 brief:{lead:"The whole cook happens in the last ninety seconds — have everything ready before the pasta drains. Render the guanciale crisp, boil the pasta shy of al dente, then toss it off the heat with an egg-and-cheese paste loosened with starchy water until it turns to silk. The only thing that ruins carbonara is heat.",
  expect:[["Render the cure slowly.","Cold pan, low heat — crisp meat and a pool of flavourful fat."],["Cook the pasta shy.","One minute under al dente; it finishes in the sauce."],["Temper off the heat.","Hot pan + eggs = scrambled. Off the heat, water turns paste to silk."],["Eat immediately.","The sauce is perfect for about ninety seconds — pour the wine first."]],
  stats:[["20","min","Active"],["0","min","Passive"],["2","","Serves 1–6"],["Easy+","","Skill"]],
  kit:["Large pot","Heavy frying pan","Tongs","A mug for pasta water"]},
 ing:[["The pasta",[["linear",200,"g","dried spaghetti (or rigatoni)"]]],["The cure",[["linear",100,"g","<b>guanciale</b>, diced — pancetta or streaky bacon work"]]],["The sauce",[["countN",3,"","large <b>egg yolks</b> + 1 whole egg"],["linear",50,"g","<b>Pecorino Romano</b>, finely grated + extra"],["taper",1,"tbsp","coarsely cracked <b>black pepper</b>"]]]],
 tl:[["T+00:00","Water on; make the paste","Salt the water like the sea. Whisk yolks, egg, pecorino, pepper to a paste.",0],["T+06:00","Render the guanciale","Cold pan, medium-low, render slowly to crisp-gold. Kill the heat.",0],["T+08:00","Pasta in","Cook to 1 min shy of al dente.",0],["T+17:00","Reserve & drain","Scoop a mug of cloudy water; drain.",0],["T+18:00","Temper & toss","Pasta into the pan (off heat); paste + hot water; toss hard.",0],["T+20:00","Loosen & plate","More water until it flows like cream. Pepper, pecorino. Eat now.",0]],
 steps:[["Water & the paste","Salt the water like the sea. Whisk yolks, egg, pecorino and a heavy grind of pepper into a thick paste.","The paste is the entire sauce; salt the water because the pasta is the only other seasoning route.",null],["Render the cure","Guanciale into a cold pan, then medium-low. Let the fat melt slowly until the meat is crisp and amber. Off the heat.","A slow render gives crisp meat and flavourful fat to emulsify; a hot start toughens it.",null],["Cook shy","Pasta to one minute under al dente; scoop out a big mug of cloudy water before draining.","It finishes in the sauce; the starchy water is the emulsifier that makes it silky.",null],["Temper & toss — off the heat","Tip pasta into the guanciale pan (off the flame, cooled a beat). Add the paste, a splash of hot water, toss violently.","Off-heat stops the eggs scrambling; the water's heat and starch turn paste into glossy sauce.",null],["Loosen & plate","Add more pasta water until it moves like cream. Plate, more pepper, shower with pecorino.","Carbonara waits for no one — perfect for ~90 seconds, so sit down fast.",null]],
 pair:[["With the pasta","Frascati or Verdicchio","Lazio, Italy · crisp dry white","Clean acidity cuts the richness and stands up to the pepper without overpowering it."],["Aperitivo","Aperol Spritz","Aperol · prosecco · soda","Bitter-orange and fizz — the Roman way to start, and it won't dull the palate."]]},

salmon:{slug:'salmon',t:'Crispy-Skin Salmon, Brown Butter & Capers',tier:'signature',cui:'Modern · bistro',occ:['date'],time:'12 min',method:'Stovetop · pan-fry + beurre noisette',diff:'Easy',
 blurb:"Glass-crisp skin, blushing centre, nutty brown butter — the fast date dish that looks like far more work.",
 prov:{popular_in:"Scandinavia, the Pacific Northwest and the modern bistro — wherever salmon runs",famous_for:"The ten-minute dish that turns a fillet into a restaurant plate — crisp skin, blushing centre, nutty butter",consists_of:"A skin-on salmon fillet, flaky salt, neutral oil, butter, capers and lemon — and the patience to leave it alone",name_origin:"Self-descriptive: the skin fries to a crackle and the butter browns to a nutty beurre noisette",why_loved:"One pan, ten minutes, looks like a chef cooked it — the crispy skin is the whole point",method_detail:"Stovetop — pan-fry + beurre noisette"},
 brief:{lead:"A lesson in leaving things alone. The skin must be bone-dry and started in a cold pan so it renders slowly into glass; press it flat, then don't touch it for six minutes. The centre stays blushing because the skin side does the work. Finish with butter browned in the same pan, capers and lemon.",
  expect:[["Dry the skin thoroughly.","Pat it matt, not glossy — several times. Moisture kills the crisp."],["Cold-pan start.","Oil, skin-down, then heat. Renders the skin into glass, not steam."],["Don't touch it.","Six minutes skin-down — watch the colour climb the fillet."],["Beurre noisette to finish.","Butter foams, browns, smells of hazelnut — capers, lemon, spoon over."]],
  stats:[["12","min","Active"],["10","min","Salt"],["2","","Serves 1–6"],["Pink","","Centre"]],
  kit:["Heavy or non-stick pan","Fish slice/spatula","Spoon for basting"]},
 ing:[["The fish",[["countX",2,"","salmon fillets, skin on, scaled & pin-boned, ~180 g"],["taper",1,"tsp","flaky sea salt"]]],["To cook",[["linear",1,"tbsp","neutral oil (canola/grapeseed)"]]],["The sauce",[["linear",60,"g","butter"],["linear",1.5,"tbsp","<b>capers</b>, drained"],["static","","½ <b>lemon</b>"],["static","","fresh dill (optional)"]]]],
 tl:[["T−10:00","Dry & salt the skin","Pat bone-dry several times; salt generously; leave to draw moisture.",1],["T+00:00","Cold-pan start","Oil in a cold pan, skin-down; medium heat; press flat 30 sec.",0],["T+06:00","Don't move it","Skin-down until deep gold, flesh opaque ⅔ up.",0],["T+07:30","Flip & finish","Turn over 60–90 sec to set the centre; keep it blushing.",0],["T+09:00","Brown butter & capers","Fish out; butter foams then browns; capers, lemon.",0],["T+10:00","Spoon over; plate skin-up","Pour foaming butter over; dill if you like.",0]],
 steps:[["Dry & season the skin","Pat the skin dry with paper towel — several times — until matt. Salt it well ten minutes ahead; salt the flesh lightly.","Moisture is the enemy of crisp skin; salting early draws water and seasons.",360],["Cold-pan start","Oil in a cold pan, fish skin-down, then medium heat. Press gently thirty seconds so it doesn't curl.","Starting cold renders the skin slowly and evenly into glass; a hot start curls and steams it.",null],["Don't touch it","Leave it skin-down about six minutes, until deep gold and the flesh is opaque two-thirds up.","Patience crisps the skin — watch the colour climb the side.",360],["Flip & finish","Turn over for 60–90 seconds, just to set the top. The centre stays blushing.","The skin side cooked the fish; the flip only finishes the flesh gently.",90],["Brown butter & capers","Lift the fish out. Butter foams, then turns golden and smells of hazelnut. Toss in capers, squeeze lemon.","Beurre noisette with capers and lemon is the classic sharp, nutty finish — the browned butter is the sauce.",null],["Spoon over, plate skin-up","Pour the foaming butter over, keeping skin on top. Dill if you like.","Skin-up keeps the crackle intact; the butter dresses the flesh.",null]],
 pair:[["With the fish","Sancerre or Sauvignon Blanc","Loire, France · crisp, mineral","Bright acidity cuts the butter and echoes the capers' brine; a cold Chablis works too."],["Aperitif","Dry gin martini","Gin · dry vermouth · olive, very cold","Clean and cold — sharpens the appetite before a rich, buttery fish."]]},

'roast-chicken':{slug:'roast-chicken',t:'Roast Chicken, Lemon, Garlic & Herbs',tier:'signature',cui:'Classic · French',occ:['host','date'],time:'15 min + roast',method:'Oven · roast',diff:'Easy',
 blurb:"The Sunday centrepiece — golden, juicy, perfumed with herbs. The dish that says you can host.",
 prov:{popular_in:"France (poulet rôti), Britain (the Sunday roast) and America — the universal centrepiece",famous_for:"The dish that proves you can host — golden, juicy and perfumed, feeding a table from one pan",consists_of:"A whole chicken, butter, lemon, garlic, soft herbs (thyme, rosemary), salt and pepper — aromatics in the cavity",name_origin:"Self-descriptive — oven-roasted; the French poulet rôti is the platonic ideal",why_loved:"Almost no hands-on for a huge payoff; scales from two to a crowd, and the smell does the hosting",method_detail:"Oven — roast"},
 brief:{lead:"Fifteen minutes of you, then the oven does the work. The secrets are dry skin, butter under the skin, a hot start for colour, and a generous rest. Stuff the cavity with lemon, garlic and herbs so it perfumes from within.",
  expect:[["Dry the bird.","Pat dry — and fridge-dry uncovered if you can, for glass skin."],["Butter under the skin.","Smear it on the meat, not the skin — bastes the breast, crisps the outside."],["Hot start, then steady.","220 °C blast for colour; drop to 200 °C to cook through."],["Rest generously.","Fifteen minutes, loosely tented — carve now and the breast dries."]],
  stats:[["15","min","Active"],["60","min","Roast"],["4","","Serves (2–6)"],["74°","","Thigh"]],
  kit:["Roasting tray","Instant-read thermometer","Carving board"]},
 ing:[["The bird",[["countX",1,"","whole free-range chicken, ~1.6 kg"]]],["The butter",[["linear",80,"g","butter, softened"],["taper",1,"tsp","flaky sea salt + black pepper"],["countN",5,"","sprigs <b>thyme</b> + 1 rosemary, chopped"]]],["The aromatics",[["countX",1,"","<b>lemon</b>, halved"],["countX",1,"","head <b>garlic</b>, halved"],["static","","extra thyme/rosemary sprigs"]]],["To serve",[["linear",1,"tbsp","olive oil"],["static","","2 onions or lemons, quartered (optional)"]]]],
 tl:[["T−hrs","Dry the bird","Uncovered in the fridge a few hours if possible.",1],["T+00:00","Prep & butter","Oven 220 °C. Butter under skin; stuff cavity.",0],["T+02:00","Hot start","Into the oven, breast-up, 20 min.",0],["T+22:00","Turn down","200 °C; roast on.",0],["T+50:00","Baste","Once, with the pan juices.",0],["T+60–70:00","Check & rest","74 °C thigh, clear juices. Rest 15 min.",1],["T+","Carve & pour","Carve; pour the lemony juices over.",0]],
 steps:[["Dry the bird","Pat dry inside and out — and, if time allows, leave uncovered in the fridge a few hours.","Dry skin is crisp skin; fridge-drying is the professional route to glass skin.",null],["Butter under the skin","Mix butter with salt, pepper, chopped herbs. Ease fingers under the breast skin and smear butter on the meat; rub the rest outside. Stuff the cavity with lemon, garlic, herbs.","Butter under the skin bastes the breast within and crisps the skin above; cavity aromatics perfume from inside.",null],["Hot start","Into a 220 °C oven, breast-up, twenty minutes.","The initial blast sets and colours the skin.",null],["Turn down & roast","Drop to 200 °C and roast about 15–20 min per 500 g, basting once.","Lower heat cooks the joints through without burning; basting adds gloss and flavour.",null],["Check & rest","Done at 74 °C in the thickest thigh, juices clear. Rest, loosely tented, 15 min.","Resting lets juices settle; carve immediately and the breast runs dry.",null],["Carve & pour","Carve at the table for theatre; pour the lemony pan juices over everything.","Those juices are liquid gold — spooning them over is the difference between good and unforgettable.",null]],
 pair:[["With the bird","Pinot Noir or Cru Beaujolais","Red · bright fruit, gentle tannin","Suits the bird without overpowering it; a lightly oaked Chardonnay is the white answer."],["Aperitif","Champagne","Brut · cold","Sets the evening — and the bird won't keep you waiting at the stove."]]}
};

/* ── roster (knowledgebase) — Signature 12 (4 full + 8 provenance) + wider library ── */
let R=[
 FULL.steak,FULL.carbonara,FULL.salmon,FULL['roast-chicken'],
 {t:'Risotto Milanese, Saffron',tier:'signature',cui:'Italian · Lombardy',occ:['date'],time:'35 min',method:'Stovetop · stir',blurb:'Patient, hands-on, golden — the saffron risotto that rewards the twenty minutes you give it.',
  prov:{popular_in:"Milan, Lombardy — the saffron-gold classic of the north",famous_for:"The patient rice dish that turns stirring into silk — and the golden partner to ossobuco",consists_of:"Carnaroli or Arborio rice, stock, shallot, white wine, butter, Parmesan and saffron",name_origin:"Named for Milan; saffron was a status spice among the Renaissance glaziers who tinted glass — and their rice",why_loved:"Creamy without cream — the starch does the work; comforting, golden, endlessly adaptable",method_detail:"Stovetop — gradual stock + mantecatura"}},
 {t:'Thai Green Curry',tier:'signature',cui:'Thai',occ:['solo','date'],time:'35 min',method:'Stovetop · simmer',blurb:'Fragrant, fresh, fiery — the weeknight curry that tastes like a long flight.',
  prov:{popular_in:"Central Thailand — the most loved of the curry pastes; now global",famous_for:"The fragrant, herb-green curry — sharper and fresher than its red cousin",consists_of:"Green curry paste (green chilli, lemongrass, galangal, makrut lime, basil), coconut milk, protein, Thai basil",name_origin:"Kaeng khiao wan — 'sweet green curry'; green for the fresh chilli, 'sweet' for its gentle heat",why_loved:"Fragrant and fast once you have the paste — the weeknight exotic that tastes of travel",method_detail:"Stovetop — fry paste, crack coconut cream, simmer"}},
 {t:'Carnitas Tacos',tier:'signature',cui:'Mexican · Michoacán',occ:['host','date'],time:'3 hr',method:'Stovetop · confit',blurb:'Slow-pulled pork, crisp edges, lime and salsa — the crowd dish done properly.',
  prov:{popular_in:"Michoacán, Mexico — the slow-pulled pork of the highlands; now taquería-wide",famous_for:"Pork confited in its own fat until crisp-edged and melting — the taco of celebration",consists_of:"Pork shoulder braised in lard with orange, garlic and cumin until shreddable and crisped; tortillas, onion, coriander, lime",name_origin:"'Carnitas' — 'little meats'; the diminutive is affection",why_loved:"Crisp and tender at once; scales to feed a crowd; the soul of a Mexican table",method_detail:"Stovetop — confit braise then crisp"}},
 {t:'Mussels, White Wine & Garlic',tier:'signature',cui:'Bistro · Belgian',occ:['date'],time:'20 min',method:'Stovetop · steam',blurb:'The fast, theatrical shellfish pot — steamed open in wine and shallot, bread mandatory.',
  prov:{popular_in:"Belgium and the French coast — moules-frites is Belgium's national plate",famous_for:"The fast, theatrical shellfish pot — steamed open in wine and shallot, the broth is the prize",consists_of:"Mussels, white wine, shallot, garlic, butter, parsley — sometimes cream",name_origin:"Moules marinière — 'sailor's mussels,' the simple fisherman's preparation",why_loved:"Ten minutes, looks lavish, and the broth is the best part — mop it with bread",method_detail:"Stovetop — steam"}},
 {t:'Cacio e Pepe',tier:'signature',cui:'Italian · Roman',occ:['solo','date'],time:'15 min',method:'Stovetop · emulsion',blurb:'The minimalist masterpiece — pasta, cheese and pepper, nothing else, and the hardest to nail.',
  prov:{popular_in:"Rome, Lazio — the trattoria classic, now global",famous_for:"The minimalist masterpiece: pasta, cheese, pepper — and the hardest of the Roman pastas to nail",consists_of:"Tonnarelli or spaghetti, Pecorino Romano, cracked black pepper, and the pasta's own cooking water",name_origin:"Roman dialect — cacio ('cheese', Pecorino) + e pepe ('and pepper'). The name is the ingredient list.",why_loved:"Ten minutes, four ingredients, restaurant-grade — if the emulsion holds",method_detail:"Stovetop — emulsion"}},
 {t:'Shakshuka, Crusty Bread',tier:'signature',cui:'Middle Eastern · North African',occ:['solo','date'],time:'30 min',method:'Stovetop · simmer + poach',blurb:'Eggs poached in a smoky spiced tomato-and-pepper sauce — breakfast that eats like dinner.',
  prov:{popular_in:"North Africa and the Middle East — Israel's beloved all-day dish",famous_for:"Eggs poached in a smoky, spiced tomato-and-pepper sauce — breakfast that eats like dinner",consists_of:"Tomatoes, peppers, onion, garlic, cumin, paprika, eggs, optional feta, coriander",name_origin:"Shakshuka — Arabic for 'all shaken up'",why_loved:"One pan, feeds a table, glorious to serve; bread is mandatory",method_detail:"Stovetop — simmer sauce, poach eggs"}},
 {t:'Molten Chocolate Fondant',tier:'signature',cui:'French',occ:['date'],time:'25 min',method:'Oven · bake',diff:'Easy',blurb:'The dessert that erupts — a set chocolate shell with a molten liquid centre. The closer.',
  prov:{popular_in:"France (chocolat fondant) and the US (lava cake) — the restaurant dessert that became a classic",famous_for:"The dessert that erupts — a set chocolate shell with a molten liquid centre",consists_of:"Dark chocolate, butter, eggs, sugar, a little flour — underbaked to stay liquid within",name_origin:"Fondant — 'melting'; lava cake for the dramatic centre",why_loved:"Five ingredients, ten minutes, showstopping — the closer that closes the evening",method_detail:"Oven — bake (underbaked centre)"}},
 {t:'Smash Burgers, Special Sauce',tier:'signature',cui:'American',occ:['solo','date'],time:'20 min',method:'Griddle · smash-sear',blurb:'Thin, lace-edged patties smashed onto a screaming-hot surface — maximum crust, melted cheese.',
  prov:{popular_in:"USA — the diner and the drive-in; revived by the modern burger cult",famous_for:"The thin, lace-edged patty smashed onto a screaming-hot surface for maximum crust",consists_of:"Beef mince (high fat), salt, pepper, American cheese, brioche bun, special sauce",name_origin:"'Smash' — the ball of beef is pressed flat onto the griddle",why_loved:"More crust than burger — the Maillard edge, the melted cheese, the soft bun",method_detail:"Griddle — smash-sear"}},

 {t:'Beef Rendang',tier:'premium',cui:'Indonesian · Minang',occ:['date','host'],time:'3 hr',method:'Stovetop · slow braise',blurb:"Often voted the world's most delicious dish — beef cloaked in toasted spice, slow-cooked till almost candied.",
  prov:{popular_in:"West Sumatra, Indonesia — the Minangkabau heartland; across Southeast Asia and celebrations worldwide",famous_for:"Often voted the world's most delicious dish — a dry curry cooked down for hours until cloaked in toasted spice",consists_of:"Beef in coconut milk with lemongrass, galangal, ginger, garlic, chilli, makrut lime and a roasted spice paste (rempah)",name_origin:"From the Minang word 'randang' — the slow reduction turning a wet braise dry. The name describes the technique.",why_loved:"Patience is the ingredient: hours concentrate flavour and tenderise the beef until almost candied; improves overnight",method_detail:"Stovetop — slow braise-reduction"}},
 {t:'Bobotie',tier:'premium',cui:'South African · Cape Malay',occ:['host','date'],time:'75 min',method:'Oven · bake',blurb:"South Africa's national dish — spiced beef mince baked under a golden, custardy topping.",
  prov:{popular_in:"South Africa — widely regarded as the national dish; rooted in the Cape Malay kitchen",famous_for:"SA's sweet-savourory comfort classic — spiced beef mince baked under a golden custard topping",consists_of:"Beef mince with curry spices, chutney, sultanas and vinegar, topped with a milk-and-egg custard and bay leaves",name_origin:"From the Malay 'botok' — a steamed spiced meat dish; the Cape version was baked under custard",why_loved:"One pan, deeply aromatic, stretches to feed a table — the sweet-sharp-spice balance is unmistakably South African",method_detail:"Oven — bake"}},
 {t:'Beef Bourguignon',tier:'premium',cui:'French · Burgundy',occ:['host','date'],time:'3 hr',method:'Stovetop & oven · braise',blurb:"Burgundy's famous beef braise — tender, wine-dark, deeply comforting. Improves overnight."},
 {t:'Peking Duck',tier:'premium',cui:'Chinese · Beijing',occ:['host','date'],time:'4 hr',method:'Oven · roast',blurb:"Lacquered, crisp-skinned, ceremonial — Beijing's imperial roast, the showpiece for a table."},
 {t:'Lamb Kleftiko',tier:'premium',cui:'Greek',occ:['host'],time:'3 hr',method:'Oven · slow roast',blurb:"Slow-roasted lamb, sealed with herbs until it falls from the bone — Greek hospitality in a parcel."},
 {t:'Grilled Crayfish, Garlic Butter',tier:'premium',cui:'South African',occ:['date','host'],time:'20 min',method:'Grill',blurb:"Atlantic crayfish, split and grilled, swimming in garlic butter — coastal South African luxury."},

 {t:'Butter Chicken',tier:'global',cui:'Indian · Delhi',occ:['solo','date'],time:'45 min',method:'Stovetop · simmer',blurb:'The creamy, tomato-fragrant curry that converted the world — mild, rich, the gentle gateway.',
  prov:{popular_in:"Delhi, India — invented at Moti Mahal in the 1940s; now global",famous_for:"The creamy, tomato-fragrant curry that converted the world to Indian food",consists_of:"Tandoori-style chicken in a velvety sauce of tomato, butter, cream and warming spices",name_origin:"Known as 'murgh makhani' — 'butter chicken'; the name is the recipe",why_loved:"Mild, rich and crowd-pleasing — the gentle gateway curry that never fails a table",method_detail:"Stovetop — simmer"}},
 {t:'Pad Thai',tier:'global',cui:'Thai',occ:['solo','date'],time:'25 min',method:'Stovetop · stir-fry',blurb:"Thailand's national noodle — sweet, sour, salty, smoky from a ripping-hot wok."},
 {t:'Tacos al Pastor',tier:'global',cui:'Mexican',occ:['solo','date','host'],time:'90 min',method:'Stovetop & grill',blurb:"Lebanese roots, Mexican soul — chile-marinated pork, charred crisp, with pineapple and lime."},
 {t:'Tonkotsu Ramen',tier:'global',cui:'Japanese',occ:['solo','date'],time:'4 hr',method:'Stovetop · simmer',blurb:'Pork-bone broth, milky and profound, over springy noodles — the bowl that turns a night into a ritual.'},
 {t:'Spaghetti Bolognese',tier:'global',cui:'Italian',occ:['solo','date'],time:'90 min',method:'Stovetop · simmer',blurb:'The slow ragù everyone loves — rich, deep, the comfort benchmark done right.'},

 {t:'Khao Soi',tier:'exotic',cui:'Thai · Lanna',occ:['solo','date'],time:'60 min',method:'Stovetop · simmer & fry',blurb:"Northern Thailand's coconut curry noodles — crispy and soft, deep and golden. Worth the detour."},
 {t:'Massaman Curry',tier:'exotic',cui:'Thai · Malay',occ:['date','host'],time:'90 min',method:'Stovetop · braise',blurb:"The gentle, aromatic curry of the south — warm spice, peanut, tender beef. Mild for a cautious table."},
 {t:'Pho Bo',tier:'exotic',cui:'Vietnamese',occ:['solo','date'],time:'3 hr',method:'Stovetop · simmer',blurb:"Hanoi's fragrant beef noodle soup — clear spiced broth, rare beef, a riot of fresh herbs."},
 {t:'Moussaka',tier:'exotic',cui:'Greek',occ:['host','date'],time:'2 hr',method:'Oven · bake',blurb:'Layered aubergine, spiced lamb, silky béchamel — Greece’s baked showpiece, golden and deep.'},
 {t:'Jollof Rice',tier:'exotic',cui:'West African',occ:['solo','date','host'],time:'75 min',method:'Stovetop · simmer',blurb:'Smoky, tomato-rich, celebratory — the West African rice that feeds every gathering.'},

 {t:'Tiramisu',tier:'others',cui:'Italian',occ:['date','host'],time:'30 min + chill',method:'No-cook · assemble',blurb:'Coffee-soaked, mascarpone-cloud, dusted with cocoa — the no-bake closer that ends the evening.'},
 {t:'Crème Brûlée',tier:'others',cui:'French',occ:['date'],time:'45 min + chill',method:'Oven · bain-marie',blurb:'Cold custard, crackling burnt-sugar lid — the restaurant dessert mastered with a blowtorch.'},
 {t:'Malva Pudding',tier:'others',cui:'South African',occ:['host'],time:'60 min',method:'Oven · bake',blurb:'Warm, sponge-soft, drowning in cream sauce — the South African pudding that ends a braai.'}
];
R.forEach(r=>{if(!r.slug)r.slug=r.t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');r.tierName=TIERS[r.tier].n;r.tierColor=TIERS[r.tier].c;r.live=FULL[r.slug]?'full':(r.prov?'prov':null);if(!r.diff)r.diff='Med';});
/* merge authored research recipes, then rebuild the roster around them */
if(window.GLOBAL_EXOTIC_BATCH){GLOBAL_EXOTIC_BATCH.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});}
if(window.PREMIUM_BATCH){PREMIUM_BATCH.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});}
if(window.RECIPES){RECIPES.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});
 const _COMING=[{t:'Tiramisu',tier:'others',cui:'Italian',occ:['date','host'],time:'30 min + chill',method:'No-cook · assemble',blurb:'Coffee-soaked, mascarpone-cloud, dusted with cocoa — the no-bake closer.'},{t:'Crème Brûlée',tier:'others',cui:'French',occ:['date'],time:'45 min + chill',method:'Oven · bain-marie',blurb:'Cold custard, a crackling burnt-sugar lid — mastered with a blowtorch.'},{t:'Malva Pudding',tier:'others',cui:'South African',occ:['host'],time:'60 min',method:'Oven · bake',blurb:'Warm, sponge-soft, drowning in cream sauce — the SA pudding that ends a braai.'},{t:'Mango Sticky Rice',tier:'others',cui:'Thai',occ:['date'],time:'40 min + soak',method:'Stovetop · steam',blurb:'Coconut-sticky rice with sun-yellow mango — Thailand’s sweet finish.'},{t:'Churros & Chocolate',tier:'others',cui:'Spanish',occ:['solo','date'],time:'30 min',method:'Stovetop · deep-fry',blurb:'Crisp ridged batons, rolled in sugar, with a cup of dark chocolate.'}];
 const _TO={signature:1,premium:2,global:3,exotic:4,others:5};
 let _all=[...Object.values(FULL)];
 [window.COMPENDIUM,window.BATCH5,window.FOUNDATION_BATCH].forEach(function(src){if(src)src.forEach(function(r){if(r&&r.slug&&!FULL[r.slug]&&!_all.find(x=>x.slug===r.slug))_all.push(r);});});
 _COMING.forEach(c=>{if(!_all.find(x=>x.t===c.t))_all.push(c);});
 R=_all.sort((a,b)=>(_TO[a.tier]||9)-(_TO[b.tier]||9)||a.t.localeCompare(b.t));
 R.forEach(r=>{if(!r.slug)r.slug=r.t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');r.tierName=TIERS[r.tier].n;r.tierColor=TIERS[r.tier].c;r.live=(FULL[r.slug]&&FULL[r.slug].ing)?'full':(r.key_ings?'comp':(r.prov?'prov':null));r.region=window.regionOf?regionOf(r.cui):'mediterranean';if(!r.diff)r.diff='Med';});
}

/* ── state ── */
let activeOcc='solo',activeFilter='all',activeRegion='all',query='',savedScroll=0;
const FILTERS=[{k:'all',l:'All'},{k:'signature',l:'Signature'},{k:'premium',l:'Premium'},{k:'global',l:'Global'},{k:'exotic',l:'Exotic'},{k:'others',l:'Others'}];

function renderFilters(){
  const f=document.getElementById('filters');
  if(query){f.innerHTML='';return;}
  const tiers=FILTERS.map(x=>`<button class="fchip ${x.k===activeFilter?'active':''}" onclick="setFilter('${x.k}')">${x.l}</button>`).join('');
  const regs=(window.REGIONS||[]).map(x=>`<button class="fchip rchip ${x.id===activeRegion?'active':''}" onclick="setRegion('${x.id}')" title="${x.blurb}">${x.emoji} ${x.short}</button>`).join('');
  f.innerHTML='<div class="frow">'+tiers+'</div>'+(regs?'<div class="frow"><span class="flab">Region</span>'+regs+'<button class="fchip '+(activeRegion==='all'?'active':'')+'" onclick="setRegion(\'all\')">All</button></div>':'');
}
function setFilter(k){activeFilter=k;renderFilters();renderGrid();}
function setRegion(k){activeRegion=k;renderFilters();renderGrid();}
function viewHead(){
  const vn=document.getElementById('vh-num'),t=document.getElementById('vh-title'),d=document.getElementById('vh-desc');
  if(query){
    const n=countGrid();
    vn.textContent='Search';t.textContent=`“${query}”`;d.textContent=n+' dish'+(n===1?'':'es')+' across the library';
  }else if(activeOcc==='pantry'){vn.textContent='04 — From my pantry';t.textContent='From my pantry';d.textContent='Add what you have on hand — every dish ranks by how much you can make right now.';}else{const o=OCC[activeOcc];vn.textContent=o.n+' — '+o.t;t.textContent=o.t;d.textContent=o.d;}
}
function countGrid(){return gridItems().length;}
function gridItems(){
  let items;
  if(activeOcc==='pantry'){items=pantryItems();}
  else{items=query?[...R]:R.filter(r=>r.occ.includes(activeOcc));if(!query&&activeFilter!=='all')items=items.filter(r=>r.tier===activeFilter);}
  if(activeRegion!=='all')items=items.filter(r=>r.region===activeRegion);
  if(query){const q=query.toLowerCase();items=items.filter(r=>(r.t+' '+r.cui+' '+r.blurb+' '+r.tierName+' '+r.occ.join(' ')).toLowerCase().includes(q));}
  return items;
}
function renderGrid(){
  renderPantryBar();
  const items=gridItems();const g=document.getElementById('grid');
  if(!items.length){const msg=(activeOcc==='pantry'&&pantry.size)?'No dishes match your pantry — untick “only what I can make now”, or add more ingredients.':'No dishes match <b>“'+(query||activeFilter)+'”</b> here — try another occasion or clear the search.';g.innerHTML=`<div class=”empty”>${msg}</div>`;return;}
  g.innerHTML=items.map(cardHTML).join('');
}
function cardHTML(r){
  return `<article class="card" tabindex="0" onclick="openRecipe('${r.slug}')" onkeydown="if(event.key==='Enter'||event.key===' ')openRecipe('${r.slug}')" style="--cardc:${r.tierColor}33">
    <div class="thumb"><div class="glow"></div>${(window.IMAGES&&IMAGES[r.slug])?'<img class="thumb-img" src="'+IMAGES[r.slug]+'" alt="" onerror="this.remove()">':''}<div class="ph">${PLATE}</div>
      <span class="badge"><span class="td" style="background:${r.tierColor}"></span>${r.tierName}</span>
      ${r.live==='full'?`<span class="live">Full cook ▸</span>`:r.live==='comp'?`<span class="live">Compendium ▸</span>`:r.live==='prov'?`<span class="live">Story ▸</span>`:''}
    </div>
    <div class="body">${pmHTML(r)}<h3>${r.t}</h3><p class="blurb">${r.blurb}</p>
      <div class="meta"><span><b>${r.cui}</b></span><span class="dot"></span><span class="region-tag">${regionLabel(r.region)||''}</span><span class="dot"></span><span class="num">${r.time}</span><span class="dot"></span><span>${r.method}</span></div>
    </div></article>`;
}
function filterCards(){query=document.getElementById('q').value.trim();document.getElementById('qx').classList.toggle('on',query.length>0);viewHead();renderFilters();renderGrid();}
function clearSearch(){query='';document.getElementById('q').value='';document.getElementById('qx').classList.remove('on');document.getElementById('q').focus();viewHead();renderFilters();renderGrid();}

/* ── pantry / fridge finder (cook from what you have) ── */
let pantry=new Set(),pantryResults={},pantryStrict=false;
function normIngr(name){return (name||'').replace(/<[^>]+>/g,'').split(/[,([–\-/]/)[0].replace(/\b(freshly|finely|coarsely|roughly|chopped|sliced|minced|diced|crushed|ground|grated|peeled|large|small|whole|softened|cold|hot|warm|optional|frozen|canned|tinned|raw|dried|fresh|extra|good|quality|free-range|boneless|skinless)\b/g,' ').replace(/\b\d+(\.\d+)?\s?(g|ml|kg|tbsp|tsp|cup|cups|cloves|sprigs|sheets)\b/g,' ').replace(/\s+/g,' ').trim().toLowerCase();}
function recipeIngs(r){
  const out=[];
  if(r.ing&&r.ing.length){r.ing.forEach(g=>(g[1]||[]).forEach(it=>{const raw=it[3]||it[2]||'';if(raw&&raw.length>2)out.push(normIngr(raw));}));}
  else if(r.key_ings&&r.key_ings.length){r.key_ings.forEach(k=>{if(k&&k.length>2)out.push(normIngr(k));});}
  return out.filter(x=>x&&!/^(to taste|optional|garnish|serve|serving|extra|a kn|pinch|stock cube)/.test(x));
}
function pantryMatch(r){
  const list=recipeIngs(r);
  if(!list.length)return{have:0,total:0,missing:[]};
  const pa=Array.from(pantry);
  let have=0;const missing=[];
  list.forEach(n=>{const hit=pa.some(p=>{if(!p)return false;if(n.includes(p))return true;const fw=n.split(' ')[0];return fw.length>2&&p.includes(fw);});if(hit)have++;else missing.push(n);});
  return{have,total:list.length,missing};
}
function pmScore(pm){if(!pm.total||pm.have===0)return -1;const ratio=pm.have/pm.total,miss=pm.missing.length;if(miss===0)return 100000+pm.total;if(miss<=2)return 50000+(3-miss)*1000+Math.round(ratio*100);return Math.round(ratio*1000);}
function pantryItems(){
  if(pantry.size===0)return R.filter(r=>r.ing||r.key_ings);
  pantryResults={};
  let arr=R.filter(r=>r.ing||r.key_ings);arr.forEach(r=>{pantryResults[r.slug]=pantryMatch(r);});
  arr.sort((a,b)=>pmScore(pantryResults[b.slug])-pmScore(pantryResults[a.slug]));
  arr=pantryStrict?arr.filter(r=>pantryResults[r.slug].missing.length===0):arr.filter(r=>pantryResults[r.slug].have>0);
  return arr;
}
function addPantry(v){v=(v||'').trim().toLowerCase();if(v.length>1&&!pantry.has(v)){pantry.add(v);savePantry();if(activeOcc==='pantry'){renderPantryBar();renderGrid();}}}
function rmPantry(v){pantry.delete(v);savePantry();if(activeOcc==='pantry'){renderPantryBar();renderGrid();}}
function clrPantry(){pantry.clear();savePantry();if(activeOcc==='pantry'){renderPantryBar();renderGrid();}}
function savePantry(){try{localStorage.setItem('tub_pantry',JSON.stringify([...pantry]));}catch(e){}}
function loadPantry(){try{const s=localStorage.getItem('tub_pantry');if(s)JSON.parse(s).forEach(x=>pantry.add(x));}catch(e){}}
function pmHTML(r){const pm=(activeOcc==='pantry'&&pantry.size>0)?pantryResults[r.slug]:null;if(!pm||!pm.total)return'';const pct=Math.round(pm.have/pm.total*100),miss=pm.missing.length;const status=miss===0?'Cook this tonight':miss<=2?'Almost there':'You have '+pm.have+' of '+pm.total;return '<div class="pmatch '+(miss===0?'full':miss<=2?'near':'')+'"><span class="pm-bar"><span style="width:'+pct+'%"></span></span><span class="pm-txt">'+status+'</span>'+(miss?'<span class="pm-miss">add: '+pm.missing.slice(0,4).join(', ')+(miss>4?'…':'')+'</span>':'')+'</div>';}
function renderPantryBar(){
  const bar=document.getElementById('pantry-bar');if(!bar)return;
  if(activeOcc!=='pantry'){bar.style.display='none';bar.innerHTML='';return;}
  bar.style.display='block';
  const chips=[...pantry].map(function(p){return '<span class="pchip">'+p+'<span class="prmx" onclick="rmPantry(\''+p.replace(/'/g,"\\'")+'\')">✕</span></span>';}).join('');
  const quick=['chicken','beef mince','eggs','onion','garlic','tomato','pasta','rice','potato','lemon','butter','cream','spinach','mushroom','prawns','salmon','cheese','coriander'].filter(function(q){return !pantry.has(q);}).slice(0,11).map(function(q){return '<button class="qadd" onclick="addPantry(\''+q+'\')">+ '+q+'</button>';}).join('');
  bar.innerHTML='<div class="pbar"><div class="pinput"><span class="ic">⌕</span><input id="ping" placeholder="Add an ingredient you have — chicken, garlic, cream…" onkeydown="if(event.key===\'Enter\'){addPantry(this.value);this.value=\'\';}"><button onclick="var i=document.getElementById(\'ping\');addPantry(i.value);i.value=\'\';">Add</button></div><div class="pchips">'+(chips||'<span class="pempty">Your pantry’s empty — add what you’ve got, or tap a quick-add below.</span>')+'</div>'+(quick?'<div class="qadds"><span class="label">Quick add</span>'+quick+'</div>':'')+'<div class="pctrls"><label class="pstrict"><input type="checkbox" id="pstrict" '+(pantryStrict?'checked':'')+' onchange="pantryStrict=this.checked;renderGrid();"> Only show what I can make now</label>'+(pantry.size?'<button class="btn ghost small" onclick="clrPantry()">Clear pantry</button>':'')+'</div></div>';
}

function cookTonight(){const b=document.querySelector('.occ-btn[data-occ="pantry"]');if(!b)return;document.querySelectorAll('.occ-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeOcc='pantry';query='';const q=document.getElementById('q');if(q)q.value='';const qx=document.getElementById('qx');if(qx)qx.classList.remove('on');activeFilter='all';activeRegion='all';viewHead();renderFilters();renderGrid();const vh=document.querySelector('.view-head');if(vh)vh.scrollIntoView({behavior:'smooth',block:'start'});}

/* detail */
function openRecipe(slug){const r=R.find(x=>x.slug===slug);if(!r)return;savedScroll=window.scrollY;if(FULL[slug]&&FULL[slug].ing)renderFull(FULL[slug]);else if(r.key_ings)renderCompendium(r);else renderProv(r);}
function provHTML(p){
  if(!p)return'';
  const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  const end=s=>{s=(s||'').trim();return /[.!?]$/.test(s)?s:s+'.';};
  const para=`${end(cap(p.popular_in))} ${end(p.famous_for)} It's made of ${(p.consists_of||'').charAt(0).toLowerCase()+(p.consists_of||'').slice(1)}. ${end(cap(p.name_origin))} ${end(p.why_loved)}`;
  return `<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Provenance</span><h2>Where it comes from</h2><span class="rule"></span></div>
   <div class="prov-p-wrap"><p class="prov-p">${gloss(para)}</p><span class="mchip">⬢ ${p.method_detail}</span></div></div></div>`;
}
function dheroHTML(r,eb){return `<header class="dhero"><div class="stage"></div>${(window.IMAGES&&IMAGES[r.slug])?'<img class="hero-img" src="'+IMAGES[r.slug]+'" alt="" onerror="this.remove()">':''}<div class="spot"></div><div class="wrap inner">
  <div class="eb">${eb}</div><h1>${r.t}</h1><p class="dsub">${gloss(r.blurb)}</p>
  <div class="dmeta"><span class="dchip"><b>${r.cui}</b></span><span class="dchip">Time · <b>${r.time}</b></span><span class="dchip">Method · <b>${r.method}</b></span><span class="dchip">Difficulty · <b>${r.diff}</b></span><span class="dchip">Occasion · <b>${r.occ.join(' · ')}</b></span></div>
</div></header>`;}
function nutritionHTML(slug){const n=window.NUTRITION&&NUTRITION[slug];if(!n)return'';const diet=(n.diet||[]).map(function(d){return '<span class="dtag">'+d+'</span>';}).join('');return '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Per serving</span><h2>Nutrition</h2><span class="rule"></span></div><div class="nutri"><div class="nbig"><div class="nbig-n num">'+n.kcal+'</div><div class="nbig-u">kcal &middot; '+(n.kJ||Math.round(n.kcal*4.184))+' kJ</div></div><div class="nmacros"><div class="nmacro"><div class="nm-v num">'+n.protein+'<small>g</small></div><div class="nm-l">Protein</div></div><div class="nmacro"><div class="nm-v num">'+n.carbs+'<small>g</small></div><div class="nm-l">Carbs</div></div><div class="nmacro"><div class="nm-v num">'+n.fat+'<small>g</small></div><div class="nm-l">Fat</div></div></div>'+(diet?'<div class="ndiet">'+diet+'</div>':'')+'</div></div></div>';}
/* glossary — wraps known cooking terms in tooltips (only on plain prose, never on strings already containing HTML) */
var _GK=null;
function gloss(str){
  if(!window.GLOSS||typeof str!=='string'||str.indexOf('>')>-1)return str;
  if(!_GK){var keys=Object.keys(GLOSS).sort(function(a,b){return b.length-a.length;});
    var esc=function(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');};
    var low={};keys.forEach(function(k){low[k.toLowerCase()]=GLOSS[k];});
    _GK={re:new RegExp('(?<![a-z])('+keys.map(esc).join('|')+')(?![a-z])','gi'),low:low};}
  return str.replace(_GK.re,function(m){var d=_GK.low[m.toLowerCase()];return d?'<abbr class="term" title="'+d.replace(/"/g,'&quot;')+'">'+m+'</abbr>':m;});
}
/* SA-local tips & callouts section */
function tipsHTML(slug){var t=window.TIPS&&TIPS[slug];if(!t)return'';
 var subs=(t.subs||[]).map(function(s){return '<div class="sub"><span class="o"><b>'+s[0]+'</b></span><span class="l">'+(s[1]||'')+'</span></div>';}).join('');
 var tips=(t.tips||[]).map(function(x){return '<li>'+x+'</li>';}).join('');
 var co=(t.callouts||[]).map(function(c){return '<div class="callout"><h5>'+c[0]+'</h5><p>'+c[1]+'</p></div>';}).join('');
 return '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Cooking in South Africa</span><h2>Local tips &amp; callouts</h2><span class="rule"></span></div><div class="tips-wrap">'
  +(t.sa_notes?'<p class="sa-notes">'+t.sa_notes+'</p>':'')
  +(subs?'<div><div class="tips-sub-h">Local replacements</div><div class="subs">'+subs+'</div></div>':'')
  +(tips?'<div><div class="tips-sub-h">Technique tips</div><ul class="tiplist">'+tips+'</ul></div>':'')
  +(co?'<div><div class="tips-sub-h">Callouts</div><div class="callouts">'+co+'</div></div>':'')
  +'</div></div></div>';}
function renderFull(r){
  document.getElementById('d-tier').textContent=r.tierName+' · '+r.cui;
  var brief=`<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Before you start</span><h2>The brief</h2><span class="rule"></span></div>
    <div class="brief"><div><p class="lead">${gloss(r.brief.lead)}</p>
      <ul class="expect">${r.brief.expect.map(e=>`<li><span class="ic">◆</span><span><b>${e[0]}</b> ${e[1]}</span></li>`).join('')}</ul></div>
      <div class="statcard"><div class="g">${r.brief.stats.map(s=>`<div class="cell"><div class="n num">${s[0]}${s[1]?'<small>'+s[1]+'</small>':''}</div><div class="l">${s[2]}</div></div>`).join('')}</div>
      <div class="kit"><span class="label">Kit you'll want</span><div class="tags">${r.brief.kit.map(k=>`<span>${k}</span>`).join('')}</div></div></div></div></div></div>`;
  var mise=`<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Get ready</span><h2>Ingredients &amp; preparations</h2><span class="rule"></span></div><p class="dsub">Everything you need, already scaled to your servings — read it through, tick items off as you set them out, then follow the cook itself, timed step by step from start to serve.</p>
    <div class="cookgrid"><div><div class="scaler" role="group" aria-label="Servings"><span class="lbl">Serves</span>
      <button data-serv="1">1</button><button data-serv="2" aria-pressed="true">2</button><button data-serv="4">4</button><button data-serv="6">6</button></div><div id="ings"></div></div>
      <div><h4 class="label" style="margin:0 0 12px">Timeline</h4><div class="timeline">${r.tl.map(t=>`<div class="tl ${t[3]?'passive':''}"><div class="t t-num">${t[0]}</div><div class="b"><div class="ttl">${t[1]}</div><div class="d">${t[2]}${t[3]?' <span class="tag">passive</span>':''}</div></div></div>`).join('')}</div></div></div></div></div>`;
  var steps=`<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Step by step</span><h2>Guided cook</h2><span class="rule"></span></div>
    <button class="btn primary cookstart" onclick="startCook('${r.slug}')">▶ Start guided cook — step through, hands-free</button>
    <div class="steps" id="steps">${r.steps.map(s=>`<div class="step"><div class="n"></div><div class="body"><h4>${s[0]}</h4><p>${gloss(s[1])}</p><div class="why"><b>WHY</b> · ${gloss(s[2])}</div>
      <div class="ctrls">${s[3]?`<button class="timerbtn" data-sec="${s[3]}"><span class="tm">${fmtClock(s[3])}</span> timer</button>`:''}<span class="check"><span class="bx"></span> done</span></div></div></div>`).join('')}</div></div></div>`;
  var pair=`<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">To drink</span><h2>The pairing</h2><span class="rule"></span></div>
    <div class="pair">${r.pair.map(p=>`<div class="pcard"><div class="kind">${p[0]}</div><h3>${p[1]}</h3><div class="bot">${p[2]}</div><p>${p[3]}</p></div>`).join('')}</div></div></div>`;
  document.getElementById('detail-body').innerHTML=dheroHTML(r,'Collection — '+r.tierName)+
    '<div class="rtabs-wrap"><div class="wrap rtabs"><button class="rtab active" data-t="cook" onclick="switchRecipeTab(\'cook\')">Cook</button><button class="rtab" data-t="story" onclick="switchRecipeTab(\'story\')">Story</button><button class="rtab" data-t="learn" onclick="switchRecipeTab(\'learn\')">Learn</button></div></div>'+
    '<div id="rtab-cook" class="rtabpane"><div id="variants"></div>'+brief+mise+steps+'</div>'+
    '<div id="rtab-story" class="rtabpane" style="display:none">'+provHTML(r.prov)+nomenHTML(r.slug)+platingHTML(r)+pair+'</div>'+
    '<div id="rtab-learn" class="rtabpane" style="display:none">'+masterclassHTML(r)+tipsHTML(r.slug)+subsHTML(r)+nutritionHTML(r.slug)+'</div>';
  renderIgs(r.ing);renderVariants(r);wireDetail();showDetail();switchRecipeTab('cook');
}
function switchRecipeTab(tab){['cook','story','learn'].forEach(function(t){var el=document.getElementById('rtab-'+t);if(el)el.style.display=(t===tab?'block':'none');});document.querySelectorAll('.rtab').forEach(function(b){b.classList.toggle('active',b.dataset.t===tab);});var d=document.getElementById('detail');if(d)d.scrollTop=0;}
function nomenHTML(slug){var n=window.NOMEN&&NOMEN[slug];if(!n)return'';var row=function(k,v){return v?'<div class="nom-row"><span class="nom-k">'+k+'</span><span class="nom-v">'+v+'</span></div>':'';};return '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Name &amp; meaning</span><h2>'+(n.english||'Translation')+'</h2><span class="rule"></span></div><div class="nomen">'+row('Literally',n.direct)+row('Found in',n.predominant_in)+row('The language',n.linguistic)+row('Why it matters',n.cultural)+row('Recognise it',n.recognise)+'</div></div></div>';}
function platingHTML(r){var p=r.plating||(r.steps&&r.steps.length?r.steps[r.steps.length-1][1]:'');if(!p)return'';return '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">To serve</span><h2>Plating</h2><span class="rule"></span></div><p class="plate-p">'+gloss(p)+'</p></div></div>';}
function masterclassHTML(r){var M=window.MASTERCLASS||[];var m=M.find(function(x){return x.dishes&&x.dishes.indexOf(r.slug)>-1;});if(!m){var c=(''+(r.method||'')).toLowerCase();m=M.find(function(x){return c.indexOf((x.id||'').split('-')[0])>-1;});}if(!m)return'';return '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Technique</span><h2>'+(m.term||'')+' — masterclass</h2><span class="rule"></span></div><div class="mc-card">'+(m.native?'<div class="mc-nat">'+m.native+'</div>':'')+(m.why?'<p class="mc-why"><b>The science —</b> '+m.why+'</p>':'')+(m.wisdom?'<p class="mc-wis"><b>Wisdom —</b> '+m.wisdom+'</p>':'')+(m.mastery&&m.mastery.length?'<div class="mc-mast"><span class="tips-sub-h">Mastery</span><ol class="mc-ol">'+m.mastery.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ol></div>':'')+(m.mistakes&&m.mistakes.length?'<div class="mc-mast"><span class="tips-sub-h">Common mistakes</span><ul class="amc-ul">'+m.mistakes.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ul></div>':'')+'<button class="btn ghost" onclick="openMethods();setTimeout(function(){renderLearnTab(\'master\');},30)">Open full masterclass →</button></div></div></div>';}
function findSubs(raw){var S=window.SUBS||{};var nm=normIngr(raw);if(!nm)return null;if(S[nm])return {k:nm,s:S[nm]};for(var k in S){if(nm.indexOf(k)>-1)return {k:k,s:S[k]};}return null;}
function subsHTML(r){if(!window.SUBS||!r.ing)return'';var seen={},rows=[];r.ing.forEach(function(g){g[1].forEach(function(it){var raw=it[3]||it[2]||'';var f=findSubs(raw);if(f&&!seen[f.k]){seen[f.k]=1;var s=f.s;var alts=(s.alts||[]).map(function(a){return '<span class="sub-a"><b>'+a[0]+'</b> — '+a[1]+'</span>';}).join('');var sa=(s.sa||[]).map(function(a){return a[0]+' &rarr; '+a[1];}).join('; ');rows.push('<div class="sub-row"><span class="sub-i">'+f.k+'</span><div class="sub-alts">'+alts+(sa?'<span class="sub-sa">SA: '+sa+'</span>':'')+'</div></div>');}});});if(!rows.length)return'';return '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Can\'t find it?</span><h2>Ingredient alternatives</h2><span class="rule"></span></div><div class="subs2">'+rows.join('')+'</div></div></div>';}
function renderCompendium(r){
  document.getElementById('d-tier').textContent=r.tierName+' · '+r.cui;
  var ings=(r.key_ings||[]).map(function(i){return '<li>'+i+'</li>';}).join('');
  var cells=[['Time',r.time||'—'],['Skill',r.diff||'—'],['Course',r.course||'main'],['Method',r.method||'—']].map(function(c){return '<div class="cell"><div class="n num">'+c[1]+'</div><div class="l">'+c[0]+'</div></div>';}).join('');
  document.getElementById('detail-body').innerHTML=dheroHTML(r,'Collection — '+r.tierName)+provHTML(r.prov)+
    '<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">At a glance</span><h2>What it is</h2><span class="rule"></span></div>'+
    '<div class="cmp"><div><span class="tips-sub-h">Key ingredients</span><ul class="cmp-list">'+ings+'</ul></div>'+
    '<div class="statcard"><div class="g">'+cells+'</div></div>'+(r.pairing?'<p class="cmp-pair">'+r.pairing+'</p>':'')+'</div></div></div></div>'+
    tipsHTML(r.slug)+nutritionHTML(r.slug)+
    '<div class="dsection"><div class="wrap"><div class="coming"><b>The full step-by-step guided cook is being written.</b><br>Provenance, key ingredients, pairing and nutrition are here now — the timed, scaled cook is on the way.<div style="margin-top:18px"><button class="btn primary" onclick="openRecipe(\'steak\')">See the benchmark cook →</button> <button class="btn ghost" onclick="goBrowse()">Back to library</button></div></div></div></div>';
  showDetail();
}
function renderProv(r){
  document.getElementById('d-tier').textContent=r.tierName+' · '+r.cui;
  document.getElementById('detail-body').innerHTML=dheroHTML(r,'Collection — '+r.tierName)+provHTML(r.prov)+
  `<div class="dsection"><div class="wrap"><div class="coming"><b>The full guided cook is being written.</b><br>Brief, scaled ingredients, parallel-timed steps, "why" callouts and a drink pairing — to the same bar as the Signature pages.
    <div style="margin-top:18px"><button class="btn primary" onclick="openRecipe('steak')">See the benchmark cook →</button> <button class="btn ghost" onclick="goBrowse()">Back to library</button></div></div></div></div>`;
  showDetail();
}
function showDetail(){document.getElementById('detail').classList.add('open');document.getElementById('browse').style.display='none';document.getElementById('detail').scrollTop=0;window.scrollTo(0,0);}
function goBrowse(){document.getElementById('detail').classList.remove('open');document.getElementById('detail-body').innerHTML='';document.getElementById('browse').style.display='block';window.scrollTo(0,savedScroll);}

/* ── methods & culinary terms hub ── */
function _allCulinary(){var C={};[window.METHODS,window.EXTRA,window.CULINARY].forEach(function(s){if(s)Object.keys(s).forEach(function(k){C[k]=s[k];});});return C;}
var _CATS=[['stovetop','On the stove'],['oven','In the oven & over fire'],['smoke','Smoke'],['preserve','Preserve & cure'],['mix','Mix & combine'],['bake','Dough & baking'],['technique','Technique'],['finish','Finish & glaze'],['prep','Knife & prep'],['phrase','Recipe phrases & doneness'],['chef','Chef & restaurant French'],['european','European styles'],['american','American'],['spanish','Spanish'],['portuguese','Portuguese'],['greek','Greek'],['sa','South African'],['chinese','Chinese'],['japanese','Japanese'],['asian-technique','East-Asian technique'],['asian-sauce','Asian sauces & glazes'],['thai','Thai'],['indian-method','Indian cooking methods'],['indian-sauce','Indian curry & sauce styles'],['indian-dish','Indian dishes'],['indian-ingredient','Indian ingredient words']];
function _mitem(m){return '<div class="mitem"><div class="mt"><span class="mt-t">'+m.term+'</span>'+(m.pron?'<span class="mt-pn">/'+m.pron+'/</span>':'')+(m.origin?'<span class="mt-o">'+m.origin+'</span>':'')+'</div><div class="mt-p">'+m.plain+'</div></div>';}
function methodsListHTML(q){
  var all=_allCulinary(),ql=(q||'').toLowerCase();
  var used={};_CATS.forEach(function(c){used[c[0]]=1;});
  function itemsFor(cat){return Object.keys(all).filter(function(k){var m=all[k];return m.cat===cat&&(!ql||(m.term+' '+m.origin+' '+m.plain+' '+(m.pron||'')).toLowerCase().indexOf(ql)>-1);}).map(function(k){return all[k];}).sort(function(a,b){return a.term.localeCompare(b.term);});}
  function group(label,items){return items.length?'<div class="mgroup"><h3>'+label+' <span class="mc">'+items.length+'</span></h3><div class="mitems">'+items.map(_mitem).join('')+'</div></div>':'';}
  var html=_CATS.map(function(c){return group(c[1],itemsFor(c[0]));}).filter(Boolean).join('');
  var unkCats={};Object.keys(all).forEach(function(k){var cat=all[k].cat;if(!used[cat])(unkCats[cat]=unkCats[cat]||[]).push(all[k]);});
  html+=Object.keys(unkCats).sort().map(function(cat){var items=unkCats[cat].filter(function(m){return !ql||(m.term+' '+m.origin+' '+m.plain).toLowerCase().indexOf(ql)>-1;}).sort(function(a,b){return a.term.localeCompare(b.term);});return group(cat,items);}).filter(Boolean).join('');
  return html||'<div class="empty">No terms match “'+q+'”.</div>';
}
function filterMethods(q){var el=document.getElementById('methods-list');if(el)el.innerHTML=methodsListHTML(q);}
function openMethods(){
  document.getElementById('browse').style.display='none';
  document.getElementById('detail').classList.remove('open');
  document.getElementById('methods').classList.add('open');
  var mst=window.MASTERCLASS&&MASTERCLASS.length;
  document.getElementById('methods-body').innerHTML='<div class="ltabs"><button class="ltab active" data-t="atlas" onclick="renderLearnTab(\'atlas\')">Flavour atlas</button><button class="ltab" data-t="terms" onclick="renderLearnTab(\'terms\')">Methods &amp; terms</button>'+(mst?'<button class="ltab" data-t="master" onclick="renderLearnTab(\'master\')">Masterclass</button>':'')+'</div><div id="lcontent"></div>';
  renderLearnTab('atlas');
  window.scrollTo(0,0);
}
function renderLearnTab(tab){
  document.querySelectorAll('.ltab').forEach(function(b){b.classList.toggle('active',b.dataset.t===tab);});
  var c=document.getElementById('lcontent');if(!c)return;
  if(tab==='atlas')c.innerHTML=renderAtlas();
  else if(tab==='master')c.innerHTML=renderMaster();
  else c.innerHTML='<div class="msearch"><span>⌕</span><input id="mq" placeholder="Search methods & terms — sauté, tadka, wok hei, en papillote…" oninput="filterMethods(this.value)"></div><div id="methods-list">'+methodsListHTML('')+'</div>';
  if(tab==='terms'){var i=document.getElementById('mq');if(i)i.focus();}
  window.scrollTo(0,0);
}
function renderAtlas(){
  var T=window.THEMES||[];
  if(!T.length)return '<div class="empty">The flavour atlas is being written.</div>';
  return '<p class="atlas-intro">Twelve cross-cutting tastes that recur across every cuisine — the shared logic behind them, and how to recreate any region\'s version on purpose. Tap a dish to jump to its cook.</p>'+T.map(function(t){
    var cuis=(t.cuisines||[]).map(function(c){return '<div class="acui"><div class="acui-h"><span class="acui-r">'+c.region+'</span>'+(c.styles&&c.styles.length?'<span class="acui-s">'+c.styles.join(' · ')+'</span>':'')+'</div>'+(c.recreate?'<div class="acui-x">'+c.recreate+'</div>':'')+(c.dishes&&c.dishes.length?'<div class="acui-d">'+c.dishes.map(function(d){return '<span onclick="closeMethods();openRecipe(\''+d+'\')" class="alink">'+d.replace(/-/g,' ')+'</span>';}).join('')+'</div>':'')+'</div>';}).join('');
    return '<div class="atheme"><div class="ath-h"><span class="ath-ic">'+(t.icon||'')+'</span><h3>'+t.name+'</h3></div><p class="ath-e">'+t.essence+'</p><div class="ath-sec"><span class="ath-l">The common thread</span><p>'+t.commonalities+'</p></div><div class="ath-sec"><span class="ath-l">How to recreate it</span><p>'+t.how_to+'</p></div><div class="ath-sec"><span class="ath-l">Across cultures</span>'+cuis+'</div></div>';
  }).join('');
}
function renderMaster(){
  var M=window.MASTERCLASS||[];
  if(!M.length)return '<div class="empty">Masterclasses are being written.</div>';
  return M.map(function(m){
    return '<div class="amc"><div class="amc-h"><h3>'+m.term+'</h3><span class="amc-f">'+(m.family||'')+'</span></div>'+(m.native?'<div class="amc-nat">'+m.native+'</div>':'')+'<div class="ath-sec"><span class="ath-l">The science</span><p>'+(m.why||'')+'</p></div><div class="ath-sec"><span class="ath-l">Heritage</span><p>'+(m.heritage||'')+'</p></div><div class="ath-sec"><span class="ath-l">Wisdom, handed down</span><p>'+(m.wisdom||'')+'</p></div><div class="ath-sec"><span class="ath-l">Mastery</span><ol class="amc-ol">'+(m.mastery||[]).map(function(s){return '<li>'+s+'</li>';}).join('')+'</ol></div>'+(m.mistakes&&m.mistakes.length?'<div class="ath-sec"><span class="ath-l">Common mistakes</span><ul class="amc-ul">'+m.mistakes.map(function(s){return '<li>'+s+'</li>';}).join('')+'</ul></div>':'')+'<div class="amc-row"><div class="ath-sec"><span class="ath-l">Doneness</span><p>'+(m.doneness||'')+'</p></div><div class="ath-sec"><span class="ath-l">What you need</span><p class="amc-kit"><b>Kit:</b> '+((m.requires&&m.requires.kit)||[]).join(', ')+'<br><b>Key:</b> '+((m.requires&&m.requires.ingredients)||[]).join(', ')+'</p></div></div>'+(m.dishes&&m.dishes.length?'<div class="ath-sec"><span class="ath-l">Dishes that show it off</span><div class="acui-d">'+m.dishes.map(function(d){return '<span onclick="closeMethods();openRecipe(\''+d+'\')" class="alink">'+d.replace(/-/g,' ')+'</span>';}).join('')+'</div></div>':'')+'</div>';
  }).join('');
}
function closeMethods(){document.getElementById('methods').classList.remove('open');document.getElementById('methods-body').innerHTML='';document.getElementById('browse').style.display='block';window.scrollTo(0,savedScroll);}

/* scaler + timers + checklist */
const BASE=2,FRAC={'0.125':'⅛','0.25':'¼','0.375':'⅜','0.5':'½','0.625':'⅝','0.75':'¾','0.875':'⅞','1.25':'1¼','1.5':'1½','1.75':'1¾','2.25':'2¼','2.5':'2½','2.75':'2¾'};
function fmt(v){const r=Math.round(v*1000)/1000;if(FRAC[String(r)])return FRAC[String(r)];if(r<1&&r>0){const e=Math.round(r*8);if(e>=1&&e<=7)return['⅛','¼','⅜','½','⅝','¾','⅞'][e-1];}return Number.isInteger(r)?String(r):(Math.round(r*2)/2).toString();}
function fmtClock(s){const m=Math.floor(s/60),x=s%60;return String(m).padStart(2,'0')+':'+String(x).padStart(2,'0');}
function fmtCook(s){return fmtClock(s);}
function renderIgs(ing){document.getElementById('ings').innerHTML=ing.map(g=>`<div class="ingroup"><h4>${g[0]}</h4><ul class="ings">${g[1].map(it=>{if(it[0]==='static')return `<li class="static"><span class="igcheck" onclick="this.closest('li').classList.toggle('have')"></span><span class="q">—</span><span class="nm">${it[2]}</span></li>`;return `<li class="ing" data-mode="${it[0]}" data-base="${it[1]}" data-unit="${it[2]}" data-name="${it[3].replace(/"/g,'&quot;')}"><span class="igcheck" onclick="this.closest('li').classList.toggle('have')"></span><span class="q num"></span><span class="nm"></span></li>`}).join('')}</ul></div>`).join('');scaleIgs(2);}
var _serv=2,_VAR={};
function scaleIgs(serv){_serv=serv;document.querySelectorAll('#detail .scaler button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.serv==String(serv)));const mult=serv/BASE;document.querySelectorAll('#detail .ing').forEach(li=>{const mode=li.dataset.mode;let base=parseFloat(li.dataset.base)*(li.dataset.vmult?parseFloat(li.dataset.vmult):1);let v;if(mode==='linear')v=base*mult;else if(mode==='taper')v=base*(1+(mult-1)*0.8);else v=Math.max(1,Math.round(base*mult));const q=li.querySelector('.q'),nm=li.querySelector('.nm');if(mode==='countX')q.textContent=fmt(v)+' ×';else if(mode==='countN')q.textContent=fmt(v);else q.textContent=fmt(v)+(li.dataset.unit?' '+li.dataset.unit:'');nm.innerHTML=li.dataset.vname||li.dataset.name;});}
function parseFrac(s){s=(''+s).trim();var M={'½':.5,'¼':.25,'¾':.75,'⅓':1/3,'⅔':2/3,'⅛':.125,'⅜':.375,'⅞':.875,'⅝':.625};if(M[s]!==undefined)return M[s];if(/^\d+\/\d+$/.test(s)){var p=s.split('/');return +p[0]/+p[1];}return parseFloat(s)||0;}
function parseRatio(note){var m=(''+(note||'')).match(/([0-9½¼¾⅜⅞⅝⅓⅔⅛]+)\s*:\s*1\b/);if(!m)return 1;var x=parseFrac(m[1]);return x>0?x:1;}
function variantName(alt,orig){var n=orig||'',c=n.split(',')[1];return '<b>'+alt+'</b>'+(typeof c==='string'?','+c:'');}
function renderVariants(r){_VAR={};var box=document.getElementById('variants');if(!box||!r.ing||!window.SUBS){if(box)box.innerHTML='';return;}var vk=0,rows='',seen={};document.querySelectorAll('#detail .ing').forEach(function(li){var nm=li.dataset.name||'';var f=findSubs(nm);if(!f||seen[f.k])return;seen[f.k]=1;li.dataset.vk=vk;_VAR[vk]={alts:f.s.alts||[],core:f.k,orig:nm};var chips='<button class="vchip sel" data-vk="'+vk+'" data-alt="-1" onclick="setVariant('+vk+',-1)">'+f.k+'</button>';(f.s.alts||[]).forEach(function(a,i){chips+='<button class="vchip" data-vk="'+vk+'" data-alt="'+i+'" onclick="setVariant('+vk+','+i+')">'+a[0]+'</button>';});rows+='<div class="vrow"><span class="vlabel">'+f.k+'</span><div class="vchips">'+chips+'</div></div>';vk++;});box.innerHTML=rows?'<div class="dsection"><div class="wrap"><div class="dhead"><span class="label">Adapt it</span><h2>Your version</h2><span class="rule"></span></div><p class="dsub">Cook with what you actually have. Tap an ingredient to swap it for a common alternative that gives a similar result — the quantity re-scales automatically to keep the dish right.</p><div class="yv">'+rows+'</div></div></div>':'';}
function setVariant(vk,alt){var V=_VAR[vk];if(!V)return;var li=document.querySelector('#detail .ing[data-vk="'+vk+'"]');if(!li)return;if(alt<0){delete li.dataset.vmult;}else{var a=V.alts[alt];if(a){li.dataset.vname=variantName(a[0],V.orig);li.dataset.vmult=parseRatio(a[1]);}}document.querySelectorAll('.vchip[data-vk="'+vk+'"]').forEach(function(c){c.classList.toggle('sel',+c.dataset.alt===alt);});scaleIgs(_serv);}
function wireDetail(){
  document.querySelectorAll('#detail .scaler button').forEach(b=>b.addEventListener('click',()=>scaleIgs(parseInt(b.dataset.serv))));
  document.querySelectorAll('#detail .check').forEach(c=>c.addEventListener('click',()=>c.closest('.step').classList.toggle('done')));
  let running=null;
  document.querySelectorAll('#detail .timerbtn').forEach(btn=>{const total=parseInt(btn.dataset.sec);let left=total,iv=null;const tm=btn.querySelector('.tm');const stop=()=>{clearInterval(iv);iv=null;btn.classList.remove('running');running=null;tm.textContent=fmtClock(total);left=total;};
    btn.addEventListener('click',()=>{if(iv){stop();return;}if(running)running.click();running=btn;btn.classList.add('running');iv=setInterval(()=>{left--;tm.textContent=fmtClock(left);if(left<=0){clearInterval(iv);iv=null;btn.classList.remove('running');running=null;try{navigator.vibrate&&navigator.vibrate(120);}catch(e){}tm.textContent='✓';setTimeout(()=>{left=total;tm.textContent=fmtClock(total);},1500);}},1000);});});
}

/* ── guided step-through cook mode (the signature) ── */
var _cook=null,_cookIv=null,_cookLeft=0;
function startCook(slug){var r=FULL[slug];if(!r||!r.steps)return;_cook={slug:slug,steps:r.steps,i:0,title:r.t};document.getElementById('cook-title').textContent=r.t;document.getElementById('browse').style.display='none';document.getElementById('detail').classList.remove('open');document.getElementById('methods').classList.remove('open');document.getElementById('cook').classList.add('open');renderCookStep(0);window.scrollTo(0,0);}
function renderCookStep(i){var c=_cook,st=c.steps[i],n=c.steps.length;c.i=i;var timer=st[3]?('<div class="ck-timer" data-sec="'+st[3]+'"><div class="ck-tnum" id="cktnum">'+fmtCook(st[3])+'</div><div class="ck-tctrls"><button class="ck-tbtn" id="cktbtn" onclick="cookTimer()">▶ Start</button><button class="ck-tbtn ghost" onclick="cookTimerReset()">Reset</button></div><div class="ck-thint">Counts down, vibrates and auto-advances when done</div></div>'):'<div class="ck-notimer">No timer for this step — move on when it looks right</div>';document.getElementById('cook-step').innerHTML='<div class="ck-num">STEP '+String(i+1).padStart(2,'0')+'</div><div class="ck-progress"><span style="width:'+Math.round((i+1)/n*100)+'%"></span></div><div class="ck-count">'+(i+1)+' of '+n+'</div><h2 class="ck-title">'+st[0]+'</h2><p class="ck-body">'+gloss(st[1])+'</p><div class="ck-why"><b>WHY</b> · '+gloss(st[2])+'</div>'+timer;document.getElementById('cook-prev').disabled=(i===0);document.getElementById('cook-next').textContent=(i===n-1)?'Finish ✓':'Next →';cookTimerReset();}
function cookTimer(){var btn=document.getElementById('cktbtn'),tnum=document.getElementById('cktnum'),wrap=document.querySelector('.ck-timer');if(!wrap||!btn)return;if(_cookIv){clearInterval(_cookIv);_cookIv=null;btn.textContent='▶ Resume';btn.classList.remove('running');return;}if(_cookLeft<=0)_cookLeft=parseInt(wrap.dataset.sec);btn.textContent='⏸ Pause';btn.classList.add('running');_cookIv=setInterval(function(){_cookLeft--;if(_cookLeft<=0){clearInterval(_cookIv);_cookIv=null;btn.textContent='✓ Done';btn.classList.remove('running');tnum.textContent='✓';try{navigator.vibrate&&navigator.vibrate([120,80,120]);}catch(e){}setTimeout(function(){if(_cook.i<_cook.steps.length-1)nextStep();},1600);}else tnum.textContent=fmtCook(_cookLeft);},1000);}
function cookTimerReset(){if(_cookIv){clearInterval(_cookIv);_cookIv=null;}var wrap=document.querySelector('.ck-timer');if(wrap){var tn=document.getElementById('cktnum');if(tn)tn.textContent=fmtCook(parseInt(wrap.dataset.sec));var b=document.getElementById('cktbtn');if(b){b.textContent='▶ Start';b.classList.remove('running');}}_cookLeft=0;}
function nextStep(){if(_cook.i<_cook.steps.length-1)renderCookStep(_cook.i+1);else exitCook();}
function prevStep(){if(_cook.i>0)renderCookStep(_cook.i-1);}
function exitCook(){if(_cookIv){clearInterval(_cookIv);_cookIv=null;}document.getElementById('cook').classList.remove('open');document.getElementById('detail').classList.add('open');window.scrollTo(0,savedScroll);}

/* nav wiring */
document.getElementById('occbar').addEventListener('click',e=>{const b=e.target.closest('.occ-btn');if(!b)return;document.querySelectorAll('.occ-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeOcc=b.dataset.occ;query='';document.getElementById('q').value='';document.getElementById('qx').classList.remove('on');activeFilter='all';activeRegion='all';viewHead();renderFilters();renderGrid();document.querySelector('.view-head').scrollIntoView({behavior:'smooth',block:'start'});});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(document.getElementById('cook').classList.contains('open'))exitCook();else if(document.getElementById('methods').classList.contains('open'))closeMethods();else if(document.getElementById('detail').classList.contains('open'))goBrowse();}});

/* reveal */
const _io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');_io.unobserve(e.target);}}),{threshold:.06});
function observeReveal(){document.querySelectorAll('.rv:not(.in)').forEach(el=>_io.observe(el));}
const _mo=new MutationObserver(()=>observeReveal());_mo.observe(document.getElementById('grid'),{childList:true});
window.addEventListener('load',()=>{document.querySelectorAll('.home-hero .rv').forEach((el,i)=>setTimeout(()=>el.classList.add('in'),60+i*90));});

/* init */
loadPantry();viewHead();renderFilters();renderGrid();observeReveal();
