import{a4 as e,c as r}from"./calfSystem-1b876afa.js"
import{p as t}from"./playerName-14ec00f6.js"
import{g as f,s as n}from"./idb-0681f9af.js"
import{g as a}from"./getProfile-712ac5b2.js"
function s(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return a(t()).then(o).then(s)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-ab6896d7.js.map
