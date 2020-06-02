import{a2 as e,c as r}from"./calfSystem-be09bdff.js"
import{p as t}from"./playerName-73d6a463.js"
import{g as f,s as n}from"./idb-a63ec135.js"
import{g as s}from"./getProfile-394c4f03.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-c8681855.js.map
