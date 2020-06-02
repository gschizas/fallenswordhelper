import{o as t,p as n,s as e,aP as o,bt as s,x as a,bh as r,S as i,z as c,f,i as u,aB as l,b3 as p,k as d,y as m,F as b,g as h,h as g,A as k,M as N,bu as j,T as C,bv as y,O as v,D as S,al as T,a6 as B,a8 as x,a as E,I as A,bn as D,W as L,bw as M,bd as _,bx as w,by as I,bs as R,r as q,b2 as G,b as H,d as P,a4 as J,bz as Q,bA as U,bB as W,G as F,E as z,aD as O,w as V,e as K,a0 as X,N as Y,J as Z}from"./calfSystem-02ae8657.js"
import{i as tt}from"./isArray-7fbdd896.js"
import{n as nt}from"./numberIsNaN-0b348b17.js"
import"./roundToString-50224ae1.js"
import{r as et,b as ot}from"./render-4c96861c.js"
import{p as st}from"./playerName-9873e3df.js"
import{t as at}from"./toLowerCase-f5058453.js"
import"./createInput-cbb1c2cb.js"
import{i as rt}from"./insertTextBeforeEnd-9b01785d.js"
import"./onlineDot-73a15da0.js"
import{s as it}from"./setTipped-48769a0a.js"
import"./batch-149b9740.js"
import{c as ct,a as ft}from"./compressBio-cb5a1648.js"
import"./createLabel-73beda06.js"
import{c as ut}from"./currentGuildId-a8ad9d1f.js"
import{i as lt}from"./intValue-514fe585.js"
import{v as pt}from"./valueText-cd2843d1.js"
import{c as dt}from"./createTBody-50982eee.js"
import{c as mt}from"./createTable-c905097e.js"
import{c as bt}from"./createButton-991883ef.js"
import"./dialogMsg-f195b598.js"
import{c as ht}from"./createSpan-0a306aad.js"
import{h as gt}from"./hideElement-2791bd8d.js"
import"./closest-8af29cf3.js"
import"./closestTable-704cfbde.js"
import"./insertHtmlBeforeBegin-d5084f64.js"
import{a as kt}from"./addStatTotalToMouseover-547ea750.js"
import{c as Nt}from"./closestForm-2319dd5e.js"
import"./all-5d0e9d43.js"
import{a as $t}from"./allthen-9e407c02.js"
import{c as jt}from"./chunk-4fd31518.js"
import{e as Ct}from"./errorDialog-da114958.js"
import{g as yt}from"./getArrayByClassName-d2e73c64.js"
import"./rnd-e5b94ee5.js"
import{f as vt}from"./fetchdata-11082425.js"
import{j as St}from"./jConfirm-03a5dafe.js"
import"./dialog-daafeeb1.js"
import"./indexAjaxJson-8dbd2034.js"
import{e as Tt,u as Bt}from"./useItem-4480b921.js"
import"./ajaxReturnCode-71b23dbe.js"
import"./daUseItem-3527f567.js"
import{r as xt}from"./replaceDoubleSpace-ce11bedd.js"
import"./csvSplit-3188b9df.js"
import{s as Et}from"./shouldBeArray-6beb3a25.js"
import{i as At}from"./insertHtmlAfterEnd-23545b48.js"
import{q as Dt}from"./quickBuffHref-0459cf30.js"
import{t as Lt}from"./textNodes-7ca5316b.js"
let Mt
const _t=[t=>"A"===t.tagName,t=>Boolean(t.href),t=>t.href.includes("togglesection")]
function wt(t,n){return n(t)}function It(t){t.hasAttribute("style")?function(t){"block"===t.style.display&&gt(t),t.removeAttribute("style")}(t):t.classList.toggle("fshHide")}function Rt(t){It(5===Number(s(t.href,"section_id"))?(Mt||(Mt=a("backpackContainer")),Mt):t.parentNode.parentNode.nextElementSibling)}function qt(t){const{target:n}=t;(function(t){return _t.every(e(wt,t))})(n)&&(Rt(n),o(n.href),t.preventDefault())}function Gt(){return r({subcmd:"loadcomponents"})}let Ht,Pt,Jt
function Qt(t,n){return t[n.b]=t[n.b]||{a:n.a,b:n.b,count:0,del:[],v:n.v},t[n.b].count+=1,t[n.b].del.push(n.a),t}function Ut(t,n){return`${t}<tr><td><img src="${l}items/${n.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${n.b}&inv_id=${n.a}&t=2&p=${p()}&vcode=${n.v}"></td><td>${n.count}</td><td>[<span class="sendLink compDelType" data-compid="${n.b}">Del</span>]</td></tr>`}function Wt(t){const n=dt()
return function(t){Ht=t.r.reduce(Qt,{})}(t),u(n,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Ht).reduce(Ut,"")),n}function Ft(t,n){const e=function(t){const n=t.insertRow(-1)
u(n,"<td>Total:</td>")
const e=n.insertCell(-1)
return e.colSpan=2,e}(t)
f(e,function(t){const n=t.r.length,e=ht()
return c(n,e),e}(n)),rt(e," / "+n.h.cm.toString())}function zt(t,n){if(!tt(n.r))return
const e=t.parentNode
e&&(c("",e),f(e,function(t){const n=mt({className:"fshTblCenter",id:"fshTally"})
return f(n,Wt(t)),Ft(n,t),n}(n)))}function Ot(t){const n=d(),e=ht({className:"sendLink "+at(t).replace(/ /g,"-"),textContent:t})
return m("[",n),f(n,e),u(n,"]"),n}function Vt(t){return function(t){return r({subcmd:"destroycomponent",removeIndex:t})}(t)}function Kt(){if(!Pt){const t=b("inventory-table",a("profileRightColumn"))
2===t.length&&([,Pt]=t)}return Pt}function Xt(t,n){return t[n.dataset.tipped.match(g)[2]]=n.parentNode.parentNode,t}function Yt(t,n){t[n]&&c("",t[n])}function Zt(t){t.forEach(e(Yt,function(){if(!Jt){const t=h("img",Kt())
Jt=t.reduce(Xt,{})}return Jt}()))}function tn(t){const n=Kt().parentNode
if(!n)return
const e=n.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,s=o[o.length-1].cells[1].children[0]
let a=Number(k(s))
a-=t,m(a,s)}function nn(t){t.s&&tt(t.r)&&(Zt(t.r),tn(t.r.length))}function en(t){t.parentNode.remove()}function on(t){return Vt(t).then(nn)}function sn(t,n,e){e.s&&(!function(t){const n=N(`#fshTally [data-compid="${t}"]`)
if(!n)return
const e=n.parentNode.parentNode.children[1],o=Number(k(e))-1
m(o,e)}(n),tn(1),t.parentNode&&c("",t.parentNode))}const an=["Enable Quick Del","Count Components","Quick Extract Components"]
function rn(t,n){return f(t,Ot(n)),t}function cn(t){u(t.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const fn=[["quick-extract-components",function(){i("components","insertQuickExtract"),C(y)}],["enable-quick-del",function(t){i("components","enableDelComponent")
const n=t.parentNode
gt(n)
const e=n.parentNode
f(e,Ot("Delete All Visible")),h("img",Kt()).forEach(cn)}],["delete-all-visible",function(t){i("components","delAllComponent")
const n=t.parentNode.parentNode.parentNode.children[0]
yt("compDelBtn",n).forEach(v)}],["compDelBtn",function(t){const{tipped:n}=t.parentNode.children[0].children[0].dataset,o=n.match(g),s=o[1]
Vt([o[2]]).then(Ct).then(e(sn,t,s))}],["count-components",function(t){i("components","countComponent"),Gt().then(e(zt,t))}],["compDelType",function(t){const n=Ht[t.dataset.compid].del,o=t.parentNode
!function(t){c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${l}ui/misc/spinner.gif')`}(o)
const s=jt(30,n).map(on)
$t(s,e(en,o))}]]
function un(n){const e=n.parentNode
f(e,an.reduce(rn,d({className:"fshCenter"}))),t(e,j(fn))}let ln
function pn(t,n){(t=>t&&t.response&&0===t.response.response)(n)&&c("",t.parentNode)}function dn(t){i("profile","doDebuff");(t=>vt({a:22,id:t}))(t.href.match(/(\d+)$/)[1]).then(Ct).then(e(pn,t))}function mn(t){ln?dn(t):function(t){const n=t.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
St("Remove Skill",n,e(dn,t))}(t)}function bn(t){let n=t.target
if("IMG"===n.tagName)T(t.target),n=n.parentNode
else if("A"!==n.tagName)return
t.stopPropagation(),t.preventDefault(),mn(n)}function hn(t,n){return n.a===t}function gn(t,n){0===n.r?(!function(t,n){const o=t.srcData.findIndex(e(hn,Number(n)));-1!==o&&t.srcData.splice(o,1)}(t[0],t[3]),t[2].classList.remove("fshSpinner"),c(`<span class="fastWorn">${t[1]}</span>`,t[2].parentNode)):t[2].remove()}function kn(t,n,o,s){i("profile","fastAction - "+s)
const{target:a}=n,r=a.parentNode.parentNode.children[0].dataset.inv
m("",a),a.className="fastAction fshSpinner fshSpinner12",o(r).then(e(gn,[t,s,a,r]))}function Nn(t,n){n.target.classList.contains("fastWear")&&kn(t,n,Tt,"Worn"),n.target.classList.contains("fastUse")&&kn(t,n,Bt,"Used")}function $n(t){return t?"Use":"Wear"}function jn(t,n){const e=n.classList.contains("backpackContextMenuUsable"),o=d({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${s=e,s?"fastUse":"fastWear"}">${$n(e)}</span>`})
var s
t.options.checkboxesEnabled&&f(o,n.parentNode.nextElementSibling.nextElementSibling),f(n.parentNode.parentNode,o)}function Cn(t){A(`#backpackTab_${t.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(jn,t))}function yn(t,n){const e=`${l}ui/misc/${n}.png`
t.src!==e&&(t.src=e)}function vn(t,n){n.dataset.folder===t?yn(n,"folder_on"):yn(n,"folder")}function Sn(n,o){const s=o._showPage
o._showPage=function(t,n){o.tabData&&(!function(t){A(".backpackFolderImage").forEach(e(vn,String(t.folderId)))}(o),s.call(o,t,n),Cn(o))},0!==k(a("backpack_current")).length&&E(3,Cn,[o]),t(n,e(Nn,o))}function Tn(){S("enableQuickDrink")&&(function(){const t=a("backpack")
t.className="fshBackpack",t.removeAttribute("style")}(),function(){const t=a("backpackContainer"),n=$(t).data("hcsBackpack")
n&&Sn(t,n)}())}function Bn(t){return function(t){return r({subcmd:"unequipitem",inventory_id:t})}(t)}let xn,En,An
function Dn(t,n){n.s&&c("",t.parentNode)}function Ln(t){const n=/inventory_id=(\d+)/.exec(t.href)[1]
n&&Bn(n).then(e(Dn,t))}function Mn(){i("profile","nekidBtn")
const t=xn.nextElementSibling
h("a",t).forEach(Ln)}function _n(){const n=a("profileRightColumn")
xn=a("profileCombatSetDiv")
const e=xn.parentNode.nextElementSibling,o=function(){const n=d({className:"fshCenter"}),e=bt({className:"fshBl fshBls",textContent:"Nekid"})
return rt(n,"[ "),f(n,e),rt(n," ]"),t(e,Mn),n}()
n.replaceChild(o,e)}const wn=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],In=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rn(t){const n=Et(t)
return n?n.map(xt).map(at):[]}function qn(t){return[Rn(t[0]),t[1]]}function Gn(t,n){return n[0].includes(t)}function Hn(t){const n=In.map(qn),o=xt(at(t)),s=n.find(e(Gn,o))
if(s)return s[1]}function Pn(t){return En=function(t){const n=/guild_id=([0-9]+)/i.exec(t.href)
if(n)return Number(n[1])}(t),En&&En===ut()?(L("guildSelf",k(t)),"self"):Hn(k(t))}function Jn(t){return t[0]===An}function Qn(t){An=Pn(t),An&&function(t){const n=wn.find(Jn)
t.parentNode.classList.add(n[1]),u(t.parentNode,"<br>"+S(n[2]))}(t)}function Un(t,n,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Dt(n)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!S("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${w}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const t=S("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${I}" data-tipped="Join All Groups < ${t} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${M}&type=-3&tid=${n}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${_}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(t){return"self"===An?`<a class="quickButton tip-static fshTempleThree" href="${R}${t}" data-tipped="Recall items from ${t}"></a>&nbsp;&nbsp;`:""}(e),o+=function(t,n){return"self"===An&&S("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${q}members&subcmd2=changerank&member_id=${t}" data-tipped="Rank ${n}" style="background-image: url('${l}guilds/${En}_mini.png');"></a>&nbsp;&nbsp;`:""}(n,e),o+="</div>",At(t,o)}function Wn(t,n){const e=n.parentNode,o=H(P,e.nextElementSibling).length-1
u(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(t,n){return n&&n>=t?"/"+n:""}(o,S(function(t){return t?"alliestotal":"enemiestotal"}(t)))}</span>`)}function Fn(t){return function(t){return t&&S("renderSelfBio")}(t)||function(t){return!t&&S("renderOtherBios")}(t)}function zn(t,n){Fn(t)&&function(t){let n=t.innerHTML
n=et(n),n&&c(n,t)}(n)}function On(n){const e=a("profile-bio")
e&&(zn(n,e),S("enableBioCompressor")&&E(3,ct,[e]),t(e,ot))}function Vn(){i("profile","insertQuickWear"),C(Q)}function Kn(){const t=a("backpack_tabs"),n=b("tab-selected",t)[0].getAttribute("data-type")
let e=A(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=A(`#backpackTab_${n} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(v)}function Xn(){const t=parseInt(k(a(W)),10)
!function(t){return lt(pt(b(F)))===t}(t)?L(z,t):L(z,"")}const Yn=98,Zn=85,te=60
function ne(t){return Number(O(a("stat-"+t.toLowerCase()).childNodes).filter(Lt).map(x).join(""))}function ee(t){const n=d({innerHTML:t.dataset.tipped}),e=h("b",n).map(t=>x(t)),o=ne(e[2])
nt(o)||function(t,n,e){const o=ne(n[3]),s=Math.floor(e*(Number(n[1].replace(/[+%]/g,""))/100))
it(t.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(s)}<br>${n[2]}: ${String(e-s)}&nbsp;&nbsp;${n[3]}: ${String(o+s)}$&`),t)}(t,e,o)}function oe(t){const n=N(`#profileRightColumn img[src$="/${String(t)}.png"]`)
n&&ee(n)}function se(t){const n=H("td",t)
c(`<span id="${n[0].id}">${n[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${k(n[1])}</div>`,t.parentNode)}function ae(o){o&&(!function(){const n=a("profileRightColumn")
n&&(ln=S("disableDeactivatePrompts"),t(n.lastElementChild,bn,!0))}(),function(){const t=A("#profileLeftColumn strong")
t.filter(G("Allies")).forEach(e(Wn,!0)),t.filter(G("Enemies")).forEach(e(Wn,!1))}(),Tn(),function(){const t=Kt()
t&&un(t)}(),function(){const n=N(`#profileRightColumn a[href="${J}profile&subcmd=togglesection&section_id=2"]`)
if(!n)return
const e=ht({innerHTML:"&nbsp;["}),o=ht({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
f(e,o),rt(e,"]"),f(n.parentNode,e),t(o,Vn)}(),function(){const n=N(`#profileRightColumn a[href="${U}"]`)
if(!n)return
const e=ht({className:"smallLink",textContent:"All"})
t(e,Kn)
const o=ht({innerHTML:"[&nbsp;"})
f(o,e),u(o,"&nbsp;]&nbsp;"),f(n.parentNode,o)}(),Xn(),_n(),t(n,qt))}function re(t,n,e){!function(t){const n=N(`#pCC a[href^="${D}"]`)
n?Qn(n):t&&L("guildSelf","")}(e)
Un(t,X(Y("player_id"),p()),n)}function ie(t,n,e){ae(e),re(t,n,e),[Yn,Zn,te].forEach(oe),function(){const t=H(P,a("profileLeftColumn"))[0]
h(P,t).forEach(se)}(),function(){if(!S("highlightPvpProtection"))return
const t=N(`#profileLeftColumn a[href="${B}"]`)
"N/A"!==x(t.parentNode.nextSibling)&&(t.parentNode.parentNode.style.cssText="border: 3px solid red")}(),E(3,On,[e]),kt(),E(3,ft)}function ce(t){t.preventDefault()
const n=O(Nt(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${Z}?${n}`}export default function(){if(V())return
const t=N('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!t)return
const e=k(H("h1",n)[0]),o=e===st()
ie(t,e,o),function(t){t||K(N("#profileRightColumn"),"submit",ce)}(o)}
//# sourceMappingURL=profile-7a37d3fd.js.map
