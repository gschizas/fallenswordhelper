import{x as e,a as s,aV as t,g as n,y as i,d as a,aW as c,m as d,o,t as r,l,b as f,f as m,k as h,a2 as p,G as u,aK as k,aU as b,D as L,c as S}from"./calfSystem-05554bae.js"
import{n as g}from"./numberIsNaN-d04aa9f7.js"
import{i as j}from"./insertElementBefore-2ba0b318.js"
import{h as y}from"./hideElement-b7650daa.js"
import{c as N}from"./createTr-343ee7fd.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import"./getInventory-dd72b860.js"
import{g as v}from"./getInventoryById-d10cf296.js"
import{i as A}from"./insertHtmlBeforeBegin-ee91a388.js"
let E
function H(e,s){s.children[0].lastElementChild.children[0].children[0].checked=!1
const t=h("fshHide",s),n="folderid0"===e,i=h(e,s);(function(e,s,t){return e&&p(s,t)})(t,n,i)&&(s.classList.remove("fshHide"),s.classList.add("fshBlock")),function(e,s,t){return!e&&!s&&!t}(t,n,i)&&(s.classList.remove("fshBlock"),y(s))}function I(e){n(a,function(){let e=i("item-div")
if(!e){e=l({id:"item-div",className:"itemDiv"})
const s=i("item-list"),t=f(a,s)
for(;t.length;)t[0].classList.add("fshBlock"),m(e,t[0])
j(e,s)}return e}()).forEach(r(H,e.target.id))}function T(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&I(e)}function C(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function x(e){const s=e.children[0].lastElementChild.children[0].children[0],t=E[s.getAttribute("value")]
t&&(e.classList.add("folderid"+t.folder_id),E.fshHasST&&function(e,s){s.is_in_st&&e.classList.add("isInST")}(e,t),s.classList.add("itemid"+t.item_id),s.classList.add("itemtype"+t.type))}function B(e){t("trade.processTrade"),E=e.items
n(a,i("item-list")).forEach(x),function(e){const s=N({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+d(e).map(C).join("")})
o(s,T)
const t=i("item-list").parentNode.parentNode
A(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),j(s,t)}(e.folders),c("trade.processTrade")}function M(e){s(3,B,[e])}function $(){e()||v().then(M)}function W(e,s){return"itemid-1"===e||function(e,s){return"itemid-2"===e&&h("itemtype12",s)}(e,s)||h(e,s)}function w(e,s){return e||!h("isInST",s)}function _(e){return e.children[0].lastElementChild.children[0].children[0]}function D(e,s){s.checked=e}function z(e){D(!1,e)}function F(e){D(!0,e)}function G(e,s){s.filter(r(w,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(_).filter(r(W,e)).slice(0,function(e){const s=parseInt(i("fshSendHowMany").value,10)
return g(s)?e.length:"-"!==S.subcmd?Math.min(100,s):s}(s)).forEach(F)}function J(e){h("fshCheckAll",e.target)&&function(e){const s=i("item-div")||i("item-list"),t=L("table:not(.fshHide)",s)
t.map(_).forEach(z),G(e.target.id,t)}(e)}function K(e){return k(`[${e}]`)}function O(){const e=K(u("sendClasses"))
return e||K(b.sendClasses)}function P(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function R(){const e=N({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+O().map(P).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
o(e,J)
const s=i("item-list").parentNode.parentNode
j(e,s)}export default function(){s(3,$),s(3,R)}
//# sourceMappingURL=trade-0993dafb.js.map
