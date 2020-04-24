import{A as a,bk as s,S as t,ai as e,v as n,a1 as o,az as i,ak as r}from"./calfSystem-9b1fa4ca.js"
import"./dontPost-f8f2337a.js"
import"./numberIsNaN-6f59053c.js"
import"./all-d7ba558a.js"
import"./allthen-db530ef8.js"
import"./lvlTests-f9d5d6d3.js"
import"./loadDataTables-ea1c1c43.js"
import{i as f}from"./arena-14cada72.js"
import"./changeMinMax-85abe113.js"
import"./assets-b7eab2a0.js"
import"./updateUrl-f91ca9dd.js"
import"./arena-cf16de3f.js"
function c(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(c,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-af1c7a9f.js.map
