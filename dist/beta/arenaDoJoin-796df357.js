import{A as a,bg as e,R as s,ah as t,v as n,a0 as o,aw as r,aj as i}from"./calfSystem-c91e004c.js"
import"./isArray-e79fe430.js"
import"./dontPost-2d911553.js"
import"./numberIsNaN-e812a421.js"
import"./all-143e11c3.js"
import"./allthen-38d09eed.js"
import"./lvlTests-28ffdeaa.js"
import"./loadDataTables-1e1a3f50.js"
import{i as f}from"./arena-cde5f9e6.js"
import"./changeMinMax-8030f196.js"
import"./assets-16c3fce3.js"
import"./updateUrl-efe16448.js"
function l(a,e){const s=e||{}
s[a]=r,i("fsh_arenaFull",s)}export default function(){a("arenaTypeTabs")?f():function(){const a=e()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=s('#pCC input[name="pvp_id"]').value
t("fsh_arenaFull").then(n(l,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-796df357.js.map
