/* Verify Accompaniments & Components differentiation:
   - nav button present; clicking it renders only byo items (all badged)
   - byo items excluded from solo/date/host grids
   - opening an accompaniment shows the "not a standalone meal" banner
   - regression: 19 cuts gone, 13 keeps live; 0 JS errors */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const CUT=['pho-bo','mapo-tofu','pad-thai','tonkotsu-ramen','khao-soi','som-tum','beef-bulgogi','beef-rendang','massaman-curry','katsu-curry','jollof-rice','tacos-al-pastor','tagliatelle-al-ragu-bolognese','beef-bourguignon','peking-duck','paella-mixta','slow-roast-lamb-kleftiko','grilled-crayfish-garlic-butter','osso-buco-gremolata'];
const KEEP=['carbonara','cacio-e-pepe','risotto-milanese-saffron','steak','roast-chicken','smash-burgers-special-sauce','thai-green-curry','salmon','shakshuka-crusty-bread','molten-chocolate-fondant','mussels-white-wine-garlic','carnitas-tacos','moussaka'];
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,140)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:vc,
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
const cardSlugs=()=>[...dom.window.document.querySelectorAll('#grid .card')].map(c=>((c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/)||[])[1]).filter(Boolean);
const accompNoteCount=()=>dom.window.document.querySelectorAll('#grid .card .accomp-note').length;
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];
  try{
    out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,4).join(' | '):' OK'));
    const btn=d.querySelector('.occ-btn[data-occ="accomp"]');
    out.push('nav button present: '+(btn?'YES':'NO ✗'));
    // meal grids must contain zero accompaniment-badged cards
    let leak=0;
    ['solo','date','host'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();leak+=accompNoteCount();});
    out.push('accompaniment cards leaking into meal grids (want 0): '+leak);
    // regression: cuts gone, keeps live (search across accomp+occasions)
    const live=new Set();
    ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();cardSlugs().forEach(s=>live.add(s));});
    const stillLive=CUT.filter(s=>live.has(s));
    const missingKeep=KEEP.filter(s=>!live.has(s));
    out.push('regression CUT still live (want 0): '+stillLive.length+(stillLive.length?' -> '+stillLive.slice(0,5):''));
    out.push('regression KEEP missing (want 0): '+missingKeep.length+(missingKeep.length?' -> '+missingKeep.join(','):''));
    // accomp view
    if(btn)btn.click();
    const accompCards=cardSlugs().length, accompBadged=accompNoteCount();
    out.push('Accompaniments view: '+accompCards+' cards, '+accompBadged+' badged (want cards>0, badged==cards)');
    // open first accompaniment, expect banner
    const first=cardSlugs()[0];
    let banner=false;
    if(first){w.openRecipe(first);banner=(d.getElementById('detail').innerHTML.indexOf('accomp-banner')>-1)&&(d.getElementById('detail').innerHTML.indexOf('not a standalone meal')>-1);}
    out.push('detail banner on "'+first+'": '+(banner?'YES ✓':'NO ✗'));
    const pass=errs.length===0&&btn&&leak===0&&stillLive.length===0&&missingKeep.length===0&&accompCards>0&&accompBadged===accompCards&&banner;
    out.push('VERDICT: '+(pass?'PASS ✓':'FAIL ✗'));
  }catch(e){out.push('VERIFY THREW: '+e.message+'\n'+e.stack);}
  console.log('=== ACCOMPANIMENTS DIFFERENTIATION VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},2800);
