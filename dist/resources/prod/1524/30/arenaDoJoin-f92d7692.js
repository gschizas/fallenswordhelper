import{y as s,aW as a,C as t,t as r,U as i,S as o}from"./calfSystem-6459f18a.js"
import"./isArray-0709f57e.js"
import"./numberIsNaN-fa7d637d.js"
import"./setTipped-c3fa7f51.js"
import"./currentGuildId-da0b8fda.js"
import"./intValue-e8157483.js"
import{g as e,s as n}from"./idb-737f325b.js"
import"./formToUrl-33859dc7.js"
import"./interceptSubmit-2837655b.js"
import"./closest-3bdef2f3.js"
import"./closestTr-98dcae50.js"
import"./lvlTests-a02a80a7.js"
import"./all-36f83e81.js"
import"./loadDataTables-5d301d53.js"
import"./allthen-7d061027.js"
import{i as m}from"./arena-22cbe927.js"
import"./changeMinMax-649d8c61.js"
import"./assets-c6a1020c.js"
function p(s,a){const t=a||{}
t[s]=o,n("fsh_arenaFull",t)}function f(){s("arenaTypeTabs")?m():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(r(p,s))}else i("arena","doJoin",s)}()}export default f
//# sourceMappingURL=arenaDoJoin-f92d7692.js.map
