import{bz as e}from"./calfSystem-d06402b1.js"
import{d as a}from"./dialogMsg-b515da3f.js"
import{d as r}from"./dialog-b58c95c9.js"
import{a as s}from"./ajaxReturnCode-ea0d33ed.js"
import{d as t}from"./daUseItem-63d94e0b.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&a(e.e.message),e}function n(a){return e({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}function m(e){return t(e).then(o).then(s)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-bfa65beb.js.map
