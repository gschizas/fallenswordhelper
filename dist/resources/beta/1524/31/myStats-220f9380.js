import{a4 as e,c as r}from"./calfSystem-47fc08ae.js"
import{g as t}from"./getProfile-a2615c2b.js"
import{p as n}from"./playerName-118d0325.js"
import{g as f,s}from"./idb-b72d80f0.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return t(n()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-220f9380.js.map
