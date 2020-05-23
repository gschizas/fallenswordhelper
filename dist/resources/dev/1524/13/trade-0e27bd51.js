import{z as e,a as n,bh as s,g as t,A as i,c as a,bi as o,q as c,o as r,P as l,v as d,l as f,b as m,h as u,ab as h,n as p,S as g,V as k,N as L,aJ as S,G as b,aV as v,bg as y,e as N}from"./calfSystem-01eb06ed.js"
import{n as I}from"./numberIsNaN-5d7b8ccd.js"
import{c as j}from"./createButton-33c18cfd.js"
import{i as B}from"./insertHtmlBeforeBegin-27203589.js"
import{s as A}from"./senditems-45db17dc.js"
import{c as C}from"./createTr-da63342e.js"
import"./guildStore-d9a8ef20.js"
import"./getInventory-05bfac97.js"
import{g as H}from"./getInventoryById-963f9f8c.js"
let T
function E(e,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const s=n.classList.contains("fshHide"),t="folderid0"===e,i=n.classList.contains(e);(function(e,n,s){return e&&h(n,s)})(s,t,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(e,n,s){return!e&&!n&&!s}(s,t,i)&&(n.classList.remove("fshBlock"),p(n))}function M(e){t(a,function(){let e=i("item-div")
if(!e){e=f({id:"item-div",className:"itemDiv"})
const n=i("item-list"),s=m(a,n)
for(;s.length;)s[0].classList.add("fshBlock"),u(e,s[0])
l(e,n)}return e}()).forEach(d(E,e.target.id))}function $(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&M(e)}function x(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function _(e){const n=e.children[0].lastElementChild.children[0].children[0],s=T[n.getAttribute("value")]
s&&(e.classList.add("folderid"+s.folder_id),T.fshHasST&&function(e,n){n.is_in_st&&e.classList.add("isInST")}(e,s),n.classList.add("itemid"+s.item_id),n.classList.add("itemtype"+s.type))}function w(e){s("trade.processTrade"),T=e.items
t(a,i("item-list")).forEach(_),function(e){const n=C({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+c(e).map(x).join("")})
r(n,$)
const s=i("item-list").parentNode.parentNode
B(s,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,s)}(e.folders),o("trade.processTrade")}function O(e){n(3,w,[e])}function W(){e()||H().then(O)}function F(e,n){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(s=n[0],t=n[1],A(s,t)):e
var s,t})}function P(){const e=g('form[name="sendItemForm"] [name="target_username"]')
L('[name="sendItemList[]"]:checked').map(n=>[e.value,[n.value]]).reduce(F,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function z(){const e=g('form[name="sendItemForm"] input[value="Send"]'),n=j({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
k(n,e),r(n,P)}function R(e,n){return"itemid-1"===e||function(e,n){return"itemid-2"===e&&S("itemtype12",n)}(e,n)||S(e,n)}function V(e,n){return e||!S("isInST",n)}function q(e){return e.children[0].lastElementChild.children[0].children[0]}function D(e,n){n.checked=e}function G(e){D(!1,e)}function J(e){D(!0,e)}function K(e,n){n.filter(d(V,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(q).filter(d(R,e)).slice(0,function(e){const n=parseInt(i("fshSendHowMany").value,10)
return I(n)?e.length:"-"!==N.subcmd?Math.min(100,n):n}(n)).forEach(J)}function Q(e){S("fshCheckAll",e.target)&&function(e){const n=i("item-div")||i("item-list"),s=L("table:not(.fshHide)",n)
s.map(q).forEach(G),K(e.target.id,s)}(e)}function U(e){return v(`[${e}]`)}function X(){const e=U(b("sendClasses"))
return e||U(y.sendClasses)}function Y(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=C({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+X().map(Y).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
r(e,Q)
const n=i("item-list").parentNode.parentNode
l(e,n)}export default function(){n(3,W),n(3,Z),n(3,z)}
//# sourceMappingURL=trade-0e27bd51.js.map
