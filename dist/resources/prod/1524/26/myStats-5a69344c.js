import{a4 as e,c as r}from"./calfSystem-a5fc99d4.js"
import{p as t}from"./playerName-f44ad46e.js"
import{g as n,s as f}from"./idb-b13ab254.js"
import{g as s}from"./getProfile-5b3b85bb.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-5a69344c.js.map
