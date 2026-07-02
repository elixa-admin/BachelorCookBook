/* Gather Wikimedia Commons photo candidates for dishes still needing photos.
   Queries Commons search API per dish, keeps best name-matching jpg/png, outputs
   slug→{file,score,thumb}. Wikimedia requires a User-Agent. */
const fs=require('fs'),https=require('https');
const need=require('./need-photos.json');
const UA='TUB-Cookbook/1.0 (local preview; contact: dev@local)';
function get(url){return new Promise((res,rej)=>{const r=https.request(url,{headers:{'User-Agent':UA}},x=>{let d='';x.on('data',c=>d+=c);x.on('end',()=>res(d));});r.on('error',rej);r.end();});}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function norm(s){return (s||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
const STOP=new Set(['the','and','with','a','of','in','on','for','to','de','di','dish','food','recipe','photo','jpg','jpeg','png','file']);
function toks(s){return norm(s).split(' ').filter(t=>t.length>1&&!STOP.has(t));}
function nameScore(dishTitle,fileName){
  var dt=toks(dishTitle),ft=toks(fileName.replace(/\.(jpg|jpeg|png)$/i,''));
  if(!dt.length)return 0;var fs_=new Set(ft);var inter=0;dt.forEach(t=>{if(fs_.has(t))inter++;});
  var dice=(2*inter)/(dt.length+Math.max(ft.length,1));
  var allin=dt.every(t=>fs_.has(t))?0.3:0;
  return dice+allin;
}
(async()=>{
  var out={},none=[];
  for(var i=0;i<need.length;i++){
    var d=need[i],q=encodeURIComponent(d.t);
    var url='https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch='+q+'&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url%7Cmime%7Csize&iiurlwidth=1000';
    try{
      var j=JSON.parse(await get(url));
      var pages=j.query&&j.query.pages?Object.values(j.query.pages):[];
      var cands=pages.filter(p=>p.imageinfo&&p.imageinfo[0]&&/jpe?g|png/i.test(p.imageinfo[0].mime)).map(p=>({file:p.title,thumb:p.imageinfo[0].thumburl,url:p.imageinfo[0].url,score:nameScore(d.t,p.title)}));
      cands.sort((a,b)=>b.score-a.score);
      if(cands.length&&cands[0].score>=0.35)out[d.slug]={q:d.t,file:cands[0].file.replace(/^File:/,''),score:+cands[0].score.toFixed(2),thumb:cands[0].thumb};
      else none.push(d.slug+' ('+d.t+') best='+(cands[0]?(cands[0].file+' '+cands[0].score.toFixed(2)):'none'));
    }catch(e){none.push(d.slug+' ERR '+e.message);}
    if(i%15===0)process.stdout.write('  '+i+'/'+need.length+'\n');
    await sleep(150);
  }
  fs.writeFileSync('./commons-candidates.json',JSON.stringify(out,null,2));
  fs.writeFileSync('./commons-missing.txt',none.join('\n'));
  console.log('commons matched:',Object.keys(out).length,'| none/weak:',none.length);
  var sorted=Object.entries(out).sort((a,b)=>b[1].score-a[1].score);
  console.log('\n--- top 15 by name score ---');sorted.slice(0,15).forEach(([s,o])=>console.log('  '+o.score+'  '+s+'  '+o.q+'  ←  '+o.file));
  console.log('\n--- weakest 10 (review) ---');sorted.slice(-10).forEach(([s,o])=>console.log('  '+o.score+'  '+s+'  '+o.q+'  ←  '+o.file));
})();
