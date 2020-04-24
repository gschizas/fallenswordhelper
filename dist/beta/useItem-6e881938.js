import{bB as e}from"./calfSystem-c91e004c.js"
import{d as a}from"./dialogMsg-b1aec560.js"
import{d as r}from"./dialog-caf4fb39.js"
import{a as s}from"./ajaxReturnCode-775725b8.js"
import{d as t}from"./daUseItem-840bc991.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&a(e.e.message),e}function n(a){return e({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}function m(e){return t(e).then(o).then(s)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-6e881938.js.map
