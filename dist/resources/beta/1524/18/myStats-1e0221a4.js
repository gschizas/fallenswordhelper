import{a2 as e,c as r}from"./calfSystem-4197cc22.js"
import{p as t}from"./playerName-8ec525d6.js"
import{g as n,s as f}from"./idb-f3252f63.js"
import{g as s}from"./getProfile-92484501.js"
function o(e){return f("fsh_selfProfile",e),e}function a(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(a).then(o)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-1e0221a4.js.map
