import{v as n,r as e,e as t,b as i,p as s,h as o,P as c,C as r,c as a,bj as d,t as l,y as f,A as u,aq as p,aF as m,R as h,G as k,a4 as b,g as j,k as S,z as g,a as v,o as L,aG as E,b_ as N,aa as H,bw as A,au as I,at as w,i as D,bx as T}from"./calfSystem-3956a623.js"
import{i as _}from"./isArray-03eca71a.js"
import{b as $}from"./batch-b53a2e4f.js"
import"./dialogMsg-6c4a948a.js"
import"./closest-2eae17cf.js"
import"./closestTable-65ce02cc.js"
import"./insertHtmlBeforeBegin-200f0598.js"
import{a as x}from"./addStatTotalToMouseover-51cdc617.js"
import{c as R}from"./chunk-1a8d2dee.js"
import"./dialog-a6efa002.js"
import"./ajaxReturnCode-69077631.js"
import{a as y,d as C}from"./dropItem-5fe7f911.js"
import{c as F}from"./createTr-b5bd7f1d.js"
import"./makeFolderSpan-583f0e94.js"
import{m as O}from"./makeFolderSpans-7064af26.js"
import{e as Q}from"./eventHandler5-d9e6cbc2.js"
import"./getInventory-fd0518e3.js"
import{g as G}from"./getInventoryById-efcfeae8.js"
import{s as U}from"./selfIdIs-473d6b56.js"
let q,M
function B(n,e){e.checked=!e.disabled&&!e.checked}const P=[["guild",function(n,e){e.checked=!e.disabled&&-1!==q[n.invid].guild_tag}],["item",function(n,e){q[n.invid]&&q[n.invid].item_id===M&&B(0,e)}],["checkAll",B]]
function V(n,e){return e[0]===n}function Y(n,e){if(!e.injectHere)return
e.injectHere.parentNode.classList.contains("fshHide")||n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function z(e,t,i,s){q=t
const o=P.find(n(V,i))[1]
M=Number(s),e.forEach(n(Y,o))}function J(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const l=F({className:"fshCenter"}),f=e("td",{colSpan:3})
o(l,f),c(l,t),r(O(n),f),function(){const n=i(a,s)[0].rows
d(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let K
function W(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!K){const n=i("form",s)
n.length>0&&(K=n[0].previousElementSibling.children[0])}}(),K){let i=`[<span id="fshShowExtraLinks" class="sendLink">${W(n)} AH and UFSG links</span>]&nbsp;`+`[<span id="fshShowQuickDropLinks" class="sendLink">${W(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),r(i,K)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
l(i,o),l(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){$([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return f({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){_(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=u("selectFolderId").value
R(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",r(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),p(s),function(n){r(`<img class="quickActionSpinner" src="${m}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=h(e,n)
t&&(t.className="quickAction",r("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,jn,Sn,gn,vn,Ln,En
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(S)
return[n,e[1],e[2]]}function An(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function In(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){x(),un=k("disableItemColoring"),pn=k("showExtraLinks"),mn=k("showQuickDropLinks"),hn=k("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=i(a,s),e=n[n.length-1]
return j("img",e)}().filter(Nn).map(Hn)
kn=n.map(In),bn=n.reduce(An,{}),bn[13699]=1}const Dn=[[n=>!Sn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!En&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. `+'NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>'],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS `+'OR DO-OVERS! Use at own risk.">[Quick Drop]</span>']]
function Tn(n,e){return e[0](n)}function _n(n,e,t){return t[1](n,e)}function $n(e,t){!function(n,e){Ln||un||n.injectHere.classList.add(T[e.rarity].clas)}(e,t)
const i=Dn.filter(n(Tn,t)).map(n(_n,e,t)).join("")
""!==i&&D(e.injectHere,i)}function xn(n){const e=vn[n.invid]
e?(!function(n,e){if(H(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${A}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${I}items${w}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,d(n.injectHere,t)}(n,e),$n(n,e)):N("injectStoreItems: Item not found",!1)}function Rn(){pn&&(jn=!0),Sn=!0,Ln=!0,mn&&(gn=!0),En=!0}function yn(n){n.injectHere&&l(n.injectHere.children[0],!pn)}function Cn(){pn=!pn,b("showExtraLinks",pn),X(pn,mn),jn?kn.forEach(yn):$([5,3,kn,0,xn,Rn])}function Fn(n){l(h(".dropLink",n.injectHere),!mn)}function On(){mn=!mn,b("showQuickDropLinks",mn),X(pn,mn),gn?kn.forEach(Fn):$([5,3,kn,0,xn,Rn])}function Qn(n,e){z(kn,vn,n,e)}function Gn(){return[[U("fshShowExtraLinks"),Cn],[U("fshShowQuickDropLinks"),On],[U("fshSelectAllGuildLocked"),n(Qn,"guild",null)],[U("fshMove"),n(dn,kn)],[U("fshChkAll"),n(Qn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{Qn("item",n.getAttribute("linkto"))}],[n(E,"sendLink"),n(fn,y,"Sent",".dropLink")],[n(E,"dropLink"),n(fn,C,"Dropped",".sendLink")],[n(E,"fshFolder"),n(nn,kn,vn)]])}function Un(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,Sn=!1,vn=n.items,Ln=!1,gn=!1,En=!1,$([5,3,kn,0,xn,Rn]),J(n.folders),L(s,Q(Gn())))}export default function(){g()||(G().then(Un),v(3,wn))}
//# sourceMappingURL=injectStoreItems-c6064c6a.js.map
