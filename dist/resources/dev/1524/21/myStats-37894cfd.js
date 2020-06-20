import{a7 as e,c as r}from"./calfSystem-9c7241dc.js"
import{p as t}from"./playerName-ddecc25a.js"
import{g as n,s}from"./idb-5f8a9591.js"
import{g as f}from"./getProfile-57e44e9c.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function c(e){return e?i():n("fsh_selfProfile").then(m)}export{c as m}
//# sourceMappingURL=myStats-37894cfd.js.map
