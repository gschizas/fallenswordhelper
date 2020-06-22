import{e,j as t,a as n,g as r,b as o,p as s,d as a,c,o as i,i as f,f as m,h as d,k as u,l as p,m as l}from"./calfSystem-4cc738f8.js"
import{c as h}from"./createInput-8a96566e.js"
import{c as j}from"./createLabel-f247c95a.js"
import"./insertElementBefore-dcd1920e.js"
import{i as g}from"./insertElementAfterBegin-fe5a69b7.js"
import{h as N}from"./hideElement-22c940e2.js"
import"./indexAjaxJson-39fb942e.js"
import"./cmdExport-3370ea6e.js"
import"./guildStore-36c52711.js"
import"./getInventory-8dd8007d.js"
import{g as E}from"./getInventoryById-068bca44.js"
import{t as b}from"./toggleForce-521f5f12.js"
import{m as k}from"./makeFolderSpan-043a2eef.js"
function x(e){return k(e[0],e[1])}function y(t,n){return k("0","All")+function(e){return e?k("-2","Worn"):""}(n)+k("-1","Main")+e(t).map(x).join("")}let I,v,L,M,S,A=0
function B(e){const t=l(),n=e[0].parentNode
d(t,n),d(S,t)}function F(e){const t=e[0].parentNode.parentNode
b(t,function(e){return 0!==A&&e[2]!==A}(e)||function(e){return M.checked&&"Perfect"!==e[3]}(e))}function C(){S||(S=l({className:"fshItemGrid"}),v.forEach(B),g(I.parentNode,S),N(I)),v.forEach(F)}function P(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==A&&(A=t,C())}function V(e){const t=L[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function q(){v.forEach(V)}function G(e){if(e.items&&I){L=e.items,n(4,q)
!function(e){if("crafting"===c.cmd)return void(M={checked:!1})
const t=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),d(t,M),f(e," &ensp;"),d(e,t)}(function(e){const t=I.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),i(t,P),f(t,y(e,!0)),t}(e.folders))}}function H(e){const{tipped:t}=e.dataset
return[e,t.match(u)[2]]}function J(){I=function(){const e=o(a,s.lastElementChild)
return"crafting"===c.cmd?e[1]:e[0]}(),v=r("img",I).map(H)}export default function(){t()&&(E().then(G),n(3,J))}
//# sourceMappingURL=craftForge-79d63898.js.map
