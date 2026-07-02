function lum(hex){var c=hex.replace('#','');var r=parseInt(c.substr(0,2),16)/255,g=parseInt(c.substr(2,2),16)/255,b=parseInt(c.substr(4,2),16)/255;function l(x){return x<=0.03928?x/12.92:Math.pow((x+0.055)/1.055,2.4);}return 0.2126*l(r)+0.7152*l(g)+0.0722*l(b);}
function ratio(a,b){var L1=lum(a),L2=lum(b);var hi=Math.max(L1,L2),lo=Math.min(L1,L2);return ((hi+0.05)/(lo+0.05));}
function flag(r){return r>=4.5?'OK ':r>=3?'AA-large':'FAIL';}
var bg={'ink':'#08090B','ink-2':'#0E1013','surface':'#121418','surface-2':'#171A1F','line':'#272B33'};
var fg={'text':'#F2F2F0','muted':'#9CA1A9','faint':'#676C75','steel':'#8090A0','accent':'#9B2C33','accent-bright':'#BC3A42','accent-deep':'#6E1E24','on-accent':'#F4E6E2'};
var tiers={'heritage-gold':'#c9a24b','adopted-silver':'#b8b0a4','aspirational-wine':'#9B2C33','component-muted':'#857c70','sig-gold':'#D4AF6A','premium-blue':'#8AA0B4','global-green':'#7FA088','exotic-pink':'#C06B8E','others-purple':'#9A86C8'};
console.log('=== TEXT TOKENS on BACKGROUNDS (AA normal=4.5, large/UI=3.0) ===');
Object.keys(fg).forEach(function(fn){Object.keys(bg).forEach(function(bn){var r=ratio(fg[fn],bg[bn]);if(r<4.5)console.log(flag(r)+' '+fn+'('+fg[fn]+') on '+bn+': '+r.toFixed(2));});});
console.log('\n=== TIER COLOURS as TEXT on surfaces (if used as text) ===');
Object.keys(tiers).forEach(function(tn){['surface','ink'].forEach(function(bn){var r=ratio(tiers[tn],bg[bn]);console.log(flag(r)+' '+tn+'('+tiers[tn]+') on '+bn+': '+r.toFixed(2));});});
console.log('\n=== on-accent on accent bg ===');
console.log(flag(ratio('#F4E6E2','#9B2C33'))+' on-accent on accent: '+ratio('#F4E6E2','#9B2C33').toFixed(2));
