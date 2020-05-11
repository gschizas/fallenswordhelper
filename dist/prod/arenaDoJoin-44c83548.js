import{A as a,be as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-72fdbe97.js"
import"./isArray-4303dc86.js"
import"./dontPost-ccc4e305.js"
import"./numberIsNaN-7d89f7bf.js"
import"./setTipped-dec59506.js"
import"./all-2c2dffdd.js"
import"./allthen-59a5f241.js"
import"./lvlTests-8d8b21ec.js"
import"./loadDataTables-4b1480e6.js"
import{i as f}from"./arena-3b6db177.js"
import"./changeMinMax-2a7730df.js"
import"./assets-45a33fc1.js"
import"./updateUrl-3f46424e.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-44c83548.js.map
