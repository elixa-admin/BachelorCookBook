/* Concat + validate retrofit batches into recipes/retrofit.js.
   Each batch-K.js is an IIFE that sets window.RETROFIT[slug]={...}.
   We sandbox-eval each (so one bad file can't poison the app), validate field
   shapes, then emit a guaranteed-valid recipes/retrofit.js as JSON assignment. */
const fs=require('fs'),vm=require('vm'),path=require('path');
const DIR=path.join(__dirname,'recipes','retrofit');
const files=fs.readdirSync(DIR).filter(f=>/^batch-.*\.js$/.test(f)).sort((a,b)=>{const na=(a.match(/\d+/)||['z'])[0],nb=(b.match(/\d+/)||['z'])[0];return (na==='z'?99:+na)-(nb==='z'?99:+nb);});
const merged={};
let okFiles=0,badFiles=0;const fileReport=[];
const VALID_DIETS=['med','highprotein','lowcarb','plant'];
const ARR=['mistakes','sides','diets'],STR=['prep','cook','storage','chef_upgrade','health_forward','diet_notes'];
for(const f of files){
  const code=fs.readFileSync(path.join(DIR,f),'utf8');
  const sandbox={window:{}};
  try{
    vm.runInNewContext(code,sandbox,{timeout:4000});
    const R=sandbox.window.RETROFIT||{};
    let n=0,shapeBad=[];
    for(const slug in R){
      const v=R[slug];n++;
      ARR.forEach(k=>{if(v[k]!==undefined&&!Array.isArray(v[k]))shapeBad.push(slug+'.'+k+' not array');});
      STR.forEach(k=>{if(v[k]!==undefined&&typeof v[k]!=='string')shapeBad.push(slug+'.'+k+' not string');});
      if(v.diets&&Array.isArray(v.diets)){v.diets.forEach(dk=>{if(VALID_DIETS.indexOf(dk)<0)shapeBad.push(slug+'.diets bad key "'+dk+'"');});}
      merged[slug]=Object.assign(merged[slug]||{},v);
    }
    okFiles++;fileReport.push(f+': '+n+' recipes'+(shapeBad.length?'  ⚠ '+shapeBad.slice(0,3).join('; '):''));
  }catch(e){
    badFiles++;fileReport.push(f+': PARSE/RUN ERROR — '+e.message.slice(0,120));
  }
}
// coverage vs manifest
const man=JSON.parse(fs.readFileSync('retrofit-manifest.json','utf8'));
const manSlugs=man.map(g=>g.slug);
const missing=manSlugs.filter(s=>!merged[s]);
const extra=Object.keys(merged).filter(s=>manSlugs.indexOf(s)<0);
// emit guaranteed-valid JS
const header='/* Retrofit overlay — auto-built from recipes/retrofit/batch-*.js.\n   Fill-missing standard fields; applied to R (full-cook items share FULL refs). */\n';
const body='window.RETROFIT=Object.assign(window.RETROFIT||{},'+JSON.stringify(merged)+');\n';
fs.writeFileSync(path.join(__dirname,'recipes','retrofit.js'),header+body);
console.log('=== CONCAT RETROFIT ===');
console.log('batch files: '+files.length+' | OK: '+okFiles+' | BAD: '+badFiles);
fileReport.forEach(r=>console.log('  '+r));
console.log('merged recipes: '+Object.keys(merged).length);
console.log('manifest needs: '+manSlugs.length+' | missing coverage: '+missing.length+(missing.length?' -> '+missing.join(', '):' ✓'));
console.log('extra (not in manifest): '+extra.length+(extra.length?' -> '+extra.join(', '):''));
console.log(badFiles===0&&missing.length===0?'VERDICT: PASS ✓':'VERDICT: NEEDS ATTENTION ✗');
