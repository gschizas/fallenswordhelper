import{k as a,V as t,z as e,t as n,A as s,D as o,l as c,f as r,y as i,B as f,a as p,o as l}from"./calfSystem-a2862afc.js"
import"./dialogMsg-98e801f7.js"
import"./ajaxReturnCode-f0b1c41c.js"
import"./dialog-65e58e09.js"
import"./indexAjaxJson-afc1ac85.js"
import"./errorDialog-a4de6042.js"
import"./daUseItem-10f8bb4a.js"
import{e as b,u as m}from"./useItem-8cd86b52.js"
import{g as u,m as k}from"./monkeyBp-5ceabc0f.js"
function d([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,c){t("profile","fastAction - "+c)
const{target:r}=s,i=r.parentNode.parentNode.children[0].dataset.inv
e("",r),r.className="fastAction fshSpinner fshSpinner12",o(i).then(n(d,[a,c,r,i]))}function j(t,e){a("fastWear",e.target)&&g(t,e,b,"Worn"),a("fastUse",e.target)&&g(t,e,m,"Used")}function x(a){return a?"Use":"Wear"}function h(t,e){const n=a("backpackContextMenuUsable",e),s=c({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&r(s,e.parentNode.nextElementSibling.nextElementSibling),r(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(h,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),k(a,N),0!==f(i("backpack_current")).length&&p(3,N,[a]),l(i("backpackContainer"),n(j,a))}export default function(){const a=u()
a&&S(a)}
//# sourceMappingURL=fastWear-9a2a95d6.js.map
