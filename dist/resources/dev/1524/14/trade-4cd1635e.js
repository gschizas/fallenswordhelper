import{y as e,a as n,bg as s,g as t,z as i,d as a,bh as o,n as c,o as r,O as l,u as d,k as f,b as m,f as u,aa as h,m as p,R as k,U as b,M as g,aI as L,F as S,aU as v,bf as y,c as I}from"./calfSystem-d96a3efd.js"
import{n as N}from"./numberIsNaN-5b8bfc11.js"
import{c as j}from"./createButton-e6d20fb1.js"
import{i as B}from"./insertHtmlBeforeBegin-449d0625.js"
import{s as C}from"./senditems-8ce986a1.js"
import{c as H}from"./createTr-441d9d7e.js"
import"./guildStore-0302347f.js"
import"./getInventory-1d86043b.js"
import{g as T}from"./getInventoryById-bb2e70f9.js"
let A
function M(e,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const s=n.classList.contains("fshHide"),t="folderid0"===e,i=n.classList.contains(e);(function(e,n,s){return e&&h(n,s)})(s,t,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(e,n,s){return!e&&!n&&!s}(s,t,i)&&(n.classList.remove("fshBlock"),p(n))}function E(e){t(a,function(){let e=i("item-div")
if(!e){e=f({id:"item-div",className:"itemDiv"})
const n=i("item-list"),s=m(a,n)
for(;s.length;)s[0].classList.add("fshBlock"),u(e,s[0])
l(e,n)}return e}()).forEach(d(M,e.target.id))}function $(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&E(e)}function x(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function O(e){const n=e.children[0].lastElementChild.children[0].children[0],s=A[n.getAttribute("value")]
s&&(e.classList.add("folderid"+s.folder_id),A.fshHasST&&function(e,n){n.is_in_st&&e.classList.add("isInST")}(e,s),n.classList.add("itemid"+s.item_id),n.classList.add("itemtype"+s.type))}function _(e){s("trade.processTrade"),A=e.items
t(a,i("item-list")).forEach(O),function(e){const n=H({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+c(e).map(x).join("")})
r(n,$)
const s=i("item-list").parentNode.parentNode
B(s,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,s)}(e.folders),o("trade.processTrade")}function w(e){n(3,_,[e])}function F(){e()||T().then(w)}function W(e,n){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(s=n[0],t=n[1],C(s,t)):e
var s,t})}function R(){const e=k('form[name="sendItemForm"] [name="target_username"]')
g('[name="sendItemList[]"]:checked').map(n=>[e.value,[n.value]]).reduce(W,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function z(){const e=k('form[name="sendItemForm"] input[value="Send"]'),n=j({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
b(n,e),r(n,R)}function P(e,n){return"itemid-1"===e||function(e,n){return"itemid-2"===e&&L("itemtype12",n)}(e,n)||L(e,n)}function U(e,n){return e||!L("isInST",n)}function D(e){return e.children[0].lastElementChild.children[0].children[0]}function q(e,n){n.checked=e}function G(e){q(!1,e)}function J(e){q(!0,e)}function K(e,n){n.filter(d(U,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(D).filter(d(P,e)).slice(0,function(e){const n=parseInt(i("fshSendHowMany").value,10)
return N(n)?e.length:"-"!==I.subcmd?Math.min(100,n):n}(n)).forEach(J)}function Q(e){L("fshCheckAll",e.target)&&function(e){const n=i("item-div")||i("item-list"),s=g("table:not(.fshHide)",n)
s.map(D).forEach(G),K(e.target.id,s)}(e)}function V(e){return v(`[${e}]`)}function X(){const e=V(S("sendClasses"))
return e||V(y.sendClasses)}function Y(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=H({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+X().map(Y).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
r(e,Q)
const n=i("item-list").parentNode.parentNode
l(e,n)}export default function(){n(3,F),n(3,Z),n(3,z)}
//# sourceMappingURL=trade-4cd1635e.js.map
