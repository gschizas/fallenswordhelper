import{a4 as e,c as r}from"./calfSystem-2741d97b.js"
import{p as t}from"./playerName-5fbf0efe.js"
import{g as f,s as n}from"./idb-cb4fc9f9.js"
import{g as s}from"./getProfile-4599c389.js"
function o(e){return n("fsh_selfProfile",e),e}function a(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(a).then(o)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-34e94e53.js.map
