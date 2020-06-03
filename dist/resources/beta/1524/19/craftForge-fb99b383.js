import{j as t,a as e,g as n,b as s,p as r,d as o,c as a,o as c,i,e as f,f as d,h as m,k as p}from"./calfSystem-57340987.js"
import{c as u}from"./createInput-b52727dd.js"
import{c as l}from"./createLabel-688f4536.js"
import"./insertElementBefore-69bb0e1f.js"
import{i as h}from"./insertElementAfterBegin-d5ad26ea.js"
import{h as b}from"./hideElement-5296bb8b.js"
import"./indexAjaxJson-f0b26dd6.js"
import"./makeFolderSpan-f56bb33c.js"
import{m as j}from"./makeFolderSpans-69939025.js"
import"./cmdExport-1b96d8bc.js"
import"./getInventory-9c5779da.js"
import{g}from"./getInventoryById-ad102b8b.js"
import{t as N}from"./toggleForce-1813ed31.js"
let E,k,x,y,I,L=0
function v(t){const e=p(),n=t[0].parentNode
d(e,n),d(I,e)}function F(t){const e=t[0].parentNode.parentNode
N(e,function(t){return 0!==L&&t[2]!==L}(t)||function(t){return y.checked&&"Perfect"!==t[3]}(t))}function S(){I||(I=p({className:"fshItemGrid"}),k.forEach(v),h(E.parentNode,I),b(E)),k.forEach(F)}function B(t){if(!t.target.classList.contains("fshFolder"))return
const e=Number(t.target.dataset.folder)
e!==L&&(L=e,S())}function M(t){const e=x[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function A(){k.forEach(M)}function C(t){if(t.items&&E){x=t.items,e(4,A)
!function(t){if("crafting"===a.cmd)return void(y={checked:!1})
const e=l({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
y=u({className:"fshVMid",type:"checkbox"}),f(y,"change",S),d(e,y),i(t," &ensp;"),d(t,e)}(function(t){const e=E.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,B),i(e,j(t,!0)),e}(t.folders))}}function P(t){const{tipped:e}=t.dataset
return[t,e.match(m)[2]]}function V(){E=function(){const t=s(o,r.lastElementChild)
return"crafting"===a.cmd?t[1]:t[0]}(),k=n("img",E).map(P)}export default function(){t()&&(g().then(C),e(3,V))}
//# sourceMappingURL=craftForge-fb99b383.js.map
