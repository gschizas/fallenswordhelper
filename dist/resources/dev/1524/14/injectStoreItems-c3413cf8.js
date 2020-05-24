import{u as n,q as e,c as t,b as i,p as s,f as o,O as c,B as r,d as a,b7 as d,t as l,x as u,z as f,Q as p,as as m,aH as h,R as k,F as b,a4 as S,g as j,h as g,y as v,a as L,o as E,aI as N,c6 as H,aa as I,bC as A,aw as w,av as D,i as T,bD as $}from"./calfSystem-d96a3efd.js"
import{b as _}from"./batch-cdb16fc8.js"
import"./dialogMsg-da77a98e.js"
import"./closest-f6c323ce.js"
import"./closestTable-2bbeb9ce.js"
import"./insertHtmlBeforeBegin-449d0625.js"
import{a as x}from"./addStatTotalToMouseover-d77e3128.js"
import{c as O}from"./chunk-77a11107.js"
import"./dialog-62f3abd8.js"
import"./ajaxReturnCode-2df80530.js"
import"./senditems-8ce986a1.js"
import{a as R,d as C}from"./dropItem-a01c657d.js"
import{c as F}from"./createTr-441d9d7e.js"
import"./makeFolderSpan-6cb5741d.js"
import{m as Q}from"./makeFolderSpans-eea50c06.js"
import{e as y}from"./eventHandler5-d9435eb5.js"
import"./guildStore-0302347f.js"
import"./getInventory-1d86043b.js"
import{g as U}from"./getInventoryById-bb2e70f9.js"
import{s as q}from"./selfIdIs-1c8b1e34.js"
let G,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const V=[["guild",function(n,e){e.checked=!e.disabled&&-1!==G[n.invid].guild_tag}],["item",function(n,e){G[n.invid]&&G[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function Y(n,e){return e[0]===n}function z(n,e){if(!e.injectHere)return
if(e.injectHere.parentNode.classList.contains("fshHide"))return
n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function P(e,t,i,s){G=t
const o=V.find(n(Y,i))[1]
M=Number(s),e.forEach(n(z,o))}function J(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const l=F({className:"fshCenter"}),u=e("td",{colSpan:3})
o(l,u),c(l,t),r(Q(n),u),function(){const n=i(a,s)[0].rows
d(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let K
function W(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!K){const n=i("form",s)
n.length>0&&(K=n[0].previousElementSibling.children[0])}}(),K){let i=`[<span id="fshShowExtraLinks" class="sendLink">${W(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${W(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(i,K)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
l(i,o),l(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){_([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return u({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){p(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=f("selectFolderId").value
O(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function un(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),m(s),function(n){r(`<img class="quickActionSpinner" src="${h}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=k(e,n)
t&&(t.className="quickAction",r("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let fn,pn,mn,hn,kn,bn,Sn,jn,gn,vn,Ln,En
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(g)
return[n,e[1],e[2]]}function In(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function An(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){x(),fn=b("disableItemColoring"),pn=b("showExtraLinks"),mn=b("showQuickDropLinks"),hn=b("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=i(a,s),e=n[n.length-1]
return j("img",e)}().filter(Nn).map(Hn)
kn=n.map(An),bn=n.reduce(In,{}),bn[13699]=1}const Dn=[[n=>!jn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!En&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function Tn(n,e){return e[0](n)}function $n(n,e,t){return t[1](n,e)}function _n(e,t){!function(n,e){Ln||fn||n.injectHere.classList.add($[e.rarity].clas)}(e,t)
const i=Dn.filter(n(Tn,t)).map(n($n,e,t)).join("")
""!==i&&T(e.injectHere,i)}function xn(n){const e=vn[n.invid]
e?(!function(n,e){if(I(Sn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${A}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${w}items${D}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,d(n.injectHere,t)}(n,e),_n(n,e)):H("injectStoreItems: Item not found",!1)}function On(){pn&&(Sn=!0),jn=!0,Ln=!0,mn&&(gn=!0),En=!0}function Rn(n){n.injectHere&&l(n.injectHere.children[0],!pn)}function Cn(){pn=!pn,S("showExtraLinks",pn),X(pn,mn),Sn?kn.forEach(Rn):_([5,3,kn,0,xn,On])}function Fn(n){l(k(".dropLink",n.injectHere),!mn)}function Qn(){mn=!mn,S("showQuickDropLinks",mn),X(pn,mn),gn?kn.forEach(Fn):_([5,3,kn,0,xn,On])}function yn(n,e){P(kn,vn,n,e)}function Un(){return[[q("fshShowExtraLinks"),Cn],[q("fshShowQuickDropLinks"),Qn],[q("fshSelectAllGuildLocked"),n(yn,"guild",null)],[q("fshMove"),n(dn,kn)],[q("fshChkAll"),n(yn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{yn("item",n.getAttribute("linkto"))}],[n(N,"sendLink"),n(un,R,"Sent",".dropLink")],[n(N,"dropLink"),n(un,C,"Dropped",".sendLink")],[n(N,"fshFolder"),n(nn,kn,vn)]])}function qn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(Sn=!1,jn=!1,vn=n.items,Ln=!1,gn=!1,En=!1,_([5,3,kn,0,xn,On]),J(n.folders),E(s,y(Un())))}export default function(){v()||(U().then(qn),L(3,wn))}
//# sourceMappingURL=injectStoreItems-c3413cf8.js.map
