/* Verify the 3 newly-wired features load + render without JS errors. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.message||e.message).slice(0,200)));
vc.on('error',(...a)=>errs.push('console.error: '+a.join(' ').slice(0,200)));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);}});
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];
  // 1. globals
  out.push('EQUIPMENT:'+(w.EQUIPMENT?Object.keys(w.EQUIPMENT).length:'MISSING')+'  SKILL_TIERS:'+(w.SKILL_TIERS?Object.keys(w.SKILL_TIERS).length:'MISSING')+'  METHOD_TIMINGS:'+(w.METHOD_TIMINGS?Object.keys(w.METHOD_TIMINGS).length:'MISSING'));
  // 2. grid rendered + skill badges on cards
  const cards=d.querySelectorAll('.card');const sbadges=d.querySelectorAll('.card .skill-badge');
  out.push('cards:'+cards.length+'  skill-badges:'+sbadges.length);
  // 3. skill filter chips render
  w.renderFilters();const schips=d.querySelectorAll('.fchip.schip');
  out.push('skill filter chips:'+schips.length+(schips.length===4?' ✓':' ✗(want 4)'));
  // 4. skill filter actually filters
  w.setSkill('chef');const chefCards=d.querySelectorAll('.card');w.setSkill('all-skills');
  out.push('chef filter → '+chefCards.length+' cards (should be small, >0)');
  // 5. equipment gather block (open a full-cook dish that has EQUIPMENT)
  let eqSlug=null;['beef-wellington','coq-au-vin','braai-lamb-chops-chimichurri','boerewors','potjiekos'].forEach(s=>{if(!eqSlug&&w.EQUIPMENT&&w.EQUIPMENT[s])eqSlug=s;});
  if(eqSlug){w.openRecipe(eqSlug);const el=d.querySelectorAll('#detail .eq-list li').length;const chip=d.querySelector('#detail .dmeta');out.push('equipment('+eqSlug+'): gather items='+el+(el>0?' ✓':' ✗')+'  | hero skill chip:'+(chip&&/Skill/.test(chip.textContent)?'✓':'✗'));}
  // 6. method-timing banner in cook flow (salmon: stovetop/oven/airfryer)
  w.goBrowse&&w.goBrowse();
  try{
    w.startCook('salmon');
    // salmon has >1 appliance → method choice shown
    const mc=d.querySelectorAll('#cook .amc-card').length;
    if(mc>0){w.chooseMethod('oven');} // pick oven → has METHOD_TIMINGS entry
    const timing=d.querySelectorAll('#cook .ck-timing').length;
    out.push('cook salmon: method-cards='+mc+'  oven .ck-timing banner:'+timing+(timing>0?' ✓':' ✗'));
  }catch(e){out.push('cook test ERROR: '+e.message);}
  console.log('=== WIRE VERIFY ===\n'+out.join('\n'));
  console.log('\nJS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,4).join('\n  '):'none ✓');
  process.exit(0);
},2800);
