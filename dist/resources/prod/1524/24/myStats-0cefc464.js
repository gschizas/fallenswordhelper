import{a4 as e,c as r}from"./calfSystem-ec854151.js"
import{p as t}from"./playerName-f06eed80.js"
import{g as n,s as a}from"./idb-72ad0068.js"
import{g as s}from"./getProfile-3eaaacde.js"
function f(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-0cefc464.js.map
