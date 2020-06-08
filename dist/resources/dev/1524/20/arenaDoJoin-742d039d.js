import{y as s,a$ as a,C as t,t as e,V as o,T as r}from"./calfSystem-a2862afc.js"
import"./numberIsNaN-77d06981.js"
import"./setTipped-4f77e47d.js"
import"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import{g as i,s as n}from"./idb-911ff7c2.js"
import"./formToUrl-3b57fbeb.js"
import"./interceptSubmit-e6a64c8e.js"
import"./closest-75b5e3c5.js"
import"./closestTr-8090afea.js"
import"./lvlTests-19db9840.js"
import"./all-6bd68ac2.js"
import"./loadDataTables-3b40cdab.js"
import"./allthen-41484118.js"
import{i as m}from"./arena-72c82f5b.js"
import"./changeMinMax-6161beed.js"
import"./assets-dcdda354.js"
import"./arena-c755f3af.js"
function c(s,a){const t=a||{}
t[s]=r,n("fsh_arenaFull",t)}export default function(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(c,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-742d039d.js.map
