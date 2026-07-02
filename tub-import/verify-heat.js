const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(""+(e.detail&&e.detail.message||e.message)).slice(0,200));
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document,out=[];
  try{
    w.openMethods();w.renderLearnTab('heat');
    const lc=d.getElementById('lcontent');const html=lc?lc.innerHTML:'';
    out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,4).join(' | '):''));
    out.push('heat tab active: '+!!d.querySelector('.ltab[data-t="heat"].active'));
    out.push('hh-css injected: '+!!d.getElementById('hh-css'));
    out.push('appliance cards (How it heats): '+(html.match(/How it heats/g)||[]).length+' (want 19)');
    out.push('Braai entry present: '+html.includes('Braai'));
    out.push('fat table rows: '+d.querySelectorAll('.hh-table tbody tr').length+' (want 16)');
    out.push('herb family cards: '+d.querySelectorAll('.hh-fam').length+' (want 8)');
    out.push('pairing cards: '+d.querySelectorAll('.hh-pair').length+' (want 17)');
    out.push('mnemonic chips: '+d.querySelectorAll('.hh-mnem').length+' (want 14)');
    out.push('rosemary mnemonic present: '+html.includes('Rosemary loves lamb'));
  }catch(e){out.push('THREW: '+e.message);}
  console.log('=== HOW HEAT WORKS VERIFY ===\n'+out.join('\n'));process.exit(0);},2500);
