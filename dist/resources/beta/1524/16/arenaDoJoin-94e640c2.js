import{x as s,a_ as a,M as t,s as o,S as r,Q as e}from"./calfSystem-9554b525.js"
import"./isArray-7b017653.js"
import"./dontPost-03651e75.js"
import"./numberIsNaN-f35fe828.js"
import"./setTipped-de144ccc.js"
import"./currentGuildId-7c7a6b86.js"
import"./intValue-bb872327.js"
import{g as i,s as n}from"./idb-e27acc21.js"
import"./closest-687f4f6c.js"
import"./all-e75535ec.js"
import"./allthen-04728b30.js"
import"./closestTr-a2db1fa0.js"
import"./lvlTests-848165a9.js"
import"./loadDataTables-993c57a0.js"
import{i as c}from"./arena-2829c0c7.js"
import"./changeMinMax-41147b63.js"
import"./assets-b7fd89f1.js"
import"./updateUrl-44a8065a.js"
function p(s,a){const t=a||{}
t[s]=e,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?c():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(o(p,s))}else r("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-94e640c2.js.map
