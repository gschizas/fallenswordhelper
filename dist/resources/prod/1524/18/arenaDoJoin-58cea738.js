import{x as s,aY as a,M as t,s as e,S as o,Q as r}from"./calfSystem-8b6534a5.js"
import"./isArray-3a70d0a8.js"
import"./dontPost-10e2d3b5.js"
import"./numberIsNaN-0a4ef3fd.js"
import"./setTipped-84380d19.js"
import"./currentGuildId-4a8535f4.js"
import"./intValue-bb1f2246.js"
import{g as i,s as n}from"./idb-abce8d8d.js"
import"./closest-92f48152.js"
import"./all-a74f4d72.js"
import"./allthen-fc452f77.js"
import"./closestTr-6d4448c3.js"
import"./lvlTests-84d5bdc1.js"
import"./loadDataTables-388b4b0b.js"
import{i as p}from"./arena-80edef25.js"
import"./changeMinMax-9e86069e.js"
import"./assets-0ee61781.js"
import"./updateUrl-9a36f3fb.js"
function m(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(m,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-58cea738.js.map
