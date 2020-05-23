import{A as a,bg as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-1e164202.js"
import"./isArray-2e06f453.js"
import"./dontPost-d7997a25.js"
import"./numberIsNaN-caf9724d.js"
import"./setTipped-dbd83d5f.js"
import"./all-9d451f65.js"
import"./allthen-e12139d3.js"
import"./lvlTests-ed5bdc68.js"
import"./loadDataTables-6da2efda.js"
import{i as d}from"./arena-a8658367.js"
import"./changeMinMax-30c79c41.js"
import"./assets-2c72b0b6.js"
import"./updateUrl-4e0ff54d.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?d():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-c4223fd1.js.map
