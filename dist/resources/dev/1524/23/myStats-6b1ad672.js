import{a7 as e,c as f}from"./calfSystem-9901ad27.js"
import{p as r}from"./playerName-a0f4217f.js"
import{g as t,s as n}from"./idb-efff97cf.js"
import{g as a}from"./getProfile-fa400fda.js"
function s(e){return n("fsh_selfProfile",e),e}function o(f){return f?{...f,lastUpdate:e}:f}function i(){return a(r()).then(o).then(s)}function m(r){return!r||r.lastUpdate<e-f.allyEnemyOnlineRefreshTime?i():r}function l(e){return e?i():t("fsh_selfProfile").then(m)}export{l as m}
//# sourceMappingURL=myStats-6b1ad672.js.map
