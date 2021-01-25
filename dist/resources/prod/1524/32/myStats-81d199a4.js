import{a5 as e,c as r}from"./calfSystem-45544049.js"
import{g as t}from"./getProfile-bf9417e3.js"
import{p as n}from"./playerName-c1bcaeb9.js"
import{g as s,s as f}from"./idb-ca3578bc.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return t(n()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():s("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-81d199a4.js.map
