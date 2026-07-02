/* Identify the 27 compendium stubs ("guided cook is being written") so we can
   plan their full-cook conversion. Reports slug + title + cui + whether it has
   ing/tl/steps/brief/prov/key_ings data already (to size the conversion). */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:new VirtualConsole(),
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  const seen={};
  ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);var h3=c.querySelector('h3');if(m&&!seen[m[1]])seen[m[1]]=h3?h3.textContent.trim():m[1];});});
  const stubs=[];
  Object.keys(seen).forEach(function(slug){
    w.openRecipe(slug);
    const html=d.getElementById('detail').innerHTML||'';
    if(html.indexOf('guided cook is being written')>-1)stubs.push(slug+'|'+seen[slug]);
  });
  console.log('COMPENDIUM STUBS needing full-cook conversion: '+stubs.length);
  stubs.sort().forEach(s=>console.log('  '+s));
  process.exit(0);
},3000);
