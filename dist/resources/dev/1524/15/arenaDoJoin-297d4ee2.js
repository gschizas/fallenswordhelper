import{x as a,be as s,M as t,a5 as e,s as n,S as o,Q as i,a7 as r}from"./calfSystem-ee582533.js"
import"./dontPost-2a1b6847.js"
import"./numberIsNaN-c9f76e43.js"
import"./setTipped-a858a4c4.js"
import"./currentGuildId-0564d9a0.js"
import"./intValue-a842cf8a.js"
import"./all-b94d2d9d.js"
import"./allthen-f1914fd2.js"
import"./lvlTests-ac568200.js"
import"./loadDataTables-9af37330.js"
import{i as p}from"./arena-20295fe1.js"
import"./changeMinMax-174c484a.js"
import"./assets-3b767daf.js"
import"./updateUrl-2f469a7c.js"
import"./arena-833d6240.js"
function l(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(l,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-297d4ee2.js.map
