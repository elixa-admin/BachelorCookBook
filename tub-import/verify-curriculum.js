/* Verify Method Map + Compare. Open the Learn overlay FIRST so #lcontent exists. */
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
    w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}};};
    w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(Date.now()),0);
  }});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  // 1. domain coverage
  const M=w.MASTERCLASS||[],valid=new Set((w.methodDomains()||[]).map(x=>x.id));
  let unmapped=0;const counts={};
  M.forEach(m=>{const id=w.mcDomainOf(m);if(!valid.has(id))unmapped++;counts[id]=(counts[id]||0)+1;});
  console.log('=== DOMAIN COVERAGE ===  mapped',M.length-unmapped+'/'+M.length,'| sum',Object.values(counts).reduce((a,b)=>a+b,0));
  // 2. open Learn → lands on Method Map
  w.openMethods();
  const defTab=(d.querySelector('.ltab.active')||{}).dataset;
  const tiles=d.querySelectorAll('#lcontent .mm-tile').length;
  console.log('=== METHOD MAP ===       landing tab:',defTab.t,defTab.t==='map'?'✓':'✗','| tiles:',tiles,tiles===7?'✓':'✗');
  // 3. drill into each domain → lesson cards
  console.log('=== DRILL-IN (per domain) ===');
  (w.methodDomains()||[]).forEach(dm=>{
    w.renderLearnTab('map');           // reset to map each time
    w.renderDomain(dm.id);
    const n=d.querySelectorAll('#lcontent .amc').length;
    const head=(d.querySelector('#lcontent .mm-dhead h2')||{}).textContent;
    console.log('  '+dm.icon+' '+dm.label.padEnd(20),'→',n,'cards',n>0?'✓':(n===0&&counts[dm.id]===0?'(empty)':'✗'));
  });
  // 4. Compare tab
  w.renderLearnTab('compare');
  const cmps=d.querySelectorAll('#lcontent .mm-cmp').length;
  const pairs=w.methodCompare().length;
  console.log('=== COMPARE ===          pairs:',pairs,'| rendered:',cmps,cmps===pairs?'✓':'✗');
  // sample one compare card structure
  const first=d.querySelector('#lcontent .mm-cmp');
  if(first){const axes=first.querySelectorAll('.mm-cl').length,cells=first.querySelectorAll('.mm-cell').length;
    console.log('  sample card: title='+(first.querySelector('h3')||{}).textContent+'| axes='+axes+'| cells='+cells);}
  console.log('\njs errors:',errs.length?errs.join('\n  '):'none');
  process.exit(0);
},1300);
