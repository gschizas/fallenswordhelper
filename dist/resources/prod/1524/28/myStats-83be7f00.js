import{a4 as e,c as r}from"./calfSystem-a5da5210.js"
import{p as t}from"./playerName-22f2b3f0.js"
import{g as n,s as a}from"./idb-2c141566.js"
import{g as f}from"./getProfile-9ac6489a.js"
function s(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return f(t()).then(o).then(s)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-83be7f00.js.map
