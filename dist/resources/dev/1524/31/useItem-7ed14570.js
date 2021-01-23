import{d as r}from"./dialog-d161529e.js"
import{i as e}from"./indexAjaxJson-f78a3fe6.js"
import{d as o}from"./daUseItem-796c6f75.js"
import{e as s}from"./errorDialog-9d880b0d.js"
function t(o){return e({cmd:"profile",subcmd:"equipitem",inventory_id:o,ajax:1}).then(r)}const a=r=>({...r,r:r.s?0:1})
function i(r){return o(r).then(s).then(a)}export{a,t as e,i as u}
//# sourceMappingURL=useItem-7ed14570.js.map
