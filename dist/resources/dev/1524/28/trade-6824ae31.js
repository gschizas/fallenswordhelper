import{x as e,a as t,aW as n,g as s,y as i,d as a,aX as o,e as r,o as c,t as d,m as l,b as f,h as m,l as u,a3 as p,C as h,D as k,H as b,aN as g,aV as S,c as j}from"./calfSystem-b136673a.js"
import{n as L}from"./numberIsNaN-91041dcf.js"
import{i as v}from"./insertElementBefore-eada6f05.js"
import{c as y}from"./createButton-f2fbc414.js"
import{h as N}from"./hideElement-c14a94c9.js"
import{s as I}from"./senditems-d7b4a65c.js"
import"./indexAjaxJson-ea0d9bb9.js"
import"./cmdExport-bd5eafa5.js"
import"./guildStore-a5ab07ad.js"
import"./getInventory-3e718e5a.js"
import{g as B}from"./getInventoryById-bc1a2a8f.js"
import{i as A}from"./insertElementAfter-a11d280f.js"
import{i as C}from"./insertHtmlBeforeBegin-30541a5f.js"
import{c as E}from"./createTr-9dcea384.js"
let H
function T(e,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=u("fshHide",t),s="folderid0"===e,i=u(e,t);(function(e,t,n){return e&&p(t,n)})(n,s,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(e,t,n){return!e&&!t&&!n}(n,s,i)&&(t.classList.remove("fshBlock"),N(t))}function x(e){s(a,function(){let e=i("item-div")
if(!e){e=l({id:"item-div",className:"itemDiv"})
const t=i("item-list"),n=f(a,t)
for(;n.length;)n[0].classList.add("fshBlock"),m(e,n[0])
v(e,t)}return e}()).forEach(d(T,e.target.id))}function M(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&x(e)}function $(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function W(e){const t=e.children[0].lastElementChild.children[0].children[0],n=H[t.getAttribute("value")]
n&&(e.classList.add("folderid"+n.folder_id),H.fshHasST&&function(e,t){t.is_in_st&&e.classList.add("isInST")}(e,n),t.classList.add("itemid"+n.item_id),t.classList.add("itemtype"+n.type))}function _(e){n("trade.processTrade"),H=e.items
s(a,i("item-list")).forEach(W),function(e){const t=E({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+r(e).map($).join("")})
c(t,M)
const n=i("item-list").parentNode.parentNode
C(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),v(t,n)}(e.folders),o("trade.processTrade")}function w(e){t(3,_,[e])}function O(){e()||B().then(w)}function F(e,t){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(n=t[0],s=t[1],I(n,s)):e
var n,s})}function D(){const e=h('form[name="sendItemForm"] [name="target_username"]')
k('[name="sendItemList[]"]:checked').map(t=>[e.value,[t.value]]).reduce(F,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function P(){const e=h('form[name="sendItemForm"] input[value="Send"]'),t=y({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
A(t,e),c(t,D)}function R(e,t){return"itemid-1"===e||function(e,t){return"itemid-2"===e&&u("itemtype12",t)}(e,t)||u(e,t)}function z(e,t){return e||!u("isInST",t)}function J(e){return e.children[0].lastElementChild.children[0].children[0]}function V(e,t){t.checked=e}function X(e){V(!1,e)}function q(e){V(!0,e)}function G(e,t){t.filter(d(z,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(J).filter(d(R,e)).slice(0,function(e){const t=parseInt(i("fshSendHowMany").value,10)
return L(t)?e.length:"-"!==j.subcmd?Math.min(100,t):t}(t)).forEach(q)}function K(e){u("fshCheckAll",e.target)&&function(e){const t=i("item-div")||i("item-list"),n=k("table:not(.fshHide)",t)
n.map(J).forEach(X),G(e.target.id,n)}(e)}function Q(e){return g(`[${e}]`)}function U(){const e=Q(b("sendClasses"))
return e||Q(S.sendClasses)}function Y(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=E({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+U().map(Y).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(e,K)
const t=i("item-list").parentNode.parentNode
v(e,t)}function ee(){t(3,O),t(3,Z),t(3,P)}export default ee
//# sourceMappingURL=trade-6824ae31.js.map
