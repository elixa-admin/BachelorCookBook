/* Dependency-free PNG icon generator for the TUB PWA.
   Draws the brand crest (wine-red field + gold ring + gold orb) at given sizes.
   Pure JS: zlib deflate + CRC32 + PNG chunks. No native deps. */
const fs=require('fs'),zlib=require('zlib');
const OUT='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
function crc32(b){let c=(~0)>>>0;for(let i=0;i<b.length;i++){c^=b[i];for(let k=0;k<8;k++)c=(c&1)?(0xEDB88320^(c>>>1)):(c>>>1);}return (~c)>>>0;}
function chunk(type,data){const t=Buffer.from(type,'ascii');const len=Buffer.alloc(4);len.writeUInt32BE(data.length>>>0,0);const crc=Buffer.alloc(4);crc.writeUInt32BE(crc32(Buffer.concat([t,data])),0);return Buffer.concat([len,t,data,crc]);}
function pngRGB(w,h,rgb){
  const sig=Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(w,0);ihdr.writeUInt32BE(h,4);ihdr[8]=8;ihdr[9]=2;ihdr[10]=0;ihdr[11]=0;ihdr[12]=0;
  const stride=w*3,raw=Buffer.alloc((stride+1)*h);
  for(let y=0;y<h;y++){raw[y*(stride+1)]=0;rgb.copy(raw,y*(stride+1)+1,y*stride,y*stride+stride);}
  const idat=zlib.deflateSync(raw,{level:9});
  return Buffer.concat([sig,chunk('IHDR',ihdr),chunk('IDAT',idat),chunk('IEND',Buffer.alloc(0))]);
}
function hx(h){return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
const BG=hx('8e2230'), BGd=hx('6c1822');      // accent field + darker edge (vignette)
const GOLD=hx('c9a24b'), GOLDhi=hx('e7c878'), GOLDlo=hx('a07e2f');
function draw(size){
  const buf=Buffer.alloc(size*size*3), cx=(size-1)/2, cy=(size-1)/2, R=size*0.30, rin=size*0.238, orb=size*0.105;
  const maxd=Math.sqrt(cx*cx+cy*cy);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const dx=x-cx,dy=y-cy,d=Math.sqrt(dx*dx+dy*dy);
    let col;
    const ed=d/maxd; // 0 center → 1 corner
    const bg=[Math.round(BG[0]*(1-0.18*ed)+BGd[0]*0.18*ed),Math.round(BG[1]*(1-0.18*ed)+BGd[1]*0.18*ed),Math.round(BG[2]*(1-0.18*ed)+BGd[2]*0.18*ed)];
    if(d<=orb){ // orb with subtle gradient
      const t=d/orb; col=[Math.round(GOLDhi[0]*(1-t)+GOLD[0]*t),Math.round(GOLDhi[1]*(1-t)+GOLD[1]*t),Math.round(GOLDhi[2]*(1-t)+GOLD[2]*t)];
    } else if(d<=R && d>=rin){ // ring
      const t=(d-rin)/(R-rin); col=[Math.round(GOLD[0]*(1-0.25*Math.abs(t-0.5)*2)+GOLDhi[0]*0.25*Math.max(0,0.5-Math.abs(t-0.5)*2)),0,0];
      // simpler: ring = gold with slight highlight toward its centre
      col=GOLD;
    } else { col=bg; }
    const o=(y*size+x)*3;buf[o]=col[0];buf[o+1]=col[1];buf[o+2]=col[2];
  }
  return buf;
}
[192,512,180,32].forEach(function(s){fs.writeFileSync(OUT+'icon-'+s+'.png',pngRGB(s,s,draw(s)));console.log('wrote icon-'+s+'.png ('+s+'×'+s+', '+(pngRGB(s,s,draw(s)).length/1024).toFixed(1)+' KB)');});
