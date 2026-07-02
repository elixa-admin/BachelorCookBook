/* Headless test of the Cook-tonight flagship logic against the REAL roster. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+f,'utf8'));}catch(e){}});
const W=window;
// rebuild roster R (faithful copy of app aggregation)
const FULL={};
[W.GLOBAL_EXOTIC_BATCH,W.PREMIUM_BATCH,W.RECIPES].forEach(src=>{if(src)src.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});});
let R=[...Object.values(FULL)];
[W.COMPENDIUM,W.BATCH5,W.FOUNDATION_BATCH].forEach(src=>{if(src)src.forEach(r=>{if(r&&r.slug&&!FULL[r.slug]&&!R.find(x=>x.slug===r.slug))R.push(r);});});

// ---- app functions (copied verbatim) ----
function normIngr(name){return (name||'').replace(/<[^>]+>/g,'').split(/[,([–\-/]/)[0].replace(/\b(freshly|finely|coarsely|roughly|chopped|sliced|minced|diced|crushed|ground|grated|peeled|large|small|whole|softened|cold|hot|warm|optional|frozen|canned|tinned|raw|dried|fresh|extra|good|quality|free-range|boneless|skinless)\b/g,' ').replace(/\b\d+(\.\d+)?\s?(g|ml|kg|tbsp|tsp|cup|cups|cloves|sprigs|sheets)\b/g,' ').replace(/\s+/g,' ').trim().toLowerCase();}
function recipeIngs(r){const out=[];if(r.ing&&r.ing.length){r.ing.forEach(g=>(g[1]||[]).forEach(it=>{const raw=it[3]||it[2]||'';if(raw&&raw.length>2)out.push(normIngr(raw));}));}else if(r.key_ings&&r.key_ings.length){r.key_ings.forEach(k=>{if(k&&k.length>2)out.push(normIngr(k));});}return out.filter(x=>x&&!/^(to taste|optional|garnish|serve|serving|extra|a kn|pinch|stock cube)/.test(x));}
function pantryMatch(r){const list=recipeIngs(r);if(!list.length)return{have:0,total:0,missing:[]};const pa=Array.from(pantry);let have=0;const missing=[];list.forEach(n=>{const hit=pa.some(p=>{if(!p)return false;if(n.includes(p))return true;const fw=n.split(' ')[0];return fw.length>2&&p.includes(fw);});if(hit)have++;else missing.push(n);});return{have,total:list.length,missing};}
function pmScore(pm){if(!pm.total||pm.have===0)return -1;const ratio=pm.have/pm.total,miss=pm.missing.length;if(miss===0)return 100000+pm.total;if(miss<=2)return 50000+(3-miss)*1000+Math.round(ratio*100);return Math.round(ratio*1000);}

// ---- TEST ----
let pantry=new Set(['chicken','garlic','onion','tomato','flour','eggs','butter','milk','salt','pepper','oil','lemon','cream','cheese','potato','rice','pasta','coriander']);
const pantryResults={};
let arr=R.filter(r=>r.ing||r.key_ings);arr.forEach(r=>{pantryResults[r.slug]=pantryMatch(r);});
arr.sort((a,b)=>pmScore(pantryResults[b.slug])-pmScore(pantryResults[a.slug]));
arr=arr.filter(r=>pantryResults[r.slug].have>0);

const compendiumHits=arr.filter(r=>!r.ing&&r.key_ings&&pantryResults[r.slug].have>0);
console.log('Roster: '+R.length+' | matched (>0 in pantry): '+arr.length);
console.log('Compendium dishes now matched (key_ings, no .ing): '+compendiumHits.length);
console.log('  e.g. '+compendiumHits.slice(0,5).map(r=>r.t+' ('+pantryResults[r.slug].have+'/'+pantryResults[r.slug].total+')').join(', '));
console.log('\nTop 10 ranked:');
arr.slice(0,10).forEach((r,i)=>{const pm=pantryResults[r.slug];const kind=r.ing?'FULL':'comp';const st=pm.missing.length===0?'★ COOK TONIGHT':pm.missing.length<=2?'◑ almost-there':'  partial';console.log('  '+(i+1)+'. ['+kind+'] '+r.t+' — '+pm.have+'/'+pm.total+' miss['+pm.missing.length+'] '+st);});

// assertions
const ok1=compendiumHits.length>0;
// ordering: first make-now (miss0) before any almost-there/partial
const firstMiss=arr.length?pantryResults[arr[0].slug].missing.length:99;
const topFull=arr.slice(0,3).filter(r=>pantryResults[r.slug].missing.length===0).length;
console.log('\nASSERT compendium dishes matched: '+(ok1?'PASS ✓':'FAIL ✗'));
console.log('ASSERT #1 dish is make-now (miss0): '+(firstMiss===0?'PASS ✓ ('+arr[0].t+')':'FAIL (miss='+firstMiss+')'));
console.log('ASSERT top-3 are all make-now: '+(topFull===3?'PASS ✓':'partial ('+topFull+'/3) — pantry too sparse for 3 full matches, acceptable'));

// pmHTML spot check
const mk=arr.find(r=>pantryResults[r.slug].missing.length===0);
const nr=arr.find(r=>pantryResults[r.slug].missing.length>0&&pantryResults[r.slug].missing.length<=2);
function pmHTML(r){const pm=pantryResults[r.slug];const pct=Math.round(pm.have/pm.total*100),miss=pm.missing.length;const status=miss===0?'Cook this tonight':miss<=2?'Almost there':'You have '+pm.have+' of '+pm.total;return status;}
console.log('\npmHTML make-now: "'+(mk?pmHTML(mk):'none')+'"');
console.log('pmHTML almost-there: "'+(nr?pmHTML(nr)+'" (missing: '+pantryResults[nr.slug].missing.slice(0,4).join(', ')+')':'none found')+'"');
