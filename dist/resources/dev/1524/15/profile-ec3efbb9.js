import{o as t,p as n,s as e,aK as o,bM as a,x as s,bf as r,S as i,L as c,z as f,f as u,i as l,aw as p,bm as d,k as m,y as b,F as h,g,h as k,A as N,M as j,bN as C,T as y,bO as v,O as T,D as S,af as B,aU as x,aQ as E,a as L,I as D,by as A,W as M,bP as _,br as R,b5 as w,b6 as I,bL as q,r as P,aP as G,b as H,d as J,aT as Q,bQ as U,b1 as W,bR as O,G as F,E as z,ay as V,w as K,e as X,a0 as Y,N as Z,J as tt}from"./calfSystem-ee582533.js"
import{n as nt}from"./numberIsNaN-c9f76e43.js"
import"./round-12db58e6.js"
import"./roundToString-cbd573ec.js"
import{r as et,b as ot}from"./render-eb9874dd.js"
import{p as at}from"./playerName-e40f24e0.js"
import{t as st}from"./toLowerCase-6383ba3b.js"
import"./createInput-2410e798.js"
import{i as rt}from"./insertTextBeforeEnd-85cd30d6.js"
import"./onlineDot-6ce6d139.js"
import{s as it}from"./setTipped-a858a4c4.js"
import"./batch-59d43fba.js"
import{c as ct,a as ft}from"./compressBio-e624b8a1.js"
import"./createLabel-96cdd0a5.js"
import{c as ut}from"./currentGuildId-0564d9a0.js"
import{i as lt}from"./intValue-a842cf8a.js"
import{v as pt}from"./valueText-a2e47d93.js"
import{c as dt}from"./createTBody-aa153e3a.js"
import{c as mt}from"./createTable-cbb3667c.js"
import{c as bt}from"./createButton-6e7396b9.js"
import"./dialogMsg-b9afb04d.js"
import{c as ht}from"./createSpan-63b97269.js"
import{h as gt}from"./hideElement-faecef36.js"
import"./closest-d675e111.js"
import"./closestTable-ffc1b5cf.js"
import"./insertHtmlBeforeBegin-66a80e13.js"
import{a as kt}from"./addStatTotalToMouseover-e9c19da5.js"
import"./all-b94d2d9d.js"
import{a as Nt}from"./allthen-f1914fd2.js"
import{c as $t}from"./chunk-7f692bd3.js"
import{e as jt}from"./errorDialog-647ae9d2.js"
import{g as Ct}from"./getArrayByClassName-981a136a.js"
import"./rnd-2334d68f.js"
import{f as yt}from"./fetchdata-a44c0599.js"
import{j as vt}from"./jConfirm-4bd5807a.js"
import"./dialog-b2af5043.js"
import"./indexAjaxJson-e486d467.js"
import{e as Tt,u as St}from"./useItem-bfe3ee6a.js"
import"./ajaxReturnCode-c49dbedc.js"
import"./daUseItem-f1308817.js"
import{r as Bt}from"./replaceDoubleSpace-f55f9c04.js"
import"./csvSplit-7018cdb4.js"
import{s as xt}from"./shouldBeArray-3e5e27c5.js"
import{i as Et}from"./insertHtmlAfterEnd-4dbaaf09.js"
import{q as Lt}from"./quickBuffHref-35f51ba4.js"
let Dt
const At=[t=>"A"===t.tagName,t=>Boolean(t.href),t=>t.href.includes("togglesection")]
function Mt(t,n){return n(t)}function _t(t){t.hasAttribute("style")?function(t){"block"===t.style.display&&gt(t),t.removeAttribute("style")}(t):t.classList.toggle("fshHide")}function Rt(t){_t(5===Number(a(t.href,"section_id"))?(Dt||(Dt=s("backpackContainer")),Dt):t.parentNode.parentNode.nextElementSibling)}function wt(t){const{target:n}=t;(function(t){return At.every(e(Mt,t))})(n)&&(Rt(n),o(n.href),t.preventDefault())}function It(){return r({subcmd:"loadcomponents"})}let qt,Pt,Gt
function Ht(t,n){return t[n.b]=t[n.b]||{a:n.a,b:n.b,count:0,del:[],v:n.v},t[n.b].count+=1,t[n.b].del.push(n.a),t}function Jt(t,n){return`${t}<tr><td><img src="${p}items/${n.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${n.b}&inv_id=${n.a}&t=2&p=${d()}&vcode=${n.v}"></td><td>${n.count}</td><td>[<span class="sendLink compDelType" data-compid="${n.b}">Del</span>]</td></tr>`}function Qt(t){const n=dt()
return function(t){qt=t.r.reduce(Ht,{})}(t),l(n,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(qt).reduce(Jt,"")),n}function Ut(t,n){const e=function(t){const n=t.insertRow(-1)
l(n,"<td>Total:</td>")
const e=n.insertCell(-1)
return e.colSpan=2,e}(t)
u(e,function(t){const n=t.r.length,e=ht()
return f(n,e),e}(n)),rt(e," / "+n.h.cm.toString())}function Wt(t,n){if(!c(n.r))return
const e=t.parentNode
e&&(f("",e),u(e,function(t){const n=mt({className:"fshTblCenter",id:"fshTally"})
return u(n,Qt(t)),Ut(n,t),n}(n)))}function Ot(t){const n=m(),e=ht({className:"sendLink "+st(t).replace(/ /g,"-"),textContent:t})
return b("[",n),u(n,e),l(n,"]"),n}function Ft(t){return function(t){return r({subcmd:"destroycomponent",removeIndex:t})}(t)}function zt(){if(!Pt){const t=h("inventory-table",s("profileRightColumn"))
2===t.length&&([,Pt]=t)}return Pt}function Vt(t,n){return t[n.dataset.tipped.match(k)[2]]=n.parentNode.parentNode,t}function Kt(t,n){t[n]&&f("",t[n])}function Xt(t){t.forEach(e(Kt,function(){if(!Gt){const t=g("img",zt())
Gt=t.reduce(Vt,{})}return Gt}()))}function Yt(t){const n=zt().parentNode
if(!n)return
const e=n.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(N(a))
s-=t,b(s,a)}function Zt(t){t.s&&c(t.r)&&(Xt(t.r),Yt(t.r.length))}function tn(t){t.parentNode.remove()}function nn(t){return Ft(t).then(Zt)}function en(t,n,e){e.s&&(!function(t){const n=j(`#fshTally [data-compid="${t}"]`)
if(!n)return
const e=n.parentNode.parentNode.children[1],o=Number(N(e))-1
b(o,e)}(n),Yt(1),t.parentNode&&f("",t.parentNode))}const on=["Enable Quick Del","Count Components","Quick Extract Components"]
function an(t,n){return u(t,Ot(n)),t}function sn(t){l(t.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rn=[["quick-extract-components",function(){i("components","insertQuickExtract"),y(v)}],["enable-quick-del",function(t){i("components","enableDelComponent")
const n=t.parentNode
gt(n)
const e=n.parentNode
u(e,Ot("Delete All Visible")),g("img",zt()).forEach(sn)}],["delete-all-visible",function(t){i("components","delAllComponent")
const n=t.parentNode.parentNode.parentNode.children[0]
Ct("compDelBtn",n).forEach(T)}],["compDelBtn",function(t){const{tipped:n}=t.parentNode.children[0].children[0].dataset,o=n.match(k),a=o[1]
Ft([o[2]]).then(jt).then(e(en,t,a))}],["count-components",function(t){i("components","countComponent"),It().then(e(Wt,t))}],["compDelType",function(t){const n=qt[t.dataset.compid].del,o=t.parentNode
!function(t){f("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${p}ui/misc/spinner.gif')`}(o)
const a=$t(30,n).map(nn)
Nt(a,e(tn,o))}]]
function cn(n){const e=n.parentNode
u(e,on.reduce(an,m({className:"fshCenter"}))),t(e,C(rn))}let fn
function un(t,n){(t=>t&&t.response&&0===t.response.response)(n)&&f("",t.parentNode)}function ln(t){i("profile","doDebuff");(t=>yt({a:22,id:t}))(t.href.match(/(\d+)$/)[1]).then(jt).then(e(un,t))}function pn(t){fn?ln(t):function(t){const n=t.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
vt("Remove Skill",n,e(ln,t))}(t)}function dn(t){let n=t.target
if("IMG"===n.tagName)B(t.target),n=n.parentNode
else if("A"!==n.tagName)return
t.stopPropagation(),t.preventDefault(),pn(n)}function mn(t,n){return n.a===t}function bn(t,n){0===n.r?(!function(t,n){const o=t.srcData.findIndex(e(mn,Number(n)));-1!==o&&t.srcData.splice(o,1)}(t[0],t[3]),t[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${t[1]}</span>`,t[2].parentNode)):t[2].remove()}function hn(t,n,o,a){i("profile","fastAction - "+a)
const{target:s}=n,r=s.parentNode.parentNode.children[0].dataset.inv
b("",s),s.className="fastAction fshSpinner fshSpinner12",o(r).then(e(bn,[t,a,s,r]))}function gn(t,n){n.target.classList.contains("fastWear")&&hn(t,n,Tt,"Worn"),n.target.classList.contains("fastUse")&&hn(t,n,St,"Used")}function kn(t){return t?"Use":"Wear"}function Nn(t,n){const e=n.classList.contains("backpackContextMenuUsable"),o=m({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kn(e)}</span>`})
var a
t.options.checkboxesEnabled&&u(o,n.parentNode.nextElementSibling.nextElementSibling),u(n.parentNode.parentNode,o)}function $n(t){D(`#backpackTab_${t.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nn,t))}function jn(t,n){const e=`${p}ui/misc/${n}.png`
t.src!==e&&(t.src=e)}function Cn(t,n){n.dataset.folder===t?jn(n,"folder_on"):jn(n,"folder")}function yn(n,o){const a=o._showPage
o._showPage=function(t,n){o.tabData&&(!function(t){D(".backpackFolderImage").forEach(e(Cn,String(t.folderId)))}(o),a.call(o,t,n),$n(o))},0!==N(s("backpack_current")).length&&L(3,$n,[o]),t(n,e(gn,o))}function vn(){S("enableQuickDrink")&&(function(){const t=s("backpack")
t.className="fshBackpack",t.removeAttribute("style")}(),function(){const t=s("backpackContainer"),n=$(t).data("hcsBackpack")
n&&yn(t,n)}())}function Tn(t){return function(t){return r({subcmd:"unequipitem",inventory_id:t})}(t)}let Sn,Bn,xn
function En(t,n){n.s&&f("",t.parentNode)}function Ln(t){const n=/inventory_id=(\d+)/.exec(t.href)[1]
n&&Tn(n).then(e(En,t))}function Dn(){i("profile","nekidBtn")
const t=Sn.nextElementSibling
g("a",t).forEach(Ln)}function An(){const n=s("profileRightColumn")
Sn=s("profileCombatSetDiv")
const e=Sn.parentNode.nextElementSibling,o=function(){const n=m({className:"fshCenter"}),e=bt({className:"fshBl fshBls",textContent:"Nekid"})
return rt(n,"[ "),u(n,e),rt(n," ]"),t(e,Dn),n}()
n.replaceChild(o,e)}const Mn=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],_n=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rn(t){const n=xt(t)
return n?n.map(Bt).map(st):[]}function wn(t){return[Rn(t[0]),t[1]]}function In(t,n){return n[0].includes(t)}function qn(t){const n=_n.map(wn),o=Bt(st(t)),a=n.find(e(In,o))
if(a)return a[1]}function Pn(t){return Bn=function(t){const n=/guild_id=([0-9]+)/i.exec(t.href)
if(n)return Number(n[1])}(t),Bn&&Bn===ut()?(M("guildSelf",N(t)),"self"):qn(N(t))}function Gn(t){return t[0]===xn}function Hn(t){xn=Pn(t),xn&&function(t){const n=Mn.find(Gn)
t.parentNode.classList.add(n[1]),l(t.parentNode,"<br>"+S(n[2]))}(t)}function Jn(t,n,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Lt(n)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!S("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${w}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const t=S("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${I}" data-tipped="Join All Groups < ${t} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${_}&type=-3&tid=${n}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${R}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(t){return"self"===xn?`<a class="quickButton tip-static fshTempleThree" href="${q}${t}" data-tipped="Recall items from ${t}"></a>&nbsp;&nbsp;`:""}(e),o+=function(t,n){return"self"===xn&&S("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${P}members&subcmd2=changerank&member_id=${t}" data-tipped="Rank ${n}" style="background-image: url('${p}guilds/${Bn}_mini.png');"></a>&nbsp;&nbsp;`:""}(n,e),o+="</div>",Et(t,o)}function Qn(t,n){const e=n.parentNode,o=H(J,e.nextElementSibling).length-1
l(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(o,S(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function Un(t){return function(t){return t&&S("renderSelfBio")}(t)||function(t){return!t&&S("renderOtherBios")}(t)}function Wn(t,n){Un(t)&&function(t){let n=t.innerHTML
n=et(n),n&&f(n,t)}(n)}function On(n){const e=s("profile-bio")
e&&(Wn(n,e),S("enableBioCompressor")&&L(3,ct,[e]),t(e,ot))}function Fn(){i("profile","insertQuickWear"),y(U)}function zn(){const t=s("backpack_tabs"),n=h("tab-selected",t)[0].getAttribute("data-type")
let e=D(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=D(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(T)}function Vn(){const t=parseInt(N(s(O)),10)
!function(t){return lt(pt(h(F)))===t}(t)?M(z,t):M(z,"")}const Kn=98,Xn=85,Yn=60
function Zn(t){return Number(V(s("stat-"+t.toLowerCase()).childNodes).filter(t=>3===t.nodeType).map(E).join(""))}function te(t){const n=m({innerHTML:t.dataset.tipped}),e=g("b",n).map(t=>E(t)),o=Zn(e[2])
nt(o)||function(t,n,e){const o=Zn(n[3]),a=Math.floor(e*(Number(n[1].replace(/[+%]/g,""))/100))
it(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${n[2]}: ${String(e-a)}&nbsp;&nbsp;${n[3]}: ${String(o+a)}$&`),t)}(t,e,o)}function ne(t){const n=j(`#profileRightColumn img[src$="/${String(t)}.png"]`)
n&&te(n)}function ee(t){const n=H("td",t)
f(`<span id="${n[0].id}">${n[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${N(n[1])}</div>`,t.parentNode)}function oe(o){o&&(!function(){const n=s("profileRightColumn")
n&&(fn=S("disableDeactivatePrompts"),t(n.lastElementChild,dn,!0))}(),function(){const t=D("#profileLeftColumn strong")
t.filter(G("Allies")).forEach(e(Qn,!0)),t.filter(G("Enemies")).forEach(e(Qn,!1))}(),vn(),function(){const t=zt()
t&&cn(t)}(),function(){const n=j(`#profileRightColumn a[href="${Q}profile&subcmd=togglesection&section_id=2"]`)
if(!n)return
const e=ht({innerHTML:"&nbsp;["}),o=ht({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
u(e,o),rt(e,"]"),u(n.parentNode,e),t(o,Fn)}(),function(){const n=j(`#profileRightColumn a[href="${W}"]`)
if(!n)return
const e=ht({className:"smallLink",textContent:"All"})
t(e,zn)
const o=ht({innerHTML:"[&nbsp;"})
u(o,e),l(o,"&nbsp;]&nbsp;"),u(n.parentNode,o)}(),Vn(),An(),t(n,wt))}function ae(t,n,e){!function(t){const n=j(`#pCC a[href^="${A}"]`)
n?Hn(n):t&&M("guildSelf","")}(e)
Jn(t,Y(Z("player_id"),d()),n)}function se(t,n,e){oe(e),ae(t,n,e),[Kn,Xn,Yn].forEach(ne),function(){const t=H(J,s("profileLeftColumn"))[0]
g(J,t).forEach(ee)}(),function(){if(!S("highlightPvpProtection"))return
const t=j(`#profileLeftColumn a[href="${x}"]`)
"N/A"!==E(t.parentNode.nextSibling)&&(t.parentNode.parentNode.style.cssText="border: 3px solid red")}(),L(3,On,[e]),kt(),L(3,ft)}function re(t){t.preventDefault()
const n=V(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${tt}?${n}`}export default function(){if(K())return
const t=j('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!t)return
const e=N(H("h1",n)[0]),o=e===at()
se(t,e,o),function(t){t||X(j("#profileRightColumn"),"submit",re)}(o)}
//# sourceMappingURL=profile-ec3efbb9.js.map
