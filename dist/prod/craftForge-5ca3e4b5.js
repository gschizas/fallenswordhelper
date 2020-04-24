import{j as e,a as t,g as n,b as s,p as a,c as r,e as o,o as c,i as f,f as i,h as d,k as m,l as u,m as p,n as l,t as h}from"./calfSystem-3956a623.js"
import{c as g}from"./createInput-f6e26d5e.js"
import{c as N}from"./createLabel-6f6560b1.js"
import"./makeFolderSpan-583f0e94.js"
import{m as j}from"./makeFolderSpans-7064af26.js"
import"./getInventory-fd0518e3.js"
import{g as k}from"./getInventoryById-efcfeae8.js"
let b,y,E,I,L,v=0
function S(e){const t=u(),n=e[0].parentNode
d(t,n),d(L,t)}function F(e){const t=e[0].parentNode.parentNode
h(t,function(e){return 0!==v&&e[2]!==v}(e)||function(e){return I.checked&&"Perfect"!==e[3]}(e))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(b.parentNode,L),l(b)),y.forEach(F)}function x(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==v&&(v=t,M())}function C(e){const t=E[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function P(){y.forEach(C)}function V(e){if(e.items&&b){E=e.items,t(4,P),function(e){if("crafting"===o.cmd)return void(I={checked:!1})
const t=N({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=g({className:"fshVMid",type:"checkbox"}),i(I,"change",M),d(t,I),f(e," &ensp;"),d(e,t)}(function(e){const t=b.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,x),f(t,j(e,!0)),t}(e.folders))}}function q(e){const{tipped:t}=e.dataset
return[e,t.match(m)[2]]}function B(){b=function(){const e=s(r,a.lastElementChild)
return"crafting"===o.cmd?e[1]:e[0]}(),y=n("img",b).map(q)}export default function(){e()&&(k().then(V),t(3,B))}
//# sourceMappingURL=craftForge-5ca3e4b5.js.map
