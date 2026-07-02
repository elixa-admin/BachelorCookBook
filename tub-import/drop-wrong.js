/* Drop a list of vision-confirmed-wrong slugs from recipes-images.js. */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};eval(fs.readFileSync(D+'recipes/recipes-images.js','utf8'));
const I=window.IMAGES;
const wrong=["steak","mussels-white-wine-garlic","molten-chocolate-fondant","beef-bourguignon","pizza-margherita","risotto-milanese-saffron"];
let n=0;wrong.forEach(s=>{if(I[s]){delete I[s];n++;}});
fs.writeFileSync(D+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(I,null,2)+';\n');
console.log('dropped '+n+' confirmed-wrong | remaining images: '+Object.keys(I).length);
