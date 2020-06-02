import{a7 as e,c as r}from"./calfSystem-1c103624.js"
import{p as t}from"./playerName-191d9509.js"
import{g as n,s}from"./idb-347cc2af.js"
import{g as a}from"./getProfile-73a4ea38.js"
function f(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return a(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-5c94e0f9.js.map
