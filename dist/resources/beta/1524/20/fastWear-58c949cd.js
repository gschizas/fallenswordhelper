import{k as a,U as t,z as e,t as n,A as s,D as o,l as c,f as r,y as i,B as p,a as f,o as b}from"./calfSystem-05554bae.js"
import"./dialogMsg-08e9871c.js"
import"./ajaxReturnCode-b35db638.js"
import"./dialog-dbf38e71.js"
import"./indexAjaxJson-c1c386d4.js"
import"./errorDialog-c3ecbb54.js"
import"./daUseItem-708f5aaa.js"
import{e as l,u as m}from"./useItem-a504c922.js"
import{g as u,m as d}from"./monkeyBp-5e781371.js"
function k([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,c){t("profile","fastAction - "+c)
const{target:r}=s,i=r.parentNode.parentNode.children[0].dataset.inv
e("",r),r.className="fastAction fshSpinner fshSpinner12",o(i).then(n(k,[a,c,r,i]))}function j(t,e){a("fastWear",e.target)&&g(t,e,l,"Worn"),a("fastUse",e.target)&&g(t,e,m,"Used")}function x(a){return a?"Use":"Wear"}function h(t,e){const n=a("backpackContextMenuUsable",e),s=c({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&r(s,e.parentNode.nextElementSibling.nextElementSibling),r(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(h,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),d(a,N),0!==p(i("backpack_current")).length&&f(3,N,[a]),b(i("backpackContainer"),n(j,a))}export default function(){const a=u()
a&&S(a)}
//# sourceMappingURL=fastWear-58c949cd.js.map
