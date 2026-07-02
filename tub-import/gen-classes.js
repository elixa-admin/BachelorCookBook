/* Generate recipes/roster-classes.js: classify all 146 dishes into
   category (main/byo/special/sweet) + new tier (heritage/adopted/aspirational/component)
   + cut flag (reversible denylist). Driven by override sets + cuisine rules. */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
const atlas=require('./recipe-atlas.json');
const CUTS=['causa-limena','kibbeh','mussakhan','mango-sticky-rice','bun-cha','pozole','tamales','tteokbokki','dan-dan-noodles','banh-mi','borscht','khao-soi','vetkoek-curry-mince','moroho-sotho','umphokoqo','umqombothi'];
const BYO=['boerewors','pap','putu-pap','roosterkoek','chakalaka','focaccia','naan-bread','potbrood','biltong','droewors','guacamole','elote-mexican-street-corn','geelrys','dombolo','magwinya','morogo','atchar','braaibroodjies','mealie-bread','skilpadjies','amadumbe','kaiings','buttermilk-rusks'];
const SWEET=['melktert','koeksisters','malva-pudding','sticky-toffee-pudding','tiramisu','creme-brulee','peppermint-crisp-tart','hertzoggies','mosbolletjies','pampoenkoekies','flapjacks-pancakes','waffles','croissants','isidudu','boeber','dom-pedro'];
const SPECIAL=['oysters-mignonette','steak-tartare','chicken-liver-parfait','spanakopita','fattoush','caprese-salad','caesar-salad','bruschetta','tom-yum-goong','ceviche-classico','chicken-wings','yakitori','takoyaki','sausage-rolls','xiaolongbao','laarb-mince','nachos'];
// aspirational = special-occasion mains (old 'premium'-ish showpieces)
const ASPIR=['beef-wellington','coq-au-vin','duck-a-l-orange','lamb-shank-red-wine','bouillabaisse','french-onion-soup','steak-frites-cafe-de-paris','mozambican-prawns','whole-roast-sea-bass','arroz-negro-black-paella','pappardelle-venison-wild-mushroom-ragu','red-wine-braised-short-rib','braai-lamb-chops-chimichurri','roast-leg-lamb-rosemary-garlic','oxtail-potjie','linguine-vongole-clams','cape-malay-apricot-chicken','sosaties','snoek-braai-apricot-jam','mozambican-peri-peri-chicken'];
function isSA(cui){return /south african|cape|durban|township|afrikaans|xhosa|zulu|sotho|tswana|mozambican|ethiopian/i.test(cui||'');}
const out={};
Object.keys(atlas).forEach(slug=>{
  var d=atlas[slug];var cat='main';
  if(BYO.includes(slug))cat='byo';else if(SWEET.includes(slug))cat='sweet';else if(SPECIAL.includes(slug))cat='special';
  var cut=CUTS.includes(slug);
  var tier;
  if(cat==='byo')tier='component';
  else if(ASPIR.includes(slug))tier='aspirational';
  else if(isSA(d.cui))tier='heritage';
  else tier='adopted';
  out[slug]={cat:cat,tier:tier,cut:cut};
});
fs.writeFileSync(D+'recipes/roster-classes.js','window.ROSTER_CLASSES='+JSON.stringify(out,null,2)+';\n');
// report
var live=Object.entries(out).filter(e=>!e[1].cut);
var cnt={main:0,byo:0,special:0,sweet:0},tcnt={heritage:0,adopted:0,aspirational:0,component:0};
live.forEach(([s,c])=>{cnt[c.cat]++;tcnt[c.tier]++;});
console.log('classified '+Object.keys(out).length+' | CUT '+CUTS.length+' | LIVE '+(Object.keys(out).length-CUTS.length));
console.log('categories (live):',JSON.stringify(cnt));
console.log('new tiers (live):',JSON.stringify(tcnt));
