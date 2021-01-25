import{y as s,aj as t,C as a,t as r,V as e,T as i}from"./calfSystem-26bcf570.js"
import{i as o}from"./arena-8f211cd4.js"
import{g as n,s as d}from"./idb-47b3fdf8.js"
import"./allthen-975bc488.js"
import"./all-31b59575.js"
import"./closestTr-51226dd2.js"
import"./closest-331833f9.js"
import"./intValue-da5ad0eb.js"
import"./changeMinMax-b9ad340a.js"
import"./numberIsNaN-fecd7e6d.js"
import"./assets-3768dd31.js"
import"./lvlTests-e2dd36df.js"
import"./interceptSubmit-ac75d95b.js"
import"./formToUrl-ea3e8186.js"
import"./loadDataTables-dd48330f.js"
import"./currentGuildId-b9dbffa6.js"
import"./isArray-73a21c38.js"
import"./setTipped-808b71de.js"
function m(s,t){const a=t||{}
a[s]=i,d("fsh_arenaFull",a)}function p(){s("arenaTypeTabs")?o():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(r(m,s))}else e("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-25eb2793.js.map
