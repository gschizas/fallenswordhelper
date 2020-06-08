import{t as n,k as e,n as t,c as i,b as o,p as s,f as c,A as r,d as a,a7 as d,w as f,y as l,am as u,aD as p,C as m,G as h,Y as k,g as b,h as j,x as S,a as g,o as v,aa as E,a2 as L,bc as N,ap as A,ao as H,i as I,bd as w}from"./calfSystem-03970067.js"
import{i as D}from"./isArray-aff0783a.js"
import{b as x}from"./batch-dfc92608.js"
import{i as $}from"./insertElementBefore-c9a36777.js"
import"./dialogMsg-9c4f0c44.js"
import{d as _}from"./doStatTotal-85eb4928.js"
import"./ajaxReturnCode-f8cf1a95.js"
import{a as T,d as y}from"./dropItem-882ff152.js"
import{c as C}from"./createTr-e152fcaa.js"
import"./makeFolderSpan-d3b21d1c.js"
import{m as F}from"./makeFolderSpans-e70fbc42.js"
import"./dialog-d5dff1df.js"
import"./indexAjaxJson-d04ad897.js"
import{e as O}from"./eventHandler5-4178a6d1.js"
import"./cmdExport-4773c3fd.js"
import"./getInventory-f35b83ee.js"
import{g as R}from"./getInventoryById-4e448ba1.js"
import{t as Q}from"./toggleForce-1be6b2e6.js"
import{c as U}from"./chunk-91fd5f70.js"
import{s as G}from"./selfIdIs-02ed6fe5.js"
let q,M
function Y(n,e){e.checked=!e.disabled&&!e.checked}const B=[["guild",function(n,e){e.checked=!e.disabled&&-1!==q[n.invid].guild_tag}],["item",function(n,e){q[n.invid]&&q[n.invid].item_id===M&&Y(0,e)}],["checkAll",Y]]
function V(n,e){return e[0]===n}function J(n,t){if(!t.injectHere)return
const i=t.injectHere.parentNode
if(e("fshHide",i))return
n(t,t.el.parentNode.parentNode.previousElementSibling.children[0])}function P(e,t,i,o){q=t
const s=B.find(n(V,i))[1]
M=Number(o),e.forEach(n(J,s))}function z(n){if("storeitems"===i.subcmd2){const e=o("form",s)[0]
if(e){const i=C({className:"fshCenter"}),f=t("td",{colSpan:3})
c(i,f),$(i,e),r(F(n),f),function(){const n=o(a,s)[0].rows
d(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let K
function W(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!K){const n=o("form",s)
n.length>0&&(K=n[0].previousElementSibling.children[0])}}(),K){let t=`[<span id="fshShowExtraLinks" class="sendLink">${W(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${W(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===i.subcmd2&&(t+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(t,K)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,o=n[t.invid].folder_id,s=0!==e&&e!==o
Q(i,s),Q(i.nextElementSibling,s)}(n,e,t)}function nn(e,t,i){x([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return f({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const on=n=>n.invid
function sn(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(sn,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){D(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=l("selectFolderId").value
U(30,e.filter(tn).map(on)).forEach(n(an,e,t))}function fn(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function ln(e,t,i,o){o.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(fn,e,i))}(o,e,t),u(o),function(n){r(`<img class="quickActionSpinner" src="${p}ui/misc/spinner.gif" width="15" height="15">`,n)}(o)
const s=o.parentNode
!function(n,e){const t=m(e,n)
t&&(t.className="quickAction",r("",t))}(s,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(s)}let un,pn,mn,hn,kn,bn,jn,Sn,gn,vn,En,Ln
function Nn(n){return n.dataset.tipped}function An(n){const e=n.dataset.tipped.match(j)
return[n,e[1],e[2]]}function Hn(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function In(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){_(),un=h("disableItemColoring"),pn=h("showExtraLinks"),mn=h("showQuickDropLinks"),hn=h("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=o(a,s),e=n[n.length-1]
return b("img",e)}().filter(Nn).map(An)
kn=n.map(In),bn=n.reduce(Hn,{}),bn[13699]=1}const Dn=[[n=>!Sn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!Ln&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function xn(n,e){return e[0](n)}function $n(n,e,t){return t[1](n,e)}function _n(e,t){!function(n,e){En||un||n.injectHere.classList.add(w[e.rarity].clas)}(e,t)
const i=Dn.filter(n(xn,t)).map(n($n,e,t)).join("")
""!==i&&I(e.injectHere,i)}function Tn(n){const e=vn[n.invid]
e?(!function(n,e){if(L(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${N}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${A}items${H}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,d(n.injectHere,t)}(n,e),_n(n,e)):E("injectStoreItems: Item not found",!1)}function yn(){pn&&(jn=!0),Sn=!0,En=!0,mn&&(gn=!0),Ln=!0}function Cn(n){n.injectHere&&Q(n.injectHere.children[0],!pn)}function Fn(){pn=!pn,k("showExtraLinks",pn),X(pn,mn),jn?kn.forEach(Cn):x([5,3,kn,0,Tn,yn])}function On(n){Q(m(".dropLink",n.injectHere),!mn)}function Rn(){mn=!mn,k("showQuickDropLinks",mn),X(pn,mn),gn?kn.forEach(On):x([5,3,kn,0,Tn,yn])}function Qn(n,e){P(kn,vn,n,e)}function Un(){return[[G("fshShowExtraLinks"),Fn],[G("fshShowQuickDropLinks"),Rn],[G("fshSelectAllGuildLocked"),n(Qn,"guild",null)],[G("fshMove"),n(dn,kn)],[G("fshChkAll"),n(Qn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Qn("item",n.getAttribute("linkto"))}],[n(e,"sendLink"),n(ln,T,"Sent",".dropLink")],[n(e,"dropLink"),n(ln,y,"Dropped",".sendLink")],[n(e,"fshFolder"),n(nn,kn,vn)]])}function Gn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,Sn=!1,vn=n.items,En=!1,gn=!1,Ln=!1,x([5,3,kn,0,Tn,yn]),z(n.folders),v(s,O(Un())))}export default function(){S()||(R().then(Gn),g(3,wn))}
//# sourceMappingURL=injectStoreItems-8fbfbce8.js.map
