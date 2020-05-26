import{a4 as e,a6 as t,ay as r,c as n}from"./calfSystem-740ec4d2.js"
import{p as a}from"./playerName-a172b8d3.js"
import{g as s}from"./getProfile-b78d4980.js"
function f(e){return t("fsh_selfProfile",e),e}function o(e){return e?{...e,lastUpdate:r}:e}function i(){return s(a()).then(o).then(f)}function l(e){return!e||e.lastUpdate<r-n.allyEnemyOnlineRefreshTime?i():e}function m(t){return t?i():e("fsh_selfProfile").then(l)}export{m}
//# sourceMappingURL=myStats-54c00a23.js.map
