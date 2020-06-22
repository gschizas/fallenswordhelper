import{a7 as e,c as r}from"./calfSystem-4cc738f8.js"
import{p as t}from"./playerName-2fd84b2a.js"
import{g as n,s as f}from"./idb-670c0cca.js"
import{g as s}from"./getProfile-29c38861.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function c(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function m(e){return e?i():n("fsh_selfProfile").then(c)}export{m}
//# sourceMappingURL=myStats-7b63c520.js.map
