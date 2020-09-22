import{y as s,a$ as t,C as a,t as e,V as o,T as r}from"./calfSystem-38898f3e.js"
import"./numberIsNaN-00e0daaf.js"
import"./setTipped-5c176332.js"
import"./currentGuildId-7855dbba.js"
import"./intValue-44683b42.js"
import{g as i,s as n}from"./idb-ccc44752.js"
import"./formToUrl-3fe1dedb.js"
import"./interceptSubmit-7919653e.js"
import"./closest-d8e60c46.js"
import"./closestTr-4d04f2f4.js"
import"./lvlTests-d166aab9.js"
import"./all-e4fd8fad.js"
import"./loadDataTables-da43d3ec.js"
import"./allthen-c22b3f9e.js"
import{i as c}from"./arena-15d569c8.js"
import"./changeMinMax-1374d190.js"
import"./assets-cc59cb67.js"
import"./arena-c2b62856.js"
function m(s,t){const a=t||{}
a[s]=r,n("fsh_arenaFull",a)}function p(){s("arenaTypeTabs")?c():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(m,s))}else o("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-0c2816c8.js.map
