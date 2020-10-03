import{a7 as e,c as r}from"./calfSystem-4991bf5b.js"
import{p as t}from"./playerName-69861ead.js"
import{g as n,s}from"./idb-ee31c042.js"
import{g as f}from"./getProfile-80a3e208.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-71b5ed12.js.map
