import{x as s,a_ as a,M as t,s as e,S as o,Q as r}from"./calfSystem-57340987.js"
import"./isArray-f770eec0.js"
import"./dontPost-e24d8962.js"
import"./numberIsNaN-9e712afc.js"
import"./setTipped-bbda3ddd.js"
import"./currentGuildId-fd144a5c.js"
import"./intValue-e99f58ac.js"
import{g as i,s as n}from"./idb-c55e2904.js"
import"./closest-f4291115.js"
import"./all-82b4870b.js"
import"./allthen-298d46c2.js"
import"./closestTr-ac8ec42f.js"
import"./lvlTests-e8a45565.js"
import"./loadDataTables-72045bea.js"
import{i as p}from"./arena-64d76230.js"
import"./changeMinMax-c6b97c52.js"
import"./assets-7a78599a.js"
import"./updateUrl-705783d5.js"
function c(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(c,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-40b9c551.js.map
