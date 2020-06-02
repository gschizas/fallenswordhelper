import{x as s,aY as a,M as t,s as e,S as o,Q as r}from"./calfSystem-be09bdff.js"
import"./isArray-283d553a.js"
import"./dontPost-c1d489a0.js"
import"./numberIsNaN-47b99611.js"
import"./setTipped-014680cd.js"
import"./currentGuildId-a5ce9ac2.js"
import"./intValue-b1f59eab.js"
import{g as i,s as n}from"./idb-a63ec135.js"
import"./closest-81c3e392.js"
import"./all-e1939fb2.js"
import"./allthen-47fe90e5.js"
import"./closestTr-973c6982.js"
import"./lvlTests-90ef33ff.js"
import"./loadDataTables-e799ca6a.js"
import{i as p}from"./arena-b82d1aef.js"
import"./changeMinMax-8257012f.js"
import"./assets-70e16598.js"
import"./updateUrl-9030af0e.js"
function m(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(m,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-22d5983a.js.map
