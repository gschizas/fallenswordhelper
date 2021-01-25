import{a6 as e,c as r}from"./calfSystem-19a5d332.js"
import{g as t}from"./getProfile-d128b80b.js"
import{p as n}from"./playerName-09521e4e.js"
import{g as f,s}from"./idb-faef0351.js"
function a(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return t(n()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-1a3a33f7.js.map
