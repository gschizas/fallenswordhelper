import{a4 as e,c as r}from"./calfSystem-019de1cf.js"
import{p as t}from"./playerName-569fc693.js"
import{g as f,s as n}from"./idb-1bb3cee2.js"
import{g as s}from"./getProfile-88b6b0f8.js"
function o(e){return n("fsh_selfProfile",e),e}function a(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(a).then(o)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-8f657323.js.map
