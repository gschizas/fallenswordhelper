import{j as t,a as e,g as n,b as s,p as a,d as r,c as o,o as c,i,e as f,f as d,h as m,k as u,l as p,m as l,t as h}from"./calfSystem-d96a3efd.js"
import{c as g}from"./createInput-2717f905.js"
import{c as b}from"./createLabel-30fdcb3b.js"
import"./makeFolderSpan-6cb5741d.js"
import{m as N}from"./makeFolderSpans-eea50c06.js"
import"./guildStore-0302347f.js"
import"./getInventory-1d86043b.js"
import{g as j}from"./getInventoryById-bb2e70f9.js"
let k,y,E,I,L,S=0
function v(t){const e=u(),n=t[0].parentNode
d(e,n),d(L,e)}function F(t){const e=t[0].parentNode.parentNode
h(e,function(t){return 0!==S&&t[2]!==S}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(v),p(k.parentNode,L),l(k)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==S&&(S=e,M())}function C(t){const e=E[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&k){E=t.items,e(4,P)
!function(t){if("crafting"===o.cmd)return void(I={checked:!1})
const e=b({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),f(I,"change",M),d(e,I),i(t," &ensp;"),d(t,e)}(function(t){const e=k.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,x),i(e,N(t,!0)),e}(t.folders))}}function q(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function B(){k=function(){const t=s(r,a.lastElementChild)
return"crafting"===o.cmd?t[1]:t[0]}(),y=n("img",k).map(q)}export default function(){t()&&(j().then(V),e(3,B))}
//# sourceMappingURL=craftForge-ad774e48.js.map
