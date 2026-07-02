const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const SLUGS=['shakshuka-crusty-bread','thai-green-curry','moussaka','melktert','molten-chocolate-fondant','sticky-toffee-pudding','koeksisters'];
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:new VirtualConsole(),beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  SLUGS.forEach(function(s){
    w.openRecipe(s);var html=d.getElementById('detail').innerHTML||'';
    var upgrade=html.match(/Chef.?s upgrade|Take it further/)?'YES':'NO';
    var dietsTags=(html.match(/Dietary fit/))?'YES':'NO';
    var dietNotes=(html.match(/Dietary adaptations/))?'YES':'NO';
    var reto=(w.RETROFIT&&w.RETROFIT[s])?Object.keys(w.RETROFIT[s]).join(','):'NONE';
    console.log(s+' | chef_upgrade render:'+upgrade+' | diets-tags:'+dietsTags+' | diet_notes:'+dietNotes+' | RETROFIT keys:['+reto+']');
  });
  process.exit(0);
},3000);
