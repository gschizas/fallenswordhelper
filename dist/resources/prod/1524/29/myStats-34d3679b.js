import{a4 as e,c as r}from"./calfSystem-57628ebe.js"
import{p as t}from"./playerName-d617838d.js"
import{g as n,s as f}from"./idb-5c863a6f.js"
import{g as s}from"./getProfile-905245f8.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-34d3679b.js.map
