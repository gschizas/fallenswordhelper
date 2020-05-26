import{w as s,a as e,ba as t,g as n,x as i,d as a,bb as c,l as o,o as r,s as d,k as l,b as f,f as m,$ as h,au as p,D as u,aE as k,b9 as L,I as b,c as S}from"./calfSystem-1262535f.js"
import{n as g}from"./numberIsNaN-e4fe1516.js"
import{i as j}from"./insertElementBefore-dcdbe7ae.js"
import{h as N}from"./hideElement-405c1665.js"
import{i as y}from"./insertHtmlBeforeBegin-5ac12245.js"
import"./indexAjaxJson-f27fbe77.js"
import{c as v}from"./createTr-0093f7ce.js"
import"./cmdExport-721bbaf9.js"
import"./getInventory-7d61d5d2.js"
import{g as E}from"./getInventoryById-3ff089d4.js"
let I
function A(s,e){e.children[0].lastElementChild.children[0].children[0].checked=!1
const t=e.classList.contains("fshHide"),n="folderid0"===s,i=e.classList.contains(s);(function(s,e,t){return s&&h(e,t)})(t,n,i)&&(e.classList.remove("fshHide"),e.classList.add("fshBlock")),function(s,e,t){return!s&&!e&&!t}(t,n,i)&&(e.classList.remove("fshBlock"),N(e))}function H(s){n(a,function(){let s=i("item-div")
if(!s){s=l({id:"item-div",className:"itemDiv"})
const e=i("item-list"),t=f(a,e)
for(;t.length;)t[0].classList.add("fshBlock"),m(s,t[0])
j(s,e)}return s}()).forEach(d(A,s.target.id))}function T(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&H(s)}function C(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function x(s){const e=s.children[0].lastElementChild.children[0].children[0],t=I[e.getAttribute("value")]
t&&(s.classList.add("folderid"+t.folder_id),I.fshHasST&&function(s,e){e.is_in_st&&s.classList.add("isInST")}(s,t),e.classList.add("itemid"+t.item_id),e.classList.add("itemtype"+t.type))}function B(s){t("trade.processTrade"),I=s.items
n(a,i("item-list")).forEach(x),function(s){const e=v({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+o(s).map(C).join("")})
r(e,T)
const t=i("item-list").parentNode.parentNode
y(t,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),j(e,t)}(s.folders),c("trade.processTrade")}function M(s){e(3,B,[s])}function $(){s()||E().then(M)}function w(s,e){return"itemid-1"===s||function(s,e){return"itemid-2"===s&&p("itemtype12",e)}(s,e)||p(s,e)}function W(s,e){return s||!p("isInST",e)}function _(s){return s.children[0].lastElementChild.children[0].children[0]}function D(s,e){e.checked=s}function z(s){D(!1,s)}function F(s){D(!0,s)}function J(s,e){e.filter(d(W,function(){const s=i("itemsInSt")
if(s)return s.checked}())).map(_).filter(d(w,s)).slice(0,function(s){const e=parseInt(i("fshSendHowMany").value,10)
return g(e)?s.length:"-"!==S.subcmd?Math.min(100,e):e}(e)).forEach(F)}function O(s){p("fshCheckAll",s.target)&&function(s){const e=i("item-div")||i("item-list"),t=b("table:not(.fshHide)",e)
t.map(_).forEach(z),J(s.target.id,t)}(s)}function P(s){return k(`[${s}]`)}function R(){const s=P(u("sendClasses"))
return s||P(L.sendClasses)}function q(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function G(){const s=v({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+R().map(q).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
r(s,O)
const e=i("item-list").parentNode.parentNode
j(s,e)}export default function(){e(3,$),e(3,G)}
//# sourceMappingURL=trade-646da4f1.js.map
