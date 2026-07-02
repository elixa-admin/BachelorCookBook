const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(""+(e.detail&&e.detail.message||e.message)).slice(0,200));
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document,out=[];
  out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,4).join(' | '):''));
  var cases=[['bobotie','Heritage'],['butter-chicken','Adopted'],['cape-malay-chicken-curry','Heritage']];
  cases.forEach(function(c){
    var slug=c[0],wantTier=c[1];
    w.openRecipe(slug);
    var dt=d.getElementById('d-tier');var det=d.getElementById('detail').innerHTML;
    var ingRows=(det.match(/class="ing"/g)||[]).length;
    var steps=(det.match(/class="step"/g)||[]).length;
    out.push(slug+': tier='+(dt?dt.textContent:'?')+' (want '+wantTier+') | ing rows='+ingRows+' | steps='+steps);
  });
  // cook view: pick a method if prompted, then check a step renders
  w.startCook('bobotie');
  var mb=d.getElementById('cook-method');
  if(mb&&mb.style.display!=='none'){w.chooseMethod('oven',null);}
  var cs=d.getElementById('cook-step');
  out.push('bob cook step1 title: '+(cs&&cs.querySelector('.ck-title')?cs.querySelector('.ck-title').textContent:'(method choice or none)'));
  console.log('=== SA ADDITIONS VERIFY (render path) ===\n'+out.join('\n'));process.exit(0);},2800);
