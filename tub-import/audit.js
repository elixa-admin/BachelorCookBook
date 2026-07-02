/* TUB content-foundation audit — read-only. Emits one JSON report:
   total dishes, slug list, missing-image slugs, course/region distribution,
   and every SA-naming violation (per term + per slug). */
const fs=require('fs'), DIR='/Users/brandondienar/.claude/jobs/d2505485/tmp/recipes/';
global.window={};
fs.readdirSync(DIR).filter(f=>f.endsWith('.js')).forEach(f=>{
  try{ eval(fs.readFileSync(DIR+f,'utf8')); }catch(e){ console.error('eval fail '+f+': '+e.message); }
});
const W=window;

// collect dishes: any window.* array of {slug,t}
const seen={}, dishes=[];
Object.keys(W).forEach(k=>{
  const v=W[k];
  if(Array.isArray(v)) v.forEach(r=>{
    if(r&&typeof r==='object'&&typeof r.slug==='string'&&typeof r.t==='string'&&!seen[r.slug]){
      seen[r.slug]=1; r._src=k; dishes.push(r);
    }
  });
});

const IMAGES=W.IMAGES||{};
const COURSES=W.COURSES||{};
const regionOf=W.regionOf||(c=>'mediterranean');

// image gaps
const noImg=dishes.filter(r=>!IMAGES[r.slug]).map(r=>r.slug);

// distribution
const courseDist={}, regionDist={};
dishes.forEach(r=>{
  const c=COURSES[r.slug]||r.course||'(none)';
  courseDist[c]=(courseDist[c]||0)+1;
  const rg=regionOf(r.cui);
  regionDist[rg]=(regionDist[rg]||0)+1;
});

// SA offender scan
const terms=[
  ['cilantro','coriander'],['ground beef','beef mince'],['ground pork','pork mince'],
  ['ground chicken','chicken mince'],['ground turkey','turkey mince'],['ground lamb','lamb mince'],
  ['scallion','spring onion'],['scallions','spring onions'],['green onion','spring onion'],['green onions','spring onions'],
  ['eggplant','aubergine'],['eggplants','aubergines'],['shrimp','prawn'],['shrimps','prawns'],
  ['zucchini','baby marrow'],['zucchinis','baby marrows'],['arugula','rocket'],
  ['powdered sugar','icing sugar'],["confectioners' sugar",'icing sugar'],['confectioners sugar','icing sugar'],
  ['baking soda','bicarbonate of soda'],['kaffir','makrut'],['bell pepper','capsicum'],
  ['rutabaga','swede'],['bok choy','pak choi'],['fava beans','broad beans']
];
const flags=['°F','° F','\\bcups\\b','\\bcup\\b','\\boz\\b','\\blbs?\\b','stick of butter','\\bbroil','scallion'];
const perTerm={}, perSlug={};
dishes.forEach(r=>{
  const str=JSON.stringify(r).toLowerCase();
  terms.forEach(([t])=>{ if(str.indexOf(t)>-1){ perTerm[t]=(perTerm[t]||0)+1; (perSlug[t]=perSlug[t]||[]).push(r.slug); } });
  flags.forEach(re=>{ const m=str.match(new RegExp(re,'i')); if(m){ const k=m[0]; perTerm['FLAG:'+k]=(perTerm['FLAG:'+k]||0)+1; (perSlug['FLAG:'+k]=perSlug['FLAG:'+k]||[]).push(r.slug);} });
});

const report={
  total:dishes.length,
  slugs:dishes.map(r=>r.slug),
  noImg,
  noImgCount:noImg.length,
  courseDist, regionDist,
  perTerm, perSlug
};
fs.writeFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/audit-report.json',JSON.stringify(report,null,2));
// compact stdout
console.log('TOTAL DISHES: '+report.total);
console.log('MISSING IMAGES: '+report.noImgCount+' -> '+JSON.stringify(noImg));
console.log('COURSE DIST: '+JSON.stringify(courseDist));
console.log('REGION DIST: '+JSON.stringify(regionDist));
console.log('SA TERMS (count -> slugs):');
Object.keys(perTerm).sort().forEach(t=>console.log('  ['+perTerm[t]+'] '+t+' :: '+perSlug[t].slice(0,8).join(', ')+(perSlug[t].length>8?' …':'')));
