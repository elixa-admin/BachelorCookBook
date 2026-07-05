#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RECIPES_DIR = path.join(__dirname, '..', 'public', 'tub', 'recipes');
const TOP_N = parseInt(process.argv[process.argv.indexOf('--top') + 1] || '200', 10) || 200;
const JSON_MODE = process.argv.includes('--json');

const BATCH_FILES = [
  'recipes-data.js','fullcook-batch.js','fullcook-conversions.js',
  'global-exotic-batch.js','premium-batch.js','sa-additions.js',
  'sa-additions-2.js','batch-new-sa.js','compendium-batch.js',
  'recipes-batch5.js','foundation-batch.js','sa-batch.js',
  'sa-heritage-batch.js','sa-additional-batch.js','wave2-exotic.js',
  'wave2-intl.js','wave2-sa.js',
];

function stripHtml(s){ return (s||'').replace(/<[^>]+>/g,'').trim(); }

function normIngredient(raw){
  let s = stripHtml(raw);
  s = s.replace(/^[\d½¼¾⅓⅔⅛⅜⅝⅞\s\/\.×x]+/,'');
  s = s.replace(/^(kg|g|ml|l|litre|liter|tsp|tbsp|tablespoon|teaspoon|cup|cups|piece|pieces|clove|cloves|sprig|sprigs|leaf|leaves|whole|large|medium|small|handful|pinch|dash|slice|slices|tin|tins|can|cans|pack|packs|bunch|head|heads|thumb|stalk|stalks|knob)\s+/i,'');
  const comma = s.indexOf(','); if(comma>0) s=s.substring(0,comma);
  const paren = s.indexOf('('); if(paren>0) s=s.substring(0,paren);
  const dashM = s.search(/\s[–—]\s/); if(dashM>0) s=s.substring(0,dashM);
  s = s.trim().toLowerCase();
  s = s.replace(/\s+(finely|coarsely|thinly|roughly|freshly|lightly|well|fresh|ripe|dried|frozen|canned|grated|sliced|diced|chopped|minced|crushed|ground|toasted|roasted|halved|quartered|peeled|deveined|deboned|boneless|skinless|trimmed|soaked|drained|rinsed|sifted|melted|softened|whipped|beaten|whisked|room temperature|at room temp)$/i,'');
  return s.trim();
}

function catOf(n){
  n=n.toLowerCase();
  if(/onion|garlic|tomato|potato|carrot|celery|mushroom|capsicum|bell pepper|lemon|lime|orange|zucchini|courgette|aubergine|eggplant|spinach|kale|broccoli|cauliflower|lettuce|cucumber|avocado|coriander|parsley|basil|mint|thyme|rosemary|sage|dill|fennel|ginger|chilli|chili|spring onion|leek|beetroot|pumpkin|butternut|sweet potato|banana|apple|mango|pineapple|papaya|shallot|capers|olive|corn|pea|artichoke|asparagus|bok choy|pak choi|cabbage|fig|grape|pomegranate|dates|apricot|cherry|citrus|herb/.test(n)) return 'produce';
  if(/chicken|beef|pork|lamb|mutton|fish|salmon|tuna|prawn|shrimp|lobster|crayfish|crab|mussel|clam|oyster|squid|calamari|bacon|pancetta|guanciale|lardons|chorizo|sausage|boerewors|biltong|duck|venison|rabbit|oxtail|tripe|anchov|mackerel|sardine|kingklip|snoek|hake|tilapia|mince/.test(n)) return 'protein';
  if(/butter|milk|cream|cheese|yoghurt|yogurt|egg|mozzarella|parmesan|pecorino|feta|cheddar|brie|camembert|ricotta|mascarpone|ghee|creme fraiche|crème fraîche|buttermilk|condensed milk|evaporated milk|sour cream|double cream|whipping cream|ayrshire/.test(n)) return 'dairy';
  if(/oil|vinegar|soy sauce|fish sauce|oyster sauce|worcestershire|tabasco|stock|broth|flour|sugar|honey|maple|molasses|treacle|rice|pasta|noodle|lentil|chickpea|bean|chocolate|cocoa|coconut milk|coconut cream|tomato paste|passata|canned tomato|bread|breadcrumb|cornstarch|cornflour|baking powder|bicarb|yeast|gelatine|miso|tahini|peanut butter|almond|cashew|walnut|pistachio|hazelnut|sesame|soy|hoisin|sambal|harissa|chutney|jam|preserve/.test(n)) return 'pantry';
  if(/salt|pepper|paprika|cumin|coriander seed|cardamom|clove|cinnamon|nutmeg|allspice|star anise|turmeric|saffron|chilli flake|cayenne|garam masala|curry powder|ras el hanout|za.atar|sumac|mustard seed|fennel seed|caraway|bay leaf|oregano|marjoram|tarragon|mixed spice|peri.peri|berbere|dukkah/.test(n)) return 'spice';
  return 'other';
}

