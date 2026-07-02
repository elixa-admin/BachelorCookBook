const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(""+(e.detail&&e.detail.message||e.message)).slice(0,200));
const dom=new JSDOM(fs.readFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html','utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  w.openRecipe('steak');var det=d.getElementById('detail')||{};
  var html=det.innerHTML||'';
  console.log('JS ERRORS:',errs.length+(errs.length?' | '+errs.slice(0,3).join(' | '):''));
  console.log('steak renders:',html.length>500,'| ing rows:',(html.match(/class="ing"/g)||[]).length,'| has brief:',html.includes('The brief'));
  // test a recipe WITH the new fields by faking — confirm extrasHTML renders sections when fields exist
  var fake={mistakes:['a','b'],sides:['rice','pap'],storage:'fridge 3 days',chef_upgrade:'add truffle'};
  console.log('extrasHTML(fake) renders: mistakes='+w.extrasHTML(fake).includes('Common mistakes')+' sides='+w.extrasHTML(fake).includes('Serve with')+' storage='+w.extrasHTML(fake).includes('Storage')+' chef='+w.extrasHTML(fake).includes("Chef"));
  console.log('extrasHTML(empty) returns blank:',w.extrasHTML({}).length===0);
  process.exit(0);},2500);
