import{A as a,be as s,R as t,ah as e,v as n,a0 as o,aw as r,aj as i}from"./calfSystem-cb871cc0.js"
import"./isArray-2b606546.js"
import"./dontPost-bd45f448.js"
import"./numberIsNaN-3061f097.js"
import"./all-56fa180f.js"
import"./allthen-fa22d516.js"
import"./lvlTests-9e757586.js"
import"./loadDataTables-6e66e590.js"
import{i as l}from"./arena-9d603853.js"
import"./changeMinMax-f96282c1.js"
import"./assets-4d0240ba.js"
import"./updateUrl-7149e046.js"
function f(a,s){const t=s||{}
t[a]=r,i("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?l():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(f,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-53b5a298.js.map
