import{y as s,aZ as a,C as t,t as r,U as e,S as i}from"./calfSystem-34fcd691.js"
import"./isArray-de90de98.js"
import"./numberIsNaN-cb2409eb.js"
import"./setTipped-d4d554a0.js"
import"./currentGuildId-fa7da475.js"
import"./intValue-0e84cdad.js"
import{g as o,s as n}from"./idb-62d2605f.js"
import"./formToUrl-41bbf6ea.js"
import"./interceptSubmit-492af249.js"
import"./closest-5107b89a.js"
import"./closestTr-dbc0d607.js"
import"./lvlTests-1d6480c4.js"
import"./all-9da52a21.js"
import"./loadDataTables-407075e4.js"
import"./allthen-f8a5c187.js"
import{i as m}from"./arena-4fda6b81.js"
import"./changeMinMax-29622459.js"
import"./assets-06ec229a.js"
function p(s,a){const t=a||{}
t[s]=i,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(r(p,s))}else e("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-18a4be53.js.map
