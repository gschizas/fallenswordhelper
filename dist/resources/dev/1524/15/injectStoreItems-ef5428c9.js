import{s as n,m as e,c as t,b as i,p as s,f as o,z as c,d as r,aR as a,v as d,x as l,L as f,af as u,aw as p,M as m,D as h,W as k,g as b,h as j,w as S,a as g,o as v,ax as L,bS as E,a0 as N,bt as H,ai as I,ah as A,i as w,bu as x}from"./calfSystem-ee582533.js"
import{b as D}from"./batch-59d43fba.js"
import{i as T}from"./insertElementBefore-7ed837be.js"
import"./dialogMsg-b9afb04d.js"
import"./closest-d675e111.js"
import"./closestTable-ffc1b5cf.js"
import"./insertHtmlBeforeBegin-66a80e13.js"
import{a as $}from"./addStatTotalToMouseover-e9c19da5.js"
import{c as _}from"./chunk-7f692bd3.js"
import"./dialog-b2af5043.js"
import"./indexAjaxJson-e486d467.js"
import"./ajaxReturnCode-c49dbedc.js"
import"./senditems-4a0b6b24.js"
import{a as R,d as F}from"./dropItem-43fd04fd.js"
import{c as O}from"./createTr-bfcbc414.js"
import"./makeFolderSpan-8b9c7bfc.js"
import{m as C}from"./makeFolderSpans-a24df563.js"
import{e as Q}from"./eventHandler5-39a91f1e.js"
import"./cmdExport-23cec039.js"
import"./guildStore-7cd0d847.js"
import"./getInventory-82e3b49f.js"
import{g as y}from"./getInventoryById-77125772.js"
import{t as U}from"./toggleForce-3b831976.js"
import{s as M}from"./selfIdIs-2732dbd2.js"
let q,G
function B(n,e){e.checked=!e.disabled&&!e.checked}const V=[["guild",function(n,e){e.checked=!e.disabled&&-1!==q[n.invid].guild_tag}],["item",function(n,e){q[n.invid]&&q[n.invid].item_id===G&&B(0,e)}],["checkAll",B]]
function Y(n,e){return e[0]===n}function z(n,e){if(!e.injectHere)return
if(e.injectHere.parentNode.classList.contains("fshHide"))return
n(e,e.el.parentNode.parentNode.previousElementSibling.children[0])}function J(e,t,i,s){q=t
const o=V.find(n(Y,i))[1]
G=Number(s),e.forEach(n(z,o))}function P(n){if("storeitems"===t.subcmd2){const t=i("form",s)[0]
if(t){const d=O({className:"fshCenter"}),l=e("td",{colSpan:3})
o(d,l),T(d,t),c(C(n),l),function(){const n=i(r,s)[0].rows
a(n[n.length-2].cells[0],'<input id="fshChkAll" value="Check All" type="button">&nbsp;')}()}}}let W
function K(n){return n?"Hide":"Show"}function X(n,e){if(function(){if(!W){const n=i("form",s)
n.length>0&&(W=n[0].previousElementSibling.children[0])}}(),W){let i=`[<span id="fshShowExtraLinks" class="sendLink">${K(n)} AH and UFSG links</span>]&nbsp;[<span id="fshShowQuickDropLinks" class="sendLink">${K(e)} Quick Drop links</span>]&nbsp;`
"storeitems"===t.subcmd2&&(i+='[<span id="fshSelectAllGuildLocked" class="sendLink"> Select All Guild Locked</span>]&nbsp;'),c(i,W)}}function Z(n,e,t){t.el.parentNode.parentNode.previousElementSibling.children[0].checked=!1,function(n,e,t){const i=t.injectHere.parentNode,s=n[t.invid].folder_id,o=0!==e&&e!==s
U(i,o),U(i.nextElementSibling,o)}(n,e,t)}function nn(e,t,i){D([2,3,e,0,n(Z,t,Number(i.dataset.folder))])}function en(n,e){return function(n,e){return d({cmd:"profile",subcmd:"sendtofolder",folder_id:n,folderItem:e})}(n,e)}function tn(n){if(n.injectHere)return n.injectHere.previousElementSibling.previousElementSibling.children[0].checked}const sn=n=>n.invid
function on(n,e){return n.toString()===e.invid}function cn(e,t){const i=e.find(n(on,t))
if(i){const n=i.injectHere.parentNode
n.nextElementSibling.remove(),n.remove(),i.el=null,i.invid=null,i.injectHere=null}}function rn(e,t){f(t.r)&&t.r.forEach(n(cn,e))}function an(e,t,i){en(t,i).then(n(rn,e))}function dn(e){const t=l("selectFolderId").value
_(30,e.filter(tn).map(sn)).forEach(n(an,e,t))}function ln(n,e,t){1!==t.r&&(n.style.color="green",c(e,n))}function fn(e,t,i,s){s.className="quickAction",function(e,t,i){t([e.getAttribute("itemInvId")]).then(n(ln,e,i))}(s,e,t),u(s),function(n){c(`<img class="quickActionSpinner" src="${p}ui/misc/spinner.gif" width="15" height="15">`,n)}(s)
const o=s.parentNode
!function(n,e){const t=m(e,n)
t&&(t.className="quickAction",c("",t))}(o,i),function(n){const e=n.parentNode.children[0].children[0]
e.checked=!1,e.disabled=!0}(o)}let un,pn,mn,hn,kn,bn,jn,Sn,gn,vn,Ln,En
function Nn(n){return n.dataset.tipped}function Hn(n){const e=n.dataset.tipped.match(j)
return[n,e[1],e[2]]}function In(n,e){return n[e[1]]=(n[e[1]]||0)+1,n}function An(n){return{el:n[0],invid:n[2],injectHere:n[0].parentNode.parentNode.nextElementSibling}}function wn(){$(),un=h("disableItemColoring"),pn=h("showExtraLinks"),mn=h("showQuickDropLinks"),hn=h("showQuickSendLinks"),X(pn,mn)
const n=function(){const n=i(r,s),e=n[n.length-1]
return b("img",e)}().filter(Nn).map(Hn)
kn=n.map(An),bn=n.reduce(In,{}),bn[13699]=1}const xn=[[n=>!Sn&&1!==bn[n.item_id],(n,e)=>` [<span linkto="${e.item_id}" class="fshLink">Check all</span>]`],[n=>!En&&hn&&!n.bound,n=>` <span class="quickAction sendLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY SENDS THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Send]</span>`],[n=>!gn&&mn&&-1===n.guild_tag,n=>` <span class="quickAction dropLink tip-static" itemInvId="${n.invid}" data-tipped="INSTANTLY DROP THE ITEM. NO REFUNDS OR DO-OVERS! Use at own risk.">[Quick Drop]</span>`]]
function Dn(n,e){return e[0](n)}function Tn(n,e,t){return t[1](n,e)}function $n(e,t){!function(n,e){Ln||un||n.injectHere.classList.add(x[e.rarity].clas)}(e,t)
const i=xn.filter(n(Dn,t)).map(n(Tn,e,t)).join("")
""!==i&&w(e.injectHere,i)}function _n(n){const e=vn[n.invid]
e?(!function(n,e){if(N(jn,!pn))return
let t='<span><span class="aHLink">'
e.bound||(t+=`[<a href="${H}${encodeURIComponent(e.item_name)}">AH</a>]`),t+=`</span>[<a href="${I}items${A}view&item_id=${e.item_id}" target="_blank">UFSG</a>]</span>`,a(n.injectHere,t)}(n,e),$n(n,e)):E("injectStoreItems: Item not found",!1)}function Rn(){pn&&(jn=!0),Sn=!0,Ln=!0,mn&&(gn=!0),En=!0}function Fn(n){n.injectHere&&U(n.injectHere.children[0],!pn)}function On(){pn=!pn,k("showExtraLinks",pn),X(pn,mn),jn?kn.forEach(Fn):D([5,3,kn,0,_n,Rn])}function Cn(n){U(m(".dropLink",n.injectHere),!mn)}function Qn(){mn=!mn,k("showQuickDropLinks",mn),X(pn,mn),gn?kn.forEach(Cn):D([5,3,kn,0,_n,Rn])}function yn(n,e){J(kn,vn,n,e)}function Un(){return[[M("fshShowExtraLinks"),On],[M("fshShowQuickDropLinks"),Qn],[M("fshSelectAllGuildLocked"),n(yn,"guild",null)],[M("fshMove"),n(dn,kn)],[M("fshChkAll"),n(yn,"checkAll",null)]].concat([[n=>n.hasAttribute("linkto"),n=>{yn("item",n.getAttribute("linkto"))}],[n(L,"sendLink"),n(fn,R,"Sent",".dropLink")],[n(L,"dropLink"),n(fn,F,"Dropped",".sendLink")],[n(L,"fshFolder"),n(nn,kn,vn)]])}function Mn(n){!function(n){return!n||!n.items||!n.folders}(n)&&kn&&(jn=!1,Sn=!1,vn=n.items,Ln=!1,gn=!1,En=!1,D([5,3,kn,0,_n,Rn]),P(n.folders),v(s,Q(Un())))}export default function(){S()||(y().then(Mn),g(3,wn))}
//# sourceMappingURL=injectStoreItems-ef5428c9.js.map
