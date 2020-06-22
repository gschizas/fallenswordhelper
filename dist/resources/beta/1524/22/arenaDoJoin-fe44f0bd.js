import{y as a,aZ as s,C as t,t as e,U as r,S as i}from"./calfSystem-1b876afa.js"
import"./isArray-f02424dc.js"
import"./numberIsNaN-1ac731b5.js"
import"./setTipped-aa3fcf43.js"
import"./currentGuildId-000cb2c0.js"
import"./intValue-4dd66c70.js"
import{g as o,s as n}from"./idb-0681f9af.js"
import"./formToUrl-cdc17fa4.js"
import"./interceptSubmit-8946388b.js"
import"./closest-f51e0443.js"
import"./closestTr-21ae2865.js"
import"./lvlTests-eea60268.js"
import"./all-8cfc3076.js"
import"./loadDataTables-beec4940.js"
import"./allthen-d1515ca1.js"
import{i as c}from"./arena-e030693e.js"
import"./changeMinMax-655aab04.js"
import"./assets-669be9a7.js"
function m(a,s){const t=s||{}
t[a]=i,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(m,a))}else r("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-fe44f0bd.js.map
