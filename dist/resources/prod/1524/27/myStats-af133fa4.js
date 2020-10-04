import{a5 as e,c as r}from"./calfSystem-3bdf319e.js"
import{p as t}from"./playerName-26a1f7d9.js"
import{g as f,s as n}from"./idb-31fb041e.js"
import{g as s}from"./getProfile-ca7df963.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-af133fa4.js.map
