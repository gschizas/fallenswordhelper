import{e as r}from"./errorDialog-8d3200e2.js"
import{i as o}from"./indexAjaxJson-424248bd.js"
import{d as e}from"./daUseItem-31373cd9.js"
import{d as s}from"./dialog-ca00f6b8.js"
function t(r){return o({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}const a=r=>({...r,r:r.s?0:1})
function i(o){return e(o).then(r).then(a)}export{a,t as e,i as u}
//# sourceMappingURL=useItem-5653e281.js.map
