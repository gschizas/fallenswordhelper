import{y as s,aX as e,C as t,t as r,U as a,S as i}from"./calfSystem-d04e4be4.js"
import"./isArray-7fc52818.js"
import"./numberIsNaN-eb16384c.js"
import"./setTipped-e830c5fe.js"
import"./currentGuildId-9ae9b1fe.js"
import"./intValue-ec94378e.js"
import{g as o,s as n}from"./idb-0492f5ed.js"
import"./formToUrl-3c899008.js"
import"./interceptSubmit-24b16034.js"
import"./closest-137378db.js"
import"./closestTr-81820d98.js"
import"./lvlTests-b64fe2f8.js"
import"./all-f846cd86.js"
import"./loadDataTables-b5e9e533.js"
import"./allthen-086eab8e.js"
import{i as m}from"./arena-300c8055.js"
import"./changeMinMax-318fdbb8.js"
import"./assets-f1f94362.js"
function p(s,e){const t=e||{}
t[s]=i,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?m():function(){const s=e()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(r(p,s))}else a("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-81c1e315.js.map
