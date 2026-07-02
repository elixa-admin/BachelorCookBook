/* Phase 3 — meal planner verify. plan[] is lexical → observe via localStorage
   'tub_plan' (savePlan) + 'tub_list' (addPlanToList→addToList) + rendered DOM. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const errs=[];const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.message||e.message).slice(0,200)));
vc.on('error',(...a)=>errs.push('console.error: '+a.join(' ').slice(0,200)));
const store={};
const mkLS=()=>({getItem:k=>k in store?store[k]:null,setItem:(k,v)=>{store[k]=String(v);},removeItem:k=>{delete store[k];},clear:()=>{for(var k in store)delete store[k];},key:()=>null,length:0});
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){
    try{Object.defineProperty(w,'localStorage',{value:mkLS(),configurable:true,writable:true});}catch(e){w.localStorage=mkLS();}
    w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};
    w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
    w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};
    w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);
    w.HTMLElement.prototype.scrollIntoView=function(){};
  }});
const Jget=(k)=>{try{return JSON.parse(store[k]||'[]');}catch(e){return[];}};
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];let P;
  try{
  out.push('globals: openPlan='+(typeof w.openPlan)+' renderPlan='+(typeof w.renderPlan)+' assignPlan='+(typeof w.assignPlan)+' addPlanToList='+(typeof w.addPlanToList));
  // init: 7 empty slots
  P=Jget('tub_plan');
  out.push('init: plan slots='+P.length+' filled='+w.planFilled()+' (want 7 / 0)');
  // render → 7 day cards, exactly 1 today
  w.renderPlan();
  const days=d.querySelectorAll('#plan-body .pday').length;
  const today=d.querySelectorAll('#plan-body .pday.today').length;
  out.push('renderPlan: day-cards='+days+' today-cards='+today+' (want 7 / 1)');
  // assign a dish to slot 0
  w.pickSlot(0);
  const pickerOpen0=d.querySelectorAll('#plan-body .plan-picker').length;
  w.assignPlan('steak');
  P=Jget('tub_plan');
  out.push('assignPlan(steak→slot0): slot0.slug='+P[0].slug+' filled='+w.planFilled()+' picker-closed='+(d.querySelectorAll('#plan-body .plan-picker').length===0)+' (want steak / 1 / true)');
  // badge
  const b=d.getElementById('plan-badge');
  out.push('badge: text="'+b.textContent+'" display="'+b.style.display+'" (want 1 / inline-flex)');
  // servings stepper: 2 → +/+ = 6
  w.setPlanServ(0,1);w.setPlanServ(0,1);P=Jget('tub_plan');
  out.push('setPlanServ(0,+2): serv='+P[0].serv+' (want 6)');
  // planner → list handoff: add week to list, tub_list should gain steak's ings
  w.addPlanToList();
  const listItems=Jget('tub_list').length;
  out.push('addPlanToList: tub_list items='+listItems+' (want >0 — steak ings aggregated at serv 6)');
  // balance nudge: force-test by planning the SAME dish (steak) into 3 slots
  w.pickSlot(0);w.assignPlan('steak');w.pickSlot(1);w.assignPlan('steak');w.pickSlot(2);w.assignPlan('steak');
  var steakCui=(w.R||[]).find(function(r){return r.slug==='steak';});
  out.push('nudge: 3× steak ('+(steakCui&&steakCui.cui||'?')+') planned → nudge="'+w.planNudge()+'" '+(w.planNudge()?'✓':'✗(want non-empty)'));
  // search filter via the fixed global setter (closure-safe)
  w.pickSlot(3); // open picker so input/list exist
  w.setPlanQuery('');var all=w.planPool().length;
  w.setPlanQuery('zzzznomatch');var none=w.planPool().length;
  w.setPlanQuery('steak');var hit=w.planPool().length;
  out.push('searchFilter: all='+all+' nomatch='+none+' steak='+hit+' (want all>0, none=0, hit>0)');
  w.pickSlot(3); // close picker
  // surprise fill fills remaining empties
  w.pickSlot(1); // close any picker
  var beforeFill=w.planFilled();w.surpriseFillPlan();var afterFill=w.planFilled();
  out.push('surpriseFill: filled '+beforeFill+'→'+afterFill+' (want →7)');
  // persistence roundtrip
  P=Jget('tub_plan');
  out.push('persistence: tub_plan has '+P.filter(function(s){return s.slug;}).length+' slugs stored');
  // clear one + badge updates
  w.rmPlan(0);out.push('rmPlan(0): filled='+w.planFilled()+' (want 6)');
  }catch(e){out.push('VERIFY THREW: '+e.message);}
  console.log('=== PLAN VERIFY ===\n'+out.join('\n'));
  console.log('\nJS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,5).join('\n  '):'none ✓');
  process.exit(0);
},2800);
