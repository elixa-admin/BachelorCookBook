function lum(hex){var c=hex.replace('#','');var r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;function l(x){return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);}return 0.2126*l(r)+0.7152*l(g)+0.0722*l(b);}
function ratio(a,b){var L1=lum(a),L2=lum(b);var hi=Math.max(L1,L2),lo=Math.min(L1,L2);return ((hi+0.05)/(lo+0.05));}
var s2='#171A1F',surf='#121418',ink='#08090B';
console.log('faint #898FA0  on surface-2:'+ratio('#898FA0',s2).toFixed(2)+' surface:'+ratio('#898FA0',surf).toFixed(2)+' ink:'+ratio('#898FA0',ink).toFixed(2)+'  (was 3.30/3.49/3.77 — FAIL)');
console.log('accent-text #E05961 on surface-2:'+ratio('#E05961',s2).toFixed(2)+' surface:'+ratio('#E05961',surf).toFixed(2)+' ink:'+ratio('#E05961',ink).toFixed(2)+'  (accent-bright was 3.17/3.36/3.63 — FAIL)');
console.log('AA pass requires >=4.5 (normal text)');
