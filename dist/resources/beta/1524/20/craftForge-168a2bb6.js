import{j as e,a as t,g as n,b as r,p as s,d as o,c as a,o as c,i,e as f,f as d,h as m,k as p,l as u}from"./calfSystem-05554bae.js"
import{c as l}from"./createInput-b4c4948c.js"
import{c as h}from"./createLabel-ce6d9261.js"
import"./insertElementBefore-2ba0b318.js"
import{i as b}from"./insertElementAfterBegin-1acc7ec9.js"
import{h as j}from"./hideElement-b7650daa.js"
import"./makeFolderSpan-0773eddf.js"
import{m as g}from"./makeFolderSpans-bdd7d7b7.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import"./getInventory-dd72b860.js"
import{g as N}from"./getInventoryById-d10cf296.js"
import{t as E}from"./toggleForce-61cef79e.js"
let k,x,y,I,v,F=0
function L(e){const t=u(),n=e[0].parentNode
d(t,n),d(v,t)}function S(e){const t=e[0].parentNode.parentNode
E(t,function(e){return 0!==F&&e[2]!==F}(e)||function(e){return I.checked&&"Perfect"!==e[3]}(e))}function B(){v||(v=u({className:"fshItemGrid"}),x.forEach(L),b(k.parentNode,v),j(k)),x.forEach(S)}function M(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==F&&(F=t,B())}function A(e){const t=y[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function C(){x.forEach(A)}function P(e){if(e.items&&k){y=e.items,t(4,C)
!function(e){if("crafting"===a.cmd)return void(I={checked:!1})
const t=h({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=l({className:"fshVMid",type:"checkbox"}),f(I,"change",B),d(t,I),i(e," &ensp;"),d(e,t)}(function(e){const t=k.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,M),i(t,g(e,!0)),t}(e.folders))}}function V(e){const{tipped:t}=e.dataset
return[e,t.match(m)[2]]}function q(){k=function(){const e=r(o,s.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),x=n("img",k).map(V)}export default function(){e()&&(N().then(P),t(3,q))}
//# sourceMappingURL=craftForge-168a2bb6.js.map
