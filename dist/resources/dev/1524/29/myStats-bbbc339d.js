import{a7 as e,c as r}from"./calfSystem-02c48ff5.js"
import{p as t}from"./playerName-5ca71009.js"
import{g as n,s as f}from"./idb-49c5b621.js"
import{g as s}from"./getProfile-a7de2d2c.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-bbbc339d.js.map
