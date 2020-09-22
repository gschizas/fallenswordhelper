import{x as t,a as e,g as n,y as s,d as i,e as a,o as c,t as o,m as d,b as r,h as l,l as f,a2 as m,H as h,aK as p,aU as u,D as k,c as L}from"./calfSystem-ec854151.js"
import{n as S}from"./numberIsNaN-00e0daaf.js"
import{i as g}from"./insertElementBefore-2ad05963.js"
import{h as b}from"./hideElement-b044934d.js"
import"./indexAjaxJson-7630ad10.js"
import"./cmdExport-8168eb49.js"
import"./getInventory-fca9108b.js"
import{g as j}from"./getInventoryById-cd437dff.js"
import{i as y}from"./insertHtmlBeforeBegin-340dfbc2.js"
import{c as N}from"./createTr-12c3e34c.js"
let v
function H(t,e){e.children[0].lastElementChild.children[0].children[0].checked=!1
const n=f("fshHide",e),s="folderid0"===t,i=f(t,e);(function(t,e,n){return t&&m(e,n)})(n,s,i)&&(e.classList.remove("fshHide"),e.classList.add("fshBlock")),function(t,e,n){return!t&&!e&&!n}(n,s,i)&&(e.classList.remove("fshBlock"),b(e))}function A(t){n(i,function(){let t=s("item-div")
if(!t){t=d({id:"item-div",className:"itemDiv"})
const e=s("item-list"),n=r(i,e)
for(;n.length;)n[0].classList.add("fshBlock"),l(t,n[0])
g(t,e)}return t}()).forEach(o(H,t.target.id))}function E(t){"SPAN"===t.target.nodeName&&-1!==t.target.id.indexOf("folderid")&&A(t)}function I(t){return` &ensp;<span id="folderid${t[0]}" class="fshLink fshNoWrap" fid=${t[0]}>${t[1]}</span> `}function C(t){const e=t.children[0].lastElementChild.children[0].children[0],n=v[e.getAttribute("value")]
n&&(t.classList.add("folderid"+n.folder_id),v.fshHasST&&function(t,e){e.is_in_st&&t.classList.add("isInST")}(t,n),e.classList.add("itemid"+n.item_id),e.classList.add("itemtype"+n.type))}function x(t){v=t.items
n(i,s("item-list")).forEach(C),function(t){const e=N({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+a(t).map(I).join("")})
c(e,E)
const n=s("item-list").parentNode.parentNode
y(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),g(e,n)}(t.folders)}function T(t){e(3,x,[t])}function B(){t()||j().then(T)}function M(t,e){return"itemid-1"===t||function(t,e){return"itemid-2"===t&&f("itemtype12",e)}(t,e)||f(t,e)}function $(t,e){return t||!f("isInST",e)}function w(t){return t.children[0].lastElementChild.children[0].children[0]}function W(t,e){e.checked=t}function _(t){W(!1,t)}function D(t){W(!0,t)}function z(t,e){e.filter(o($,function(){const t=s("itemsInSt")
if(t)return t.checked}())).map(w).filter(o(M,t)).slice(0,function(t){const e=parseInt(s("fshSendHowMany").value,10)
return S(e)?t.length:"-"!==L.subcmd?Math.min(100,e):e}(e)).forEach(D)}function F(t){f("fshCheckAll",t.target)&&function(t){const e=s("item-div")||s("item-list"),n=k("table:not(.fshHide)",e)
n.map(w).forEach(_),z(t.target.id,n)}(t)}function J(t){return p(`[${t}]`)}function K(){const t=J(h("sendClasses"))
return t||J(u.sendClasses)}function O(t){return` &ensp;<span id="itemid${t[1]}" class="fshCheckAll fshLink fshNoWrap">${t[0]}</span>`}function P(){const t=N({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+K().map(O).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(t,F)
const e=s("item-list").parentNode.parentNode
g(t,e)}function R(){e(3,B),e(3,P)}export default R
//# sourceMappingURL=trade-64972b11.js.map
