import{a2 as e,c as r}from"./calfSystem-57340987.js"
import{p as t}from"./playerName-8027bacf.js"
import{g as f,s as n}from"./idb-c55e2904.js"
import{g as s}from"./getProfile-63915fbf.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-aab3f9c7.js.map
