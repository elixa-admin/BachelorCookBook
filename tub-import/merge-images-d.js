/* Merge image candidates (tmp/images-batchD.json) into recipes/recipes-images.js.
   Decodes HTML entities; DEDUPES by URL so no two dishes ever share a photo. */
const fs=require('fs'),DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};
fs.readdirSync(DIR+'recipes/').filter(f=>f.endsWith('.js')).forEach(f=>{try{eval(fs.readFileSync(DIR+'recipes/'+f,'utf8'));}catch(e){}});
const I=Object.assign({},window.IMAGES||{});
const dec=s=>typeof s!=='string'?s:s.replace(/&amp;/g,'&');
let cands=[];
try{cands=JSON.parse(fs.readFileSync(DIR+'images-batchD.json','utf8'));}catch(e){console.log('(images-batchD.json not found yet)');process.exit(0);}
const usedUrls=new Set(Object.values(I));
let added=0,dropped=0;const report=[];
cands.forEach(c=>{if(!c||!c.slug||!c.url)return;const url=dec(c.url);
  if(I[c.slug]){report.push('  '+c.slug+': already has image');return;}
  if(usedUrls.has(url)){dropped++;report.push('  '+c.slug+': DROPPED (URL reused by another dish)');return;}
  I[c.slug]=url;usedUrls.add(url);added++;report.push('  '+c.slug+': added ['+(c.match||'?')+' s'+c.score+']');});
fs.writeFileSync(DIR+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(I,null,2)+';\n');
console.log('IMAGE MERGE: added '+added+' | dropped-reused '+dropped+' | total images now '+Object.keys(I).length);
console.log(report.join('\n'));
