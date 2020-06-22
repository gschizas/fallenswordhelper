import{a4 as e,c as r}from"./calfSystem-d04e4be4.js"
import{p as t}from"./playerName-a036237e.js"
import{g as n,s}from"./idb-0492f5ed.js"
import{g as a}from"./getProfile-ceaa4d67.js"
function f(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return a(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-ddaad240.js.map
