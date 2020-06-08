import{a4 as e,c as r}from"./calfSystem-03970067.js"
import{p as t}from"./playerName-e0979c8e.js"
import{g as n,s}from"./idb-3dad9172.js"
import{g as f}from"./getProfile-f312a4e1.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-a0140457.js.map
