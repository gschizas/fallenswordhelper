import{A as a,bg as s,R as t,ah as e,v as o,a0 as n,aw as i,aj as r}from"./calfSystem-fb94ddf0.js"
import"./isArray-dc6b23b1.js"
import"./dontPost-9febdb8a.js"
import"./numberIsNaN-c4fdd2a1.js"
import"./setTipped-fee0b5e8.js"
import"./all-d850e92d.js"
import"./allthen-b2156df7.js"
import"./lvlTests-c7abb5dc.js"
import"./loadDataTables-795746bb.js"
import{i as f}from"./arena-a12b0fb0.js"
import"./changeMinMax-c6cc0bbc.js"
import"./assets-90b59f36.js"
import"./updateUrl-e00f8709.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(o(p,a))}else n("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-d299296c.js.map
