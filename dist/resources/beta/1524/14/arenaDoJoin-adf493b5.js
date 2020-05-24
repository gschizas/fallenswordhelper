import{z as a,bf as s,Q as e,ag as t,u as o,$ as i,av as n,ai as r}from"./calfSystem-371c414c.js"
import"./isArray-f2e9e1ad.js"
import"./dontPost-0ae0f7ca.js"
import"./numberIsNaN-987e3021.js"
import"./setTipped-a7231de6.js"
import"./all-93023d41.js"
import"./allthen-691ee788.js"
import"./lvlTests-9314ee2e.js"
import"./loadDataTables-60dc642e.js"
import{i as p}from"./arena-c3478470.js"
import"./changeMinMax-d2b3357a.js"
import"./assets-810a369c.js"
import"./updateUrl-2acd4160.js"
function c(a,s){const e=s||{}
e[a]=n,r("fsh_arenaFull",e)}export default function(){a("arenaTypeTabs")?p():function(){const a=s()
if(!function(a){return a&&a.includes("combat move")}(a))if(function(a){return a&&a.includes("your guild")}(a)){const a=e('#pCC input[name="pvp_id"]').value
t("fsh_arenaFull").then(o(c,a))}else i("arena","doJoin",a)}()}
//# sourceMappingURL=arenaDoJoin-adf493b5.js.map
