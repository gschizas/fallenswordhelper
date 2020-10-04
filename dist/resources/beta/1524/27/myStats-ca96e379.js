import{a5 as e,c as r}from"./calfSystem-70c7a660.js"
import{p as t}from"./playerName-d7dd0a91.js"
import{g as n,s as a}from"./idb-d93da5f0.js"
import{g as f}from"./getProfile-62d13fa3.js"
function s(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(s)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-ca96e379.js.map
