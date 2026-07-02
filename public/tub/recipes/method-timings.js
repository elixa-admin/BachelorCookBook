/* METHOD-ADAPTATION KNOWLEDGE LAYER
   Gives each multi-method dish ACCURATE per-appliance timings/temps + which cook-steps change.
   Ties into the guided Cook flow so the recipe can adapt to the chosen appliance.
   - METHOD_TIMINGS   : per-slug, keyed by appliance id (stovetop/oven/airfryer/pressure/grill)
   - deriveMethodTiming: heuristic fallback for (slug, appliance) not explicitly covered
   SA-localized copy: °C / min / tsp / braai. No cups / oz / °F. */
(function(){
window.METHOD_TIMINGS={
  'steak':{
    stovetop:{time:'3 min per side',temp:'pan ripping hot',note:'Ripping-hot pan — crust in 3 min a side, then baste in foaming butter',stepNotes:{2:'Sear 3 min first side; 3 min second side, baste with butter'}},
    grill:{time:'3–4 min per side',temp:'coals hot',note:'Over hot coals, lid off — 3–4 min a side, rest 5 min',stepNotes:{2:'Grill 3–4 min first side; 3–4 min second side; rest 5 min tented'}}
  },
  'salmon':{
    stovetop:{time:'8–10 min',temp:'pan hot',note:'Skin-down in a hot pan — crisp the skin, blushing centre',stepNotes:{2:'Skin-down first; 4–5 min before turning; finish 2–3 min skin-side up'}},
    oven:{time:'12 min',temp:'200 °C',note:'Skin-up on a tray — glassy skin, blushing centre',stepNotes:{2:'Tray, skin-up; no turning; check after 10 min'}},
    airfryer:{time:'10 min',temp:'200 °C',note:'Skin-up; crisp without splatter',stepNotes:{2:'Single layer, skin-up; flip optional after 6 min'}}
  },
  'braai-lamb-chops-chimichurri':{
    grill:{time:'3–4 min per side',temp:'coals medium',note:'Over medium coals — 3–4 min a side, rest loosely tented',stepNotes:{2:'Grill 3–4 min first side; 3–4 min second side; rest 5 min'}},
    stovetop:{time:'3 min per side',temp:'ridged pan smoking hot',note:'Ridged grill pan, smoking hot — 3 min a side',stepNotes:{2:'Sear 3 min first side in ridged pan; 3 min second side; rest 5 min'}}},
  'mozambican-peri-peri-chicken':{
    grill:{time:'25–30 min',temp:'coals medium-hot',note:'The classic — over coals, charred and lacquered, turn often',stepNotes:{2:'Grill over medium-hot coals, turning every 5 min; char edges; internal 74 °C'}},
    oven:{time:'40 min',temp:'200 °C',note:'Even roast, then flash under the grill to char the edges',stepNotes:{2:'Roast 40 min at 200 °C; finish under grill 2 min for char'}},
    airfryer:{time:'22 min',temp:'200 °C',note:'Flip at 12 min — the skin goes glassy-crisp',stepNotes:{2:'Air-fry 12 min; flip; air-fry 10 min more; skin should be glassy-crisp'}}
  },
  'roast-chicken':{
    oven:{time:'~20 min per 500 g + 20 min',temp:'220 °C down to 180 °C',note:'The classic — 220 °C for 15 min, then 180 °C till done',stepNotes:{2:'Start 220 °C for 15 min to seal; reduce to 180 °C; cook 20 min per 500 g plus 20 min'}},
    airfryer:{time:'~45 min for small bird',temp:'180 °C',note:'A small bird fits whole; flip once; juices run clear',stepNotes:{2:'Air-fry 25 min; flip entire bird; air-fry 20 min; check juices clear (74 °C)'}}
  },
  'butter-chicken':{
    stovetop:{time:'20 min simmer',temp:'gentle bubble',note:'Simmer the sauce gentle — 20 min, never let it boil hard',stepNotes:{2:'Add chicken to sauce; simmer gentle 20 min; stir often; no hard boil'}},
    pressure:{time:'10 min high pressure',temp:'high pressure',note:'Chicken + sauce together; quick-release, finish with cream',stepNotes:{2:'Pressure-cook 10 min high; quick-release; stir in cream; simmer 2 min'}}},
  'boerewors':{
    grill:{time:'8–10 min',temp:'coals medium',note:'On the braai — medium coals, 8–10 min, coiled, turn often',stepNotes:{2:'Braai over medium coals; turn every 2 min; 8–10 min total till browned all over'}},
    stovetop:{time:'8 min',temp:'pan medium-high',note:'Dry pan, medium-high — 8 min, brown all over, no oil needed',stepNotes:{2:'Dry pan, medium-high; turn every 2 min; 8 min till browned all over'}}
  },
  'shisa-nyama':{
    grill:{time:'30 min',temp:'coals medium-hot',note:'Coals medium-hot — meats in stages, char at the edges',stepNotes:{2:'Grill marinated meats over medium-hot coals; turn often; char edges; 25–30 min'}},
    oven:{time:'30 min',temp:'200 °C',note:'Tray-roast the marinated meats; finish under the grill',stepNotes:{2:'Tray-roast at 200 °C for 25 min; finish under grill 5 min for char'}}
  },
  'sosaties':{
    grill:{time:'8–10 min',temp:'coals medium',note:'Skewers over coals — 8–10 min, turn, baste with the marinade',stepNotes:{2:'Grill skewers over medium coals; turn every 3 min; baste often; 8–10 min'}},
    oven:{time:'18 min',temp:'200 °C',note:'Baking tray, turn once, baste halfway',stepNotes:{2:'Bake at 200 °C for 9 min; turn; baste; bake 9 min more'}}
  },
  'beef-rendang':{
    stovetop:{time:'2½–3 hr',temp:'gentle simmer',note:'The real way — slow braise-reduction, 2½–3 hr, stir often',stepNotes:{2:'Simmer uncovered gentle; stir every 15 min; reduce till paste toasts and oil splits; 2½–3 hr'}},
    pressure:{time:'45 min high + 20 min open',temp:'high then reduce',note:'Cuts the braise; then open the lid and reduce 20 min to toast the paste',stepNotes:{2:'Pressure-cook 45 min high; natural-release 10 min; open lid; simmer 20 min to reduce and toast paste'}}
  },
  'durban-mutton-curry':{
    stovetop:{time:'90 min',temp:'gentle simmer',note:'Low simmer — 90 min till the meat surrenders',stepNotes:{2:'Simmer gentle 90 min covered; stir occasionally; meat should be tender'}},
    pressure:{time:'30 min high + 5 min thicken',temp:'high pressure',note:'Tenderises the mutton; natural-release, then thicken 5 min open',stepNotes:{2:'Pressure-cook 30 min high; natural-release 10 min; simmer open 5 min to thicken sauce'}}
  },
  'beef-bourguignon':{
    oven:{time:'2½–3 hr',temp:'160 °C',note:'The classic — 160 °C, lidded, 2½–3 hr till yielding',stepNotes:{2:'Cover and braise at 160 °C; 2½–3 hr till beef is tender; stir occasionally'}},
    stovetop:{time:'~3 hr',temp:'barest simmer',note:'Heavy pot, barest simmer on the back burner, ~3 hr',stepNotes:{2:'Simmer gentle covered; barest bubble; 3 hr till tender; stir occasionally'}},
    pressure:{time:'40 min high + 10 min reduce',temp:'high then reduce',note:'Tenderises fast; finish the sauce open to glaze',stepNotes:{2:'Pressure-cook 40 min high; natural-release; simmer open 10 min to glaze sauce'}}
  },
  'breyani':{
    stovetop:{time:'45 min steam',temp:'gentle heat',note:'Layered and steamed, lidded, low heat — the dum',stepNotes:{2:'Layer meat, rice, potatoes; lid tight; gentlest heat 45 min; no peeking'}},
    oven:{time:'45 min',temp:'160 °C',note:'Lidded pot in the oven — even steam, less scorch risk',stepNotes:{2:'Layer in ovenproof pot; lid tight; 160 °C for 45 min; even steam'}}
  },
  'potjiekos':{
    stovetop:{time:'90 min',temp:'gentle heat',note:'A potjie over coals or a low gas ring — layered, never stirred',stepNotes:{2:'Layer in potjie; lid tight; gentlest heat 90 min; never stir — only shake'}},
    oven:{time:'90 min',temp:'160 °C',note:'Lidded Dutch oven — same layered logic, even heat',stepNotes:{2:'Layer in Dutch oven; lid tight; 160 °C for 90 min; never stir'}}
  },
  'lamb-kleftiko':{
    oven:{time:'3 hr',temp:'150 °C',note:'Sealed parcel, 150 °C, 3 hr — falls off the bone',stepNotes:{2:'Wrap lamb tight in parchment + foil; 150 °C for 3 hr; parcel should puff'}},
    pressure:{time:'50 min high + 10 min brown',temp:'high then brown',note:'Tenderises first; then open and brown 10 min uncovered',stepNotes:{2:'Pressure-cook 50 min high with liquid; natural-release; open; brown 10 min uncovered'}}},
  'fries':{
    airfryer:{time:'15–20 min',temp:'200 °C',note:'Toss in 1 tsp oil, shake at 10 min — the low-oil way',stepNotes:{2:'Toss fries in 1 tsp oil; air-fry 10 min; shake basket; air-fry 5–10 min more'}},
    oven:{time:'25–30 min',temp:'220 °C',note:'Single layer, 220 °C, flip once',stepNotes:{2:'Spread single layer; 220 °C for 15 min; flip; 10–15 min more'}},
    stovetop:{time:'10 + 5 min',temp:'130 °C then 180 °C',note:'Classic double-fry — 130 °C then 180 °C',stepNotes:{2:'First fry 130 °C for 10 min; drain; heat oil to 180 °C; second fry 5 min till crisp'}}
  },
  'focaccia':{
    oven:{time:'20 min',temp:'220 °C',note:'Hot oven, 220 °C — 20 min, dimpled and olive-oiled',stepNotes:{2:'Bake at 220 °C for 20 min till golden; dimple before baking with olive oil'}}
  },
  'potbrood':{
    oven:{time:'40 min',temp:'220 °C then 200 °C',note:'Dutch oven, lidded — 220 °C then 200 °C, ~40 min',stepNotes:{2:'Dutch oven lidded; 220 °C for 10 min; reduce to 200 °C for 30 min'}},
    stovetop:{time:'45 min',temp:'coals medium',note:'Over coals in a potjie — the campfire way, ~45 min',stepNotes:{2:'Over medium coals in potjie; lid on with coals atop; 45 min'}}
  },
  'mussakhan':{
    oven:{time:'55–60 min total',temp:'200 °C',note:'Onions 20 min, chicken 35–40 min at 200 °C — assembled warm',stepNotes:{2:'Onions 20 min at 200 °C; add chicken; roast 35–40 min; assemble over flatbread'}},
    airfryer:{time:'40–45 min',temp:'200 °C',note:'Onions and chicken together, fewer dishes',stepNotes:{2:'Air-fry onions and chicken together at 200 °C for 40–45 min; assemble over flatbread'}}
  },
  'kibbeh':{
    stovetop:{time:'4–5 min',temp:'oil 170 °C',note:'Shallow-fry — 170 °C oil, 4–5 min till golden',stepNotes:{2:'Shallow-fry in 170 °C oil; 4–5 min till golden brown; drain on paper'}},
    oven:{time:'25 min',temp:'190 °C',note:'Bake — 190 °C for 25 min till golden',stepNotes:{2:'Bake at 190 °C for 25 min; flip halfway; should be golden'}}},
  'malai-kofta':{
    stovetop:{time:'10 min fry + 15 min simmer',temp:'oil 170 °C then gentle',note:'Deep-fry balls 10 min, then simmer in sauce 15 min',stepNotes:{2:'Deep-fry kofta balls in 170 °C oil for 10 min; drain; simmer in sauce gentle 15 min'}},
    oven:{time:'20 min',temp:'190 °C',note:'Bake balls 15 min, then finish in sauce 5 min',stepNotes:{2:'Bake balls at 190 °C for 15 min; add to sauce; bake 5 min more'}}
  },
  'chakalaka':{
    stovetop:{time:'35 min',temp:'medium simmer',note:'Simmer — 35 min till vegetables are tender',stepNotes:{2:'Simmer covered 20 min; uncover; simmer 15 min to reduce slightly'}},
    oven:{time:'30 min',temp:'180 °C',note:'Bake — 180 °C for 30 min, stirred once',stepNotes:{2:'Bake at 180 °C for 30 min; stir halfway; vegetables should be tender'}}
  },
  'sticky-toffee-pudding':{
    oven:{time:'35 min',temp:'180 °C',note:'Bake — 180 °C for 35 min till springy',stepNotes:{2:'Bake at 180 °C for 35 min; pudding should spring back when touched'}},
    airfryer:{time:'25 min',temp:'170 °C',note:'Air-fry — 170 °C for 25 min, check after 20',stepNotes:{2:'Air-fry at 170 °C for 25 min; check after 20 min; should be springy'}}
  },
  'borscht':{
    stovetop:{time:'1 hr',temp:'gentle simmer',note:'Simmer — 1 hr till flavours meld',stepNotes:{2:'Simmer covered gentle 1 hr; stir occasionally; flavours should meld'}},
    pressure:{time:'20 min high + 10 min simmer',temp:'high then simmer',note:'Pressure-cook 20 min, then simmer 10 min with beetroot',stepNotes:{2:'Pressure-cook broth base 20 min high; add beetroot; simmer 10 min'}}},
  'crepes':{
    stovetop:{time:'2 min each',temp:'pan medium',note:'Pan-fry — medium pan, 2 min each side',stepNotes:{2:'Cook crepes 1 min first side; flip; 1 min second side; stack warm'}}
  },
  'coq-au-vin':{
    stovetop:{time:'2 hr',temp:'gentle simmer',note:'Simmer — 2 hr till chicken is tender',stepNotes:{2:'Simmer covered gentle 2 hr; stir occasionally; chicken should be tender'}},
    oven:{time:'2 hr',temp:'160 °C',note:'Braise — 160 °C for 2 hr, lidded',stepNotes:{2:'Cover and braise at 160 °C for 2 hr; chicken should be tender'}},
    pressure:{time:'30 min high + 15 min reduce',temp:'high then reduce',note:'Pressure-cook 30 min, then reduce sauce 15 min',stepNotes:{2:'Pressure-cook 30 min high; natural-release; simmer open 15 min to reduce sauce'}}
  },
  'rogan-josh':{
    stovetop:{time:'2½ hr',temp:'gentle simmer',note:'Slow braise — 2½ hr till lamb melts',stepNotes:{2:'Simmer covered gentle 2½ hr; stir occasionally; lamb should be tender'}},
    pressure:{time:'45 min high + 15 min reduce',temp:'high then reduce',note:'Pressure-cook 45 min, then reduce sauce 15 min',stepNotes:{2:'Pressure-cook 45 min high; natural-release; simmer open 15 min to reduce sauce'}}
  },
  'lamb-shank-red-wine':{
    oven:{time:'3 hr',temp:'160 °C',note:'Slow braise — 160 °C for 3 hr, lidded',stepNotes:{2:'Cover and braise at 160 °C for 3 hr; meat should pull from bone'}},
    pressure:{time:'50 min high + 10 min brown',temp:'high then brown',note:'Pressure-cook 50 min, then brown under grill 10 min',stepNotes:{2:'Pressure-cook 50 min high; natural-release; brown under grill 10 min'}}
  },
  'french-onion-soup':{
    stovetop:{time:'45 min caramelise + 20 min simmer',temp:'medium then gentle',note:'Caramelise 45 min, then simmer 20 min',stepNotes:{2:'Caramelise onions 45 min medium; add stock; simmer 20 min gentle'}},
    oven:{time:'30 min',temp:'200 °C',note:'Grill — 200 °C for 30 min till cheese bubbles',stepNotes:{2:'Finish under grill at 200 °C for 30 min; cheese should bubble and brown'}}},
  'steak-frites-cafe-de-paris':{
    stovetop:{time:'3 min per side',temp:'pan ripping hot',note:'Sear — ripping-hot pan, 3 min per side',stepNotes:{2:'Sear steak 3 min first side; 3 min second side; rest 5 min'}},
    grill:{time:'3–4 min per side',temp:'coals hot',note:'Grill — hot coals, 3–4 min per side',stepNotes:{2:'Grill 3–4 min first side; 3–4 min second side; rest 5 min'}}},
  'bouillabaisse':{
    stovetop:{time:'30 min',temp:'gentle simmer',note:'Simmer — 30 min till fish is cooked',stepNotes:{2:'Simmer gentle 30 min; fish should flake easily; dont overcook'}},
    oven:{time:'25 min',temp:'200 °C',note:'Bake — 200 °C for 25 min, covered',stepNotes:{2:'Cover and bake at 200 °C for 25 min; fish should flake'}}
  },
  'duck-a-l-orange':{
    oven:{time:'2 hr 30 min',temp:'200 °C then 180 °C',note:'Roast — 200 °C for 15 min, then 180 °C for 2 hr',stepNotes:{2:'Start 200 °C for 15 min to seal; reduce to 180 °C; roast 2 hr; skin should be crisp'}},
    airfryer:{time:'1 hr 45 min',temp:'180 °C',note:'Air-fry — 180 °C for 1 hr 45 min, flip once',stepNotes:{2:'Air-fry 50 min; flip entire duck; air-fry 55 min more; skin should be crisp'}}
  },
  'beef-wellington':{
    oven:{time:'2 hr 30 min',temp:'200 °C then 180 °C',note:'Roast — 200 °C for 10 min, then 180 °C for 2 hr',stepNotes:{2:'Start 200 °C for 10 min to seal pastry; reduce to 180 °C; roast 2 hr; rest 15 min'}},
    airfryer:{time:'1 hr 30 min',temp:'180 °C',note:'Air-fry — 180 °C for 1 hr 30 min, careful of pastry',stepNotes:{2:'Air-fry 45 min; reduce to 170 °C; air-fry 45 min more; rest 15 min'}}
  },
  'chicken-tikka-masala':{
    stovetop:{time:'20 min simmer',temp:'gentle simmer',note:'Simmer — 20 min till chicken is cooked',stepNotes:{2:'Add chicken to sauce; simmer gentle 20 min; chicken should be cooked through'}},
    pressure:{time:'8 min high + 5 min finish',temp:'high then simmer',note:'Pressure-cook 8 min, then finish with cream 5 min',stepNotes:{2:'Pressure-cook 8 min high; quick-release; stir in cream; simmer 5 min'}}
  },
  'bibimbap':{
    stovetop:{time:'10 min',temp:'pan medium-hot',note:'Assembly — pan each element 2–3 min, then assemble',stepNotes:{2:'Pan each element 2–3 min; assemble in bowl; top with egg and gochujang'}},
    oven:{time:'15 min',temp:'200 °C',note:'Roast — 200 °C for 15 min, vegetables together',stepNotes:{2:'Roast vegetables at 200 °C for 15 min; assemble in bowls; top with egg and gochujang'}}
  },
  'macaroni-cheese':{
    oven:{time:'25 min',temp:'200 °C',note:'Bake — 200 °C for 25 min till bubbling',stepNotes:{2:'Bake at 200 °C for 25 min; sauce should bubble; top golden'}},
    airfryer:{time:'20 min',temp:'190 °C',note:'Air-fry — 190 °C for 20 min, check after 15',stepNotes:{2:'Air-fry at 190 °C for 20 min; check after 15 min; sauce should bubble'}}
  },
  'chicken-satay':{
    grill:{time:'8–10 min',temp:'coals medium-hot',note:'Grill — medium-hot coals, 8–10 min, turn often',stepNotes:{2:'Grill skewers over medium-hot coals; turn every 2 min; 8–10 min; char edges'}},
    stovetop:{time:'8 min',temp:'ridged pan smoking hot',note:'Ridged pan — smoking hot, 8 min, turn often',stepNotes:{2:'Sear in ridged pan smoking hot; turn every 2 min; 8 min; char edges'}},
    oven:{time:'15 min',temp:'200 °C',note:'Bake — 200 °C for 15 min, turn once',stepNotes:{2:'Bake at 200 °C for 8 min; turn; bake 7 min more; char edges'}},
    airfryer:{time:'12 min',temp:'200 °C',note:'Air-fry — 200 °C for 12 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 6 min; shake; air-fry 6 min more; char edges'}}
  },
  'char-siu-pork':{
    oven:{time:'1 hr 30 min',temp:'180 °C',note:'Roast — 180 °C for 1 hr 30 min, baste often',stepNotes:{2:'Roast at 180 °C for 45 min; baste with honey-soy; roast 45 min more; char under grill 5 min'}},
    airfryer:{time:'1 hr',temp:'180 °C',note:'Air-fry — 180 °C for 1 hr, baste halfway',stepNotes:{2:'Air-fry at 180 °C for 30 min; baste with honey-soy; air-fry 30 min more; char 5 min'}}
  },
  'bunny-chow':{
    stovetop:{time:'1 hr',temp:'gentle simmer',note:'Simmer — 1 hr till flavours meld',stepNotes:{2:'Simmer covered gentle 1 hr; stir occasionally; flavours should meld'}},
    pressure:{time:'20 min high + 10 min reduce',temp:'high then reduce',note:'Pressure-cook 20 min, then reduce sauce 10 min',stepNotes:{2:'Pressure-cook 20 min high; natural-release; simmer open 10 min to reduce sauce'}}
  },
  'waterblommetjie-bredie':{
    stovetop:{time:'2 hr',temp:'gentle simmer',note:'Simmer — 2 hr till lamb is tender',stepNotes:{2:'Simmer covered gentle 2 hr; stir occasionally; lamb should be tender'}},
    pressure:{time:'35 min high + 15 min reduce',temp:'high then reduce',note:'Pressure-cook 35 min, then reduce 15 min',stepNotes:{2:'Pressure-cook 35 min high; natural-release; simmer open 15 min to thicken'}}
  },
  'snoek-braai-apricot-jam':{
    grill:{time:'10 min',temp:'coals medium',note:'Grill — medium coals, 10 min, baste often',stepNotes:{2:'Grill snoek over medium coals; baste every 3 min; 10 min; flesh should flake'}},
    stovetop:{time:'8 min',temp:'ridged pan medium-hot',note:'Ridged pan — medium-hot, 8 min, baste often',stepNotes:{2:'Sear in ridged pan medium-hot; baste every 2 min; 8 min; flesh should flake'}},
    oven:{time:'12 min',temp:'200 °C',note:'Bake — 200 °C for 12 min, baste halfway',stepNotes:{2:'Bake at 200 °C for 6 min; baste; bake 6 min more; flesh should flake'}}
  },
  'umngqusho':{
    stovetop:{time:'3 hr',temp:'gentle simmer',note:'Simmer — 3 hr till samp and beans are tender',stepNotes:{2:'Simmer covered gentle 3 hr; stir occasionally; samp and beans should be tender'}},
    pressure:{time:'40 min high + 10 min steam',temp:'high then steam',note:'Pressure-cook 40 min, then steam 10 min',stepNotes:{2:'Pressure-cook 40 min high; natural-release; steam gentle 10 min to finish'}}
  },
  'pickled-fish':{
    stovetop:{time:'10 min fry + 24 hr pickle',temp:'oil 170 °C then fridge',note:'Fry 10 min at 170 °C, then pickle 24 hr',stepNotes:{2:'Fry fish at 170 °C for 10 min; drain; refrigerate in pickle liquid 24 hr'}},
    oven:{time:'15 min',temp:'200 °C',note:'Bake — 200 °C for 15 min, then pickle 24 hr',stepNotes:{2:'Bake at 200 °C for 15 min; refrigerate in pickle liquid 24 hr'}}
  },
  'mealie-bread':{
    oven:{time:'1 hr',temp:'180 °C',note:'Bake — 180 °C for 1 hr till golden',stepNotes:{2:'Bake at 180 °C for 1 hr; bread should sound hollow when tapped'}},
    airfryer:{time:'45 min',temp:'170 °C',note:'Air-fry — 170 °C for 45 min, check after 35',stepNotes:{2:'Air-fry at 170 °C for 45 min; check after 35 min; should sound hollow'}}
  },
  'linguine-vongole-clams':{
    stovetop:{time:'10 min',temp:'gentle simmer',note:'Steam — 10 min till clams open',stepNotes:{2:'Add clams to hot pan; cover; steam 10 min; discard any unopened'}},
    oven:{time:'12 min',temp:'200 °C',note:'Bake — 200 °C for 12 min, covered',stepNotes:{2:'Cover and bake at 200 °C for 12 min; discard any unopened'}}
  },
  'roast-leg-lamb-rosemary-garlic':{
    oven:{time:'2 hr',temp:'200 °C then 180 °C',note:'Roast — 200 °C for 15 min, then 180 °C for 1 hr 45 min',stepNotes:{2:'Start 200 °C for 15 min to seal; reduce to 180 °C; roast 1 hr 45 min; rest 15 min'}},
    airfryer:{time:'1 hr 30 min',temp:'180 °C',note:'Air-fry — 180 °C for 1 hr 30 min, flip once',stepNotes:{2:'Air-fry 45 min; flip entire leg; air-fry 45 min more; rest 15 min'}}
  },
  'pappardelle-venison-wild-mushroom-ragu':{
    stovetop:{time:'3 hr',temp:'gentle simmer',note:'Simmer — 3 hr till venison is tender',stepNotes:{2:'Simmer covered gentle 3 hr; stir occasionally; venison should be tender'}},
    pressure:{time:'45 min high + 20 min reduce',temp:'high then reduce',note:'Pressure-cook 45 min, then reduce 20 min',stepNotes:{2:'Pressure-cook 45 min high; natural-release; simmer open 20 min to reduce sauce'}}
  },
  'arroz-negro-black-paella':{
    stovetop:{time:'1 hr',temp:'medium then gentle',note:'Cook — 15 min high, then 45 min gentle',stepNotes:{2:'Cook squid ink rice 15 min medium; reduce to gentle; 45 min till rice is tender'}},
    oven:{time:'25 min',temp:'200 °C',note:'Bake — 200 °C for 25 min, uncovered',stepNotes:{2:'Bake at 200 °C for 25 min; rice should be tender; edges crispy'}}
  },
  'red-wine-braised-short-rib':{
    oven:{time:'4 hr',temp:'160 °C',note:'Braise — 160 °C for 4 hr, lidded',stepNotes:{2:'Cover and braise at 160 °C for 4 hr; meat should pull from bone'}},
    pressure:{time:'1 hr high + 15 min reduce',temp:'high then reduce',note:'Pressure-cook 1 hr, then reduce 15 min',stepNotes:{2:'Pressure-cook 1 hr high; natural-release; simmer open 15 min to reduce sauce'}}
  },
  'chicken-biryani':{
    stovetop:{time:'45 min steam',temp:'gentlest heat',note:'Steam — gentlest heat 45 min, lid tight',stepNotes:{2:'Layer rice and chicken; lid tight; gentlest heat 45 min; no peeking'}},
    oven:{time:'45 min',temp:'160 °C',note:'Bake — 160 °C for 45 min, lid tight',stepNotes:{2:'Layer in ovenproof pot; lid tight; 160 °C for 45 min; even steam'}}
  },
  'southern-fried-chicken':{
    stovetop:{time:'15 min',temp:'oil 170 °C',note:'Deep-fry — 170 °C for 15 min, golden brown',stepNotes:{2:'Deep-fry at 170 °C for 15 min; drain on paper; should be golden brown'}},
    oven:{time:'25 min',temp:'200 °C',note:'Bake — 200 °C for 25 min, flip once',stepNotes:{2:'Bake at 200 °C for 12 min; flip; bake 13 min more; should be golden'}},
    airfryer:{time:'20 min',temp:'190 °C',note:'Air-fry — 190 °C for 20 min, shake halfway',stepNotes:{2:'Air-fry at 190 °C for 10 min; shake; air-fry 10 min more; should be golden'}}
  },
  'lasagne-bolognese':{
    oven:{time:'2 hr 30 min',temp:'180 °C',note:'Bake — 180 °C for 2 hr 30 min, covered then uncovered',stepNotes:{2:'Cover and bake at 180 °C for 1 hr; uncover; bake 1 hr 30 min more; edges bubbly'}},
    airfryer:{time:'1 hr 30 min',temp:'170 °C',note:'Air-fry — 170 °C for 1 hr 30 min, check after 1 hr',stepNotes:{2:'Air-fry at 170 °C for 1 hr; check; air-fry 30 min more; edges bubbly'}}
  },
  'quiche-lorraine':{
    oven:{time:'1 hr',temp:'180 °C',note:'Bake — 180 °C for 1 hr till set',stepNotes:{2:'Bake at 180 °C for 1 hr; filling should be set with slight wobble'}},
    airfryer:{time:'45 min',temp:'170 °C',note:'Air-fry — 170 °C for 45 min, check after 35',stepNotes:{2:'Air-fry at 170 °C for 45 min; check after 35 min; filling should be set'}}
  },
  'falafel-plate':{
    stovetop:{time:'10 min',temp:'oil 170 °C',note:'Deep-fry — 170 °C for 10 min, golden brown',stepNotes:{2:'Deep-fry falafel at 170 °C for 10 min; drain on paper; should be golden brown'}},
    oven:{time:'20 min',temp:'200 °C',note:'Bake — 200 °C for 20 min, flip once',stepNotes:{2:'Bake at 200 °C for 10 min; flip; bake 10 min more; should be golden'}},
    airfryer:{time:'15 min',temp:'190 °C',note:'Air-fry — 190 °C for 15 min, shake halfway',stepNotes:{2:'Air-fry at 190 °C for 8 min; shake; air-fry 7 min more; should be golden'}}
  },
  'korean-fried-chicken':{
    stovetop:{time:'10 min',temp:'oil 170 °C',note:'Double-fry — 170 °C for 5 min, then 180 °C for 5 min',stepNotes:{2:'First fry at 170 °C for 5 min; drain; heat oil to 180 °C; second fry 5 min'}},
    oven:{time:'25 min',temp:'200 °C',note:'Bake — 200 °C for 25 min, flip once',stepNotes:{2:'Bake at 200 °C for 12 min; flip; bake 13 min more; should be crispy'}},
    airfryer:{time:'20 min',temp:'200 °C',note:'Air-fry — 200 °C for 20 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 10 min; shake; air-fry 10 min more; should be crispy'}}
  },
  'fish-and-chips':{
    stovetop:{time:'10 min',temp:'oil 170 °C',note:'Deep-fry — 170 °C for 10 min, golden brown',stepNotes:{2:'Deep-fry fish at 170 °C for 10 min; drain on paper; should be golden brown'}},
    oven:{time:'20 min',temp:'200 °C',note:'Bake — 200 °C for 20 min, flip once',stepNotes:{2:'Bake at 200 °C for 10 min; flip; bake 10 min more; should be golden'}},
    airfryer:{time:'15 min',temp:'200 °C',note:'Air-fry — 200 °C for 15 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 8 min; shake; air-fry 7 min more; should be golden'}}
  },
  'shepherds-pie':{
    oven:{time:'1 hr 15 min',temp:'200 °C',note:'Bake — 200 °C for 1 hr 15 min till bubbling',stepNotes:{2:'Bake at 200 °C for 1 hr 15 min; sauce should bubble; top golden'}},
    airfryer:{time:'50 min',temp:'190 °C',note:'Air-fry — 190 °C for 50 min, check after 40',stepNotes:{2:'Air-fry at 190 °C for 50 min; check after 40 min; sauce should bubble'}}
  },
  'cottage-pie':{
    oven:{time:'1 hr',temp:'200 °C',note:'Bake — 200 °C for 1 hr till bubbling',stepNotes:{2:'Bake at 200 °C for 1 hr; sauce should bubble; top golden'}},
    airfryer:{time:'45 min',temp:'190 °C',note:'Air-fry — 190 °C for 45 min, check after 35',stepNotes:{2:'Air-fry at 190 °C for 45 min; check after 35 min; sauce should bubble'}}
  },
  'chicken-pot-pie':{
    oven:{time:'1 hr 30 min',temp:'180 °C',note:'Bake — 180 °C for 1 hr 30 min till golden',stepNotes:{2:'Bake at 180 °C for 1 hr 30 min; pastry should be golden; filling bubbling'}},
    airfryer:{time:'1 hr',temp:'170 °C',note:'Air-fry — 170 °C for 1 hr, check after 45',stepNotes:{2:'Air-fry at 170 °°C for 1 hr; check after 45 min; pastry should be golden'}}
  },
  'chicken-wings':{
    oven:{time:'45 min',temp:'200 °C',note:'Roast — 200 °C for 45 min, flip once',stepNotes:{2:'Roast at 200 °C for 22 min; flip; roast 23 min more; skin crispy'}},
    stovetop:{time:'10 min',temp:'oil 170 °C',note:'Deep-fry — 170 °C for 10 min, golden brown',stepNotes:{2:'Deep-fry wings at 170 °C for 10 min; drain on paper; should be golden brown'}},
    airfryer:{time:'25 min',temp:'200 °C',note:'Air-fry — 200 °C for 25 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 12 min; shake; air-fry 13 min more; skin crispy'}}
  },
  'pulled-pork':{
    oven:{time:'4 hr',temp:'160 °C',note:'Slow-roast — 160 °C for 4 hr, covered',stepNotes:{2:'Cover and roast at 160 °C for 4 hr; meat should pull apart easily'}},
    pressure:{time:'1 hr high + 15 min shred',temp:'high then shred',note:'Pressure-cook 1 hr, then shred and rest 15 min',stepNotes:{2:'Pressure-cook 1 hr high; natural-release; shred meat; rest 15 min'}}
  },
  'meatloaf':{
    oven:{time:'1 hr 30 min',temp:'180 °C',note:'Bake — 180 °C for 1 hr 30 min till cooked through',stepNotes:{2:'Bake at 180 °C for 1 hr 30 min; internal temp should be 71 °C; rest 10 min'}},
    airfryer:{time:'1 hr',temp:'170 °C',note:'Air-fry — 170 °C for 1 hr, check after 45',stepNotes:{2:'Air-fry at 170 °C for 1 hr; check after 45 min; internal temp 71 °C'}}
  },
  'roast-beef':{
    oven:{time:'2 hr',temp:'200 °C then 180 °C',note:'Roast — 200 °C for 15 min, then 180 °C for 1 hr 45 min',stepNotes:{2:'Start 200 °C for 15 min to seal; reduce to 180 °C; roast 1 hr 45 min; rest 15 min'}},
    airfryer:{time:'1 hr 30 min',temp:'180 °C',note:'Air-fry — 180 °C for 1 hr 30 min, flip once',stepNotes:{2:'Air-fry 45 min; flip; air-fry 45 min more; rest 15 min'}}
  },
  'sausage-rolls':{
    oven:{time:'45 min',temp:'200 °C',note:'Bake — 200 °C for 45 min till golden',stepNotes:{2:'Bake at 200 °C for 45 min; pastry should be golden; filling cooked through'}},
    airfryer:{time:'35 min',temp:'190 °C',note:'Air-fry — 190 °C for 35 min, check after 25',stepNotes:{2:'Air-fry at 190 °C for 35 min; check after 25 min; pastry should be golden'}}
  },
  'frittata':{
    stovetop:{time:'5 min stovetop + 30 min oven',temp:'medium then 180 °C',note:'Stovetop 5 min, then oven 180 °C for 30 min',stepNotes:{2:'Cook on stovetop 5 min to set base; transfer to oven 180 °C for 30 min; set and golden'}},
    oven:{time:'35 min',temp:'180 °C',note:'Bake — 180 °C for 35 min till set',stepNotes:{2:'Bake at 180 °C for 35 min; should be set with slight wobble'}},
    airfryer:{time:'25 min',temp:'170 °C',note:'Air-fry — 170 °C for 25 min, check after 20',stepNotes:{2:'Air-fry at 170 °C for 25 min; check after 20 min; should be set'}}
  },
  'french-toast':{
    stovetop:{time:'2 min each',temp:'pan medium',note:'Pan-fry — medium pan, 2 min each side',stepNotes:{2:'Cook 2 min first side; flip; 2 min second side; should be golden'}},
    oven:{time:'15 min',temp:'200 °C',note:'Bake — 200 °C for 15 min, flip once',stepNotes:{2:'Bake at 200 °C for 8 min; flip; bake 7 min more; should be golden'}},
    airfryer:{time:'12 min',temp:'190 °C',note:'Air-fry — 190 °C for 12 min, flip halfway',stepNotes:{2:'Air-fry at 190 °C for 6 min; flip; air-fry 6 min more; should be golden'}}
  },
  'waffles':{
    stovetop:{time:'4 min each',temp:'waffle iron hot',note:'Waffle iron — hot iron, 4 min each',stepNotes:{2:'Cook in hot waffle iron 4 min; should be golden and crisp'}}
  },
  'ceviche-classico':{
    stovetop:{time:'0 min cook + 30 min cure',temp:'no cook',note:'No cook — citrus cure for 30 min',stepNotes:{2:'Marinate fish in citrus juice 30 min; no heat; fish should be opaque'}},
    oven:{time:'10 min',temp:'200 °C',note:'Quick-roast — 200 °C for 10 min, then cure 10 min',stepNotes:{2:'Roast at 200 °C for 10 min; cure in citrus 10 min; fish should be opaque'}}
  },
  'yakitori':{
    grill:{time:'8 min',temp:'coals medium-hot',note:'Grill — medium-hot coals, 8 min, turn often',stepNotes:{2:'Grill over medium-hot coals; turn every 2 min; baste with tare; 8 min; char edges'}},
    stovetop:{time:'8 min',temp:'ridged pan smoking hot',note:'Ridged pan — smoking hot, 8 min, turn often',stepNotes:{2:'Sear in ridged pan smoking hot; turn every 2 min; baste with tare; 8 min; char edges'}},
    oven:{time:'12 min',temp:'200 °C',note:'Bake — 200 °C for 12 min, baste halfway',stepNotes:{2:'Bake at 200 °C for 6 min; baste with tare; bake 6 min more; char edges'}},
    airfryer:{time:'10 min',temp:'200 °C',note:'Air-fry — 200 °C for 10 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 5 min; shake; baste with tare; air-fry 5 min more; char edges'}}
  },
  'naan-bread':{
    oven:{time:'10 min',temp:'max grill',note:'Grill — max grill for 10 min, puff and char',stepNotes:{2:'Grill on max for 5 min; flip; grill 5 min more; should puff and char'}},
    stovetop:{time:'3 min each',temp:'pan ripping hot',note:'Pan — ripping-hot pan, 3 min each side',stepNotes:{2:'Cook in ripping-hot pan 3 min first side; flip; 3 min second side; should puff and char'}}
  },
  'elote-mexican-street-corn':{
    grill:{time:'10 min',temp:'coals medium',note:'Grill — medium coals, 10 min, turn often',stepNotes:{2:'Grill over medium coals; turn every 2 min; 10 min; char all sides'}},
    stovetop:{time:'8 min',temp:'ridged pan medium-hot',note:'Ridged pan — medium-hot, 8 min, turn often',stepNotes:{2:'Sear in ridged pan medium-hot; turn every 2 min; 8 min; char all sides'}},
    oven:{time:'12 min',temp:'200 °C',note:'Roast — 200 °C for 12 min, turn once',stepNotes:{2:'Roast at 200 °C for 6 min; turn; roast 6 min more; char all sides'}}
  },
  'beef-teriyaki':{
    grill:{time:'8 min',temp:'coals medium-hot',note:'Grill — medium-hot coals, 8 min, baste often',stepNotes:{2:'Grill over medium-hot coals; turn every 2 min; baste with teriyaki; 8 min; char edges'}},
    stovetop:{time:'6 min',temp:'ridged pan smoking hot',note:'Ridged pan — smoking hot, 6 min, baste often',stepNotes:{2:'Sear in ridged pan smoking hot; turn every 2 min; baste with teriyaki; 6 min; char edges'}},
    oven:{time:'12 min',temp:'200 °C',note:'Bake — 200 °C for 12 min, baste halfway',stepNotes:{2:'Bake at 200 °C for 6 min; baste with teriyaki; bake 6 min more; char edges'}},
    airfryer:{time:'10 min',temp:'200 °C',note:'Air-fry — 200 °C for 10 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 5 min; shake; baste with teriyaki; air-fry 5 min more; char edges'}}
  },
  'croissants':{
    oven:{time:'20 min',temp:'200 °C',note:'Bake — 200 °C for 20 min till golden',stepNotes:{2:'Bake at 200 °C for 20 min; should be deeply golden; flaky layers'}}
  },
  'spanakopita':{
    oven:{time:'1 hr',temp:'180 °C',note:'Bake — 180 °C for 1 hr till golden',stepNotes:{2:'Bake at 180 °C for 1 hr; filo should be golden; filling set'}},
    airfryer:{time:'45 min',temp:'170 °C',note:'Air-fry — 170 °C for 45 min, check after 35',stepNotes:{2:'Air-fry at 170 °C for 45 min; check after 35 min; filo should be golden'}}
  },
  'khachapuri':{
    oven:{time:'25 min',temp:'220 °C',note:'Bake — 220 °C for 25 min till golden',stepNotes:{2:'Bake at 220 °C for 25 min; crust should be golden; cheese bubbly'}},
    airfryer:{time:'20 min',temp:'200 °C',note:'Air-fry — 200 °C for 20 min, check after 15',stepNotes:{2:'Air-fry at 200 °C for 20 min; check after 15 min; crust golden; cheese bubbly'}}
  },
  'tiramisu':{
    stovetop:{time:'10 min',temp:'gentle heat',note:'Mascarpone cream — gentle heat 10 min, no boil',stepNotes:{2:'Heat mascarpone mixture gentle 10 min; never let it boil; should thicken slightly'}}
  },
  'creme-brulee':{
    oven:{time:'45 min',temp:'150 °C',note:'Bake — 150 °C for 45 min till set',stepNotes:{2:'Bake at 150 °C for 45 min; should be set with slight wobble; chill 4 hr; torch sugar'}},
    airfryer:{time:'35 min',temp:'140 °C',note:'Air-fry — 140 °C for 35 min, check after 30',stepNotes:{2:'Air-fry at 140 °C for 35 min; check after 30 min; should be set; chill 4 hr; torch sugar'}}
  },
  'malva-pudding':{
    oven:{time:'50 min',temp:'180 °C',note:'Bake — 180 °C for 50 min till golden',stepNotes:{2:'Bake at 180 °C for 50 min; should be golden; sauce poured over hot'}},
    airfryer:{time:'40 min',temp:'170 °C',note:'Air-fry — 170 °C for 40 min, check after 30',stepNotes:{2:'Air-fry at 170 °C for 40 min; check after 30 min; should be golden; sauce poured over hot'}}
  },
  'chicken-liver-parfait':{
    oven:{time:'45 min',temp:'150 °C',note:'Bake — 150 °C for 45 min in water bath',stepNotes:{2:'Bake at 150 °C for 45 min in water bath; should be set; chill overnight'}},
    airfryer:{time:'35 min',temp:'140 °C',note:'Air-fry — 140 °C for 35 min in water bath',stepNotes:{2:'Air-fry at 140 °C for 35 min in water bath; should be set; chill overnight'}}
  },
  'oxtail-potjie':{
    stovetop:{time:'4 hr',temp:'gentlest heat',note:'Potjie — gentlest heat 4 hr, lid tight, never stir',stepNotes:{2:'Layer in potjie; lid tight; gentlest heat 4 hr; never stir — only shake'}},
    oven:{time:'4 hr',temp:'160 °C',note:'Oven — 160 °C for 4 hr, lidded',stepNotes:{2:'Layer in Dutch oven; lid tight; 160 °C for 4 hr; never stir'}},
    pressure:{time:'1 hr high + 30 min reduce',temp:'high then reduce',note:'Pressure-cook 1 hr, then reduce 30 min',stepNotes:{2:'Pressure-cook 1 hr high; natural-release; simmer open 30 min to reduce sauce'}}
  },
  'cape-malay-apricot-chicken':{
    stovetop:{time:'1 hr 30 min',temp:'gentle simmer',note:'Simmer — 1 hr 30 min till chicken is tender',stepNotes:{2:'Simmer covered gentle 1 hr 30 min; stir occasionally; chicken should be tender'}},
    oven:{time:'1 hr 30 min',temp:'180 °C',note:'Bake — 180 °C for 1 hr 30 min, covered',stepNotes:{2:'Cover and bake at 180 °C for 1 hr 30 min; chicken should be tender'}},
    pressure:{time:'25 min high + 15 min finish',temp:'high then finish',note:'Pressure-cook 25 min, then finish with apricots 15 min',stepNotes:{2:'Pressure-cook 25 min high; natural-release; add apricots; simmer 15 min'}}
  },
  'mozambican-prawns':{
    stovetop:{time:'5 min',temp:'pan medium-high',note:'Pan-fry — medium-high pan, 5 min, baste often',stepNotes:{2:'Pan-fry prawns 2–3 min first side; flip; 2–3 min second side; baste with peri-peri butter'}},
    grill:{time:'4 min',temp:'coals medium-hot',note:'Grill — medium-hot coals, 4 min, baste often',stepNotes:{2:'Grill prawns 2 min first side; flip; 2 min second side; baste with peri-peri butter'}},
    airfryer:{time:'6 min',temp:'200 °C',note:'Air-fry — 200 °C for 6 min, shake halfway',stepNotes:{2:'Air-fry at 200 °C for 3 min; shake; baste with peri-peri butter; air-fry 3 min more'}}
  },
  'frikkadels':{
    oven:{time:'25 min',temp:'200 °C',note:'Bake — 200 °C for 25 min till cooked through',stepNotes:{2:'Bake at 200 °C for 25 min; should be cooked through; brown on top'}},
    stovetop:{time:'8 min',temp:'pan medium-hot',note:'Pan-fry — medium-hot pan, 8 min, turn once',stepNotes:{2:'Pan-fry 4 min first side; flip; 4 min second side; should be brown all over'}},
    airfryer:{time:'18 min',temp:'190 °C',note:'Air-fry — 190 °C for 18 min, shake halfway',stepNotes:{2:'Air-fry at 190 °C for 9 min; shake; air-fry 9 min more; should be brown'}}
  },
  'tamatiebredie':{
    stovetop:{time:'2 hr',temp:'gentle simmer',note:'Simmer — 2 hr till lamb is tender',stepNotes:{2:'Simmer covered gentle 2 hr; stir occasionally; lamb should be tender'}},
    pressure:{time:'35 min high + 15 min reduce',temp:'high then reduce',note:'Pressure-cook 35 min, then reduce 15 min',stepNotes:{2:'Pressure-cook 35 min high; natural-release; simmer open 15 min to thicken'}}
  },
  'gemista-stuffed-peppers-aubergine':{
    oven:{time:'1 hr',temp:'180 °C',note:'Bake — 180 °C for 1 hr, covered',stepNotes:{2:'Cover and bake at 180 °C for 1 hr; vegetables should be tender; filling cooked'}},
    airfryer:{time:'45 min',temp:'170 °C',note:'Air-fry — 170 °C for 45 min, check after 35',stepNotes:{2:'Air-fry at 170 °C for 45 min; check after 35 min; vegetables tender'}}
  },
  'pozole':{
    stovetop:{time:'3 hr',temp:'gentle simmer',note:'Simmer — 3 hr till pork is tender',stepNotes:{2:'Simmer covered gentle 3 hr; stir occasionally; pork should be tender'}},
    pressure:{time:'45 min high + 30 min finish',temp:'high then finish',note:'Pressure-cook 45 min, then simmer 30 min with hominy',stepNotes:{2:'Pressure-cook 45 min high; natural-release; add hominy; simmer 30 min'}}
  },
  'harira-lamb-chickpea-soup':{
    stovetop:{time:'2 hr',temp:'gentle simmer',note:'Simmer — 2 hr till lamb is tender',stepNotes:{2:'Simmer covered gentle 2 hr; stir occasionally; lamb should be tender'}},
    pressure:{time:'30 min high + 20 min finish',temp:'high then finish',note:'Pressure-cook 30 min, then simmer 20 min with noodles',stepNotes:{2:'Pressure-cook 30 min high; natural-release; add noodles; simmer 20 min'}}
  },
  'lamb-tagine-apricot-almond':{
    stovetop:{time:'2 hr',temp:'gentle simmer',note:'Simmer — 2 hr till lamb is tender',stepNotes:{2:'Simmer covered gentle 2 hr; stir occasionally; lamb should be tender'}},
    oven:{time:'2 hr',temp:'160 °C',note:'Braise — 160 °C for 2 hr, lidded',stepNotes:{2:'Cover and braise at 160 °C for 2 hr; lamb should be tender'}},
    pressure:{time:'40 min high + 15 min finish',temp:'high then finish',note:'Pressure-cook 40 min, then finish with apricots 15 min',stepNotes:{2:'Pressure-cook 40 min high; natural-release; add apricots and almonds; simmer 15 min'}}
  },
  'taiwanese-beef-noodle-soup':{
    stovetop:{time:'2 hr',temp:'gentle simmer',note:'Simmer — 2 hr till beef is tender',stepNotes:{2:'Simmer covered gentle 2 hr; stir occasionally; beef should be tender'}},
    pressure:{time:'35 min high + 25 min finish',temp:'high then finish',note:'Pressure-cook 35 min, then simmer 25 min with noodles',stepNotes:{2:'Pressure-cook 35 min high; natural-release; add noodles; simmer 25 min'}}
  },
  'potato-bredie':{
    stovetop:{time:'1 hr 30 min',temp:'gentle simmer',note:'Simmer — 1 hr 30 min till lamb is tender',stepNotes:{2:'Simmer covered gentle 1 hr 30 min; stir occasionally; lamb should be tender'}},
    pressure:{time:'25 min high + 15 min reduce',temp:'high then reduce',note:'Pressure-cook 25 min, then reduce 15 min',stepNotes:{2:'Pressure-cook 25 min high; natural-release; simmer open 15 min to thicken'}}
  },
  'pampoenkoekies':{
    stovetop:{time:'3 min each',temp:'pan medium-hot',note:'Shallow-fry — medium-hot pan, 3 min each side',stepNotes:{2:'Shallow-fry 3 min first side; flip; 3 min second side; should be golden'}},
    oven:{time:'15 min',temp:'200 °C',note:'Bake — 200 °C for 15 min, flip once',stepNotes:{2:'Bake at 200 °C for 8 min; flip; bake 7 min more; should be golden'}},
    airfryer:{time:'12 min',temp:'190 °C',note:'Air-fry — 190 °C for 12 min, flip halfway',stepNotes:{2:'Air-fry at 190 °C for 6 min; flip; air-fry 6 min more; should be golden'}}
  },
  'buttermilk-rusks':{
    oven:{time:'1 hr',temp:'180 °C',note:'Twice-bake — 180 °C for 1 hr, then cool and slice',stepNotes:{2:'Bake at 180 °C for 1 hr; cool completely; slice; bake again at 150 °C for 2 hr till dry'}}
  },
  'kaiings':{
    stovetop:{time:'45 min',temp:'medium-low',note:'Render — medium-low heat 45 min, till crisp',stepNotes:{2:'Render over medium-low heat 45 min; stir often; should be golden and crisp'}},
    oven:{time:'1 hr',temp:'160 °C',note:'Render — 160 °C for 1 hr, till crisp',stepNotes:{2:'Render at 160 °C for 1 hr; stir every 15 min; should be golden and crisp'}}
  }
};
window.deriveMethodTiming=function(slug,applianceId){
  if(!slug||!applianceId)return null;
  // In production, this will read from window.RECIPES[slug]
  // For now, return a generic safe fallback
  var hay=slug.toLowerCase().replace(/-/g,' ');

  if(applianceId==='airfryer'){
    if(/chicken|roast|oven|bake/.test(hay)){
      return{time:'~20–25 min',temp:'180–190 °C',note:'Air-fryer approx — check after 15 min; usually ~70% of oven time'};
    }
    return{time:'~15–20 min',temp:'190–200 °C',note:'Air-fryer approx — check frequently; usually faster than oven'};
  }

  if(applianceId==='pressure'){
    if(/curry|stew|braise|bredie|rendang|tagine|potjie/.test(hay)){
      return{time:'20–30 min',temp:'high pressure',note:'Pressure approx — ~30% of stovetop braise time; natural-release 10 min'};
    }
    return{time:'15–20 min',temp:'high pressure',note:'Pressure approx — may need natural-release time'};
  }

  if(applianceId==='grill'){
    if(/steak|chop|wors|sausage/.test(hay)){
      return{time:'3–5 min per side',temp:'coals medium-hot',note:'Grill approx — flip once; rest 5 min after cooking'};
    }
    if(/chicken|ribs/.test(hay)){
      return{time:'25–40 min',temp:'coals medium',note:'Grill approx — turn often; indirect heat for slower cuts'};
    }
    return{time:'10–15 min',temp:'coals medium-hot',note:'Grill approx — turn often'};
  }

  if(applianceId==='oven'){
    if(/pan|stovetop|fry/.test(hay)){
      return{time:'20–25 min',temp:'180–200 °C',note:'Oven approx — less hands-on than pan; check after 15 min'};
    }
    return{time:'25–35 min',temp:'180–200 °C',note:'Oven approx — even, hands-off heat; check after 20 min'};
  }

  if(applianceId==='stovetop'){
    if(/oven|roast|bake/.test(hay)){
      return{time:'15–20 min',temp:'pan medium-hot',note:'Pan approx — more control than oven, less even heat'};
    }
    return{time:'15–20 min',temp:'pan medium',note:'Stovetop approx — adjust heat as needed'};
  }

  return{time:'?',temp:'?',note:'No reliable estimate — this combination may not be suitable'};
};
})();
