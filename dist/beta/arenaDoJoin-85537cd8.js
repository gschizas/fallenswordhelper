import{A as a,bg as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-70c0e373.js"
import"./isArray-4a5a2451.js"
import"./dontPost-d8e94133.js"
import"./numberIsNaN-a9336482.js"
import"./setTipped-c21cfa84.js"
import"./all-0a0c0fc9.js"
import"./allthen-4e324603.js"
import"./lvlTests-2455dcd4.js"
import"./loadDataTables-514a87fb.js"
import{i as c}from"./arena-d67c51d9.js"
import"./changeMinMax-cc5be79c.js"
import"./assets-444d1aec.js"
import"./updateUrl-457b2445.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-85537cd8.js.map
