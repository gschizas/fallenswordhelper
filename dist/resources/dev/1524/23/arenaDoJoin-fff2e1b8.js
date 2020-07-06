import{y as a,a$ as s,C as t,t as e,V as o,T as r}from"./calfSystem-9901ad27.js"
import"./numberIsNaN-cb2409eb.js"
import"./setTipped-d4d554a0.js"
import"./currentGuildId-86da8be9.js"
import"./intValue-0e84cdad.js"
import{g as i,s as n}from"./idb-efff97cf.js"
import"./formToUrl-4cebc28a.js"
import"./interceptSubmit-ce974a7c.js"
import"./closest-5107b89a.js"
import"./closestTr-5c087056.js"
import"./lvlTests-1e58f0ba.js"
import"./all-9da52a21.js"
import"./loadDataTables-d5d683d1.js"
import"./allthen-f8a5c187.js"
import{i as c}from"./arena-2fd5849c.js"
import"./changeMinMax-29622459.js"
import"./assets-06ec229a.js"
import"./arena-afe5f36a.js"
function m(a,s){const t=s||{}
t[a]=r,n("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(m,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-fff2e1b8.js.map
