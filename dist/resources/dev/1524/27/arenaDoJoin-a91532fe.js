import{y as s,a$ as a,C as e,t,W as o,U as r}from"./calfSystem-ec5e5725.js"
import"./numberIsNaN-871eca26.js"
import"./setTipped-141d3404.js"
import"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import{g as i,s as n}from"./idb-cecca562.js"
import"./formToUrl-9589262c.js"
import"./interceptSubmit-540c8b15.js"
import"./closest-79b9364e.js"
import"./closestTr-039240ce.js"
import"./lvlTests-62ab81b3.js"
import"./all-e81516b4.js"
import"./loadDataTables-4279f9f3.js"
import"./allthen-dd6cac31.js"
import{i as c}from"./arena-40bc34ae.js"
import"./changeMinMax-5e8dfd5c.js"
import"./assets-9f475ea8.js"
import"./arena-9e8a0abb.js"
function m(s,a){const e=a||{}
e[s]=r,n("fsh_arenaFull",e)}function p(){s("arenaTypeTabs")?c():function(){const s=a()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=e('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(t(m,s))}else o("arena","doJoin",s)}()}export default p
//# sourceMappingURL=arenaDoJoin-a91532fe.js.map
