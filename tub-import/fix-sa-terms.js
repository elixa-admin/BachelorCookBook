/* Fix SA-localization violations in retrofit batch sources (so re-concat keeps them):
   kaffir->makrut; measurement "cups <veg>"->grams; "Cup of strong tea"->"Strong tea".
   Leaves "lettuce cups" (a wrap term) untouched. */
const fs=require('fs');
const DIR='recipes/retrofit';
const files=fs.readdirSync(DIR).filter(f=>/^batch-.*\.js$/.test(f));
const reps=[
  [/kaffir lime/gi,'makrut lime'],
  [/(\d+)\s*cups?\s+riced cauliflower/gi,(m,n)=>'about '+(parseInt(n,10)*125)+' g riced cauliflower'],
  [/(\d+)\s*cups?\s+chopped butternut/gi,(m,n)=>'about '+(parseInt(n,10)*150)+' g chopped butternut'],
  [/(\d+)\s*cups?\s+diced butternut/gi,(m,n)=>'about '+(parseInt(n,10)*150)+' g diced butternut'],
  [/"Cup of strong tea"/g,'"Strong tea"'],
];
let total=0;
for(const f of files){
  let s=fs.readFileSync(DIR+'/'+f,'utf8'),o=s;
  reps.forEach(r=>s=s.replace(r[0],r[1]));
  if(s!==o){fs.writeFileSync(DIR+'/'+f,s);total++;console.log('fixed: '+f);}
}
console.log('files changed: '+total);
