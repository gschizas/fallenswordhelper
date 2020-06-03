import{x as s,b0 as a,N as t,s as e,T as o,R as r}from"./calfSystem-f7574730.js"
import"./dontPost-f800280d.js"
import"./numberIsNaN-92f332e4.js"
import"./setTipped-71bfe88a.js"
import"./currentGuildId-3e98e06d.js"
import"./intValue-0280032d.js"
import{g as i,s as n}from"./idb-14a57c5b.js"
import"./closest-807af018.js"
import"./all-d5952527.js"
import"./allthen-0309499d.js"
import"./closestTr-78ace0a3.js"
import"./lvlTests-38a8de9e.js"
import"./loadDataTables-791afcee.js"
import{i as p}from"./arena-4ffd50c4.js"
import"./changeMinMax-aa6c016a.js"
import"./assets-5d34d620.js"
import"./updateUrl-1670c59a.js"
import"./arena-f2357f8e.js"
function m(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(m,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-67b226ac.js.map
