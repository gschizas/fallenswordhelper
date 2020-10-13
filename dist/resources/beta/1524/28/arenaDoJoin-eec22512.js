import{y as s,aY as t,C as a,t as e,U as r,S as i}from"./calfSystem-964f4fc9.js"
import"./isArray-40d05c68.js"
import"./numberIsNaN-91041dcf.js"
import"./setTipped-e5305fe4.js"
import"./currentGuildId-26c6bca8.js"
import"./intValue-f4d85578.js"
import{g as o,s as n}from"./idb-be8b4ca8.js"
import"./formToUrl-d1b2482f.js"
import"./interceptSubmit-ddb18ec3.js"
import"./closest-9ef1a6fc.js"
import"./closestTr-e4403fab.js"
import"./lvlTests-761b273d.js"
import"./all-7e2b4bf6.js"
import"./loadDataTables-85b3dcec.js"
import"./allthen-7191069a.js"
import{i as c}from"./arena-ea228694.js"
import"./changeMinMax-9ec858ae.js"
import"./assets-48002450.js"
function m(s,t){const a=t||{}
a[s]=i,n("fsh_arenaFull",a)}function p(){s("arenaTypeTabs")?c():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(m,s))}else r("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-eec22512.js.map
