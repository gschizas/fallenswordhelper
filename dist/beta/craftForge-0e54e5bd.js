import{j as t,a as n,g as e,b as s,p as a,c as r,e as o,o as c,i,f,h as d,k as m,l as u,m as p,n as l,t as h}from"./calfSystem-99da704d.js"
import{c as b}from"./createInput-bb469b2f.js"
import{c as g}from"./createLabel-44120823.js"
import"./makeFolderSpan-27870207.js"
import{m as N}from"./makeFolderSpans-b06c12fd.js"
import"./getInventory-1445ab2c.js"
import{g as j}from"./getInventoryById-6720d91b.js"
let k,y,E,I,L,v=0
function S(t){const n=u(),e=t[0].parentNode
d(n,e),d(L,n)}function F(t){const n=t[0].parentNode.parentNode
h(n,function(t){return 0!==v&&t[2]!==v}(t)||function(t){return I.checked&&"Perfect"!==t[3]}(t))}function M(){L||(L=u({className:"fshItemGrid"}),y.forEach(S),p(k.parentNode,L),l(k)),y.forEach(F)}function x(t){if(!t.target.classList.contains("fshFolder"))return
const n=Number(t.target.dataset.folder)
n!==v&&(v=n,M())}function C(t){const n=E[t[1]]
n&&t.push(function(t){return t.equipped?-2:t.folder_id}(n),n.craft)}function P(){y.forEach(C)}function V(t){if(t.items&&k){E=t.items,n(4,P),function(t){if("crafting"===o.cmd)return void(I={checked:!1})
const n=g({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=b({className:"fshVMid",type:"checkbox"}),f(I,"change",M),d(n,I),i(t," &ensp;"),d(t,n)}(function(t){const n=k.parentNode.parentNode.previousElementSibling.children[0]
return n.classList.add("fshCenter"),c(n,x),i(n,N(t,!0)),n}(t.folders))}}function q(t){const{tipped:n}=t.dataset
return[t,n.match(m)[2]]}function B(){k=function(){const t=s(r,a.lastElementChild)
return"crafting"===o.cmd?t[1]:t[0]}(),y=e("img",k).map(q)}export default function(){t()&&(j().then(V),n(3,B))}
//# sourceMappingURL=craftForge-0e54e5bd.js.map
