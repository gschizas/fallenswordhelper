import{a2 as e,c as r}from"./calfSystem-8b6534a5.js"
import{p as t}from"./playerName-bb9c2b65.js"
import{g as a,s as n}from"./idb-abce8d8d.js"
import{g as s}from"./getProfile-7daaa2a5.js"
function f(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():a("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-eb7eae50.js.map
