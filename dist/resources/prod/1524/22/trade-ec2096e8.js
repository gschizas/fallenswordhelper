import{x as e,a as t,g as n,y as s,d as i,e as a,o as c,t as o,m as r,b as d,h as l,l as f,a2 as m,G as h,aK as p,aU as u,D as k,c as L}from"./calfSystem-d04e4be4.js"
import{n as S}from"./numberIsNaN-eb16384c.js"
import{i as g}from"./insertElementBefore-cc030078.js"
import{h as b}from"./hideElement-54f4258c.js"
import"./indexAjaxJson-73d427c9.js"
import"./cmdExport-9eb7477e.js"
import"./getInventory-7c3cafa9.js"
import{g as j}from"./getInventoryById-efcf8354.js"
import{i as y}from"./insertHtmlBeforeBegin-9b8e554c.js"
import{c as N}from"./createTr-23a10d3c.js"
let v
function A(e,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=f("fshHide",t),s="folderid0"===e,i=f(e,t);(function(e,t,n){return e&&m(t,n)})(n,s,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(e,t,n){return!e&&!t&&!n}(n,s,i)&&(t.classList.remove("fshBlock"),b(t))}function E(e){n(i,function(){let e=s("item-div")
if(!e){e=r({id:"item-div",className:"itemDiv"})
const t=s("item-list"),n=d(i,t)
for(;n.length;)n[0].classList.add("fshBlock"),l(e,n[0])
g(e,t)}return e}()).forEach(o(A,e.target.id))}function H(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&E(e)}function I(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function C(e){const t=e.children[0].lastElementChild.children[0].children[0],n=v[t.getAttribute("value")]
n&&(e.classList.add("folderid"+n.folder_id),v.fshHasST&&function(e,t){t.is_in_st&&e.classList.add("isInST")}(e,n),t.classList.add("itemid"+n.item_id),t.classList.add("itemtype"+n.type))}function x(e){v=e.items
n(i,s("item-list")).forEach(C),function(e){const t=N({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+a(e).map(I).join("")})
c(t,H)
const n=s("item-list").parentNode.parentNode
y(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),g(t,n)}(e.folders)}function T(e){t(3,x,[e])}function B(){e()||j().then(T)}function M(e,t){return"itemid-1"===e||function(e,t){return"itemid-2"===e&&f("itemtype12",t)}(e,t)||f(e,t)}function $(e,t){return e||!f("isInST",t)}function w(e){return e.children[0].lastElementChild.children[0].children[0]}function W(e,t){t.checked=e}function _(e){W(!1,e)}function D(e){W(!0,e)}function z(e,t){t.filter(o($,function(){const e=s("itemsInSt")
if(e)return e.checked}())).map(w).filter(o(M,e)).slice(0,function(e){const t=parseInt(s("fshSendHowMany").value,10)
return S(t)?e.length:"-"!==L.subcmd?Math.min(100,t):t}(t)).forEach(D)}function F(e){f("fshCheckAll",e.target)&&function(e){const t=s("item-div")||s("item-list"),n=k("table:not(.fshHide)",t)
n.map(w).forEach(_),z(e.target.id,n)}(e)}function G(e){return p(`[${e}]`)}function J(){const e=G(h("sendClasses"))
return e||G(u.sendClasses)}function K(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function O(){const e=N({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+J().map(K).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(e,F)
const t=s("item-list").parentNode.parentNode
g(e,t)}export default function(){t(3,B),t(3,O)}
//# sourceMappingURL=trade-ec2096e8.js.map
