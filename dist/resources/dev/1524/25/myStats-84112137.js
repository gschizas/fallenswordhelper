import{a7 as e,c as r}from"./calfSystem-69dd5601.js"
import{p as t}from"./playerName-688c2cbc.js"
import{g as n,s}from"./idb-874fe815.js"
import{g as f}from"./getProfile-6a2bd83d.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-84112137.js.map
