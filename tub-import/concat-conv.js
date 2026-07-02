/* Concat + validate full-cook conversion JSON into recipes/fullcook-conversions.js.
   Each conv-out-K.json is a JSON array of full recipe objects. JSON.parse each
   (precise errors), validate required fields + ingredient scaling types + step
   arity, then emit a guaranteed-valid recipes/fullcook-conversions.js. */
const fs=require('fs'),path=require('path');
const DIR='recipes/fullcook-conv';
const files=fs.readdirSync(DIR).filter(f=>/^conv-out-.*\.json$/.test(f)).sort();
const REQ=['slug','t','prov','brief','ing','tl','steps'];
const SCALE=['linear','taper','countN','countX','static'];
const all=[];const report=[];let bad=0;
for(const f of files){
  let arr;
  try{arr=JSON.parse(fs.readFileSync(path.join(DIR,f),'utf8'));}
  catch(e){bad++;report.push(f+': JSON PARSE ERROR — '+e.message.slice(0,120));continue;}
  if(!Array.isArray(arr)){bad++;report.push(f+': not an array');continue;}
  const issues=[];
  arr.forEach(function(r,i){
    REQ.forEach(function(k){if(r[k]===undefined)issues.push((r.slug||'#'+i)+' missing '+k);});
    if(r.ing)r.ing.forEach(function(g){(g[1]||[]).forEach(function(it){if(SCALE.indexOf(it[0])<0)issues.push((r.slug||'')+' bad scaling "'+it[0]+'"');});});
    if(r.steps){
      if(r.steps.length<4)issues.push((r.slug||'')+' only '+r.steps.length+' steps');
      r.steps.forEach(function(s,si){if(!Array.isArray(s)||s.length!==4)issues.push((r.slug||'')+' step#'+si+' not 4 els');});
    }
    if(r.tl)r.tl.forEach(function(t,ti){if(!Array.isArray(t)||t.length!==4)issues.push((r.slug||'')+' tl#'+ti+' not 4 els');});
  });
  arr.forEach(r=>all.push(r));
  report.push(f+': '+arr.length+' recipes'+(issues.length?'  ⚠ '+issues.slice(0,5).join('; '):' ✓'));
}
const header='/* Full-cook conversions — auto-built from recipes/fullcook-conv/conv-out-*.json. */\nwindow.FULLCOOK_CONV=window.FULLCOOK_CONV||[];\nFULLCOOK_CONV.push.apply(FULLCOOK_CONV,'+JSON.stringify(all)+');\n';
fs.writeFileSync('recipes/fullcook-conversions.js',header);
console.log('=== CONCAT CONVERSIONS ===');
report.forEach(r=>console.log('  '+r));
console.log('recipes merged: '+all.length+' | bad files: '+bad);
