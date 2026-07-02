const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,160)));
const dom=new JSDOM(fs.readFileSync('tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);}});
setTimeout(()=>{
  const d=dom.window.document;
  const cards=d.querySelectorAll('.card');
  const phs=d.querySelectorAll('.card .ph[class*="ph-"]');
  const glyphs=d.querySelectorAll('.card .ph-g');
  // domain distribution
  const dist={};phs.forEach(p=>{const m=(p.className.match(/ph-(heat|fat|water|sauces|bake|cold|foundations)/)||[])[1];if(m)dist[m]=(dist[m]||0)+1;});
  // image cards (steak/salmon have images)
  const steakCard=[...cards].find(c=>/steak/.test(c.getAttribute('onclick')||''));
  const steakImg=steakCard&&steakCard.querySelector('.thumb-img');
  const steakPh=steakCard&&steakCard.querySelector('.ph-g');
  console.log('cards:'+cards.length+' | ph-* tiles:'+phs.length+' | glyphs:'+glyphs.length);
  console.log('domain dist:',JSON.stringify(dist));
  console.log('steak (has photo): img present='+(!!steakImg)+' (still on top), tile glyph also behind='+(!!steakPh));
  // a no-photo card should show its glyph
  const noImg=[...cards].find(c=>!c.querySelector('.thumb-img'));
  console.log('a no-photo card glyph:',noImg?(noImg.querySelector('.ph-g')||{}).textContent:'(none)','| domain:',noImg?(noImg.querySelector('.ph').className.match(/ph-(\w+)/)||[])[1]:'');
  console.log('JS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,3).join('\n  '):'none ✓');
  process.exit(0);
},2800);
