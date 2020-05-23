import{A as a,be as s,R as e,ah as t,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-4f7c0235.js"
import"./isArray-3ee7803f.js"
import"./dontPost-bb88e0ea.js"
import"./numberIsNaN-c62a2787.js"
import"./setTipped-c9246171.js"
import"./all-b95367c1.js"
import"./allthen-e8ef0afa.js"
import"./lvlTests-18ea534b.js"
import"./loadDataTables-61042690.js"
import{i as p}from"./arena-64491e1c.js"
import"./changeMinMax-5cdf8cdc.js"
import"./assets-3bbd1f11.js"
import"./updateUrl-d4e01d27.js"
function c(a,s){const e=s||{}
e[a]=i,r("fsh_arenaFull",e)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=e('#pCC input[name="pvp_id"]').value
t("fsh_arenaFull").then(o(c,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-57f50352.js.map
