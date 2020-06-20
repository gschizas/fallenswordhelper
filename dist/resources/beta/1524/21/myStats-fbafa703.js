import{a4 as e,c as r}from"./calfSystem-89b939c8.js"
import{p as t}from"./playerName-8ec11865.js"
import{g as n,s}from"./idb-9be3057e.js"
import{g as f}from"./getProfile-82a0964d.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-fbafa703.js.map
