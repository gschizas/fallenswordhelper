import{e}from"./errorDialog-4ea6fda9.js"
import{i as r}from"./indexAjaxJson-a651394e.js"
import{d as o}from"./daUseItem-ee0641fb.js"
import{d as a}from"./dialog-e2d24ff9.js"
function s(e){return r({cmd:"profile",subcmd:"equipitem",inventory_id:e,ajax:1}).then(a)}const t=e=>({...e,r:e.s?0:1})
function i(r){return o(r).then(e).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-4c56a939.js.map
