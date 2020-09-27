import{y as s,aZ as a,C as t,t as e,U as r,S as i}from"./calfSystem-d3aab5a8.js"
import"./isArray-392e0aa1.js"
import"./numberIsNaN-929de7af.js"
import"./setTipped-64e874d6.js"
import"./currentGuildId-b5159547.js"
import"./intValue-65d3c36c.js"
import{g as o,s as n}from"./idb-f33380fa.js"
import"./formToUrl-19959c48.js"
import"./interceptSubmit-07270cc9.js"
import"./closest-8d8d60b3.js"
import"./closestTr-c1780224.js"
import"./lvlTests-9591eddc.js"
import"./all-3791b7d5.js"
import"./loadDataTables-9bddb5ee.js"
import"./allthen-ad810e11.js"
import{i as m}from"./arena-13ddf660.js"
import"./changeMinMax-502ef301.js"
import"./assets-73a041e8.js"
function p(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}function d(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}export default d
//# sourceMappingURL=arenaDoJoin-364fdde8.js.map
