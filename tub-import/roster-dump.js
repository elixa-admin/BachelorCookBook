const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:new VirtualConsole(),beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  var live={};
  ['solo','date','host'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();
    d.querySelectorAll('#grid .card').forEach(function(c){var h3=c.querySelector('h3'),m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);var slug=m?m[1]:null;if(slug&&!live[slug])live[slug]=(h3?h3.textContent.trim():slug);});});
  var RC=w.ROSTER_CLASSES||{};
  var CATS=['main','byo','special','sweet'],TIERS=['heritage','adopted','aspirational','component'];
  var out=[],total=0;
  CATS.forEach(function(cat){TIERS.forEach(function(tier){
    var items=Object.keys(RC).filter(function(s){return RC[s].cat===cat&&RC[s].tier===tier&&!RC[s].cut;}).map(function(s){return live[s]||s;}).sort();
    if(items.length){out.push('['+cat+'/'+tier+': '+items.length+']');items.forEach(function(t){out.push('  '+t);total++;});}
  });});
  console.log(out.join('\n'));console.log('\nTOTAL LIVE: '+total);
},2800);
