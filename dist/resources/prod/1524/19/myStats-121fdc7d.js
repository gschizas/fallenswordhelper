import{a2 as e,c as r}from"./calfSystem-6fc0cc1b.js"
import{p as t}from"./playerName-958718a3.js"
import{g as n,s as f}from"./idb-92d6a2b5.js"
import{g as s}from"./getProfile-caf96531.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-121fdc7d.js.map
