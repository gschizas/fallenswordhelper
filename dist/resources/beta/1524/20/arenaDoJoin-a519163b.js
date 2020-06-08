import{y as s,aZ as a,C as t,t as e,U as r,S as i}from"./calfSystem-05554bae.js"
import"./isArray-9377ced3.js"
import"./numberIsNaN-d04aa9f7.js"
import"./setTipped-227f970f.js"
import"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import{g as o,s as n}from"./idb-862da886.js"
import"./formToUrl-21fa7da6.js"
import"./interceptSubmit-399cf9b1.js"
import"./closest-a50421eb.js"
import"./closestTr-de7cfbf0.js"
import"./lvlTests-7c6c89cc.js"
import"./all-e13706ab.js"
import"./loadDataTables-bfb23461.js"
import"./allthen-feed7e5f.js"
import{i as f}from"./arena-094a06a2.js"
import"./changeMinMax-816e12f5.js"
import"./assets-f388842b.js"
function m(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?f():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(m,s))}else r("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-a519163b.js.map
