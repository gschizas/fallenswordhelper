import{y as s,aZ as a,C as t,t as r,U as e,S as i}from"./calfSystem-cf4d22a7.js"
import"./isArray-fd538fb3.js"
import"./numberIsNaN-a6bcb044.js"
import"./setTipped-7d31935e.js"
import"./currentGuildId-5763962b.js"
import"./intValue-e4cdd281.js"
import{g as o,s as n}from"./idb-4798970d.js"
import"./formToUrl-31554e27.js"
import"./interceptSubmit-228afb85.js"
import"./closest-c2515a48.js"
import"./closestTr-c0ecc50a.js"
import"./lvlTests-a8a8e68e.js"
import"./all-646b32fa.js"
import"./loadDataTables-c2f9706f.js"
import"./allthen-18c82be8.js"
import{i as m}from"./arena-512da856.js"
import"./changeMinMax-bf9a1252.js"
import"./assets-d1187a02.js"
function p(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}function c(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(r(p,s))}else e("arena","doJoin",s)}()}export default c
//# sourceMappingURL=arenaDoJoin-48dc4aac.js.map