function loadBatch(filePath){
  const code = fs.readFileSync(filePath,'utf8');
  const sandbox = {window:{}};
  try{ vm.runInNewContext(code,sandbox,{timeout:15000}); }catch(e){}
  const arrays=[];
  for(const key of Object.keys(sandbox.window)){
    const val=sandbox.window[key];
    if(Array.isArray(val)) arrays.push(...val);
  }
  return arrays;
}

const allRecipes=[], loadErrors=[];
for(const file of BATCH_FILES){
  const fp=path.join(RECIPES_DIR,file);
  if(!fs.existsSync(fp)){ loadErrors.push('MISSING: '+file); continue; }
  try{ const b=loadBatch(fp); allRecipes.push(...b); }
  catch(e){ loadErrors.push('ERROR '+file+': '+e.message); }
}

const seen=new Set(), recipes=[];
for(const r of allRecipes){
  if(r&&r.slug&&!seen.has(r.slug)){ seen.add(r.slug); recipes.push(r); }
}

const ingredientMap={};
let totalLines=0;
for(const recipe of recipes){
  if(!recipe.ing||!Array.isArray(recipe.ing)) continue;
  for(const group of recipe.ing){
    if(!Array.isArray(group)||group.length<2) continue;
    const items=group[1];
    if(!Array.isArray(items)) continue;
    for(const item of items){
      if(!Array.isArray(item)||item.length<2) continue;
      if(item[0]==='static') continue;
      const desc=item[3]||item[2]||'';
      if(!desc||typeof desc!=='string') continue;
      totalLines++;
      const norm=normIngredient(desc);
      if(!norm||norm.length<2) continue;
      if(!ingredientMap[norm]){
        ingredientMap[norm]={name:norm,count:0,rawExamples:[],slugs:new Set(),category:catOf(norm)};
      }
      const e=ingredientMap[norm];
      e.count++;
      e.slugs.add(recipe.slug);
      if(e.rawExamples.length<3) e.rawExamples.push(stripHtml(desc).substring(0,80));
    }
  }
}

const sorted=Object.values(ingredientMap).sort((a,b)=>b.count-a.count||a.name.localeCompare(b.name));
const top=sorted.slice(0,TOP_N);

if(JSON_MODE){
  const out={
    meta:{recipesAnalysed:recipes.length,totalIngredientLines:totalLines,uniqueNormalisedIngredients:sorted.length,loadErrors},
    ingredients:sorted.map(e=>({name:e.name,count:e.count,recipeCount:e.slugs.size,category:e.category,rawExamples:e.rawExamples})),
  };
  console.log(JSON.stringify(out,null,2));
} else {
  console.log('='.repeat(66));
  console.log('  TUB Ingredient Extraction Report');
  console.log('='.repeat(66));
  console.log('Recipes analysed:           '+recipes.length);
  console.log('Total ingredient lines:     '+totalLines);
  console.log('Unique normalised names:    '+sorted.length);
  if(loadErrors.length){ console.log('\nLoad errors:'); loadErrors.forEach(e=>console.log('  '+e)); }
  console.log('\nTop '+TOP_N+' ingredients by frequency:\n');
  console.log('#    Count  Recipes   Category    Name');
  console.log('-'.repeat(66));
  top.forEach((e,i)=>{
    const rank=String(i+1).padStart(4);
    const cnt=String(e.count).padEnd(7);
    const rc=String(e.slugs.size).padEnd(10);
    const cat=e.category.padEnd(12);
    console.log(rank+'  '+cnt+rc+cat+e.name);
  });
  const byCat={};
  for(const e of sorted) byCat[e.category]=(byCat[e.category]||0)+1;
  console.log('\nBreakdown by category:');
  for(const [cat,cnt] of Object.entries(byCat).sort((a,b)=>b[1]-a[1]))
    console.log('  '+cat.padEnd(14)+cnt);
}
