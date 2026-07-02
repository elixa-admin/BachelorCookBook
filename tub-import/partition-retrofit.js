/* Partition the 83 full-cook recipes into N batches for parallel authoring.
   Joins context (retrofit-context.json) with the missing-fields manifest
   (retrofit-manifest.json) and writes _batch-K.json per batch. */
const fs=require('fs');
const ctx=JSON.parse(fs.readFileSync('retrofit-context.json','utf8'));
const man=JSON.parse(fs.readFileSync('retrofit-manifest.json','utf8'));
const manBySlug={};man.forEach(g=>manBySlug[g.slug]=g.miss);
const joined=ctx.map(c=>({slug:c.slug,title:c.title,blurb:c.blurb,cui:c.cui,time:c.time,method:c.method,ings:c.ings,miss:manBySlug[c.slug]||['prep','cook','mistakes','sides','storage','chef_upgrade','health_forward','diets','diet_notes']}));
const N=9;
const size=Math.ceil(joined.length/N);
let k=1;
for(let i=0;i<joined.length;i+=size){
  const batch=joined.slice(i,i+size);
  fs.writeFileSync('recipes/retrofit/_batch-'+k+'.json',JSON.stringify(batch,null,1));
  console.log('batch '+k+': '+batch.length+' recipes ('+batch[0].slug+' … '+batch[batch.length-1].slug+')');
  k++;
}
console.log('Total recipes partitioned: '+joined.length);
