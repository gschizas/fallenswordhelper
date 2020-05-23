import{A as a,bk as s,S as t,ai as e,v as n,a1 as o,az as i,ak as r}from"./calfSystem-70b0df7f.js"
import"./dontPost-66858ca6.js"
import"./numberIsNaN-888b325e.js"
import"./setTipped-19f09302.js"
import"./all-d4a4126a.js"
import"./allthen-82910129.js"
import"./lvlTests-5da07455.js"
import"./loadDataTables-26792ea2.js"
import{i as p}from"./arena-70b90780.js"
import"./changeMinMax-7b8b065f.js"
import"./assets-50822cf1.js"
import"./updateUrl-33a1c85f.js"
import"./arena-0d41ce41.js"
function l(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(l,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-8b68cc88.js.map
