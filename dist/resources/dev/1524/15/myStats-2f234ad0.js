import{a5 as e,a7 as t,aB as r,c as n}from"./calfSystem-ee582533.js"
import{p as a}from"./playerName-e40f24e0.js"
import{g as f}from"./getProfile-46c78d5c.js"
function s(e){return t("fsh_selfProfile",e),e}function o(e){return e?{...e,lastUpdate:r}:e}function i(){return f(a()).then(o).then(s)}function l(e){return!e||e.lastUpdate<r-n.allyEnemyOnlineRefreshTime?i():e}function m(t){return t?i():e("fsh_selfProfile").then(l)}export{m}
//# sourceMappingURL=myStats-2f234ad0.js.map
