/* TUB knowledgebase + recipe-completeness assessment. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+f,'utf8'));}catch(e){}});
const W=window;
// roster + liveness
const FULL={};
[W.GLOBAL_EXOTIC_BATCH,W.PREMIUM_BATCH,W.RECIPES].forEach(s=>{if(s)s.forEach(r=>{if(r&&r.slug&&r.prov&&r.ing&&r.steps)FULL[r.slug]=r;});});
let R=[...Object.values(FULL)];[W.COMPENDIUM,W.BATCH5,W.FOUNDATION_BATCH].forEach(s=>{if(s)s.forEach(r=>{if(r&&r.slug&&!FULL[r.slug]&&!R.find(x=>x.slug===r.slug))R.push(r);});});
const compendium=R.filter(r=>!FULL[r.slug]&&r.key_ings);
const full=Object.values(FULL);
console.log('=== RECIPE COMPLETENESS ===');
console.log('Full-cook (steps): '+full.length+' | Compendium (story only): '+compendium.length);
console.log('\nCompendium dishes (conversion candidates, '+compendium.length+'):');
console.log('  '+compendium.map(r=>r.slug).join(', '));
// foundation dishes liveness
const fnd=(W.FOUNDATION_BATCH||[]).map(r=>r.slug+'('+(FULL[r.slug]?'FULL':'comp')+')');
console.log('\nFoundation-15: '+fnd.join(', '));

// FULL schema shape (from one real record)
const sample=full[0];
if(sample){console.log('\n=== FULL-COOK SCHEMA (keys of a real record) ===');
  console.log('top: '+Object.keys(sample).join(', '));
  console.log('brief keys: '+Object.keys(sample.brief||{}).join(', '));
  console.log('ing[0] sample: '+JSON.stringify((sample.ing&&sample.ing[0]&&sample.ing[0][1]&&sample.ing[0][1][0])||null));
  console.log('steps[0]: '+JSON.stringify((sample.steps&&sample.steps[0])||null).slice(0,200));
  console.log('tl[0]: '+JSON.stringify((sample.tl&&sample.tl[0])||null));
  console.log('pair[0]: '+JSON.stringify((sample.pair&&sample.pair[0])||null));
}

// knowledgebase layers
console.log('\n=== KNOWLEDGEBASE LAYERS ===');
[['SUBS','substitutes'],['NOMEN','nomenclature'],['NUTRITION','recipes-nutrition'],['MASTERCLASS','masterclass'],['CULINARY','culinary'],['CULINARY_EXTRA','culinary-extra'],['THEMES','themes'],['GLOSS','glossary'],['TIPS','recipes-tips'],['COURSES','courses']].forEach(([k,f])=>{
  const v=W[k];const n=v&&(v.length!==undefined?v.length:Object.keys(v).length);console.log('  '+k+': '+(n!==undefined?n:'?')+'  ('+f+'.js)');
});
// masterclass coverage: how many dish slugs map to a masterclass?
const M=W.MASTERCLASS||[];
let covered=new Set();
M.forEach(m=>{(m.dishes||[]).forEach(d=>covered.add(d));});
const coveredInR=R.filter(r=>covered.has(r.slug)).length;
console.log('\nMASTERCLASS entries: '+M.length+' | explicit dish coverage: '+coveredInR+'/'+R.length);
console.log('  masterclass fields: '+(M[0]?Object.keys(M[0]).join(', '):'none'));
console.log('  method ids: '+M.slice(0,12).map(m=>m.id).join(', ')+(M.length>12?'…':''));

// nomenclature: is renderNomenclature wired?
const html=fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8');
console.log('\n=== FUNCTIONALITY PROBES ===');
['renderNomenclature','nomenHTML','renderLearnTab','masterclassHTML','setVariant','renderVariants'].forEach(fn=>console.log('  '+fn+': '+(new RegExp('function '+fn+'\\b').test(html)?'defined ✓':'MISSING ✗')));
console.log('  NOMEN sample keys: '+Object.keys(W.NOMEN||{}).slice(0,8).join(', '));
console.log('  NOMEN sample value: '+JSON.stringify(Object.values(W.NOMEN||{}))[0]?.slice(0,120));
