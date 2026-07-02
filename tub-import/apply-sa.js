/* TUB SA-localization — safe, unambiguous ingredient/term replaces.
   Writes ONLY recipes/*.js. Preserves first-letter case. After applying,
   re-scans and asserts ZERO safe offenders remain (idempotency proof). */
const fs=require('fs');
const DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
// ORDER MATTERS: plurals/longer phrases first.
const MAP=[
  ['green onions','spring onions'],['green onion','spring onion'],
  ['scallions','spring onions'],['scallion','spring onion'],
  ['shrimps','prawns'],['shrimp','prawn'],
  ['eggplants','aubergines'],['eggplant','aubergine'],
  ['bell peppers','capsicums'],['bell pepper','capsicum'],
  ['cilantro','coriander'],
  ['ground beef','beef mince'],['ground pork','pork mince'],
  ['ground chicken','chicken mince'],['ground turkey','turkey mince'],['ground lamb','lamb mince'],
  ['baking soda','bicarbonate of soda'],
  ['powdered sugar','icing sugar'],["confectioners' sugar",'icing sugar'],['confectioners sugar','icing sugar'],
  ['arugula','rocket'],
  ['zucchinis','baby marrows'],['zucchini','baby marrow'],
  ['kaffir lime','makrut lime'],['kaffir','makrut'],
  ['rutabaga','swede'],['fava beans','broad beans'],['bok choy','pak choi']
];
function replCI(s,from,to){return s.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),m=>m[0]===m[0].toUpperCase()?to.charAt(0).toUpperCase()+to.slice(1):to);}
const files=fs.readdirSync(DIR).filter(f=>f.endsWith('.js'));
let total={};
files.forEach(f=>{
  const p=DIR+f; let s=fs.readFileSync(p,'utf8'); const before=s;
  MAP.forEach(([from,to])=>{ const c=s.split(from).length-1; if(c){ s=replCI(s,from,to); total[from]=(total[from]||0)+c; } });
  if(s!==before) fs.writeFileSync(p,s);
});
// re-scan assert
let leaks=[];
files.forEach(f=>{ const s=fs.readFileSync(DIR+f,'utf8').toLowerCase();
  MAP.forEach(([from])=>{ if(s.indexOf(from)>-1) leaks.push(f+':'+from); });
});
console.log('SA replaces applied:'); Object.keys(total).forEach(k=>console.log('  '+k+' -> '+(MAP.find(m=>m[0]===k)||[])[1]+'  ×'+total[k]));
console.log('\nTotal terms changed: '+Object.values(total).reduce((a,b)=>a+b,0));
console.log(leaks.length?('LEAK (still present): '+JSON.stringify(leaks)):'CLEAN — 0 safe offenders remain.');
if(leaks.length) process.exit(1);
