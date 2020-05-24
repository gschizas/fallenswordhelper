import{y as s,a as n,bc as t,g as e,z as i,d as a,bd as c,n as d,o,O as l,u as r,k as f,b as u,f as h,a9 as m,m as p,aF as k,F as L,aS as S,bb as g,M as b,c as y}from"./calfSystem-371c414c.js"
import{n as N}from"./numberIsNaN-987e3021.js"
import{i as v}from"./insertHtmlBeforeBegin-410252ec.js"
import{c as H}from"./createTr-cd20de35.js"
import"./getInventory-998297f9.js"
import{g as I}from"./getInventoryById-9da95555.js"
let T
function A(s,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const t=n.classList.contains("fshHide"),e="folderid0"===s,i=n.classList.contains(s);(function(s,n,t){return s&&m(n,t)})(t,e,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(s,n,t){return!s&&!n&&!t}(t,e,i)&&(n.classList.remove("fshBlock"),p(n))}function C(s){e(a,function(){let s=i("item-div")
if(!s){s=f({id:"item-div",className:"itemDiv"})
const n=i("item-list"),t=u(a,n)
for(;t.length;)t[0].classList.add("fshBlock"),h(s,t[0])
l(s,n)}return s}()).forEach(r(A,s.target.id))}function j(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&C(s)}function M(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function E(s){const n=s.children[0].lastElementChild.children[0].children[0],t=T[n.getAttribute("value")]
t&&(s.classList.add("folderid"+t.folder_id),T.fshHasST&&function(s,n){n.is_in_st&&s.classList.add("isInST")}(s,t),n.classList.add("itemid"+t.item_id),n.classList.add("itemtype"+t.type))}function B(s){t("trade.processTrade"),T=s.items
e(a,i("item-list")).forEach(E),function(s){const n=H({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+d(s).map(M).join("")})
o(n,j)
const t=i("item-list").parentNode.parentNode
v(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,t)}(s.folders),c("trade.processTrade")}function $(s){n(3,B,[s])}function w(){s()||I().then($)}function x(s,n){return"itemid-1"===s||function(s,n){return"itemid-2"===s&&k("itemtype12",n)}(s,n)||k(s,n)}function W(s,n){return s||!k("isInST",n)}function _(s){return s.children[0].lastElementChild.children[0].children[0]}function F(s,n){n.checked=s}function z(s){F(!1,s)}function O(s){F(!0,s)}function D(s,n){n.filter(r(W,function(){const s=i("itemsInSt")
if(s)return s.checked}())).map(_).filter(r(x,s)).slice(0,function(s){const n=parseInt(i("fshSendHowMany").value,10)
return N(n)?s.length:"-"!==y.subcmd?Math.min(100,n):n}(n)).forEach(O)}function P(s){k("fshCheckAll",s.target)&&function(s){const n=i("item-div")||i("item-list"),t=b("table:not(.fshHide)",n)
t.map(_).forEach(z),D(s.target.id,t)}(s)}function R(s){return S(`[${s}]`)}function q(){const s=R(L("sendClasses"))
return s||R(g.sendClasses)}function G(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function J(){const s=H({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+q().map(G).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
o(s,P)
const n=i("item-list").parentNode.parentNode
l(s,n)}export default function(){n(3,w),n(3,J)}
//# sourceMappingURL=trade-f6d00b1b.js.map
