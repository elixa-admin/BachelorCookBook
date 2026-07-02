const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push((e.detail&&e.detail.message||e.message).slice(0,160)));
const dom=new JSDOM(fs.readFileSync('tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',
  url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,
  beforeParse(w){w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}takeRecords(){return[]}};w.ResizeObserver=class{observe(){}unobserve(){}disconnect(){}};w.matchMedia=w.matchMedia||function(q){return{matches:false,media:q,addEventListener(){},removeEventListener(){}}};w.scrollTo=()=>{};w.requestAnimationFrame=cb=>setTimeout(()=>cb(0),0);}});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  // surprise button present
  const sbtn=d.querySelector('.topbtn[onclick*="surpriseMe"]');
  console.log('surprise button:',!!sbtn);
  // search highlighting: type 'steak' → cards with <mark>
  const q=d.getElementById('q');q.value='steak';w.filterCards();
  const marks=d.querySelectorAll('#grid mark').length;
  const cnt=d.querySelectorAll('#grid .card').length;
  console.log('query "steak": '+cnt+' cards, '+marks+' highlighted matches'+(marks>0?' ✓':' ✗'));
  // clear
  q.value='';w.clearSearch();
  // surprise me → opens a recipe detail
  w.surpriseMe();
  const opened=d.getElementById('detail').classList.contains('open');
  console.log('surpriseMe opens a recipe:',opened?'✓':'✗');
  console.log('JS ERRORS ('+errs.length+'):',errs.length?errs.slice(0,3).join('\n  '):'none ✓');
  process.exit(0);
},2800);
