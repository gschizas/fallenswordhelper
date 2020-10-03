import{y as s,a$ as a,C as t,t as e,V as o,T as r}from"./calfSystem-4991bf5b.js"
import"./numberIsNaN-a6bcb044.js"
import"./setTipped-7d31935e.js"
import"./currentGuildId-56c2c861.js"
import"./intValue-e4cdd281.js"
import{g as i,s as n}from"./idb-ee31c042.js"
import"./formToUrl-66bca9f7.js"
import"./interceptSubmit-c0a2dd00.js"
import"./closest-c2515a48.js"
import"./closestTr-72e28412.js"
import"./lvlTests-72fd69e8.js"
import"./all-646b32fa.js"
import"./loadDataTables-1b111eb0.js"
import"./allthen-18c82be8.js"
import{i as m}from"./arena-a972286f.js"
import"./changeMinMax-bf9a1252.js"
import"./assets-d1187a02.js"
import"./arena-f400268d.js"
function p(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}function c(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(p,s))}else o("arena","doJoin",s)}()}export default c
//# sourceMappingURL=arenaDoJoin-9496e587.js.map
