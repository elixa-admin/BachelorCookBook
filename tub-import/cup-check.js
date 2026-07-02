const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+f,'utf8'));}catch(e){}});
const want=new Set(['tacos-al-pastor','massaman-curry','jollof-rice']);
const dishes=[];
Object.keys(window).forEach(k=>{if(Array.isArray(window[k]))window[k].forEach(r=>{if(r&&r.slug&&want.has(r.slug))dishes.push(r);});});
dishes.forEach(r=>{
  const str=JSON.stringify(r); const re=/[^"\[\],{}]{0,45}cups?[^"\[\],{}]{0,45}/gi; let m;
  console.log('\n### '+r.slug);
  while((m=re.exec(str)))console.log('  …'+m[0].trim()+'…');
});
