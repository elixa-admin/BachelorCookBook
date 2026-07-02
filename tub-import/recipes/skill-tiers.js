/* SKILL-TIER LAYER — tracks which dishes teach which techniques, at what
   proficiency level. Maps every recipe to a skill level (novice/capable/chef)
   and the transferable techniques a bachelor learns by cooking it.
   - SKILL_LEVELS  : canonical level defs (label/icon/blurb)
   - SKILL_TIERS   : per-slug level + why + technique list (2–4 skills)
   - skillPath()   : curated learning progression by level
   - deriveSkill(r): heuristic fallback for unmapped recipes
   SA-localized copy: °C / min / tsp / braai. No cups / oz / °F. */
(function(){
window.SKILL_LEVELS={
  novice:{label:'Novice',icon:'',blurb:'First cook, hard to mess up — clear wins, gentle techniques'},
  capable:{label:'Capable',icon:'',blurb:'Comfortable in the kitchen — some timing, heat control, a sauce or emulsion'},
  chef:{label:'Chef',icon:'',blurb:'Restaurant-level — precision, multi-component, real technique'}
};
window.SKILL_TIERS={
  'pizza-margherita':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'spaghetti-bolognese':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'fettuccine-alfredo':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'penne-arrabbiata':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'potato-gnocchi':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'prego-roll':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'espetada':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'peri-peri-chicken-livers':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'grilled-calamari':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'home-chicken-curry':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'beef-ribs-sticky-braise':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'egg-fried-rice':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'chicken-stir-fry':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},
  'bobotie':{level:'capable',why:'Spiced mince plus a custard bake — two components, gentle oven',skills:['spice blooming','custard setting','oven control']},
  'butter-chicken':{level:'capable',why:'Marinate, sear, then emulsify a silky sauce',skills:['marinating','searing','emulsion','sauce reduction']},
  'cape-malay-chicken-curry':{level:'capable',why:'Layered spice braise — toast, bloom, slow simmer',skills:['spice toasting','spice blooming','braising','layering']},
  /* — SA signatures (SA heritage dishes) — */
  'bunny-chow':{level:'capable',why:'Curry base from scratch + bread vessel — timing two components',skills:['curry base','simmering','bread handling']},
  'durban-mutton-curry':{level:'capable',why:'Slow braise with spice layering — real time management',skills:['braising','spice blooming','timing']},
  'boerewors':{level:'novice',why:'Grill or pan — hard to overcook if you watch the colour',skills:['grilling','pan-searing','timing']},
  'shisa-nyama':{level:'novice',why:'Marinated meats over fire — forgiving heat',skills:['marinating','grilling','fire management']},
  'sosaties':{level:'capable',why:'Skewering + basting — multi-step prep and grill timing',skills:['skewering','marinating','grilling','basting']},
  'breyani':{level:'capable',why:'Layered steam cook — rice timing is the skill',skills:['layered cooking','steaming','rice cookery','spice balance']},
  'pickled-fish':{level:'novice',why:'Fry then pickle — two separate forgiving steps',skills:['pan-frying','pickling','acid balance']},
  'pap':{level:'novice',why:'Stirred meal — basic heat control, very forgiving',skills:['simmering','stirring','heat control']},
  'roosterkoek':{level:'capable',why:'Dough + braai — proofing and fire timing together',skills:['dough handling','proofing','grilling']},
  'umngqusho':{level:'novice',why:'Soaked beans + simmer — long, gentle cook',skills:['soaking','simmering','timing']},
  'biltong':{level:'capable',why:'Cure — salt ratios and patience, not heat',skills:['curing','salt balance','patience']},
  'droewors':{level:'capable',why:'Drying cure — spice mix and hang time',skills:['curing','spice mix','drying']},
  'peppermint-crisp-tart':{level:'novice',why:'No-bake assemble — layering only',skills:['no-bake assembly','layering','chill time']},
  'potjiekos':{level:'capable',why:'Layered potjie steam — never stir, trust the process',skills:['layered cooking','steam','patience','fire management']},
  'waterblommetjie-bredie':{level:'capable',why:'Stew with foraged ingredient — gentle simmer',skills:['braising','simmering','ingredient handling']},
  'denningvleis':{level:'capable',why:'Slow-simmered lamb — time and spice',skills:['braising','simmering','spice layering']},
  'snoek-braai-apricot-jam':{level:'novice',why:'Baste and grill — sweet glaze saves it',skills:['grilling','basting','glaze making']},
  'mealie-bread':{level:'capable',why:'Quick bread — creaming method and bake',skills:['creaming method','baking','timing']},
  'putu-pap':{level:'novice',why:'Crumbly mealie meal — basic stirring',skills:['simmering','stirring','grain cookery']},
  'umphokoqo':{level:'novice',why:'Crumbly pap — similar to putu, forgiving',skills:['simmering','grain cookery']},
  'isidudu':{level:'novice',why:'Pumpkin porridge — gentle simmer',skills:['simmering','porridge timing']},
  'morogo':{level:'novice',why:'Stewed spinach — basic braise',skills:['braising','simmering','leafy greens']},
  'tamatiebredie':{level:'capable',why:'Tomato stew — reduction and depth',skills:['braising','reduction','flavour building']},
  'geelrys':{level:'novice',why:'Yellow rice — simmer with turmeric',skills:['simmering','spice infusion','rice cookery']},
  'dombolo':{level:'capable',why:'Steamed dumplings — dough proofing',skills:['dough proofing','steaming','timing']},
  'magwinya':{level:'capable',why:'Fried dough — proof + oil temperature',skills:['dough proofing','deep-frying','oil temp control']},
  'skilpadjies':{level:'capable',why:'Liver parcels — prep and gentle cook',skills:['prep technique','pan-frying','timing']},
  'mosbolletjies':{level:'capable',why:'Sweet buns — dough and bake',skills:['dough handling','proofing','baking']},
  'boeber':{level:'capable',why:'Vermicelle pudding — simmer to thicken',skills:['simmering','thickening','spice balance']},
  'buttermilk-rusks':{level:'capable',why:'Twice-baked — dough then bake dry',skills:['dough handling','baking','twice-baking']},
  'atchar':{level:'novice',why:'Pickle — no heat, just mix',skills:['pickling','acid balance','no-cook']},
  'umqombothi':{level:'chef',why:'Fermented sorghum beer — multi-day fermentation',skills:['fermentation','wild yeast','patience','temperature control']},
  'kaiings':{level:'capable',why:'Rendered pork fat — slow rendering, careful heat',skills:['fat rendering','heat control','patience']},
  'amadumbe':{level:'novice',why:'Boiled yam — basic simmer',skills:['boiling','simmering','root veg']},
  'oxtail-potjie':{level:'capable',why:'Slow potjie — time and layering',skills:['potjie cooking','braising','patience','layering']},
  'vetkoek-curry-mince':{level:'capable',why:'Dough + curry fry — two techniques',skills:['dough proofing','deep-frying','curry making']},
  'potato-bredie':{level:'novice',why:'Potato stew — forgiving simmer',skills:['braising','simmering','potato cookery']},
  'gatsby':{level:'novice',why:'Assembly sandwich — fry and stack',skills:['pan-frying','assembly','layering']},
  'braaibroodjie':{level:'novice',why:'Braai toast — bread and cheese on fire',skills:['grilling','bread handling','melting']},
  'frikkadels':{level:'novice',why:'Meatballs — mix and bake',skills:['meat mixing','baking','timing']},
  'cape-malay-apricot-chicken':{level:'capable',why:'Fruit braise — sweet-sour balance',skills:['braising','fruit balance','simmering']},
  'mozambican-prawns':{level:'capable',why:'Garlic butter prawns — high heat butter sauce',skills:['pan-searing','butter sauce','high heat','timing']},
  'pampoenkoekies':{level:'capable',why:'Pumpkin fritters — batter and shallow-fry',skills:['batter making','shallow-frying','timing']},
  'hertzoggies':{level:'capable',why:'Jam-filled tart — pastry and filling',skills:['pastry making','baking','filling']},
  'spanakopita':{level:'capable',why:'Filo pie — layering phile, not tearing',skills:['philo handling','layering','folding','baking']},
  'lamb-tagine-apricot-almond':{level:'capable',why:'Slow tagine — tenderising and spice',skills:['braising','spice balance','patience','slow cook']},
  'tamales':{level:'chef',why:'Wrapped masa — husk prep, dough, steam',skills:['masa dough','husk wrapping','steaming','multi-step']},
  'harira-lamb-chickpea-soup':{level:'capable',why:'Lentil stew — flavour layering',skills:['braising','legume cookery','flavour building']},
  'gemista-stuffed-peppers-aubergine':{level:'capable',why:'Stuffed veg — prep and bake',skills:['vegetable prep','stuffing','baking']},
  'causa-limena':{level:'capable',why:'Peruvian potato stack — assembly and seasoning',skills:['potato mashing','seasoning','assembly','layering']},
  'ceviche-classico':{level:'capable',why:'Citrus cure — acid "cooks" fish',skills:['acid cure','knife work','timing','balance']},
  'xiaolongbao':{level:'chef',why:'Soup dumplings — aspic, wrapper, pleat',skills:['aspic making','dough wrapper','pleating','steam','multi-step']},
  'takoyaki':{level:'chef',why:'Filled balls — special pan, flip timing',skills:['batter','special equipment','timing','flipping']},
  'okonomiyaki':{level:'capable',why:'Savoury pancake — batter, topping, flip',skills:['batter making','pan-frying','topping balance','timing']},
  'yakitori':{level:'capable',why:'Skewered chicken — charcoal and glaze',skills:['skewering','grilling','glazing','charcoal']},
  'banh-xeo':{level:'capable',why:'Crispy pancake — batter timing, turmeric',skills:['batter timing','pan-frying','turmeric use','filling']},
  'bun-cha':{level:'capable',why:'Grilled pork + noodle bowl — marinade and grill',skills:['marinating','grilling','noodle cookery','assembly']},
  'korean-fried-chicken':{level:'capable',why:'Double-fry — crispy crust, glaze',skills:['deep-frying','double-fry technique','glazing','timing']},
  'doro-wat':{level:'capable',why:'Ethiopian chicken — spiced butter stew',skills:['spice blend','braising','injera handling']},
  'khachapuri':{level:'capable',why:'Cheese bread — dough and boat shape',skills:['dough making','shaping','cheese filling','baking']},
  'pozole':{level:'capable',why:'Hominy stew — long simmer, radish garnish',skills:['hominy prep','long simmer','garnish balance']},
  'laarb-mince':{level:'capable',why:'Lao minced meat — toasted spice, fresh herbs',skills:['toasting spices','stir-fry','herb balance','acid']},
  'nasi-lemak':{level:'capable',why:'Coconut rice — pandan, sambal, anchovies',skills:['rice cookery','coconut milk','sambal','frying']},
  'laksa-curry':{level:'capable',why:'Curry noodle soup — paste, seafood, coconut',skills:['paste making','seafood cookery','coconut curry','noodle timing']},
  'taiwanese-beef-noodle-soup':{level:'capable',why:'Beef stew — star anise, bok choy',skills:['braising','spice balance','noodle cookery']},
  'jianbing':{level:'capable',why:'Chinese crepe — thin batter, egg, spread',skills:['thin batter','pan timing','egg spreading','rolling']},
  'mussakhan':{level:'capable',why:'Sumac chicken — onion caramelisation',skills:['sumac use','onion caramelisation','roasting','flatbread handling']},
  'kibbeh':{level:'chef',why:'Bulgata beef — shell and fry, precise filling',skills:['bulgur dough','stuffing','deep-frying','shaping']},
  'fattoush':{level:'novice',why:'No-cook salad — chop and dress',skills:['no-cook','knife work','dressing balance']},
  'palak-paneer':{level:'novice',why:'Spinach curry — easy simmer, paneer fry',skills:['simmering','paneer frying','spinach prep']},
  'malai-kofta':{level:'capable',why:'Cheese dumplings — fry, float in sauce',skills:['dumpling shaping','deep-frying','sauce making','floating']},
  'koeksisters':{level:'capable',why:'Braided dough — plait, fry, syrup',skills:['dough plaiting','deep-frying','syrup soaking','timing']},
  'vetkoek':{level:'capable',why:'Fried dough — proof and oil temp',skills:['dough proofing','deep-frying','oil temp control']},
  'potbrood':{level:'capable',why:'Potjie bread — dough in cast iron',skills:['dough proofing','potjie baking','timing','heat control']},
  'chakalaka':{level:'novice',why:'Vegetable relish — basic simmer',skills:['simmering','vegetable prep','spice balance']},
  'melktert':{level:'capable',why:'Milk tart — custard and pastry',skills:['custard making','pastry baking','cinnamon dusting']},
  'denningvleis':{level:'capable',why:'Vinegar lamb — slow braise, tang',skills:['braising','acid balance','patience']},
  'focaccia':{level:'capable',why:'Olive bread — dimpling and herbs',skills:['dough handling','proofing','dimpling','herb topping']},
  'sticky-toffee-pudding':{level:'capable',why:'Date cake — steamed, toffee sauce',skills:['steaming','sauce making','dates prep']},
  'borscht':{level:'novice',why:'Beet soup — simmer and sour',skills:['simmering','beet prep','sour cream garnish']},
  'crepes':{level:'capable',why:'French pancakes — thin batter, swirl',skills:['thin batter','pan timing','swirl technique','filling']},
  'coq-au-vin':{level:'capable',why:'Wine chicken — lardon, pearl onions, braise',skills:['braising','wine sauce','lardon rendering','multi-component']},
  'rogan-josh':{level:'capable',why:'Kashmiri lamb — fennel, heat, slow',skills:['braising','spice blend','patience','heat balance']},
  'lamb-shank-red-wine':{level:'capable',why:'Red wine braise — tenderising, reduction',skills:['braising','red wine reduction','patience','sauce glazing']},
  'french-onion-soup':{level:'capable',why:'Caramelised onion — long slow brown',skills:['onion caramelisation','patience','stock simmering','crouton grilling']},
  'steak-frites-cafe-de-paris':{level:'capable',why:'Steak + compound butter — sear, baste, rest',skills:['high-heat searing','compound butter','resting meat','frying']},
  'bouillabaisse':{level:'chef',why:'Fish stew — multiple fish, rouille, stock',skills:['fish stock','multiple fish cookery','rouille','serving ritual']},
  'duck-a-l-orange':{level:'chef',why:'Duck roast — rendering, glaze, carving',skills:['duck rendering','roasting','sauce reduction','precise timing']},
  'beef-wellington':{level:'chef',why:'Beef in puff — sear, duxelles, pastry wrap',skills:['searing','mushroom duxelles','puff pastry wrapping','precise roast']},
  'chicken-tikka-masala':{level:'capable',why:'Tikka curry — marinate, grill, sauce',skills:['marinating','grilling','curry base','cream finish']},
  'bibimbap':{level:'capable',why:'Korean rice bowl — multiple prep, gochujang',skills:['rice cookery','multiple vegetable prep','gochujang sauce','frying egg']},
  'macaroni-cheese':{level:'novice',why:'Mac cheese — roux, bake, forgiving',skills:['roux making','cheese sauce','baking']},
  'chicken-satay':{level:'capable',why:'Peanut chicken — skewer, grill, dip',skills:['marinating','skewering','grilling','peanut sauce']},
  'dan-dan-noodles':{level:'capable',why:'Sichuan noodles — chili oil, preserved veg',skills:['noodle cookery','chili oil','preserved vegetable','pork mince']},
  'tom-yum-goong':{level:'capable',why:'Thai soup — chili, lime, lemongrass, prawn',skills:['stock','aromatic balance','prawn timing','acid heat']},
  'banh-mi':{level:'novice',why:'Vietnamese sandwich — assemble, pickle',skills:['no-cook','pickling','assembly','layering']},
  'tteokbokki':{level:'novice',why:'Korean rice cakes — gochujang simmer',skills:['simmering','gochujang sauce','rice cake prep']},
  'char-siu-pork':{level:'capable',why:'Char siu — glaze, high roast',skills:['marinating','glazing','high-heat roasting','hoisin sauce']},
  'mozambican-peri-peri-chicken':{level:'capable',why:'Peri-peri chicken — char, lacquer, spice',skills:['marinating','grilling','spice heat','charring']},
  'linguine-vongole-clams':{level:'capable',why:'Clam pasta — steam clams in wine, emulsify',skills:['clam steaming','pasta timing','wine emulsification','garlic sauce']},
  'braai-lamb-chops-chimichurri':{level:'capable',why:'Lamb chops — grill timing, herb sauce',skills:['grilling','chimichurri','resting meat','herb sauce']},
  'roast-leg-lamb-rosemary-garlic':{level:'capable',why:'Leg roast — temp probe, carving',skills:['roasting','temperature probe','garlic insertion','carving']},
  'pappardelle-venison-wild-mushroom-ragu':{level:'capable',why:'Venison ragu — long slow, game handling',skills:['wild game cookery','ragu reduction','pasta timing','flavour depth']},
  'arroz-negro-black-paella':{level:'capable',why:'Squid paella — socarrat, ink, seafood',skills:['paella technique','socarrat formation','squid ink','seafood timing']},
  'red-wine-braised-short-rib':{level:'capable',why:'Short rib — collagen melt, reduction',skills:['braising','collagen breakdown','red wine reduction','patience']},
  'oysters-mignonette':{level:'capable',why:'Raw oysters — shuck, vinegar shallot',skills:['shucking','acid balance','raw shellfish','presentation']},
  'steak-tartare':{level:'capable',why:'Raw steak — knife work, seasoning, egg',skills:['knife work','raw meat handling','seasoning balance','presentation']},
  'whole-roast-sea-bass':{level:'capable',why:'Whole fish — scale, salt, roast',skills:['fish prep','salt baking','timing','carving']},
  'naan-bread':{level:'capable',why:'Indian flatbread — dough, tandoor bake',skills:['dough handling','proofing','high-heat baking','yeast']},
  'guacamole':{level:'novice',why:'Avocado mash — no cook, salt-lime',skills:['no-cook','avocado prep','acid balance','mashing']},
  'elote-mexican-street-corn':{level:'novice',why:'Street corn — grill, mayo, cheese',skills:['grilling','mayo spread','cheese dusting','lime']},
  'croissants':{level:'chef',why:'Laminated pastry — 27 layers, butter lock',skills:['laminating','dough handling','proofing','precise folding','baking']},
  'flapjacks-pancakes':{level:'novice',why:'American pancakes — griddle, flip',skills:['batter','griddle timing','flipping','syrup']},
  'eggs-benedict-hollandaise':{level:'capable',why:'Poach + hollandaise — egg emulsion, vinegar',skills:['poaching','hollandaise emulsion','vinegar reduction','timing']},
  'quesadillas':{level:'novice',why:'Cheese tortilla — griddle, fold',skills:['griddle','cheese melting','folding','timing']},
  'beef-teriyaki':{level:'capable',why:'Soy glaze — caramelise, marinade',skills:['marinating','caramelisation','soy glaze','grilling']},
  'chicken-biryani':{level:'capable',why:'Layered rice — spice, steam, timing',skills:['layered cooking','rice timing','steam','spice layering']},
  'southern-fried-chicken':{level:'capable',why:'Buttermilk fry — soak, coat, fry',skills:['buttermilk soak','breading','deep-frying','oil temp']},
  'lasagne-bolognese':{level:'capable',why:'Bolognese — long simmer, bechamel, layers',skills:['bolognese simmer','bechamel','layering','baking']},
  'quiche-lorraine':{level:'capable',why:'Custard tart — blind bake, custard set',skills:['pastry blind-bake','custard baking','temperature control']},
  'falafel-plate':{level:'capable',why:'Chickpea fritters — soak, grind, fry',skills:['chickpea soaking','herb blend','deep-frying','timing']},
  'tiramisu':{level:'capable',why:'Coffee mascarpone — no-bake, layers',skills:['no-bake assembly','mascarpone cream','espresso soak','layering']},
  'creme-brulee':{level:'capable',why:'Custard + torch — water bath, sugar crack',skills:['water bath','custard baking','sugar torching','patience']},
  'malva-pudding':{level:'novice',why:'SA sponge — apricot jam sauce',skills:['cake baking','sauce making','jam use']},
  'mango-sticky-rice':{level:'capable',why:'Thai dessert — coconut rice, mango',skills:['rice cookery','coconut milk','mango prep','steaming']},
  'chicken-liver-parfait':{level:'chef',why:'Liver pate — smooth, terrine, liner',skills:['liver prep','smooth puree','terrine','liner check','patience']},
  'shepherds-pie':{level:'novice',why:'Lamb mash — braise, potato, bake',skills:['braising','mash topping','baking']},
  'cottage-pie':{level:'novice',why:'Beef mash — similar to shepherd, easier',skills:['braising','mash topping','baking']},
  'chicken-pot-pie':{level:'capable',why:'Chicken pie — roux, veg, pastry',skills:['roux thickening','pastry topping','sauce making','baking']},
  'chicken-noodle-soup':{level:'novice',why:'Classic soup — simmer, noodles',skills:['stock simmering','noodle timing','vegetable prep']},
  'cream-of-tomato-soup':{level:'novice',why:'Tomato soup — simmer, cream',skills:['simmering','cream addition','seasoning']},
  'garlic-bread':{level:'novice',why:'Garlic bread — butter, grill',skills:['garlic butter','grilling','bread handling']},
  'bruschetta':{level:'novice',why:'Tomato toast — grill, rub',skills:['grilling','tomato prep','garlic rub']},
  'caprese-salad':{level:'novice',why:'Mozzarella tomato — no cook, assemble',skills:['no-cook','assembly','seasoning']},
  'caesar-salad':{level:'capable',why:'Caesar — grilled croutons, emulsion',skills:['pan-frying','crouton making','emulsion dressing','anchovy']},
  'nachos':{level:'novice',why:'Melting chips — oven, toppings',skills:['oven melting','topping balance','timing']},
  'chicken-wings':{level:'novice',why:'Party wings — oven or fry',skills:['marinating','oven timing','sauce glazing']},
  'pulled-pork':{level:'capable',why:'Slow shoulder — collagen melt, pull',skills:['slow roasting','collagen breakdown','pulling','sauce reduction']},
  'meatloaf':{level:'novice',why:'Meat loaf — mix, bake, glaze',skills:['meat mixing','baking','glaze']},
  'roast-beef':{level:'capable',why:'Beef roast — temp probe, resting',skills:['roasting','temperature probe','resting','carving']},
  'sausage-rolls':{level:'novice',why:'Puff sausage — roll, egg, bake',skills:['puff handling','egg wash','baking']},
  'frittata':{level:'novice',why:'Egg bake — whisk, set, broil',skills:['egg whisking','oven setting','broiling']},
  'french-toast':{level:'novice',why:'Eugeny bread — dip, fry, sweet',skills:['egg dip','pan-frying','cinnamon sugar']},
  'waffles':{level:'novice',why:'Waffle iron — batter, crisp',skills:['batter','iron timing','crisp control']},
  'fish-and-chips':{level:'capable',why:'Battered fish — batter, oil temp',skills:['batter making','deep-frying','oil temp control','timing']},
  'dom-pedro':{level:'novice',why:'SA shake — ice cream, whisky, blend',skills:['blending','ice cream','whisky balance']}
};
window.skillPath=function(){
  return {
    novice:[
      'caprese-salad','guacamole','fattoush','banh-mi','flapjacks-pancakes',
      'french-toast','waffles','bruschetta','garlic-bread','macaroni-cheese'
    ],
    capable:[
      'steak-frites-cafe-de-paris','eggs-benedict-hollandaise','chicken-tikka-masala',
      'coq-au-vin','roast-leg-lamb-rosemary-garlic','linguine-vongole-clams',
      'beef-teriyaki','lasagne-bolognese','focaccia','braai-lamb-chops-chimichurri'
    ],
    chef:[
      'beef-wellington','croissants','duck-a-l-orange','xiaolongbao',
      'bouillabaisse','chicken-liver-parfait','tamales','takoyaki','oxtail-potjie'
    ]
  };
};
window.deriveSkill=function(r){
  if(!r)return {level:'novice',why:'(auto)',skills:[]};
  var d=(r.diff||'Easy').toLowerCase(),m=(r.method||'').toLowerCase(),t=(r.t||'').toLowerCase(),s=(r.steps||0);
  var level='novice';
  if(d==='hard'||d==='medium'&&(s>8||/emulsion|souffle|pastry|laminat|bread|confit|brais|stew|curry|tagine|biryani|rendang|wellington|ragu|bourguignon|stock|sauce|caramel|reduc|glaze/.test(m+' '+t)))level='capable';
  if(d==='hard'||/deep-?fry|bread|laminat|pastry|souffle|wellington|croissant|xiaolongbao|bouillabaiss|takoyaki|tamales|oxtail|short.rib|parfait|teriyaki|caviar|tartare/.test(m+' '+t))level='chef';
  var baseSkills=[];
  if(/sear|grill|braai|pan-?fry/.test(m))baseSkills.push('high-heat searing');
  if(/bake|roast|oven/.test(m))baseSkills.push('oven control');
  if(/simmer|stew|brais|curry|tagine/.test(m))baseSkills.push('braising');
  if(/emulsion|hollandaise|mayo|creme/.test(m+' '+t))baseSkills.push('emulsion making');
  if(/deep-?fry|fritter|chip/.test(m+' '+t))baseSkills.push('deep-frying');
  if(/steam|poach|boil|water/.test(m))baseSkills.push('moist-heat control');
  if(/bread|dough|puff|pastry|laminat|croissant|brioche|focacci|naan|roti/.test(m+' '+t))baseSkills.push('dough handling');
  if(/sauce|reduc|glaze|caram|jus|gravy/.test(m+' '+t))baseSkills.push('sauce reduction');
  if(/marinad|cure|brine|pickle/.test(m+' '+t))baseSkills.push('flavour penetration');
  if(!baseSkills.length)baseSkills.push('basic techniques');
  return {level:level,why:'(auto)',skills:baseSkills.slice(0,4)};
};
})();
