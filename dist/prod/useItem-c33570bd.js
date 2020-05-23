import{bz as e}from"./calfSystem-4b4fbec4.js"
import{d as r}from"./dialogMsg-c72266dd.js"
import{d as s}from"./dialog-00707b06.js"
import{a as t}from"./ajaxReturnCode-ca9b4e78.js"
import{d as a}from"./daUseItem-558e2d04.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&r(e.e.message),e}function n(r){return e({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}function m(e){return a(e).then(o).then(t)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-c33570bd.js.map
