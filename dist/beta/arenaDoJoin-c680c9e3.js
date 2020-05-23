import{A as a,bg as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-2fb02284.js"
import"./isArray-22938fdc.js"
import"./dontPost-cf6d2cbc.js"
import"./numberIsNaN-076e64a6.js"
import"./setTipped-db163424.js"
import"./all-88cb4e71.js"
import"./allthen-1b0c8f52.js"
import"./lvlTests-34a451b3.js"
import"./loadDataTables-b8097ab6.js"
import{i as c}from"./arena-ed0ade9b.js"
import"./changeMinMax-638e0585.js"
import"./assets-fad649bc.js"
import"./updateUrl-1abaacc0.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-c680c9e3.js.map
