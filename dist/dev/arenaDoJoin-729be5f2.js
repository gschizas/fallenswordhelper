import{A as a,bk as s,S as e,ai as t,v as n,a1 as o,az as i,ak as r}from"./calfSystem-94018cd0.js"
import"./dontPost-cebe2d2a.js"
import"./numberIsNaN-b4c6efab.js"
import"./all-e6dbe465.js"
import"./allthen-55ea9059.js"
import"./lvlTests-80d9f538.js"
import"./loadDataTables-1819f403.js"
import{i as f}from"./arena-73e5dfc5.js"
import"./changeMinMax-02149fd9.js"
import"./assets-3b7e982f.js"
import"./updateUrl-48eff90a.js"
import"./arena-e6f62ae5.js"
function l(a,s){const e=s||{}
e[a]=i,r("fsh_arenaFull",e)}export default function(){a("arenaTypeTabs")?f():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=e('#pCC input[name="pvp_id"]').value
t("fsh_arenaFull").then(n(l,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-729be5f2.js.map
