import{t as n,k as e,n as t,c as i,b as s,p as o,f as c,A as r,d as a,a5 as d,w as l,y as f,P as u,aq as p,aH as m,C as h,G as k,Z as b,g as j,h as S,x as g,a as v,o as E,ac as L,a3 as N,bj as H,at as A,as as I,i as w,bk as x}from"./calfSystem-a2862afc.js"
import{b as D}from"./batch-1aa805d3.js"
import{i as $}from"./insertElementBefore-372e5ad6.js"
import"./dialogMsg-98e801f7.js"
import{d as _}from"./doStatTotal-c038ec00.js"
import"./ajaxReturnCode-f0b1c41c.js"
import"./senditems-b689a7b0.js"
import{a as T,d as C}from"./dropItem-0cc9313b.js"
import{c as F}from"./createTr-885e990c.js"
import"./makeFolderSpan-1e92cbcf.js"
import{m as O}from"./makeFolderSpans-60e6fe6d.js"
import"./dialog-65e58e09.js"
import"./indexAjaxJson-afc1ac85.js"
import{e as R}from"./eventHandler5-0d938057.js"
import"./cmdExport-356fd6f3.js"
import"./guildStore-559bcd67.js"
import"./getInventory-77b8ed5e.js"
import{g as y}from"./getInventoryById-7e10dff9.js"
import{t as Q}from"./toggleForce-4bee24df.js"
import{c as U}from"./chunk-250b0675.js"
import{s as q}from"./selfIdIs-7f51e683.js"
let G,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const P=[["guild",function(n,e){e.checked=!e.disabled&&-1!==G[n.invid].guild_tag}],["item",function(n,e){G[n.invid]&&G[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function V(n,e){return e[0]===n}function Y(n,t){if(!t.injectHere)return
const i=t.injectHere.parentNode
if(e("fshHide",i))return
n(t,t.el.parentNode.parentNode.previousElementSibling.children[0])}function J(e,t,i,s){G=t
const o=P.find(n(V,i))[1]
M=Number(s),e.forEach(n(Y,o))}function Z(n){if("storeitems"===i.subcmd2){const e=s("form",o)[0]
if(e){const i=F({className:"fshCenter"}),l=t("td",{colSpan:3})
c(i,l),$(i,e),r(O(n),l),function(){const n=s(a,o)[0].rows
d(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let z
function K(n){return n?"Hide":"Show"}function W(n,e){if(function(){if(!z){const n=s("form",o)
n.length>0&&(z=n[0].previousElementSibling.children[0])}}(),z){let t=`[<span id="fshShowExtraLinks" class="sendLink">${K(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${K(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===i.subcmd2&&(t+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(t,z)}}function X(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
Q(i,o),Q(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){D([2,3,e,0,n(X,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return l({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){u(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=f("selectFolderId").value
U(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),p(s),function(n){r(`<img class="quickActionSpinner" src="${m}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=h(e,n)
t&&(t.className="quickAction",r("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,jn,Sn,gn,vn,En,Ln
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(S)
return[n,e[1],e[2]]}function An(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function In(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){_(),un=k("disableItemColoring"),pn=k("showExtraLinks"),mn=k("showQuickDropLinks"),hn=k("showQuickSendLinks"),W(pn,mn)
const n=function(){const n=s(a,o),e=n[n.length-1]
return j("img",e)}().filter(Nn).map(Hn)
kn=n.map(In),bn=n.reduce(An,{}),bn[13699]=1}const xn=[[n=>!Sn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!Ln&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function Dn(n,e){return e[0](n)}function $n(n,e,t){return t[1](n,e)}function _n(e,t){!function(n,e){En||un||n.injectHere.classList.add(x[e.rarity].clas)}(e,t)
const i=xn.filter(n(Dn,t)).map(n($n,e,t)).join("")
""!==i&&w(e.injectHere,i)}function Tn(n){const e=vn[n.invid]
e?(!function(n,e){if(N(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${H}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${A}items${I}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,d(n.injectHere,t)}(n,e),_n(n,e)):L("injectStoreItems: Item not found",!1)}function Cn(){pn&&(jn=!0),Sn=!0,En=!0,mn&&(gn=!0),Ln=!0}function Fn(n){n.injectHere&&Q(n.injectHere.children[0],!pn)}function On(){pn=!pn,b("showExtraLinks",pn),W(pn,mn),jn?kn.forEach(Fn):D([5,3,kn,0,Tn,Cn])}function Rn(n){Q(h(".dropLink",n.injectHere),!mn)}function yn(){mn=!mn,b("showQuickDropLinks",mn),W(pn,mn),gn?kn.forEach(Rn):D([5,3,kn,0,Tn,Cn])}function Qn(n,e){J(kn,vn,n,e)}function Un(){return[[q("fshShowExtraLinks"),On],[q("fshShowQuickDropLinks"),yn],[q("fshSelectAllGuildLocked"),n(Qn,"guild",null)],[q("fshMove"),n(dn,kn)],[q("fshChkAll"),n(Qn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Qn("item",n.getAttribute("linkto"))}],[n(e,"sendLink"),n(fn,T,"Sent",".dropLink")],[n(e,"dropLink"),n(fn,C,"Dropped",".sendLink")],[n(e,"fshFolder"),n(nn,kn,vn)]])}function qn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,Sn=!1,vn=n.items,En=!1,gn=!1,Ln=!1,D([5,3,kn,0,Tn,Cn]),Z(n.folders),E(o,R(Un())))}export default function(){g()||(y().then(qn),v(3,wn))}
//# sourceMappingURL=injectStoreItems-a49da75a.js.map
