/* Merge 17 source-guaranteed Wikimedia canonical photos (filename == dish) into
   recipes-images.js. Rejected by filename-inspection: frittata (raw ingredients),
   kibbeh (raw tartare variant). Idempotent. */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};eval(fs.readFileSync(D+'recipes/recipes-images.js','utf8'));
const I=window.IMAGES;
const cc=JSON.parse(fs.readFileSync(D+'commons-candidates.json','utf8'));
const keep=['mussakhan','fattoush','malai-kofta','melktert','koeksisters','potbrood','bruschetta','caesar-salad','sausage-rolls','garlic-bread','caprese-salad','pulled-pork','french-toast','palak-paneer','potjiekos','nachos','vetkoek'];
let n=0;
keep.forEach(s=>{if(cc[s]&&!I[s]){I[s]=cc[s].thumb;n++;}else if(I[s])console.log('  already present:',s);else console.log('  no candidate:',s);});
fs.writeFileSync(D+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(I,null,2)+';\n');
console.log('added '+n+' | live images now '+Object.keys(I).length);
