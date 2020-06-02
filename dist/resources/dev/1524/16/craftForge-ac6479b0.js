import{j as e,a as t,g as n,b as s,p as r,d as o,c as a,o as c,i,e as f,f as d,h as m,k as p}from"./calfSystem-d49dbbd3.js"
import{c as u}from"./createInput-1699d448.js"
import{c as l}from"./createLabel-f30a5e2d.js"
import"./insertElementBefore-5eb6d41d.js"
import{i as h}from"./insertElementAfterBegin-cc62b549.js"
import{h as j}from"./hideElement-a25240d4.js"
import"./indexAjaxJson-6ef1f9f4.js"
import"./makeFolderSpan-e24b6f9c.js"
import{m as g}from"./makeFolderSpans-0116b1df.js"
import"./cmdExport-1b537f9c.js"
import"./guildStore-783e895e.js"
import"./getInventory-ac7eb5ee.js"
import{g as b}from"./getInventoryById-aa05fc4e.js"
import{t as N}from"./toggleForce-c06db9a6.js"
let E,k,x,y,I,L=0
function S(e){const t=p(),n=e[0].parentNode
d(t,n),d(I,t)}function v(e){const t=e[0].parentNode.parentNode
N(t,function(e){return 0!==L&&e[2]!==L}(e)||function(e){return y.checked&&"Perfect"!==e[3]}(e))}function F(){I||(I=p({className:"fshItemGrid"}),k.forEach(S),h(E.parentNode,I),j(E)),k.forEach(v)}function B(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==L&&(L=t,F())}function M(e){const t=x[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function A(){k.forEach(M)}function C(e){if(e.items&&E){x=e.items,t(4,A)
!function(e){if("crafting"===a.cmd)return void(y={checked:!1})
const t=l({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
y=u({className:"fshVMid",type:"checkbox"}),f(y,"change",F),d(t,y),i(e," &ensp;"),d(e,t)}(function(e){const t=E.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,B),i(t,g(e,!0)),t}(e.folders))}}function P(e){const{tipped:t}=e.dataset
return[e,t.match(m)[2]]}function V(){E=function(){const e=s(o,r.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),k=n("img",E).map(P)}export default function(){e()&&(b().then(C),t(3,V))}
//# sourceMappingURL=craftForge-ac6479b0.js.map
