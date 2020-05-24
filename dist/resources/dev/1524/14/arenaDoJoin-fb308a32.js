import{z as a,bj as s,R as t,ah as e,u as n,a0 as o,ay as i,aj as r}from"./calfSystem-d96a3efd.js"
import"./dontPost-a74ab672.js"
import"./numberIsNaN-5b8bfc11.js"
import"./setTipped-906b0642.js"
import"./all-a5e007ad.js"
import"./allthen-182523ad.js"
import"./lvlTests-87272fa2.js"
import"./loadDataTables-366dff61.js"
import{i as f}from"./arena-bf2d7d5b.js"
import"./changeMinMax-2a9d74c1.js"
import"./assets-1567628f.js"
import"./updateUrl-266f192f.js"
import"./arena-c4be0131.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(p,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-fb308a32.js.map
