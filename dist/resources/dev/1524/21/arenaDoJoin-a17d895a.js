import{y as s,a$ as t,C as a,t as e,V as o,T as r}from"./calfSystem-9c7241dc.js"
import"./numberIsNaN-7270cc8c.js"
import"./setTipped-df312394.js"
import"./currentGuildId-00053b50.js"
import"./intValue-4cb61c79.js"
import{g as i,s as n}from"./idb-5f8a9591.js"
import"./formToUrl-39ed921f.js"
import"./interceptSubmit-9fc997ac.js"
import"./closest-eb66b280.js"
import"./closestTr-5c882599.js"
import"./lvlTests-1f00aff4.js"
import"./all-fed72729.js"
import"./loadDataTables-d7f0915e.js"
import"./allthen-c94a6cae.js"
import{i as c}from"./arena-87ebc6c5.js"
import"./changeMinMax-38e8d71c.js"
import"./assets-ddd0effd.js"
import"./arena-a87f9650.js"
function m(s,t){const a=t||{}
a[s]=r,n("fsh_arenaFull",a)}export default function(){s("arenaTypeTabs")?c():function(){const s=t()
if(!function(s){return s&&s.includes("combat move")}(s))if(function(s){return s&&s.includes("your guild")}(s)){const s=a('#pCC input[name="pvp_id"]').value
i("fsh_arenaFull").then(e(m,s))}else o("arena","doJoin",s)}()}
//# sourceMappingURL=arenaDoJoin-a17d895a.js.map
