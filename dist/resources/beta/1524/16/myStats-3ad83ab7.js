import{a2 as e,c as r}from"./calfSystem-9554b525.js"
import{p as t}from"./playerName-855f1e8d.js"
import{g as n,s}from"./idb-e27acc21.js"
import{g as a}from"./getProfile-7babcba2.js"
function f(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return a(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-3ad83ab7.js.map
