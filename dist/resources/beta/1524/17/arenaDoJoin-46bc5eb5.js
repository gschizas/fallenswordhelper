import{x as s,a_ as a,M as t,s as e,S as o,Q as r}from"./calfSystem-02ae8657.js"
import"./isArray-7fbdd896.js"
import"./dontPost-c73663bf.js"
import"./numberIsNaN-0b348b17.js"
import"./setTipped-48769a0a.js"
import"./currentGuildId-a8ad9d1f.js"
import"./intValue-514fe585.js"
import{g as i,s as n}from"./idb-ac1635f3.js"
import"./closest-8af29cf3.js"
import"./all-5d0e9d43.js"
import"./allthen-9e407c02.js"
import"./closestTr-cb33d92d.js"
import"./lvlTests-4669cf32.js"
import"./loadDataTables-267f1793.js"
import{i as p}from"./arena-ae18c5d4.js"
import"./changeMinMax-0e67e80c.js"
import"./assets-4e511750.js"
import"./updateUrl-c3fdab4c.js"
function c(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?p():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(c,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-46bc5eb5.js.map
