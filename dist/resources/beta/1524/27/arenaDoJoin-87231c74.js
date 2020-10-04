import{y as s,aZ as t,C as a,t as e,V as r,T as i}from"./calfSystem-70c7a660.js"
import"./isArray-5d976413.js"
import"./numberIsNaN-871eca26.js"
import"./setTipped-141d3404.js"
import"./currentGuildId-b3e9b6a5.js"
import"./intValue-ef353ded.js"
import{g as o,s as n}from"./idb-d93da5f0.js"
import"./formToUrl-05384153.js"
import"./interceptSubmit-96d20d60.js"
import"./closest-79b9364e.js"
import"./closestTr-48756f86.js"
import"./lvlTests-5f917fbb.js"
import"./all-e81516b4.js"
import"./loadDataTables-adc50001.js"
import"./allthen-dd6cac31.js"
import{i as m}from"./arena-dfb3debc.js"
import"./changeMinMax-5e8dfd5c.js"
import"./assets-9f475ea8.js"
function p(s,t){const a=t||{}
a[s]=i,n("fsh_arenaFull",a)}function d(){s("arenaTypeTabs")?m():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}export default d
//# sourceMappingURL=arenaDoJoin-87231c74.js.map
