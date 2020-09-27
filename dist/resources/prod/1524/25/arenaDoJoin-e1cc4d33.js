import{y as s,aX as a,C as t,t as e,U as r,S as i}from"./calfSystem-71b9378d.js"
import"./isArray-392e0aa1.js"
import"./numberIsNaN-929de7af.js"
import"./setTipped-64e874d6.js"
import"./currentGuildId-58e8f97e.js"
import"./intValue-65d3c36c.js"
import{g as o,s as n}from"./idb-97e2a44e.js"
import"./formToUrl-203c6ff2.js"
import"./interceptSubmit-c92da7b4.js"
import"./closest-8d8d60b3.js"
import"./closestTr-966a5985.js"
import"./lvlTests-e64d872a.js"
import"./all-3791b7d5.js"
import"./loadDataTables-3161a792.js"
import"./allthen-ad810e11.js"
import{i as m}from"./arena-8fbcb231.js"
import"./changeMinMax-502ef301.js"
import"./assets-73a041e8.js"
function p(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}function l(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}export default l
//# sourceMappingURL=arenaDoJoin-e1cc4d33.js.map
