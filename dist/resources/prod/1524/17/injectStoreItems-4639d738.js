import{s as n,m as e,c as t,b as i,p as s,f as o,z as c,d as r,a5 as a,v as d,x as l,al as f,aB as u,M as p,D as m,W as h,g as k,h as b,w as j,a as g,o as S,aC as v,a9 as E,a0 as L,bc as N,ao as H,an as A,i as I,bd as w}from"./calfSystem-dec5e071.js"
import{i as D}from"./isArray-5ae0f2ae.js"
import{b as x}from"./batch-6962fbd8.js"
import{i as T}from"./insertElementBefore-1d764477.js"
import"./dialogMsg-1ae9be91.js"
import"./closest-d88a3ae2.js"
import"./closestTable-290574cb.js"
import"./insertHtmlBeforeBegin-4f6b924a.js"
import{a as $}from"./addStatTotalToMouseover-4b9f6553.js"
import{c as _}from"./chunk-c2bce3da.js"
import"./dialog-b7388abb.js"
import"./indexAjaxJson-ecf8d1f5.js"
import"./ajaxReturnCode-361085b2.js"
import{a as C,d as F}from"./dropItem-3c8d4c57.js"
import{c as O}from"./createTr-30b5cdd2.js"
import"./makeFolderSpan-46bebe5a.js"
import{m as R}from"./makeFolderSpans-af604e8b.js"
import{e as y}from"./eventHandler5-3bf558e6.js"
import"./cmdExport-965d881b.js"
import"./getInventory-722fd75f.js"
import{g as Q}from"./getInventoryById-a2e66e56.js"
import{t as U}from"./toggleForce-93af29f7.js"
import{s as M}from"./selfIdIs-b67caa4c.js"
let q,B
function G(n,e){e.checked=!e.disabled&&!e.checked}const V=[["guild",function(n,e){e.checked=!e.disabled&&-1!==q[n.invid].guild_tag}],["item",function(n,e){q[n.invid]&&q[n.invid].item_id===B&&G(0,e)}],["checkAll",G]]
function Y(n,e){return e[0]===n}function z(n,e){if(!e.injectHere)return
if(e.injectHere.parentNode.classList.contains("fshHide"))return
n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function J(e,t,i,s){q=t
const o=V.find(n(Y,i))[1]
B=Number(s),e.forEach(n(z,o))}function P(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const d=O({className:"fshCenter"}),l=e("td",{colSpan:3})
o(d,l),T(d,t),c(R(n),l),function(){const n=i(r,s)[0].rows
a(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let W
function K(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!W){const n=i("form",s)
n.length>0&&(W=n[0].previousElementSibling.children[0])}}(),W){let i=`[<span id="fshShowExtraLinks" class="sendLink">${K(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${K(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),c(i,W)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
U(i,o),U(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){x([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return d({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){D(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=l("selectFolderId").value
_(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",c(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),f(s),function(n){c(`<img class="quickActionSpinner" src="${u}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=p(e,n)
t&&(t.className="quickAction",c("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,jn,gn,Sn,vn,En,Ln
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(b)
return[n,e[1],e[2]]}function An(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function In(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){$(),un=m("disableItemColoring"),pn=m("showExtraLinks"),mn=m("showQuickDropLinks"),hn=m("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=i(r,s),e=n[n.length-1]
return k("img",e)}().filter(Nn).map(Hn)
kn=n.map(In),bn=n.reduce(An,{}),bn[13699]=1}const Dn=[[n=>!gn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!Ln&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!Sn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function xn(n,e){return e[0](n)}function Tn(n,e,t){return t[1](n,e)}function $n(e,t){!function(n,e){En||un||n.injectHere.classList.add(w[e.rarity].clas)}(e,t)
const i=Dn.filter(n(xn,t)).map(n(Tn,e,t)).join("")
""!==i&&I(e.injectHere,i)}function _n(n){const e=vn[n.invid]
e?(!function(n,e){if(L(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${N}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${H}items${A}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,a(n.injectHere,t)}(n,e),$n(n,e)):E("injectStoreItems: Item not found",!1)}function Cn(){pn&&(jn=!0),gn=!0,En=!0,mn&&(Sn=!0),Ln=!0}function Fn(n){n.injectHere&&U(n.injectHere.children[0],!pn)}function On(){pn=!pn,h("showExtraLinks",pn),X(pn,mn),jn?kn.forEach(Fn):x([5,3,kn,0,_n,Cn])}function Rn(n){U(p(".dropLink",n.injectHere),!mn)}function yn(){mn=!mn,h("showQuickDropLinks",mn),X(pn,mn),Sn?kn.forEach(Rn):x([5,3,kn,0,_n,Cn])}function Qn(n,e){J(kn,vn,n,e)}function Un(){return[[M("fshShowExtraLinks"),On],[M("fshShowQuickDropLinks"),yn],[M("fshSelectAllGuildLocked"),n(Qn,"guild",null)],[M("fshMove"),n(dn,kn)],[M("fshChkAll"),n(Qn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Qn("item",n.getAttribute("linkto"))}],[n(v,"sendLink"),n(fn,C,"Sent",".dropLink")],[n(v,"dropLink"),n(fn,F,"Dropped",".sendLink")],[n(v,"fshFolder"),n(nn,kn,vn)]])}function Mn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,gn=!1,vn=n.items,En=!1,Sn=!1,Ln=!1,x([5,3,kn,0,_n,Cn]),P(n.folders),S(s,y(Un())))}export default function(){j()||(Q().then(Mn),g(3,wn))}
//# sourceMappingURL=injectStoreItems-4639d738.js.map
