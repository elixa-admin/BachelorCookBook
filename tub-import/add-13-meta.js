const fs=require('fs');
const RC_F='recipes/roster-classes.js';
let rcSrc=fs.readFileSync(RC_F,'utf8');
let o=JSON.parse(rcSrc.slice(rcSrc.indexOf('{'),rcSrc.lastIndexOf('}')+1));
const NEW={"pizza-margherita":"adopted","spaghetti-bolognese":"adopted","fettuccine-alfredo":"adopted","penne-arrabbiata":"adopted","potato-gnocchi":"adopted","prego-roll":"adopted","espetada":"adopted","peri-peri-chicken-livers":"adopted","grilled-calamari":"adopted","home-chicken-curry":"heritage","beef-ribs-sticky-braise":"adopted","egg-fried-rice":"adopted","chicken-stir-fry":"adopted"};
let add=0;
Object.keys(NEW).forEach(function(s){if(!o[s]){o[s]={cat:'main',tier:NEW[s]};add++;}else{o[s].cat='main';o[s].tier=NEW[s];o[s].cut=false;}});
fs.writeFileSync(RC_F,'window.ROSTER_CLASSES='+JSON.stringify(o,null,2)+';\n');
const ST_F='recipes/skill-tiers.js';
let st=fs.readFileSync(ST_F,'utf8');
let stAdd='';
Object.keys(NEW).forEach(function(s){if(st.indexOf("'"+s+"'")<0&&st.indexOf('"'+s+'"')<0){stAdd+="\n  '"+s+"':{level:'capable',why:'Authored to the SA-palate standard',skills:['technique','timing','seasoning']},";}});
if(stAdd){st=st.replace(/window\.SKILL_TIERS=\{/,'window.SKILL_TIERS={'+stAdd);}
fs.writeFileSync(ST_F,st);
console.log('roster entries added:',add,'| total entries:',Object.keys(o).length,'| live:',Object.values(o).filter(function(v){return !v.cut;}).length);
