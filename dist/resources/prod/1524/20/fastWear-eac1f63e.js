import{k as a,U as t,z as e,t as n,A as s,D as o,l as c,f as r,y as i,B as f,a as p,o as l}from"./calfSystem-03970067.js"
import"./dialogMsg-9c4f0c44.js"
import"./ajaxReturnCode-f8cf1a95.js"
import"./dialog-d5dff1df.js"
import"./indexAjaxJson-d04ad897.js"
import"./errorDialog-2397605e.js"
import"./daUseItem-b89c80c7.js"
import{e as d,u as m}from"./useItem-79767d67.js"
import{g as u,m as b}from"./monkeyBp-70fd4236.js"
function k([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,c){t("profile","fastAction - "+c)
const{target:r}=s,i=r.parentNode.parentNode.children[0].dataset.inv
e("",r),r.className="fastAction fshSpinner fshSpinner12",o(i).then(n(k,[a,c,r,i]))}function j(t,e){a("fastWear",e.target)&&g(t,e,d,"Worn"),a("fastUse",e.target)&&g(t,e,m,"Used")}function x(a){return a?"Use":"Wear"}function h(t,e){const n=a("backpackContextMenuUsable",e),s=c({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&r(s,e.parentNode.nextElementSibling.nextElementSibling),r(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(h,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),b(a,N),0!==f(i("backpack_current")).length&&p(3,N,[a]),l(i("backpackContainer"),n(j,a))}export default function(){const a=u()
a&&S(a)}
//# sourceMappingURL=fastWear-eac1f63e.js.map
