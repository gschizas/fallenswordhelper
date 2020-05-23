import{A as a,be as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-e6a24264.js"
import"./isArray-3522bd29.js"
import"./dontPost-3c4fc141.js"
import"./numberIsNaN-c3be1434.js"
import"./setTipped-3dcc58a1.js"
import"./all-cd59a0c8.js"
import"./allthen-5b2ae140.js"
import"./lvlTests-4cd3827a.js"
import"./loadDataTables-c15b8735.js"
import{i as c}from"./arena-ec36d2fc.js"
import"./changeMinMax-919d8716.js"
import"./assets-10d3888a.js"
import"./updateUrl-ffa346d7.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-612cd18c.js.map
