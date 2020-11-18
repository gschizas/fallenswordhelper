import{y as s,a_ as a,C as t,t as e,V as o,T as r}from"./calfSystem-02c48ff5.js"
import"./numberIsNaN-d1ebf732.js"
import"./setTipped-56aeba85.js"
import"./currentGuildId-cefcefd6.js"
import"./intValue-f94761c7.js"
import{g as i,s as n}from"./idb-49c5b621.js"
import"./formToUrl-b49ee3b5.js"
import"./interceptSubmit-43d7e549.js"
import"./closest-14c30e26.js"
import"./closestTr-9052729a.js"
import"./lvlTests-a82a58f4.js"
import"./all-01203f8c.js"
import"./loadDataTables-b534a318.js"
import"./allthen-ca11bf0c.js"
import{i as c}from"./arena-14fc8216.js"
import"./changeMinMax-09af108d.js"
import"./assets-8c112bf6.js"
import"./arena-6c34b7f6.js"
function f(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}function m(){s("arenaTypeTabs")?c():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(f,s))}else o("arena","doJoin",s)}()}export default m
//# sourceMappingURL=arenaDoJoin-d0399a57.js.map
