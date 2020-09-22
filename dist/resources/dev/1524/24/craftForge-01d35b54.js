import{e as t,j as e,a as n,g as r,b as o,p as s,d as a,c as i,o as c,i as f,f as d,h as m,k as u,l as p,m as l}from"./calfSystem-38898f3e.js"
import{c as h}from"./createInput-c92705dc.js"
import{c as j}from"./createLabel-b51e565d.js"
import"./insertElementBefore-2ad05963.js"
import{i as g}from"./insertElementAfterBegin-32b9e13c.js"
import{h as N}from"./hideElement-b044934d.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import"./guildStore-657dd13b.js"
import"./getInventory-41df5894.js"
import{g as b}from"./getInventoryById-e93c5950.js"
import{t as E}from"./toggleForce-d6f8623d.js"
import{m as k}from"./makeFolderSpan-03d93920.js"
function x(t){return k(t[0],t[1])}function y(e,n){return k("0","All")+function(t){return t?k("-2","Worn"):""}(n)+k("-1","Main")+t(e).map(x).join("")}let I,v,L,M,S,A=0
function B(t){const e=l(),n=t[0].parentNode
m(e,n),m(S,e)}function F(t){const e=t[0].parentNode.parentNode
E(e,function(t){return 0!==A&&t[2]!==A}(t)||function(t){return M.checked&&"Perfect"!==t[3]}(t))}function C(){S||(S=l({className:"fshItemGrid"}),v.forEach(B),g(I.parentNode,S),N(I)),v.forEach(F)}function P(t){if(!p("fshFolder",t.target))return
const e=Number(t.target.dataset.folder)
e!==A&&(A=e,C())}function V(t){const e=L[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function q(){v.forEach(V)}function G(t){if(t.items&&I){L=t.items,n(4,q)
!function(t){if("crafting"===i.cmd)return void(M={checked:!1})
const e=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),d(M,"change",C),m(e,M),f(t," &ensp;"),m(t,e)}(function(t){const e=I.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),c(e,P),f(e,y(t,!0)),e}(t.folders))}}function H(t){const{tipped:e}=t.dataset
return[t,e.match(u)[2]]}function J(){I=function(){const t=o(a,s.lastElementChild)
return"crafting"===i.cmd?t[1]:t[0]}(),v=r("img",I).map(H)}function T(){e()&&(b().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-01d35b54.js.map
