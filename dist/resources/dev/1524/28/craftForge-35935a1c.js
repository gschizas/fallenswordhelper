import{e,j as t,a as n,g as r,b as a,p as o,d as s,c as i,o as c,i as f,f as m,h as d,k as u,l as p,m as l}from"./calfSystem-b136673a.js"
import{c as h}from"./createInput-08c848a9.js"
import{c as j}from"./createLabel-04ce59e0.js"
import"./insertElementBefore-eada6f05.js"
import{i as g}from"./insertElementAfterBegin-9a4b7ee1.js"
import{h as b}from"./hideElement-c14a94c9.js"
import"./indexAjaxJson-ea0d9bb9.js"
import"./cmdExport-bd5eafa5.js"
import"./guildStore-a5ab07ad.js"
import"./getInventory-3e718e5a.js"
import{g as N}from"./getInventoryById-bc1a2a8f.js"
import{t as E}from"./toggleForce-10d35470.js"
import{m as k}from"./makeFolderSpan-1546f7b2.js"
function x(e){return k(e[0],e[1])}function y(t,n){return k("0","All")+function(e){return e?k("-2","Worn"):""}(n)+k("-1","Main")+e(t).map(x).join("")}let I,v,L,M,S,A=0
function B(e){const t=l(),n=e[0].parentNode
d(t,n),d(S,t)}function F(e){const t=e[0].parentNode.parentNode
E(t,function(e){return 0!==A&&e[2]!==A}(e)||function(e){return M.checked&&"Perfect"!==e[3]}(e))}function C(){S||(S=l({className:"fshItemGrid"}),v.forEach(B),g(I.parentNode,S),b(I)),v.forEach(F)}function P(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==A&&(A=t,C())}function V(e){const t=L[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function q(){v.forEach(V)}function G(e){if(e.items&&I){L=e.items,n(4,q)
!function(e){if("crafting"===i.cmd)return void(M={checked:!1})
const t=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),d(t,M),f(e," &ensp;"),d(e,t)}(function(e){const t=I.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,P),f(t,y(e,!0)),t}(e.folders))}}function H(e){const{tipped:t}=e.dataset
return[e,t.match(u)[2]]}function J(){I=function(){const e=a(s,o.lastElementChild)
return"crafting"===i.cmd?e[1]:e[0]}(),v=r("img",I).map(H)}function T(){t()&&(N().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-35935a1c.js.map
