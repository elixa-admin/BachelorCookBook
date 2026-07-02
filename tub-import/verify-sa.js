const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(""+(e.detail&&e.detail.message||e.message)).slice(0,200));
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document,out=[];const R=w.R||[],FULL=w.FULL||{};
  try{
    out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,4).join(' | '):''));
    [['bobotie','heritage'],['butter-chicken','adopted'],['cape-malay-chicken-curry','heritage']].forEach(function(pair){
      var slug=pair[0],want=pair[1];var r=R.find(function(x){return x.slug===slug;});
      var f=FULL[slug]||{};
      var ingN=f.ing?f.ing.length:0, stepN=f.steps?f.steps.length:0, step0len=(f.steps&&f.steps[0])?f.steps[0].length:0;
      out.push(slug+': '+(r?('in R | tier='+r.tier+' (want '+want+') cat='+r.cat+' live='+r.live):'NOT IN R'));
      out.push('   full data: ing groups='+ingN+', steps='+stepN+', step0 tuple len='+step0len);
    });
    w.openRecipe('bobotie');var det=d.getElementById('detail');
    var detHtml=det?det.innerHTML:'';
    out.push('bob detail: ing rows='+((detHtml.match(/class="ing"/g)||[]).length)+', has "beef mince"='+detHtml.includes('beef mince'));
    w.startCook('butter-chicken');var cs=d.getElementById('cook-step');
    var title=cs?((cs.querySelector('.ck-title'))?cs.querySelector('.ck-title').textContent:'no-title'):'no-cookstep';
    out.push('butter-chicken cook step1 title: "'+title+'"');
    var threw=false;try{w.scaleIgs(4);}catch(e){threw=e.message;}
    out.push('scaleIgs(4): '+(threw?('THREW '+threw):'ok'));
  }catch(e){out.push('THREW: '+e.message);}
  console.log('=== SA ADDITIONS VERIFY ===\n'+out.join('\n'));process.exit(0);},2800);
