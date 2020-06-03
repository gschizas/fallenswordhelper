import{s as n,m as e,c as t,b as i,p as s,f as o,z as c,d as r,a5 as a,v as d,x as l,M as f,aq as u,aG as p,N as m,D as h,X as k,g as b,h as j,w as g,a as S,o as v,aH as E,ac as L,a1 as N,bk as H,at as I,as as A,i as w,bl as D}from"./calfSystem-f7574730.js"
import{b as x}from"./batch-0781b5ad.js"
import{i as T}from"./insertElementBefore-b5c9c232.js"
import"./dialogMsg-655101fe.js"
import"./closest-807af018.js"
import"./closestTable-4db1af82.js"
import"./insertHtmlBeforeBegin-474099b5.js"
import{a as $}from"./addStatTotalToMouseover-170bb21e.js"
import{c as _}from"./chunk-817a9c70.js"
import"./dialog-a36114b5.js"
import"./indexAjaxJson-66a839ba.js"
import"./ajaxReturnCode-7daad738.js"
import"./senditems-38df50c1.js"
import{a as F,d as O}from"./dropItem-fb3cec09.js"
import{c as R}from"./createTr-5b043bb5.js"
import"./makeFolderSpan-c4cb955a.js"
import{m as C}from"./makeFolderSpans-da4e5480.js"
import{e as Q}from"./eventHandler5-76337fed.js"
import"./cmdExport-da1f542a.js"
import"./guildStore-8fe7d393.js"
import"./getInventory-580028ac.js"
import{g as y}from"./getInventoryById-c0c88cd1.js"
import{t as U}from"./toggleForce-253de8c7.js"
import{s as q}from"./selfIdIs-c6f2e263.js"
let G,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const V=[["guild",function(n,e){e.checked=!e.disabled&&-1!==G[n.invid].guild_tag}],["item",function(n,e){G[n.invid]&&G[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function Y(n,e){return e[0]===n}function z(n,e){if(!e.injectHere)return
if(e.injectHere.parentNode.classList.contains("fshHide"))return
n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function J(e,t,i,s){G=t
const o=V.find(n(Y,i))[1]
M=Number(s),e.forEach(n(z,o))}function P(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const d=R({className:"fshCenter"}),l=e("td",{colSpan:3})
o(d,l),T(d,t),c(C(n),l),function(){const n=i(r,s)[0].rows
a(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let X
function K(n){return n?"Hide":"Show"}function W(n,e){if(function(){if(!X){const n=i("form",s)
n.length>0&&(X=n[0].previousElementSibling.children[0])}}(),X){let i=`[<span id="fshShowExtraLinks" class="sendLink">${K(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${K(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),c(i,X)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
U(i,o),U(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){x([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return d({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){f(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=l("selectFolderId").value
_(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",c(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),u(s),function(n){c(`<img class="quickActionSpinner" src="${p}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=m(e,n)
t&&(t.className="quickAction",c("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,jn,gn,Sn,vn,En,Ln
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(j)
return[n,e[1],e[2]]}function In(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function An(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){$(),un=h("disableItemColoring"),pn=h("showExtraLinks"),mn=h("showQuickDropLinks"),hn=h("showQuickSendLinks"),W(pn,mn)
const n=function(){const n=i(r,s),e=n[n.length-1]
return b("img",e)}().filter(Nn).map(Hn)
kn=n.map(An),bn=n.reduce(In,{}),bn[13699]=1}const Dn=[[n=>!gn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!Ln&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!Sn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function xn(n,e){return e[0](n)}function Tn(n,e,t){return t[1](n,e)}function $n(e,t){!function(n,e){En||un||n.injectHere.classList.add(D[e.rarity].clas)}(e,t)
const i=Dn.filter(n(xn,t)).map(n(Tn,e,t)).join("")
""!==i&&w(e.injectHere,i)}function _n(n){const e=vn[n.invid]
e?(!function(n,e){if(N(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${H}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${I}items${A}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,a(n.injectHere,t)}(n,e),$n(n,e)):L("injectStoreItems: Item not found",!1)}function Fn(){pn&&(jn=!0),gn=!0,En=!0,mn&&(Sn=!0),Ln=!0}function On(n){n.injectHere&&U(n.injectHere.children[0],!pn)}function Rn(){pn=!pn,k("showExtraLinks",pn),W(pn,mn),jn?kn.forEach(On):x([5,3,kn,0,_n,Fn])}function Cn(n){U(m(".dropLink",n.injectHere),!mn)}function Qn(){mn=!mn,k("showQuickDropLinks",mn),W(pn,mn),Sn?kn.forEach(Cn):x([5,3,kn,0,_n,Fn])}function yn(n,e){J(kn,vn,n,e)}function Un(){return[[q("fshShowExtraLinks"),Rn],[q("fshShowQuickDropLinks"),Qn],[q("fshSelectAllGuildLocked"),n(yn,"guild",null)],[q("fshMove"),n(dn,kn)],[q("fshChkAll"),n(yn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{yn("item",n.getAttribute("linkto"))}],[n(E,"sendLink"),n(fn,F,"Sent",".dropLink")],[n(E,"dropLink"),n(fn,O,"Dropped",".sendLink")],[n(E,"fshFolder"),n(nn,kn,vn)]])}function qn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,gn=!1,vn=n.items,En=!1,Sn=!1,Ln=!1,x([5,3,kn,0,_n,Fn]),P(n.folders),v(s,Q(Un())))}export default function(){g()||(y().then(qn),S(3,wn))}
//# sourceMappingURL=injectStoreItems-7b66a65c.js.map
