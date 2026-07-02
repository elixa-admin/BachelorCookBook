const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,200)));
const dom=new JSDOM(fs.readFileSync('tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);}});
setTimeout(()=>{
  const d=dom.window.document;
  const btn=d.querySelector('.occ-btn[data-occ="skill-path"]');btn.click(); // real handler path
  const tiers=d.querySelectorAll('#grid .sp-tier'),cards=d.querySelectorAll('#grid .sp-tier .card'),intro=d.querySelector('#grid .sp-intro');
  console.log('sp-tier sections:',tiers.length,'| milestone cards:',cards.length,'| intro:',!!intro);
  console.log('tier labels:',[...tiers].map(t=>(t.querySelector('h3')||{}).textContent).join(' / '));
  console.log('sample card clickable:',cards[0]?/openRecipe/.test(cards[0].getAttribute('onclick')||''):'no cards');
  console.log('JS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,3).join('\n  '):'none ✓');
  process.exit(0);
},2800);
