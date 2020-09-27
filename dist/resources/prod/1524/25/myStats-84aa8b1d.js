import{a4 as e,c as r}from"./calfSystem-71b9378d.js"
import{p as t}from"./playerName-17bbea9d.js"
import{g as n,s}from"./idb-97e2a44e.js"
import{g as a}from"./getProfile-63a4e7bf.js"
function f(e){return s("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return a(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-84aa8b1d.js.map
