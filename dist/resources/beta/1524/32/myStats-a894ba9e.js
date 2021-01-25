import{a5 as e,c as r}from"./calfSystem-26bcf570.js"
import{g as t}from"./getProfile-04622a4b.js"
import{p as f}from"./playerName-7d235e41.js"
import{g as n,s}from"./idb-47b3fdf8.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return t(f()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-a894ba9e.js.map
