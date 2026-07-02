/* Replace non-drink pair entries with deliberate, accurate drink pairings.
   Each dish already retains one good drink; we swap the food/side entry for a
   distinct drink (aperitif/with-dish). Asserts every replacement lands exactly once. */
const fs=require('fs');
const P='recipes/premium-batch.js', G='recipes/global-exotic-batch.js';
const map=[
 [P,'["With the curry","Naan bread","India · leavened flatbread","Soft bread soaks up the rich, spicy sauce."]','["With the curry","Gewürztraminer","Alsace, France · aromatic off-dry white","Headily perfumed with rose and lychee — it echoes the saffron and cardamom, and a touch of sweetness calms the heat."]'],
 [P,'["With the lamb","Mashed potatoes","Mediterranean · creamy","Classic accompaniment that soaks up the rich wine sauce."]','["With the lamb","Malbec","Mendoza, Argentina · full-bodied red","Plum, dark spice and supple tannins — a classic match for slow-braised lamb and its rich wine sauce."]'],
 [P,'["With the soup","Green salad","France · light vinaigrette","Crisp salad cuts the richness of the cheesy soup."]','["With the soup","Beaujolais","Burgundy, France · light red (Gamay)","Bright, low-tannin red fruit — the traditional glass to lift a rich, cheesy onion broth."]'],
 [P,'["Side","Watercress salad","France · peppery greens","Sharp, peppery leaves cut through the richness of butter and beef."]','["Aperitif","Negroni","Italy · gin, Campari, sweet vermouth","Bitter and bright — wakes the palate and earns the steak its theatre."]'],
 [P,'["Starter","Tapenade","Provence · olive spread","Salty, savoury olives whet the appetite for the rich broth."]','["Beforehand","Cassis blanc","Cassis, France · crisp dry white","Saline and bright — the local Provençal white and the traditional partner to a Marseille bouillabaisse."]'],
 [P,'["Side","Roasted root vegetables","French · seasonal","Earthy, sweet vegetables provide contrast to the rich duck and acidic sauce."]','["Aperitif","Champagne","Champagne, France · sparkling","Crisp acidity and fine bubbles cut the rich duck and refresh between bites of sweet orange."]'],
 [P,'["With the Wellington","Red wine sauce","French · savoury","Rich, velvety sauce complements the beef and pastry."]','["With the Wellington","Pinot Noir","Burgundy, France · medium-bodied red","Bright cherry and silky tannins complement the beef and pastry without crowding the mushroom duxelles."]'],
 [G,'["With the curry","Naan bread","India · leavened flatbread","Soft bread soaks up the creamy, spiced sauce."]','["With the curry","Kingfisher lager","India · crisp pilsner","Ice-cold and clean — the classic curry beer, refreshing through the creamy tomato sauce."]'],
 [G,'["With bibimbap","Kimchi","Korea · fermented vegetables","Tangy, spicy kimchi adds fermentation and crunch."]','["With bibimbap","Makgeolli","Korea · sparkling rice wine","Lightly sweet, milky and gently fizzy — the traditional low-alcohol partner to a Korean spread."]'],
 [G,'["With mac & cheese","Green salad","United States · light vinaigrette","Crisp salad cuts the richness of the cheesy pasta."]','["With mac & cheese","Oaked Chardonnay","California, USA · full white","Creamy oak mirrors the cheese sauce while a citric edge keeps each mouthful fresh."]'],
 [G,'["With satay","Cucumber and onion","Indonesia · fresh vegetables","Cool, crisp vegetables balance the rich, spicy peanut sauce."]','["With satay","Cold lager (Tiger)","Southeast Asia · crisp pilsner","Ice-cold and clean — rinses the palate through the smoky, charred peanut sauce."]'],
 [G,'["With the noodles","Pickled vegetables","Sichuan · preserved greens","Tangy, crunchy pickles cut through the rich, spicy sauce."]','["With the noodles","Off-dry Riesling","Germany · aromatic white","A whisper of sweetness and modest alcohol soothe the chilli-and-Sichuan-pepper fire without fuelling it."]'],
 [G,'["With the soup","Jasmine rice","Thailand · fragrant long-grain","Neutral rice balances the intense hot-sour flavours."]','["With the soup","Cold lager (Singha)","Thailand · crisp pilsner","Ice-cold and clean — the Thai answer to a hot-sour broth, refreshing with every spoonful."]'],
 [G,'["Side","Summer rolls","Vietnam · gỏi cuốn","Fresh rice paper rolls provide light contrast to the rich sandwich."]','["Aperitif","Bia Saigon (333)","Vietnam · crisp lager","Cold and clean — cuts through the rich pâté, mayo and charred pork."]'],
 [G,'["With tteokbokki","Tempura","Japan · fried vegetables","Crispy tempura provides textural contrast to the chewy rice cakes."]','["With tteokbokki","Korean pale lager (Cass / Hite)","Korea · crisp lager","Cold and carbonated — the everyday Korean pairing that tames sticky, spicy rice cakes."]'],
 [G,'["Drink","Sundubu-jjigae","Korea · soft tofu stew","Spicy tofu stew complements the rice cakes\' chewy texture."]','["Drink","Plum wine (maesil-ju)","Korea · sweet fruit wine","Honeyed and tart — a cooling, sweet counter to the fiery rice cakes."]'],
 [G,'["With char siu","Steamed bao buns","China · fluffy white buns","Soft, pillowy buns contrast with the glazed pork."]','["With char siu","Shaoxing rice wine","Shaoxing, China · aged rice wine","Nutty, savoury and served warm — the traditional Chinese rice wine, echoing the char siu marinade."]']
];
// group by file
const byFile={};
map.forEach(r=>{ (byFile[r[0]]=byFile[r[0]]||[]).push(r); });
let allOk=true;
Object.keys(byFile).forEach(f=>{
  let s=fs.readFileSync(f,'utf8');
  byFile[f].forEach(r=>{
    const [_,old,nw]=r;
    const c=s.split(old).length-1;
    if(c!==1){console.log('✗ '+f+' expected 1 match, found '+c+' for: '+old.slice(0,60));allOk=false;}
    else s=s.replace(old,nw);
  });
  if(allOk)fs.writeFileSync(f,s);
});
console.log(allOk?('ALL '+map.length+' replacements applied & written.'):'ABORTED — see errors above.');
