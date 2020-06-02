import{o as t,p as n,s as e,aP as o,bo as a,x as s,bf as r,S as i,z as c,f,i as u,aB as l,b1 as p,k as d,y as m,F as b,g as h,h as g,A as N,M as k,bp as j,T as C,bq as y,O as v,D as T,al as S,a6 as B,a8 as x,a as E,I as D,br as A,W as L,bs as M,bb as _,bt as q,bu as w,bn as I,r as R,b0 as G,b as H,d as P,a4 as J,bv as Q,bw as U,bx as W,G as F,E as O,aD as z,w as V,e as X,a0 as K,N as Y,J as Z}from"./calfSystem-dec5e071.js"
import{i as tt}from"./isArray-5ae0f2ae.js"
import{n as nt}from"./numberIsNaN-ea515379.js"
import"./roundToString-930fd653.js"
import{r as et,b as ot}from"./render-56f86abb.js"
import{p as at}from"./playerName-aa4fbcf3.js"
import{t as st}from"./toLowerCase-1ea9a651.js"
import"./createInput-6f4c3b04.js"
import{i as rt}from"./insertTextBeforeEnd-5dae39f0.js"
import"./onlineDot-093223e2.js"
import{s as it}from"./setTipped-80e36195.js"
import"./batch-6962fbd8.js"
import{c as ct,a as ft}from"./compressBio-ba4303f6.js"
import"./createLabel-2805259f.js"
import{c as ut}from"./currentGuildId-694bbc76.js"
import{i as lt}from"./intValue-8ad0a3ce.js"
import{v as pt}from"./valueText-67a7e51e.js"
import{c as dt}from"./createTBody-0a1e0d4a.js"
import{c as mt}from"./createTable-e5b9da81.js"
import{c as bt}from"./createButton-2bca06f8.js"
import"./dialogMsg-1ae9be91.js"
import{c as ht}from"./createSpan-660731dc.js"
import{h as gt}from"./hideElement-3fc45118.js"
import"./closest-d88a3ae2.js"
import"./closestTable-290574cb.js"
import"./insertHtmlBeforeBegin-4f6b924a.js"
import{a as Nt}from"./addStatTotalToMouseover-4b9f6553.js"
import{c as kt}from"./closestForm-b48fc8bc.js"
import"./all-74575e32.js"
import{a as $t}from"./allthen-38e3a607.js"
import{c as jt}from"./chunk-c2bce3da.js"
import{e as Ct}from"./errorDialog-5d76ff73.js"
import{g as yt}from"./getArrayByClassName-82011e34.js"
import"./rnd-d817a7e0.js"
import{f as vt}from"./fetchdata-cdebd0fd.js"
import{j as Tt}from"./jConfirm-68e5f0c8.js"
import"./dialog-b7388abb.js"
import"./indexAjaxJson-ecf8d1f5.js"
import{e as St,u as Bt}from"./useItem-fcbdc3fc.js"
import"./ajaxReturnCode-361085b2.js"
import"./daUseItem-a1c5450c.js"
import{r as xt}from"./replaceDoubleSpace-3a00c52a.js"
import"./csvSplit-655e7fa5.js"
import{s as Et}from"./shouldBeArray-1a63d3cb.js"
import{i as Dt}from"./insertHtmlAfterEnd-52e450d3.js"
import{q as At}from"./quickBuffHref-2b8d222d.js"
let Lt
const Mt=[t=>"A"===t.tagName,t=>Boolean(t.href),t=>t.href.includes("togglesection")]
function _t(t,n){return n(t)}function qt(t){t.hasAttribute("style")?function(t){"block"===t.style.display&&gt(t),t.removeAttribute("style")}(t):t.classList.toggle("fshHide")}function wt(t){qt(5===Number(a(t.href,"section_id"))?(Lt||(Lt=s("backpackContainer")),Lt):t.parentNode.parentNode.nextElementSibling)}function It(t){const{target:n}=t;(function(t){return Mt.every(e(_t,t))})(n)&&(wt(n),o(n.href),t.preventDefault())}function Rt(){return r({subcmd:"loadcomponents"})}let Gt,Ht,Pt
function Jt(t,n){return t[n.b]=t[n.b]||{a:n.a,b:n.b,count:0,del:[],v:n.v},t[n.b].count+=1,t[n.b].del.push(n.a),t}function Qt(t,n){return`${t}<tr><td><img src="${l}items/${n.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${n.b}&inv_id=${n.a}&t=2&p=${p()}&vcode=${n.v}"></td><td>${n.count}</td><td>[<span class="sendLink compDelType" data-compid="${n.b}">Del</span>]</td></tr>`}function Ut(t){const n=dt()
return function(t){Gt=t.r.reduce(Jt,{})}(t),u(n,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Gt).reduce(Qt,"")),n}function Wt(t,n){const e=function(t){const n=t.insertRow(-1)
u(n,"<td>Total:</td>")
const e=n.insertCell(-1)
return e.colSpan=2,e}(t)
f(e,function(t){const n=t.r.length,e=ht()
return c(n,e),e}(n)),rt(e," / "+n.h.cm.toString())}function Ft(t,n){if(!tt(n.r))return
const e=t.parentNode
e&&(c("",e),f(e,function(t){const n=mt({className:"fshTblCenter",id:"fshTally"})
return f(n,Ut(t)),Wt(n,t),n}(n)))}function Ot(t){const n=d(),e=ht({className:"sendLink "+st(t).replace(/ /g,"-"),textContent:t})
return m("[",n),f(n,e),u(n,"]"),n}function zt(t){return function(t){return r({subcmd:"destroycomponent",removeIndex:t})}(t)}function Vt(){if(!Ht){const t=b("inventory-table",s("profileRightColumn"))
2===t.length&&([,Ht]=t)}return Ht}function Xt(t,n){return t[n.dataset.tipped.match(g)[2]]=n.parentNode.parentNode,t}function Kt(t,n){t[n]&&c("",t[n])}function Yt(t){t.forEach(e(Kt,function(){if(!Pt){const t=h("img",Vt())
Pt=t.reduce(Xt,{})}return Pt}()))}function Zt(t){const n=Vt().parentNode
if(!n)return
const e=n.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(N(a))
s-=t,m(s,a)}function tn(t){t.s&&tt(t.r)&&(Yt(t.r),Zt(t.r.length))}function nn(t){t.parentNode.remove()}function en(t){return zt(t).then(tn)}function on(t,n,e){e.s&&(!function(t){const n=k(`#fshTally [data-compid="${t}"]`)
if(!n)return
const e=n.parentNode.parentNode.children[1],o=Number(N(e))-1
m(o,e)}(n),Zt(1),t.parentNode&&c("",t.parentNode))}const an=["Enable Quick Del","Count Components","Quick Extract Components"]
function sn(t,n){return f(t,Ot(n)),t}function rn(t){u(t.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const cn=[["quick-extract-components",function(){i("components","insertQuickExtract"),C(y)}],["enable-quick-del",function(t){i("components","enableDelComponent")
const n=t.parentNode
gt(n)
const e=n.parentNode
f(e,Ot("Delete All Visible")),h("img",Vt()).forEach(rn)}],["delete-all-visible",function(t){i("components","delAllComponent")
const n=t.parentNode.parentNode.parentNode.children[0]
yt("compDelBtn",n).forEach(v)}],["compDelBtn",function(t){const{tipped:n}=t.parentNode.children[0].children[0].dataset,o=n.match(g),a=o[1]
zt([o[2]]).then(Ct).then(e(on,t,a))}],["count-components",function(t){i("components","countComponent"),Rt().then(e(Ft,t))}],["compDelType",function(t){const n=Gt[t.dataset.compid].del,o=t.parentNode
!function(t){c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${l}ui/misc/spinner.gif')`}(o)
const a=jt(30,n).map(en)
$t(a,e(nn,o))}]]
function fn(n){const e=n.parentNode
f(e,an.reduce(sn,d({className:"fshCenter"}))),t(e,j(cn))}let un
function ln(t,n){(t=>t&&t.response&&0===t.response.response)(n)&&c("",t.parentNode)}function pn(t){i("profile","doDebuff");(t=>vt({a:22,id:t}))(t.href.match(/(\d+)$/)[1]).then(Ct).then(e(ln,t))}function dn(t){un?pn(t):function(t){const n=t.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Tt("Remove Skill",n,e(pn,t))}(t)}function mn(t){let n=t.target
if("IMG"===n.tagName)S(t.target),n=n.parentNode
else if("A"!==n.tagName)return
t.stopPropagation(),t.preventDefault(),dn(n)}function bn(t,n){return n.a===t}function hn(t,n){0===n.r?(!function(t,n){const o=t.srcData.findIndex(e(bn,Number(n)));-1!==o&&t.srcData.splice(o,1)}(t[0],t[3]),t[2].classList.remove("fshSpinner"),c(`<span class="fastWorn">${t[1]}</span>`,t[2].parentNode)):t[2].remove()}function gn(t,n,o,a){i("profile","fastAction - "+a)
const{target:s}=n,r=s.parentNode.parentNode.children[0].dataset.inv
m("",s),s.className="fastAction fshSpinner fshSpinner12",o(r).then(e(hn,[t,a,s,r]))}function Nn(t,n){n.target.classList.contains("fastWear")&&gn(t,n,St,"Worn"),n.target.classList.contains("fastUse")&&gn(t,n,Bt,"Used")}function kn(t){return t?"Use":"Wear"}function $n(t,n){const e=n.classList.contains("backpackContextMenuUsable"),o=d({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kn(e)}</span>`})
var a
t.options.checkboxesEnabled&&f(o,n.parentNode.nextElementSibling.nextElementSibling),f(n.parentNode.parentNode,o)}function jn(t){D(`#backpackTab_${t.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e($n,t))}function Cn(t,n){const e=`${l}ui/misc/${n}.png`
t.src!==e&&(t.src=e)}function yn(t,n){n.dataset.folder===t?Cn(n,"folder_on"):Cn(n,"folder")}function vn(n,o){const a=o._showPage
o._showPage=function(t,n){o.tabData&&(!function(t){D(".backpackFolderImage").forEach(e(yn,String(t.folderId)))}(o),a.call(o,t,n),jn(o))},0!==N(s("backpack_current")).length&&E(3,jn,[o]),t(n,e(Nn,o))}function Tn(){T("enableQuickDrink")&&(function(){const t=s("backpack")
t.className="fshBackpack",t.removeAttribute("style")}(),function(){const t=s("backpackContainer"),n=$(t).data("hcsBackpack")
n&&vn(t,n)}())}function Sn(t){return function(t){return r({subcmd:"unequipitem",inventory_id:t})}(t)}let Bn,xn,En
function Dn(t,n){n.s&&c("",t.parentNode)}function An(t){const n=/inventory_id=(\d+)/.exec(t.href)[1]
n&&Sn(n).then(e(Dn,t))}function Ln(){i("profile","nekidBtn")
const t=Bn.nextElementSibling
h("a",t).forEach(An)}function Mn(){const n=s("profileRightColumn")
Bn=s("profileCombatSetDiv")
const e=Bn.parentNode.nextElementSibling,o=function(){const n=d({className:"fshCenter"}),e=bt({className:"fshBl fshBls",textContent:"Nekid"})
return rt(n,"[ "),f(n,e),rt(n," ]"),t(e,Ln),n}()
n.replaceChild(o,e)}const _n=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],qn=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function wn(t){const n=Et(t)
return n?n.map(xt).map(st):[]}function In(t){return[wn(t[0]),t[1]]}function Rn(t,n){return n[0].includes(t)}function Gn(t){const n=qn.map(In),o=xt(st(t)),a=n.find(e(Rn,o))
if(a)return a[1]}function Hn(t){return xn=function(t){const n=/guild_id=([0-9]+)/i.exec(t.href)
if(n)return Number(n[1])}(t),xn&&xn===ut()?(L("guildSelf",N(t)),"self"):Gn(N(t))}function Pn(t){return t[0]===En}function Jn(t){En=Hn(t),En&&function(t){const n=_n.find(Pn)
t.parentNode.classList.add(n[1]),u(t.parentNode,"<br>"+T(n[2]))}(t)}function Qn(t,n,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${At(n)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!T("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${q}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const t=T("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${w}" data-tipped="Join All Groups < ${t} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${M}&type=-3&tid=${n}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${_}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(t){return"self"===En?`<a class="quickButton tip-static fshTempleThree" href="${I}${t}" data-tipped="Recall items from ${t}"></a>&nbsp;&nbsp;`:""}(e),o+=function(t,n){return"self"===En&&T("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${R}members&subcmd2=changerank&member_id=${t}" data-tipped="Rank ${n}" style="background-image: url('${l}guilds/${xn}_mini.png');"></a>&nbsp;&nbsp;`:""}(n,e),o+="</div>",Dt(t,o)}function Un(t,n){const e=n.parentNode,o=H(P,e.nextElementSibling).length-1
u(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(o,T(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function Wn(t){return function(t){return t&&T("renderSelfBio")}(t)||function(t){return!t&&T("renderOtherBios")}(t)}function Fn(t,n){Wn(t)&&function(t){let n=t.innerHTML
n=et(n),n&&c(n,t)}(n)}function On(n){const e=s("profile-bio")
e&&(Fn(n,e),T("enableBioCompressor")&&E(3,ct,[e]),t(e,ot))}function zn(){i("profile","insertQuickWear"),C(Q)}function Vn(){const t=s("backpack_tabs"),n=b("tab-selected",t)[0].getAttribute("data-type")
let e=D(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=D(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(v)}function Xn(){const t=parseInt(N(s(W)),10)
!function(t){return lt(pt(b(F)))===t}(t)?L(O,t):L(O,"")}function Kn(t){if(t instanceof Node)return t.nodeType===Node.TEXT_NODE}const Yn=98,Zn=85,te=60
function ne(t){return Number(z(s("stat-"+t.toLowerCase()).childNodes).filter(Kn).map(x).join(""))}function ee(t){const n=d({innerHTML:t.dataset.tipped}),e=h("b",n).map(t=>x(t)),o=ne(e[2])
nt(o)||function(t,n,e){const o=ne(n[3]),a=Math.floor(e*(Number(n[1].replace(/[+%]/g,""))/100))
it(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${n[2]}: ${String(e-a)}&nbsp;&nbsp;${n[3]}: ${String(o+a)}$&`),t)}(t,e,o)}function oe(t){const n=k(`#profileRightColumn img[src$="/${String(t)}.png"]`)
n&&ee(n)}function ae(t){const n=H("td",t)
c(`<span id="${n[0].id}">${n[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${N(n[1])}</div>`,t.parentNode)}function se(o){o&&(!function(){const n=s("profileRightColumn")
n&&(un=T("disableDeactivatePrompts"),t(n.lastElementChild,mn,!0))}(),function(){const t=D("#profileLeftColumn strong")
t.filter(G("Allies")).forEach(e(Un,!0)),t.filter(G("Enemies")).forEach(e(Un,!1))}(),Tn(),function(){const t=Vt()
t&&fn(t)}(),function(){const n=k(`#profileRightColumn a[href="${J}profile&subcmd=togglesection&section_id=2"]`)
if(!n)return
const e=ht({innerHTML:"&nbsp;["}),o=ht({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
f(e,o),rt(e,"]"),f(n.parentNode,e),t(o,zn)}(),function(){const n=k(`#profileRightColumn a[href="${U}"]`)
if(!n)return
const e=ht({className:"smallLink",textContent:"All"})
t(e,Vn)
const o=ht({innerHTML:"[&nbsp;"})
f(o,e),u(o,"&nbsp;]&nbsp;"),f(n.parentNode,o)}(),Xn(),Mn(),t(n,It))}function re(t,n,e){!function(t){const n=k(`#pCC a[href^="${A}"]`)
n?Jn(n):t&&L("guildSelf","")}(e)
Qn(t,K(Y("player_id"),p()),n)}function ie(t,n,e){se(e),re(t,n,e),[Yn,Zn,te].forEach(oe),function(){const t=H(P,s("profileLeftColumn"))[0]
h(P,t).forEach(ae)}(),function(){if(!T("highlightPvpProtection"))return
const t=k(`#profileLeftColumn a[href="${B}"]`)
"N/A"!==x(t.parentNode.nextSibling)&&(t.parentNode.parentNode.style.cssText="border: 3px solid red")}(),E(3,On,[e]),Nt(),E(3,ft)}function ce(t){t.preventDefault()
const n=z(kt(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${Z}?${n}`}export default function(){if(V())return
const t=k('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!t)return
const e=N(H("h1",n)[0]),o=e===at()
ie(t,e,o),function(t){t||X(k("#profileRightColumn"),"submit",ce)}(o)}
//# sourceMappingURL=profile-4e9b880f.js.map
