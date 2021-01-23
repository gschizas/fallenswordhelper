import{e,j as t,a as n,g as r,b as o,p as s,d as a,c as i,o as c,i as f,f as m,h as d,k as u,l as p,m as l}from"./calfSystem-393ab895.js"
import{c as h}from"./createInput-f7e07c00.js"
import{c as j}from"./createLabel-d7669076.js"
import{g}from"./getInventoryById-ed6dc7be.js"
import{h as b}from"./hideElement-d4551277.js"
import{i as N}from"./insertElementAfterBegin-b64fd488.js"
import{m as E}from"./makeFolderSpan-ee78140a.js"
import{t as k}from"./toggleForce-8e48254b.js"
import"./getInventory-55e989a6.js"
import"./guildStore-e2a17b6e.js"
import"./cmdExport-ef0399c5.js"
import"./indexAjaxJson-f78a3fe6.js"
import"./insertElementBefore-43970b1f.js"
function x(e){return E(e[0],e[1])}function y(t,n){return E("0","All")+function(e){return e?E("-2","Worn"):""}(n)+E("-1","Main")+e(t).map(x).join("")}let I,v,L,M,S,A=0
function B(e){const t=l(),n=e[0].parentNode
d(t,n),d(S,t)}function F(e){const t=e[0].parentNode.parentNode
k(t,function(e){return 0!==A&&e[2]!==A}(e)||function(e){return M.checked&&"Perfect"!==e[3]}(e))}function C(){S||(S=l({className:"fshItemGrid"}),v.forEach(B),N(I.parentNode,S),b(I)),v.forEach(F)}function P(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==A&&(A=t,C())}function V(e){const t=L[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function q(){v.forEach(V)}function G(e){if(e.items&&I){L=e.items,n(4,q)
!function(e){if("crafting"===i.cmd)return void(M={checked:!1})
const t=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),d(t,M),f(e," &ensp;"),d(e,t)}(function(e){const t=I.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,P),f(t,y(e,!0)),t}(e.folders))}}function H(e){const{tipped:t}=e.dataset
return[e,t.match(u)[2]]}function J(){I=function(){const e=o(a,s.lastElementChild)
return"crafting"===i.cmd?e[1]:e[0]}(),v=r("img",I).map(H)}function T(){t()&&(g().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-920b9748.js.map
