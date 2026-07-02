/* Verify the 32-split took effect in the live app:
   19 CUT slugs gone from every occasion grid; 13 KEEP slugs present; 0 JS errors. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const CUT=['pho-bo','mapo-tofu','pad-thai','tonkotsu-ramen','khao-soi','som-tum','beef-bulgogi','beef-rendang','massaman-curry','katsu-curry','jollof-rice','tacos-al-pastor','tagliatelle-al-ragu-bolognese','beef-bourguignon','peking-duck','paella-mixta','slow-roast-lamb-kleftiko','grilled-crayfish-garlic-butter','osso-buco-gremolata'];
const KEEP=['carbonara','cacio-e-pepe','risotto-milanese-saffron','steak','roast-chicken','smash-burgers-special-sauce','thai-green-curry','salmon','shakshuka-crusty-bread','molten-chocolate-fondant','mussels-white-wine-garlic','carnitas-tacos','moussaka'];
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,140)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:vc,
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];
  try{
    out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,4).join(' | '):' OK'));
    const live=new Set();
    ['solo','date','host'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);if(m)live.add(m[1]);});});
    out.push('TOTAL LIVE (unique across occasions): '+live.size);
    const stillLive=CUT.filter(s=>live.has(s));
    const missingKeep=KEEP.filter(s=>!live.has(s));
    out.push('CUT still live (want none): '+stillLive.length+(stillLive.length?' -> '+stillLive.join(', '):' OK'));
    out.push('KEEP missing (want none): '+missingKeep.length+(missingKeep.length?' -> '+missingKeep.join(', '):' OK'));
    // full-cook check on keeps (open one, expect guided cook)
    let fullCount=0;
    KEEP.forEach(function(slug){w.openRecipe(slug);var det=(d.getElementById('detail').innerHTML||'');if(det.indexOf('guided cook')>-1||(det.match(/class="ing"/g)||[]).length>3)fullCount++;d.getElementById('detail').classList.remove('open');});
    out.push('KEEPS that are full-cook: '+fullCount+'/'+KEEP.length);
    const pass = errs.length===0 && stillLive.length===0 && missingKeep.length===0;
    out.push('VERDICT: '+(pass?'PASS ✓':'FAIL ✗'));
  }catch(e){out.push('VERIFY THREW: '+e.message+'\n'+e.stack);}
  console.log('=== 32-SPLIT VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},2800);
