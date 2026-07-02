/* Extract the app's --crest brand seal from tub-app.html and build an icon
   HTML page (seal centered on the dark brand bg) for rasterizing to PNGs. */
const fs=require('fs');
const s=fs.readFileSync('tub-app.html','utf8');
const m=s.match(/--crest:\s*url\("(data:image\/png;base64,([A-Za-z0-9+/=]+))"\)/);
if(!m){console.error('crest data URI not found');process.exit(1);}
const dataUri=m[1], b64=m[2];
fs.writeFileSync('icon-crest.png', Buffer.from(b64,'base64'));
// seal at 80% centered => stays inside the maskable safe zone; dark bg fills edges
const html='<!doctype html><meta charset=utf-8><style>'+
  'html,body{margin:0;padding:0;width:100vw;height:100vh;background:#0E1013}'+
  'img{position:absolute;width:80%;height:80%;top:10%;left:10%;object-fit:contain}'+
  '</style><img src="'+dataUri+'">';
fs.writeFileSync('icon.html',html);
console.log('crest extracted -> icon-crest.png ('+Math.round(b64.length*0.75/1024)+'KB), icon.html written');
