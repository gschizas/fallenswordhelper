import{y as s,aW as t,C as a,t as e,U as r,S as i}from"./calfSystem-a5da5210.js"
import"./isArray-40d05c68.js"
import"./numberIsNaN-91041dcf.js"
import"./setTipped-e5305fe4.js"
import"./currentGuildId-87288eec.js"
import"./intValue-f4d85578.js"
import{g as o,s as n}from"./idb-2c141566.js"
import"./formToUrl-6151060b.js"
import"./interceptSubmit-9e7a42eb.js"
import"./closest-9ef1a6fc.js"
import"./closestTr-dd293153.js"
import"./lvlTests-d209aef3.js"
import"./all-7e2b4bf6.js"
import"./loadDataTables-a4c2d910.js"
import"./allthen-7191069a.js"
import{i as m}from"./arena-725678dd.js"
import"./changeMinMax-9ec858ae.js"
import"./assets-48002450.js"
function p(s,t){const a=t||{}
a[s]=i,n("fsh_arenaFull",a)}function c(){s("arenaTypeTabs")?m():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}export default c
//# sourceMappingURL=arenaDoJoin-e6521acc.js.map
