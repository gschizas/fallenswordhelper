import{e as t,j as e,a as n,g as r,b as a,p as o,d as s,c,o as f,i,f as m,h as d,k as u,l as p,m as l}from"./calfSystem-a5da5210.js"
import{c as h}from"./createInput-0af9c89a.js"
import{c as j}from"./createLabel-5fa02d85.js"
import"./insertElementBefore-eada6f05.js"
import{i as g}from"./insertElementAfterBegin-619f3b2f.js"
import{h as N}from"./hideElement-c14a94c9.js"
import"./indexAjaxJson-e64296df.js"
import"./cmdExport-7f82d72f.js"
import"./getInventory-6f87e502.js"
import{g as E}from"./getInventoryById-6fa4cb8c.js"
import{t as b}from"./toggleForce-10d35470.js"
import{m as k}from"./makeFolderSpan-1546f7b2.js"
function x(t){return k(t[0],t[1])}function y(e,n){return k("0","All")+function(t){return t?k("-2","Worn"):""}(n)+k("-1","Main")+t(e).map(x).join("")}let I,v,L,M,A,B=0
function F(t){const e=l(),n=t[0].parentNode
d(e,n),d(A,e)}function S(t){const e=t[0].parentNode.parentNode
b(e,function(t){return 0!==B&&t[2]!==B}(t)||function(t){return M.checked&&"Perfect"!==t[3]}(t))}function C(){A||(A=l({className:"fshItemGrid"}),v.forEach(F),g(I.parentNode,A),N(I)),v.forEach(S)}function P(t){if(!p("fshFolder",t.target))return
const e=Number(t.target.dataset.folder)
e!==B&&(B=e,C())}function V(t){const e=L[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function q(){v.forEach(V)}function G(t){if(t.items&&I){L=t.items,n(4,q)
!function(t){if("crafting"===c.cmd)return void(M={checked:!1})
const e=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),d(e,M),i(t," &ensp;"),d(t,e)}(function(t){const e=I.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),f(e,P),i(e,y(t,!0)),e}(t.folders))}}function H(t){const{tipped:e}=t.dataset
return[t,e.match(u)[2]]}function J(){I=function(){const t=a(s,o.lastElementChild)
return"crafting"===c.cmd?t[1]:t[0]}(),v=r("img",I).map(H)}function T(){e()&&(E().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-3bc52f1f.js.map
