import{o as t,p as n,s as e,aJ as o,bC as a,x as s,bo as r,R as i,z as c,f,i as u,at as l,be as p,k as d,y as m,F as b,g as h,h as g,A as k,L as N,bD as j,S as C,bE as y,N as v,D as S,ac as T,aR as B,aS as x,a as E,I as D,bF as A,V as L,bG as M,bj as _,b3 as R,b4 as I,bB as q,r as w,b8 as G,b as H,d as J,aP as P,bH as Q,a$ as U,bI as W,G as F,E as z,av as O,w as V,e as K,$ as X,M as Y,J as Z}from"./calfSystem-740ec4d2.js"
import{i as tt}from"./isArray-3eb52569.js"
import{n as nt}from"./numberIsNaN-2fbabd4d.js"
import"./roundToString-c7353690.js"
import{r as et,b as ot}from"./render-ad06fdd4.js"
import{p as at}from"./playerName-a172b8d3.js"
import{t as st}from"./toLowerCase-dcd4458e.js"
import"./createInput-e6e1d6b3.js"
import{i as rt}from"./insertTextBeforeEnd-438d4add.js"
import"./onlineDot-176ac2e8.js"
import{s as it}from"./setTipped-af58be0b.js"
import"./batch-b6a89158.js"
import{c as ct,a as ft}from"./compressBio-5d88febd.js"
import"./createLabel-de0fa934.js"
import{c as ut}from"./currentGuildId-ce4d8404.js"
import{i as lt}from"./intValue-576c2dec.js"
import{v as pt}from"./valueText-3095af99.js"
import{c as dt}from"./createTBody-cd7d668a.js"
import{c as mt}from"./createTable-0cac6208.js"
import{c as bt}from"./createButton-cf2f339d.js"
import"./dialogMsg-a44aafc4.js"
import{c as ht}from"./createSpan-b29fd959.js"
import{h as gt}from"./hideElement-f48178cf.js"
import"./closest-a3325de8.js"
import"./closestTable-770ab949.js"
import"./insertHtmlBeforeBegin-3188dd8f.js"
import{a as kt}from"./addStatTotalToMouseover-e795b2fd.js"
import"./all-30e677b0.js"
import{a as Nt}from"./allthen-0a5c5fb9.js"
import{c as $t}from"./chunk-022e7847.js"
import{e as jt}from"./errorDialog-d5947e19.js"
import{g as Ct}from"./getArrayByClassName-c703ad24.js"
import"./rnd-1c872e21.js"
import{f as yt}from"./fetchdata-74004ef8.js"
import{j as vt}from"./jConfirm-bbb6e556.js"
import"./dialog-004172c3.js"
import"./indexAjaxJson-1e1af708.js"
import{e as St,u as Tt}from"./useItem-6598ea1f.js"
import"./ajaxReturnCode-e6ac4096.js"
import"./daUseItem-77f590b8.js"
import{r as Bt}from"./replaceDoubleSpace-d60802e1.js"
import"./csvSplit-dbbb8019.js"
import{s as xt}from"./shouldBeArray-2f2d7d51.js"
import{i as Et}from"./insertHtmlAfterEnd-85b35954.js"
import{q as Dt}from"./quickBuffHref-239a5ae3.js"
let At
const Lt=[t=>"A"===t.tagName,t=>Boolean(t.href),t=>t.href.includes("togglesection")]
function Mt(t,n){return n(t)}function _t(t){t.hasAttribute("style")?function(t){"block"===t.style.display&&gt(t),t.removeAttribute("style")}(t):t.classList.toggle("fshHide")}function Rt(t){_t(5===Number(a(t.href,"section_id"))?(At||(At=s("backpackContainer")),At):t.parentNode.parentNode.nextElementSibling)}function It(t){const{target:n}=t;(function(t){return Lt.every(e(Mt,t))})(n)&&(Rt(n),o(n.href),t.preventDefault())}function qt(){return r({subcmd:"loadcomponents"})}let wt,Gt,Ht
function Jt(t,n){return t[n.b]=t[n.b]||{a:n.a,b:n.b,count:0,del:[],v:n.v},t[n.b].count+=1,t[n.b].del.push(n.a),t}function Pt(t,n){return`${t}<tr><td><img src="${l}items/${n.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${n.b}&inv_id=${n.a}&t=2&p=${p()}&vcode=${n.v}"></td><td>${n.count}</td><td>[<span class="sendLink compDelType" data-compid="${n.b}">Del</span>]</td></tr>`}function Qt(t){const n=dt()
return function(t){wt=t.r.reduce(Jt,{})}(t),u(n,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(wt).reduce(Pt,"")),n}function Ut(t,n){const e=function(t){const n=t.insertRow(-1)
u(n,"<td>Total:</td>")
const e=n.insertCell(-1)
return e.colSpan=2,e}(t)
f(e,function(t){const n=t.r.length,e=ht()
return c(n,e),e}(n)),rt(e," / "+n.h.cm.toString())}function Wt(t,n){if(!tt(n.r))return
const e=t.parentNode
e&&(c("",e),f(e,function(t){const n=mt({className:"fshTblCenter",id:"fshTally"})
return f(n,Qt(t)),Ut(n,t),n}(n)))}function Ft(t){const n=d(),e=ht({className:"sendLink "+st(t).replace(/ /g,"-"),textContent:t})
return m("[",n),f(n,e),u(n,"]"),n}function zt(t){return function(t){return r({subcmd:"destroycomponent",removeIndex:t})}(t)}function Ot(){if(!Gt){const t=b("inventory-table",s("profileRightColumn"))
2===t.length&&([,Gt]=t)}return Gt}function Vt(t,n){return t[n.dataset.tipped.match(g)[2]]=n.parentNode.parentNode,t}function Kt(t,n){t[n]&&c("",t[n])}function Xt(t){t.forEach(e(Kt,function(){if(!Ht){const t=h("img",Ot())
Ht=t.reduce(Vt,{})}return Ht}()))}function Yt(t){const n=Ot().parentNode
if(!n)return
const e=n.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(k(a))
s-=t,m(s,a)}function Zt(t){t.s&&tt(t.r)&&(Xt(t.r),Yt(t.r.length))}function tn(t){t.parentNode.remove()}function nn(t){return zt(t).then(Zt)}function en(t,n,e){e.s&&(!function(t){const n=N(`#fshTally [data-compid="${t}"]`)
if(!n)return
const e=n.parentNode.parentNode.children[1],o=Number(k(e))-1
m(o,e)}(n),Yt(1),t.parentNode&&c("",t.parentNode))}const on=["Enable Quick Del","Count Components","Quick Extract Components"]
function an(t,n){return f(t,Ft(n)),t}function sn(t){u(t.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rn=[["quick-extract-components",function(){i("components","insertQuickExtract"),C(y)}],["enable-quick-del",function(t){i("components","enableDelComponent")
const n=t.parentNode
gt(n)
const e=n.parentNode
f(e,Ft("Delete All Visible")),h("img",Ot()).forEach(sn)}],["delete-all-visible",function(t){i("components","delAllComponent")
const n=t.parentNode.parentNode.parentNode.children[0]
Ct("compDelBtn",n).forEach(v)}],["compDelBtn",function(t){const{tipped:n}=t.parentNode.children[0].children[0].dataset,o=n.match(g),a=o[1]
zt([o[2]]).then(jt).then(e(en,t,a))}],["count-components",function(t){i("components","countComponent"),qt().then(e(Wt,t))}],["compDelType",function(t){const n=wt[t.dataset.compid].del,o=t.parentNode
!function(t){c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${l}ui/misc/spinner.gif')`}(o)
const a=$t(30,n).map(nn)
Nt(a,e(tn,o))}]]
function cn(n){const e=n.parentNode
f(e,on.reduce(an,d({className:"fshCenter"}))),t(e,j(rn))}let fn
function un(t,n){(t=>t&&t.response&&0===t.response.response)(n)&&c("",t.parentNode)}function ln(t){i("profile","doDebuff");(t=>yt({a:22,id:t}))(t.href.match(/(\d+)$/)[1]).then(jt).then(e(un,t))}function pn(t){fn?ln(t):function(t){const n=t.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
vt("Remove Skill",n,e(ln,t))}(t)}function dn(t){let n=t.target
if("IMG"===n.tagName)T(t.target),n=n.parentNode
else if("A"!==n.tagName)return
t.stopPropagation(),t.preventDefault(),pn(n)}function mn(t,n){return n.a===t}function bn(t,n){0===n.r?(!function(t,n){const o=t.srcData.findIndex(e(mn,Number(n)));-1!==o&&t.srcData.splice(o,1)}(t[0],t[3]),t[2].classList.remove("fshSpinner"),c(`<span class="fastWorn">${t[1]}</span>`,t[2].parentNode)):t[2].remove()}function hn(t,n,o,a){i("profile","fastAction - "+a)
const{target:s}=n,r=s.parentNode.parentNode.children[0].dataset.inv
m("",s),s.className="fastAction fshSpinner fshSpinner12",o(r).then(e(bn,[t,a,s,r]))}function gn(t,n){n.target.classList.contains("fastWear")&&hn(t,n,St,"Worn"),n.target.classList.contains("fastUse")&&hn(t,n,Tt,"Used")}function kn(t){return t?"Use":"Wear"}function Nn(t,n){const e=n.classList.contains("backpackContextMenuUsable"),o=d({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kn(e)}</span>`})
var a
t.options.checkboxesEnabled&&f(o,n.parentNode.nextElementSibling.nextElementSibling),f(n.parentNode.parentNode,o)}function $n(t){D(`#backpackTab_${t.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nn,t))}function jn(t,n){const e=`${l}ui/misc/${n}.png`
t.src!==e&&(t.src=e)}function Cn(t,n){n.dataset.folder===t?jn(n,"folder_on"):jn(n,"folder")}function yn(n,o){const a=o._showPage
o._showPage=function(t,n){o.tabData&&(!function(t){D(".backpackFolderImage").forEach(e(Cn,String(t.folderId)))}(o),a.call(o,t,n),$n(o))},0!==k(s("backpack_current")).length&&E(3,$n,[o]),t(n,e(gn,o))}function vn(){S("enableQuickDrink")&&(function(){const t=s("backpack")
t.className="fshBackpack",t.removeAttribute("style")}(),function(){const t=s("backpackContainer"),n=$(t).data("hcsBackpack")
n&&yn(t,n)}())}function Sn(t){return function(t){return r({subcmd:"unequipitem",inventory_id:t})}(t)}let Tn,Bn,xn
function En(t,n){n.s&&c("",t.parentNode)}function Dn(t){const n=/inventory_id=(\d+)/.exec(t.href)[1]
n&&Sn(n).then(e(En,t))}function An(){i("profile","nekidBtn")
const t=Tn.nextElementSibling
h("a",t).forEach(Dn)}function Ln(){const n=s("profileRightColumn")
Tn=s("profileCombatSetDiv")
const e=Tn.parentNode.nextElementSibling,o=function(){const n=d({className:"fshCenter"}),e=bt({className:"fshBl fshBls",textContent:"Nekid"})
return rt(n,"[ "),f(n,e),rt(n," ]"),t(e,An),n}()
n.replaceChild(o,e)}const Mn=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],_n=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rn(t){const n=xt(t)
return n?n.map(Bt).map(st):[]}function In(t){return[Rn(t[0]),t[1]]}function qn(t,n){return n[0].includes(t)}function wn(t){const n=_n.map(In),o=Bt(st(t)),a=n.find(e(qn,o))
if(a)return a[1]}function Gn(t){return Bn=function(t){const n=/guild_id=([0-9]+)/i.exec(t.href)
if(n)return Number(n[1])}(t),Bn&&Bn===ut()?(L("guildSelf",k(t)),"self"):wn(k(t))}function Hn(t){return t[0]===xn}function Jn(t){xn=Gn(t),xn&&function(t){const n=Mn.find(Hn)
t.parentNode.classList.add(n[1]),u(t.parentNode,"<br>"+S(n[2]))}(t)}function Pn(t,n,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Dt(n)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!S("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${R}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const t=S("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${I}" data-tipped="Join All Groups < ${t} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${M}&type=-3&tid=${n}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${_}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(t){return"self"===xn?`<a class="quickButton tip-static fshTempleThree" href="${q}${t}" data-tipped="Recall items from ${t}"></a>&nbsp;&nbsp;`:""}(e),o+=function(t,n){return"self"===xn&&S("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${w}members&subcmd2=changerank&member_id=${t}" data-tipped="Rank ${n}" style="background-image: url('${l}guilds/${Bn}_mini.png');"></a>&nbsp;&nbsp;`:""}(n,e),o+="</div>",Et(t,o)}function Qn(t,n){const e=n.parentNode,o=H(J,e.nextElementSibling).length-1
u(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(o,S(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function Un(t){return function(t){return t&&S("renderSelfBio")}(t)||function(t){return!t&&S("renderOtherBios")}(t)}function Wn(t,n){Un(t)&&function(t){let n=t.innerHTML
n=et(n),n&&c(n,t)}(n)}function Fn(n){const e=s("profile-bio")
e&&(Wn(n,e),S("enableBioCompressor")&&E(3,ct,[e]),t(e,ot))}function zn(){i("profile","insertQuickWear"),C(Q)}function On(){const t=s("backpack_tabs"),n=b("tab-selected",t)[0].getAttribute("data-type")
let e=D(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=D(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(v)}function Vn(){const t=parseInt(k(s(W)),10)
!function(t){return lt(pt(b(F)))===t}(t)?L(z,t):L(z,"")}const Kn=98,Xn=85,Yn=60
function Zn(t){return Number(O(s("stat-"+t.toLowerCase()).childNodes).filter(t=>3===t.nodeType).map(x).join(""))}function te(t){const n=d({innerHTML:t.dataset.tipped}),e=h("b",n).map(t=>x(t)),o=Zn(e[2])
nt(o)||function(t,n,e){const o=Zn(n[3]),a=Math.floor(e*(Number(n[1].replace(/[+%]/g,""))/100))
it(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${n[2]}: ${String(e-a)}&nbsp;&nbsp;${n[3]}: ${String(o+a)}$&`),t)}(t,e,o)}function ne(t){const n=N(`#profileRightColumn img[src$="/${String(t)}.png"]`)
n&&te(n)}function ee(t){const n=H("td",t)
c(`<span id="${n[0].id}">${n[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${k(n[1])}</div>`,t.parentNode)}function oe(o){o&&(!function(){const n=s("profileRightColumn")
n&&(fn=S("disableDeactivatePrompts"),t(n.lastElementChild,dn,!0))}(),function(){const t=D("#profileLeftColumn strong")
t.filter(G("Allies")).forEach(e(Qn,!0)),t.filter(G("Enemies")).forEach(e(Qn,!1))}(),vn(),function(){const t=Ot()
t&&cn(t)}(),function(){const n=N(`#profileRightColumn a[href="${P}profile&subcmd=togglesection&section_id=2"]`)
if(!n)return
const e=ht({innerHTML:"&nbsp;["}),o=ht({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
f(e,o),rt(e,"]"),f(n.parentNode,e),t(o,zn)}(),function(){const n=N(`#profileRightColumn a[href="${U}"]`)
if(!n)return
const e=ht({className:"smallLink",textContent:"All"})
t(e,On)
const o=ht({innerHTML:"[&nbsp;"})
f(o,e),u(o,"&nbsp;]&nbsp;"),f(n.parentNode,o)}(),Vn(),Ln(),t(n,It))}function ae(t,n,e){!function(t){const n=N(`#pCC a[href^="${A}"]`)
n?Jn(n):t&&L("guildSelf","")}(e)
Pn(t,X(Y("player_id"),p()),n)}function se(t,n,e){oe(e),ae(t,n,e),[Kn,Xn,Yn].forEach(ne),function(){const t=H(J,s("profileLeftColumn"))[0]
h(J,t).forEach(ee)}(),function(){if(!S("highlightPvpProtection"))return
const t=N(`#profileLeftColumn a[href="${B}"]`)
"N/A"!==x(t.parentNode.nextSibling)&&(t.parentNode.parentNode.style.cssText="border: 3px solid red")}(),E(3,Fn,[e]),kt(),E(3,ft)}function re(t){t.preventDefault()
const n=O(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${Z}?${n}`}export default function(){if(V())return
const t=N('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!t)return
const e=k(H("h1",n)[0]),o=e===at()
se(t,e,o),function(t){t||K(N("#profileRightColumn"),"submit",re)}(o)}
//# sourceMappingURL=profile-e0b0e5f8.js.map
