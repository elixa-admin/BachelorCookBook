/* Validate + NORMALIZE + merge full-cook records from fullcook-*.json -> recipes/fullcook-batch.js.
   Schema-strict: auto-fixes agent nits (HTML entities, mode typos, mislabeled units),
   scans SA-cleanliness, confirms slugs exist in the roster. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};
fs.readdirSync(DIR+'recipes/').filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+'recipes/'+f,'utf8'));}catch(e){}});
const W=window;
const exist=new Set();Object.keys(W).forEach(k=>{if(Array.isArray(W[k]))W[k].forEach(r=>{if(r&&r.slug)exist.add(r.slug);});});
const MODES={countX:1,linear:1,taper:1,countN:1};
const SA=/(?:\bcilantro\b)|(?:ground (?:beef|pork|chicken|turkey|lamb))|(?:\bscallion\b)|(?:green onion)|(?:\beggplant\b)|(?:\bshrimp\b)|(?:\bzucchini\b)|(?:\barugula\b)|°F|(?:\b\d+(?:\.\d+)?\s*cups?\b)|(?:kaffir)|(?:bell pepper)|(?:baking soda)|(?:powdered sugar)|(?:confectioners)/i;
const dec=s=>typeof s!=='string'?s:s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#0?39;/g,"'").replace(/&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function normIng(it){
  if(!Array.isArray(it)||it.length<3)return null;
  let mode=typeof it[0]==='string'?it[0].trim().replace(/,+$/,''):it[0];
  let base=it[1], unit=typeof it[2]==='string'?it[2].trim():it[2], name=dec(typeof it[3]==='string'?it[3]:'').trim();
  // fix common agent typos, preserve canonical casing
  if(mode==='liner'||mode==='linea'||mode==='linar'||mode==='Linear')mode='linear';
  if(mode==='CountX'||mode==='countx')mode='countX';
  if(mode==='Taper'||mode==='tapere'||mode==='tapper')mode='taper';
  if(mode==='CountN'||mode==='countn'||mode==='count')mode='countN';
  // unit/mode sanity: weighted things shouldn't be countN; tbsp/tsp should be linear
  if(mode==='countN'&&typeof unit==='string'&&/^(g|kg|ml|l)$/i.test(unit))mode='countX';
  else if(mode==='countN'&&typeof unit==='string'&&/^(tbsp|tsp|cm)$/i.test(unit))mode='linear';
  else if(mode==='countX'&&typeof unit==='string'&&/^(tbsp|tsp|cm)$/i.test(unit))mode='linear';
  if(typeof unit==='string')unit=unit.trim();
  return [mode,base,unit,name];
}
function norm(r){
  if(!r||typeof r!=='object')return r;
  ['t','blurb','method','time','diff','cui','tier'].forEach(k=>{if(typeof r[k]==='string')r[k]=dec(r[k]);});
  if(r.prov)Object.keys(r.prov).forEach(k=>{r.prov[k]=dec(r.prov[k]);});
  if(r.brief){r.brief.lead=dec(r.brief.lead||'');['expect','stats','kit'].forEach(k=>{if(Array.isArray(r.brief[k]))r.brief[k]=r.brief[k].map(dec);});}
  if(Array.isArray(r.pair))r.pair=r.pair.map(p=>p.map((x)=>typeof x==='string'?dec(x):x));
  if(Array.isArray(r.tl))r.tl=r.tl.map(t=>t.map((x,i)=>i===3?x:(typeof x==='string'?dec(x):x)));
  if(Array.isArray(r.steps))r.steps=r.steps.map(s=>[dec(s[0]||''),dec(s[1]||''),dec(s[2]||''),s[3]]);
  if(Array.isArray(r.ing))r.ing=r.ing.map(g=>{if(!Array.isArray(g)||!Array.isArray(g[1]))return g;const ng=g[1].map(normIng).filter(Boolean);return [dec(g[0]),ng];});
  return r;
}
const files=fs.readdirSync(DIR).filter(f=>/^fullcook-.*\.json$/.test(f)).sort();
let all=[],report=[];
files.forEach(f=>{let d;try{d=JSON.parse(fs.readFileSync(DIR+f,'utf8'));}catch(e){report.push('X '+f+' not valid JSON: '+e.message);return;}
  if(!Array.isArray(d)){report.push('X '+f+' not an array');return;}
  report.push('- '+f+': '+d.length+' records');all=all.concat(d);});
const normed=all.map(norm);
const bad=(r,m)=>({slug:r&&r.slug||'?',err:m});
const valid=[],errors=[];
normed.forEach(r=>{
  if(!r||typeof r!=='object'){errors.push(bad(r,'not object'));return;}
  if(!exist.has(r.slug)){errors.push(bad(r,'slug not in roster'));return;}
  const need=['t','tier','cui','time','method','diff','blurb','prov','brief','ing','tl','steps','pair'];
  for(const k of need){if(r[k]===undefined){errors.push(bad(r,'missing '+k));return;}}
  if(!Array.isArray(r.occ)||!r.occ.length){errors.push(bad(r,'occ missing'));return;}
  for(const k of ['popular_in','famous_for','consists_of','name_origin','why_loved','method_detail']){if(!(r.prov&&r.prov[k])){errors.push(bad(r,'prov.'+k));return;}}
  for(const k of ['lead','expect','stats','kit']){if(!(r.brief&&r.brief[k])){errors.push(bad(r,'brief.'+k));return;}}
  if(!Array.isArray(r.ing)||!r.ing.length){errors.push(bad(r,'ing empty'));return;}
  let staticCount=0,badIng=0;
  r.ing.forEach(g=>{if(!Array.isArray(g)||!Array.isArray(g[1])){badIng++;return;}g[1].forEach(it=>{if(!Array.isArray(it)||!MODES[it[0]]){if(it&&it[0]==='static')staticCount++;else badIng++;}
    else if(typeof it[1]!=='number'){badIng++;}});});
  if(badIng){errors.push(bad(r,'ing malformed ('+badIng+')'));return;}
  if(staticCount){errors.push(bad(r,'uses static mode ('+staticCount+')'));return;}
  if(!Array.isArray(r.steps)||r.steps.length<4){errors.push(bad(r,'steps<4'));return;}
  if(!Array.isArray(r.tl)||!r.tl.length){errors.push(bad(r,'tl empty'));return;}
  if(!Array.isArray(r.pair)||!r.pair.length){errors.push(bad(r,'pair empty'));return;}
  const saHit=(JSON.stringify(r).match(SA)||[]);if(saHit.length){errors.push(bad(r,'SA offenders: '+saHit.slice(0,4).join(',')));return;}
  valid.push(r);
});
const bySlug={};valid.forEach(r=>bySlug[r.slug]=r);
const final=Object.values(bySlug);
fs.writeFileSync(DIR+'recipes/fullcook-batch.js','window.FULLCOOK_BATCH='+JSON.stringify(final,null,2)+';\n');
console.log(report.join('\n'));
console.log('\nINPUT records: '+all.length+' | VALID: '+final.length+' | REJECTED: '+errors.length);
if(errors.length)console.log('REJECTED:\n'+errors.map(e=>'  '+e.slug+': '+e.err).join('\n'));
console.log('\nWRITTEN: recipes/fullcook-batch.js ('+final.length+' records)');
if(final.length)console.log('slugs: '+final.map(r=>r.slug).join(', '));
