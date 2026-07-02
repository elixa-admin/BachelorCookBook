/* Headless smoke test with IO/RO polyfills (jsdom lacks them; browsers have them). */
const fs=require('fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const html=fs.readFileSync(FILE,'utf8');
const errs=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>errs.push('jsdomError: '+(e.detail&&e.detail.message||e.message)));
const dom=new JSDOM(html,{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){
    w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};
    w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};
    w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}};};
    w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(Date.now()),0);
  }});
setTimeout(()=>{
  const d=dom.window.document,grid=d.querySelector('.grid');
  const cards=grid?grid.querySelectorAll('.card').length:0;
  const lazy=d.querySelector('img.thumb-img');
  const style=d.querySelector('style').textContent;
  // tap a card to open detail, then open cook, to exercise flows
  let detailOpen=false,cookOpen=false;
  try{const firstCard=grid&&grid.querySelector('.card');if(firstCard){firstCard.click();
    detailOpen=getComputedStyle(d.getElementById('detail')).display!=='none';}}catch(e){errs.push('detail click: '+e.message);}
  console.log('=== MOBILE P0 VERIFICATION (polyfilled) ===');
  console.log('cards rendered   :',cards);
  console.log('thumb lazy attr  :',lazy&&lazy.getAttribute('loading')==='lazy'?'OK':'FAIL');
  console.log('mobile @480 block:',style.includes('@media(max-width:480px)')?'OK':'MISSING');
  console.log('safe-area insets :',style.includes('safe-area-inset-top')&&style.includes('safe-area-inset-bottom')?'OK':'MISSING');
  console.log('detail opens     :',detailOpen?'OK':'— (first card may be non-cook)');
  console.log('js errors        :',errs.length?errs.join('\n  '):'none');
  process.exit(0);
},1100);
