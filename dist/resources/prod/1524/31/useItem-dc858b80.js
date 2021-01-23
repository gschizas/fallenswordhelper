import{d as e}from"./dialog-d161529e.js"
import{i as r}from"./indexAjaxJson-d7e2ce82.js"
import{d as o}from"./daUseItem-5d872d5f.js"
import{e as s}from"./errorDialog-9d880b0d.js"
function t(o){return r({cmd:"profile",subcmd:"equipitem",inventory_id:o,ajax:1}).then(e)}const i=e=>({...e,r:e.s?0:1})
function a(e){return o(e).then(s).then(i)}export{i as a,t as e,a as u}
//# sourceMappingURL=useItem-dc858b80.js.map
