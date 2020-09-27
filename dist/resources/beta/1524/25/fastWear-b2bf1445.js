import{l as a,U as t,z as e,t as n,A as s,D as o,m as c,h as r,y as i,B as p,a as f,o as l}from"./calfSystem-d3aab5a8.js"
import"./dialogMsg-1f890a82.js"
import"./errorDialog-c0c5c278.js"
import"./indexAjaxJson-86b35353.js"
import"./daUseItem-8a180504.js"
import"./dialog-294b8a9c.js"
import{e as b,u as m}from"./useItem-b82e4c72.js"
import{g as u,m as k}from"./monkeyBp-bf541512.js"
function d([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,c){t("profile","fastAction - "+c)
const{target:r}=s,i=r.parentNode.parentNode.children[0].dataset.inv
e("",r),r.blur(),r.className="fastAction fshBl fshSpinner fshSpinner12",o(i).then(n(d,[a,c,r,i]))}function h(t,e){a("fastWear",e.target)&&g(t,e,b,"Worn"),a("fastUse",e.target)&&g(t,e,m,"Used")}function x(a){return a?"Use":"Wear"}function j(t,e){const n=a("backpackContextMenuUsable",e),s=c({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&r(s,e.parentNode.nextElementSibling.nextElementSibling),r(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(j,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),k(a,N),0!==p(i("backpack_current")).length&&f(3,N,[a]),l(i("backpackContainer"),n(h,a))}function U(){const a=u()
a&&S(a)}export default U
//# sourceMappingURL=fastWear-b2bf1445.js.map
