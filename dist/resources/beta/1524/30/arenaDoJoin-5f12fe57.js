import{y as s,aY as t,C as a,t as e,U as r,S as i}from"./calfSystem-ebf4b17d.js"
import"./isArray-0709f57e.js"
import"./numberIsNaN-fa7d637d.js"
import"./setTipped-c3fa7f51.js"
import"./currentGuildId-f7450bbe.js"
import"./intValue-e8157483.js"
import{g as o,s as n}from"./idb-b7d9067e.js"
import"./formToUrl-c9020722.js"
import"./interceptSubmit-3d708b68.js"
import"./closest-3bdef2f3.js"
import"./closestTr-24d1e04a.js"
import"./lvlTests-66478ebb.js"
import"./all-36f83e81.js"
import"./loadDataTables-1e8f9239.js"
import"./allthen-7d061027.js"
import{i as m}from"./arena-daf5722c.js"
import"./changeMinMax-649d8c61.js"
import"./assets-c6a1020c.js"
function p(s,t){const a=t||{}
a[s]=i,n("fsh_arenaFull",a)}function f(){s("arenaTypeTabs")?m():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}export default f
//# sourceMappingURL=arenaDoJoin-5f12fe57.js.map
