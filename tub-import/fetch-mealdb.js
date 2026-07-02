/* Fetch TheMealDB catalog (1-27 calls), fuzzy-match all roster dishes by name,
   output slug→{match,score,thumb} for confident matches + a missing list. */
const fs=require('fs'),https=require('https');
const atlas=require('./recipe-atlas.json');
global.window={};require('./recipes/recipes-images.js');
const have=new Set(Object.keys(window.IMAGES));
function get(url){return new Promise((res,rej)=>{https.get(url,r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d));}).on('error',rej);});}
function norm(s){return (s||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
const STOP=new Set(['the','and','with','a','an','of','in','on','for','to','alla','al','de','di','del','della','la','el','le','style','special','homemade','easy','classic','recipe','served','boiled','fried','roasted','grilled','baked','quick','best','ultimate','real','authentic','traditional']);
function tokens(s){return norm(s).split(' ').filter(t=>t.length>1&&!STOP.has(t));}
function score(dish,meal){
  var dt=tokens(dish),mt=tokens(meal);if(!dt.length||!mt.length)return 0;
  var ms=new Set(mt),inter=0;dt.forEach(t=>{if(ms.has(t))inter++;});
  var dice=(2*inter)/(dt.length+mt.length);
  var allin=dt.every(t=>ms.has(t))?0.22:0;
  var exact=norm(dish)===norm(meal)?0.35:(norm(meal).indexOf(norm(dish))>-1||norm(dish).indexOf(norm(meal))>-1?0.12:0);
  return dice+allin+exact;
}
(async()=>{
  var cat=[];
  // TheMealDB caps empty search; pull the FULL catalog via per-letter (a–z) fetch.
  for(var c=97;c<=122;c++){try{var j2=JSON.parse(await get('https://www.themealdb.com/api/json/v1/1/search.php?f='+String.fromCharCode(c)));if(j2.meals)cat=cat.concat(j2.meals);}catch(e){}}
  // dedupe by idMeal
  var seen={};cat=cat.filter(m=>{if(!m||!m.idMeal||seen[m.idMeal])return false;seen[m.idMeal]=1;return true;});
  console.log('catalog meals:',cat.length);
  var out={},miss=[];
  Object.keys(atlas).forEach(slug=>{
    if(have.has(slug))return;
    var d=atlas[slug],best=null,bestS=0;
    cat.forEach(m=>{var s=score(d.t,m.strMeal);if(s>bestS){bestS=s;best=m;}});
    if(best&&bestS>=0.5)out[slug]={q:d.t,match:best.strMeal,score:+bestS.toFixed(2),thumb:best.strMealThumb};
    else miss.push(slug+'  |  '+d.t+'  →  '+(best?('"'+best.strMeal+'" '+bestS.toFixed(2)):'none'));
  });
  fs.writeFileSync('./mealdb-candidates.json',JSON.stringify(out,null,2));
  fs.writeFileSync('./mealdb-missing.txt',miss.sort().join('\n'));
  console.log('\nMATCHED:',Object.keys(out).length,'| MISSING/weak:',miss.length);
  console.log('\n--- top matches (high conf) ---');
  Object.entries(out).sort((a,b)=>b[1].score-a[1].score).slice(0,10).forEach(([s,o])=>console.log('  '+o.score+'  '+s+'  '+o.q+' → '+o.match));
  console.log('\n--- borderline (score 0.5–0.65, review) ---');
  Object.entries(out).filter(e=>e[1].score<0.66).forEach(([s,o])=>console.log('  '+o.score+'  '+s+'  '+o.q+' → '+o.match));
})();
