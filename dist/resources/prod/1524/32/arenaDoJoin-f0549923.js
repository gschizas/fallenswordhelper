import{y as s,ah as a,C as t,t as e,V as r,T as i}from"./calfSystem-45544049.js"
import{i as o}from"./arena-03dd1c61.js"
import{g as n,s as c}from"./idb-ca3578bc.js"
import"./allthen-975bc488.js"
import"./all-31b59575.js"
import"./closestTr-709cb52e.js"
import"./closest-331833f9.js"
import"./intValue-da5ad0eb.js"
import"./changeMinMax-b9ad340a.js"
import"./numberIsNaN-fecd7e6d.js"
import"./assets-3768dd31.js"
import"./lvlTests-61b7ce7a.js"
import"./interceptSubmit-bea77d0e.js"
import"./formToUrl-61791a0c.js"
import"./loadDataTables-ca43b23d.js"
import"./currentGuildId-2687cdb7.js"
import"./isArray-73a21c38.js"
import"./setTipped-808b71de.js"
function m(s,a){const t=a||{}
t[s]=i,c("fsh_arenaFull",t)}function p(){s("arenaTypeTabs")?o():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(e(m,s))}else r("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-f0549923.js.map
