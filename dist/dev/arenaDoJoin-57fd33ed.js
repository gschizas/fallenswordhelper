import{A as a,bk as s,S as e,ai as t,v as n,a1 as o,az as i,ak as r}from"./calfSystem-0e5d6faf.js"
import"./dontPost-2f9bbd28.js"
import"./numberIsNaN-a4c8282b.js"
import"./setTipped-a747706b.js"
import"./all-9248ebd2.js"
import"./allthen-ecc09c9c.js"
import"./lvlTests-6c0bd1bb.js"
import"./loadDataTables-6dbe583c.js"
import{i as p}from"./arena-da57e22e.js"
import"./changeMinMax-ba462eb9.js"
import"./assets-e88e9d09.js"
import"./updateUrl-1997a60e.js"
import"./arena-52bce975.js"
function c(a,s){const e=s||{}
e[a]=i,r("fsh_arenaFull",e)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=e('#pCC input[name="pvp_id"]').value
t("fsh_arenaFull").then(n(c,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-57fd33ed.js.map
