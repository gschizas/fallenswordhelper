import{e as r}from"./errorDialog-7f9c11b0.js"
import{i as o}from"./indexAjaxJson-5033dc48.js"
import{d as e}from"./daUseItem-3dd70138.js"
import{d as s}from"./dialog-370f639a.js"
function t(r){return o({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}const a=r=>({...r,r:r.s?0:1})
function i(o){return e(o).then(r).then(a)}export{a,t as e,i as u}
//# sourceMappingURL=useItem-48f21584.js.map
