import{bF as e}from"./calfSystem-9b1fa4ca.js"
import{d as a}from"./dialogMsg-91ed6ec0.js"
import{d as r}from"./dialog-e9780cd9.js"
import{a as s}from"./ajaxReturnCode-a3777f53.js"
import{d as t}from"./daUseItem-d939d24c.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&a(e.e.message),e}function n(a){return e({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}function m(e){return t(e).then(o).then(s)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-7b4c354b.js.map
