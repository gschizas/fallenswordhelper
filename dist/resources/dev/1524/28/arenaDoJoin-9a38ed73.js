import{y as s,a_ as a,C as t,t as e,V as o,T as r}from"./calfSystem-b136673a.js"
import"./numberIsNaN-91041dcf.js"
import"./setTipped-e5305fe4.js"
import"./currentGuildId-4405d1bb.js"
import"./intValue-f4d85578.js"
import{g as i,s as n}from"./idb-c31665cb.js"
import"./formToUrl-1d96bdd4.js"
import"./interceptSubmit-957549ab.js"
import"./closest-9ef1a6fc.js"
import"./closestTr-ea8b5479.js"
import"./lvlTests-045a7c7d.js"
import"./all-7e2b4bf6.js"
import"./loadDataTables-fb922282.js"
import"./allthen-7191069a.js"
import{i as m}from"./arena-3f06ba26.js"
import"./changeMinMax-9ec858ae.js"
import"./assets-48002450.js"
import"./arena-6a803efd.js"
function p(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}function f(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(p,s))}else o("arena","doJoin",s)}()}export default f
//# sourceMappingURL=arenaDoJoin-9a38ed73.js.map
