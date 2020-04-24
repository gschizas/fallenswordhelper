import{z as e,a as n,bh as s,g as t,A as i,c as a,bi as o,q as c,o as r,P as l,v as d,l as f,b as m,h as u,ab as h,n as p,S as b,V as g,N as k,aJ as L,G as S,aV as v,bg as y,e as N}from"./calfSystem-94018cd0.js"
import{n as I}from"./numberIsNaN-b4c6efab.js"
import{c as j}from"./createButton-080d3bb7.js"
import{i as B}from"./insertHtmlBeforeBegin-0aeb26c4.js"
import{s as $}from"./senditems-cbd5cbbf.js"
import{c as A}from"./createTr-d40f5baa.js"
import"./guildStore-a2f15cc6.js"
import"./getInventory-d981836a.js"
import{g as C}from"./getInventoryById-8ad86d92.js"
let H
function T(e,n){n.children[0].lastElementChild.children[0].children[0].checked=!1
const s=n.classList.contains("fshHide"),t="folderid0"===e,i=n.classList.contains(e);(function(e,n,s){return e&&h(n,s)})(s,t,i)&&(n.classList.remove("fshHide"),n.classList.add("fshBlock")),function(e,n,s){return!e&&!n&&!s}(s,t,i)&&(n.classList.remove("fshBlock"),p(n))}function E(e){t(a,function(){let e=i("item-div")
if(!e){e=f({id:"item-div",className:"itemDiv"})
const n=i("item-list"),s=m(a,n)
for(;s.length;)s[0].classList.add("fshBlock"),u(e,s[0])
l(e,n)}return e}()).forEach(d(T,e.target.id))}function M(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&E(e)}function x(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function _(e){const n=e.children[0].lastElementChild.children[0].children[0],s=H[n.getAttribute("value")]
s&&(e.classList.add(`folderid${s.folder_id}`),H.fshHasST&&function(e,n){n.is_in_st&&e.classList.add("isInST")}(e,s),n.classList.add(`itemid${s.item_id}`),n.classList.add(`itemtype${s.type}`))}function w(e){s("trade.processTrade"),H=e.items,t(a,i("item-list")).forEach(_),function(e){const n=A({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span>'+` &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>${c(e).map(x).join("")}`})
r(n,M)
const s=i("item-list").parentNode.parentNode
B(s,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),l(n,s)}(e.folders),o("trade.processTrade")}function O(e){n(3,w,[e])}function W(){e()||C().then(O)}function F(e,n){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(s=n[0],t=n[1],$(s,t)):e
var s,t})}function P(){const e=b('form[name="sendItemForm"] [name="target_username"]')
k('[name="sendItemList[]"]:checked').map(n=>[e.value,[n.value]]).reduce(F,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function z(){const e=b('form[name="sendItemForm"] input[value="Send"]'),n=j({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
g(n,e),r(n,P)}function R(e,n){return"itemid-1"===e||function(e,n){return"itemid-2"===e&&L("itemtype12",n)}(e,n)||L(e,n)}function V(e,n){return e||!L("isInST",n)}function q(e){return e.children[0].lastElementChild.children[0].children[0]}function D(e,n){n.checked=e}function G(e){D(!1,e)}function J(e){D(!0,e)}function K(e,n){n.filter(d(V,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(q).filter(d(R,e)).slice(0,function(e){const n=parseInt(i("fshSendHowMany").value,10)
return I(n)?e.length:"-"!==N.subcmd?Math.min(100,n):n}(n)).forEach(J)}function Q(e){L("fshCheckAll",e.target)&&function(e){const n=i("item-div")||i("item-list"),s=k("table:not(.fshHide)",n)
s.map(q).forEach(G),K(e.target.id,s)}(e)}function U(e){return v(`[${e}]`)}function X(){const e=U(S("sendClasses"))
return e||U(y.sendClasses)}function Y(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=A({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">'+`All Resources</span>${X().map(Y).join("")}`+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
r(e,Q)
const n=i("item-list").parentNode.parentNode
l(e,n)}export default function(){n(3,W),n(3,Z),n(3,z)}
//# sourceMappingURL=trade-b495b81b.js.map
