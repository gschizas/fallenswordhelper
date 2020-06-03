import{x as s,a_ as a,M as t,s as e,S as o,Q as r}from"./calfSystem-4197cc22.js"
import"./isArray-32682e84.js"
import"./dontPost-c8e8377e.js"
import"./numberIsNaN-1db4e673.js"
import"./setTipped-c0d7f504.js"
import"./currentGuildId-2aaee988.js"
import"./intValue-202eff7d.js"
import{g as i,s as n}from"./idb-f3252f63.js"
import"./closest-5218baf6.js"
import"./all-5f4a0555.js"
import"./allthen-634cf4ca.js"
import"./closestTr-3be0023c.js"
import"./lvlTests-ef15725a.js"
import"./loadDataTables-cad389d5.js"
import{i as p}from"./arena-9f238041.js"
import"./changeMinMax-75b72872.js"
import"./assets-fe42a5fe.js"
import"./updateUrl-3c221329.js"
function f(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(f,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-d11b1bb6.js.map
