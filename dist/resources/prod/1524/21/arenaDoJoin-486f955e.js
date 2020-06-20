import{y as a,aX as s,C as t,t as e,U as r,S as i}from"./calfSystem-2741d97b.js"
import"./isArray-aedaa0a2.js"
import"./numberIsNaN-ed994c04.js"
import"./setTipped-30e03bb5.js"
import"./currentGuildId-2c5ea0ad.js"
import"./intValue-1a593541.js"
import{g as o,s as n}from"./idb-cb4fc9f9.js"
import"./formToUrl-d134536c.js"
import"./interceptSubmit-60aabec1.js"
import"./closest-5ba11a5a.js"
import"./closestTr-a85aebac.js"
import"./lvlTests-8bc3afe6.js"
import"./all-75af160a.js"
import"./loadDataTables-b99ba7c2.js"
import"./allthen-dcd66ca6.js"
import{i as c}from"./arena-988be143.js"
import"./changeMinMax-f9710921.js"
import"./assets-a336e07e.js"
function m(a,s){const t=s||{}
t[a]=i,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(m,a))}else r("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-486f955e.js.map
