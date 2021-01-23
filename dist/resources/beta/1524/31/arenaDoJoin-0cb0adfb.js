import{y as a,ai as s,C as t,t as e,U as i,S as r}from"./calfSystem-47fc08ae.js"
import{i as o}from"./arena-75f10570.js"
import{g as n,s as m}from"./idb-b72d80f0.js"
import"./allthen-3a9178b8.js"
import"./all-6dfbd6b8.js"
import"./closestTr-d8faa348.js"
import"./closest-77701dcf.js"
import"./intValue-e7ef611d.js"
import"./changeMinMax-9086d4c2.js"
import"./numberIsNaN-53300e34.js"
import"./assets-ad350aab.js"
import"./lvlTests-c6e367ee.js"
import"./interceptSubmit-3f0967f1.js"
import"./formToUrl-e4e5b8f2.js"
import"./loadDataTables-65daaaab.js"
import"./currentGuildId-72bd2a1a.js"
import"./isArray-551d6583.js"
import"./setTipped-777d443c.js"
function p(a,s){const t=s||{}
t[a]=r,m("fsh_arenaFull",t)}function f(){a("arenaTypeTabs")?o():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
n("fsh_arenaFull").then(e(p,a))}else i("arena","doJoin",a)}()}export default f
//# sourceMappingURL=arenaDoJoin-0cb0adfb.js.map
