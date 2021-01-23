import{y as s,ag as a,C as t,t as e,U as r,S as i}from"./calfSystem-7aee5245.js"
import{i as o}from"./arena-d28a1916.js"
import{g as n,s as m}from"./idb-12bca0fb.js"
import"./allthen-3a9178b8.js"
import"./all-6dfbd6b8.js"
import"./closestTr-177ae492.js"
import"./closest-77701dcf.js"
import"./intValue-e7ef611d.js"
import"./changeMinMax-9086d4c2.js"
import"./numberIsNaN-53300e34.js"
import"./assets-ad350aab.js"
import"./lvlTests-a5afa597.js"
import"./interceptSubmit-e2017f31.js"
import"./formToUrl-c1b61cd0.js"
import"./loadDataTables-1b31a4f6.js"
import"./currentGuildId-2e15c82d.js"
import"./isArray-551d6583.js"
import"./setTipped-777d443c.js"
function p(s,a){const t=a||{}
t[s]=i,m("fsh_arenaFull",t)}function c(){s("arenaTypeTabs")?o():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}export default c
//# sourceMappingURL=arenaDoJoin-7e5295a9.js.map
