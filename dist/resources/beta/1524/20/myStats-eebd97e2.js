import{a4 as e,c as r}from"./calfSystem-05554bae.js"
import{p as t}from"./playerName-0e65dbb6.js"
import{g as n,s}from"./idb-862da886.js"
import{g as a}from"./getProfile-dcbb4eb8.js"
function f(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return a(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-eebd97e2.js.map
