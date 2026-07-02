const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,200)));
vc.on('error',m=>errs.push((''+m).slice(0,200)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){
    const stub={_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){delete this._d[k];},clear(){this._d={};}};
    Object.defineProperty(w,'localStorage',{value:stub,configurable:true,writable:true});
    w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};
    w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
    w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};
    w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);
    w.HTMLElement.prototype.scrollIntoView=function(){};
  }});
const w=dom.window,d=w.document,out=[];
setTimeout(()=>{
  try{
    out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,6).join(' | '):' ✓'));
    out.push('skillPath fn: '+typeof w.skillPath);
    var P=(typeof w.skillPath==='function')?w.skillPath():{};
    ['novice','capable','chef'].forEach(function(lv){
      var slugs=P[lv]||[];
      var R=w.R||[];
      var missing=slugs.filter(function(s){return !R.find(function(x){return x.slug===s;});});
      out.push(lv+': '+slugs.length+' curated | MISSING from R ('+missing.length+'): '+missing.join(', '));
    });
    w.activeOcc='skill-path';
    if(typeof w.renderSkillPathView==='function')w.renderSkillPathView();
    out.push('skill-path render: '+d.querySelectorAll('#grid .sp-tier').length+' tier sections, '+d.querySelectorAll('#grid .card').length+' cards');
    out.push('MASTERCLASS entries: '+((w.MASTERCLASS||[]).length));
    out.push('methodDomains: '+((w.methodDomains?w.methodDomains():[]).length));
    var doms=w.methodDomains?w.methodColors?w.methodDomains():w.methodDomains():[];
    doms=(w.methodDomains?w.methodDomains():[]);
    doms.forEach(function(dm){var n=w.domainLessons?w.domainLessons(dm.id).length:0;out.push('  domain "'+dm.id+'" ('+dm.label+'): '+n+' lessons');});
    out.push('openMethods: '+typeof w.openMethods+' | renderLearnTab: '+typeof w.renderLearnTab+' | renderDomain: '+typeof w.renderDomain);
    // count masterclasses linked to dishes
    var M=w.MASTERCLASS||[];var linked=M.filter(function(m){return m.dishes&&m.dishes.length;}).length;
    out.push('masterclasses with dishes[] link: '+linked+' / '+M.length);
  }catch(e){out.push('THREW: '+e.message);}
  console.log('=== SKILL / MASTERCLASS / LEARN VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},2800);
