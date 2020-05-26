import{x as a,bb as s,L as e,a4 as t,s as i,R as o,P as r,a6 as n}from"./calfSystem-740ec4d2.js"
import"./isArray-3eb52569.js"
import"./dontPost-e5e24e4d.js"
import"./numberIsNaN-2fbabd4d.js"
import"./setTipped-af58be0b.js"
import"./currentGuildId-ce4d8404.js"
import"./intValue-576c2dec.js"
import"./all-30e677b0.js"
import"./allthen-0a5c5fb9.js"
import"./lvlTests-7a00a4d1.js"
import"./loadDataTables-89aea7e0.js"
import{i as p}from"./arena-6fce05f8.js"
import"./changeMinMax-2c00e952.js"
import"./assets-6e314512.js"
import"./updateUrl-66484a50.js"
function l(a,s){const e=s||{}
e[a]=r,n("fsh_arenaFull",e)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=e('#pCC input[name="pvp_id"]').value
t("fsh_arenaFull").then(i(l,a))}else o("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-acee25fe.js.map
