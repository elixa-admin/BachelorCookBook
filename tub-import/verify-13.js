const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(""+(e.detail&&e.detail.message||e.message)).slice(0,200));
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  ['pizza-margherita','spaghetti-bolognese','home-chicken-curry','chicken-stir-fry'].forEach(function(slug){
    w.openRecipe(slug);var det=d.getElementById('detail').innerHTML;
    console.log(slug+': renders='+(det.length>500)+' | ing='+(det.match(/class="ing"/g)||[]).length+' | mistakes='+(det.includes('Common mistakes')?'✓':'-')+' | sides='+(det.includes('Serve with')?'✓':'-')+' | storage='+(det.includes('Storage')?'✓':'-')+' | chef_upgrade='+(det.includes("Chef")?'✓':'-'));
  });
  console.log('JS ERRORS:',errs.length+(errs.length?' | '+errs.slice(0,3).join(' | '):''));
  process.exit(0);},2800);
