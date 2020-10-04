import{e}from"./errorDialog-7f9c11b0.js"
import{i as r}from"./indexAjaxJson-4ca9de3e.js"
import{d as o}from"./daUseItem-3db6debf.js"
import{d as a}from"./dialog-370f639a.js"
function s(e){return r({cmd:"profile",subcmd:"equipitem",inventory_id:e,ajax:1}).then(a)}const t=e=>({...e,r:e.s?0:1})
function i(r){return o(r).then(e).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-08f466b8.js.map
