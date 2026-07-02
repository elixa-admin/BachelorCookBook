/* APPLIANCE / COOKING-METHOD KNOWLEDGE LAYER
   Lets a cook pick the appliance in the guided Cook flow (stovetop / oven /
   air-fryer / pressure cooker / grill-braai), gated per dish — we never offer a
   method that doesn't make sense for that dish (no fries in a pressure cooker).
   - APPLIANCE_METHODS : canonical appliance defs (label/icon/default note)
   - DISH_APPLIANCES    : explicit per-slug allowlists w/ adapted time + note
   - deriveAppliances(r): returns [{id,time?,note?},...] — explicit if present,
                          else a robust heuristic from the recipe's method/title
   SA-localized copy: °C / min / tsp / braai. No cups / oz / °F. */
(function(){
window.APPLIANCE_METHODS={
  stovetop:{label:'Stovetop',icon:'',note:'A pan on the flame — the classic. Most control, eyes on it the whole way.'},
  oven:{label:'Oven',icon:'',note:'Even, hands-off heat. Set the temp and let it do the work.'},
  airfryer:{label:'Air-fryer',icon:'',note:'Convection on fast-forward — crisp, quicker, less oil.'},
  pressure:{label:'Pressure cooker',icon:'',note:'Tough cuts and long braises in a fraction of the time.'},
  grill:{label:'Grill / braai',icon:'',note:'Live fire — smoke and char, the South African way.'}
};
var ORDER=['stovetop','oven','airfryer','pressure','grill'];
function a(id,opt){opt=opt||{};return {id:id,time:opt.time||null,note:opt.note||null};}
/* Explicit gating for high-traffic dishes where the right answer matters. */
window.DISH_APPLIANCES={
  /* — steaks, chops & pan proteins — */
  'steak':[a('stovetop',{note:'Ripping-hot pan — crust in 3 min a side, then baste in foaming butter.'}),a('grill',{note:'Over hot coals, lid off — 3–4 min a side, rest 5 min.'})],
  'salmon':[a('stovetop',{note:'Skin-down in a hot pan — crisp the skin, barely cook the top.'}),a('oven',{time:'12 min at 200 °C',note:'Skin-up on a tray — glassy skin, blushing centre.'}),a('airfryer',{time:'10 min at 200 °C',note:'Skin-up; crisp without splatter.'})],
  'braai-lamb-chops-chimichurri':[a('grill',{note:'Over medium coals — 3–4 min a side, rest loosely tented.'}),a('stovetop',{note:'Ridged grill pan, smoking hot — 3 min a side.'})],
  /* — chicken — */
  'mozambican-peri-peri-chicken':[a('grill',{note:'The classic — over coals, charred and lacquered, 25–30 min.'}),a('oven',{time:'40 min at 200 °C',note:'Even roast, then flash under the grill to char the edges.'}),a('airfryer',{time:'22 min at 200 °C',note:'Flip at 12 min — the skin goes glassy-crisp.'})],
  'roast-chicken':[a('oven',{note:'The classic — 220 °C down to 180 °C, ~20 min per 500 g + 20 min.'}),a('airfryer',{time:'~45 min at 180 °C',note:'A small bird fits whole; flip once; juices run clear.'})],
  'butter-chicken':[a('stovetop',{note:'Simmer the sauce gentle — 20 min, never let it boil hard.'}),a('pressure',{time:'10 min high',note:'Chicken + sauce together; quick-release, finish with cream.'})],
  /* — wors & braai — */
  'boerewors':[a('grill',{note:'On the braai — medium coals, 8–10 min, coiled, turn often.'}),a('stovetop',{note:'Dry pan, medium-high — 8 min, brown all over, no oil needed.'})],
  'shisa-nyama':[a('grill',{note:'Coals medium-hot — meats in stages, char at the edges.'}),a('oven',{time:'30 min at 200 °C',note:'Tray-roast the marinated meats; finish under the grill.'})],
  'sosaties':[a('grill',{note:'Skewers over coals — 8–10 min, turn, baste with the marinade.'}),a('oven',{time:'18 min at 200 °C',note:'Baking tray, turn once, baste halfway.'})],
  /* — curries & braises (pressure friendly) — */
  'beef-rendang':[a('stovetop',{note:'The real way — slow braise-reduction, 2½–3 hr, stir often.'}),a('pressure',{time:'45 min high',note:'Cuts the braise; then open the lid and reduce 20 min to toast the paste.'})],
  'durban-mutton-curry':[a('stovetop',{note:'Low simmer — 90 min till the meat surrenders.'}),a('pressure',{time:'30 min high',note:'Tenderises the mutton; natural-release, then thicken 5 min open.'})],
  'beef-bourguignon':[a('oven',{note:'The classic — 160 °C, lidded, 2½–3 hr till yielding.'}),a('stovetop',{note:'Heavy pot, barest simmer on the back burner, ~3 hr.'}),a('pressure',{time:'40 min high',note:'Tenderises fast; finish the sauce open to glaze.'})],
  'breyani':[a('stovetop',{note:'Layered and steamed, lidded, low heat — the dum.'}),a('oven',{time:'45 min at 160 °C',note:'Lidded pot in the oven — even steam, less scorch risk.'})],
  'potjiekos':[a('stovetop',{note:'A potjie over coals or a low gas ring — layered, never stirred.'}),a('oven',{time:'90 min at 160 °C',note:'Lidded Dutch oven — same layered logic, even heat.'})],
  'lamb-kleftiko':[a('oven',{note:'Sealed parcel, 150 °C, 3 hr — falls off the bone.'}),a('pressure',{time:'50 min high',note:'Tenderises first; then open and brown 10 min uncovered.'})],
  /* — starches & sides — */
  'fries':[a('airfryer',{note:'Toss in 1 tsp oil, shake at 10 min — the low-oil way.'}),a('oven',{note:'Single layer, 220 °C, flip once.'}),a('stovetop',{note:'Classic double-fry — 130 °C then 180 °C.'})],
  /* — bakes — */
  'focaccia':[a('oven',{note:'Hot oven, 220 °C — 20 min, dimpled and olive-oiled.'})],
  'potbrood':[a('oven',{note:'Dutch oven, lidded — 220 °C then 200 °C, ~40 min.'}),a('stovetop',{note:'Over coals in a potjie — the campfire way, ~45 min.'})]
};
function uniq(arr){var s={},o=[];arr.forEach(function(x){if(x!=null&&!s[x]){s[x]=1;o.push(x);}});return o;}
function has(arr,id){for(var i=0;i<arr.length;i++)if(arr[i].id===id)return true;return false;}
function orderBy(arr){return ORDER.filter(function(id){return has(arr,id);}).map(function(id){for(var i=0;i<arr.length;i++)if(arr[i].id===id)return arr[i];return {id:id};});}
window.deriveAppliances=function(r){
  if(!r)return [];
  if(window.DISH_APPLIANCES&&DISH_APPLIANCES[r.slug])return DISH_APPLIANCES[r.slug].slice();
  var method=(r.method||'').toLowerCase(),t=(r.t||'').toLowerCase(),blurb=(r.blurb||'').toLowerCase();
  var hay=method+' '+t+' '+blurb;
  var base=[];
  if(/\boven\b|bake|roast/.test(method))base.push('oven');
  if(/grill|braai|griddle/.test(method))base.push('grill');
  if(/stovetop|\bpan\b|wok|skillet|deep-?fry|simmer|braise|stew|saut[eé]|stir-?fry|confit|sear|steam|poach|fry\b/.test(method))base.push('stovetop');
  if(!base.length)base.push('stovetop');
  base=uniq(base);
  var out=base.map(function(id){return {id:id};});
  var isFry=/deep-?fry|\bfries\b|crispy|chips|\bfried\b|fritter/.test(hay);
  var isBraise=/braise|stew|curry|\bslow\b|rendang|breyani|potjie|bredie|osso|bourguignon|rag[uù]|casserol|tagine/.test(hay);
  var isRoast=/roast|whole chicken|leg of|shoulder|pork belly|wellington|joint\b/.test(hay);
  var isPan=/sear|pan-?fry|\bsteak\b|salmon|\bchop\b|burger|patty|wors/.test(hay);
  var isEggEmul=/carbonara|cacio|emulsion|scrambl|omelette|crepe|pancake|custard|poach|hollandaise/.test(hay);
  var protein=/chicken|wing|drumstick|nugget|thigh|potato|\bchip\b/.test(hay);
  if((isRoast||isPan||isFry||protein)&&!has(out,'airfryer')&&!isEggEmul)out.push({id:'airfryer'});
  if(isBraise&&!isEggEmul&&!isFry&&!has(out,'pressure'))out.push({id:'pressure'});
  return orderBy(out);
};
})();
