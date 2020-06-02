import{w as s,a as e,aW as t,g as n,x as i,d as a,aX as c,l as o,o as r,s as d,k as l,b as f,f as m,a0 as h,aC as p,D as u,aK as k,aV as L,I as S,c as g}from"./calfSystem-9554b525.js"
import{n as j}from"./numberIsNaN-f35fe828.js"
import{i as N}from"./insertElementBefore-5f238f78.js"
import{h as b}from"./hideElement-adf57e3b.js"
import{i as y}from"./insertHtmlBeforeBegin-f4dec0f3.js"
import"./indexAjaxJson-24e555fb.js"
import{c as v}from"./createTr-65654c70.js"
import"./cmdExport-d8ee0a12.js"
import"./getInventory-d47f4ff7.js"
import{g as I}from"./getInventoryById-8ed31e70.js"
let A
function C(s,e){e.children[0].lastElementChild.children[0].children[0].checked=!1
const t=e.classList.contains("fshHide"),n="folderid0"===s,i=e.classList.contains(s);(function(s,e,t){return s&&h(e,t)})(t,n,i)&&(e.classList.remove("fshHide"),e.classList.add("fshBlock")),function(s,e,t){return!s&&!e&&!t}(t,n,i)&&(e.classList.remove("fshBlock"),b(e))}function E(s){n(a,function(){let s=i("item-div")
if(!s){s=l({id:"item-div",className:"itemDiv"})
const e=i("item-list"),t=f(a,e)
for(;t.length;)t[0].classList.add("fshBlock"),m(s,t[0])
N(s,e)}return s}()).forEach(d(C,s.target.id))}function H(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&E(s)}function T(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function x(s){const e=s.children[0].lastElementChild.children[0].children[0],t=A[e.getAttribute("value")]
t&&(s.classList.add("folderid"+t.folder_id),A.fshHasST&&function(s,e){e.is_in_st&&s.classList.add("isInST")}(s,t),e.classList.add("itemid"+t.item_id),e.classList.add("itemtype"+t.type))}function B(s){t("trade.processTrade"),A=s.items
n(a,i("item-list")).forEach(x),function(s){const e=v({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+o(s).map(T).join("")})
r(e,H)
const t=i("item-list").parentNode.parentNode
y(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),N(e,t)}(s.folders),c("trade.processTrade")}function M(s){e(3,B,[s])}function $(){s()||I().then(M)}function w(s,e){return"itemid-1"===s||function(s,e){return"itemid-2"===s&&p("itemtype12",e)}(s,e)||p(s,e)}function W(s,e){return s||!p("isInST",e)}function _(s){return s.children[0].lastElementChild.children[0].children[0]}function D(s,e){e.checked=s}function z(s){D(!1,s)}function F(s){D(!0,s)}function J(s,e){e.filter(d(W,function(){const s=i("itemsInSt")
if(s)return s.checked}())).map(_).filter(d(w,s)).slice(0,function(s){const e=parseInt(i("fshSendHowMany").value,10)
return j(e)?s.length:"-"!==g.subcmd?Math.min(100,e):e}(e)).forEach(F)}function K(s){p("fshCheckAll",s.target)&&function(s){const e=i("item-div")||i("item-list"),t=S("table:not(.fshHide)",e)
t.map(_).forEach(z),J(s.target.id,t)}(s)}function O(s){return k(`[${s}]`)}function P(){const s=O(u("sendClasses"))
return s||O(L.sendClasses)}function R(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function V(){const s=v({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+P().map(R).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
r(s,K)
const e=i("item-list").parentNode.parentNode
N(s,e)}export default function(){e(3,$),e(3,V)}
//# sourceMappingURL=trade-f9f88e65.js.map
