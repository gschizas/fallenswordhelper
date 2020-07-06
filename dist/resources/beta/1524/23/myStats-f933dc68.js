import{a4 as e,c as r}from"./calfSystem-34fcd691.js"
import{p as t}from"./playerName-d0ea3aa5.js"
import{g as n,s as f}from"./idb-62d2605f.js"
import{g as s}from"./getProfile-5811c437.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-f933dc68.js.map
