import{j as t,a as e,g as n,b as s,p as a,c,e as r,o,i,f,h as d,k as m,l as u,m as p,n as l,t as h}from"./calfSystem-70c0e373.js"
import{c as g}from"./createInput-0bc2f786.js"
import{c as N}from"./createLabel-1ae85585.js"
import"./makeFolderSpan-c9b6c6b8.js"
import{m as b}from"./makeFolderSpans-14f8e6d0.js"
import"./getInventory-0fb29989.js"
import{g as j}from"./getInventoryById-038c6837.js"
let k,y,E,I,L,v=0
function S(t){const e=u(),n=t[0].parentNode
d(e,n),d(L,e)}function F(t){const e=t[0].parentNode.parentNode
h(e,function(t){return 0!==v&&t[2]!==v}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(k.parentNode,L),l(k)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==v&&(v=e,M())}function C(t){const e=E[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&k){E=t.items,e(4,P),function(t){if("crafting"===r.cmd)return void(I={checked:!1})
const e=N({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),f(I,"change",M),d(e,I),i(t," &ensp;"),d(t,e)}(function(t){const e=k.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),o(e,x),i(e,b(t,!0)),e}(t.folders))}}function q(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function B(){k=function(){const t=s(c,a.lastElementChild)
return"crafting"===r.cmd?t[1]:t[0]}(),y=n("img",k).map(q)}export default function(){t()&&(j().then(V),e(3,B))}
//# sourceMappingURL=craftForge-ff0b0243.js.map
