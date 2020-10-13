import{l as a,V as t,z as e,t as n,A as s,D as o,m as r,h as c,y as i,B as p,a as f,o as l}from"./calfSystem-b136673a.js"
import"./dialogMsg-8ea305bd.js"
import"./errorDialog-326900ed.js"
import"./indexAjaxJson-ea0d9bb9.js"
import"./daUseItem-35527aee.js"
import"./dialog-a12ad7bf.js"
import{e as b,u as m}from"./useItem-74f47923.js"
import{g as u,m as d}from"./monkeyBp-0d98be4f.js"
function k([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,r){t("profile","fastAction - "+r)
const{target:c}=s,i=c.parentNode.parentNode.children[0].dataset.inv
e("",c),c.blur(),c.className="fastAction fshBl fshSpinner fshSpinner12",o(i).then(n(k,[a,r,c,i]))}function h(t,e){a("fastWear",e.target)&&g(t,e,b,"Worn"),a("fastUse",e.target)&&g(t,e,m,"Used")}function x(a){return a?"Use":"Wear"}function j(t,e){const n=a("backpackContextMenuUsable",e),s=r({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&c(s,e.parentNode.nextElementSibling.nextElementSibling),c(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(j,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),d(a,N),0!==p(i("backpack_current")).length&&f(3,N,[a]),l(i("backpackContainer"),n(h,a))}function U(){const a=u()
a&&S(a)}export default U
//# sourceMappingURL=fastWear-1207311b.js.map
