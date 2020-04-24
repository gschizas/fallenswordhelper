import{A as a,bg as s,R as t,ah as n,v as o,a0 as e,aw as r,aj as i}from"./calfSystem-07c25a1c.js"
import"./isArray-9e480d80.js"
import"./dontPost-cc24ebb5.js"
import"./numberIsNaN-77d2bff3.js"
import"./all-bf097f49.js"
import"./allthen-b942817a.js"
import"./lvlTests-9a41f863.js"
import"./loadDataTables-10290546.js"
import{i as f}from"./arena-50fb0b67.js"
import"./changeMinMax-bfb859e8.js"
import"./assets-078845b6.js"
import"./updateUrl-b4e629af.js"
function l(a,s){const t=s||{}
t[a]=r,i("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(o(l,a))}else e("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-d575d900.js.map
