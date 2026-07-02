/* TUB knowledgebase integrity audit — "test the flow-over".
   Loads every data file the way the app does, mimics the merge, and reports
   duplicates, missing fields, bad ingredient modes, and cross-reference coverage. */
const fs=require('fs');
const DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};global.navigator={};
function load(f){try{eval(fs.readFileSync(DIR+f,'utf8'));return true;}catch(e){console.log('!! LOAD ERR '+f+': '+e.message);return false;}}
['recipes-data.js','premium-batch.js','global-exotic-batch.js','compendium-batch.js',
 'recipes-nutrition.js','recipes-images.js','recipes-tips.js','nomenclature.js',
 'courses.js','substitutes.js','masterclass.js','themes.js','culinary.js','culinary-extra.js','methods.js','glossary.js']
 .forEach(load);
const W=global.window;
const INLINE=['steak','carbonara','salmon','roast-chicken'];
const FULL={};INLINE.forEach(s=>FULL[s]={slug:s,_src:'inline'});
const SRCS={RECIPES:W.RECIPES,PREMIUM_BATCH:W.PREMIUM_BATCH,GLOBAL_EXOTIC_BATCH:W.GLOBAL_EXOTIC_BATCH,COMPENDIUM:W.COMPENDIUM};
const dupes=[];
Object.keys(SRCS).forEach(src=>{(SRCS[src]||[]).forEach(r=>{if(!r||!r.slug)return;if(FULL[r.slug]){dupes.push(r.slug+' ['+src+']');}else{r._src=src;FULL[r.slug]=r;}});});
const all=Object.values(FULL);
const realFull=all.filter(r=>r.ing&&r.steps&&r.prov);
const compendium=all.filter(r=>r.prov&&!r.ing);
console.log('┌─ RECIPE BRAIN ────────────────────────────');
console.log('│ Distinct dish slugs :',Object.keys(FULL).length);
console.log('│ Full guided cooks   :',realFull.length+INLINE.length,'('+realFull.length+' data + '+INLINE.length+' inline)');
console.log('│ Compendium-only     :',compendium.length);
console.log('│ DUPLICATE SLUGS     :',dupes.length?dupes.join(', '):'(none)');
console.log('│ Toward 102 target   :',Object.keys(FULL).length,'/ 102');

const TIERS=['signature','premium','global','exotic','others'];const MODES=['linear','taper','countX','countN','static'];
const issues=[];
realFull.forEach(r=>{
  if(!r.t)issues.push(r.slug+': no title');
  if(!TIERS.includes(r.tier))issues.push(r.slug+': bad tier "'+r.tier+'"');
  if(!r.cui)issues.push(r.slug+': no cui');
  if(!r.occ||!r.occ.length)issues.push(r.slug+': no occ');
  const P=r.prov||{};
  ['popular_in','famous_for','consists_of','name_origin','why_loved','method_detail'].forEach(k=>{if(!P[k])issues.push(r.slug+': prov.'+k+' missing');});
  if(!r.brief||!r.brief.lead)issues.push(r.slug+': no brief.lead');
  if(r.brief&&(!r.brief.expect||r.brief.expect.length<4))issues.push(r.slug+': brief.expect<4 ('+(r.brief.expect?r.brief.expect.length:0)+')');
  if(!r.steps||r.steps.length<3)issues.push(r.slug+': steps<3 ('+(r.steps?r.steps.length:0)+')');
  (r.ing||[]).forEach(g=>(g[1]||[]).forEach(it=>{if(!MODES.includes(it[0]))issues.push(r.slug+': bad ing mode "'+it[0]+'"');}));
  if(!r.pair||r.pair.length<2)issues.push(r.slug+': pair<2');
});
console.log('├─ FIELD INTEGRITY ─────────────────────────');
console.log('│ Issues:',issues.length);
issues.slice(0,40).forEach(i=>console.log('│  - '+i));
if(issues.length>40)console.log('│  ...+'+(issues.length-40)+' more');

const slugs=Object.keys(FULL);
const cov=(obj,label)=>{const miss=slugs.filter(s=>!obj[s]);console.log('│ '+label+': '+((obj?Object.keys(obj).length:0))+' keys — missing for '+miss.length+' recipes'+(miss.length?' ['+miss.slice(0,10).join(', ')+(miss.length>10?'…':'')+']':''));};
console.log('├─ CROSS-REFERENCE COVERAGE ────────────────');
cov(W.NUTRITION||{},'Nutrition ');
cov(W.IMAGES||{},'Images    ');
cov(W.TIPS||{},'SA tips   ');
cov(W.NOMEN||{},'Nomen.    ');
cov(W.COURSES||{},'Courses   ');
['NUTRITION','IMAGES','TIPS','NOMEN','COURSES'].forEach(n=>{const o=Object.keys(W[n]||{}).filter(k=>!FULL[k]);if(o.length)console.log('│ orphan '+n+' keys (no recipe): '+o.length+' ['+o.slice(0,8).join(', ')+'…]');});
console.log('├─ KNOWLEDGE LAYERS ────────────────────────');
console.log('│ Culinary terms  :',(W.CULINARY?Object.keys(W.CULINARY).length:0)+(W.METHODS?Object.keys(W.METHODS).length:0)+(W.EXTRA?Object.keys(W.EXTRA).length:0));
console.log('│ Flavour themes  :',(W.THEMES||[]).length);
console.log('│ Masterclasses   :',(W.MASTERCLASS||[]).length);
console.log('│ Substitutes     :',(W.SUBS?Object.keys(W.SUBS).length:0));
console.log('│ Nomenclature    :',(W.NOMEN?Object.keys(W.NOMEN).length:0));
// compendium dupes vs full
const cdup=(W.COMPENDIUM||[]).filter(r=>{const f=FULL[r.slug];return f&&f.ing&&f.steps;});
console.log('├─ COMPENDIUM ──────────────────────────────');
console.log('│ Compendium records:',(W.COMPENDIUM||[]).length);
console.log('│ Redundant w/ full cook:',cdup.length,cdup.map(r=>r.slug).slice(0,12).join(', '));
const cfields=(W.COMPENDIUM||[])[0]||{};
console.log('│ Compendium fields:',Object.keys(cfields).join(', '));
console.log('└───────────────────────────────────────────');
