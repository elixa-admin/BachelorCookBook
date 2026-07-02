/* Drive a real Chrome session: open a recipe detail (fixed overlay, own scroll)
   and screenshot at phone + tablet widths, scrolled within #detail. */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:8000/tub-app.html';
const SLUG=process.argv[2]||'steak';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const scrollDetail=(p,y)=>p.evaluate(yy=>{const d=document.getElementById('detail');if(d)d.scrollTo(0,yy);},y);
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
  const p=await b.newPage();
  await p.setViewport({width:390,height:844,deviceScaleFactor:1,isMobile:true,hasTouch:true});
  await p.goto(URL,{waitUntil:'networkidle2'});
  await p.waitForSelector('#grid .card',{timeout:10000});
  await wait(700);
  await p.evaluate(s=>{if(window.openRecipe)window.openRecipe(s);},SLUG);
  await p.waitForSelector('#detail.open #detail .ing',{timeout:8000}).catch(()=>p.waitForSelector('#detail .ing',{timeout:4000}));
  await wait(800);
  await scrollDetail(p,0);    await wait(300); await p.screenshot({path:'shot-d-390a.png'});   // hero/header + top
  await scrollDetail(p,620);  await wait(400); await p.screenshot({path:'shot-d-390b.png'});   // ingredients/steps
  await scrollDetail(p,1500); await wait(400); await p.screenshot({path:'shot-d-390c.png'});   // lower sections
  await p.setViewport({width:768,height:1024,deviceScaleFactor:1});
  await p.evaluate(s=>{const d=document.getElementById('detail');if(d)d.scrollTo(0,0);if(window.openRecipe)window.openRecipe(s);},SLUG);
  await wait(800); await p.screenshot({path:'shot-d-768a.png'});
  await scrollDetail(p,700); await wait(400); await p.screenshot({path:'shot-d-768b.png'});
  await b.close();
  console.log('captured detail screenshots for '+SLUG);
})().catch(e=>{console.error('FAIL:',e.message);process.exit(1);});
