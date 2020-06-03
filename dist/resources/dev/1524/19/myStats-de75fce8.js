import{a7 as e,c as r}from"./calfSystem-f7574730.js"
import{p as t}from"./playerName-b7a62fcc.js"
import{g as f,s as n}from"./idb-14a57c5b.js"
import{g as s}from"./getProfile-3530a5f7.js"
function a(e){return n("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():f("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-de75fce8.js.map
