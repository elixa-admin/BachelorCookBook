/* Dump compact context (slug,title,cui,method,blurb,time,diff + top ingredients)
   for every LIVE full-cook recipe, so retrofit subagents read one small file. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:new VirtualConsole(),
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  const seen={};
  ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){
    var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);if(!m||seen[m[1]])return;seen[m[1]]=1;
    var h3=c.querySelector('h3');var bl=c.querySelector('.blurb');var meta=[...c.querySelectorAll('.meta span')].map(s=>s.textContent.trim());
    seen[m[1]]={slug:m[1],title:h3?h3.textContent.trim():m[1],blurb:bl?bl.textContent.trim():'',meta:meta};
  });});
  const ctx=[];let fullCook=0;
  Object.keys(seen).forEach(function(slug){
    var rec=seen[slug];
    w.openRecipe(slug);
    var det=d.getElementById('detail').innerHTML||'';
    if(det.indexOf('guided cook')<0)return; // only full-cook
    fullCook++;
    // ingredients: gather .ing text nodes (strip qty markup loosely)
    var ings=[];d.querySelectorAll('#ings .ing').forEach(function(el){
      var txt=el.textContent.replace(/\s+/g,' ').trim();
      if(txt)ings.push(txt);
    });
    ings=ings.slice(0,18);
    var m=rec.meta||[];
    ctx.push({slug:slug,title:rec.title,blurb:rec.blurb||'',cui:m[0]||'',time:(m.find(function(x){return /min|hr/i.test(x);})||''),method:(m.filter(function(x){return /·/.test(x);}).pop()||''),ings:ings});
  });
  fs.writeFileSync('retrofit-context.json',JSON.stringify(ctx,null,1));
  console.log('Full-cook recipes dumped: '+fullCook);
  console.log('Wrote retrofit-context.json ('+ctx.length+' recipes)');
  process.exit(0);
},3000);
