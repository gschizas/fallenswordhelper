import{e}from"./errorDialog-8d3200e2.js"
import{i as r}from"./indexAjaxJson-2402e0e9.js"
import{d as o}from"./daUseItem-488c4cbf.js"
import{d as s}from"./dialog-ca00f6b8.js"
function t(e){return r({cmd:"profile",subcmd:"equipitem",inventory_id:e,ajax:1}).then(s)}const a=e=>({...e,r:e.s?0:1})
function i(r){return o(r).then(e).then(a)}export{a,t as e,i as u}
//# sourceMappingURL=useItem-67dcfae2.js.map
