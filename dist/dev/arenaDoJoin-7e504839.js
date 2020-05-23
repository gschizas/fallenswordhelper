import{A as a,bk as s,S as t,ai as e,v as n,a1 as o,az as i,ak as r}from"./calfSystem-fd021443.js"
import"./dontPost-18b03cba.js"
import"./numberIsNaN-c0f5c8eb.js"
import"./setTipped-34f0d2bb.js"
import"./all-93b0c1ea.js"
import"./allthen-b8986e95.js"
import"./lvlTests-90d88d7a.js"
import"./loadDataTables-bf6874f7.js"
import{i as p}from"./arena-2a708ffe.js"
import"./changeMinMax-505ad30d.js"
import"./assets-5a143407.js"
import"./updateUrl-ca744051.js"
import"./arena-a85010a6.js"
function f(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(f,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-7e504839.js.map
