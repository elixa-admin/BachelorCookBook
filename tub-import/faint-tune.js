function lum(hex){var c=hex.replace('#','');var r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;function l(x){return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);}return 0.2126*l(r)+0.7152*l(g)+0.0722*l(b);}
function ratio(a,b){var L1=lum(a),L2=lum(b);var hi=Math.max(L1,L2),lo=Math.min(L1,L2);return ((hi+0.05)/(lo+0.05));}
var surf2='#171A1F',surf='#121418',ink='#08090B',muted='#9CA1A9';
console.log('muted #9CA1A9 on surface-2:',ratio(muted,surf2).toFixed(2),'| on ink:',ratio(muted,ink).toFixed(2));
console.log('\nCandidate faint grays (want >=4.6 on surface-2, still < muted luminance):');
var cands=['#7C818B','#808591','#838994','#868C97','#898FA0','#8D93A4','#9097A8'];
cands.forEach(function(c){console.log(c+' on surface-2:'+ratio(c,surf2).toFixed(2)+' on surface:'+ratio(c,surf).toFixed(2)+' on ink:'+ratio(c,ink).toFixed(2)+'  (lum '+lum(c).toFixed(3)+' vs muted '+lum(muted).toFixed(3)+')');});
console.log('\naccent-bright text candidates (want >=4.5 on ink for small labels):');
['#BC3A42','#C7444C','#D14A52','#DC525A','#E05961'].forEach(function(c){console.log(c+' on ink:'+ratio(c,ink).toFixed(2)+' on surface:'+ratio(c,surf).toFixed(2));});
