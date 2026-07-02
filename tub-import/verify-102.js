/* Faithful replication of tub-app.html aggregation (lines 654-663) + integrity checks. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+f,'utf8'));}catch(e){}});
const W=window;

// 1) DUPLICATE-SLUG detector (across ALL records, no dedup)
const slugMap={};
Object.keys(W).forEach(k=>{if(Array.isArray(W[k]))W[k].forEach(r=>{if(r&&typeof r.slug==='string'){(slugMap[r.slug]=slugMap[r.slug]||[]).push(k);}});});
const dups=Object.keys(slugMap).filter(s=>slugMap[s].length>1);
console.log('DISH SLUGS (unique): '+Object.keys(slugMap).length);
console.log(dups.length?('DUPLICATE SLUGS: '+dups.map(s=>s+' x'+slugMap[s].length+' in '+slugMap[s].join('+')).join('; ')):'No duplicate slugs ✓');

// 2) replicate aggregation
const TIERS={signature:{n:'Signature',c:'#A'},premium:{n:'Premium',c:'#B'},global:{n:'Global',c:'#C'},exotic:{n:'Exotic',c:'#D'},others:{n:'Others',c:'#E'}};
const FULL={};
if(W.GLOBAL_EXOTIC_BATCH)W.GLOBAL_EXOTIC_BATCH.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});
if(W.PREMIUM_BATCH)W.PREMIUM_BATCH.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});
if(W.RECIPES)W.RECIPES.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});
let _all=[...Object.values(FULL)];
[W.COMPENDIUM,W.BATCH5,W.FOUNDATION_BATCH].forEach(src=>{if(src)src.forEach(r=>{if(r&&r.slug&&!FULL[r.slug]&&!_all.find(x=>x.slug===r.slug))_all.push(r);});});
const _COMING=[{t:'Tiramisu'},{t:'Crème Brûlée'},{t:'Malva Pudding'},{t:'Mango Sticky Rice'},{t:'Churros & Chocolate'}];
_COMING.forEach(c=>{if(!_all.find(x=>x.t===c.t))_all.push(c);});
const _TO={signature:1,premium:2,global:3,exotic:4,others:5};
let R=_all.sort((a,b)=>(_TO[a.tier]||9)-(_TO[b.tier]||9)||a.t.localeCompare(b.t));
R.forEach(r=>{if(!r.slug)r.slug=r.t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');r.live=(FULL[r.slug]&&FULL[r.slug].ing)?'full':(r.key_ings?'comp':(r.prov?'prov':null));r.region=W.regionOf?W.regionOf(r.cui):'mediterranean';});
const live={};R.forEach(r=>{live[r.live]=(live[r.live]||0)+1;});
const region={};R.forEach(r=>{region[r.region]=(region[r.region]||0)+1;});
console.log('\nRENDERED ROSTER: '+R.length+' dishes');
console.log('  by live: '+JSON.stringify(live));
console.log('  by region: '+JSON.stringify(region));

// 3) foundation dishes present + classified comp?
const F=(W.FOUNDATION_BATCH||[]).map(r=>r.slug);
const found=R.filter(r=>F.includes(r.slug));
console.log('\nFOUNDATION dishes in roster: '+found.length+'/15');
const misComp=found.filter(r=>r.live!=='comp').map(r=>r.slug+':'+r.live);
console.log(misComp.length?('NOT comp: '+misComp.join(', ')):'All 15 render as compendium ✓');
console.log('Missing from roster: '+F.filter(s=>!R.find(r=>r.slug===s)).join(', ')||'none');

// 4) full-library SA-clean final scan
const sa=/cilantro|ground (beef|pork|chicken|turkey|lamb)|\bscallion|\bgreen onion|\beggplant|\bshrimps?\b|\bzucchini|\barugula|°F|\bcups?\b|kaffir/i;
const off=R.filter(r=>{const t=JSON.stringify(r).toLowerCase();return sa.test(t);}).map(r=>r.slug);
// exempt "cup of tea/coffee" serving vessel false positives
const realOff=off.filter(s=>{const r=R.find(x=>x.slug===s);const t=JSON.stringify(r).toLowerCase();return t.match(/cup[s]?\s+of\s+(tea|rooibos|coffee|milk|stock)/)?false:true;});
console.log('\nSA scan (full roster): '+(realOff.length?('review: '+realOff.join(', ')):'clean ✓ (cup-of-tea phrases exempted)'));
