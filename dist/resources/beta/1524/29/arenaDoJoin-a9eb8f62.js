import{y as s,aY as a,C as t,t as r,U as i,S as o}from"./calfSystem-f9a27018.js"
import"./isArray-26644043.js"
import"./numberIsNaN-d1ebf732.js"
import"./setTipped-56aeba85.js"
import"./currentGuildId-a542fdb9.js"
import"./intValue-f94761c7.js"
import{g as e,s as n}from"./idb-5c501cd3.js"
import"./formToUrl-b3369df3.js"
import"./interceptSubmit-039f8ca3.js"
import"./closest-14c30e26.js"
import"./closestTr-0d6f3b27.js"
import"./lvlTests-12363b02.js"
import"./all-01203f8c.js"
import"./loadDataTables-343ff96f.js"
import"./allthen-ca11bf0c.js"
import{i as f}from"./arena-736a208a.js"
import"./changeMinMax-09af108d.js"
import"./assets-8c112bf6.js"
function m(s,a){const t=a||{}
t[s]=o,n("fsh_arenaFull",t)}function p(){s("arenaTypeTabs")?f():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(r(m,s))}else i("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-a9eb8f62.js.map
