import{d as e}from"./dialog-2c5b535b.js"
import{i as r}from"./indexAjaxJson-e79ad7ee.js"
import{d as o}from"./daUseItem-be1ad8f6.js"
import{e as a}from"./errorDialog-56c5d78c.js"
function s(o){return r({cmd:"profile",subcmd:"equipitem",inventory_id:o,ajax:1}).then(e)}const t=e=>({...e,r:e.s?0:1})
function i(e){return o(e).then(a).then(t)}export{t as a,s as e,i as u}
//# sourceMappingURL=useItem-131d8a6a.js.map
