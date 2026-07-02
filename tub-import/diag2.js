const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage();
  await p.setViewport({width:390,height:844,deviceScaleFactor:1});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,120));});
  await p.goto('http://localhost:8000/tub-app.html',{waitUntil:'networkidle2'});
  await p.waitForSelector('#grid .card',{timeout:10000});await wait(400);
  // SHOP
  await p.evaluate(()=>{if(window.addToList){window.addToList('steak',2);window.addToList('denningvleis',4);}});
  await p.evaluate(()=>{if(window.openShop)window.openShop();});
  await wait(700);
  const shop=await p.evaluate(()=>{const s=document.getElementById('shop');return s?('OPEN='+s.classList.contains('open')+' scrollH='+s.scrollHeight+' cards='+(s.querySelectorAll('.si-item, .si-row, li').length)+' htmlLen='+s.innerHTML.length):'no #shop';});
  console.log('SHOP: '+shop);
  // reset
  await p.evaluate(()=>{['detail','cook','shop','plan','methods'].forEach(id=>{const e=document.getElementById(id);if(e)e.classList.remove('open');});document.getElementById('browse').style.display='block';});
  await wait(200);
  // PLAN
  await p.evaluate(()=>{if(window.openPlan)window.openPlan();});
  await wait(700);
  const plan=await p.evaluate(()=>{const s=document.getElementById('plan');return s?('OPEN='+s.classList.contains('open')+' scrollH='+s.scrollHeight+' slots='+(s.querySelectorAll('.pd-slot, .pd-row, .plan-row').length)+' htmlLen='+s.innerHTML.length):'no #plan';});
  console.log('PLAN: '+plan);
  console.log('ERRS: '+errs.slice(0,4).join(' | '));
  await b.close();
})().catch(e=>console.error('FAIL',e.message));
