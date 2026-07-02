const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage();
  await p.setViewport({width:390,height:844,deviceScaleFactor:1});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,100));});
  await p.goto('http://localhost:8000/tub-app.html',{waitUntil:'networkidle2'});
  await p.waitForSelector('#grid .card',{timeout:10000});await wait(500);
  const fns=await p.evaluate(()=>['startCook','openShop','openPlan','openMethods','addPantry','addToList','exitCook','closeShop','closePlan','cookTonight'].map(n=>n+':'+typeof window[n]).join('  '));
  console.log('FN TYPES: '+fns);
  // try startCook
  await p.evaluate(()=>{try{window.startCook('steak');}catch(e){window._e=e.message;}});
  await wait(800);
  const cookState=await p.evaluate(()=>{const c=document.getElementById('cook');return 'cook: '+(c?'class='+c.className+' scrollH='+c.scrollHeight+' clientH='+c.clientHeight+' overflow='+getComputedStyle(c).overflowY:'NO #cook');});
  console.log(cookState);
  console.log('PAGE ERRORS: '+errs.slice(0,4).join(' | '));
  await b.close();
})().catch(e=>console.error('FAIL',e.message));
