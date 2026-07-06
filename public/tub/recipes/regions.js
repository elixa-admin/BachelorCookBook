/* TUB — global cuisine regions. Standard culinary macro-region taxonomy
   (refined so each dish maps to ONE primary region). regionOf(cui) resolves a
   recipe's cuisine string to its region via keyword matching in priority order. */
window.REGIONS=[
  {id:'south-asian',label:'South Asian',short:'S.Asian',emoji:'',blurb:'India, Pakistan, Sri Lanka — spice, ghee, rice and lentils.'},
  {id:'east-asian',label:'East & Southeast Asian',short:'E/SE Asian',emoji:'',blurb:'China, Japan, Korea, Thailand, Vietnam, Indonesia, Malaysia.'},
  {id:'african',label:'African',short:'African',emoji:'',blurb:'Sub-Saharan & South Africa, Ethiopia, West Africa.'},
  {id:'americas',label:'The Americas',short:'Americas',emoji:'',blurb:'USA, Mexico, Peru, Brazil, the Caribbean — smoke, maize, fire.'},
  {id:'middle-eastern',label:'Middle Eastern',short:'Mid-East',emoji:'',blurb:'Persia, the Gulf, Egypt — saffron, sumac, charcoal.'},
  {id:'mediterranean',label:'Mediterranean',short:'Med',emoji:'',blurb:'Italy, Spain, Greece, the Levant, Morocco — olive oil, sun, herbs.'},
  {id:'european',label:'European',short:'European',emoji:'',blurb:'France, Britain, Belgium — the butter, cream and wine belt.'}
];
window.REGION_KEYS={
  'south-asian':['indian','india','kashmiri','delhi','punjabi','bengali','parsi','tamil','sri lank','subcontinental','urdu','hindi','rogan'],
  'african':['south african','west african','ethiopian','cape malay','afrikaans','nigerian','senegalese','xhosa','africa','african','jollof','doro','harira','wat'],
  'east-asian':['chinese','china','japanese','japan','korean','korea','thai','thailand','vietnamese','vietnam','indonesian','indonesia','malay','malaysia','filipino','sichuan','cantonese','lanna','isan','minang','teochew','khao','massaman','som tum','rendang','satay','bulgogi','bibim','tteok','katsu','tonkotsu','ramen','teriyaki','dan dan','mapo','char siu','peking'],
  'americas':['american','usa','u.s.','mexican','mexico','peruvian','peru','brazilian','brazil','caribbean','cuban','jamaican','argentine','argentina','latin','causa','mole','tacos','carnitas','pastor','smash','quesadilla'],
  'middle-eastern':['persian','iran','gulf','egyptian','arab','israeli','middle eastern','middle-eastern','levantine','lebanese','palestinian','palestin','syrian','jordanian','jordan','shakshuka','tagine'],
  'mediterranean':['italian','italy','spanish','spain','greek','greece','turkish','turkey','moroccan','morocco','provencal','provençal','mediterranean','roman','lombardy','lazio','sicil','valencia','andalus','niçoise','parmesan','risotto','carbonara','cacio','paella','bouillabaisse'],
  'european':['french','france','british','britain','belgian','belgium','german','germany','nordic','swedish','austrian','bistro','steakhouse','european','bourguignon','coq','wellington','mignon']
};
window.REGION_ORDER=['south-asian','african','east-asian','americas','middle-eastern','mediterranean','european'];
window.regionOf=function(cui){
  var s=(''+(cui||'')).toLowerCase();
  for(var i=0;i<window.REGION_ORDER.length;i++){
    var ks=window.REGION_KEYS[window.REGION_ORDER[i]];
    for(var j=0;j<ks.length;j++){if(s.indexOf(ks[j])>-1)return window.REGION_ORDER[i];}
  }
  return 'mediterranean';
};
window.regionLabel=function(id){var r=(window.REGIONS||[]).find(function(x){return x.id===id;});return r?(r.emoji+' '+r.label):'';};
