import{a7 as e,c as r}from"./calfSystem-d49dbbd3.js"
import{p as t}from"./playerName-7c21a13e.js"
import{g as n,s as a}from"./idb-a6d1a1ba.js"
import{g as s}from"./getProfile-c6e60ebe.js"
function f(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-eb8dd16b.js.map
