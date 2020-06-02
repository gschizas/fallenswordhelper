import{j as e,a as t,g as n,b as s,p as r,d as o,c as a,o as c,i,e as f,f as d,h as m,k as p}from"./calfSystem-1c103624.js"
import{c as u}from"./createInput-7f1f4562.js"
import{c as l}from"./createLabel-da6d9667.js"
import"./insertElementBefore-0e09c5df.js"
import{i as h}from"./insertElementAfterBegin-ed14bd7f.js"
import{h as j}from"./hideElement-e9cdcfef.js"
import"./indexAjaxJson-ed231bc3.js"
import"./makeFolderSpan-d7ca60af.js"
import{m as g}from"./makeFolderSpans-4d6fd0b1.js"
import"./cmdExport-15d3dc9a.js"
import"./guildStore-17582a77.js"
import"./getInventory-baeadfc2.js"
import{g as N}from"./getInventoryById-f4443c8c.js"
import{t as b}from"./toggleForce-43e39379.js"
let E,k,x,y,I,L=0
function S(e){const t=p(),n=e[0].parentNode
d(t,n),d(I,t)}function v(e){const t=e[0].parentNode.parentNode
b(t,function(e){return 0!==L&&e[2]!==L}(e)||function(e){return y.checked&&"Perfect"!==e[3]}(e))}function F(){I||(I=p({className:"fshItemGrid"}),k.forEach(S),h(E.parentNode,I),j(E)),k.forEach(v)}function B(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==L&&(L=t,F())}function M(e){const t=x[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function A(){k.forEach(M)}function C(e){if(e.items&&E){x=e.items,t(4,A)
!function(e){if("crafting"===a.cmd)return void(y={checked:!1})
const t=l({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
y=u({className:"fshVMid",type:"checkbox"}),f(y,"change",F),d(t,y),i(e," &ensp;"),d(e,t)}(function(e){const t=E.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,B),i(t,g(e,!0)),t}(e.folders))}}function P(e){const{tipped:t}=e.dataset
return[e,t.match(m)[2]]}function V(){E=function(){const e=s(o,r.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),k=n("img",E).map(P)}export default function(){e()&&(N().then(C),t(3,V))}
//# sourceMappingURL=craftForge-b1bf0376.js.map
