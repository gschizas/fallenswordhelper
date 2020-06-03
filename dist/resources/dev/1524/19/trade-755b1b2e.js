import{w as e,a as t,aY as n,g as s,x as i,d as a,aZ as o,l as r,o as c,s as l,k as d,b as f,f as m,a1 as u,N as p,I as h,aH as k,D as L,aN as b,aX as g,c as S}from"./calfSystem-f7574730.js"
import{n as j}from"./numberIsNaN-92f332e4.js"
import{i as v}from"./insertElementBefore-b5c9c232.js"
import{c as N}from"./createButton-0ed19c7f.js"
import{h as y}from"./hideElement-8a032490.js"
import{i as I}from"./insertHtmlBeforeBegin-474099b5.js"
import"./indexAjaxJson-66a839ba.js"
import{s as B}from"./senditems-38df50c1.js"
import{c as A}from"./createTr-5b043bb5.js"
import"./cmdExport-da1f542a.js"
import"./guildStore-8fe7d393.js"
import"./getInventory-580028ac.js"
import{g as E}from"./getInventoryById-c0c88cd1.js"
import{i as H}from"./insertElementAfter-3b34b5ac.js"
let C
function T(e,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=t.classList.contains("fshHide"),s="folderid0"===e,i=t.classList.contains(e);(function(e,t,n){return e&&u(t,n)})(n,s,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(e,t,n){return!e&&!t&&!n}(n,s,i)&&(t.classList.remove("fshBlock"),y(t))}function x(e){s(a,function(){let e=i("item-div")
if(!e){e=d({id:"item-div",className:"itemDiv"})
const t=i("item-list"),n=f(a,t)
for(;n.length;)n[0].classList.add("fshBlock"),m(e,n[0])
v(e,t)}return e}()).forEach(l(T,e.target.id))}function M(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&x(e)}function $(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function w(e){const t=e.children[0].lastElementChild.children[0].children[0],n=C[t.getAttribute("value")]
n&&(e.classList.add("folderid"+n.folder_id),C.fshHasST&&function(e,t){t.is_in_st&&e.classList.add("isInST")}(e,n),t.classList.add("itemid"+n.item_id),t.classList.add("itemtype"+n.type))}function _(e){n("trade.processTrade"),C=e.items
s(a,i("item-list")).forEach(w),function(e){const t=A({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+r(e).map($).join("")})
c(t,M)
const n=i("item-list").parentNode.parentNode
I(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),v(t,n)}(e.folders),o("trade.processTrade")}function O(e){t(3,_,[e])}function W(){e()||E().then(O)}function F(e,t){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(n=t[0],s=t[1],B(n,s)):e
var n,s})}function D(){const e=p('form[name="sendItemForm"] [name="target_username"]')
h('[name="sendItemList[]"]:checked').map(t=>[e.value,[t.value]]).reduce(F,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function P(){const e=p('form[name="sendItemForm"] input[value="Send"]'),t=N({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
H(t,e),c(t,D)}function R(e,t){return"itemid-1"===e||function(e,t){return"itemid-2"===e&&k("itemtype12",t)}(e,t)||k(e,t)}function z(e,t){return e||!k("isInST",t)}function J(e){return e.children[0].lastElementChild.children[0].children[0]}function X(e,t){t.checked=e}function Y(e){X(!1,e)}function Z(e){X(!0,e)}function q(e,t){t.filter(l(z,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(J).filter(l(R,e)).slice(0,function(e){const t=parseInt(i("fshSendHowMany").value,10)
return j(t)?e.length:"-"!==S.subcmd?Math.min(100,t):t}(t)).forEach(Z)}function G(e){k("fshCheckAll",e.target)&&function(e){const t=i("item-div")||i("item-list"),n=h("table:not(.fshHide)",t)
n.map(J).forEach(Y),q(e.target.id,n)}(e)}function K(e){return b(`[${e}]`)}function Q(){const e=K(L("sendClasses"))
return e||K(g.sendClasses)}function U(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function V(){const e=A({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+Q().map(U).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(e,G)
const t=i("item-list").parentNode.parentNode
v(e,t)}export default function(){t(3,W),t(3,V),t(3,P)}
//# sourceMappingURL=trade-755b1b2e.js.map
