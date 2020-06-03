import{w as s,a as t,g as n,x as e,d as i,l as a,o as c,s as o,k as l,b as r,f as d,a0 as f,aC as m,D as h,aK as p,aV as u,I as k,c as L}from"./calfSystem-6fc0cc1b.js"
import{n as S}from"./numberIsNaN-4ae9af58.js"
import{i as b}from"./insertElementBefore-6f4b88f2.js"
import{h as g}from"./hideElement-0911f8f2.js"
import{i as j}from"./insertHtmlBeforeBegin-66902ded.js"
import"./indexAjaxJson-608117f0.js"
import{c as N}from"./createTr-6cb5e7cf.js"
import"./cmdExport-ce8b0402.js"
import"./getInventory-9044dbdf.js"
import{g as y}from"./getInventoryById-1fb78caf.js"
let v
function I(s,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=t.classList.contains("fshHide"),e="folderid0"===s,i=t.classList.contains(s);(function(s,t,n){return s&&f(t,n)})(n,e,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(s,t,n){return!s&&!t&&!n}(n,e,i)&&(t.classList.remove("fshBlock"),g(t))}function A(s){n(i,function(){let s=e("item-div")
if(!s){s=l({id:"item-div",className:"itemDiv"})
const t=e("item-list"),n=r(i,t)
for(;n.length;)n[0].classList.add("fshBlock"),d(s,n[0])
b(s,t)}return s}()).forEach(o(I,s.target.id))}function C(s){"SPAN"===s.target.nodeName&&-1!==s.target.id.indexOf("folderid")&&A(s)}function E(s){return` &ensp;<span id="folderid${s[0]}" class="fshLink fshNoWrap" fid=${s[0]}>${s[1]}</span> `}function H(s){const t=s.children[0].lastElementChild.children[0].children[0],n=v[t.getAttribute("value")]
n&&(s.classList.add("folderid"+n.folder_id),v.fshHasST&&function(s,t){t.is_in_st&&s.classList.add("isInST")}(s,n),t.classList.add("itemid"+n.item_id),t.classList.add("itemtype"+n.type))}function x(s){v=s.items
n(i,e("item-list")).forEach(H),function(s){const t=N({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+a(s).map(E).join("")})
c(t,C)
const n=e("item-list").parentNode.parentNode
j(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),b(t,n)}(s.folders)}function T(s){t(3,x,[s])}function B(){s()||y().then(T)}function M(s,t){return"itemid-1"===s||function(s,t){return"itemid-2"===s&&m("itemtype12",t)}(s,t)||m(s,t)}function $(s,t){return s||!m("isInST",t)}function w(s){return s.children[0].lastElementChild.children[0].children[0]}function W(s,t){t.checked=s}function _(s){W(!1,s)}function D(s){W(!0,s)}function z(s,t){t.filter(o($,function(){const s=e("itemsInSt")
if(s)return s.checked}())).map(w).filter(o(M,s)).slice(0,function(s){const t=parseInt(e("fshSendHowMany").value,10)
return S(t)?s.length:"-"!==L.subcmd?Math.min(100,t):t}(t)).forEach(D)}function F(s){m("fshCheckAll",s.target)&&function(s){const t=e("item-div")||e("item-list"),n=k("table:not(.fshHide)",t)
n.map(w).forEach(_),z(s.target.id,n)}(s)}function J(s){return p(`[${s}]`)}function K(){const s=J(h("sendClasses"))
return s||J(u.sendClasses)}function O(s){return` &ensp;<span id="itemid${s[1]}" class="fshCheckAll fshLink fshNoWrap">${s[0]}</span>`}function P(){const s=N({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+K().map(O).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(s,F)
const t=e("item-list").parentNode.parentNode
b(s,t)}export default function(){t(3,B),t(3,P)}
//# sourceMappingURL=trade-92abf950.js.map
