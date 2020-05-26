import{x as a,bd as s,L as t,a4 as e,s as i,R as o,P as r,a6 as n}from"./calfSystem-1262535f.js"
import"./isArray-d09fe8d1.js"
import"./dontPost-780742ab.js"
import"./numberIsNaN-e4fe1516.js"
import"./setTipped-5b3efabc.js"
import"./currentGuildId-5a28bdba.js"
import"./intValue-c4584407.js"
import"./all-c00b9c25.js"
import"./allthen-2a364862.js"
import"./lvlTests-37a8796d.js"
import"./loadDataTables-96074b55.js"
import{i as p}from"./arena-7275428f.js"
import"./changeMinMax-d9269b1c.js"
import"./assets-2e0649eb.js"
import"./updateUrl-17430bd2.js"
function l(a,s){const t=s||{}
t[a]=r,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(i(l,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-8bf9cd89.js.map
