import{bz as e}from"./calfSystem-72fdbe97.js"
import{d as r}from"./dialogMsg-efcd2089.js"
import{d as s}from"./dialog-9c6ee33b.js"
import{a as t}from"./ajaxReturnCode-e0b3c2c2.js"
import{d as a}from"./daUseItem-dc556c06.js"
function o(e){return!e.s&&function(e){return e.e&&e.e.message}(e)&&r(e.e.message),e}function n(r){return e({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}function m(e){return a(e).then(o).then(t)}export{n as a,o as e,m as u}
//# sourceMappingURL=useItem-022a28bb.js.map
