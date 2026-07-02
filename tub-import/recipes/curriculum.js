/* COOKING CURRICULUM LAYER — turns the 33 masterclasses into a navigable
   "Method Map" (techniques grouped into domains) + a "Compare" module that
   teaches the real difference between confusable methods (fry vs deep-fry,
   simmer vs poach, braise vs roast…).
   - METHOD_DOMAINS : ordered teaching domains (the map tiles)
   - MC_DOMAIN      : masterclass id -> domain id (the regroup)
   - METHOD_COMPARE : curated method-pairs with axis-by-axis differentiation
   - helpers        : mcDomainOf / domainLessons / methodDomains / methodCompare
   SA-localized copy: °C / cm / min. No cups / oz / °F. */
(function(){
window.METHOD_DOMAINS=[
  {id:'heat',icon:'',label:'Heat & Fire',blurb:'Direct, high heat that browns — searing, pan- and stir-frying, grilling & braai, roasting, sous-vide.'},
  {id:'fat',icon:'',label:'Fat & Frying',blurb:'Cooking in hot fat — the shallow pan-fry, the deep fry, and the slow, gentle confit.'},
  {id:'water',icon:'',label:'Water & Steam',blurb:'Liquid and vapour — simmer, poach, steam, the covered braise, and the stocks they start from.'},
  {id:'sauces',icon:'',label:'Sauces & Emulsion',blurb:'Building body and gloss — the mother sauces, roux, reduction, and the emulsions that bind fat to liquid.'},
  {id:'bake',icon:'',label:'Dough & Bake',blurb:'Flour, fat and heat — bread and dough, creaming, lamination, and the blind-baked shell.'},
  {id:'cold',icon:'',label:'Cure, Cold & Smoke',blurb:'No pan needed — salt and acid cures, smoke, and the low-and-slow barbecue that melts tough cuts.'},
  {id:'foundations',icon:'',label:'Foundations',blurb:'The moves beneath everything — knife work, seasoning balance, the Maillard reaction, resting, blooming spices.'}
];
window.MC_DOMAIN={
  'searing':'heat','pan-frying':'heat','stir-frying':'heat','grilling-and-braai':'heat','roasting':'heat','fillet-mignon-searing':'heat','sous-vide':'heat',
  'deep-frying':'fat','confit':'fat',
  'braising':'water','simmering-and-stewing':'water','poaching':'water','steaming':'water','stocks-and-broths':'water',
  'the-mother-sauces':'sauces','emulsions-and-pan-sauces':'sauces','building-a-roux':'sauces','reducing-sauces':'sauces',
  'bread-and-dough':'bake','creaming-method':'bake','laminating-dough':'bake','blind-baking':'bake',
  'curing-and-brining':'cold','smoking':'cold','low-and-slow-barbecue':'cold',
  'resting-meat':'foundations','tempering-spices':'foundations','caramelisation-and-maillard':'foundations','the-balance-of-seasoning':'foundations','knife-foundations':'foundations','making-a-curry-base':'foundations','whisking-egg-whites':'foundations','folding-ingredients':'foundations'
};
window.mcDomainOf=function(m){return (window.MC_DOMAIN&&MC_DOMAIN[m&&m.id])||'foundations';};
window.domainLessons=function(id){return (window.MASTERCLASS||[]).filter(function(m){return mcDomainOf(m)===id;});};
window.methodDomains=function(){return window.METHOD_DOMAINS||[];};
window.methodCompare=function(){return window.METHOD_COMPARE||[];};

window.METHOD_COMPARE=[
  {id:'fry-vs-deepfry',title:'Fry vs Deep-fry',question:'What actually changes when the oil gets deeper?',
    a:{id:'pan-frying',term:'Pan-fry (shallow)'},b:{id:'deep-frying',term:'Deep-fry'},
    axis:[
      {label:'Oil depth',a:'1–3 cm — a shallow film, food half-submerged',b:'Food fully submerged, swimming in 6+ cm of oil'},
      {label:'Temperature',a:'Moderate, ~170 °C — gentler, you steer it',b:'175–190 °C — hot, and held steady'},
      {label:'The move',a:'Crisp one side, flip, crisp the other',b:'An even, all-over shell in a single dunk'},
      {label:'Watch for',a:'Splatter from the exposed top; it steams',b:'Temp crashes when crowded — fry in small batches'}],
    takeaway:'Same browning (Maillard), different geometry. Shallow = flip it; deep = dunk it. Deep-frying is less forgiving of a crowded pan — cold food drags the oil temperature down and you end up greasy, not crisp.'},
  {id:'simmer-vs-poach',title:'Simmer vs Poach',question:'Both are gentle heat in liquid — so where is the line?',
    a:{id:'simmering-and-stewing',term:'Simmer'},b:{id:'poaching',term:'Poach'},
    axis:[
      {label:'Bubbles',a:'Small, gentle bubbles that rise and pop — just under a boil',b:'Barely any — the odd tremor at the surface'},
      {label:'Temperature',a:'Medium-low, ~95 °C',b:'Low, ~75–85 °C'},
      {label:'Best for',a:'Tough cuts, stocks, stews — time breaks down collagen',b:'Delicate proteins — fish, chicken breast, eggs'},
      {label:'The risk',a:'Too hot and it boils hard, clouding a stock',b:'Too hot and a fragile fillet shreds; eggs turn rubbery'}],
    takeaway:'Simmer is for transformation (tough  tender over time); poach is for protection (keep a delicate thing intact). Needs an hour? Simmer. Needs five minutes and care? Poach.'},
  {id:'braise-vs-roast',title:'Braise vs Roast',question:'Both cook low and slow in a vessel — wet or dry?',
    a:{id:'braising',term:'Braise'},b:{id:'roasting',term:'Roast'},
    axis:[
      {label:'The medium',a:'Moist — partially submerged in liquid, lidded',b:'Dry — hot air, uncovered'},
      {label:'Heat',a:'Low, ~150–160 °C, for hours',b:'Hot, 200–220 °C, then lowered'},
      {label:'After',a:'A tough cut turned spoon-tender; a glossy reduced sauce',b:'A browned crust and juicy interior; caramelised edges'},
      {label:'Pick by the cut',a:'Tough, collagen-rich — cheek, shin, shoulder',b:'Tender — chicken, rib, lamb rack (already good to eat)'}],
    takeaway:'Braising rescues tough cuts with moisture and time; roasting celebrates tender ones with dry heat. Liquid + lid = braise. Open pan + air = roast. Choose by the cut, not the mood.'},
  {id:'sear-vs-sousvide',title:'Sear vs Sous-vide',question:'Two roads to a perfectly cooked piece of meat — fast or slow?',
    a:{id:'searing',term:'Sear'},b:{id:'sous-vide',term:'Sous-vide'},
    axis:[
      {label:'Approach',a:'Ripping-hot pan, seconds a side — crust first',b:'Sealed bag in a temperature-controlled bath — core first'},
      {label:'The goal',a:'A deep brown crust via Maillard, fast',b:'Edge-to-edge exact doneness, no grey band'},
      {label:'Time',a:'Minutes',b:'Hours — then a quick sear to finish'},
      {label:'Skill',a:'Judging doneness by touch and time — instinct',b:'Precision via a thermometer and water bath — gear'}],
    takeaway:'Sear is crust-by-instinct; sous-vide is precision-by-patience. Most home cooks sear. Sous-vide removes the guesswork but needs kit. Pros often do both — bath to doneness, then a screaming-hot sear for the crust.'},
  {id:'grill-vs-smoke',title:'Grill vs Smoke',question:'Both are live fire — so why is one minutes and the other hours?',
    a:{id:'grilling-and-braai',term:'Grill / braai'},b:{id:'smoking',term:'Smoke'},
    axis:[
      {label:'Heat',a:'Direct, hot — 230 °C+, right over the coals',b:'Indirect, low — 100–120 °C, beside the fire'},
      {label:'Time',a:'Minutes — fast char, pink centre',b:'Hours — the smoke does the cooking'},
      {label:'Best for',a:'Tender cuts and quick food — chops, wors, veg',b:'Tough cuts — brisket, ribs — melting connective tissue'},
      {label:'The flavour',a:'Char and caramelisation; a bite',b:'A deep smoke ring and rendered fat; a pull'}],
    takeaway:'Direct heat grills fast for tender food; indirect low smoke transforms tough cuts over hours. Hot-and-fast vs low-and-slow — the two halves of fire cookery. A braai often does both at once.'},
  {id:'confit-vs-deepfry',title:'Confit vs Deep-fry',question:'Both submerge food in hot fat — gentle, or violent?',
    a:{id:'confit',term:'Confit'},b:{id:'deep-frying',term:'Deep-fry'},
    axis:[
      {label:'Temperature',a:'Low — 80–100 °C, bath-warm fat',b:'Hot — 175–190 °C'},
      {label:'What it does',a:'Melts and preserves — a duck leg to silk',b:'Crisps and seals — a glassy shell'},
      {label:'Time',a:'Hours, in fat you strain and reuse',b:'Minutes, in hot oil'},
      {label:'The result',a:'Meltingly tender within, barely golden',b:'Shatter-crisp outside, steamed within'}],
    takeaway:'Same medium (fat), opposite intent. Confit is a slow, gentle melt that preserves; deep-fry is a violent crisp that seals. One tenderises, the other texturises.'},
  {id:'steam-vs-poach',title:'Steam vs Poach',question:'Both are gentle and moist — vapour, or liquid?',
    a:{id:'steaming',term:'Steam'},b:{id:'poaching',term:'Poach'},
    axis:[
      {label:'Medium',a:'Vapour — food suspended above boiling water',b:'Liquid — food in barely-trembling water'},
      {label:'Contact',a:'None — no stirring, no fat, nothing sticks',b:'Full — the liquid flavours (or salts) the food'},
      {label:'Best for',a:'Dumplings, veg, fish — keep shape and purity',b:'Fruit, eggs, chicken breast — infuse and stay moist'},
      {label:'Flavour',a:'Clean — the ingredient tastes only of itself',b:'Takes on the poaching liquid (wine, stock, syrup)'}],
    takeaway:'Steam is purity and structure — nothing added. Poach is gentleness plus a flavour exchange. Steam a dumpling to keep its skin; poach a pear to soak up its spiced wine.'},
  {id:'cure-vs-ceviche',title:'Cure vs Ceviche',question:'Two ways to “cook” without any heat — salt, or acid?',
    a:{id:'curing-and-brining',term:'Cure / brine'},b:{id:'ceviche',term:'Ceviche (acid)'},
    axis:[
      {label:'Agent',a:'Salt (often sugar, sometimes nitrate) — dry rub or brine',b:'Acid — lime or lemon juice'},
      {label:'What it does',a:'Draws out moisture, firms the flesh, preserves for days',b:'“Denatures” the proteins — looks cooked, opaque'},
      {label:'Time',a:'Hours to days',b:'Minutes — eat it fresh'},
      {label:'Keeps?',a:'Yes — gravlax lasts days in the fridge',b:'No — “cooked” isn’t cooked; eat immediately'}],
    takeaway:'Salt cures by dehydration and preservation; acid “cooks” by unwinding proteins but doesn’t make raw fish safe to store. Cure to keep; ceviche to eat now. Neither uses heat — which is why both feel like magic.'},
  {id:'reduce-vs-roux',title:'Reduce vs Thicken (roux)',question:'Two ways to turn thin liquid into sauce — concentrate, or add?',
    a:{id:'reducing-sauces',term:'Reduce'},b:{id:'building-a-roux',term:'Thicken (roux)'},
    axis:[
      {label:'Method',a:'Boil it down — evaporate water, concentrate flavour',b:'Whisk in a cooked fat-and-flour paste (a roux)'},
      {label:'What changes',a:'Less liquid, more intensity — the pan does the work',b:'More body, same volume — starch swells and thickens'},
      {label:'Time',a:'Patient — 15–40 min of simmering',b:'Quick once the roux is made — minutes'},
      {label:'Best for',a:'Stocks, pan juices, wine sauces — flavour is the goal',b:'Gravies, béchamel, mac sauce — volume and silkiness'}],
    takeaway:'Reduce to intensify (flavour up, liquid down); thicken with a roux to build body without concentrating. Reduce a demi-glace; roux a béchamel. Often you do both — reduce for flavour, then mount with butter or roux for gloss.'}
];
})();
