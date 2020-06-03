import{x as a,b0 as s,N as t,s as o,T as e,R as r}from"./calfSystem-5545a3e6.js"
import"./dontPost-14e1d4b8.js"
import"./numberIsNaN-0d2994c6.js"
import"./setTipped-b17b5374.js"
import"./currentGuildId-2b105bba.js"
import"./intValue-02f9213d.js"
import{g as i,s as n}from"./idb-ab1a88c6.js"
import"./closest-b938ab98.js"
import"./all-d45d8a77.js"
import"./allthen-d56c46ae.js"
import"./closestTr-4d73d7e9.js"
import"./lvlTests-4716a9a2.js"
import"./loadDataTables-6b7a4c95.js"
import{i as p}from"./arena-80d4f783.js"
import"./changeMinMax-c13b1b5a.js"
import"./assets-b2433606.js"
import"./updateUrl-f2860fab.js"
import"./arena-f3eca74c.js"
function m(a,s){const t=s||{}
t[a]=r,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(o(m,a))}else e("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-fcd5f2c5.js.map
