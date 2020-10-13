import{a7 as e,c as r}from"./calfSystem-b136673a.js"
import{p as t}from"./playerName-f933c87f.js"
import{g as n,s as f}from"./idb-c31665cb.js"
import{g as s}from"./getProfile-2262c384.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-a44245ae.js.map
