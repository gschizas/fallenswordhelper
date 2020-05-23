import{j as e,a as t,g as n,b as s,p as a,c,e as r,o,i as f,f as i,h as d,k as m,l as u,m as p,n as l,t as h}from"./calfSystem-fb94ddf0.js"
import{c as b}from"./createInput-ba8eca60.js"
import{c as g}from"./createLabel-32cbbbf5.js"
import"./makeFolderSpan-e13ec5de.js"
import{m as N}from"./makeFolderSpans-1f5c7bd0.js"
import"./getInventory-f8a3b8e1.js"
import{g as j}from"./getInventoryById-cde501f2.js"
let k,y,E,I,L,v=0
function S(e){const t=u(),n=e[0].parentNode
d(t,n),d(L,t)}function F(e){const t=e[0].parentNode.parentNode
h(t,function(e){return 0!==v&&e[2]!==v}(e)||function(e){return I.checked&&"Perfect"!==e[3]}(e))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(k.parentNode,L),l(k)),y.forEach(F)}function x(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==v&&(v=t,M())}function C(e){const t=E[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function P(){y.forEach(C)}function V(e){if(e.items&&k){E=e.items,t(4,P),function(e){if("crafting"===r.cmd)return void(I={checked:!1})
const t=g({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=b({className:"fshVMid",type:"checkbox"}),i(I,"change",M),d(t,I),f(e," &ensp;"),d(e,t)}(function(e){const t=k.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),o(t,x),f(t,N(e,!0)),t}(e.folders))}}function q(e){const{tipped:t}=e.dataset
return[e,t.match(m)[2]]}function B(){k=function(){const e=s(c,a.lastElementChild)
return"crafting"===r.cmd?e[1]:e[0]}(),y=n("img",k).map(q)}export default function(){e()&&(j().then(V),t(3,B))}
//# sourceMappingURL=craftForge-eab9e4be.js.map
