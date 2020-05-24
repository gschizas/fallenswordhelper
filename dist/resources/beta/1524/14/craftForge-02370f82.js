import{j as t,a as e,g as n,b as a,p as s,d as r,c as o,o as c,i as f,e as i,f as d,h as m,k as u,l as p,m as l,t as h}from"./calfSystem-371c414c.js"
import{c as g}from"./createInput-d378f9d2.js"
import{c as N}from"./createLabel-146da34f.js"
import"./makeFolderSpan-bdfb16a2.js"
import{m as j}from"./makeFolderSpans-46e3aef2.js"
import"./getInventory-998297f9.js"
import{g as b}from"./getInventoryById-9da95555.js"
let k,y,E,I,L,v=0
function S(t){const e=u(),n=t[0].parentNode
d(e,n),d(L,e)}function F(t){const e=t[0].parentNode.parentNode
h(e,function(t){return 0!==v&&t[2]!==v}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(k.parentNode,L),l(k)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==v&&(v=e,M())}function C(t){const e=E[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&k){E=t.items,e(4,P)
!function(t){if("crafting"===o.cmd)return void(I={checked:!1})
const e=N({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),i(I,"change",M),d(e,I),f(t," &ensp;"),d(t,e)}(function(t){const e=k.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,x),f(e,j(t,!0)),e}(t.folders))}}function q(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function B(){k=function(){const t=a(r,s.lastElementChild)
return"crafting"===o.cmd?t[1]:t[0]}(),y=n("img",k).map(q)}export default function(){t()&&(b().then(V),e(3,B))}
//# sourceMappingURL=craftForge-02370f82.js.map
