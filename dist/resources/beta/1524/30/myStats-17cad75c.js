import{a4 as e,c as r}from"./calfSystem-ebf4b17d.js"
import{p as t}from"./playerName-1bc13590.js"
import{g as n,s as f}from"./idb-b7d9067e.js"
import{g as s}from"./getProfile-45b98f95.js"
function o(e){return f("fsh_selfProfile",e),e}function a(r){return r?{...r,lastUpdate:e}:r}function i(){return s(t()).then(a).then(o)}function m(t){return!t||t.lastUpdate<e-r.allyEnemyOnlineRefreshTime?i():t}function l(e){return e?i():n("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-17cad75c.js.map
