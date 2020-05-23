import{A as a,be as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-d06402b1.js"
import"./isArray-ab78a040.js"
import"./dontPost-a6e48caa.js"
import"./numberIsNaN-cb3c2f58.js"
import"./setTipped-f9a342fb.js"
import"./all-0c4e78e9.js"
import"./allthen-5b4db3f0.js"
import"./lvlTests-1d8749df.js"
import"./loadDataTables-284dd27f.js"
import{i as f}from"./arena-cca762e1.js"
import"./changeMinMax-bf6b98e2.js"
import"./assets-2dfb5462.js"
import"./updateUrl-1b6ead9f.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-d8c35ad6.js.map
