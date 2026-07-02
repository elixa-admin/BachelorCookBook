/* Compute SA-palate familiarity + course distribution for the rebalance.
   Reads recipes/*.js (incl sa-batch) + roster-tags.json. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};
fs.readdirSync(DIR+'recipes/').filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+'recipes/'+f,'utf8'));}catch(e){}});
const W=window;
const FULL={};
[W.GLOBAL_EXOTIC_BATCH,W.PREMIUM_BATCH,W.RECIPES,W.FULLCOOK_BATCH].forEach(s=>{if(s)s.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});});
let R=[...Object.values(FULL)];
[W.COMPENDIUM,W.BATCH5,W.FOUNDATION_BATCH,W.SA_BATCH].forEach(s=>{if(s)s.forEach(r=>{if(r&&r.slug&&!FULL[r.slug]&&!R.find(x=>x.slug===r.slug))R.push(r);});});
let TAGS={};
try{const t=JSON.parse(fs.readFileSync(DIR+'roster-tags.json','utf8'));(t.tags||[]).forEach(x=>{if(x&&x.slug)TAGS[x.slug]={fam:x.sa_familiarity,course:x.course};});}catch(e){console.log('(roster-tags.json not found — familiarity for non-SA dishes unknown)\n');}
const famOf=r=>r.sa_familiarity||((TAGS[r.slug]&&TAGS[r.slug].fam))||'?';
const courseOf=r=>r.course||((TAGS[r.slug]&&TAGS[r.slug].course))||'?';
const SA=/south african|durban|cape|township|afrikaans|xhosa|zulu|sotho|venda|mozambic/i;
const SAextra=['bobotie','malva-pudding','braai-lamb-chops-chimichurri','potjiekos','melktert','koeksisters','vetkoek','potbrood','chakalaka'];
const isSA=r=>SA.test(r.cui||'')||SAextra.includes(r.slug);
const fam={household_staple:0,well_known:0,adventurous:0,very_unique:0,'?':0};
const course={};let saOrigin=0,saStaple=0;
R.forEach(r=>{const f=famOf(r);fam[f]=(fam[f]||0)+1;const c=courseOf(r);course[c]=(course[c]||0)+1;if(isSA(r)){saOrigin++;if(f==='household_staple')saStaple++;}});
const pct=n=>(100*n/R.length).toFixed(0)+'%';
console.log('TOTAL roster:',R.length);
console.log('\n=== FAMILIARITY (target 65 general / 20 adventurous / 5 very-unique) ===');
console.log('  household_staple :',fam.household_staple,pct(fam.household_staple));
console.log('  well_known       :',fam.well_known,pct(fam.well_known));
console.log('  RECOGNIZABLE sum :',fam.household_staple+fam.well_known,pct(fam.household_staple+fam.well_known),'  (target ~65%)');
console.log('  adventurous      :',fam.adventurous,pct(fam.adventurous),'  (target ~20%)');
console.log('  very_unique      :',fam.very_unique,pct(fam.very_unique),'  (target ~5%)');
console.log('  untagged         :',fam['?']);
console.log('\n=== SA IDENTITY ===');
console.log('  SA-origin dishes:',saOrigin,'| recognizable SA staples (household):',saStaple,'  (target >=26)');
console.log('\n=== COURSE (target 20% starters / 10% desserts) ===');
Object.entries(course).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('  '+(k||'?')+':',v,pct(v)));
