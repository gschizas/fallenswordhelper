import{y as s,a$ as a,C as t,t as e,V as o,T as r}from"./calfSystem-69dd5601.js"
import"./numberIsNaN-929de7af.js"
import"./setTipped-64e874d6.js"
import"./currentGuildId-a0138513.js"
import"./intValue-65d3c36c.js"
import{g as i,s as n}from"./idb-874fe815.js"
import"./formToUrl-543a6364.js"
import"./interceptSubmit-9f6267e0.js"
import"./closest-8d8d60b3.js"
import"./closestTr-29c432ed.js"
import"./lvlTests-df1daa9a.js"
import"./all-3791b7d5.js"
import"./loadDataTables-0867dbe6.js"
import"./allthen-ad810e11.js"
import{i as m}from"./arena-8e1e47ea.js"
import"./changeMinMax-502ef301.js"
import"./assets-73a041e8.js"
import"./arena-5086fb94.js"
function p(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}function d(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(p,s))}else o("arena","doJoin",s)}()}export default d
//# sourceMappingURL=arenaDoJoin-0bfb0e01.js.map
