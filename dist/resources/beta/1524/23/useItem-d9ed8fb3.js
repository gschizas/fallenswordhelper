import{e}from"./errorDialog-7f431a39.js"
import{i as r}from"./indexAjaxJson-951ebca2.js"
import{d as o}from"./daUseItem-36e8cc2b.js"
import{d as a}from"./dialog-2e17f157.js"
function s(e){return r({cmd:"profile",subcmd:"equipitem",inventory_id:e,ajax:1}).then(a)}const t=e=>({...e,r:e.s?0:1})
function i(r){return o(r).then(e).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-d9ed8fb3.js.map
