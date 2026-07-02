/* Definitive offline test via CDP network emulation:
   online-load -> wait SW active + 40 precached -> go offline -> hard reload
   -> confirm grid renders + a recipe opens (all from cache). */
const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:8000/tub-app.html';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage();
  await p.goto(URL,{waitUntil:'networkidle2',timeout:15000});
  await p.waitForSelector('#grid .card',{timeout:10000});
  let info='';
  for(let i=0;i<30;i++){
    info=await p.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();const keys=await caches.keys();let n=0;for(const k of keys)n+=(await(await caches.open(k)).keys()).length;return (reg?reg.active?.state:'none')+'/'+n;});
    if(/activated/.test(info)&&/\/4[0-9]$/.test(info))break;
    await wait(500);
  }
  console.log('precache: sw/entries = '+info);
  const c=await p.target().createCDPSession();
  await c.send('Network.enable');
  await c.send('Network.emulateNetworkConditions',{offline:true,latency:0,downloadThroughput:0,uploadThroughput:0});
  await wait(400);
  await p.reload({waitUntil:'domcontentloaded',timeout:10000});
  await wait(1500);
  const cards=await p.evaluate(()=>document.querySelectorAll('#grid .card').length);
  let recipeOK=false;
  try{await p.evaluate(()=>{if(window.openRecipe)window.openRecipe('steak');});await wait(600);recipeOK=await p.evaluate(()=>(document.getElementById('detail').innerHTML||'').indexOf('Start guided cook')>-1);}catch(e){}
  console.log('OFFLINE: cards='+cards+' recipeOpensFromCache='+recipeOK+' '+(cards>10&&recipeOK?'-> FULL OFFLINE WORKS ✓':'-> OFFLINE FAILED ✗'));
  await b.close();
})().catch(e=>console.error('FAIL',e.message));
