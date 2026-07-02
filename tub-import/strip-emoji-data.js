/* Strip ALL decorative emoji from the recipe data files (icons/emoji fields).
   Leaves labels, blurbs and structure intact (icon:'' etc.). */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
const files=['curriculum.js','appliances.js','regions.js','skill-tiers.js'];
const EMO=/[\u{1F000}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}\u{2190}-\u{21FF}\u{2320}-\u{23FF}]/gu;
let total=0;
files.forEach(f=>{let s=fs.readFileSync(D+f,'utf8');const before=(s.match(EMO)||[]).length;s=s.replace(EMO,'');fs.writeFileSync(D+f,s);total+=before;console.log(f+': stripped '+before+' emoji chars');});
console.log('TOTAL stripped: '+total);
