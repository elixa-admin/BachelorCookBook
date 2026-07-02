/* Robust image merge: reads ALL images-batch*.json, decodes &amp;->&, validates
   Unsplash CDN pattern, merges into IMAGES, rewrites the WHOLE file as clean
   JSON. Idempotent (skips existing slugs). Run after each agent returns. */
const fs=require('fs');
const P='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/recipes-images.js';
global.window={};
try{eval(fs.readFileSync(P,'utf8'));}catch(e){console.error('EXISTING FILE BROKEN: '+e.message);process.exit(1);}
const I=window.IMAGES||{};
const files=fs.readdirSync('/Users/brandondienar/.claude/jobs/d2505485/tmp').filter(f=>/^images-batch.*\.json$/.test(f));
let added=0,skipped=0,nulls=0,rejected=0;
const merged={};
files.forEach(f=>{let arr;try{arr=JSON.parse(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/'+f,'utf8'));}catch(e){console.log('skip unreadable '+f);return;}
  (arr.items||[]).forEach(it=>{if(!it||!it.url){nulls++;return;}let u=it.url.replace(/&amp;/g,'&');
    if(!/^https:\/\/images\.unsplash\.com\/photo-/.test(u)){rejected++;console.log('reject (not unsplash CDN): '+it.slug);return;}
    if(I[it.slug]){skipped++;return;}I[it.slug]=u;added++;merged[it.slug]=u;});});
fs.writeFileSync(P,'window.IMAGES='+JSON.stringify(I,null,2)+';\n');
console.log('batch files:'+files.length+' | added:'+added+' skipped(exists):'+skipped+' nulls:'+nulls+' rejected:'+rejected+' | TOTAL:'+Object.keys(I).length);
if(added)console.log('new: '+Object.keys(merged).join(', '));
