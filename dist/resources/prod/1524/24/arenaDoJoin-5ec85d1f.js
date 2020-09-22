import{y as s,aX as a,C as t,t as r,U as i,S as o}from"./calfSystem-ec854151.js"
import"./isArray-2519a795.js"
import"./numberIsNaN-00e0daaf.js"
import"./setTipped-5c176332.js"
import"./currentGuildId-1299fc05.js"
import"./intValue-44683b42.js"
import{g as e,s as n}from"./idb-72ad0068.js"
import"./formToUrl-48dc238d.js"
import"./interceptSubmit-99d78c5d.js"
import"./closest-d8e60c46.js"
import"./closestTr-25a90971.js"
import"./lvlTests-2fd3e201.js"
import"./all-e4fd8fad.js"
import"./loadDataTables-27ca2fa3.js"
import"./allthen-c22b3f9e.js"
import{i as c}from"./arena-c579a56f.js"
import"./changeMinMax-1374d190.js"
import"./assets-cc59cb67.js"
function m(s,a){const t=a||{}
t[s]=o,n("fsh_arenaFull",t)}function p(){s("arenaTypeTabs")?c():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(r(m,s))}else i("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-5ec85d1f.js.map
