import{a4 as e,c as r}from"./calfSystem-964f4fc9.js"
import{p as t}from"./playerName-19c0b1a7.js"
import{g as f,s as n}from"./idb-be8b4ca8.js"
import{g as s}from"./getProfile-3533f915.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-2f916737.js.map
