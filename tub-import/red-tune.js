function lum(hex){var c=hex.replace('#','');var r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;function l(x){return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);}return 0.2126*l(r)+0.7152*l(g)+0.0722*l(b);}
function ratio(a,b){var L1=lum(a),L2=lum(b);var hi=Math.max(L1,L2),lo=Math.min(L1,L2);return ((hi+0.05)/(lo+0.05));}
function hue(hex){var c=hex.replace('#','');var r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;var mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx===mn)return 0;var d=mx-mn;var h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;return h*60;}
var s2='#171A1F',surf='#121418',ink='#08090B';
console.log('wine-red text candidates — want >=4.6 on surface-2 (worst), hue near 350-358 (wine):');
['#D14A52','#D5505A','#DC525A','#E05961','#E45C64','#D04A56','#C94452','#CF4A55','#D24D57','#D6515C'].forEach(function(c){
  console.log(c+' hue:'+Math.round(hue(c))+'  s2:'+ratio(c,s2).toFixed(2)+' surf:'+ratio(c,surf).toFixed(2)+' ink:'+ratio(c,ink).toFixed(2));
});
