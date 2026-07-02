/* Merge masterclass-expansion.json into recipes/masterclass.js.
   Schema-guarded: aborts if new entries don't match existing shape.
   Filters every dishes[] reference to valid roster slugs (drops dangling/generic slugs). */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};
fs.readdirSync(DIR+'recipes/').filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+'recipes/'+f,'utf8'));}catch(e){}});
const W=window;
const roster=new Set();
['GLOBAL_EXOTIC_BATCH','PREMIUM_BATCH','RECIPES','COMPENDIUM','BATCH5','FOUNDATION_BATCH','FULLCOOK_BATCH'].forEach(k=>{(W[k]||[]).forEach(r=>{if(r&&r.slug)roster.add(r.slug);});});
const M=W.MASTERCLASS?W.MASTERCLASS.slice():[];
const exp=JSON.parse(fs.readFileSync(DIR+'masterclass-expansion.json','utf8'));
const exKeys=M[0]?Object.keys(M[0]).sort():[];
const newKeys=exp.newEntries&&exp.newEntries[0]?Object.keys(exp.newEntries[0]).sort():[];
console.log('existing entry keys:',exKeys.join(','));
console.log('new entry keys     :',newKeys.join(','));
const schemaMatch=JSON.stringify(exKeys)===JSON.stringify(newKeys);
if(!schemaMatch){console.log('\nABORT: schema mismatch — masterclass.js left untouched.');process.exit(0);}
// filter helper: keep only roster slugs, dedupe
function clean(arr){const out=[],seen=new Set();(arr||[]).forEach(d=>{if(roster.has(d)&&!seen.has(d)){seen.add(d);out.push(d);}});return out;}
let beforeCov=new Set();M.forEach(m=>clean(m.dishes).forEach(d=>beforeCov.add(d)));
console.log('\nBEFORE: '+M.length+' entries | '+beforeCov.size+'/'+roster.size+' dishes covered');
let droppedMappings=0;
(exp.mapUpdates||[]).forEach(u=>{const m=M.find(x=>x.id===u.id);if(!m)return;m.dishes=m.dishes||[];const before=m.dishes.length;m.dishes=clean(m.dishes.concat(u.addDishes||[]));droppedMappings+=(u.addDishes||[]).length-(m.dishes.length-before);});
let addedEntries=0,skippedDup=0;
(exp.newEntries||[]).forEach(ne=>{ne.dishes=clean(ne.dishes);if(M.find(x=>x.id===ne.id)){skippedDup++;return;}M.push(ne);addedEntries++;});
let afterCov=new Set();M.forEach(m=>clean(m.dishes).forEach(d=>afterCov.add(d)));
console.log('AFTER : '+M.length+' entries | '+afterCov.size+'/'+roster.size+' dishes covered  (+'+(afterCov.size-beforeCov)+' newly covered)');
console.log('  +'+addedEntries+' new techniques | '+skippedDup+' dup ids skipped | '+droppedMappings+' invalid slugs dropped');
fs.writeFileSync(DIR+'recipes/masterclass.js','window.MASTERCLASS='+JSON.stringify(M,null,2)+';\n');
console.log('\nWRITTEN: recipes/masterclass.js');
