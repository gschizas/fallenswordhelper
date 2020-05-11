import{A as a,bg as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-99da704d.js"
import"./isArray-e5fc8b65.js"
import"./dontPost-af5ba7a2.js"
import"./numberIsNaN-9b6eee03.js"
import"./setTipped-4c5fce4d.js"
import"./all-cf5ebb4b.js"
import"./allthen-d5b32056.js"
import"./lvlTests-73991118.js"
import"./loadDataTables-65d61b54.js"
import{i as p}from"./arena-60c541a2.js"
import"./changeMinMax-ebcdced5.js"
import"./assets-90437058.js"
import"./updateUrl-68b3753f.js"
function c(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(c,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-911424fc.js.map
