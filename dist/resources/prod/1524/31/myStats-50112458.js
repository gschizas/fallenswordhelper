import{a4 as e,c as r}from"./calfSystem-7aee5245.js"
import{g as t}from"./getProfile-d70516ae.js"
import{p as n}from"./playerName-87d03488.js"
import{g as s,s as a}from"./idb-12bca0fb.js"
function f(e){return a("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return t(n()).then(o).then(f)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():s("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-50112458.js.map
