import{y as s,aZ as t,C as a,t as e,U as r,S as i}from"./calfSystem-019a589c.js"
import"./isArray-2519a795.js"
import"./numberIsNaN-00e0daaf.js"
import"./setTipped-5c176332.js"
import"./currentGuildId-29e13ecc.js"
import"./intValue-44683b42.js"
import{g as o,s as n}from"./idb-6718e849.js"
import"./formToUrl-c83543e1.js"
import"./interceptSubmit-ae6fd26f.js"
import"./closest-d8e60c46.js"
import"./closestTr-39693be5.js"
import"./lvlTests-9864f8f0.js"
import"./all-e4fd8fad.js"
import"./loadDataTables-c28bafc7.js"
import"./allthen-c22b3f9e.js"
import{i as c}from"./arena-e33fec1f.js"
import"./changeMinMax-1374d190.js"
import"./assets-cc59cb67.js"
function m(s,t){const a=t||{}
a[s]=i,n("fsh_arenaFull",a)}function p(){s("arenaTypeTabs")?c():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(e(m,s))}else r("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-e12e86ff.js.map
