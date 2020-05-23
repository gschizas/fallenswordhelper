import{o as n,p as t,v as e,a_ as o,bP as a,A as s,n as i,bA as r,a0 as c,C as f,h as u,i as l,aF as p,bm as d,T as m,l as b,B as h,K as g,g as k,k as N,D as C,R as j,bQ as v,a1 as T,bR as y,ak as S,Y as B,G as x,aq as E,bS as D,bi as L,a as A,N as _,bT as M,a4 as R,b3 as q,aU as I,bU as w,bt as H,_ as P,bV as G,bW as U,bO as J,u as Q,bl as W,b as O,c as F,b6 as z,bX as V,bY as X,bZ as Y,I as K,J as Z,L as nn,H as tn,aH as en,z as on,ac as an,f as sn,aa as rn,X as cn,O as fn}from"./calfSystem-4f7c0235.js"
import{i as un}from"./isArray-3ee7803f.js"
import{n as ln}from"./numberIsNaN-c62a2787.js"
import"./roundToString-969a3a01.js"
import{r as pn,b as dn}from"./render-9f13aae7.js"
import{t as mn}from"./toLowerCase-5a0aca7f.js"
import"./createInput-6766e17a.js"
import{i as bn}from"./insertTextBeforeEnd-78227c60.js"
import"./onlineDot-e2a5d8e2.js"
import{s as hn}from"./setTipped-c9246171.js"
import"./batch-970fe719.js"
import{c as gn,a as kn}from"./compressBio-3799b5a8.js"
import"./createLabel-41462017.js"
import{c as Nn}from"./createTBody-621c6d7d.js"
import{c as $n}from"./createTable-6ffbc5ea.js"
import{c as Cn}from"./createButton-75879847.js"
import"./dialogMsg-2a7f845f.js"
import"./closest-c4802fbd.js"
import"./closestTable-3222a25a.js"
import"./insertHtmlBeforeBegin-2122cda1.js"
import{a as jn}from"./addStatTotalToMouseover-4d8497a4.js"
import"./all-b95367c1.js"
import{a as vn}from"./allthen-e8ef0afa.js"
import{c as Tn}from"./chunk-9c98fe57.js"
import{e as yn}from"./errorDialog-96f65b89.js"
import"./rnd-df44928e.js"
import{f as Sn}from"./fetchdata-1293243a.js"
import{j as Bn}from"./jConfirm-3c2065b8.js"
import"./dialog-202b3453.js"
import{e as xn,u as En}from"./useItem-df8563a7.js"
import"./ajaxReturnCode-0283a2cf.js"
import"./daUseItem-44a52813.js"
import{r as Dn}from"./replaceDoubleSpace-14ab9e32.js"
import{q as Ln}from"./quickBuffHref-6838ace2.js"
let An
const _n=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function Mn(n,t){return t(n)}function Rn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function qn(n){Rn(5===Number(a(n.href,"section_id"))?(An||(An=s("backpackContainer")),An):n.parentNode.parentNode.nextElementSibling)}function In(n){const{target:t}=n;(function(n){return _n.every(e(Mn,n))})(t)&&(qn(t),o(t.href),n.preventDefault())}function wn(){return r({subcmd:"loadcomponents"})}let Hn,Pn,Gn
function Un(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Jn(n,t){return`${n}<tr><td><img src="${p}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?`+`item_id=${t.b}&inv_id=${t.a}&t=2&p=${d()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Qn(n){const t=Nn()
return function(n){Hn=n.r.reduce(Un,{})}(n),l(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(Hn).reduce(Jn,"")}`),t}function Wn(n,t){const e=function(n){const t=n.insertRow(-1)
l(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
u(e,function(n){const t=n.r.length,e=m()
return f(t,e),e}(t)),bn(e,` / ${t.h.cm.toString()}`)}function On(n,t){if(!un(t.r))return
const e=n.parentNode
e&&(f("",e),u(e,function(n){const t=$n({className:"fshTblCenter",id:"fshTally"})
return u(t,Qn(n)),Wn(t,n),t}(t)))}function Fn(n){const t=b(),e=m({className:`sendLink ${mn(n).replace(/ /g,"-")}`,textContent:n})
return h("[",t),u(t,e),l(t,"]"),t}function zn(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Vn(){if(!Pn){const n=g("inventory-table",s("profileRightColumn"))
2===n.length&&([,Pn]=n)}return Pn}function Xn(n,t){return n[t.dataset.tipped.match(N)[2]]=t.parentNode.parentNode,n}function Yn(n,t){n[t]&&f("",n[t])}function Kn(n){n.forEach(e(Yn,function(){if(!Gn){const n=k("img",Vn())
Gn=n.reduce(Xn,{})}return Gn}()))}function Zn(n){const t=Vn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(C(a))
s-=n,h(s,a)}function nt(n){n.s&&un(n.r)&&(Kn(n.r),Zn(n.r.length))}function tt(n){n.parentNode.remove()}function et(n){return zn(n).then(nt)}function ot(n,t,e){e.s&&(!function(n){const t=j(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(C(e))-1
h(o,e)}(t),Zn(1),n.parentNode&&f("",n.parentNode))}const at=["Enable Quick Del","Count Components","Quick Extract Components"]
function st(n,t){return u(n,Fn(t)),n}function it(n){l(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rt=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(y)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
u(e,Fn("Delete All Visible")),k("img",Vn()).forEach(it)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",t).forEach(B)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(N),a=o[1]
zn([o[2]]).then(yn).then(e(ot,n,a))}],["count-components",function(n){c("components","countComponent"),wn().then(e(On,n))}],["compDelType",function(n){const t=Hn[n.dataset.compid].del,o=n.parentNode
!function(n){f("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${p}ui/misc/spinner.gif')`}(o)
const a=Tn(30,t).map(et)
vn(a,e(tt,o))}]]
function ct(t){const e=t.parentNode
u(e,at.reduce(st,b({className:"fshCenter"}))),n(e,v(rt))}let ft
function ut(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&f("",n.parentNode)}function lt(n){c("profile","doDebuff"),(n=>Sn({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(yn).then(e(ut,n))}function pt(n){ft?lt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Bn("Remove Skill",t,e(lt,n))}(n)}function dt(n){let t=n.target
if("IMG"===t.tagName)E(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),pt(t)}function mt(n,t){return t.a===n}function bt(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(mt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function ht(n,t,o,a){c("profile",`fastAction - ${a}`)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
h("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(bt,[n,a,s,i]))}function gt(n,t){t.target.classList.contains("fastWear")&&ht(n,t,xn,"Worn"),t.target.classList.contains("fastUse")&&ht(n,t,En,"Used")}function kt(n){return n?"Use":"Wear"}function Nt(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=b({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kt(e)}</span>`})
var a
n.options.checkboxesEnabled&&u(o,t.parentNode.nextElementSibling.nextElementSibling),u(t.parentNode.parentNode,o)}function $t(n){_(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nt,n))}function Ct(n,t){const e=`${p}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?Ct(t,"folder_on"):Ct(t,"folder")}function vt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){_(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),$t(o))},0!==C(s("backpack_current")).length&&A(3,$t,[o]),n(t,e(gt,o))}function Tt(){x("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&vt(n,t)}())}function yt(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let St,Bt,xt
function Et(n,t){t.s&&f("",n.parentNode)}function Dt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&yt(t).then(e(Et,n))}function Lt(){c("profile","nekidBtn")
const n=St.nextElementSibling
k("a",n).forEach(Dt)}function At(){const t=s("profileRightColumn")
St=s("profileCombatSetDiv")
const e=St.parentNode.nextElementSibling,o=function(){const t=b({className:"fshCenter"}),e=Cn({className:"fshBl fshBls",textContent:"Nekid"})
return bn(t,"[ "),u(t,e),bn(t," ]"),n(e,Lt),t}()
t.replaceChild(o,e)}const _t=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Mt=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rt(n){const t=I(n)
return t?t.map(Dn).map(mn):[]}function qt(n){return[Rt(n[0]),n[1]]}function It(n,t){return t[0].includes(n)}function wt(n){const t=Mt.map(qt),o=Dn(mn(n)),a=t.find(e(It,o))
if(a)return a[1]}function Ht(n){return Bt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),Bt&&Bt===q()?(R("guildSelf",C(n)),"self"):wt(C(n))}function Pt(n){return n[0]===xt}function Gt(n){xt=Ht(n),xt&&function(n){const t=_t.find(Pt)
n.parentNode.classList.add(t[1]),l(n.parentNode,`<br>${x(t[2])}`)}(n)}function Ut(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Ln(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!x("enableMaxGroupSizeToJoin"))return'<a class="quickButton buttonJoinAll tip-static fshJoin" '+`href="${G}" `+'data-tipped="Join All Groups"></a>&nbsp;&nbsp;'
const n=x("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${U}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+='<a class="quickButton tip-static fshGold" '+`href="${w}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${H}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===xt?`<a class="quickButton tip-static fshTempleThree" href="${J}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===xt&&x("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${Q}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${p}guilds/${Bt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",P(n,o)}function Jt(n,t){const e=t.parentNode,o=O(F,e.nextElementSibling).length-1
l(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?`/${t}`:""}(o,x(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Qt(n){return function(n){return n&&x("renderSelfBio")}(n)||function(n){return!n&&x("renderOtherBios")}(n)}function Wt(n,t){Qt(n)&&function(n){let t=n.innerHTML
t=pn(t),t&&f(t,n)}(t)}function Ot(t){const e=s("profile-bio")
e&&(Wt(t,e),x("enableBioCompressor")&&A(3,gn,[e]),n(e,dn))}function Ft(){c("profile","insertQuickWear"),T(V)}function zt(){const n=s("backpack_tabs"),t=g("tab-selected",n)[0].getAttribute("data-type")
let e=_(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=_(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(B)}function Vt(){const n=parseInt(C(s(Y)),10)
!function(n){return K(Z(g(nn)))===n}(n)?R(tn,n):R(tn,"")}const Xt=98,Yt=85,Kt=60
function Zt(n){return Number(en(s(`stat-${n.toLowerCase()}`).childNodes).filter(n=>3===n.nodeType).map(L).join(""))}function ne(n){const t=b({innerHTML:n.dataset.tipped}),e=k("b",t).map(n=>L(n)),o=Zt(e[2])
ln(o)||function(n,t,e){const o=Zt(t[3]),a=Math.floor(e*(Number(t[1].replace(/[+%]/g,""))/100))
hn(n.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${t[2]}: ${String(e-a)}&nbsp;&nbsp;${t[3]}: ${String(o+a)}$&`),n)}(n,e,o)}function te(n){const t=j(`#profileRightColumn img[src$="/${String(n)}.png"]`)
t&&ne(t)}function ee(n){const t=O("td",n)
f(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> `+`<div class="profile-stat-bonus">${C(t[1])}</div>`,n.parentNode)}function oe(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ft=x("disableDeactivatePrompts"),n(t.lastElementChild,dt,!0))}(),function(){const n=_("#profileLeftColumn strong")
n.filter(W("Allies")).forEach(e(Jt,!0)),n.filter(W("Enemies")).forEach(e(Jt,!1))}(),Tt(),function(){const n=Vn()
n&&ct(n)}(),function(){const t=j(`#profileRightColumn a[href="${z}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=m({innerHTML:"&nbsp;["}),o=m({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
u(e,o),bn(e,"]"),u(t.parentNode,e),n(o,Ft)}(),function(){const t=j(`#profileRightColumn a[href="${X}"]`)
if(!t)return
const e=m({className:"smallLink",textContent:"All"})
n(e,zt)
const o=m({innerHTML:"[&nbsp;"})
u(o,e),l(o,"&nbsp;]&nbsp;"),u(t.parentNode,o)}(),Vt(),At(),n(t,In))}function ae(n,t,e){!function(n){const t=j(`#pCC a[href^="${M}"]`)
t?Gt(t):n&&R("guildSelf","")}(e),Ut(n,rn(cn("player_id"),d()),t)}function se(n,t,e){oe(e),ae(n,t,e),[Xt,Yt,Kt].forEach(te),function(){const n=O(F,s("profileLeftColumn"))[0]
k(F,n).forEach(ee)}(),function(){if(!x("highlightPvpProtection"))return
const n=j(`#profileLeftColumn a[href="${D}"]`)
"N/A"!==L(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),A(3,Ot,[e]),jn(),A(3,kn)}function ie(n){n.preventDefault()
const t=en(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${fn}?${t}`}export default function(){if(on())return
const n=j('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=C(O("h1",t)[0]),o=e===an()
se(n,e,o),function(n){n||sn(j("#profileRightColumn"),"submit",ie)}(o)}
//# sourceMappingURL=profile-64b40422.js.map
