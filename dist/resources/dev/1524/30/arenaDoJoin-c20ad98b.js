import{y as s,a_ as t,C as a,t as e,V as o,T as r}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import"./setTipped-c3fa7f51.js"
import"./currentGuildId-7eae4191.js"
import"./intValue-e8157483.js"
import{g as i,s as n}from"./idb-7f0d2b39.js"
import"./formToUrl-54567b6c.js"
import"./interceptSubmit-d6a9b28d.js"
import"./closest-3bdef2f3.js"
import"./closestTr-612573e8.js"
import"./lvlTests-9878d022.js"
import"./all-36f83e81.js"
import"./loadDataTables-0859fee6.js"
import"./allthen-7d061027.js"
import{i as m}from"./arena-775e8e47.js"
import"./changeMinMax-649d8c61.js"
import"./assets-c6a1020c.js"
import"./arena-ac278570.js"
function p(s,t){const a=t||{}
a[s]=r,n("fsh_arenaFull",a)}function f(){s("arenaTypeTabs")?m():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(p,s))}else o("arena","doJoin",s)}()}export default f
//# sourceMappingURL=arenaDoJoin-c20ad98b.js.map
