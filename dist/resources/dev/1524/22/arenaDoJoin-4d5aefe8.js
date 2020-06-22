import{y as a,a$ as s,C as t,t as o,V as r,T as i}from"./calfSystem-4cc738f8.js"
import"./numberIsNaN-1f5d9185.js"
import"./setTipped-cae99fc1.js"
import"./currentGuildId-53b525a7.js"
import"./intValue-209ea1ab.js"
import{g as e,s as n}from"./idb-670c0cca.js"
import"./formToUrl-84dfad91.js"
import"./interceptSubmit-c1f9070f.js"
import"./closest-b21303d7.js"
import"./closestTr-13a40903.js"
import"./lvlTests-411fa632.js"
import"./all-4929a748.js"
import"./loadDataTables-ffa79b01.js"
import"./allthen-58353ff8.js"
import{i as c}from"./arena-df446a59.js"
import"./changeMinMax-49a3ab9d.js"
import"./assets-3613be14.js"
import"./arena-ccc43962.js"
function m(a,s){const t=s||{}
t[a]=i,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(m,a))}else r("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-4d5aefe8.js.map
