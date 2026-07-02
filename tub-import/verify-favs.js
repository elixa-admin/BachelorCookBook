const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,160))});
const dom=new JSDOM(fs.readFileSync('tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);}});
setTimeout(()=>{
  const w=dom.window,d=w.document,LS=w.localStorage;
  console.log('toggleFav exposed:',typeof w.toggleFav==='function');
  console.log('fav-btn on cards:',d.querySelectorAll('.card .fav-btn').length);
  // toggle favourite
  w.toggleFav('carbonara');
  const b=d.querySelector('.fav-btn[data-slug="carbonara"]');
  console.log('toggled carbonara: btn.on='+b.classList.contains('on')+' text='+b.textContent+' | localStorage tub_favs includes carbonara:'+(/carbonara/.test(LS.getItem('tub_favs')||'')));
  // My Cookbook view
  d.querySelector('.occ-btn[data-occ="favs"]').click();
  const secs=[...d.querySelectorAll('#grid h3')].map(h=>h.textContent);
  const carbonaraInFavs=!!d.querySelector('#grid .grid .card FavButton')||[...d.querySelectorAll('#grid .card')].some(c=>/openRecipe\('carbonara'\)/.test(c.getAttribute('onclick')||''));
  console.log('My Cookbook sections:',secs.join(' / '));
  console.log('carbonara shows in Saved:'+carbonaraInFavs);
  // cook finish → recently cooked
  w.startCook('salmon');w.exitCook();
  console.log('after salmon cook+exit — tub_cooked includes salmon:'+(/salmon/.test(LS.getItem('tub_cooked')||'')));
  d.querySelector('.occ-btn[data-occ="favs"]').click();
  const hasRecent=[...d.querySelectorAll('#grid h3')].some(h=>/Recently cooked/.test(h.textContent));
  const salmonInRecent=[...d.querySelectorAll('#grid .card')].some(c=>/openRecipe\('salmon'\)/.test(c.getAttribute('onclick')||''));
  console.log('Recently-cooked section:'+hasRecent+' | salmon in recent:'+salmonInRecent);
  // unfavorite
  w.toggleFav('carbonara');d.querySelector('.occ-btn[data-occ="favs"]').click();
  console.log('after unfavorite — Saved empty-state shown:'+!!d.querySelector('#grid .empty'));
  console.log('JS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,3).join('\n  '):'none ✓');
  process.exit(0);
},2800);
