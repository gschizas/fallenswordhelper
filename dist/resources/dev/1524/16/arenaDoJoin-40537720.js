import{x as a,b0 as s,N as t,s as e,T as o,R as r}from"./calfSystem-d49dbbd3.js"
import"./dontPost-9ae48c7f.js"
import"./numberIsNaN-1742f258.js"
import"./setTipped-d04acae4.js"
import"./currentGuildId-fb556ea3.js"
import"./intValue-2ed328c8.js"
import{g as i,s as n}from"./idb-a6d1a1ba.js"
import"./closest-c1f1e24c.js"
import"./all-042a202c.js"
import"./allthen-d63ed67c.js"
import"./closestTr-92de2689.js"
import"./lvlTests-34e8a3b0.js"
import"./loadDataTables-179f48a6.js"
import{i as c}from"./arena-eb642c62.js"
import"./changeMinMax-ca3a869d.js"
import"./assets-ac0df700.js"
import"./updateUrl-cbaa891e.js"
import"./arena-562288ee.js"
function p(a,s){const t=s||{}
t[a]=r,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(p,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-40537720.js.map
