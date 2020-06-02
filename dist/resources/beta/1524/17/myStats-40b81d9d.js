import{a2 as e,c as r}from"./calfSystem-02ae8657.js"
import{p as t}from"./playerName-9873e3df.js"
import{g as n,s as f}from"./idb-ac1635f3.js"
import{g as s}from"./getProfile-de98ee56.js"
function a(e){return f("fsh_selfProfile",e),e}function o(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(o).then(a)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-40b81d9d.js.map
