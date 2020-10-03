import{e as t,j as e,a as n,g as r,b as o,p as s,d as a,c,o as i,i as f,f as d,h as m,k as u,l as p,m as l}from"./calfSystem-4991bf5b.js"
import{c as h}from"./createInput-befbd592.js"
import{c as j}from"./createLabel-374fe33c.js"
import"./insertElementBefore-47c09359.js"
import{i as b}from"./insertElementAfterBegin-7a3db4df.js"
import{h as g}from"./hideElement-891c9603.js"
import"./indexAjaxJson-b9139aa9.js"
import"./cmdExport-f5c9af35.js"
import"./guildStore-dcedb79d.js"
import"./getInventory-9b5d4291.js"
import{g as N}from"./getInventoryById-5eb1ebd7.js"
import{t as E}from"./toggleForce-a095aa43.js"
import{m as k}from"./makeFolderSpan-ecd9811a.js"
function x(t){return k(t[0],t[1])}function y(e,n){return k("0","All")+function(t){return t?k("-2","Worn"):""}(n)+k("-1","Main")+t(e).map(x).join("")}let I,v,L,M,S,A=0
function B(t){const e=l(),n=t[0].parentNode
m(e,n),m(S,e)}function F(t){const e=t[0].parentNode.parentNode
E(e,function(t){return 0!==A&&t[2]!==A}(t)||function(t){return M.checked&&"Perfect"!==t[3]}(t))}function C(){S||(S=l({className:"fshItemGrid"}),v.forEach(B),b(I.parentNode,S),g(I)),v.forEach(F)}function P(t){if(!p("fshFolder",t.target))return
const e=Number(t.target.dataset.folder)
e!==A&&(A=e,C())}function V(t){const e=L[t[1]]
e&&t.push(function(t){return t.equipped?-2:t.folder_id}(e),e.craft)}function q(){v.forEach(V)}function G(t){if(t.items&&I){L=t.items,n(4,q)
!function(t){if("crafting"===c.cmd)return void(M={checked:!1})
const e=j({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
M=h({className:"fshVMid",type:"checkbox"}),d(M,"change",C),m(e,M),f(t," &ensp;"),m(t,e)}(function(t){const e=I.parentNode.parentNode.previousElementSibling.children[0]
return e.classList.add("fshCenter"),i(e,P),f(e,y(t,!0)),e}(t.folders))}}function H(t){const{tipped:e}=t.dataset
return[t,e.match(u)[2]]}function J(){I=function(){const t=o(a,s.lastElementChild)
return"crafting"===c.cmd?t[1]:t[0]}(),v=r("img",I).map(H)}function T(){e()&&(N().then(G),n(3,J))}export default T
//# sourceMappingURL=craftForge-ed82f53c.js.map
