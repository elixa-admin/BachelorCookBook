/* Verify appliance/method selector. Uses synthetic recipe objects for deriveAppliances
   (no internal FULL access) and observes the DOM for the startCook branching. */
const fs=require('fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const html=fs.readFileSync(FILE,'utf8');
const errs=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.message||e.message)));
const dom=new JSDOM(html,{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){
    w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};
    w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
    w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}};};
    w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(Date.now()),0);
  }});
const syn=(slug,method,t,blurb)=>({slug:slug,method:method,t:t,blurb:blurb||''});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  const idsOf=arr=>arr.map(a=>a.id).join(',');
  const D=w.deriveAppliances;
  const cases=[
    ['steak (explicit)',D(syn('steak','Stovetop · sear & baste','Pan-Seared Steak')),'stovetop,grill'],
    ['roast-chicken (exp)',D(syn('roast-chicken','Oven · roast','Roast Chicken')),'oven,airfryer'],
    ['carbonara (heur)',D(syn('carbonara','Stovetop · emulsion','Spaghetti Carbonara')),'stovetop'],
    ['beef-stew (heur)',D(syn('beef-stew-x','Stovetop · braise','Beef Stew','slow braised beef')),'stovetop,pressure'],
    ['wings (heur)',D(syn('wings-x','Oven · bake','Chicken Wings','crispy baked wings')),'oven,airfryer'],
    ['fries (explicit)',D(syn('fries','Stovetop · deep-fry','Hand-Cut Fries')),'airfryer,oven,stovetop'],
  ];
  console.log('=== deriveAppliances ===');
  cases.forEach(([label,got,exp])=>console.log('  '+(got?idsOf(got):'NONE').padEnd(22)+' '+(got&&idsOf(got)===exp?'✓':'✗ exp '+exp)+'  '+label));
  // Flow via the app's own startCook (resolves steak internally)
  console.log('\n=== startCook flow ===');
  let ok=true;
  try{
    w.startCook('steak');
    const mth=d.getElementById('cook-method'),step=d.getElementById('cook-step');
    const pickerShown=mth.style.display!=='none'&&mth.innerHTML.includes('amc-card');
    const stepHidden=step.style.display==='none';
    const n=(mth.innerHTML.match(/amc-card/g)||[]).length;
    console.log('  multi-appliance → picker  :',pickerShown?'✓':'✗','| step hidden:',stepHidden?'✓':'✗','| cards:',n);
    const g=d.querySelector('.amc-card[onclick*="grill"]'); if(g)g.click();
    const chip=d.getElementById('cook-mchip').innerHTML;
    console.log('  chooseMethod(grill)       :',step.style.display!=='none'?'steps ✓':'✗','| chip:',chip.includes('Grill')?'✓':'✗');
    w.startCook('carbonara');
    const skip=d.getElementById('cook-method').innerHTML===''&&d.getElementById('cook-step').style.display!=='none';
    console.log('  single-method → skip pick :',skip?'✓':'✗');
  }catch(e){ok=false;console.log('  FLOW THREW:',e.message);}
  console.log('\njs errors :',errs.length?errs.join(' | '):'none');
  process.exit(0);
},1200);
