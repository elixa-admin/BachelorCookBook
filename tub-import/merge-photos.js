/* Merge the 21 vision-verified TheMealDB photos into recipes-images.js (idempotent). */
const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
global.window={};eval(fs.readFileSync(D+'recipes/recipes-images.js','utf8'));
const I=window.IMAGES;
const add={
  'sticky-toffee-pudding':'https://www.themealdb.com/images/media/meals/xqqqtu1511637379.jpg',
  'coq-au-vin':'https://www.themealdb.com/images/media/meals/qstyvs1505931190.jpg',
  'beef-wellington':'https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg',
  'nasi-lemak':'https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg',
  'rogan-josh':'https://www.themealdb.com/images/media/meals/vvstvq1487342592.jpg',
  'roast-beef':'https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg',
  'chicken-wings':'https://www.themealdb.com/images/media/meals/4hzyvq1763792564.jpg',
  'borscht':'https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg',
  'french-onion-soup':'https://www.themealdb.com/images/media/meals/xvrrux1511783685.jpg',
  'lasagne-bolognese':'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
  'falafel-plate':'https://www.themealdb.com/images/media/meals/u5e9qq1763795441.jpg',
  'lamb-tagine-apricot-almond':'https://www.themealdb.com/images/media/meals/yuwtuu1511295751.jpg',
  'chicken-liver-parfait':'https://www.themealdb.com/images/media/meals/hob03q1780264260.jpg',
  'cream-of-tomato-soup':'https://www.themealdb.com/images/media/meals/stpuws1511191310.jpg',
  'flapjacks-pancakes':'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg',
  'tom-yum-goong':'https://www.themealdb.com/images/media/meals/l50vz41763422681.jpg',
  'meatloaf':'https://www.themealdb.com/images/media/meals/ypuxtw1511297463.jpg',
  'banh-mi':'https://www.themealdb.com/images/media/meals/1wj8w31763781990.jpg',
  'waffles':'https://www.themealdb.com/images/media/meals/h7zrys1779736460.jpg',
  'eggs-benedict-hollandaise':'https://www.themealdb.com/images/media/meals/1550440197.jpg',
  'chicken-pot-pie':'https://www.themealdb.com/images/media/meals/8ovxf41763253962.jpg'
};
let n=0;Object.entries(add).forEach(([s,u])=>{if(!I[s]){I[s]=u;n++;}else console.log('  already present:',s);});
fs.writeFileSync(D+'recipes/recipes-images.js','window.IMAGES='+JSON.stringify(I,null,2)+';\n');
console.log('added '+n+' | live images now '+Object.keys(I).length);
