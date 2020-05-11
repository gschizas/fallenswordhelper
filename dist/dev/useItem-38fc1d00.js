import{bF as e}from"./calfSystem-8dc0fa4b.js"
import{d as r}from"./dialogMsg-7427fbc4.js"
import{d as s}from"./dialog-f4d2194e.js"
import{a as t}from"./ajaxReturnCode-c433c790.js"
import{d as a}from"./daUseItem-b72fd30b.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&r(e.e.message),e}function n(r){return e({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}function m(e){return a(e).then(o).then(t)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-38fc1d00.js.map
