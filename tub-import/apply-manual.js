/* TUB SA-localization — MANUAL conversions (°F→°C, cup→ml, broil→grill).
   Scope: dish data files ONLY (not knowledge layers — those already show °C primary).
   Self-verifying: re-scans and asserts ZERO leaks remain. Prints every change. */
const fs=require('fs');
const FILES=['premium-batch.js','global-exotic-batch.js','recipes-data.js','compendium-batch.js','recipes-batch5.js'].map(f=>'recipes/'+f);
const f2c=f=>Math.round((f-32)*5/9);
const FRAC={'½':0.5,'¼':0.25,'¾':0.75,'⅓':1/3,'⅔':2/3,'⅛':0.125};
function parseQty(s){s=(''+s).trim();let t=0;const im=s.match(/^(\d+)/);if(im)t+=parseInt(im[1],10);for(const c in FRAC)if(s.includes(c))t+=FRAC[c];return t;}
function ci(s,from,to){return s.replace(new RegExp(from,'gi'),m=>m[0]===m[0].toUpperCase()?to.charAt(0).toUpperCase()+to.slice(1):to);}
const log=[];
FILES.forEach(p=>{
  let s=fs.readFileSync(p,'utf8'),orig=s,n=0;
  // 1. triplet form  ["165","°F",...] -> ["74","°C",...]
  s=s.replace(/"(\d+)",\s*"°F"/g,(m,d)=>{const c=f2c(+d);n++;log.push('°F-triplet '+p+': "'+d+'°F"->"'+c+'°C"');return '"'+c+'","°C"';});
  // 2. inline  130°F / 225–250°F / 350 °F  -> °C
  s=s.replace(/(\d+)(?:([–-])(\d+))?\s*°F/g,(m,a,sep,b)=>{let r=sep?(f2c(+a)+sep+f2c(+b)):String(f2c(+a));n++;log.push('°F-inline '+p+': "'+m.trim()+'"->"'+r+'°C"');return r+'°C';});
  // 3. cups -> ml  (requires a quantity before; 1 SA cup = 250 ml)
  s=s.replace(/(\d+(?:\s?[½¼¾⅓⅔⅛])?|[½¼¾⅓⅔⅛])\s*cups?\b/gi,(m,q)=>{const ml=Math.round(parseQty(q)*250/5)*5;n++;log.push('cup '+p+': "'+m.trim()+'"->"'+ml+' ml"');return ml+' ml';});
  // 4. broil -> grill (SA: grill = oven top-heat; braai = BBQ)
  ['broiler','broiling','broiled','broil'].forEach(from=>{const to={broiler:'grill',broiling:'grilling',broiled:'grilled',broil:'grill'}[from];const c=(s.match(new RegExp(from,'gi'))||[]).length;if(c){s=ci(s,from,to);n++;log.push('broil '+p+': '+from+'->'+to+' ×'+c);}});
  if(s!==orig)fs.writeFileSync(p,s);
});
// re-scan assert
let leaks=[];
FILES.forEach(p=>{const s=fs.readFileSync(p,'utf8');
  if(/°F/.test(s))leaks.push(p+':°F');
  if(/(\d+(?:\s?[½¼¾⅓⅔⅛])?|[½¼¾⅓⅔⅛])\s*cups?\b/i.test(s))leaks.push(p+':cup');
  if(/broil/i.test(s))leaks.push(p+':broil');
});
log.slice(0,80).forEach(l=>console.log('  '+l));
console.log('\nManual conversions: '+log.length+' (shown '+(log.length>80?'first 80':'all')+')');
console.log(leaks.length?('LEAK: '+JSON.stringify(leaks)):'CLEAN — 0 °F / cup / broil remain in dish files.');
if(leaks.length)process.exit(1);
