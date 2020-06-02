import{x as s,aY as a,M as e,s as t,S as o,Q as r}from"./calfSystem-dec5e071.js"
import"./isArray-5ae0f2ae.js"
import"./dontPost-5930c5be.js"
import"./numberIsNaN-ea515379.js"
import"./setTipped-80e36195.js"
import"./currentGuildId-694bbc76.js"
import"./intValue-8ad0a3ce.js"
import{g as i,s as n}from"./idb-8fe34e30.js"
import"./closest-d88a3ae2.js"
import"./all-74575e32.js"
import"./allthen-38e3a607.js"
import"./closestTr-37ea13b0.js"
import"./lvlTests-011061f4.js"
import"./loadDataTables-475e7aa4.js"
import{i as p}from"./arena-2f8cf255.js"
import"./changeMinMax-e936ffdd.js"
import"./assets-d1a83c4c.js"
import"./updateUrl-b1cce363.js"
function m(s,a){const e=a||{}
e[s]=r,n("fsh_arenaFull",e)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=e('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(t(m,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-2fb7ff42.js.map
