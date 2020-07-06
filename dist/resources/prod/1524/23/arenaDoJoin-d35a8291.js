import{y as s,aX as a,C as t,t as e,U as r,S as i}from"./calfSystem-019de1cf.js"
import"./isArray-de90de98.js"
import"./numberIsNaN-cb2409eb.js"
import"./setTipped-d4d554a0.js"
import"./currentGuildId-a399e8da.js"
import"./intValue-0e84cdad.js"
import{g as o,s as n}from"./idb-1bb3cee2.js"
import"./formToUrl-91be1404.js"
import"./interceptSubmit-7b40d68d.js"
import"./closest-5107b89a.js"
import"./closestTr-ad14f34f.js"
import"./lvlTests-8fcd92f9.js"
import"./all-9da52a21.js"
import"./loadDataTables-be4d5e60.js"
import"./allthen-f8a5c187.js"
import{i as m}from"./arena-fbc47ae5.js"
import"./changeMinMax-29622459.js"
import"./assets-06ec229a.js"
function p(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(p,s))}else r("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-d35a8291.js.map
