const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
// 1) Fix quantity/unit-as-separate-elements cup tuples -> ml (1 SA cup=250ml)
const FILES=['premium-batch.js','global-exotic-batch.js','recipes-data.js','compendium-batch.js','recipes-batch5.js'].map(f=>DIR+f);
let total=0;
FILES.forEach(p=>{let s=fs.readFileSync(p,'utf8'),o=s;
  s=s.replace(/"(\d+(?:\.\d+)?)","cups?"/g,(m,n)=>{const ml=Math.round(+n*250/5)*5;total++;console.log('cup-tuple '+p.split('/').pop()+': '+n+' cup -> '+ml+' ml');return '"'+ml+'","ml"';});
  if(s!==o)fs.writeFileSync(p,s);});
console.log('cup-tuple conversions: '+total);

// 2) Check 15 candidate new-dish slugs against existing 87 (must be ZERO dups)
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+f,'utf8'));}catch(e){}});
const exist=new Set();Object.keys(window).forEach(k=>{if(Array.isArray(window[k]))window[k].forEach(r=>{if(r&&r.slug)exist.add(r.slug);});});
const cand=['mussakhan','kibbeh','fattoush','palak-paneer','malai-kofta','bobotie','malva-pudding','koeksisters','melktert','potbrood','chakalaka','focaccia','tiramisu','borscht','crepes'];
const dups=cand.filter(c=>exist.has(c));
console.log('\nExisting dish count: '+exist.size);
console.log('Candidate new slugs: '+cand.length+' | DUPLICATES: '+(dups.length?dups.join(', '):'NONE — all 15 are safe to author'));
