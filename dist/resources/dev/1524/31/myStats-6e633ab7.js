import{a5 as e,c as r}from"./calfSystem-393ab895.js"
import{g as t}from"./getProfile-9a170510.js"
import{p as n}from"./playerName-03162bd7.js"
import{g as s,s as a}from"./idb-46b78b1e.js"
function f(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return t(n()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():s("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-6e633ab7.js.map
