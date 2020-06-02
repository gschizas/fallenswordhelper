import{x as s,b0 as a,N as t,s as e,T as o,R as r}from"./calfSystem-1c103624.js"
import"./dontPost-f9ce543e.js"
import"./numberIsNaN-40c4542d.js"
import"./setTipped-d80523c9.js"
import"./currentGuildId-b6fa52f3.js"
import"./intValue-f5e62e5b.js"
import{g as i,s as n}from"./idb-347cc2af.js"
import"./closest-a4273a71.js"
import"./all-bf5942c7.js"
import"./allthen-a3d432e8.js"
import"./closestTr-335afa5f.js"
import"./lvlTests-33617635.js"
import"./loadDataTables-fc57660c.js"
import{i as c}from"./arena-80fe9e89.js"
import"./changeMinMax-09a9a6ff.js"
import"./assets-80c6fb35.js"
import"./updateUrl-44ce0828.js"
import"./arena-408f147c.js"
function f(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?c():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(f,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-8ba924d5.js.map
