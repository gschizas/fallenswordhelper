import{j as e,a as t,g as n,b as r,p as s,d as o,c as a,o as c,i,e as f,f as m,h as d,k as p,l as u}from"./calfSystem-03970067.js"
import{c as l}from"./createInput-7a44ee58.js"
import{c as h}from"./createLabel-f2e8b03d.js"
import"./insertElementBefore-c9a36777.js"
import{i as b}from"./insertElementAfterBegin-6c7a660f.js"
import{h as j}from"./hideElement-ee7e2bbb.js"
import"./makeFolderSpan-d3b21d1c.js"
import{m as g}from"./makeFolderSpans-e70fbc42.js"
import"./indexAjaxJson-d04ad897.js"
import"./cmdExport-4773c3fd.js"
import"./getInventory-f35b83ee.js"
import{g as N}from"./getInventoryById-4e448ba1.js"
import{t as E}from"./toggleForce-1be6b2e6.js"
let k,x,y,I,v,F=0
function L(e){const t=u(),n=e[0].parentNode
m(t,n),m(v,t)}function S(e){const t=e[0].parentNode.parentNode
E(t,function(e){return 0!==F&&e[2]!==F}(e)||function(e){return I.checked&&"Perfect"!==e[3]}(e))}function B(){v||(v=u({className:"fshItemGrid"}),x.forEach(L),b(k.parentNode,v),j(k)),x.forEach(S)}function M(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==F&&(F=t,B())}function A(e){const t=y[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function C(){x.forEach(A)}function P(e){if(e.items&&k){y=e.items,t(4,C)
!function(e){if("crafting"===a.cmd)return void(I={checked:!1})
const t=h({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=l({className:"fshVMid",type:"checkbox"}),f(I,"change",B),m(t,I),i(e," &ensp;"),m(e,t)}(function(e){const t=k.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,M),i(t,g(e,!0)),t}(e.folders))}}function V(e){const{tipped:t}=e.dataset
return[e,t.match(d)[2]]}function q(){k=function(){const e=r(o,s.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),x=n("img",k).map(V)}export default function(){e()&&(N().then(P),t(3,q))}
//# sourceMappingURL=craftForge-3adee5b4.js.map
