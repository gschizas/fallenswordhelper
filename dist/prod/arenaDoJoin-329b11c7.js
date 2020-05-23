import{A as a,be as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-4b4fbec4.js"
import"./isArray-b95703a0.js"
import"./dontPost-9b860b89.js"
import"./numberIsNaN-3b37a036.js"
import"./setTipped-7f7a9c06.js"
import"./all-32d11926.js"
import"./allthen-e16efa37.js"
import"./lvlTests-2a610713.js"
import"./loadDataTables-66d6febe.js"
import{i as f}from"./arena-b85fc841.js"
import"./changeMinMax-9fe44494.js"
import"./assets-4f6559fb.js"
import"./updateUrl-4bfd5c5c.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-329b11c7.js.map
