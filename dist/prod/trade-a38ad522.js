import{z as s,a as n,g as t,A as e,c as i,q as a,o as c,P as l,v as o,l as d,b as r,h as f,aa as h,n as u,aG as m,G as p,aT as k,bc as L,N as S,e as g}from"./calfSystem-cb871cc0.js"
import{n as N}from"./numberIsNaN-3061f097.js"
import{i as b}from"./insertHtmlBeforeBegin-4c679357.js"
import{c as v}from"./createTr-5675cff3.js"
import"./getInventory-c0738a63.js"
import{g as y}from"./getInventoryById-b99328c1.js"
let $
function A(s,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const t=n.classList.contains("fshHide"),e="folderid0"===s,i=n.classList.contains(s);(function(s,n,t){return s&&h(n,t)})(t,e,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(s,n,t){return!s&&!n&&!t}(t,e,i)&&(n.classList.remove("fshBlock"),u(n))}function H(s){t(i,function(){let s=e("item-div")
if(!s){s=d({id:"item-div",className:"itemDiv"})
const n=e("item-list"),t=r(i,n)
for(;t.length;)t[0].classList.add("fshBlock"),f(s,t[0])
l(s,n)}return s}()).forEach(o(A,s.target.id))}function I(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&H(s)}function C(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function T(s){const n=s.children[0].lastElementChild.children[0].children[0],t=$[n.getAttribute("value")]
t&&(s.classList.add(`folderid${t.folder_id}`),$.fshHasST&&function(s,n){n.is_in_st&&s.classList.add("isInST")}(s,t),n.classList.add(`itemid${t.item_id}`),n.classList.add(`itemtype${t.type}`))}function j(s){$=s.items,t(i,e("item-list")).forEach(T),function(s){const n=v({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span>'+` &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>${a(s).map(C).join("")}`})
c(n,I)
const t=e("item-list").parentNode.parentNode
b(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,t)}(s.folders)}function E(s){n(3,j,[s])}function M(){s()||y().then(E)}function B(s,n){return"itemid-1"===s||function(s,n){return"itemid-2"===s&&m("itemtype12",n)}(s,n)||m(s,n)}function w(s,n){return s||!m("isInST",n)}function x(s){return s.children[0].lastElementChild.children[0].children[0]}function W(s,n){n.checked=s}function _(s){W(!1,s)}function z(s){W(!0,s)}function G(s,n){n.filter(o(w,function(){const s=e("itemsInSt")
if(s)return s.checked}())).map(x).filter(o(B,s)).slice(0,function(s){const n=parseInt(e("fshSendHowMany").value,10)
return N(n)?s.length:"-"!==g.subcmd?Math.min(100,n):n}(n)).forEach(z)}function P(s){m("fshCheckAll",s.target)&&function(s){const n=e("item-div")||e("item-list"),t=S("table:not(.fshHide)",n)
t.map(x).forEach(_),G(s.target.id,t)}(s)}function q(s){return k(`[${s}]`)}function D(){const s=q(p("sendClasses"))
return s||q(L.sendClasses)}function F(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function O(){const s=v({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">'+`All Resources</span>${D().map(F).join("")}`+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(s,P)
const n=e("item-list").parentNode.parentNode
l(s,n)}export default function(){n(3,M),n(3,O)}
//# sourceMappingURL=trade-a38ad522.js.map
