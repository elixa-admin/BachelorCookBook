/* Phase 2 — shopping list verify.
   shop[] is a lexical closure var (not on window) → observe via localStorage 'tub_list'
   (written by addToList→saveShop), shopCount()/badge (window funcs), and rendered DOM.
   jsdom disables localStorage for file:// origin; install a working stub via defineProperty. */
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
    w.scrollIntoView=()=>{};
  }});
const Lget=()=>{try{return JSON.parse(store['tub_list']||'[]');}catch(e){return[];}};
setTimeout(()=>{
  const w=dom.window,d=w.document,out=[];let L;
  try{
  out.push('globals: addToList='+(typeof w.addToList)+' renderShop='+(typeof w.renderShop)+' openShop='+(typeof w.openShop)+' toast='+(typeof w.toast));
  // 1. steak (full cook, r.ing) at serv 2
  const n2=w.addToList('steak',2);L=Lget();
  out.push('addToList(steak,2): n='+n2+' items='+L.length);
  out.push('  keys: '+L.map(x=>x.key).join(' | '));
  const cats=[...new Set(L.map(x=>x.cat))].sort();
  out.push('cats: '+cats.join(',')+' (want a mix)');
  const butter=L.find(x=>/butter/.test(x.name));
  out.push('butter: '+(butter?('name="'+butter.name+'" disp="'+butter.parts[0].disp+'" cat='+butter.cat):'MISSING (want ~120 g, dairy)'));
  // 2. re-scale: add steak at serv 6 → same items get a 2nd part, qty grows; no dup rows
  w.addToList('steak',6);L=Lget();
  const butter2=L.find(x=>/butter/.test(x.name));
  out.push('re-add@6: total items='+L.length+' (dedup → want same count as serv2 add) | butter parts="'+butter2.parts.map(p=>p.disp).join(' + ')+'" (want 120 g + 360 g)');
  // 3. add carbonara → some shared items dedup, new ones added
  const before=L.length;w.addToList('carbonara',2);L=Lget();
  out.push('add carbonara: '+before+'→'+L.length+' items (want growth, some dedup)');
  // 4. pantry flag
  w.addPantry('butter');
  out.push('shopInPantry("unsalted butter"): '+w.shopInPantry('unsalted butter')+' (want true)');
  // 5. check-off via shopCount
  L=Lget();const k0=L[0].key;const cb=w.shopCount();w.toggleShopItem(k0);
  out.push('check-off: count '+cb+'→'+w.shopCount()+' (want -1)');
  // 6. badge
  w.renderShopBadge();const badge=d.getElementById('shop-badge');
  out.push('badge: text="'+badge.textContent+'" display="'+badge.style.display+'" (want >0, inline-flex)');
  // 7. render + inspect DOM
  w.renderShop();
  out.push('renderShop: groups='+d.querySelectorAll('#shop-body .shop-group').length+
           ' items='+d.querySelectorAll('#shop-body .si').length+
           ' pantry-tags='+d.querySelectorAll('#shop-body .si-tag.have').length+
           ' checked='+d.querySelectorAll('#shop-body .si.done').length+' (want groups>1,items>0,tags>0,checked=1)');
  // 8. compendium (key_ings, no-qty path)
  const comp=(w.R||[]).find(x=>x.key_ings&&!x.live);
  if(comp){const cn=w.addToList(comp.slug,2);out.push('compendium ('+comp.slug+'): added='+cn+' (want >0 via key_ings)');}
  else out.push('compendium: no test dish');
  // 9. clrShop
  w.clrShop();
  out.push('clrShop: items='+Lget().length+' count='+w.shopCount()+' badge-display="'+d.getElementById('shop-badge').style.display+'" (want 0 / none)');
  // 10. toast
  w.toast('hi');out.push('toast: shown='+d.getElementById('toast').classList.contains('show'));
  }catch(e){out.push('VERIFY THREW: '+e.message);}
  console.log('=== SHOP VERIFY ===\n'+out.join('\n'));
  console.log('\nJS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,5).join('\n  '):'none ✓');
  process.exit(0);
},2800);
