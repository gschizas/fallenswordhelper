import{a8 as e,c as r}from"./calfSystem-ec5e5725.js"
import{p as t}from"./playerName-6b140f29.js"
import{g as n,s}from"./idb-cecca562.js"
import{g as f}from"./getProfile-4986c8b9.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function c(e){return e?i():n("fsh_selfProfile").then(m)}export{c as m}
//# sourceMappingURL=myStats-4fed9202.js.map
