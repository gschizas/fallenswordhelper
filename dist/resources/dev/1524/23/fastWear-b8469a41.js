import{l as a,V as t,z as e,t as n,A as s,D as o,m as c,h as r,y as i,B as p,a as f,o as l}from"./calfSystem-9901ad27.js"
import"./dialogMsg-16e7e1c1.js"
import"./errorDialog-7f431a39.js"
import"./indexAjaxJson-93ae4cbc.js"
import"./daUseItem-87d3118a.js"
import"./dialog-2e17f157.js"
import{e as m,u as b}from"./useItem-7736a870.js"
import{g as u,m as k}from"./monkeyBp-19b69bf0.js"
function d([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,c){t("profile","fastAction - "+c)
const{target:r}=s,i=r.parentNode.parentNode.children[0].dataset.inv
e("",r),r.blur(),r.className="fastAction fshBl fshSpinner fshSpinner12",o(i).then(n(d,[a,c,r,i]))}function h(t,e){a("fastWear",e.target)&&g(t,e,m,"Worn"),a("fastUse",e.target)&&g(t,e,b,"Used")}function x(a){return a?"Use":"Wear"}function j(t,e){const n=a("backpackContextMenuUsable",e),s=c({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&r(s,e.parentNode.nextElementSibling.nextElementSibling),r(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(j,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),k(a,N),0!==p(i("backpack_current")).length&&f(3,N,[a]),l(i("backpackContainer"),n(h,a))}export default function(){const a=u()
a&&S(a)}
//# sourceMappingURL=fastWear-b8469a41.js.map
