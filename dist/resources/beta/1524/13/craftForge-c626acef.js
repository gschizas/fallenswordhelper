import{j as t,a as e,g as n,b as s,p as a,c as r,e as c,o,i as f,f as i,h as d,k as m,l as u,m as p,n as l,t as h}from"./calfSystem-1e164202.js"
import{c as g}from"./createInput-57c382fb.js"
import{c as N}from"./createLabel-dfc46f16.js"
import"./makeFolderSpan-309f90f9.js"
import{m as j}from"./makeFolderSpans-a5a39976.js"
import"./getInventory-f988c530.js"
import{g as k}from"./getInventoryById-5acd5e09.js"
let b,y,E,I,L,v=0
function S(t){const e=u(),n=t[0].parentNode
d(e,n),d(L,e)}function F(t){const e=t[0].parentNode.parentNode
h(e,function(t){return 0!==v&&t[2]!==v}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(b.parentNode,L),l(b)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==v&&(v=e,M())}function C(t){const e=E[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&b){E=t.items,e(4,P)
!function(t){if("crafting"===c.cmd)return void(I={checked:!1})
const e=N({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),i(I,"change",M),d(e,I),f(t," &ensp;"),d(t,e)}(function(t){const e=b.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),o(e,x),f(e,j(t,!0)),e}(t.folders))}}function q(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function B(){b=function(){const t=s(r,a.lastElementChild)
return"crafting"===c.cmd?t[1]:t[0]}(),y=n("img",b).map(q)}export default function(){t()&&(k().then(V),e(3,B))}
//# sourceMappingURL=craftForge-c626acef.js.map
