import{a7 as e,c as r}from"./calfSystem-54df10e3.js"
import{p as t}from"./playerName-8f1e4e48.js"
import{g as f,s as n}from"./idb-7f0d2b39.js"
import{g as s}from"./getProfile-7795dbc9.js"
function o(e){return n("fsh_selfProfile",e),e}function a(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(a).then(o)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-e2765689.js.map
