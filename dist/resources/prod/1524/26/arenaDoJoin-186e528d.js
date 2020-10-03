import{y as s,aX as a,C as t,t as r,U as i,S as o}from"./calfSystem-a5fc99d4.js"
import"./isArray-fd538fb3.js"
import"./numberIsNaN-a6bcb044.js"
import"./setTipped-7d31935e.js"
import"./currentGuildId-c73fd152.js"
import"./intValue-e4cdd281.js"
import{g as e,s as n}from"./idb-b13ab254.js"
import"./formToUrl-287ebfb7.js"
import"./interceptSubmit-1ba9df73.js"
import"./closest-c2515a48.js"
import"./closestTr-a52072b1.js"
import"./lvlTests-8400fcaa.js"
import"./all-646b32fa.js"
import"./loadDataTables-c20a07f5.js"
import"./allthen-18c82be8.js"
import{i as m}from"./arena-1472f1f7.js"
import"./changeMinMax-bf9a1252.js"
import"./assets-d1187a02.js"
function f(s,a){const t=a||{}
t[s]=o,n("fsh_arenaFull",t)}function p(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(r(f,s))}else i("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-186e528d.js.map
