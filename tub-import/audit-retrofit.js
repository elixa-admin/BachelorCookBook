/* Audit retrofit gaps: for each LIVE full-cook recipe, which of the 9 standard
   fields are missing? Output grouped so subagents can be batched by need. */
const fs=require('fs'),{JSDOM,VirtualConsole}=require('jsdom');
const FILE='/Users/brandondienar/.claude/jobs/d2505485/tmp/tub-app.html';
const FIELDS=['prep','cook','mistakes','sides','storage','chef_upgrade','health_forward','diets','diet_notes'];
const dom=new JSDOM(fs.readFileSync(FILE,'utf8'),{runScripts:'dangerously',resources:'usable',url:'file://'+FILE,virtualConsole:new VirtualConsole(),
  beforeParse(w){Object.defineProperty(w,'localStorage',{value:{_d:{},getItem(k){return this._d[k]||null;},setItem(k,v){this._d[k]=''+v;},removeItem(k){},clear(){}},configurable:true});w.IntersectionObserver=class{observe(){}unobserve(){}disconnect(){}};w.ResizeObserver=class{observe(){}disconnect(){}};w.matchMedia=q=>({matches:false,media:q,addEventListener(){},removeEventListener(){}});w.scrollTo=()=>{};w.requestAnimationFrame=cb=>0;w.HTMLElement.prototype.scrollIntoView=()=>{};}});
setTimeout(()=>{
  const w=dom.window;
  // full-cook recipes = R items whose FULL[slug] has ing (same ref). Access FULL via openRecipe probe: a recipe is full-cook if openRecipe yields 'guided cook'.
  // But we need field presence — monkeypatch to read. Instead, scrape R via the grid (titles/slugs) then open each and read rendered sections.
  const d=w.document;
  const all=[];
  ['solo','date','host','accomp'].forEach(function(occ){var b=d.querySelector('.occ-btn[data-occ="'+occ+'"]');if(b)b.click();d.querySelectorAll('#grid .card').forEach(function(c){var m=(c.getAttribute('onclick')||'').match(/openRecipe\('([^']+)'\)/);var t=c.querySelector('h3');if(m&&!all.find(x=>x.slug===m[1]))all.push({slug:m[1],title:t?t.textContent.trim():m[1]});});});
  // For each, open detail, detect full-cook (guided cook) and which sections render.
  const SECTION_MARKERS={prep:'Prep',cook:'Cook',mistakes:'Common mistakes',sides:'Serve with',storage:'Storage',chef_upgrade:'Chef',health_forward:'Health-forward',diets:'Dietary fit',diet_notes:'Dietary adaptations'};
  const gaps=[]; let fullCount=0;
  all.forEach(function(it){
    w.openRecipe(it.slug);
    const html=d.getElementById('detail').innerHTML||'';
    const isFull=html.indexOf('guided cook')>-1;
    if(!isFull)return;
    fullCount++;
    const miss=[];
    FIELDS.forEach(function(f){
      // prep/cook appear in statcard as <div class="l">Prep</div> / Cook
      if(f==='prep'||f==='cook'){ if(html.indexOf('>'+SECTION_MARKERS[f]+'</div>')<0) miss.push(f); }
      else { if(html.indexOf(SECTION_MARKERS[f])<0) miss.push(f); }
    });
    if(miss.length) gaps.push({slug:it.slug,title:it.title,miss:miss});
  });
  // group by missing-field signature
  const bySig={};
  gaps.forEach(function(g){const k=g.miss.join(',');(bySig[k]=bySig[k]||[]).push(g);});
  console.log('FULL-COOK RECIPES: '+fullCount);
  console.log('NEED RETROFIT (>=1 missing field): '+gaps.length);
  console.log('\n=== COMPLETE ALREADY (no gaps): '+(fullCount-gaps.length)+' ===');
  // how many fields missing total
  const fieldMiss={};FIELDS.forEach(f=>fieldMiss[f]=0);
  gaps.forEach(g=>g.miss.forEach(f=>fieldMiss[f]++));
  console.log('\n=== FIELD GAP COUNTS (recipes missing each) ===');
  FIELDS.forEach(f=>console.log('  '+f+': '+fieldMiss[f]));
  console.log('\n=== GROUPS BY MISSING SIGNATURE ===');
  Object.keys(bySig).sort().forEach(function(k){console.log('\n['+bySig[k].length+' recipes] missing: '+k);bySig[k].forEach(g=>console.log('   - '+g.slug+'  ('+g.title+')'));});
  // dump a machine-readable manifest for batching
  fs.writeFileSync('retrofit-manifest.json',JSON.stringify(gaps,null,2));
  console.log('\nWrote retrofit-manifest.json ('+gaps.length+' recipes)');
  process.exit(0);
},3000);
