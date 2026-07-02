const fs=require('fs'),D='/Users/brandondienar/.claude/jobs/d2505485/tmp/';
function removeEntry(text,key){
  const re=new RegExp("['\"]"+key+"['\"]\\s*:\\s*\\{");
  const m=text.match(re); if(!m)return {text,ok:false};
  let depth=0,i=m.index+m[0].length-1,end=-1;
  for(;i<text.length;i++){const c=text[i];if(c==='{')depth++;else if(c==='}'){depth--;if(depth===0){end=i;break;}}}
  let s=m.index; while(s>0&&text[s-1]!=='\n')s--;
  let e=end+1; if(text[e]===',')e++; if(text[e]==='\n')e++;
  return {text:text.slice(0,s)+text.slice(e),ok:true};
}
const targets={'skill-tiers.js':['pozie','moroho-sotho','moroko-sotho'],'method-timings.js':['okraing-range-fried-chicken','moroko-sotho','moroho-sotho']};
Object.entries(targets).forEach(([f,keys])=>{
  let t=fs.readFileSync(D+'recipes/'+f,'utf8');let removed=[];
  keys.forEach(k=>{const r=removeEntry(t,k);if(r.ok){t=r.text;removed.push(k);}});
  fs.writeFileSync(D+'recipes/'+f,t);
  global.window={};eval(t);
  const obj=f==='skill-tiers.js'?window.SKILL_TIERS:window.METHOD_TIMINGS;
  const still=keys.filter(k=>k in obj);
  console.log(f+': removed ['+removed.join(',')+'] | slugs now '+Object.keys(obj).length+' | bogus remaining: '+(still.join(',')||'NONE ✓'));
});
