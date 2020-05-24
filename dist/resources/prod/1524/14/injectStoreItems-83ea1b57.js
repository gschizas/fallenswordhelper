import{u as n,q as e,c as t,b as i,p as s,f as o,O as c,B as r,d as a,bi as d,t as l,x as f,z as u,ap as p,aE as m,Q as h,F as k,a3 as b,g as S,h as j,y as g,a as v,o as L,aF as E,bZ as N,a9 as H,bv as I,at as A,as as w,i as D,bw as T}from"./calfSystem-d587d232.js"
import{i as $}from"./isArray-5dbf2807.js"
import{b as _}from"./batch-a68928f8.js"
import"./dialogMsg-8c5a22d3.js"
import"./closest-2b33b59d.js"
import"./closestTable-6cc0678e.js"
import"./insertHtmlBeforeBegin-d42e4723.js"
import{a as x}from"./addStatTotalToMouseover-08e841f9.js"
import{c as F}from"./chunk-7bfa3ec6.js"
import"./dialog-f9fad105.js"
import"./ajaxReturnCode-b9bc06f8.js"
import{a as O,d as y}from"./dropItem-719e855e.js"
import{c as Q}from"./createTr-ebe71d20.js"
import"./makeFolderSpan-a22e75b6.js"
import{m as R}from"./makeFolderSpans-8bc20ae8.js"
import{e as C}from"./eventHandler5-35b55bc4.js"
import"./getInventory-0d251a2b.js"
import{g as U}from"./getInventoryById-a2479f17.js"
import{s as q}from"./selfIdIs-b085da1e.js"
let G,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const V=[["guild",function(n,e){e.checked=!e.disabled&&-1!==G[n.invid].guild_tag}],["item",function(n,e){G[n.invid]&&G[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function Y(n,e){return e[0]===n}function z(n,e){if(!e.injectHere)return
if(e.injectHere.parentNode.classList.contains("fshHide"))return
n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function P(e,t,i,s){G=t
const o=V.find(n(Y,i))[1]
M=Number(s),e.forEach(n(z,o))}function Z(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const l=Q({className:"fshCenter"}),f=e("td",{colSpan:3})
o(l,f),c(l,t),r(R(n),f),function(){const n=i(a,s)[0].rows
d(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let J
function K(n){return n?"Hide":"Show"}function W(n,e){if(function(){if(!J){const n=i("form",s)
n.length>0&&(J=n[0].previousElementSibling.children[0])}}(),J){let i=`[<span id="fshShowExtraLinks" class="sendLink">${K(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${K(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(i,J)}}function X(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
l(i,o),l(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){_([2,3,e,0,n(X,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return f({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){$(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=u("selectFolderId").value
F(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),p(s),function(n){r(`<img class="quickActionSpinner" src="${m}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=h(e,n)
t&&(t.className="quickAction",r("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,Sn,jn,gn,vn,Ln,En
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(j)
return[n,e[1],e[2]]}function In(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function An(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){x(),un=k("disableItemColoring"),pn=k("showExtraLinks"),mn=k("showQuickDropLinks"),hn=k("showQuickSendLinks"),W(pn,mn)
const n=function(){const n=i(a,s),e=n[n.length-1]
return S("img",e)}().filter(Nn).map(Hn)
kn=n.map(An),bn=n.reduce(In,{}),bn[13699]=1}const Dn=[[n=>!jn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!En&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function Tn(n,e){return e[0](n)}function $n(n,e,t){return t[1](n,e)}function _n(e,t){!function(n,e){Ln||un||n.injectHere.classList.add(T[e.rarity].clas)}(e,t)
const i=Dn.filter(n(Tn,t)).map(n($n,e,t)).join("")
""!==i&&D(e.injectHere,i)}function xn(n){const e=vn[n.invid]
e?(!function(n,e){if(H(Sn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${I}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${A}items${w}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,d(n.injectHere,t)}(n,e),_n(n,e)):N("injectStoreItems: Item not found",!1)}function Fn(){pn&&(Sn=!0),jn=!0,Ln=!0,mn&&(gn=!0),En=!0}function On(n){n.injectHere&&l(n.injectHere.children[0],!pn)}function yn(){pn=!pn,b("showExtraLinks",pn),W(pn,mn),Sn?kn.forEach(On):_([5,3,kn,0,xn,Fn])}function Qn(n){l(h(".dropLink",n.injectHere),!mn)}function Rn(){mn=!mn,b("showQuickDropLinks",mn),W(pn,mn),gn?kn.forEach(Qn):_([5,3,kn,0,xn,Fn])}function Cn(n,e){P(kn,vn,n,e)}function Un(){return[[q("fshShowExtraLinks"),yn],[q("fshShowQuickDropLinks"),Rn],[q("fshSelectAllGuildLocked"),n(Cn,"guild",null)],[q("fshMove"),n(dn,kn)],[q("fshChkAll"),n(Cn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Cn("item",n.getAttribute("linkto"))}],[n(E,"sendLink"),n(fn,O,"Sent",".dropLink")],[n(E,"dropLink"),n(fn,y,"Dropped",".sendLink")],[n(E,"fshFolder"),n(nn,kn,vn)]])}function qn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(Sn=!1,jn=!1,vn=n.items,Ln=!1,gn=!1,En=!1,_([5,3,kn,0,xn,Fn]),Z(n.folders),L(s,C(Un())))}export default function(){g()||(U().then(qn),v(3,wn))}
//# sourceMappingURL=injectStoreItems-83ea1b57.js.map
