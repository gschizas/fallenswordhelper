import{a4 as e,c as r}from"./calfSystem-d3aab5a8.js"
import{p as t}from"./playerName-6a2b4679.js"
import{g as a,s as f}from"./idb-f33380fa.js"
import{g as n}from"./getProfile-e3b95fab.js"
function s(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return n(t()).then(o).then(s)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():a("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-aed09f57.js.map
