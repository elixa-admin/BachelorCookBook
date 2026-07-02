const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:new VirtualConsole(),beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  w.openRecipe('pizza-margherita');var det=d.getElementById('detail').innerHTML;
  ['cool oven','Green salad','Best fresh','00 flour','Common mistakes','Serve with','Storage','Chef'].forEach(function(t){
    console.log((det.includes(t)?'✓':'-')+' "'+t+'"');
  });
  // also check the raw recipe object via the detail's statcard (prep/cook)
  console.log('prep in detail:',det.includes('Prep</div>')||det.includes('>Prep<'));
  process.exit(0);},2800);
