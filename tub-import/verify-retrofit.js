/* Verify the retrofit end-to-end: for every LIVE full-cook recipe, open the
   detail and confirm all 9 standard sections now render. Report any still-missing.
   Also: 0 JS errors, and regression (19 cuts gone, 13 keeps live). */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const FIELDS={prep:'>Prep</div>',cook:'>Cook</div>',mistakes:'Common mistakes',sides:'Serve with',storage:'Storage',chef_upgrade:"Chef’s upgrade",health_forward:'Health-forward',diets:'Dietary fit',diet_notes:'Dietary adaptations'};
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
    out.push('RETROFIT entries loaded: '+(w.RETROFIT?Object.keys(w.RETROFIT).length:'MISSING'));
    // collect live full-cook slugs
    const seen={};
    ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);if(m)seen[m[1]]=1;});});
    const stillLiveCUT=CUT.filter(s=>seen[s]);
    const missingKEEP=KEEP.filter(s=>!seen[s]);
    out.push('regression CUT live (want 0): '+stillLiveCUT.length+(stillLiveCUT.length?' -> '+stillLiveCUT.slice(0,5):''));
    out.push('regression KEEP missing (want 0): '+missingKEEP.length);
    // section completeness per full-cook recipe
    let full=0,complete=0,compendium=0;const incomplete=[];
    Object.keys(seen).forEach(function(slug){
      w.openRecipe(slug);
      const html=d.getElementById('detail').innerHTML||'';
      if(html.indexOf('guided cook is being written')>-1){compendium++;return;} // compendium stub, not full-cook
      if(html.indexOf('Start guided cook')<0)return; // only true renderFull recipes
      full++;
      const miss=Object.keys(FIELDS).filter(f=>html.indexOf(FIELDS[f])<0);
      if(miss.length){incomplete.push(slug+': '+miss.join(', '));}else complete++;
    });
    out.push('FULL-COOK (renderFull) checked: '+full+' | all 9 sections: '+complete+' | incomplete: '+incomplete.length+' | compendium stubs (excluded): '+compendium);
    if(incomplete.length)out.push('INCOMPLETE ('+Math.min(30,incomplete.length)+'):\n  '+incomplete.slice(0,30).join('\n  '));
    const pass=errs.length===0&&stillLiveCUT.length===0&&missingKEEP.length===0&&incomplete.length===0;
    out.push('VERDICT: '+(pass?'PASS ✓':'FAIL ✗ — see above'));
  }catch(e){out.push('VERIFY THREW: '+e.message+'\n'+e.stack);}
  console.log('=== RETROFIT VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},3200);
