import{y as s,a as n,g as t,z as e,d as i,n as a,o as c,O as o,u as d,k as l,b as r,f,a9 as u,m as h,aF as m,F as p,aS as k,bb as L,M as S,c as g}from"./calfSystem-d587d232.js"
import{n as b}from"./numberIsNaN-054e0c59.js"
import{i as y}from"./insertHtmlBeforeBegin-d42e4723.js"
import{c as N}from"./createTr-ebe71d20.js"
import"./getInventory-0d251a2b.js"
import{g as v}from"./getInventoryById-a2479f17.js"
let H
function I(s,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const t=n.classList.contains("fshHide"),e="folderid0"===s,i=n.classList.contains(s);(function(s,n,t){return s&&u(n,t)})(t,e,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(s,n,t){return!s&&!n&&!t}(t,e,i)&&(n.classList.remove("fshBlock"),h(n))}function A(s){t(i,function(){let s=e("item-div")
if(!s){s=l({id:"item-div",className:"itemDiv"})
const n=e("item-list"),t=r(i,n)
for(;t.length;)t[0].classList.add("fshBlock"),f(s,t[0])
o(s,n)}return s}()).forEach(d(I,s.target.id))}function C(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&A(s)}function j(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function M(s){const n=s.children[0].lastElementChild.children[0].children[0],t=H[n.getAttribute("value")]
t&&(s.classList.add("folderid"+t.folder_id),H.fshHasST&&function(s,n){n.is_in_st&&s.classList.add("isInST")}(s,t),n.classList.add("itemid"+t.item_id),n.classList.add("itemtype"+t.type))}function T(s){H=s.items
t(i,e("item-list")).forEach(M),function(s){const n=N({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+a(s).map(j).join("")})
c(n,C)
const t=e("item-list").parentNode.parentNode
y(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),o(n,t)}(s.folders)}function E(s){n(3,T,[s])}function B(){s()||v().then(E)}function $(s,n){return"itemid-1"===s||function(s,n){return"itemid-2"===s&&m("itemtype12",n)}(s,n)||m(s,n)}function w(s,n){return s||!m("isInST",n)}function x(s){return s.children[0].lastElementChild.children[0].children[0]}function W(s,n){n.checked=s}function _(s){W(!1,s)}function F(s){W(!0,s)}function z(s,n){n.filter(d(w,function(){const s=e("itemsInSt")
if(s)return s.checked}())).map(x).filter(d($,s)).slice(0,function(s){const n=parseInt(e("fshSendHowMany").value,10)
return b(n)?s.length:"-"!==g.subcmd?Math.min(100,n):n}(n)).forEach(F)}function O(s){m("fshCheckAll",s.target)&&function(s){const n=e("item-div")||e("item-list"),t=S("table:not(.fshHide)",n)
t.map(x).forEach(_),z(s.target.id,t)}(s)}function D(s){return k(`[${s}]`)}function P(){const s=D(p("sendClasses"))
return s||D(L.sendClasses)}function R(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function q(){const s=N({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+P().map(R).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(s,O)
const n=e("item-list").parentNode.parentNode
o(s,n)}export default function(){n(3,B),n(3,q)}
//# sourceMappingURL=trade-f6aed397.js.map
