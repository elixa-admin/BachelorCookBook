/* Verify roster foundation: cuts applied, new 4-tier + Type (category) filters work, 0 errors. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,160)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);w.HTMLElement.prototype.scrollIntoView=function(){};}});
const cards=()=>dom.window.document.querySelectorAll('#grid .card').length;
const chipTexts=sel=>[...dom.window.document.querySelectorAll(sel)].map(b=>b.textContent.trim());
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];
  try{
  out.push('ROSTER_CLASSES loaded: '+(w.ROSTER_CLASSES?Object.keys(w.ROSTER_CLASSES).length:'MISSING'));
  out.push('JS ERRORS: '+errs.length+(errs.length?' | '+errs.slice(0,3).join(' | '):' ✓'));
  // tier chips
  w.renderFilters();
  const tiers=chipTexts('#filters .fchip:not(.cchip):not(.rchip):not(.schip)');
  out.push('tier chips: '+tiers.join(' / ')+' (want All/Heritage/Adopted/Aspirational/Component)');
  const types=chipTexts('#filters .cchip');
  out.push('type chips: '+types.join(' / ')+' (want All/Mains/Build your own/Special evening/Baked & sweet)');
  // cuts: borscht gone, steak kept (search)
  const q=d.getElementById('q');
  q.value='borscht';w.filterCards();const borscht=cards();
  q.value='steak';w.filterCards();const steak=cards();
  q.value='';w.filterCards();
  out.push('CUTS — borscht cards: '+borscht+' (want 0) | steak cards: '+steak+' (want >0)');
  // tier filter actually filters
  w.setFilter('heritage');const herCards=cards();const herOK=herCards>0&&[...d.querySelectorAll('#grid .card .badge .td')].length>=0;
  out.push('filter Heritage: '+herCards+' cards (want >0)');
  w.setFilter('aspirational');const aspCards=cards();
  out.push('filter Aspirational: '+aspCards+' cards (want >0, smaller)');
  w.setFilter('all');
  // category filter
  w.setCat('sweet');const sweetCards=cards();const sweetNames=[...d.querySelectorAll('#grid .card h3')].slice(0,5).map(h=>h.textContent);
  out.push('filter Baked & sweet: '+sweetCards+' cards — '+sweetNames.join(', '));
  w.setCat('all');
  // card tier colour is one of the new palette
  const dot=d.querySelector('#grid .card .badge .td');
  if(dot)out.push('sample card tier dot bg: '+dot.style.background+' (want a new-tier colour)');
  }catch(e){out.push('VERIFY THREW: '+e.message);}
  console.log('=== ROSTER FOUNDATION VERIFY ===\n'+out.join('\n'));
  process.exit(0);
},2800);
