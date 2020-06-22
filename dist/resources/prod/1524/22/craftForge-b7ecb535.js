import{e,j as t,a as n,g as r,b as o,p as s,d as a,c,o as i,i as f,f as m,h as d,k as u,l as p,m as l}from"./calfSystem-d04e4be4.js"
import{c as h}from"./createInput-06f9cad3.js"
import{c as j}from"./createLabel-19df454f.js"
import"./insertElementBefore-cc030078.js"
import{i as g}from"./insertElementAfterBegin-afd674a5.js"
import{h as N}from"./hideElement-54f4258c.js"
import"./indexAjaxJson-73d427c9.js"
import"./cmdExport-9eb7477e.js"
import"./getInventory-7c3cafa9.js"
import{g as E}from"./getInventoryById-efcf8354.js"
import{t as b}from"./toggleForce-6cbae4af.js"
import{m as k}from"./makeFolderSpan-1f29e99d.js"
function x(e){return k(e[0],e[1])}function y(t,n){return k("0","All")+function(e){return e?k("-2","Worn"):""}(n)+k("-1","Main")+e(t).map(x).join("")}let I,v,L,M,A,B=0
function F(e){const t=l(),n=e[0].parentNode
d(t,n),d(A,t)}function S(e){const t=e[0].parentNode.parentNode
b(t,function(e){return 0!==B&&e[2]!==B}(e)||function(e){return M.checked&&"Perfect"!==e[3]}(e))}function C(){A||(A=l({className:"fshItemGrid"}),v.forEach(F),g(I.parentNode,A),N(I)),v.forEach(S)}function P(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==B&&(B=t,C())}function V(e){const t=L[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function q(){v.forEach(V)}function G(e){if(e.items&&I){L=e.items,n(4,q)
!function(e){if("crafting"===c.cmd)return void(M={checked:!1})
const t=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),d(t,M),f(e," &ensp;"),d(e,t)}(function(e){const t=I.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),i(t,P),f(t,y(e,!0)),t}(e.folders))}}function H(e){const{tipped:t}=e.dataset
return[e,t.match(u)[2]]}function J(){I=function(){const e=o(a,s.lastElementChild)
return"crafting"===c.cmd?e[1]:e[0]}(),v=r("img",I).map(H)}export default function(){t()&&(E().then(G),n(3,J))}
//# sourceMappingURL=craftForge-b7ecb535.js.map
