const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:new VirtualConsole(),beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;var out=[];
  [['bobotie','Soak the bread'],['butter-chicken','Marinate the chicken'],['cape-malay-chicken-curry','Toast and grind the masala']].forEach(function(c){
    var slug=c[0],want=c[1];w.startCook(slug);
    var card=d.querySelector('.amc-card');if(card)card.click();           // pick first appliance
    var t=d.querySelector('#cook-step .ck-title');
    out.push(slug+': step1 = "'+(t?t.textContent:'(none)')+'"  (want "'+want+'")  '+(t&&t.textContent===want?'✓':''));
  });
  console.log(out.join('\n'));process.exit(0);},2800);
