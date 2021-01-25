import{d as r}from"./dialog-2c5b535b.js"
import{i as e}from"./indexAjaxJson-bdfce70d.js"
import{d as o}from"./daUseItem-9248e8fc.js"
import{e as s}from"./errorDialog-56c5d78c.js"
function t(o){return e({cmd:"profile",subcmd:"equipitem",inventory_id:o,ajax:1}).then(r)}const i=r=>({...r,r:r.s?0:1})
function a(r){return o(r).then(s).then(i)}export{i as a,t as e,a as u}
//# sourceMappingURL=useItem-15a1e3d7.js.map
