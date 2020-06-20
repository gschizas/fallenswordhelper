import{x as t,a as e,g as n,y as s,d as i,e as a,o as c,t as o,m as r,b as d,h as l,l as f,a2 as m,G as h,aK as p,aU as u,D as k,c as L}from"./calfSystem-2741d97b.js"
import{n as S}from"./numberIsNaN-ed994c04.js"
import{i as g}from"./insertElementBefore-1ac41a54.js"
import{h as b}from"./hideElement-6a4f37a8.js"
import"./indexAjaxJson-2aa42945.js"
import"./cmdExport-b57576c3.js"
import"./getInventory-a458051a.js"
import{g as j}from"./getInventoryById-e8d5c395.js"
import{i as y}from"./insertHtmlBeforeBegin-4c326e35.js"
import{c as N}from"./createTr-4882c5bb.js"
let v
function A(t,e){e.children[0].lastElementChild.children[0].children[0].checked=!1
const n=f("fshHide",e),s="folderid0"===t,i=f(t,e);(function(t,e,n){return t&&m(e,n)})(n,s,i)&&(e.classList.remove("fshHide"),e.classList.add("fshBlock")),function(t,e,n){return!t&&!e&&!n}(n,s,i)&&(e.classList.remove("fshBlock"),b(e))}function E(t){n(i,function(){let t=s("item-div")
if(!t){t=r({id:"item-div",className:"itemDiv"})
const e=s("item-list"),n=d(i,e)
for(;n.length;)n[0].classList.add("fshBlock"),l(t,n[0])
g(t,e)}return t}()).forEach(o(A,t.target.id))}function H(t){"SPAN"===t.target.nodeName&&-1!==t.target.id.indexOf("folderid")&&E(t)}function I(t){return` &ensp;<span id="folderid${t[0]}" class="fshLink fshNoWrap" fid=${t[0]}>${t[1]}</span> `}function C(t){const e=t.children[0].lastElementChild.children[0].children[0],n=v[e.getAttribute("value")]
n&&(t.classList.add("folderid"+n.folder_id),v.fshHasST&&function(t,e){e.is_in_st&&t.classList.add("isInST")}(t,n),e.classList.add("itemid"+n.item_id),e.classList.add("itemtype"+n.type))}function x(t){v=t.items
n(i,s("item-list")).forEach(C),function(t){const e=N({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+a(t).map(I).join("")})
c(e,H)
const n=s("item-list").parentNode.parentNode
y(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),g(e,n)}(t.folders)}function T(t){e(3,x,[t])}function B(){t()||j().then(T)}function M(t,e){return"itemid-1"===t||function(t,e){return"itemid-2"===t&&f("itemtype12",e)}(t,e)||f(t,e)}function $(t,e){return t||!f("isInST",e)}function w(t){return t.children[0].lastElementChild.children[0].children[0]}function W(t,e){e.checked=t}function _(t){W(!1,t)}function D(t){W(!0,t)}function z(t,e){e.filter(o($,function(){const t=s("itemsInSt")
if(t)return t.checked}())).map(w).filter(o(M,t)).slice(0,function(t){const e=parseInt(s("fshSendHowMany").value,10)
return S(e)?t.length:"-"!==L.subcmd?Math.min(100,e):e}(e)).forEach(D)}function F(t){f("fshCheckAll",t.target)&&function(t){const e=s("item-div")||s("item-list"),n=k("table:not(.fshHide)",e)
n.map(w).forEach(_),z(t.target.id,n)}(t)}function G(t){return p(`[${t}]`)}function J(){const t=G(h("sendClasses"))
return t||G(u.sendClasses)}function K(t){return` &ensp;<span id="itemid${t[1]}" class="fshCheckAll fshLink fshNoWrap">${t[0]}</span>`}function O(){const t=N({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+J().map(K).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(t,F)
const e=s("item-list").parentNode.parentNode
g(t,e)}export default function(){e(3,B),e(3,O)}
//# sourceMappingURL=trade-60d7188a.js.map
