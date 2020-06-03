import{a7 as e,c as r}from"./calfSystem-5545a3e6.js"
import{p as t}from"./playerName-546a1209.js"
import{g as n,s as a}from"./idb-ab1a88c6.js"
import{g as s}from"./getProfile-462e8b38.js"
function f(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-f536bf5b.js.map
