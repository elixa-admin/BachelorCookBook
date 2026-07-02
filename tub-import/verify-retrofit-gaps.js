/* Decisive check: do these retrofit recipes actually RENDER all 9 sections?
   Separates real field gaps from auditor false-positives (which only saw
   partial batch-patch.js entries). */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const SLUGS=['potbrood','roosterkoek','moussaka','beef-ribs-sticky-braise','espetada','boerewors'];
const FIELDS={prep:'>Prep</div>',cook:'>Cook</div>',mistakes:'Common mistakes',sides:'Serve with',storage:'Storage',chef_upgrade:"Chef",health_forward:'Health-forward',diets:'Dietary fit',diet_notes:'Dietary adaptations'};
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,140)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:vc,
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];
  out.push('JS ERRORS: '+errs.length);
  SLUGS.forEach(function(slug){
    w.openRecipe(slug);
    const html=d.getElementById('detail').innerHTML||'';
    const stub=html.indexOf('guided cook is being written')>-1;
    const full=html.indexOf('Start guided cook')>-1;
    const miss=Object.keys(FIELDS).filter(f=>html.indexOf(FIELDS[f])<0);
    out.push(slug+': '+(stub?'STUB':(full?'full':'?'))+'  missing=['+miss.join(',')+']'+(miss.length?'  <-- REAL GAP':'  OK'));
  });
  console.log('=== RETROFIT GAP CHECK ===\n'+out.join('\n'));
  process.exit(0);
},3200);
