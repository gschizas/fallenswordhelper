import{j as t,a as e,g as n,b as a,p as s,c as r,e as o,o as c,i as f,f as i,h as d,k as m,l as u,m as p,n as l,t as h}from"./calfSystem-8dc0fa4b.js"
import{c as g}from"./createInput-29f46dac.js"
import{c as b}from"./createLabel-fd3e7486.js"
import"./makeFolderSpan-abc934ab.js"
import{m as N}from"./makeFolderSpans-479bff76.js"
import"./guildStore-b172d7f4.js"
import"./getInventory-20cd9685.js"
import{g as j}from"./getInventoryById-f0471a4b.js"
let k,y,E,I,L,S=0
function v(t){const e=u(),n=t[0].parentNode
d(e,n),d(L,e)}function F(t){const e=t[0].parentNode.parentNode
h(e,function(t){return 0!==S&&t[2]!==S}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(v),p(k.parentNode,L),l(k)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==S&&(S=e,M())}function C(t){const e=E[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&k){E=t.items,e(4,P),function(t){if("crafting"===o.cmd)return void(I={checked:!1})
const e=b({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),i(I,"change",M),d(e,I),f(t," &ensp;"),d(t,e)}(function(t){const e=k.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,x),f(e,N(t,!0)),e}(t.folders))}}function q(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function B(){k=function(){const t=a(r,s.lastElementChild)
return"crafting"===o.cmd?t[1]:t[0]}(),y=n("img",k).map(q)}export default function(){t()&&(j().then(V),e(3,B))}
//# sourceMappingURL=craftForge-bb69d5fe.js.map
