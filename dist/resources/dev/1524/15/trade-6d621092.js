import{w as e,a as t,bb as n,g as s,x as i,d as a,bc as o,l as r,o as c,s as l,k as d,b as f,f as m,a0 as u,M as p,I as h,ax as b,D as k,aG as L,ba as g,c as S}from"./calfSystem-ee582533.js"
import{n as j}from"./numberIsNaN-c9f76e43.js"
import{i as v}from"./insertElementBefore-7ed837be.js"
import{c as y}from"./createButton-6e7396b9.js"
import{h as I}from"./hideElement-faecef36.js"
import{i as N}from"./insertHtmlBeforeBegin-66a80e13.js"
import"./indexAjaxJson-e486d467.js"
import{s as B}from"./senditems-4a0b6b24.js"
import{c as A}from"./createTr-bfcbc414.js"
import"./cmdExport-23cec039.js"
import"./guildStore-7cd0d847.js"
import"./getInventory-82e3b49f.js"
import{g as E}from"./getInventoryById-77125772.js"
import{i as x}from"./insertElementAfter-0f11924a.js"
let C
function H(e,t){t.children[0].lastElementChild.children[0].children[0].checked=!1
const n=t.classList.contains("fshHide"),s="folderid0"===e,i=t.classList.contains(e);(function(e,t,n){return e&&u(t,n)})(n,s,i)&&(t.classList.remove("fshHide"),t.classList.add("fshBlock")),function(e,t,n){return!e&&!t&&!n}(n,s,i)&&(t.classList.remove("fshBlock"),I(t))}function T(e){s(a,function(){let e=i("item-div")
if(!e){e=d({id:"item-div",className:"itemDiv"})
const t=i("item-list"),n=f(a,t)
for(;n.length;)n[0].classList.add("fshBlock"),m(e,n[0])
v(e,t)}return e}()).forEach(l(H,e.target.id))}function M(e){"SPAN"===e.target.nodeName&&-1!==e.target.id.indexOf("folderid")&&T(e)}function $(e){return` &ensp;<span id="folderid${e[0]}" class="fshLink fshNoWrap" fid=${e[0]}>${e[1]}</span> `}function w(e){const t=e.children[0].lastElementChild.children[0].children[0],n=C[t.getAttribute("value")]
n&&(e.classList.add("folderid"+n.folder_id),C.fshHasST&&function(e,t){t.is_in_st&&e.classList.add("isInST")}(e,n),t.classList.add("itemid"+n.item_id),t.classList.add("itemtype"+n.type))}function _(e){n("trade.processTrade"),C=e.items
s(a,i("item-list")).forEach(w),function(e){const t=A({id:"fshFolderSelect",innerHTML:'<td colspan=6><span id="folderid0" class="fshLink" fid=0>All</span> &ensp;<span id="folderid-1" class="fshLink" fid="-1">Main</span>'+r(e).map($).join("")})
c(t,M)
const n=i("item-list").parentNode.parentNode
N(n,'<tr id="fshShowSTs"><td align="center" colspan=6><label><input type="checkbox" id="itemsInSt" checked> Select items in ST</label></td></tr>'),v(t,n)}(e.folders),o("trade.processTrade")}function O(e){t(3,_,[e])}function W(){e()||E().then(O)}function F(e,t){return e.then(e=>{return console.log("promise data",e),null===e||e.s?(n=t[0],s=t[1],B(n,s)):e
var n,s})}function D(){const e=p('form[name="sendItemForm"] [name="target_username"]')
h('[name="sendItemList[]"]:checked').map(t=>[e.value,[t.value]]).reduce(F,Promise.resolve(null)).then(e=>{console.log("finalResult",e)})}function P(){const e=p('form[name="sendItemForm"] input[value="Send"]'),t=y({className:"fshBl",id:"oneByOneBtn",textContent:"OneByOne",type:"button"})
x(t,e),c(t,D)}function R(e,t){return"itemid-1"===e||function(e,t){return"itemid-2"===e&&b("itemtype12",t)}(e,t)||b(e,t)}function z(e,t){return e||!b("isInST",t)}function G(e){return e.children[0].lastElementChild.children[0].children[0]}function J(e,t){t.checked=e}function q(e){J(!1,e)}function K(e){J(!0,e)}function Q(e,t){t.filter(l(z,function(){const e=i("itemsInSt")
if(e)return e.checked}())).map(G).filter(l(R,e)).slice(0,function(e){const t=parseInt(i("fshSendHowMany").value,10)
return j(t)?e.length:"-"!==S.subcmd?Math.min(100,t):t}(t)).forEach(K)}function U(e){b("fshCheckAll",e.target)&&function(e){const t=i("item-div")||i("item-list"),n=h("table:not(.fshHide)",t)
n.map(G).forEach(q),Q(e.target.id,n)}(e)}function V(e){return L(`[${e}]`)}function X(){const e=V(k("sendClasses"))
return e||V(g.sendClasses)}function Y(e){return` &ensp;<span id="itemid${e[1]}" class="fshCheckAll fshLink fshNoWrap">${e[0]}</span>`}function Z(){const e=A({id:"fshSelectMultiple",innerHTML:'<td colspan=6>Select:&ensp;<span id="itemid-1" class="fshCheckAll fshLink fshNoWrap">All Items</span> &ensp;<span id="itemid-2" class="fshCheckAll fshLink fshNoWrap">All Resources</span>'+X().map(Y).join("")+' &ensp;How&nbsp;many:<input id="fshSendHowMany" type="text" class="custominput" value="all" size=3></td>'})
c(e,U)
const t=i("item-list").parentNode.parentNode
v(e,t)}export default function(){t(3,W),t(3,Z),t(3,P)}
//# sourceMappingURL=trade-6d621092.js.map
