import{y as a,ak as s,C as t,t as e,W as o,U as i}from"./calfSystem-19a5d332.js"
import{i as r}from"./arena-91ff9118.js"
import{g as n,s as m}from"./idb-faef0351.js"
import"./allthen-975bc488.js"
import"./all-31b59575.js"
import"./closestTr-1e3a3aee.js"
import"./closest-331833f9.js"
import"./intValue-da5ad0eb.js"
import"./changeMinMax-b9ad340a.js"
import"./numberIsNaN-fecd7e6d.js"
import"./assets-3768dd31.js"
import"./lvlTests-5bd52df5.js"
import"./interceptSubmit-6d528c47.js"
import"./formToUrl-8a3e8d2a.js"
import"./loadDataTables-e74270a0.js"
import"./currentGuildId-daa4c793.js"
import"./setTipped-808b71de.js"
function p(a,s){const t=s||{}
t[a]=i,m("fsh_arenaFull",t)}function d(){a("arenaTypeTabs")?r():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(e(p,a))}else o("arena","doJoin",a)}()}export default d
//# sourceMappingURL=arenaDoJoin-510c9650.js.map
