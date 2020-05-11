import{v as n,r as e,e as t,b as i,p as s,h as o,P as c,C as r,c as a,b8 as d,t as l,y as f,A as u,R as p,at as m,aI as h,S as k,G as b,a5 as S,g as j,k as g,z as v,a as L,o as E,aJ as N,c7 as H,ab as I,bD as A,ax as w,aw as D,i as T,bE as $}from"./calfSystem-8dc0fa4b.js"
import{b as _}from"./batch-5f01c08c.js"
import"./dialogMsg-7427fbc4.js"
import"./closest-9cd85ce4.js"
import"./closestTable-432fe19a.js"
import"./insertHtmlBeforeBegin-3f5cdd49.js"
import{a as x}from"./addStatTotalToMouseover-ba438fda.js"
import{c as R}from"./chunk-a5b00e9c.js"
import"./dialog-f4d2194e.js"
import"./ajaxReturnCode-c433c790.js"
import"./senditems-edb76148.js"
import{a as C,d as O}from"./dropItem-a782c1a7.js"
import{c as y}from"./createTr-07128daa.js"
import"./makeFolderSpan-abc934ab.js"
import{m as F}from"./makeFolderSpans-479bff76.js"
import{e as Q}from"./eventHandler5-31d45a93.js"
import"./guildStore-b172d7f4.js"
import"./getInventory-20cd9685.js"
import{g as U}from"./getInventoryById-f0471a4b.js"
import{s as G}from"./selfIdIs-531fc9b8.js"
let q,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const P=[["guild",function(n,e){e.checked=!e.disabled&&-1!==q[n.invid].guild_tag}],["item",function(n,e){q[n.invid]&&q[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function V(n,e){return e[0]===n}function Y(n,e){if(!e.injectHere)return
e.injectHere.parentNode.classList.contains("fshHide")||n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function z(e,t,i,s){q=t
const o=P.find(n(V,i))[1]
M=Number(s),e.forEach(n(Y,o))}function J(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const l=y({className:"fshCenter"}),f=e("td",{colSpan:3})
o(l,f),c(l,t),r(F(n),f),function(){const n=i(a,s)[0].rows
d(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let K
function W(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!K){const n=i("form",s)
n.length>0&&(K=n[0].previousElementSibling.children[0])}}(),K){let i=`[<span id="fshShowExtraLinks" class="sendLink">${W(n)} AH and UFSG links</span>]&nbsp;`+`[<span id="fshShowQuickDropLinks" class="sendLink">${W(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(i,K)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
l(i,o),l(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){_([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return f({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){p(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=u("selectFolderId").value
R(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),m(s),function(n){r(`<img class="quickActionSpinner" src="${h}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=k(e,n)
t&&(t.className="quickAction",r("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,Sn,jn,gn,vn,Ln,En
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(g)
return[n,e[1],e[2]]}function In(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function An(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){x(),un=b("disableItemColoring"),pn=b("showExtraLinks"),mn=b("showQuickDropLinks"),hn=b("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=i(a,s),e=n[n.length-1]
return j("img",e)}().filter(Nn).map(Hn)
kn=n.map(An),bn=n.reduce(In,{}),bn[13699]=1}const Dn=[[n=>!jn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!En&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. `+'NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>'],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS `+'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>']]
function Tn(n,e){return e[0](n)}function $n(n,e,t){return t[1](n,e)}function _n(e,t){!function(n,e){Ln||un||n.injectHere.classList.add($[e.rarity].clas)}(e,t)
const i=Dn.filter(n(Tn,t)).map(n($n,e,t)).join("")
""!==i&&T(e.injectHere,i)}function xn(n){const e=vn[n.invid]
e?(!function(n,e){if(I(Sn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${A}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${w}items${D}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,d(n.injectHere,t)}(n,e),_n(n,e)):H("injectStoreItems: Item not found",!1)}function Rn(){pn&&(Sn=!0),jn=!0,Ln=!0,mn&&(gn=!0),En=!0}function Cn(n){n.injectHere&&l(n.injectHere.children[0],!pn)}function On(){pn=!pn,S("showExtraLinks",pn),X(pn,mn),Sn?kn.forEach(Cn):_([5,3,kn,0,xn,Rn])}function yn(n){l(k(".dropLink",n.injectHere),!mn)}function Fn(){mn=!mn,S("showQuickDropLinks",mn),X(pn,mn),gn?kn.forEach(yn):_([5,3,kn,0,xn,Rn])}function Qn(n,e){z(kn,vn,n,e)}function Un(){return[[G("fshShowExtraLinks"),On],[G("fshShowQuickDropLinks"),Fn],[G("fshSelectAllGuildLocked"),n(Qn,"guild",null)],[G("fshMove"),n(dn,kn)],[G("fshChkAll"),n(Qn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Qn("item",n.getAttribute("linkto"))}],[n(N,"sendLink"),n(fn,C,"Sent",".dropLink")],[n(N,"dropLink"),n(fn,O,"Dropped",".sendLink")],[n(N,"fshFolder"),n(nn,kn,vn)]])}function Gn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(Sn=!1,jn=!1,vn=n.items,Ln=!1,gn=!1,En=!1,_([5,3,kn,0,xn,Rn]),J(n.folders),E(s,Q(Un())))}export default function(){v()||(U().then(Gn),L(3,wn))}
//# sourceMappingURL=injectStoreItems-e372e595.js.map
