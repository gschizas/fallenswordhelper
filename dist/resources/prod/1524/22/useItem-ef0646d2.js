import{e as r}from"./errorDialog-e5c2f840.js"
import{i as e}from"./indexAjaxJson-73d427c9.js"
import{d as o}from"./daUseItem-d85e7388.js"
import{d as s}from"./dialog-8f80d849.js"
function t(r){return e({cmd:"profile",subcmd:"equipitem",inventory_id:r,ajax:1}).then(s)}const i=r=>({...r,r:r.s?0:1})
function a(e){return o(e).then(r).then(i)}export{i as a,t as e,a as u}
//# sourceMappingURL=useItem-ef0646d2.js.map
