/* Familiarity reclassification to close SA-staple + very-unique gaps.
   1) sa-batch.js: promote 5 everyday SA dishes well_known -> household_staple.
   2) roster-tags.json: demote 7 very_unique -> adventurous. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};
eval(fs.readFileSync(DIR+'recipes/sa-batch.js','utf8'));
const promote={'mozambican-peri-peri-chicken':1,'breyani':1,'sosaties':1,'snoek-braai-apricot-jam':1,'mealie-bread':1};
const arr=window.SA_BATCH;
arr.forEach(r=>{if(promote[r.slug]&&r.sa_familiarity!=='household_staple'){console.log('SA promote: '+r.slug+' ('+r.sa_familiarity+' -> household_staple)');r.sa_familiarity='household_staple';}});
fs.writeFileSync(DIR+'recipes/sa-batch.js','window.SA_BATCH='+JSON.stringify(arr,null,2)+';\n');
const d=JSON.parse(fs.readFileSync(DIR+'roster-tags.json','utf8'));
const demote={'peking-duck':1,'beef-rendang':1,'bouillabaisse':1,'pappardelle-venison-wild-mushroom-ragu':1,'kibbeh':1,'mussakhan':1,'causa-limena':1};
(d.tags||[]).forEach(t=>{if(demote[t.slug]&&t.sa_familiarity==='very_unique'){console.log('demote: '+t.slug+' (very_unique -> adventurous)');t.sa_familiarity='adventurous';}});
fs.writeFileSync(DIR+'roster-tags.json',JSON.stringify(d,null,2));
console.log('\nreclassification applied.');
