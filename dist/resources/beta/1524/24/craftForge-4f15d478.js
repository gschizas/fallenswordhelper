import{e as t,j as e,a as n,g as r,b as o,p as s,d as a,c as i,o as c,i as f,f as d,h as m,k as u,l as p,m as l}from"./calfSystem-019a589c.js"
import{c as h}from"./createInput-62d3b51a.js"
import{c as j}from"./createLabel-7b42bf61.js"
import"./insertElementBefore-2ad05963.js"
import{i as g}from"./insertElementAfterBegin-712445fc.js"
import{h as b}from"./hideElement-b044934d.js"
import"./indexAjaxJson-424248bd.js"
import"./cmdExport-d38d7643.js"
import"./getInventory-42766a10.js"
import{g as N}from"./getInventoryById-4cb1a5ad.js"
import{t as E}from"./toggleForce-d6f8623d.js"
import{m as k}from"./makeFolderSpan-03d93920.js"
function x(t){return k(t[0],t[1])}function y(e,n){return k("0","All")+function(t){return t?k("-2","Worn"):""}(n)+k("-1","Main")+t(e).map(x).join("")}let I,v,L,M,A,B=0
function F(t){const e=l(),n=t[0].parentNode
m(e,n),m(A,e)}function S(t){const e=t[0].parentNode.parentNode
E(e,function(t){return 0!==B&&t[2]!==B}(t)||function(t){return M.checked&&"Perfect"!==t[3]}(t))}function C(){A||(A=l({className:"fshItemGrid"}),v.forEach(F),g(I.parentNode,A),b(I)),v.forEach(S)}function P(t){if(!p("fshFolder",t.target))return
const e=Number(t.target.dataset.folder)
e!==B&&(B=e,C())}function V(t){const e=L[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function q(){v.forEach(V)}function G(t){if(t.items&&I){L=t.items,n(4,q)
!function(t){if("crafting"===i.cmd)return void(M={checked:!1})
const e=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),d(M,"change",C),m(e,M),f(t," &ensp;"),m(t,e)}(function(t){const e=I.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,P),f(e,y(t,!0)),e}(t.folders))}}function H(t){const{tipped:e}=t.dataset
return[t,e.match(u)[2]]}function J(){I=function(){const t=o(a,s.lastElementChild)
return"crafting"===i.cmd?t[1]:t[0]}(),v=r("img",I).map(H)}function T(){e()&&(N().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-4f15d478.js.map
