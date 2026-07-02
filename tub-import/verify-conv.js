/* Verify Wave-1 full-cook conversions: each converted recipe now renders via
   renderFull (guided cook + ingredients + all 9 retrofit sections) instead of the
   compendium stub; compendium-stub count drops; 0 JS errors. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const WAVE1=['denningvleis','doro-wat','malva-pudding','peppermint-crisp-tart','hertzoggies','lamb-tagine-apricot-almond','chicken-biryani','red-wine-braised-short-rib','roast-leg-lamb-rosemary-garlic','creme-brulee','tiramisu','croissants','lasagne-bolognese','quiche-lorraine','spanakopita'];
const FIELDS={prep:'>Prep</div>',cook:'>Cook</div>',mistakes:'Common mistakes',sides:'Serve with',storage:'Storage',chef_upgrade:"Chef",health_forward:'Health-forward',diets:'Dietary fit',diet_notes:'Dietary adaptations'};
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,140)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:vc,
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];
  try{
    out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,4).join(' | '):' OK'));
    out.push('FULLCOOK_CONV entries: '+((w.FULLCOOK_CONV&&w.FULLCOOK_CONV.length)||0));
    // each Wave-1 recipe renders as full cook + all 9 sections
    const report=[];let allFull=0;
    WAVE1.forEach(function(slug){
      w.openRecipe(slug);
      const html=d.getElementById('detail').innerHTML||'';
      const stub=html.indexOf('guided cook is being written')>-1;
      const full=html.indexOf('Start guided cook')>-1;
      const ings=(html.match(/class="ing"/g)||[]).length;
      const miss=Object.keys(FIELDS).filter(f=>html.indexOf(FIELDS[f])<0);
      if(full&&!stub&&ings>3&&miss.length===0)allFull++;
      else report.push(slug+': '+(stub?'STUB!':'full='+full)+' ings='+ings+' miss=['+miss.join(',')+']');
    });
    out.push('Wave-1 fully converted (full cook + all 9 sections): '+allFull+'/'+WAVE1.length);
    if(report.length)out.push('ISSUES:\n  '+report.join('\n  '));
    // count remaining compendium stubs across whole roster
    const seen={};
    ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);if(m)seen[m[1]]=1;});});
    let stubs=0;
    Object.keys(seen).forEach(function(s){w.openRecipe(s);if((d.getElementById('detail').innerHTML||'').indexOf('guided cook is being written')>-1)stubs++;});
    out.push('remaining compendium stubs: '+stubs+' (was 27; expect 12 after these 15)');
    const pass=errs.length===0&&allFull===WAVE1.length&&stubs===12;
    out.push('VERDICT: '+(pass?'PASS ✓':'FAIL ✗'));
  }catch(e){out.push('VERIFY THREW: '+e.message+'\n'+e.stack);}
  console.log('=== CONVERSION WAVE-1 VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},3200);
