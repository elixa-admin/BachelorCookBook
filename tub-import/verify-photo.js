const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const vc=new VirtualConsole();const dom=new JSDOM(fs.readFileSync('tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);}});
setTimeout(()=>{
  const d=dom.window.document;
  // carbonara is solo AND has a verified photo — check img overlays the tile
  const c=[...d.querySelectorAll('.card')].find(x=>/openRecipe\('carbonara'\)/.test(x.getAttribute('onclick')||''));
  console.log('carbonara card:',!!c,'| thumb-img on top:',!!(c&&c.querySelector('.thumb-img')),'| tile behind:',!!(c&&c.querySelector('.ph.ph-heat,.ph.ph-water,.ph.ph-fat,.ph.ph-bake,.ph.ph-cold,.ph.ph-sauces,.ph.ph-foundations')));
  // count how many solo cards actually show a real photo
  const withImg=d.querySelectorAll('.card .thumb-img').length;
  console.log('solo cards showing a real photo:',withImg,'/ 56');
  process.exit(0);
},2800);
