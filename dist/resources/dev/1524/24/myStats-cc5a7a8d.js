import{a7 as e,c as r}from"./calfSystem-38898f3e.js"
import{p as t}from"./playerName-b488fc7a.js"
import{g as n,s as f}from"./idb-ccc44752.js"
import{g as s}from"./getProfile-26340e43.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-cc5a7a8d.js.map
