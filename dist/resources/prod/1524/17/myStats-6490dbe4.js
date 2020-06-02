import{a2 as e,c as r}from"./calfSystem-dec5e071.js"
import{p as t}from"./playerName-aa4fbcf3.js"
import{g as f,s as n}from"./idb-8fe34e30.js"
import{g as s}from"./getProfile-f1e3acc1.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-6490dbe4.js.map
