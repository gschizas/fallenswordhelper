import{y as s,aX as e,C as t,t as a,V as r,T as i}from"./calfSystem-3bdf319e.js"
import"./isArray-5d976413.js"
import"./numberIsNaN-871eca26.js"
import"./setTipped-141d3404.js"
import"./currentGuildId-e8170186.js"
import"./intValue-ef353ded.js"
import{g as o,s as n}from"./idb-31fb041e.js"
import"./formToUrl-6c242df5.js"
import"./interceptSubmit-5104e4a5.js"
import"./closest-79b9364e.js"
import"./closestTr-51fa459d.js"
import"./lvlTests-2f55a016.js"
import"./all-e81516b4.js"
import"./loadDataTables-d66e2d23.js"
import"./allthen-dd6cac31.js"
import{i as m}from"./arena-ee0b35a3.js"
import"./changeMinMax-5e8dfd5c.js"
import"./assets-9f475ea8.js"
function p(s,e){const t=e||{}
t[s]=i,n("fsh_arenaFull",t)}function d(){s("arenaTypeTabs")?m():function(){const s=e()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(a(p,s))}else r("arena","doJoin",s)}()}export default d
//# sourceMappingURL=arenaDoJoin-762d57ee.js.map
