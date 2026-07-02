const fs=require('fs');
const p='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/recipes-images.js';
let s=fs.readFileSync(p,'utf8');
global.window={};eval(s);
const IM=window.IMAGES||{};
const out={};
for(const k of Object.keys(IM)){
  const nk=k.replace(/([a-z0-9])([A-Z])/g,'$1-$2').toLowerCase();
  out[nk]=IM[k];
}
// expected canonical slugs (kebab) for cross-check
const expect=['steak','carbonara','salmon','roast-chicken','beef-rendang','bobotie','beef-bourguignon','peking-duck','slow-roast-lamb-kleftiko','grilled-crayfish-garlic-butter','osso-buco-gremolata','paella-mixta','butter-chicken','pad-thai','tacos-al-pastor','tonkotsu-ramen','tagliatelle-al-ragu-bolognese','pizza-margherita','katsu-curry','egg-fried-rice','khao-soi','massaman-curry','pho-bo','moussaka','jollof-rice','mapo-tofu','som-tum','beef-bulgogi','risotto-milanese-saffron','thai-green-curry','carnitas-tacos','mussels-white-wine-garlic','cacio-e-pepe','shakshuka-crusty-bread','molten-chocolate-fondant','smash-burgers-special-sauce','coq-au-vin','rogan-josh','lamb-shank-red-wine','french-onion-soup','steak-frites-cafe-de-paris','bouillabaisse','duck-a-l-orange','beef-wellington','tiramisu','creme-brulee','malva-pudding','mango-sticky-rice','churros'];
fs.writeFileSync(p,'window.IMAGES='+JSON.stringify(out,null,2)+';\n');
const have=new Set(Object.keys(out));
console.log('TOTAL KEYS: '+have.size);
console.log('MISSING (no photo):', expect.filter(x=>!have.has(x)).join(', ')||'(none)');
console.log('--- final keys ---'); console.log(Object.keys(out).sort().join('\n'));
