import{z as a,bd as s,Q as t,ag as e,u as o,$ as i,av as n,ai as r}from"./calfSystem-d587d232.js"
import"./isArray-5dbf2807.js"
import"./dontPost-bc1edacc.js"
import"./numberIsNaN-054e0c59.js"
import"./setTipped-3e31c084.js"
import"./all-39781966.js"
import"./allthen-ba816a7b.js"
import"./lvlTests-e4cca5f4.js"
import"./loadDataTables-043f4b86.js"
import{i as c}from"./arena-c1de1733.js"
import"./changeMinMax-2faa59b9.js"
import"./assets-80dc2218.js"
import"./updateUrl-2eab1829.js"
function p(a,s){const t=s||{}
t[a]=n,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else i("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-0961fd7a.js.map
