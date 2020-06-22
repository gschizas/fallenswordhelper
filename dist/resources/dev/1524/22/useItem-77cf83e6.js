import{e}from"./errorDialog-18ea8eb8.js"
import{i as r}from"./indexAjaxJson-39fb942e.js"
import{d as o}from"./daUseItem-01218301.js"
import{d as a}from"./dialog-dabd10c2.js"
function s(e){return r({cmd:"profile",subcmd:"equipitem",inventory_id:e,ajax:1}).then(a)}const t=e=>({...e,r:e.s?0:1})
function i(r){return o(r).then(e).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-77cf83e6.js.map
