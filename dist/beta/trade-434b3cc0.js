import{z as s,a as n,bd as t,g as e,A as i,c as a,be as c,q as d,o,P as l,v as r,l as f,b as h,h as u,aa as p,n as m,aG as k,G as L,aT as S,bc as b,N as g,e as N}from"./calfSystem-07c25a1c.js"
import{n as v}from"./numberIsNaN-77d2bff3.js"
import{i as y}from"./insertHtmlBeforeBegin-a38d5f5e.js"
import{c as T}from"./createTr-8d11f5dc.js"
import"./getInventory-346a3db3.js"
import{g as $}from"./getInventoryById-02cab4dd.js"
let A
function H(s,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const t=n.classList.contains("fshHide"),e="folderid0"===s,i=n.classList.contains(s);(function(s,n,t){return s&&p(n,t)})(t,e,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(s,n,t){return!s&&!n&&!t}(t,e,i)&&(n.classList.remove("fshBlock"),m(n))}function I(s){e(a,function(){let s=i("item-div")
if(!s){s=f({id:"item-div",className:"itemDiv"})
const n=i("item-list"),t=h(a,n)
for(;t.length;)t[0].classList.add("fshBlock"),u(s,t[0])
l(s,n)}return s}()).forEach(r(H,s.target.id))}function C(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&I(s)}function j(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function E(s){const n=s.children[0].lastElementChild.children[0].children[0],t=A[n.getAttribute("value")]
t&&(s.classList.add(`folderid${t.folder_id}`),A.fshHasST&&function(s,n){n.is_in_st&&s.classList.add("isInST")}(s,t),n.classList.add(`itemid${t.item_id}`),n.classList.add(`itemtype${t.type}`))}function M(s){t("trade.processTrade"),A=s.items,e(a,i("item-list")).forEach(E),function(s){const n=T({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span>'+` &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>${d(s).map(j).join("")}`})
o(n,C)
const t=i("item-list").parentNode.parentNode
y(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,t)}(s.folders),c("trade.processTrade")}function B(s){n(3,M,[s])}function w(){s()||$().then(B)}function x(s,n){return"itemid-1"===s||function(s,n){return"itemid-2"===s&&k("itemtype12",n)}(s,n)||k(s,n)}function W(s,n){return s||!k("isInST",n)}function _(s){return s.children[0].lastElementChild.children[0].children[0]}function z(s,n){n.checked=s}function G(s){z(!1,s)}function P(s){z(!0,s)}function q(s,n){n.filter(r(W,function(){const s=i("itemsInSt")
if(s)return s.checked}())).map(_).filter(r(x,s)).slice(0,function(s){const n=parseInt(i("fshSendHowMany").value,10)
return v(n)?s.length:"-"!==N.subcmd?Math.min(100,n):n}(n)).forEach(P)}function D(s){k("fshCheckAll",s.target)&&function(s){const n=i("item-div")||i("item-list"),t=g("table:not(.fshHide)",n)
t.map(_).forEach(G),q(s.target.id,t)}(s)}function F(s){return S(`[${s}]`)}function O(){const s=F(L("sendClasses"))
return s||F(b.sendClasses)}function R(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function J(){const s=T({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">'+`All Resources</span>${O().map(R).join("")}`+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
o(s,D)
const n=i("item-list").parentNode.parentNode
l(s,n)}export default function(){n(3,w),n(3,J)}
//# sourceMappingURL=trade-434b3cc0.js.map
