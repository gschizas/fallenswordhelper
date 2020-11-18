import{a4 as e,c as r}from"./calfSystem-f9a27018.js"
import{p as t}from"./playerName-6c5f1f5b.js"
import{g as f,s as n}from"./idb-5c501cd3.js"
import{g as s}from"./getProfile-f70d5e2d.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-f6662cd8.js.map
