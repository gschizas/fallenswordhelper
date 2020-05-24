import{j as t,a as e,g as n,b as a,p as s,d as r,c as o,o as c,i,e as f,f as d,h as m,k as u,l as p,m as l,t as h}from"./calfSystem-d587d232.js"
import{c as g}from"./createInput-f5f615ed.js"
import{c as N}from"./createLabel-d01980d0.js"
import"./makeFolderSpan-a22e75b6.js"
import{m as b}from"./makeFolderSpans-8bc20ae8.js"
import"./getInventory-0d251a2b.js"
import{g as j}from"./getInventoryById-a2479f17.js"
let k,y,E,I,L,v=0
function S(t){const e=u(),n=t[0].parentNode
d(e,n),d(L,e)}function F(t){const e=t[0].parentNode.parentNode
h(e,function(t){return 0!==v&&t[2]!==v}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(k.parentNode,L),l(k)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==v&&(v=e,M())}function C(t){const e=E[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&k){E=t.items,e(4,P)
!function(t){if("crafting"===o.cmd)return void(I={checked:!1})
const e=N({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),f(I,"change",M),d(e,I),i(t," &ensp;"),d(t,e)}(function(t){const e=k.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,x),i(e,b(t,!0)),e}(t.folders))}}function q(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function B(){k=function(){const t=a(r,s.lastElementChild)
return"crafting"===o.cmd?t[1]:t[0]}(),y=n("img",k).map(q)}export default function(){t()&&(j().then(V),e(3,B))}
//# sourceMappingURL=craftForge-5cb933a8.js.map
