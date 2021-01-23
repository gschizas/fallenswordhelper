import{y as s,aj as t,C as a,t as e,V as o,T as i}from"./calfSystem-393ab895.js"
import{i as r}from"./arena-d61d47d0.js"
import{g as n,s as m}from"./idb-46b78b1e.js"
import"./allthen-3a9178b8.js"
import"./all-6dfbd6b8.js"
import"./closestTr-e70c5c37.js"
import"./closest-77701dcf.js"
import"./intValue-e7ef611d.js"
import"./changeMinMax-9086d4c2.js"
import"./numberIsNaN-53300e34.js"
import"./assets-ad350aab.js"
import"./lvlTests-64ed0189.js"
import"./interceptSubmit-193429ea.js"
import"./formToUrl-7683ac99.js"
import"./loadDataTables-06b95544.js"
import"./currentGuildId-469c60c3.js"
import"./setTipped-777d443c.js"
function p(s,t){const a=t||{}
a[s]=i,m("fsh_arenaFull",a)}function c(){s("arenaTypeTabs")?r():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(e(p,s))}else o("arena","doJoin",s)}()}export default c
//# sourceMappingURL=arenaDoJoin-c6205a8c.js.map
