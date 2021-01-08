import{e as t,j as e,a as n,g as r,b as o,p as s,d as a,c,o as i,i as f,f as m,h as d,k as u,l as p,m as l}from"./calfSystem-ebf4b17d.js"
import{c as h}from"./createInput-31c9c0fc.js"
import{c as j}from"./createLabel-c7d42264.js"
import"./insertElementBefore-1b96a575.js"
import{i as g}from"./insertElementAfterBegin-2ad94795.js"
import{h as b}from"./hideElement-f7381055.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import"./getInventory-4b39d7a1.js"
import{g as N}from"./getInventoryById-d902b49d.js"
import{t as E}from"./toggleForce-c034bc71.js"
import{m as k}from"./makeFolderSpan-37299147.js"
function x(t){return k(t[0],t[1])}function y(e,n){return k("0","All")+function(t){return t?k("-2","Worn"):""}(n)+k("-1","Main")+t(e).map(x).join("")}let I,v,L,M,A,B=0
function F(t){const e=l(),n=t[0].parentNode
d(e,n),d(A,e)}function S(t){const e=t[0].parentNode.parentNode
E(e,function(t){return 0!==B&&t[2]!==B}(t)||function(t){return M.checked&&"Perfect"!==t[3]}(t))}function C(){A||(A=l({className:"fshItemGrid"}),v.forEach(F),g(I.parentNode,A),b(I)),v.forEach(S)}function P(t){if(!p("fshFolder",t.target))return
const e=Number(t.target.dataset.folder)
e!==B&&(B=e,C())}function V(t){const e=L[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function q(){v.forEach(V)}function G(t){if(t.items&&I){L=t.items,n(4,q)
!function(t){if("crafting"===c.cmd)return void(M={checked:!1})
const e=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),d(e,M),f(t," &ensp;"),d(t,e)}(function(t){const e=I.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),i(e,P),f(e,y(t,!0)),e}(t.folders))}}function H(t){const{tipped:e}=t.dataset
return[t,e.match(u)[2]]}function J(){I=function(){const t=o(a,s.lastElementChild)
return"crafting"===c.cmd?t[1]:t[0]}(),v=r("img",I).map(H)}function T(){e()&&(N().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-dc827c70.js.map
