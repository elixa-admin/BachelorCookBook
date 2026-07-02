/* Capture feature overlays at mobile, with a hard reset between each screen. */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:8000/tub-app.html';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const shot=(p,name)=>p.screenshot({path:'shot-'+name+'.png'});
const scrollEl=(p,id,y)=>p.evaluate(({id,y})=>{const e=document.getElementById(id);if(e)e.scrollTo(0,y);else window.scrollTo(0,y);},{id,y});
const reset=async(p)=>{await p.evaluate(()=>{['detail','cook','shop','plan','methods'].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.remove('open');});const br=document.getElementById('browse');if(br)br.style.display='block';window.scrollTo(0,0);});await wait(250);};
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  const p=await b.newPage();
  await p.setViewport({width:390,height:844,deviceScaleFactor:1,isMobile:true,hasTouch:true});
  await p.goto(URL,{waitUntil:'networkidle2'});
  await p.waitForSelector('#grid .card',{timeout:10000});await wait(500);
  // COOK MODE
  await reset(p);
  await p.evaluate(()=>{if(window.startCook)window.startCook('steak');});
  await wait(900);
  await scrollEl(p,'cook',0);await wait(250);await shot(p,'cook-390a');          // method choice
  await p.evaluate(()=>{const b=document.querySelector('#cook .amc-card');if(b)b.click();});
  await wait(700);
  await scrollEl(p,'cook',0);await wait(250);await shot(p,'cook-390b');          // first step
  await scrollEl(p,'cook',520);await wait(350);await shot(p,'cook-390c');        // step mid / timer
  // PANTRY MATCHER
  await reset(p);
  await p.evaluate(()=>{['garlic','onion','beef mince','tomato','cream','butter'].forEach(q=>{if(window.addPantry)window.addPantry(q);});});
  await p.evaluate(()=>{const b=document.querySelector('.occ-btn[data-occ="pantry"]');if(b)b.click();});
  await wait(900);
  await p.evaluate(()=>window.scrollTo(0,0));await wait(250);await shot(p,'pantry-390a');
  await p.evaluate(()=>window.scrollTo(0,560));await wait(350);await shot(p,'pantry-390b');
  // SHOPPING LIST
  await reset(p);
  await p.evaluate(()=>{if(window.addToList){window.addToList('steak',2);window.addToList('shakshuka-crusty-bread',2);window.addToList('denningvleis',4);}});
  await p.evaluate(()=>{if(window.openShop)window.openShop();});
  await wait(700);
  await shot(p,'shop-390a');
  await scrollEl(p,'shop',480);await wait(350);await shot(p,'shop-390b');
  // MEAL PLANNER
  await reset(p);
  await p.evaluate(()=>{if(window.openPlan)window.openPlan();});
  await wait(700);
  await shot(p,'plan-390a');
  await scrollEl(p,'plan',480);await wait(350);await shot(p,'plan-390b');
  await b.close();
  console.log('captured feature screens (reset-resilient)');
})().catch(e=>{console.error('FAIL:',e.message);process.exit(1);});
