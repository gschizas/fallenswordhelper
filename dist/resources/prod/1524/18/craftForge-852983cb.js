import{j as e,a as t,g as n,b as s,p as r,d as o,c as a,o as c,i,e as f,f as m,h as d,k as p}from"./calfSystem-8b6534a5.js"
import{c as u}from"./createInput-a695d53e.js"
import{c as l}from"./createLabel-884029b3.js"
import"./insertElementBefore-91801123.js"
import{i as h}from"./insertElementAfterBegin-982d3e85.js"
import{h as b}from"./hideElement-551a92b9.js"
import"./indexAjaxJson-b43ddbcc.js"
import"./makeFolderSpan-e34daae5.js"
import{m as j}from"./makeFolderSpans-71bf736e.js"
import"./cmdExport-a4cd29b8.js"
import"./getInventory-1e8cb5f4.js"
import{g}from"./getInventoryById-182cb218.js"
import{t as N}from"./toggleForce-c312b2b1.js"
let E,k,x,y,I,L=0
function v(e){const t=p(),n=e[0].parentNode
m(t,n),m(I,t)}function F(e){const t=e[0].parentNode.parentNode
N(t,function(e){return 0!==L&&e[2]!==L}(e)||function(e){return y.checked&&"Perfect"!==e[3]}(e))}function S(){I||(I=p({className:"fshItemGrid"}),k.forEach(v),h(E.parentNode,I),b(E)),k.forEach(F)}function B(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==L&&(L=t,S())}function M(e){const t=x[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function A(){k.forEach(M)}function C(e){if(e.items&&E){x=e.items,t(4,A)
!function(e){if("crafting"===a.cmd)return void(y={checked:!1})
const t=l({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
y=u({className:"fshVMid",type:"checkbox"}),f(y,"change",S),m(t,y),i(e," &ensp;"),m(e,t)}(function(e){const t=E.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,B),i(t,j(e,!0)),t}(e.folders))}}function P(e){const{tipped:t}=e.dataset
return[e,t.match(d)[2]]}function V(){E=function(){const e=s(o,r.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),k=n("img",E).map(P)}export default function(){e()&&(g().then(C),t(3,V))}
//# sourceMappingURL=craftForge-852983cb.js.map
