import{y as s,aW as a,C as t,t as e,U as r,S as i}from"./calfSystem-57628ebe.js"
import"./isArray-26644043.js"
import"./numberIsNaN-d1ebf732.js"
import"./setTipped-56aeba85.js"
import"./currentGuildId-909a3fed.js"
import"./intValue-f94761c7.js"
import{g as o,s as n}from"./idb-5c863a6f.js"
import"./formToUrl-ed8f6bd0.js"
import"./interceptSubmit-42e92144.js"
import"./closest-14c30e26.js"
import"./closestTr-125f03b2.js"
import"./lvlTests-e021fa96.js"
import"./all-01203f8c.js"
import"./loadDataTables-5af23ae2.js"
import"./allthen-ca11bf0c.js"
import{i as f}from"./arena-fd160b91.js"
import"./changeMinMax-09af108d.js"
import"./assets-8c112bf6.js"
function m(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}function p(){s("arenaTypeTabs")?f():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(m,s))}else r("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-e2605958.js.map
