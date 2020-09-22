import{x as e,a as t,aX as n,g as s,y as i,d as a,aY as o,e as r,o as c,t as d,m as l,b as f,h as m,l as u,a3 as p,C as h,D as k,H as g,aN as S,aW as j,c as L}from"./calfSystem-38898f3e.js"
import{n as v}from"./numberIsNaN-00e0daaf.js"
import{i as y}from"./insertElementBefore-2ad05963.js"
import{c as N}from"./createButton-ee9aa2e8.js"
import{h as b}from"./hideElement-b044934d.js"
import{s as I}from"./senditems-82fd6fd1.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import"./guildStore-657dd13b.js"
import"./getInventory-41df5894.js"
import{g as B}from"./getInventoryById-e93c5950.js"
import{i as A}from"./insertElementAfter-94e95b63.js"
import{i as C}from"./insertHtmlBeforeBegin-8e2e377b.js"
import{c as E}from"./createTr-3dc01479.js"
let H
function T(e,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=u("fshHide",t),s="folderid0"===e,i=u(e,t);(function(e,t,n){return e&&p(t,n)})(n,s,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(e,t,n){return!e&&!t&&!n}(n,s,i)&&(t.classList.remove("fshBlock"),b(t))}function x(e){s(a,function(){let e=i("item-div")
if(!e){e=l({id:"item-div",className:"itemDiv"})
const t=i("item-list"),n=f(a,t)
for(;n.length;)n[0].classList.add("fshBlock"),m(e,n[0])
y(e,t)}return e}()).forEach(d(T,e.target.id))}function M(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&x(e)}function $(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function W(e){const t=e.children[0].lastElementChild.children[0].children[0],n=H[t.getAttribute("value")]
n&&(e.classList.add("folderid"+n.folder_id),H.fshHasST&&function(e,t){t.is_in_st&&e.classList.add("isInST")}(e,n),t.classList.add("itemid"+n.item_id),t.classList.add("itemtype"+n.type))}function _(e){n("trade.processTrade"),H=e.items
s(a,i("item-list")).forEach(W),function(e){const t=E({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+r(e).map($).join("")})
c(t,M)
const n=i("item-list").parentNode.parentNode
C(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),y(t,n)}(e.folders),o("trade.processTrade")}function w(e){t(3,_,[e])}function O(){e()||B().then(w)}function F(e,t){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(n=t[0],s=t[1],I(n,s)):e
var n,s})}function D(){const e=h('form[name="sendItemForm"] [name="target_username"]')
k('[name="sendItemList[]"]:checked').map(t=>[e.value,[t.value]]).reduce(F,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function P(){const e=h('form[name="sendItemForm"] input[value="Send"]'),t=N({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
A(t,e),c(t,D)}function R(e,t){return"itemid-1"===e||function(e,t){return"itemid-2"===e&&u("itemtype12",t)}(e,t)||u(e,t)}function z(e,t){return e||!u("isInST",t)}function J(e){return e.children[0].lastElementChild.children[0].children[0]}function X(e,t){t.checked=e}function Y(e){X(!1,e)}function q(e){X(!0,e)}function G(e,t){t.filter(d(z,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(J).filter(d(R,e)).slice(0,function(e){const t=parseInt(i("fshSendHowMany").value,10)
return v(t)?e.length:"-"!==L.subcmd?Math.min(100,t):t}(t)).forEach(q)}function K(e){u("fshCheckAll",e.target)&&function(e){const t=i("item-div")||i("item-list"),n=k("table:not(.fshHide)",t)
n.map(J).forEach(Y),G(e.target.id,n)}(e)}function Q(e){return S(`[${e}]`)}function U(){const e=Q(g("sendClasses"))
return e||Q(j.sendClasses)}function V(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=E({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+U().map(V).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(e,K)
const t=i("item-list").parentNode.parentNode
y(e,t)}function ee(){t(3,O),t(3,Z),t(3,P)}export default ee
//# sourceMappingURL=trade-dfb9b154.js.map
