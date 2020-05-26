import{a4 as e,a6 as t,ay as r,c as n}from"./calfSystem-1262535f.js"
import{p as a}from"./playerName-11654d0b.js"
import{g as f}from"./getProfile-4b51a044.js"
function s(e){return t("fsh_selfProfile",e),e}function o(e){return e?{...e,lastUpdate:r}:e}function i(){return f(a()).then(o).then(s)}function l(e){return!e||e.lastUpdate<r-n.allyEnemyOnlineRefreshTime?i():e}function m(t){return t?i():e("fsh_selfProfile").then(l)}export{m}
//# sourceMappingURL=myStats-385ffe62.js.map
