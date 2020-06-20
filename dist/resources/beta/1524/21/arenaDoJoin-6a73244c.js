import{y as s,aZ as a,C as e,t,U as r,S as i}from"./calfSystem-89b939c8.js"
import"./isArray-75e85160.js"
import"./numberIsNaN-913aebac.js"
import"./setTipped-3dfbd3ed.js"
import"./currentGuildId-ae8f3699.js"
import"./intValue-cd93b930.js"
import{g as o,s as n}from"./idb-9be3057e.js"
import"./formToUrl-ae369bee.js"
import"./interceptSubmit-57a8cf95.js"
import"./closest-e1837d80.js"
import"./closestTr-e9bb4ace.js"
import"./lvlTests-48f62cec.js"
import"./all-ca702d79.js"
import"./loadDataTables-bc7f4ac3.js"
import"./allthen-b213c39d.js"
import{i as c}from"./arena-07fddd53.js"
import"./changeMinMax-94960d14.js"
import"./assets-a288e2fc.js"
function m(s,a){const e=a||{}
e[s]=i,n("fsh_arenaFull",e)}export default function(){s("arenaTypeTabs")?c():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=e('#pCC input[name="pvp_id"]').value
o("fsh_arenaFull").then(t(m,s))}else r("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-6a73244c.js.map
