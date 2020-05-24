import{by as e}from"./calfSystem-d587d232.js"
import{d as a}from"./dialogMsg-8c5a22d3.js"
import{d as r}from"./dialog-f9fad105.js"
import{a as s}from"./ajaxReturnCode-b9bc06f8.js"
import{d as t}from"./daUseItem-3fde36ea.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&a(e.e.message),e}function n(a){return e({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}function m(e){return t(e).then(o).then(s)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-00e6e986.js.map
