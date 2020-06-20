import{l as a,U as t,z as e,t as n,A as s,D as o,m as r,h as c,y as i,B as f,a as p,o as l}from"./calfSystem-2741d97b.js"
import"./dialogMsg-edf7150f.js"
import"./errorDialog-f01fb95d.js"
import"./indexAjaxJson-2aa42945.js"
import"./daUseItem-12439299.js"
import"./dialog-594eeb25.js"
import{e as m,u as b}from"./useItem-fa0d7a83.js"
import{g as u,m as d}from"./monkeyBp-04f3ee9f.js"
function k([a,t,e,n],o){0===o.r?(!function(a,t){const e=a.srcData.findIndex(a=>a.a===t);-1!==e&&a.srcData.splice(e,1)}(a,n),e.classList.remove("fshSpinner"),s(`<span class="fastWorn">${t}</span>`,e.parentNode)):e.remove()}function g(a,s,o,r){t("profile","fastAction - "+r)
const{target:c}=s,i=c.parentNode.parentNode.children[0].dataset.inv
e("",c),c.blur(),c.className="fastAction fshBl fshSpinner fshSpinner12",o(i).then(n(k,[a,r,c,i]))}function h(t,e){a("fastWear",e.target)&&g(t,e,m,"Worn"),a("fastUse",e.target)&&g(t,e,b,"Used")}function x(a){return a?"Use":"Wear"}function j(t,e){const n=a("backpackContextMenuUsable",e),s=r({className:"fastDiv",innerHTML:`<button class="fshBl fastAction ${o=n,o?"fastUse":"fastWear"}">${x(n)}</button>`})
var o
t.options.checkboxesEnabled&&c(s,e.parentNode.nextElementSibling.nextElementSibling),c(e.parentNode.parentNode,s)}function N(a){o(`#backpackTab_${a.type.toString()} .backpackContextMenuEquippable, #backpackTab_${a.type.toString()} .backpackContextMenuUsable`).forEach(n(j,a))}function S(a){!function(){const a=i("backpack")
a.className="fshBackpack",a.removeAttribute("style")}(),d(a,N),0!==f(i("backpack_current")).length&&p(3,N,[a]),l(i("backpackContainer"),n(h,a))}export default function(){const a=u()
a&&S(a)}
//# sourceMappingURL=fastWear-2bafa58f.js.map
