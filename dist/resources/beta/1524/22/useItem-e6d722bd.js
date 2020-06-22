import{e as r}from"./errorDialog-6c21b95b.js"
import{i as e}from"./indexAjaxJson-1a78cb06.js"
import{d as o}from"./daUseItem-e61c4c91.js"
import{d as s}from"./dialog-e9943726.js"
function t(r){return e({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}const a=r=>({...r,r:r.s?0:1})
function i(e){return o(e).then(r).then(a)}export{a,t as e,i as u}
//# sourceMappingURL=useItem-e6d722bd.js.map
