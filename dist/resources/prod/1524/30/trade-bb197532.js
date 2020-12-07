import{x as t,a as e,g as n,y as s,d as i,e as a,o as c,t as o,m as r,b as l,h as d,l as f,a2 as m,H as h,aK as p,aT as u,D as k,c as L}from"./calfSystem-6459f18a.js"
import{n as S}from"./numberIsNaN-fa7d637d.js"
import{i as g}from"./insertElementBefore-1b96a575.js"
import{h as j}from"./hideElement-f7381055.js"
import"./indexAjaxJson-14aa1022.js"
import"./cmdExport-7faecab1.js"
import"./getInventory-5521ae48.js"
import{g as y}from"./getInventoryById-1cf05aa3.js"
import{i as N}from"./insertHtmlBeforeBegin-88cc42a4.js"
import{c as b}from"./createTr-fa705a98.js"
let v
function H(t,e){e.children[0].lastElementChild.children[0].children[0].checked=!1
const n=f("fshHide",e),s="folderid0"===t,i=f(t,e);(function(t,e,n){return t&&m(e,n)})(n,s,i)&&(e.classList.remove("fshHide"),e.classList.add("fshBlock")),function(t,e,n){return!t&&!e&&!n}(n,s,i)&&(e.classList.remove("fshBlock"),j(e))}function A(t){n(i,function(){let t=s("item-div")
if(!t){t=r({id:"item-div",className:"itemDiv"})
const e=s("item-list"),n=l(i,e)
for(;n.length;)n[0].classList.add("fshBlock"),d(t,n[0])
g(t,e)}return t}()).forEach(o(H,t.target.id))}function E(t){"SPAN"===t.target.nodeName&&-1!==t.target.id.indexOf("folderid")&&A(t)}function I(t){return` &ensp;<span id="folderid${t[0]}" class="fshLink fshNoWrap" fid=${t[0]}>${t[1]}</span> `}function C(t){const e=t.children[0].lastElementChild.children[0].children[0],n=v[e.getAttribute("value")]
n&&(t.classList.add("folderid"+n.folder_id),v.fshHasST&&function(t,e){e.is_in_st&&t.classList.add("isInST")}(t,n),e.classList.add("itemid"+n.item_id),e.classList.add("itemtype"+n.type))}function T(t){v=t.items
n(i,s("item-list")).forEach(C),function(t){const e=b({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+a(t).map(I).join("")})
c(e,E)
const n=s("item-list").parentNode.parentNode
N(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),g(e,n)}(t.folders)}function x(t){e(3,T,[t])}function B(){t()||y().then(x)}function M(t,e){return"itemid-1"===t||function(t,e){return"itemid-2"===t&&f("itemtype12",e)}(t,e)||f(t,e)}function $(t,e){return t||!f("isInST",e)}function w(t){return t.children[0].lastElementChild.children[0].children[0]}function W(t,e){e.checked=t}function _(t){W(!1,t)}function D(t){W(!0,t)}function z(t,e){e.filter(o($,function(){const t=s("itemsInSt")
if(t)return t.checked}())).map(w).filter(o(M,t)).slice(0,function(t){const e=parseInt(s("fshSendHowMany").value,10)
return S(e)?t.length:"-"!==L.subcmd?Math.min(100,e):e}(e)).forEach(D)}function F(t){f("fshCheckAll",t.target)&&function(t){const e=s("item-div")||s("item-list"),n=k("table:not(.fshHide)",e)
n.map(w).forEach(_),z(t.target.id,n)}(t)}function J(t){return p(`[${t}]`)}function K(){const t=J(h("sendClasses"))
return t||J(u.sendClasses)}function O(t){return` &ensp;<span id="itemid${t[1]}" class="fshCheckAll fshLink fshNoWrap">${t[0]}</span>`}function P(){const t=b({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+K().map(O).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(t,F)
const e=s("item-list").parentNode.parentNode
g(t,e)}function R(){e(3,B),e(3,P)}export default R
//# sourceMappingURL=trade-bb197532.js.map
