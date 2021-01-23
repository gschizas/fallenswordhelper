import{d as e}from"./dialog-d161529e.js"
import{i as r}from"./indexAjaxJson-be24760c.js"
import{d as o}from"./daUseItem-f2fce1a1.js"
import{e as s}from"./errorDialog-9d880b0d.js"
function t(o){return r({cmd:"profile",subcmd:"equipitem",inventory_id:o,ajax:1}).then(e)}const a=e=>({...e,r:e.s?0:1})
function i(e){return o(e).then(s).then(a)}export{a,t as e,i as u}
//# sourceMappingURL=useItem-cee16f1c.js.map
