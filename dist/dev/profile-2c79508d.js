import{o as n,p as t,v as e,a$ as o,bZ as a,A as s,n as i,bl as r,a1 as c,R as f,C as u,h as l,i as p,aI as d,bt as m,U as b,l as h,B as g,K as k,g as N,k as C,D as j,S as v,b_ as y,a2 as T,b$ as S,al as B,Z as x,G as E,at as L,c0 as D,b7 as A,a as _,N as M,bK as R,a5 as I,b4 as q,aW as w,c1 as H,bA as G,$ as P,c2 as J,c3 as U,bY as Q,u as W,b6 as O,b as z,c as F,ba as K,c4 as Y,c5 as Z,c6 as V,I as X,J as nn,L as tn,H as en,aK as on,z as an,ad as sn,f as rn,ab as cn,Y as fn,O as un}from"./calfSystem-8dc0fa4b.js"
import{n as ln}from"./numberIsNaN-73f607dc.js"
import"./round-98f16be7.js"
import"./roundToString-f0f1b4b6.js"
import{r as pn,b as dn}from"./render-3be34d6f.js"
import{t as mn}from"./toLowerCase-26121da0.js"
import"./createInput-29f46dac.js"
import{i as bn}from"./insertTextBeforeEnd-6e2a79ca.js"
import"./onlineDot-1912add8.js"
import{s as hn}from"./setTipped-e2c23c98.js"
import"./batch-5f01c08c.js"
import{c as gn,a as kn}from"./compressBio-6b3e10d2.js"
import"./createLabel-fd3e7486.js"
import{c as $n}from"./createTBody-1d0f01f5.js"
import{c as Nn}from"./createTable-5d1d98c3.js"
import{c as Cn}from"./createButton-0d666b00.js"
import"./dialogMsg-7427fbc4.js"
import"./closest-9cd85ce4.js"
import"./closestTable-432fe19a.js"
import"./insertHtmlBeforeBegin-3f5cdd49.js"
import{a as jn}from"./addStatTotalToMouseover-ba438fda.js"
import"./all-905003de.js"
import{a as vn}from"./allthen-88a2d4fe.js"
import{c as yn}from"./chunk-a5b00e9c.js"
import{e as Tn,a as Sn,u as Bn}from"./useItem-38fc1d00.js"
import"./rnd-e3066900.js"
import{f as xn}from"./fetchdata-bfcd331e.js"
import{j as En}from"./jConfirm-bea89dc0.js"
import"./dialog-f4d2194e.js"
import"./ajaxReturnCode-c433c790.js"
import"./daUseItem-b72fd30b.js"
import{r as Ln}from"./replaceDoubleSpace-5263748c.js"
import{q as Dn}from"./quickBuffHref-c30ff433.js"
let An
const _n=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function Mn(n,t){return t(n)}function Rn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function In(n){Rn(5===Number(a(n.href,"section_id"))?(An||(An=s("backpackContainer")),An):n.parentNode.parentNode.nextElementSibling)}function qn(n){const{target:t}=n;(function(n){return _n.every(e(Mn,n))})(t)&&(In(t),o(t.href),n.preventDefault())}function wn(){return r({subcmd:"loadcomponents"})}let Hn,Gn,Pn
function Jn(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Un(n,t){return`${n}<tr><td><img src="${d}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?`+`item_id=${t.b}&inv_id=${t.a}&t=2&p=${m()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Qn(n){const t=$n()
return function(n){Hn=n.r.reduce(Jn,{})}(n),p(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(Hn).reduce(Un,"")}`),t}function Wn(n,t){const e=function(n){const t=n.insertRow(-1)
p(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
l(e,function(n){const t=n.r.length,e=b()
return u(t,e),e}(t)),bn(e,` / ${t.h.cm.toString()}`)}function On(n,t){if(!f(t.r))return
const e=n.parentNode
e&&(u("",e),l(e,function(n){const t=Nn({className:"fshTblCenter",id:"fshTally"})
return l(t,Qn(n)),Wn(t,n),t}(t)))}function zn(n){const t=h(),e=b({className:`sendLink ${mn(n).replace(/ /g,"-")}`,textContent:n})
return g("[",t),l(t,e),p(t,"]"),t}function Fn(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Kn(){if(!Gn){const n=k("inventory-table",s("profileRightColumn"))
2===n.length&&([,Gn]=n)}return Gn}function Yn(n,t){return n[t.dataset.tipped.match(C)[2]]=t.parentNode.parentNode,n}function Zn(n,t){n[t]&&u("",n[t])}function Vn(n){n.forEach(e(Zn,function(){if(!Pn){const n=N("img",Kn())
Pn=n.reduce(Yn,{})}return Pn}()))}function Xn(n){const t=Kn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(j(a))
s-=n,g(s,a)}function nt(n){n.s&&f(n.r)&&(Vn(n.r),Xn(n.r.length))}function tt(n){n.parentNode.remove()}function et(n){return Fn(n).then(nt)}function ot(n,t,e){e.s&&(!function(n){const t=v(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(j(e))-1
g(o,e)}(t),Xn(1),n.parentNode&&u("",n.parentNode))}const at=["Enable Quick Del","Count Components","Quick Extract Components"]
function st(n,t){return l(n,zn(t)),n}function it(n){p(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rt=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(S)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
l(e,zn("Delete All Visible")),N("img",Kn()).forEach(it)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
B("compDelBtn",t).forEach(x)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(C),a=o[1]
Fn([o[2]]).then(Tn).then(e(ot,n,a))}],["count-components",function(n){c("components","countComponent"),wn().then(e(On,n))}],["compDelType",function(n){const t=Hn[n.dataset.compid].del,o=n.parentNode
!function(n){u("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${d}ui/misc/spinner.gif')`}(o)
const a=yn(30,t).map(et)
vn(a,e(tt,o))}]]
function ct(t){const e=t.parentNode
l(e,at.reduce(st,h({className:"fshCenter"}))),n(e,y(rt))}let ft
function ut(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&u("",n.parentNode)}function lt(n){c("profile","doDebuff"),(n=>xn({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(Tn).then(e(ut,n))}function pt(n){ft?lt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
En("Remove Skill",t,e(lt,n))}(n)}function dt(n){let t=n.target
if("IMG"===t.tagName)L(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),pt(t)}function mt(n,t){return t.a===n}function bt(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(mt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),u(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function ht(n,t,o,a){c("profile",`fastAction - ${a}`)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
g("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(bt,[n,a,s,i]))}function gt(n,t){t.target.classList.contains("fastWear")&&ht(n,t,Sn,"Worn"),t.target.classList.contains("fastUse")&&ht(n,t,Bn,"Used")}function kt(n){return n?"Use":"Wear"}function $t(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=h({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kt(e)}</span>`})
var a
n.options.checkboxesEnabled&&l(o,t.parentNode.nextElementSibling.nextElementSibling),l(t.parentNode.parentNode,o)}function Nt(n){M(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e($t,n))}function Ct(n,t){const e=`${d}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?Ct(t,"folder_on"):Ct(t,"folder")}function vt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){M(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),Nt(o))},0!==j(s("backpack_current")).length&&_(3,Nt,[o]),n(t,e(gt,o))}function yt(){E("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&vt(n,t)}())}function Tt(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let St,Bt,xt
function Et(n,t){t.s&&u("",n.parentNode)}function Lt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&Tt(t).then(e(Et,n))}function Dt(){c("profile","nekidBtn")
const n=St.nextElementSibling
N("a",n).forEach(Lt)}function At(){const t=s("profileRightColumn")
St=s("profileCombatSetDiv")
const e=St.parentNode.nextElementSibling,o=function(){const t=h({className:"fshCenter"}),e=Cn({className:"fshBl fshBls",textContent:"Nekid"})
return bn(t,"[ "),l(t,e),bn(t," ]"),n(e,Dt),t}()
t.replaceChild(o,e)}const _t=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Mt=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rt(n){const t=w(n)
return t?t.map(Ln).map(mn):[]}function It(n){return[Rt(n[0]),n[1]]}function qt(n,t){return t[0].includes(n)}function wt(n){const t=Mt.map(It),o=Ln(mn(n)),a=t.find(e(qt,o))
if(a)return a[1]}function Ht(n){return Bt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),Bt&&Bt===q()?(I("guildSelf",j(n)),"self"):wt(j(n))}function Gt(n){return n[0]===xt}function Pt(n){xt=Ht(n),xt&&function(n){const t=_t.find(Gt)
n.parentNode.classList.add(t[1]),p(n.parentNode,`<br>${E(t[2])}`)}(n)}function Jt(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Dn(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!E("enableMaxGroupSizeToJoin"))return'<a class="quickButton buttonJoinAll tip-static fshJoin" '+`href="${J}" `+'data-tipped="Join All Groups"></a>&nbsp;&nbsp;'
const n=E("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${U}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+='<a class="quickButton tip-static fshGold" '+`href="${H}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${G}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===xt?`<a class="quickButton tip-static fshTempleThree" href="${Q}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===xt&&E("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${W}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${d}guilds/${Bt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",P(n,o)}function Ut(n,t){const e=t.parentNode,o=z(F,e.nextElementSibling).length-1
p(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?`/${t}`:""}(o,E(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Qt(n){return function(n){return n&&E("renderSelfBio")}(n)||function(n){return!n&&E("renderOtherBios")}(n)}function Wt(n,t){Qt(n)&&function(n){let t=n.innerHTML
t=pn(t),t&&u(t,n)}(t)}function Ot(t){const e=s("profile-bio")
e&&(Wt(t,e),E("enableBioCompressor")&&_(3,gn,[e]),n(e,dn))}function zt(){c("profile","insertQuickWear"),T(Y)}function Ft(){const n=s("backpack_tabs"),t=k("tab-selected",n)[0].getAttribute("data-type")
let e=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(x)}function Kt(){const n=parseInt(j(s(V)),10)
!function(n){return X(nn(k(tn)))===n}(n)?I(en,n):I(en,"")}const Yt=98,Zt=85,Vt=60
function Xt(n){return Number(on(s(`stat-${n.toLowerCase()}`).childNodes).filter(n=>3===n.nodeType).map(A).join(""))}function ne(n){const t=h({innerHTML:n.dataset.tipped}),e=N("b",t).map(n=>A(n)),o=Xt(e[2])
ln(o)||function(n,t,e){const o=Xt(t[3]),a=Math.floor(e*(Number(t[1].replace(/[+%]/g,""))/100))
hn(n.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${t[2]}: ${String(e-a)}&nbsp;&nbsp;${t[3]}: ${String(o+a)}$&`),n)}(n,e,o)}function te(n){const t=v(`#profileRightColumn img[src$="/${String(n)}.png"]`)
t&&ne(t)}function ee(n){const t=z("td",n)
u(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> `+`<div class="profile-stat-bonus">${j(t[1])}</div>`,n.parentNode)}function oe(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ft=E("disableDeactivatePrompts"),n(t.lastElementChild,dt,!0))}(),function(){const n=M("#profileLeftColumn strong")
n.filter(O("Allies")).forEach(e(Ut,!0)),n.filter(O("Enemies")).forEach(e(Ut,!1))}(),yt(),function(){const n=Kn()
n&&ct(n)}(),function(){const t=v(`#profileRightColumn a[href="${K}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=b({innerHTML:"&nbsp;["}),o=b({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
l(e,o),bn(e,"]"),l(t.parentNode,e),n(o,zt)}(),function(){const t=v(`#profileRightColumn a[href="${Z}"]`)
if(!t)return
const e=b({className:"smallLink",textContent:"All"})
n(e,Ft)
const o=b({innerHTML:"[&nbsp;"})
l(o,e),p(o,"&nbsp;]&nbsp;"),l(t.parentNode,o)}(),Kt(),At(),n(t,qn))}function ae(n,t,e){!function(n){const t=v(`#pCC a[href^="${R}"]`)
t?Pt(t):n&&I("guildSelf","")}(e),Jt(n,cn(fn("player_id"),m()),t)}function se(n,t,e){oe(e),ae(n,t,e),[Yt,Zt,Vt].forEach(te),function(){const n=z(F,s("profileLeftColumn"))[0]
N(F,n).forEach(ee)}(),function(){if(!E("highlightPvpProtection"))return
const n=v(`#profileLeftColumn a[href="${D}"]`)
"N/A"!==A(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),_(3,Ot,[e]),jn(),_(3,kn)}function ie(n){n.preventDefault()
const t=on(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${un}?${t}`}export default function(){if(an())return
const n=v('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=j(z("h1",t)[0]),o=e===sn()
se(n,e,o),function(n){n||rn(v("#profileRightColumn"),"submit",ie)}(o)}
//# sourceMappingURL=profile-2c79508d.js.map
