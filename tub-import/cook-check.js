const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const vc=new VirtualConsole();const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  [['bobotie'],['butter-chicken'],['cape-malay-chicken-curry']].forEach(function(p){
    var slug=p[0];w.startCook(slug);
    var mb=d.getElementById('cook-method');var methodChoice=mb&&mb.style.display!=='none';
    var titleEl=d.querySelector('#cook-step .ck-title');
    console.log(slug+': method-choice='+methodChoice+' | step1 title='+(titleEl?('"'+titleEl.textContent+'"'):'(none)'));
  });
  process.exit(0);},2800);
