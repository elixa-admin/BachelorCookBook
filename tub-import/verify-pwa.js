const puppeteer=require('puppeteer-core');
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL='http://localhost:8000/tub-app.html';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox','--disable-gpu']});
  const p=await b.newPage();
  await p.setViewport({width:390,height:844});
  const man=await p.goto('http://localhost:8000/manifest.webmanifest',{waitUntil:'networkidle2',timeout:8000}).then(async r=>{try{return await r.json();}catch(e){return {PARSE_ERR:e.message};}}).catch(e=>({NET_ERR:e.message}));
  console.log('MANIFEST: '+(man.name?('OK "'+man.name+'" icons='+man.icons.length+' display='+man.display):JSON.stringify(man).slice(0,90)));
  await p.goto(URL,{waitUntil:'networkidle2'});
  await p.waitForSelector('#grid .card',{timeout:10000});
  let info='';
  for(let i=0;i<24;i++){
    info=await p.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();const keys=await caches.keys();let n=0;for(const k of keys){n+=(await(await caches.open(k)).keys()).length;}return (reg?('sw='+reg.active?.state):'sw=none')+' caches='+keys.join(',')+' entries='+n;});
    if(/entries=4[0-9]/.test(info)&&/sw=activated/.test(info))break;
    await wait(500);
  }
  console.log('SW+CACHE: '+info);
  await p.reload({waitUntil:'networkidle2'});
  await p.waitForSelector('#grid .card',{timeout:10000});
  console.log('ONLINE RELOAD cards='+(await p.evaluate(()=>document.querySelectorAll('#grid .card').length)));
  const ctx=b.defaultBrowserContext();
  await ctx.setOffline(true);try{await p.setOfflineMode(true);}catch(e){}
  await wait(300);
  await p.reload({waitUntil:'domcontentloaded',timeout:10000}).catch(e=>console.log('  reload: '+e.message));
  await wait(1400);
  const offCards=await p.evaluate(()=>document.querySelectorAll('#grid .card').length).catch(()=>-1);
  console.log('OFFLINE RELOAD: cards='+offCards+' '+(offCards>10?'-> OFFLINE WORKS':'-> OFFLINE FAILED'));
  await ctx.setOffline(false);
  await b.close();
})().catch(e=>console.error('FAIL',e.message));
