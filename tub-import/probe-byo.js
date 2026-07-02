/* Probe: which byo/component slugs in ROSTER_CLASSES are actually live in R,
   and are there any obvious accompaniments in the data missing a byo classification
   (which would wrongly show as 'main')? */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const vc=new VirtualConsole();
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:vc,
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window,d=w.document;
  const CL=w.ROSTER_CLASSES||{};
  const byoSlugs=Object.keys(CL).filter(s=>CL[s]&&CL[s].cat==='byo'&&CL[s].cut!==true);
  // open accomp view, collect live slugs + titles
  const btn=d.querySelector('.occ-btn[data-occ="accomp"]');if(btn)btn.click();
  const liveByo=[...d.querySelectorAll('#grid .card')].map(c=>{const m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);const t=c.querySelector('h3');return m?{slug:m[1],title:t?t.textContent.trim():''}:null;}).filter(Boolean);
  const liveSet=new Set(liveByo.map(x=>x.slug));
  const rosterOnly=byoSlugs.filter(s=>!liveSet.has(s));
  console.log('BYO roster entries (cut:false): '+byoSlugs.length);
  console.log('Live in Accompaniments view: '+liveByo.length);
  console.log('\n--- LIVE accompaniments ---');
  console.log(liveByo.map(x=>'  '+x.slug+'  =  '+x.title).join('\n'));
  console.log('\n--- ROSTER byo but NOT live (no recipe object in data) ---');
  console.log(rosterOnly.length?('  '+rosterOnly.join(', ')):'  (none)');
  process.exit(0);
},2800);
