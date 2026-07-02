/* Repair common subagent JS typos in bad retrofit batches, then sandbox-validate. */
const fs=require('fs'),vm=require('vm');
const files=[3,5,8].map(n=>'recipes/retrofit/batch-'+n+'.js');
for(const f of files){
  let s=fs.readFileSync(f,'utf8');
  const before=s;
  // 1) missing colon before array key:  sides[ / sides [  ->  sides:[   (skip if colon already present)
  s=s.replace(/(sides|mistakes|diets)(?!\s*:)\s*\[/g,'$1:[');
  // 2) stray leading double-quote before a known key with no closing quote:  "storage:  ->  storage:
  s=s.replace(/"(prep|cook|mistakes|sides|storage|chef_upgrade|health_forward|diets|diet_notes):/g,'$1:');
  // 3) stray ')' immediately after ']' before a comma
  s=s.replace(/\]\),/g,'],');
  fs.writeFileSync(f,s);
  let verdict;
  try{vm.runInNewContext(s,{window:{}},{timeout:4000});verdict='REPAIRED + VALID ✓';}
  catch(e){verdict='STILL BAD — '+e.message.slice(0,120);}
  console.log(f+': '+(s===before?'no change | ':'changed | ')+verdict);
}
