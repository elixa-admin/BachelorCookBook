// Apply the 32-unreviewed split into ROSTER_CLASSES.
// 19 CUT (cut:true) + 13 KEEP (classified, cut:false).
// Merge: existing entries untouched; new entries added; re-serialized.
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'recipes', 'roster-classes.js');

const CUT_NICHE_ASIAN = [
  'pho-bo','mapo-tofu','pad-thai','tonkotsu-ramen','khao-soi','som-tum',
  'beef-bulgogi','beef-rendang','massaman-curry','katsu-curry','jollof-rice'
];
const CUT_DUPS = ['tacos-al-pastor','tagliatelle-al-ragu-bolognese','beef-bourguignon'];
const CUT_ASPIRATIONAL = ['peking-duck','paella-mixta','slow-roast-lamb-kleftiko','grilled-crayfish-garlic-butter','osso-buco-gremolata'];

const KEEP = {
  'carbonara': {cat:'main',tier:'adopted'},
  'cacio-e-pepe': {cat:'main',tier:'adopted'},
  'risotto-milanese-saffron': {cat:'main',tier:'adopted'},
  'steak': {cat:'main',tier:'aspirational'},
  'roast-chicken': {cat:'main',tier:'adopted'},
  'smash-burgers-special-sauce': {cat:'main',tier:'adopted'},
  'thai-green-curry': {cat:'main',tier:'adopted'},
  'salmon': {cat:'main',tier:'adopted'},
  'shakshuka-crusty-bread': {cat:'main',tier:'adopted'},
  'molten-chocolate-fondant': {cat:'sweet',tier:'adopted'},
  'mussels-white-wine-garlic': {cat:'main',tier:'adopted'},
  'carnitas-tacos': {cat:'main',tier:'adopted'},
  'moussaka': {cat:'main',tier:'adopted'}
};

const additions = {};
CUT_NICHE_ASIAN.forEach(s => additions[s] = {cat:'main',tier:'adopted',cut:true});
CUT_DUPS.forEach(s => additions[s] = {cat:'main',tier: (s==='beef-bourguignon'?'aspirational':'adopted'), cut:true});
CUT_ASPIRATIONAL.forEach(s => additions[s] = {cat:'main',tier:'aspirational',cut:true});
Object.keys(KEEP).forEach(s => additions[s] = Object.assign({cut:false}, KEEP[s]));

// Parse existing
let src = fs.readFileSync(file,'utf8');
const body = src.replace(/^window\.ROSTER_CLASSES\s*=\s*/,'').replace(/;\s*$/,'');
const ROSTER = eval('(' + body + ')');

let added=0, skipped=0;
for (const slug of Object.keys(additions)) {
  if (ROSTER[slug]) { skipped++; continue; }
  ROSTER[slug] = additions[slug];
  added++;
}

// Serialize
function ser(o){
  const keys = Object.keys(o);
  const lines = keys.map(k => {
    const v = o[k];
    const inner = Object.keys(v).map(fk => `"${fk}": ${JSON.stringify(v[fk])}`).join(', ');
    return `  "${k}": {\n    ${inner}\n  }`;
  });
  return 'window.ROSTER_CLASSES={\n' + lines.join(',\n') + '\n};\n';
}
fs.writeFileSync(file, ser(ROSTER));

console.log('Added:', added, 'Skipped (already present):', skipped);
console.log('CUT count:', [...CUT_NICHE_ASIAN,...CUT_DUPS,...CUT_ASPIRATIONAL].length);
console.log('KEEP count:', Object.keys(KEEP).length);
