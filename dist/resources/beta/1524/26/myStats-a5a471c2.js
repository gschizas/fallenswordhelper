import{a4 as e,c as r}from"./calfSystem-cf4d22a7.js"
import{p as t}from"./playerName-b9ef36e6.js"
import{g as f,s as n}from"./idb-4798970d.js"
import{g as s}from"./getProfile-ff141b7e.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-a5a471c2.js.map
