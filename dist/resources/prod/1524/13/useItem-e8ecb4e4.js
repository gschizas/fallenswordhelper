import{bz as e}from"./calfSystem-e6a24264.js"
import{d as a}from"./dialogMsg-4d5d1433.js"
import{d as r}from"./dialog-68e3f62f.js"
import{a as s}from"./ajaxReturnCode-7e7c2091.js"
import{d as t}from"./daUseItem-a5051f6e.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&a(e.e.message),e}function n(a){return e({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}function m(e){return t(e).then(o).then(s)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-e8ecb4e4.js.map
