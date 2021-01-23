import{x as e,a as t,af as n,g as s,y as i,d as a,ag as o,e as r,o as c,t as l,m as d,b as f,h as m,l as u,a3 as p,C as h,D as b,H as g,b8 as k,ae as S,c as j}from"./calfSystem-393ab895.js"
import{c as L}from"./createTr-3445c81f.js"
import{g as v}from"./getInventoryById-ed6dc7be.js"
import{h as y}from"./hideElement-d4551277.js"
import{i as N}from"./insertElementBefore-43970b1f.js"
import{i as I}from"./insertHtmlBeforeBegin-919eb8f8.js"
import{n as B}from"./numberIsNaN-53300e34.js"
import{c as A}from"./createButton-3f9a1ed2.js"
import{s as C}from"./senditems-6bc595ab.js"
import{i as E}from"./insertElementAfter-2264cfb0.js"
import"./getInventory-55e989a6.js"
import"./guildStore-e2a17b6e.js"
import"./cmdExport-ef0399c5.js"
import"./indexAjaxJson-f78a3fe6.js"
let H
function $(e,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=u("fshHide",t),s="folderid0"===e,i=u(e,t);(function(e,t,n){return e&&p(t,n)})(n,s,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(e,t,n){return!e&&!t&&!n}(n,s,i)&&(t.classList.remove("fshBlock"),y(t))}function T(e){s(a,function(){let e=i("item-div")
if(!e){e=d({id:"item-div",className:"itemDiv"})
const t=i("item-list"),n=f(a,t)
for(;n.length;)n[0].classList.add("fshBlock"),m(e,n[0])
N(e,t)}return e}()).forEach(l($,e.target.id))}function x(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&T(e)}function M(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function _(e){const t=e.children[0].lastElementChild.children[0].children[0],n=H[t.getAttribute("value")]
n&&(e.classList.add(`folderid${n.folder_id}`),H.fshHasST&&function(e,t){t.is_in_st&&e.classList.add("isInST")}(e,n),t.classList.add(`itemid${n.item_id}`),t.classList.add(`itemtype${n.type}`))}function w(e){n("trade.processTrade"),H=e.items
s(a,i("item-list")).forEach(_),function(e){const t=L({id:"fshFolderSelect",innerHTML:`<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>${r(e).map(M).join("")}`})
c(t,x)
const n=i("item-list").parentNode.parentNode
I(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),N(t,n)}(e.folders),o("trade.processTrade")}function O(e){t(3,w,[e])}function W(){e()||v().then(O)}function F(e,t){return e.then((e=>{return console.log("promise data",e),null===e||e.s?(n=t[0],s=t[1],C(n,s)):e
var n,s}))}function D(){const e=h('form[name="sendItemForm"] [name="target_username"]')
b('[name="sendItemList[]"]:checked').map((t=>[e.value,[t.value]])).reduce(F,Promise.resolve(null)).then((e=>{console.log("finalResult",e)}))}function P(){const e=h('form[name="sendItemForm"] input[value="Send"]'),t=A({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
E(t,e),c(t,D)}function R(e,t){return"itemid-1"===e||function(e,t){return"itemid-2"===e&&u("itemtype12",t)}(e,t)||u(e,t)}function z(e,t){return e||!u("isInST",t)}function J(e){return e.children[0].lastElementChild.children[0].children[0]}function q(e,t){t.checked=e}function G(e){q(!1,e)}function K(e){q(!0,e)}function Q(e,t){t.filter(l(z,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(J).filter(l(R,e)).slice(0,function(e){const t=parseInt(i("fshSendHowMany").value,10)
return B(t)?e.length:"-"!==j.subcmd?Math.min(100,t):t}(t)).forEach(K)}function U(e){u("fshCheckAll",e.target)&&function(e){const t=i("item-div")||i("item-list"),n=b("table:not(.fshHide)",t)
n.map(J).forEach(G),Q(e.target.id,n)}(e)}function V(e){return k(`[${e}]`)}function X(){const e=V(g("sendClasses"))
return e||V(S.sendClasses)}function Y(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=L({id:"fshSelectMultiple",innerHTML:`<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>${X().map(Y).join("")} &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>`})
c(e,U)
const t=i("item-list").parentNode.parentNode
N(e,t)}function ee(){t(3,W),t(3,Z),t(3,P)}export default ee
//# sourceMappingURL=trade-2152a74c.js.map
