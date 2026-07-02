const fs=require('fs');
const f='recipes/roster-classes.js';
let src=fs.readFileSync(f,'utf8');
// extract the object between first { and last }
const s=src.indexOf('{'),e=src.lastIndexOf('}');
const obj=JSON.parse(src.slice(s,e+1));
const CUTS=['waterblommetjie-bredie','gatsby','bibimbap','char-siu-pork','harira','korean-fried-chicken','malai-kofta','palak-paneer','southern-fried-chicken','banh-xeo','jianbing','khachapuri','meatloaf','nasi-lemak','okonomiyaki','arroz-negro-black-paella','beef-wellington','bouillabaisse','linguine-vongole-clams','pappardelle-venison-wild-mushroom-ragu','snoek-braai-apricot-jam','whole-roast-sea-bass','cape-malay-apricot-chicken','biltong','droewors','elote-mexican-street-corn','guacamole','atchar','buttermilk-rusks','kaiings','skilpadjies','putu-pap','chicken-liver-parfait','fattoush','oysters-mignonette','steak-tartare','tom-yum-goong','ceviche-classico','laarb-mince','takoyaki','xiaolongbao','yakitori','boeber','isidudu'];
let applied=0,missing=[];
CUTS.forEach(function(slug){
  if(obj[slug]){obj[slug].cut=true;applied++;}
  else missing.push(slug);
});
// ensure reinstated ones are NOT cut
['boerewors','chakalaka'].forEach(function(s){if(obj[s]){obj[s].cut=false;}});
fs.writeFileSync(f,'window.ROSTER_CLASSES='+JSON.stringify(obj,null,2)+';\n');
console.log('CUTS applied:',applied,'of',CUTS.length);
if(missing.length)console.log('NOT FOUND in roster-classes (need slug fix):',missing.join(', '));
// count live now
var live=Object.values(obj).filter(function(v){return !v.cut;}).length;
console.log('ROSTER_CLASSES entries:',Object.keys(obj).length,'| LIVE now:',live,'| CUT:',Object.keys(obj).length-live);
