/* Merge restore-confirmed.json (vision-verified-correct slug:url) into the live
   recipes-images.js. Idempotent: only adds slugs not already live. */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};eval(fs.readFileSync(D+'recipes/recipes-images.js','utf8'));
const I=window.IMAGES;const add=JSON.parse(fs.readFileSync(D+'restore-confirmed.json','utf8'));
let n=0;Object.entries(add).forEach(([s,u])=>{if(!I[s]){I[s]=u;n++;}});
fs.writeFileSync(D+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(I,null,2)+';\n');
console.log('added '+n+' | live images now '+Object.keys(I).length);
