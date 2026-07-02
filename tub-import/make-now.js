const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+f,'utf8'));}catch(e){}});
const W=window;const FULL={};
[W.GLOBAL_EXOTIC_BATCH,W.PREMIUM_BATCH,W.RECIPES].forEach(s=>{if(s)s.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});});
let R=[...Object.values(FULL)];[W.COMPENDIUM,W.BATCH5,W.FOUNDATION_BATCH].forEach(s=>{if(s)s.forEach(r=>{if(r&&r.slug&&!FULL[r.slug]&&!R.find(x=>x.slug===r.slug))R.push(r);});});
function normIngr(n){return(n||'').replace(/<[^>]+>/g,'').split(/[,([–\-/]/)[0].replace(/\b(freshly|finely|coarsely|roughly|chopped|sliced|minced|diced|crushed|ground|grated|peeled|large|small|whole|softened|cold|hot|warm|optional|frozen|canned|tinned|raw|dried|fresh|extra|good|quality|free-range|boneless|skinless)\b/g,' ').replace(/\b\d+(\.\d+)?\s?(g|ml|kg|tbsp|tsp|cup|cups|cloves|sprigs|sheets)\b/g,' ').replace(/\s+/g,' ').trim().toLowerCase();}
function recipeIngs(r){const o=[];if(r.ing&&r.ing.length){r.ing.forEach(g=>(g[1]||[]).forEach(it=>{const raw=it[3]||it[2]||'';if(raw&&raw.length>2)o.push(normIngr(raw));}));}else if(r.key_ings&&r.key_ings.length){r.key_ings.forEach(k=>{if(k&&k.length>2)o.push(normIngr(k));});}return o.filter(x=>x&&!/^(to taste|optional|garnish|serve|serving|extra|a kn|pinch|stock cube)/.test(x));}
// pantry FULLY covers Crêpes + partially others
const crepes=R.find(r=>/crêpes|crepes/i.test(r.t));
const ci=recipeIngs(crepes);
let pantry=new Set(ci); // full cover crêpes
['chicken','garlic','onion'].forEach(x=>pantry.add(x)); // partial others
function pmMatch(list){const pa=[...pantry];let have=0;const missing=[];list.forEach(n=>{const hit=pa.some(p=>{if(!p)return false;if(n.includes(p))return true;const fw=n.split(' ')[0];return fw.length>2&&p.includes(fw);});if(hit)have++;else missing.push(n);});return{have,total:list.length,missing};}
function pmScore(pm){if(!pm.total||pm.have===0)return -1;const ratio=pm.have/pm.total,m=pm.missing.length;if(m===0)return 100000+pm.total;if(m<=2)return 50000+(3-m)*1000+Math.round(ratio*100);return Math.round(ratio*1000);}
const PR={};let arr=R.filter(r=>r.ing||r.key_ings);arr.forEach(r=>{PR[r.slug]=pmMatch(recipeIngs(r));});
arr.sort((a,b)=>pmScore(PR[b.slug])-pmScore(PR[a.slug]));
arr=arr.filter(r=>PR[r.slug].have>0);
console.log('Crêpes ingredients ('+ci.length+'): '+ci.join(', '));
console.log('Crêpes match: '+PR[crepes.slug].have+'/'+PR[crepes.slug].total+' miss['+PR[crepes.slug].missing.length+']');
console.log('Top 3 after full-coverage:');
arr.slice(0,3).forEach((r,i)=>{const pm=PR[r.slug];console.log('  '+(i+1)+'. '+r.t+' — '+pm.have+'/'+pm.total+' miss['+pm.missing.length+'] '+(pm.missing.length===0?'★ COOK TONIGHT':'almost-there'));});
const top=arr[0];
console.log('\nASSERT make-now dish ranks #1: '+(PR[top.slug].missing.length===0&&top.slug===crepes.slug?'PASS ✓ — '+top.t:'FAIL'));
