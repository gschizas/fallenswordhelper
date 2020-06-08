import{a7 as e,c as r}from"./calfSystem-a2862afc.js"
import{p as t}from"./playerName-72c7301a.js"
import{g as a,s as f}from"./idb-911ff7c2.js"
import{g as n}from"./getProfile-57a9a6d7.js"
function s(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return n(t()).then(o).then(s)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():a("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-8612677a.js.map
