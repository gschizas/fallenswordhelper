import{e as t,j as e,a as n,g as r,b as a,p as o,d as s,c,o as i,i as f,f as m,h as u,k as d,l as p,m as l}from"./calfSystem-6459f18a.js"
import{c as h}from"./createInput-7be6e294.js"
import{c as j}from"./createLabel-f5b2081a.js"
import"./insertElementBefore-1b96a575.js"
import{i as g}from"./insertElementAfterBegin-d4bb1be4.js"
import{h as b}from"./hideElement-f7381055.js"
import"./indexAjaxJson-14aa1022.js"
import"./cmdExport-7faecab1.js"
import"./getInventory-5521ae48.js"
import{g as N}from"./getInventoryById-1cf05aa3.js"
import{t as E}from"./toggleForce-c034bc71.js"
import{m as k}from"./makeFolderSpan-37299147.js"
function x(t){return k(t[0],t[1])}function y(e,n){return k("0","All")+function(t){return t?k("-2","Worn"):""}(n)+k("-1","Main")+t(e).map(x).join("")}let I,v,L,M,A,B=0
function F(t){const e=l(),n=t[0].parentNode
u(e,n),u(A,e)}function S(t){const e=t[0].parentNode.parentNode
E(e,function(t){return 0!==B&&t[2]!==B}(t)||function(t){return M.checked&&"Perfect"!==t[3]}(t))}function C(){A||(A=l({className:"fshItemGrid"}),v.forEach(F),g(I.parentNode,A),b(I)),v.forEach(S)}function P(t){if(!p("fshFolder",t.target))return
const e=Number(t.target.dataset.folder)
e!==B&&(B=e,C())}function V(t){const e=L[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function q(){v.forEach(V)}function G(t){if(t.items&&I){L=t.items,n(4,q)
!function(t){if("crafting"===c.cmd)return void(M={checked:!1})
const e=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),m(M,"change",C),u(e,M),f(t," &ensp;"),u(t,e)}(function(t){const e=I.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),i(e,P),f(e,y(t,!0)),e}(t.folders))}}function H(t){const{tipped:e}=t.dataset
return[t,e.match(d)[2]]}function J(){I=function(){const t=a(s,o.lastElementChild)
return"crafting"===c.cmd?t[1]:t[0]}(),v=r("img",I).map(H)}function T(){e()&&(N().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-10fd4f8e.js.map
