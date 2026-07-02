/* Second repair pass on batch-3 & batch-5: missing opening bracket and
   array closed with ')' instead of ']'. Targeted, then sandbox-validate. */
const fs=require('fs'),vm=require('vm');
const files=['recipes/retrofit/batch-3.js','recipes/retrofit/batch-5.js'];
for(const f of files){
  let s=fs.readFileSync(f,'utf8');
  // missing opening '[':  sides:"..."  ->  sides:["..."
  s=s.replace(/(sides|mistakes|diets):"/g,'$1:["');
  // array element closed with ')' instead of ']':  "..."  followed by ')'  ->  '"]'
  s=s.replace(/"\)/g,'"]');
  fs.writeFileSync(f,s);
  let v;
  try{vm.runInNewContext(s,{window:{}},{timeout:4000});v='VALID ✓';}
  catch(e){v='STILL BAD — '+e.message.slice(0,140);}
  console.log(f+': '+v);
}
