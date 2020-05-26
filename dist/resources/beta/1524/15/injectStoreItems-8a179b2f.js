import{s as n,m as e,c as t,b as i,p as s,f as o,z as r,d as c,aQ as a,v as d,x as f,ac as l,at as u,L as p,D as m,V as h,g as k,h as b,w as j,a as g,o as S,au as v,bN as L,$ as E,bn as N,af as H,ae as A,i as I,bo as w}from"./calfSystem-1262535f.js"
import{i as D}from"./isArray-d09fe8d1.js"
import{b as x}from"./batch-f97a2ba5.js"
import{i as T}from"./insertElementBefore-dcdbe7ae.js"
import"./dialogMsg-06808fe1.js"
import"./closest-20389d90.js"
import"./closestTable-fb9486a9.js"
import"./insertHtmlBeforeBegin-5ac12245.js"
import{a as $}from"./addStatTotalToMouseover-9c2f1591.js"
import{c as _}from"./chunk-ac937c14.js"
import"./dialog-c7021814.js"
import"./indexAjaxJson-f27fbe77.js"
import"./ajaxReturnCode-cf3ddf46.js"
import{a as F,d as O}from"./dropItem-27df3440.js"
import{c as Q}from"./createTr-0093f7ce.js"
import"./makeFolderSpan-f7758d3a.js"
import{m as R}from"./makeFolderSpans-2d989731.js"
import{e as y}from"./eventHandler5-d9f72206.js"
import"./cmdExport-721bbaf9.js"
import"./getInventory-7d61d5d2.js"
import{g as C}from"./getInventoryById-3ff089d4.js"
import{t as U}from"./toggleForce-04e33300.js"
import{s as q}from"./selfIdIs-6bd2f09f.js"
let G,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const V=[["guild",function(n,e){e.checked=!e.disabled&&-1!==G[n.invid].guild_tag}],["item",function(n,e){G[n.invid]&&G[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function Y(n,e){return e[0]===n}function z(n,e){if(!e.injectHere)return
if(e.injectHere.parentNode.classList.contains("fshHide"))return
n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function J(e,t,i,s){G=t
const o=V.find(n(Y,i))[1]
M=Number(s),e.forEach(n(z,o))}function P(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const d=Q({className:"fshCenter"}),f=e("td",{colSpan:3})
o(d,f),T(d,t),r(R(n),f),function(){const n=i(c,s)[0].rows
a(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let K
function W(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!K){const n=i("form",s)
n.length>0&&(K=n[0].previousElementSibling.children[0])}}(),K){let i=`[<span id="fshShowExtraLinks" class="sendLink">${W(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${W(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(i,K)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
U(i,o),U(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){x([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return d({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function rn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function cn(e,t){D(t.r)&&t.r.forEach(n(rn,e))}function an(e,t,i){en(t,i).then(n(cn,e))}function dn(e){const t=f("selectFolderId").value
_(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function fn(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function ln(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(fn,e,i))}(s,e,t),l(s),function(n){r(`<img class="quickActionSpinner" src="${u}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=p(e,n)
t&&(t.className="quickAction",r("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,jn,gn,Sn,vn,Ln,En
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(b)
return[n,e[1],e[2]]}function An(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function In(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){$(),un=m("disableItemColoring"),pn=m("showExtraLinks"),mn=m("showQuickDropLinks"),hn=m("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=i(c,s),e=n[n.length-1]
return k("img",e)}().filter(Nn).map(Hn)
kn=n.map(In),bn=n.reduce(An,{}),bn[13699]=1}const Dn=[[n=>!gn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!En&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!Sn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function xn(n,e){return e[0](n)}function Tn(n,e,t){return t[1](n,e)}function $n(e,t){!function(n,e){Ln||un||n.injectHere.classList.add(w[e.rarity].clas)}(e,t)
const i=Dn.filter(n(xn,t)).map(n(Tn,e,t)).join("")
""!==i&&I(e.injectHere,i)}function _n(n){const e=vn[n.invid]
e?(!function(n,e){if(E(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${N}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${H}items${A}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,a(n.injectHere,t)}(n,e),$n(n,e)):L("injectStoreItems: Item not found",!1)}function Fn(){pn&&(jn=!0),gn=!0,Ln=!0,mn&&(Sn=!0),En=!0}function On(n){n.injectHere&&U(n.injectHere.children[0],!pn)}function Qn(){pn=!pn,h("showExtraLinks",pn),X(pn,mn),jn?kn.forEach(On):x([5,3,kn,0,_n,Fn])}function Rn(n){U(p(".dropLink",n.injectHere),!mn)}function yn(){mn=!mn,h("showQuickDropLinks",mn),X(pn,mn),Sn?kn.forEach(Rn):x([5,3,kn,0,_n,Fn])}function Cn(n,e){J(kn,vn,n,e)}function Un(){return[[q("fshShowExtraLinks"),Qn],[q("fshShowQuickDropLinks"),yn],[q("fshSelectAllGuildLocked"),n(Cn,"guild",null)],[q("fshMove"),n(dn,kn)],[q("fshChkAll"),n(Cn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Cn("item",n.getAttribute("linkto"))}],[n(v,"sendLink"),n(ln,F,"Sent",".dropLink")],[n(v,"dropLink"),n(ln,O,"Dropped",".sendLink")],[n(v,"fshFolder"),n(nn,kn,vn)]])}function qn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,gn=!1,vn=n.items,Ln=!1,Sn=!1,En=!1,x([5,3,kn,0,_n,Fn]),P(n.folders),S(s,y(Un())))}export default function(){j()||(C().then(qn),g(3,wn))}
//# sourceMappingURL=injectStoreItems-8a179b2f.js.map
