/* Verify ALL 27 compendium->full-cook conversions render via renderFull
   (guided cook + ingredients + all 9 retrofit sections), 0 compendium stubs
   remain roster-wide, the 4 components (pap/naan/mealie-bread/roosterkoek)
   appear in the Accompaniments grid, and 0 JS errors. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const ALL27=['denningvleis','doro-wat','malva-pudding','peppermint-crisp-tart','hertzoggies','lamb-tagine-apricot-almond','chicken-biryani','red-wine-braised-short-rib','roast-leg-lamb-rosemary-garlic','creme-brulee','tiramisu','croissants','lasagne-bolognese','quiche-lorraine','spanakopita','eggs-benedict-hollandaise','flapjacks-pancakes','churros-chocolate','falafel-plate','gemista-stuffed-peppers-aubergine','quesadillas','beef-teriyaki','braai-lamb-chops-chimichurri','pap','naan-bread','mealie-bread','roosterkoek'];
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
    out.push('R.length (roster): '+(w.R?w.R.length:'?'));
    const report=[];let allFull=0;
    ALL27.forEach(function(slug){
      w.openRecipe(slug);
      const html=d.getElementById('detail').innerHTML||'';
      const stub=html.indexOf('guided cook is being written')>-1;
      const full=html.indexOf('Start guided cook')>-1;
      const ings=(html.match(/class="ing"/g)||[]).length;
      const miss=Object.keys(FIELDS).filter(f=>html.indexOf(FIELDS[f])<0);
      if(full&&!stub&&ings>=2&&miss.length===0)allFull++;
      else report.push(slug+': '+(stub?'STUB!':'full='+full)+' ings='+ings+' miss=['+miss.join(',')+']');
    });
    out.push('converted (full cook + all 9 sections): '+allFull+'/'+ALL27.length);
    if(report.length)out.push('ISSUES:\n  '+report.join('\n  '));
    // remaining compendium stubs across the whole roster
    const seen={};
    ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);if(m)seen[m[1]]=1;});});
    let stubs=0;const stubList=[];
    Object.keys(seen).forEach(function(s){w.openRecipe(s);if((d.getElementById('detail').innerHTML||'').indexOf('guided cook is being written')>-1){stubs++;stubList.push(s);}});
    out.push('remaining compendium stubs: '+stubs+(stubList.length?(' ['+stubList.join(',')+']'):''));
    // Accompaniments grid membership
    var ab=d.querySelector('.occ-btn[data-occ="accomp"]');if(ab)ab.click();
    var accomp=[];d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);if(m)accomp.push(m[1]);});
    out.push('Accompaniments grid ('+accomp.length+'): '+accomp.join(', '));
    var comps=['pap','naan-bread','mealie-bread','roosterkoek'].filter(function(s){return accomp.indexOf(s)>-1;});
    out.push('4 breads/bases in Accompaniments: '+comps.length+'/4');
    const pass=errs.length===0&&allFull===ALL27.length&&stubs===0&&comps.length===4;
    out.push('VERDICT: '+(pass?'PASS ✓':'FAIL ✗'));
  }catch(e){out.push('VERIFY THREW: '+e.message+'\n'+e.stack);}
  console.log('=== CONVERSION ALL-27 VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},3400);
