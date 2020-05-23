import{z as s,a as n,bd as t,g as e,A as i,c as a,be as c,q as o,o as d,P as l,v as r,l as f,b as h,h as u,aa as p,n as m,aG as k,G as L,aT as b,bc as S,N as g,e as N}from"./calfSystem-2fb02284.js"
import{n as v}from"./numberIsNaN-076e64a6.js"
import{i as y}from"./insertHtmlBeforeBegin-79e40773.js"
import{c as T}from"./createTr-4bc6b13c.js"
import"./getInventory-8a12d958.js"
import{g as A}from"./getInventoryById-bd7cfe34.js"
let H
function I(s,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const t=n.classList.contains("fshHide"),e="folderid0"===s,i=n.classList.contains(s);(function(s,n,t){return s&&p(n,t)})(t,e,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(s,n,t){return!s&&!n&&!t}(t,e,i)&&(n.classList.remove("fshBlock"),m(n))}function C(s){e(a,function(){let s=i("item-div")
if(!s){s=f({id:"item-div",className:"itemDiv"})
const n=i("item-list"),t=h(a,n)
for(;t.length;)t[0].classList.add("fshBlock"),u(s,t[0])
l(s,n)}return s}()).forEach(r(I,s.target.id))}function j(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&C(s)}function E(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function M(s){const n=s.children[0].lastElementChild.children[0].children[0],t=H[n.getAttribute("value")]
t&&(s.classList.add("folderid"+t.folder_id),H.fshHasST&&function(s,n){n.is_in_st&&s.classList.add("isInST")}(s,t),n.classList.add("itemid"+t.item_id),n.classList.add("itemtype"+t.type))}function B(s){t("trade.processTrade"),H=s.items
e(a,i("item-list")).forEach(M),function(s){const n=T({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+o(s).map(E).join("")})
d(n,j)
const t=i("item-list").parentNode.parentNode
y(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,t)}(s.folders),c("trade.processTrade")}function $(s){n(3,B,[s])}function w(){s()||A().then($)}function x(s,n){return"itemid-1"===s||function(s,n){return"itemid-2"===s&&k("itemtype12",n)}(s,n)||k(s,n)}function W(s,n){return s||!k("isInST",n)}function _(s){return s.children[0].lastElementChild.children[0].children[0]}function z(s,n){n.checked=s}function G(s){z(!1,s)}function P(s){z(!0,s)}function q(s,n){n.filter(r(W,function(){const s=i("itemsInSt")
if(s)return s.checked}())).map(_).filter(r(x,s)).slice(0,function(s){const n=parseInt(i("fshSendHowMany").value,10)
return v(n)?s.length:"-"!==N.subcmd?Math.min(100,n):n}(n)).forEach(P)}function D(s){k("fshCheckAll",s.target)&&function(s){const n=i("item-div")||i("item-list"),t=g("table:not(.fshHide)",n)
t.map(_).forEach(G),q(s.target.id,t)}(s)}function F(s){return b(`[${s}]`)}function O(){const s=F(L("sendClasses"))
return s||F(S.sendClasses)}function R(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function J(){const s=T({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+O().map(R).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
d(s,D)
const n=i("item-list").parentNode.parentNode
l(s,n)}export default function(){n(3,w),n(3,J)}
//# sourceMappingURL=trade-1d8104e6.js.map
