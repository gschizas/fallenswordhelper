import{y as a,aX as s,C as t,t as r,U as i,S as o}from"./calfSystem-03970067.js"
import"./isArray-aff0783a.js"
import"./numberIsNaN-b19dc958.js"
import"./setTipped-07001aa9.js"
import"./currentGuildId-cce6862b.js"
import"./intValue-0d844fc4.js"
import{g as e,s as n}from"./idb-3dad9172.js"
import"./formToUrl-906ab550.js"
import"./interceptSubmit-e3519b7d.js"
import"./closest-2eae4a84.js"
import"./closestTr-3d8fe8c0.js"
import"./lvlTests-494f9b6a.js"
import"./all-34a43a38.js"
import"./loadDataTables-a4c6ac52.js"
import"./allthen-0b78a490.js"
import{i as c}from"./arena-a46ac255.js"
import"./changeMinMax-1cc6fa24.js"
import"./assets-b2bca88f.js"
function m(a,s){const t=s||{}
t[a]=o,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(r(m,a))}else i("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-85e47b51.js.map
