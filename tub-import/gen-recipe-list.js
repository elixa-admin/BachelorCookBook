const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const errs=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errs.push(""+(e.detail&&e.detail.message||e.message)).slice(0,150));
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file:///Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html',virtualConsole:vc,beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{const w=dom.window,d=w.document;
  // scrape live cards across occasions -> slug:{title,tier}
  var live={};
  ['solo','date','host'].forEach(function(occ){
    var btn=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(btn)btn.click();
    d.querySelectorAll('#grid .card').forEach(function(c){
      var h3=c.querySelector('h3'),badge=c.querySelector('.badge'),oc=c.getAttribute('onclick')||'';
      var m=oc.match(/openRecipe\('([^']+)'\)/);var slug=m?m[1]:null;
      if(slug&&!live[slug])live[slug]={title:(h3?h3.textContent.trim():slug),tier:(badge?badge.textContent.trim():'')};
    });
  });
  var RC=w.ROSTER_CLASSES||{};
  var CATS=[['main','Mains'],['byo','Build your own'],['special','Special evening'],['sweet','Baked & sweet']];
  var TIERS=[['heritage','Heritage','#c9a24b'],['adopted','Adopted','#b8b0a4'],['aspirational','Aspirational','#9B2C33'],['component','Component','#857c70']];
  function esc(s){return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
  var rows=[],liveCount=0,cutList=[];
  CATS.forEach(function(c){
    var catK=c[0],catL=c[1];
    TIERS.forEach(function(t){
      var tK=t[0],tL=t[1],tC=t[2];
      var items=Object.keys(RC).filter(function(s){var r=RC[s];return r.cat===catK&&r.tier===tK&&!r.cut;});
      if(!items.length)return;
      items.sort(function(a,b){var ta=(live[a]&&live[a].title)||a,tb=(live[b]&&live[b].title)||b;return ta.localeCompare(tb);});
      rows.push('<div class="grp"><div class="gh"><span class="gcat">'+esc(catL)+'</span><span class="gtier" style="color:'+tC+'">'+esc(tL)+'</span><span class="gcount">'+items.length+'</span></div>');
      items.forEach(function(s){
        var title=(live[s]&&live[s].title)||s.replace(/-/g,' ');
        rows.push('<label class="r"><input type="checkbox"><span class="dot" style="background:'+tC+'"></span><span class="rt">'+esc(title)+'</span><span class="rs">'+esc(s)+'</span></label>');
        liveCount++;
      });
      rows.push('</div>');
    });
  });
  Object.keys(RC).filter(function(s){return RC[s].cut;}).forEach(function(s){cutList.push(s);});
  var html='<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>TUB — Recipe review</title><style>'+
    'body{background:#08090B;color:#F2F2F0;font-family:system-ui,-apple-system,sans-serif;margin:0;padding:36px 20px 80px;line-height:1.5}'+
    '.wrap{max-width:900px;margin:0 auto}'+
    'h1{font-family:Georgia,serif;font-size:30px;margin:0 0 4px;letter-spacing:.01em}'+
    '.sub{color:#898FA0;font-size:14px;margin:0 0 22px}'+
    '.bar{display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:26px;padding-bottom:18px;border-bottom:1px solid #272B33}'+
    '.bar button{background:#9B2C33;color:#F4E6E2;border:1px solid #BC3A42;padding:9px 16px;border-radius:9999px;font-size:13px;cursor:pointer;font-weight:600}'+
    '.bar .n{color:#898FA0;font-size:13px}'+
    '.grp{margin-bottom:26px;background:#121418;border:1px solid #1B1F25;border-radius:14px;padding:6px 18px}'+
    '.gh{display:flex;align-items:center;gap:12px;padding:12px 0 10px;border-bottom:1px solid #1B1F25}'+
    '.gcat{font-weight:700;font-size:15px}.gtier{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.06em}.gcount{margin-left:auto;color:#676C75;font-size:13px}'+
    '.r{display:flex;align-items:center;gap:11px;padding:9px 0;border-bottom:1px solid #15181c;cursor:pointer}'+
    '.r:last-child{border-bottom:none}'+
    '.r input{accent-color:#E05961;width:17px;height:17px}'+
    '.dot{width:9px;height:9px;border-radius:50%;flex:0 0 auto}'+
    '.rt{font-size:15px;color:#F2F2F0}.rs{margin-left:auto;color:#52575f;font-size:12px;font-family:ui-monospace,monospace}'+
    '.cut{margin-top:34px;padding:18px;background:#121418;border:1px dashed #272B33;border-radius:14px}'+
    '.cut h3{margin:0 0 8px;font-size:14px;color:#898FA0;text-transform:uppercase;letter-spacing:.08em}'+
    '.cut p{color:#676C75;font-size:13px;line-height:1.7}'+
    '@media print{body{background:#fff;color:#000}.grp,.cut{background:#fff;border-color:#ccc}.rt{color:#000}.rs{color:#888}}'+
    '</style></head><body><div class="wrap">'+
    '<h1>TUB — Recipe Review</h1>'+
    '<p class="sub">The full live roster, grouped by category and tier. Tick anything that should <b>go</b> (or mark keeps) — then print or screenshot for me. Discardable.</p>'+
    '<div class="bar"><button onclick="window.print()">Print / Save as PDF</button><span class="n">'+liveCount+' live recipes · '+cutList.length+' currently cut</span></div>'+
    rows.join('')+
    '<div class="cut"><h3>Currently cut ('+cutList.length+')</h3><p>'+cutList.map(esc).join(' · ')+'</p></div>'+
    '</div></body></html>';
  fs.writeFileSync('/Users/brandondienar/.claude/jobs/d2505485/tmp/recipe-list.html',html);
  console.log('JS ERRORS:',errs.length);
  console.log('live recipes:',liveCount,'| cut:',cutList.length);
  console.log('wrote recipe-list.html ('+(liveCount+cutList.length)+' total classified)');
},2800);
