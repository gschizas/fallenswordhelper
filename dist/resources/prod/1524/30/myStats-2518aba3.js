import{a4 as e,c as r}from"./calfSystem-6459f18a.js"
import{p as t}from"./playerName-d1c3e398.js"
import{g as n,s as f}from"./idb-737f325b.js"
import{g as s}from"./getProfile-65933826.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-2518aba3.js.map
