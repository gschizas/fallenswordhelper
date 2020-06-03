import{x as s,aY as a,M as t,s as o,S as r,Q as e}from"./calfSystem-6fc0cc1b.js"
import"./isArray-5986f48a.js"
import"./dontPost-7996c1bc.js"
import"./numberIsNaN-4ae9af58.js"
import"./setTipped-1f5829a1.js"
import"./currentGuildId-33ea4168.js"
import"./intValue-3f75a919.js"
import{g as i,s as n}from"./idb-92d6a2b5.js"
import"./closest-958712aa.js"
import"./all-31f0cef5.js"
import"./allthen-14038593.js"
import"./closestTr-7bb79481.js"
import"./lvlTests-bc5254a3.js"
import"./loadDataTables-2ed3a59d.js"
import{i as p}from"./arena-27737e44.js"
import"./changeMinMax-949d021e.js"
import"./assets-5177b563.js"
import"./updateUrl-5273596c.js"
function m(s,a){const t=a||{}
t[s]=e,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(o(m,s))}else r("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-5d1c4021.js.map
