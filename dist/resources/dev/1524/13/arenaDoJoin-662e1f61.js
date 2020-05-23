import{A as a,bk as s,S as t,ai as e,v as n,a1 as o,az as i,ak as r}from"./calfSystem-01eb06ed.js"
import"./dontPost-05b11a96.js"
import"./numberIsNaN-5d7b8ccd.js"
import"./setTipped-483fb9d0.js"
import"./all-6b303efd.js"
import"./allthen-385cdb7e.js"
import"./lvlTests-bc179c25.js"
import"./loadDataTables-00c29ac6.js"
import{i as c}from"./arena-9a4087b6.js"
import"./changeMinMax-dc4e1ad0.js"
import"./assets-9c2cb0ff.js"
import"./updateUrl-3475ad70.js"
import"./arena-7178bf3d.js"
function p(a,s){const t=s||{}
t[a]=i,r("fsh_arenaFull",t)}export default function(){a("arenaTypeTabs")?c():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=t('#pCC input[name="pvp_id"]').value
e("fsh_arenaFull").then(n(p,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-662e1f61.js.map
