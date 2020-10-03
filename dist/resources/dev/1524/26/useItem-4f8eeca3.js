import{e}from"./errorDialog-4ea6fda9.js"
import{i as r}from"./indexAjaxJson-b9139aa9.js"
import{d as a}from"./daUseItem-b11ce4dc.js"
import{d as o}from"./dialog-e2d24ff9.js"
function s(e){return r({cmd:"profile",subcmd:"equipitem",inventory_id:e,ajax:1}).then(o)}const t=e=>({...e,r:e.s?0:1})
function i(r){return a(r).then(e).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-4f8eeca3.js.map
