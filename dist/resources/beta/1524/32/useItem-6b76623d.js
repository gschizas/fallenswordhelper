import{d as r}from"./dialog-2c5b535b.js"
import{i as o}from"./indexAjaxJson-4dbe92a4.js"
import{d as a}from"./daUseItem-59aa06d0.js"
import{e}from"./errorDialog-56c5d78c.js"
function s(a){return o({cmd:"profile",subcmd:"equipitem",inventory_id:a,ajax:1}).then(r)}const t=r=>({...r,r:r.s?0:1})
function i(r){return a(r).then(e).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-6b76623d.js.map
