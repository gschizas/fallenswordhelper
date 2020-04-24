import{z as s,a as e,bd as n,g as t,A as i,c as a,be as c,q as o,o as d,P as l,v as r,l as f,b as h,h as u,aa as p,n as m,aG as k,G as L,aT as S,bc as g,N,e as b}from"./calfSystem-c91e004c.js"
import{n as v}from"./numberIsNaN-e812a421.js"
import{i as y}from"./insertHtmlBeforeBegin-31134dae.js"
import{c as T}from"./createTr-5d08b813.js"
import"./getInventory-3d2af7a6.js"
import{g as $}from"./getInventoryById-492e9f2a.js"
let A
function H(s,e){e.children[0].lastElementChild.children[0].children[0].checked=!1
const n=e.classList.contains("fshHide"),t="folderid0"===s,i=e.classList.contains(s);(function(s,e,n){return s&&p(e,n)})(n,t,i)&&(e.classList.remove("fshHide"),e.classList.add("fshBlock")),function(s,e,n){return!s&&!e&&!n}(n,t,i)&&(e.classList.remove("fshBlock"),m(e))}function I(s){t(a,function(){let s=i("item-div")
if(!s){s=f({id:"item-div",className:"itemDiv"})
const e=i("item-list"),n=h(a,e)
for(;n.length;)n[0].classList.add("fshBlock"),u(s,n[0])
l(s,e)}return s}()).forEach(r(H,s.target.id))}function C(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&I(s)}function j(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function E(s){const e=s.children[0].lastElementChild.children[0].children[0],n=A[e.getAttribute("value")]
n&&(s.classList.add(`folderid${n.folder_id}`),A.fshHasST&&function(s,e){e.is_in_st&&s.classList.add("isInST")}(s,n),e.classList.add(`itemid${n.item_id}`),e.classList.add(`itemtype${n.type}`))}function M(s){n("trade.processTrade"),A=s.items,t(a,i("item-list")).forEach(E),function(s){const e=T({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span>'+` &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>${o(s).map(j).join("")}`})
d(e,C)
const n=i("item-list").parentNode.parentNode
y(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(e,n)}(s.folders),c("trade.processTrade")}function B(s){e(3,M,[s])}function w(){s()||$().then(B)}function x(s,e){return"itemid-1"===s||function(s,e){return"itemid-2"===s&&k("itemtype12",e)}(s,e)||k(s,e)}function W(s,e){return s||!k("isInST",e)}function _(s){return s.children[0].lastElementChild.children[0].children[0]}function z(s,e){e.checked=s}function G(s){z(!1,s)}function P(s){z(!0,s)}function q(s,e){e.filter(r(W,function(){const s=i("itemsInSt")
if(s)return s.checked}())).map(_).filter(r(x,s)).slice(0,function(s){const e=parseInt(i("fshSendHowMany").value,10)
return v(e)?s.length:"-"!==b.subcmd?Math.min(100,e):e}(e)).forEach(P)}function D(s){k("fshCheckAll",s.target)&&function(s){const e=i("item-div")||i("item-list"),n=N("table:not(.fshHide)",e)
n.map(_).forEach(G),q(s.target.id,n)}(s)}function F(s){return S(`[${s}]`)}function O(){const s=F(L("sendClasses"))
return s||F(g.sendClasses)}function R(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function J(){const s=T({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">'+`All Resources</span>${O().map(R).join("")}`+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
d(s,D)
const e=i("item-list").parentNode.parentNode
l(s,e)}export default function(){e(3,w),e(3,J)}
//# sourceMappingURL=trade-325e21ee.js.map
