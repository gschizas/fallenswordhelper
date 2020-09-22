import{a4 as e,c as r}from"./calfSystem-019a589c.js"
import{p as t}from"./playerName-6eb83d57.js"
import{g as n,s}from"./idb-6718e849.js"
import{g as f}from"./getProfile-d07ee573.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-ff3f54d8.js.map
