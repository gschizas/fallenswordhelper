import{x as e,a as s,aV as t,g as n,y as i,d as a,aW as c,e as o,o as r,t as d,m as l,b as f,h as m,l as h,a3 as p,H as u,aL as k,aU as L,D as b,c as S}from"./calfSystem-70c7a660.js"
import{n as g}from"./numberIsNaN-871eca26.js"
import{i as j}from"./insertElementBefore-543d9ef0.js"
import{h as y}from"./hideElement-b0b3e820.js"
import"./indexAjaxJson-4ca9de3e.js"
import"./cmdExport-31b9da33.js"
import"./getInventory-7bd3c5ac.js"
import{g as N}from"./getInventoryById-ad87c1fe.js"
import{i as v}from"./insertHtmlBeforeBegin-181cbeb3.js"
import{c as H}from"./createTr-d6775b18.js"
let A
function E(e,s){s.children[0].lastElementChild.children[0].children[0].checked=!1
const t=h("fshHide",s),n="folderid0"===e,i=h(e,s);(function(e,s,t){return e&&p(s,t)})(t,n,i)&&(s.classList.remove("fshHide"),s.classList.add("fshBlock")),function(e,s,t){return!e&&!s&&!t}(t,n,i)&&(s.classList.remove("fshBlock"),y(s))}function I(e){n(a,function(){let e=i("item-div")
if(!e){e=l({id:"item-div",className:"itemDiv"})
const s=i("item-list"),t=f(a,s)
for(;t.length;)t[0].classList.add("fshBlock"),m(e,t[0])
j(e,s)}return e}()).forEach(d(E,e.target.id))}function T(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&I(e)}function C(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function x(e){const s=e.children[0].lastElementChild.children[0].children[0],t=A[s.getAttribute("value")]
t&&(e.classList.add("folderid"+t.folder_id),A.fshHasST&&function(e,s){s.is_in_st&&e.classList.add("isInST")}(e,t),s.classList.add("itemid"+t.item_id),s.classList.add("itemtype"+t.type))}function B(e){t("trade.processTrade"),A=e.items
n(a,i("item-list")).forEach(x),function(e){const s=H({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+o(e).map(C).join("")})
r(s,T)
const t=i("item-list").parentNode.parentNode
v(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),j(s,t)}(e.folders),c("trade.processTrade")}function M(e){s(3,B,[e])}function $(){e()||N().then(M)}function W(e,s){return"itemid-1"===e||function(e,s){return"itemid-2"===e&&h("itemtype12",s)}(e,s)||h(e,s)}function w(e,s){return e||!h("isInST",s)}function _(e){return e.children[0].lastElementChild.children[0].children[0]}function D(e,s){s.checked=e}function z(e){D(!1,e)}function F(e){D(!0,e)}function J(e,s){s.filter(d(w,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(_).filter(d(W,e)).slice(0,function(e){const s=parseInt(i("fshSendHowMany").value,10)
return g(s)?e.length:"-"!==S.subcmd?Math.min(100,s):s}(s)).forEach(F)}function O(e){h("fshCheckAll",e.target)&&function(e){const s=i("item-div")||i("item-list"),t=b("table:not(.fshHide)",s)
t.map(_).forEach(z),J(e.target.id,t)}(e)}function P(e){return k(`[${e}]`)}function R(){const e=P(u("sendClasses"))
return e||P(L.sendClasses)}function U(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function V(){const e=H({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+R().map(U).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
r(e,O)
const s=i("item-list").parentNode.parentNode
j(e,s)}function q(){s(3,$),s(3,V)}export default q
//# sourceMappingURL=trade-118781d0.js.map
