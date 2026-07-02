const fs=require('fs'),{JSDOM}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:new (require('jsdom').VirtualConsole)(),beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  // scrape title per slug across occasions
  var live={};
  ['solo','date','host'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);var h3=c.querySelector('h3');if(m&&!live[m[1]])live[m[1]]=h3?h3.textContent.trim():m[1];});});
  // full-cook = those that openRecipe renders via renderFull (FULL[slug].ing). We can't read FULL (lexical),
  // so probe by opening each and checking the cook-tab renders ingredients + a Start cook button.
  var full=[];Object.keys(live).forEach(function(slug){
    w.openRecipe(slug);var det=(d.getElementById('detail').innerHTML||'');
    // full cook shows the scaler + 'Start guided cook' + ingredient rows
    if(det.indexOf('Start guided cook')>-1&&(det.match(/class="ing"/g)||[]).length>3){full.push(slug+'|'+live[slug]);}
    else{d.getElementById('detail').classList.remove('open');}
  });
  console.log('FULL-COOK RECIPES ('+full.length+'):');
  console.log(full.join('\n'));
  process.exit(0);},2800);
