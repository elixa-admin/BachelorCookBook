/* IMAGE INTEGRITY AUDIT — phase 1: immediate honesty.
   1) Drop every slug whose URL is shared by >1 dish (a photo can't be two dishes).
   2) Drop vision-confirmed-wrong slugs (macarons, syrniki, etc.).
   3) Write cleaned recipes-images.js (kept = to be vision-verified next).
   4) Emit images-to-verify.json (slug+url) for the verification pass. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};
eval(fs.readFileSync(DIR+'recipes/recipes-images.js','utf8'));
const I=Object.assign({},window.IMAGES||{});
const entries=Object.entries(I);
// 1) duplicate-PHOTO detection (normalize: strip query string so w=1200 vs w=1600 of the SAME photo id match)
const photoId=u=>u.split('?')[0];
const byUrl={};
entries.forEach(([s,u])=>{const k=photoId(u);(byUrl[k]=byUrl[k]||[]).push(s);});
const dupSlugs=new Set();
Object.entries(byUrl).forEach(([u,sl])=>{if(sl.length>1){sl.forEach(s=>dupSlugs.add(s));}});
// 2) vision-confirmed wrong (from manual analyze_image checks)
const confirmedWrong=new Set(['koeksisters','malai-kofta','potjiekos','mussakhan','creme-brulee','melktert']);
const drop=new Set([...dupSlugs,...confirmedWrong]);
const kept=entries.filter(([s])=>!drop.has(s));
// write cleaned file
const cleaned={};kept.forEach(([s,u])=>cleaned[s]=u);
fs.writeFileSync(DIR+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(cleaned,null,2)+';\n');
// emit verify list
fs.writeFileSync(DIR+'images-to-verify.json',JSON.stringify(kept.map(([s,u])=>({slug:s,url:u})),null,2));
// report
console.log('=== IMAGE AUDIT — phase 1 (honest now) ===');
console.log('total entries        :',entries.length);
console.log('DROPPED — duplicates :',dupSlugs.size,'  ->',[...dupSlugs].join(', '));
console.log('DROPPED — confirmed  :',[...confirmedWrong].filter(s=>I[s]).join(', '));
console.log('total dropped        :',entries.length-kept.length);
console.log('KEPT (to vision-verify):',kept.length);
console.log('\nwrote recipes/images-to-verify.json ('+kept.length+' entries) for the verification pass.');
