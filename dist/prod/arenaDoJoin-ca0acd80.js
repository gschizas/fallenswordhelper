import{A as a,be as s,R as t,ah as e,v as n,a0 as o,aw as r,aj as i}from"./calfSystem-3956a623.js"
import"./isArray-03eca71a.js"
import"./dontPost-e1ef8cf2.js"
import"./numberIsNaN-c09ad043.js"
import"./all-0781ab5a.js"
import"./allthen-a3d20eb3.js"
import"./lvlTests-8590fea4.js"
import"./loadDataTables-165302ba.js"
import{i as l}from"./arena-ba89a85a.js"
import"./changeMinMax-1c2bfa85.js"
import"./assets-0e690637.js"
import"./updateUrl-4773abd4.js"
function m(a,s){const t=s||{}
t[a]=r,i("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?l():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(m,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-ca0acd80.js.map
