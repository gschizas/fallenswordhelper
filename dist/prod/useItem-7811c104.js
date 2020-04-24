import{bz as e}from"./calfSystem-3956a623.js"
import{d as a}from"./dialogMsg-6c4a948a.js"
import{d as r}from"./dialog-a6efa002.js"
import{a as s}from"./ajaxReturnCode-69077631.js"
import{d as t}from"./daUseItem-35f02c30.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&a(e.e.message),e}function n(a){return e({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}function m(e){return t(e).then(o).then(s)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-7811c104.js.map
