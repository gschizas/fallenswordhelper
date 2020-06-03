import{j as e,a as t,g as n,b as s,p as r,d as a,c as o,o as c,i,e as f,f as m,h as d,k as p}from"./calfSystem-f7574730.js"
import{c as u}from"./createInput-ca63b3fd.js"
import{c as l}from"./createLabel-b9e7f95b.js"
import"./insertElementBefore-b5c9c232.js"
import{i as h}from"./insertElementAfterBegin-5fb4abe9.js"
import{h as j}from"./hideElement-8a032490.js"
import"./indexAjaxJson-66a839ba.js"
import"./makeFolderSpan-c4cb955a.js"
import{m as g}from"./makeFolderSpans-da4e5480.js"
import"./cmdExport-da1f542a.js"
import"./guildStore-8fe7d393.js"
import"./getInventory-580028ac.js"
import{g as b}from"./getInventoryById-c0c88cd1.js"
import{t as N}from"./toggleForce-253de8c7.js"
let E,k,x,y,I,L=0
function S(e){const t=p(),n=e[0].parentNode
m(t,n),m(I,t)}function v(e){const t=e[0].parentNode.parentNode
N(t,function(e){return 0!==L&&e[2]!==L}(e)||function(e){return y.checked&&"Perfect"!==e[3]}(e))}function F(){I||(I=p({className:"fshItemGrid"}),k.forEach(S),h(E.parentNode,I),j(E)),k.forEach(v)}function B(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==L&&(L=t,F())}function M(e){const t=x[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function A(){k.forEach(M)}function C(e){if(e.items&&E){x=e.items,t(4,A)
!function(e){if("crafting"===o.cmd)return void(y={checked:!1})
const t=l({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
y=u({className:"fshVMid",type:"checkbox"}),f(y,"change",F),m(t,y),i(e," &ensp;"),m(e,t)}(function(e){const t=E.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,B),i(t,g(e,!0)),t}(e.folders))}}function P(e){const{tipped:t}=e.dataset
return[e,t.match(d)[2]]}function V(){E=function(){const e=s(a,r.lastElementChild)
return"crafting"===o.cmd?e[1]:e[0]}(),k=n("img",E).map(P)}export default function(){e()&&(b().then(C),t(3,V))}
//# sourceMappingURL=craftForge-d0a7df83.js.map
