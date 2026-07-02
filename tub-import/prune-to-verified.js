/* HONEST-NOW PRUNE: keep only vision-verified-correct images live; park the
   rest in images-unverified.json for progressive restore. The live image set
   (recipes-images.js) thus only ever contains photos confirmed to match. */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};eval(fs.readFileSync(D+'recipes/recipes-images.js','utf8'));
const I=window.IMAGES;
const verified=new Set(["carbonara","salmon","roast-chicken","thai-green-curry","carnitas-tacos","shakshuka-crusty-bread","smash-burgers-special-sauce","tagliatelle-al-ragu-bolognese","katsu-curry","egg-fried-rice","khao-soi"]);
const keep={},unverified=[];
Object.entries(I).forEach(([s,u])=>{if(verified.has(s))keep[s]=u;else unverified.push({slug:s,url:u});});
fs.writeFileSync(D+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(keep,null,2)+';\n');
fs.writeFileSync(D+'images-unverified.json',JSON.stringify(unverified,null,2));
console.log('LIVE verified-correct : '+Object.keys(keep).length);
console.log('parked for restore    : '+unverified.length);
