import{o as t,p as n,s as e,aR as o,bw as a,x as s,b1 as r,T as i,M as c,z as f,f as u,i as l,aG as p,b8 as d,k as m,y as b,F as h,g,h as k,A as N,N as j,bx as C,U as v,by as y,P as T,D as S,aq as x,aa as B,a4 as E,a as D,I as A,bq as L,X as M,bz as _,bj as q,bA as R,bB as w,bv as I,r as G,a2 as H,b as P,d as J,a9 as U,bC as Q,bD as W,bE as F,G as z,E as O,a3 as V,w as X,e as K,a1 as Y,O as Z,J as tt}from"./calfSystem-d49dbbd3.js"
import{n as nt}from"./numberIsNaN-1742f258.js"
import"./round-99c4f204.js"
import"./roundToString-263aa927.js"
import{r as et,b as ot}from"./render-35e989ee.js"
import{p as at}from"./playerName-7c21a13e.js"
import{t as st}from"./toLowerCase-e686322a.js"
import"./createInput-1699d448.js"
import{i as rt}from"./insertTextBeforeEnd-15fdfab0.js"
import"./onlineDot-ccdd1fa5.js"
import{s as it}from"./setTipped-d04acae4.js"
import"./batch-3c533826.js"
import{c as ct,a as ft}from"./compressBio-b999954e.js"
import"./createLabel-f30a5e2d.js"
import{c as ut}from"./currentGuildId-fb556ea3.js"
import{i as lt}from"./intValue-2ed328c8.js"
import{v as pt}from"./valueText-064e4f1c.js"
import{c as dt}from"./createTBody-6de354b5.js"
import{c as mt}from"./createTable-86f16c48.js"
import{c as bt}from"./createButton-27be9a2a.js"
import"./dialogMsg-c696a07c.js"
import{c as ht}from"./createSpan-d12a564e.js"
import{h as gt}from"./hideElement-a25240d4.js"
import"./closest-c1f1e24c.js"
import"./closestTable-dc4f2fff.js"
import"./insertHtmlBeforeBegin-7716e1e2.js"
import{a as kt}from"./addStatTotalToMouseover-9d50bbc5.js"
import{c as Nt}from"./closestForm-b109e51b.js"
import"./all-042a202c.js"
import{a as $t}from"./allthen-d63ed67c.js"
import{c as jt}from"./chunk-d7803644.js"
import{e as Ct}from"./errorDialog-b5d971ab.js"
import{g as vt}from"./getArrayByClassName-511145a8.js"
import"./rnd-9fb6149a.js"
import{f as yt}from"./fetchdata-da292bad.js"
import{j as Tt}from"./jConfirm-035f9cb1.js"
import"./dialog-9b65c22f.js"
import"./indexAjaxJson-6ef1f9f4.js"
import{e as St,u as xt}from"./useItem-42fd7401.js"
import"./ajaxReturnCode-c5920216.js"
import"./daUseItem-25c5cd16.js"
import{r as Bt}from"./replaceDoubleSpace-5a939566.js"
import"./csvSplit-0254185d.js"
import{s as Et}from"./shouldBeArray-b6d52cfc.js"
import{i as Dt}from"./insertHtmlAfterEnd-43b283e0.js"
import{q as At}from"./quickBuffHref-70fb15c0.js"
import{t as Lt}from"./textNodes-252f5396.js"
let Mt
const _t=[t=>"A"===t.tagName,t=>Boolean(t.href),t=>t.href.includes("togglesection")]
function qt(t,n){return n(t)}function Rt(t){t.hasAttribute("style")?function(t){"block"===t.style.display&&gt(t),t.removeAttribute("style")}(t):t.classList.toggle("fshHide")}function wt(t){Rt(5===Number(a(t.href,"section_id"))?(Mt||(Mt=s("backpackContainer")),Mt):t.parentNode.parentNode.nextElementSibling)}function It(t){const{target:n}=t;(function(t){return _t.every(e(qt,t))})(n)&&(wt(n),o(n.href),t.preventDefault())}function Gt(){return r({subcmd:"loadcomponents"})}let Ht,Pt,Jt
function Ut(t,n){return t[n.b]=t[n.b]||{a:n.a,b:n.b,count:0,del:[],v:n.v},t[n.b].count+=1,t[n.b].del.push(n.a),t}function Qt(t,n){return`${t}<tr><td><img src="${p}items/${n.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${n.b}&inv_id=${n.a}&t=2&p=${d()}&vcode=${n.v}"></td><td>${n.count}</td><td>[<span class="sendLink compDelType" data-compid="${n.b}">Del</span>]</td></tr>`}function Wt(t){const n=dt()
return function(t){Ht=t.r.reduce(Ut,{})}(t),l(n,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Ht).reduce(Qt,"")),n}function Ft(t,n){const e=function(t){const n=t.insertRow(-1)
l(n,"<td>Total:</td>")
const e=n.insertCell(-1)
return e.colSpan=2,e}(t)
u(e,function(t){const n=t.r.length,e=ht()
return f(n,e),e}(n)),rt(e," / "+n.h.cm.toString())}function zt(t,n){if(!c(n.r))return
const e=t.parentNode
e&&(f("",e),u(e,function(t){const n=mt({className:"fshTblCenter",id:"fshTally"})
return u(n,Wt(t)),Ft(n,t),n}(n)))}function Ot(t){const n=m(),e=ht({className:"sendLink "+st(t).replace(/ /g,"-"),textContent:t})
return b("[",n),u(n,e),l(n,"]"),n}function Vt(t){return function(t){return r({subcmd:"destroycomponent",removeIndex:t})}(t)}function Xt(){if(!Pt){const t=h("inventory-table",s("profileRightColumn"))
2===t.length&&([,Pt]=t)}return Pt}function Kt(t,n){return t[n.dataset.tipped.match(k)[2]]=n.parentNode.parentNode,t}function Yt(t,n){t[n]&&f("",t[n])}function Zt(t){t.forEach(e(Yt,function(){if(!Jt){const t=g("img",Xt())
Jt=t.reduce(Kt,{})}return Jt}()))}function tn(t){const n=Xt().parentNode
if(!n)return
const e=n.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(N(a))
s-=t,b(s,a)}function nn(t){t.s&&c(t.r)&&(Zt(t.r),tn(t.r.length))}function en(t){t.parentNode.remove()}function on(t){return Vt(t).then(nn)}function an(t,n,e){e.s&&(!function(t){const n=j(`#fshTally [data-compid="${t}"]`)
if(!n)return
const e=n.parentNode.parentNode.children[1],o=Number(N(e))-1
b(o,e)}(n),tn(1),t.parentNode&&f("",t.parentNode))}const sn=["Enable Quick Del","Count Components","Quick Extract Components"]
function rn(t,n){return u(t,Ot(n)),t}function cn(t){l(t.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const fn=[["quick-extract-components",function(){i("components","insertQuickExtract"),v(y)}],["enable-quick-del",function(t){i("components","enableDelComponent")
const n=t.parentNode
gt(n)
const e=n.parentNode
u(e,Ot("Delete All Visible")),g("img",Xt()).forEach(cn)}],["delete-all-visible",function(t){i("components","delAllComponent")
const n=t.parentNode.parentNode.parentNode.children[0]
vt("compDelBtn",n).forEach(T)}],["compDelBtn",function(t){const{tipped:n}=t.parentNode.children[0].children[0].dataset,o=n.match(k),a=o[1]
Vt([o[2]]).then(Ct).then(e(an,t,a))}],["count-components",function(t){i("components","countComponent"),Gt().then(e(zt,t))}],["compDelType",function(t){const n=Ht[t.dataset.compid].del,o=t.parentNode
!function(t){f("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${p}ui/misc/spinner.gif')`}(o)
const a=jt(30,n).map(on)
$t(a,e(en,o))}]]
function un(n){const e=n.parentNode
u(e,sn.reduce(rn,m({className:"fshCenter"}))),t(e,C(fn))}let ln
function pn(t,n){(t=>t&&t.response&&0===t.response.response)(n)&&f("",t.parentNode)}function dn(t){i("profile","doDebuff");(t=>yt({a:22,id:t}))(t.href.match(/(\d+)$/)[1]).then(Ct).then(e(pn,t))}function mn(t){ln?dn(t):function(t){const n=t.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Tt("Remove Skill",n,e(dn,t))}(t)}function bn(t){let n=t.target
if("IMG"===n.tagName)x(t.target),n=n.parentNode
else if("A"!==n.tagName)return
t.stopPropagation(),t.preventDefault(),mn(n)}function hn(t,n){return n.a===t}function gn(t,n){0===n.r?(!function(t,n){const o=t.srcData.findIndex(e(hn,Number(n)));-1!==o&&t.srcData.splice(o,1)}(t[0],t[3]),t[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${t[1]}</span>`,t[2].parentNode)):t[2].remove()}function kn(t,n,o,a){i("profile","fastAction - "+a)
const{target:s}=n,r=s.parentNode.parentNode.children[0].dataset.inv
b("",s),s.className="fastAction fshSpinner fshSpinner12",o(r).then(e(gn,[t,a,s,r]))}function Nn(t,n){n.target.classList.contains("fastWear")&&kn(t,n,St,"Worn"),n.target.classList.contains("fastUse")&&kn(t,n,xt,"Used")}function $n(t){return t?"Use":"Wear"}function jn(t,n){const e=n.classList.contains("backpackContextMenuUsable"),o=m({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${$n(e)}</span>`})
var a
t.options.checkboxesEnabled&&u(o,n.parentNode.nextElementSibling.nextElementSibling),u(n.parentNode.parentNode,o)}function Cn(t){A(`#backpackTab_${t.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(jn,t))}function vn(t,n){const e=`${p}ui/misc/${n}.png`
t.src!==e&&(t.src=e)}function yn(t,n){n.dataset.folder===t?vn(n,"folder_on"):vn(n,"folder")}function Tn(n,o){const a=o._showPage
o._showPage=function(t,n){o.tabData&&(!function(t){A(".backpackFolderImage").forEach(e(yn,String(t.folderId)))}(o),a.call(o,t,n),Cn(o))},0!==N(s("backpack_current")).length&&D(3,Cn,[o]),t(n,e(Nn,o))}function Sn(){S("enableQuickDrink")&&(function(){const t=s("backpack")
t.className="fshBackpack",t.removeAttribute("style")}(),function(){const t=s("backpackContainer"),n=$(t).data("hcsBackpack")
n&&Tn(t,n)}())}function xn(t){return function(t){return r({subcmd:"unequipitem",inventory_id:t})}(t)}let Bn,En,Dn
function An(t,n){n.s&&f("",t.parentNode)}function Ln(t){const n=/inventory_id=(\d+)/.exec(t.href)[1]
n&&xn(n).then(e(An,t))}function Mn(){i("profile","nekidBtn")
const t=Bn.nextElementSibling
g("a",t).forEach(Ln)}function _n(){const n=s("profileRightColumn")
Bn=s("profileCombatSetDiv")
const e=Bn.parentNode.nextElementSibling,o=function(){const n=m({className:"fshCenter"}),e=bt({className:"fshBl fshBls",textContent:"Nekid"})
return rt(n,"[ "),u(n,e),rt(n," ]"),t(e,Mn),n}()
n.replaceChild(o,e)}const qn=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Rn=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function wn(t){const n=Et(t)
return n?n.map(Bt).map(st):[]}function In(t){return[wn(t[0]),t[1]]}function Gn(t,n){return n[0].includes(t)}function Hn(t){const n=Rn.map(In),o=Bt(st(t)),a=n.find(e(Gn,o))
if(a)return a[1]}function Pn(t){return En=function(t){const n=/guild_id=([0-9]+)/i.exec(t.href)
if(n)return Number(n[1])}(t),En&&En===ut()?(M("guildSelf",N(t)),"self"):Hn(N(t))}function Jn(t){return t[0]===Dn}function Un(t){Dn=Pn(t),Dn&&function(t){const n=qn.find(Jn)
t.parentNode.classList.add(n[1]),l(t.parentNode,"<br>"+S(n[2]))}(t)}function Qn(t,n,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${At(n)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!S("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${R}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const t=S("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${w}" data-tipped="Join All Groups < ${t} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${_}&type=-3&tid=${n}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${q}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(t){return"self"===Dn?`<a class="quickButton tip-static fshTempleThree" href="${I}${t}" data-tipped="Recall items from ${t}"></a>&nbsp;&nbsp;`:""}(e),o+=function(t,n){return"self"===Dn&&S("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${G}members&subcmd2=changerank&member_id=${t}" data-tipped="Rank ${n}" style="background-image: url('${p}guilds/${En}_mini.png');"></a>&nbsp;&nbsp;`:""}(n,e),o+="</div>",Dt(t,o)}function Wn(t,n){const e=n.parentNode,o=P(J,e.nextElementSibling).length-1
l(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(o,S(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function Fn(t){return function(t){return t&&S("renderSelfBio")}(t)||function(t){return!t&&S("renderOtherBios")}(t)}function zn(t,n){Fn(t)&&function(t){let n=t.innerHTML
n=et(n),n&&f(n,t)}(n)}function On(n){const e=s("profile-bio")
e&&(zn(n,e),S("enableBioCompressor")&&D(3,ct,[e]),t(e,ot))}function Vn(){i("profile","insertQuickWear"),v(Q)}function Xn(){const t=s("backpack_tabs"),n=h("tab-selected",t)[0].getAttribute("data-type")
let e=A(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=A(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(T)}function Kn(){const t=parseInt(N(s(F)),10)
!function(t){return lt(pt(h(z)))===t}(t)?M(O,t):M(O,"")}const Yn=98,Zn=85,te=60
function ne(t){return Number(V(s("stat-"+t.toLowerCase()).childNodes).filter(Lt).map(E).join(""))}function ee(t){const n=m({innerHTML:t.dataset.tipped}),e=g("b",n).map(t=>E(t)),o=ne(e[2])
nt(o)||function(t,n,e){const o=ne(n[3]),a=Math.floor(e*(Number(n[1].replace(/[+%]/g,""))/100))
it(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${n[2]}: ${String(e-a)}&nbsp;&nbsp;${n[3]}: ${String(o+a)}$&`),t)}(t,e,o)}function oe(t){const n=j(`#profileRightColumn img[src$="/${String(t)}.png"]`)
n&&ee(n)}function ae(t){const n=P("td",t)
f(`<span id="${n[0].id}">${n[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${N(n[1])}</div>`,t.parentNode)}function se(o){o&&(!function(){const n=s("profileRightColumn")
n&&(ln=S("disableDeactivatePrompts"),t(n.lastElementChild,bn,!0))}(),function(){const t=A("#profileLeftColumn strong")
t.filter(H("Allies")).forEach(e(Wn,!0)),t.filter(H("Enemies")).forEach(e(Wn,!1))}(),Sn(),function(){const t=Xt()
t&&un(t)}(),function(){const n=j(`#profileRightColumn a[href="${U}profile&subcmd=togglesection&section_id=2"]`)
if(!n)return
const e=ht({innerHTML:"&nbsp;["}),o=ht({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
u(e,o),rt(e,"]"),u(n.parentNode,e),t(o,Vn)}(),function(){const n=j(`#profileRightColumn a[href="${W}"]`)
if(!n)return
const e=ht({className:"smallLink",textContent:"All"})
t(e,Xn)
const o=ht({innerHTML:"[&nbsp;"})
u(o,e),l(o,"&nbsp;]&nbsp;"),u(n.parentNode,o)}(),Kn(),_n(),t(n,It))}function re(t,n,e){!function(t){const n=j(`#pCC a[href^="${L}"]`)
n?Un(n):t&&M("guildSelf","")}(e)
Qn(t,Y(Z("player_id"),d()),n)}function ie(t,n,e){se(e),re(t,n,e),[Yn,Zn,te].forEach(oe),function(){const t=P(J,s("profileLeftColumn"))[0]
g(J,t).forEach(ae)}(),function(){if(!S("highlightPvpProtection"))return
const t=j(`#profileLeftColumn a[href="${B}"]`)
"N/A"!==E(t.parentNode.nextSibling)&&(t.parentNode.parentNode.style.cssText="border: 3px solid red")}(),D(3,On,[e]),kt(),D(3,ft)}function ce(t){t.preventDefault()
const n=V(Nt(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${tt}?${n}`}export default function(){if(X())return
const t=j('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!t)return
const e=N(P("h1",n)[0]),o=e===at()
ie(t,e,o),function(t){t||K(j("#profileRightColumn"),"submit",ce)}(o)}
//# sourceMappingURL=profile-900460ba.js.map
