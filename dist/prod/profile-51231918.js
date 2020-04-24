import{o as n,p as t,v as e,a_ as o,bP as a,A as s,n as i,bA as r,a0 as c,C as f,h as u,i as l,aF as p,bm as d,T as m,l as b,B as h,K as g,g as k,k as N,D as C,R as v,bQ as j,a1 as y,bR as T,ak as S,Y as B,G as x,aq as E,bS as D,bi as A,a as L,N as _,bT as M,a4 as R,b3 as q,aU as I,bU as w,bt as H,_ as P,bV as G,bW as U,bO as J,u as Q,bl as W,b as O,c as F,b6 as z,bX as V,bY as X,bZ as Y,I as K,J as Z,L as nn,H as tn,aE as en,aH as on,aA as an,z as sn,ac as rn,f as cn,aa as fn,X as un,O as ln}from"./calfSystem-3956a623.js"
import{i as pn}from"./isArray-03eca71a.js"
import{n as dn}from"./numberIsNaN-c09ad043.js"
import"./roundToString-7ebfaa0f.js"
import{r as mn,b as bn}from"./render-b304eb62.js"
import{t as hn}from"./toLowerCase-cc930098.js"
import"./createInput-f6e26d5e.js"
import{i as gn}from"./insertTextBeforeEnd-f8958585.js"
import"./onlineDot-b559f6bb.js"
import"./batch-b53a2e4f.js"
import{c as kn,a as Nn}from"./compressBio-fcb33b6b.js"
import"./createLabel-6f6560b1.js"
import{c as $n}from"./createTBody-c1bf0f07.js"
import{c as Cn}from"./createTable-b54e7aab.js"
import{c as vn}from"./createButton-eb3647ed.js"
import"./dialogMsg-6c4a948a.js"
import"./closest-2eae17cf.js"
import"./closestTable-65ce02cc.js"
import"./insertHtmlBeforeBegin-200f0598.js"
import{a as jn}from"./addStatTotalToMouseover-51cdc617.js"
import"./all-0781ab5a.js"
import{a as yn}from"./allthen-a3d20eb3.js"
import{c as Tn}from"./chunk-1a8d2dee.js"
import{e as Sn,a as Bn,u as xn}from"./useItem-7811c104.js"
import"./rnd-f08792a2.js"
import{f as En}from"./fetchdata-bf490390.js"
import{j as Dn}from"./jConfirm-3e64a8fb.js"
import"./dialog-a6efa002.js"
import"./ajaxReturnCode-69077631.js"
import"./daUseItem-35f02c30.js"
import{r as An}from"./replaceDoubleSpace-16077387.js"
import{q as Ln}from"./quickBuffHref-3ec701a4.js"
let _n
const Mn=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function Rn(n,t){return t(n)}function qn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function In(n){qn(5===Number(a(n.href,"section_id"))?(_n||(_n=s("backpackContainer")),_n):n.parentNode.parentNode.nextElementSibling)}function wn(n){const{target:t}=n;(function(n){return Mn.every(e(Rn,n))})(t)&&(In(t),o(t.href),n.preventDefault())}function Hn(){return r({subcmd:"loadcomponents"})}let Pn,Gn,Un
function Jn(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Qn(n,t){return`${n}<tr><td><img src="${p}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?`+`item_id=${t.b}&inv_id=${t.a}&t=2&p=${d()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Wn(n){const t=$n()
return function(n){Pn=n.r.reduce(Jn,{})}(n),l(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(Pn).reduce(Qn,"")}`),t}function On(n,t){const e=function(n){const t=n.insertRow(-1)
l(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
u(e,function(n){const t=n.r.length,e=m()
return f(t,e),e}(t)),gn(e,` / ${t.h.cm.toString()}`)}function Fn(n,t){if(!pn(t.r))return
const e=n.parentNode
e&&(f("",e),u(e,function(n){const t=Cn({className:"fshTblCenter",id:"fshTally"})
return u(t,Wn(n)),On(t,n),t}(t)))}function zn(n){const t=b(),e=m({className:`sendLink ${hn(n).replace(/ /g,"-")}`,textContent:n})
return h("[",t),u(t,e),l(t,"]"),t}function Vn(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Xn(){if(!Gn){const n=g("inventory-table",s("profileRightColumn"))
2===n.length&&([,Gn]=n)}return Gn}function Yn(n,t){return n[t.dataset.tipped.match(N)[2]]=t.parentNode.parentNode,n}function Kn(n,t){n[t]&&f("",n[t])}function Zn(n){n.forEach(e(Kn,function(){if(!Un){const n=k("img",Xn())
Un=n.reduce(Yn,{})}return Un}()))}function nt(n){const t=Xn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(C(a))
s-=n,h(s,a)}function tt(n){n.s&&pn(n.r)&&(Zn(n.r),nt(n.r.length))}function et(n){n.parentNode.remove()}function ot(n){return Vn(n).then(tt)}function at(n,t,e){e.s&&(!function(n){const t=v(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(C(e))-1
h(o,e)}(t),nt(1),n.parentNode&&f("",n.parentNode))}const st=["Enable Quick Del","Count Components","Quick Extract Components"]
function it(n,t){return u(n,zn(t)),n}function rt(n){l(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const ct=[["quick-extract-components",function(){c("components","insertQuickExtract"),y(T)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
u(e,zn("Delete All Visible")),k("img",Xn()).forEach(rt)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",t).forEach(B)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(N),a=o[1]
Vn([o[2]]).then(Sn).then(e(at,n,a))}],["count-components",function(n){c("components","countComponent"),Hn().then(e(Fn,n))}],["compDelType",function(n){const t=Pn[n.dataset.compid].del,o=n.parentNode
!function(n){f("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${p}ui/misc/spinner.gif')`}(o)
const a=Tn(30,t).map(ot)
yn(a,e(et,o))}]]
function ft(t){const e=t.parentNode
u(e,st.reduce(it,b({className:"fshCenter"}))),n(e,j(ct))}let ut
function lt(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&f("",n.parentNode)}function pt(n){c("profile","doDebuff"),(n=>En({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(Sn).then(e(lt,n))}function dt(n){ut?pt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Dn("Remove Skill",t,e(pt,n))}(n)}function mt(n){let t=n.target
if("IMG"===t.tagName)E(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),dt(t)}function bt(n,t){return t.a===n}function ht(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(bt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function gt(n,t,o,a){c("profile",`fastAction - ${a}`)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
h("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(ht,[n,a,s,i]))}function kt(n,t){t.target.classList.contains("fastWear")&&gt(n,t,Bn,"Worn"),t.target.classList.contains("fastUse")&&gt(n,t,xn,"Used")}function Nt(n){return n?"Use":"Wear"}function $t(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=b({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${Nt(e)}</span>`})
var a
n.options.checkboxesEnabled&&u(o,t.parentNode.nextElementSibling.nextElementSibling),u(t.parentNode.parentNode,o)}function Ct(n){_(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e($t,n))}function vt(n,t){const e=`${p}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?vt(t,"folder_on"):vt(t,"folder")}function yt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){_(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),Ct(o))},0!==C(s("backpack_current")).length&&L(3,Ct,[o]),n(t,e(kt,o))}function Tt(){x("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&yt(n,t)}())}function St(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let Bt,xt,Et
function Dt(n,t){t.s&&f("",n.parentNode)}function At(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&St(t).then(e(Dt,n))}function Lt(){c("profile","nekidBtn")
const n=Bt.nextElementSibling
k("a",n).forEach(At)}function _t(){const t=s("profileRightColumn")
Bt=s("profileCombatSetDiv")
const e=Bt.parentNode.nextElementSibling,o=function(){const t=b({className:"fshCenter"}),e=vn({className:"fshBl fshBls",textContent:"Nekid"})
return gn(t,"[ "),u(t,e),gn(t," ]"),n(e,Lt),t}()
t.replaceChild(o,e)}const Mt=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Rt=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function qt(n){const t=I(n)
return t?t.map(An).map(hn):[]}function It(n){return[qt(n[0]),n[1]]}function wt(n,t){return t[0].includes(n)}function Ht(n){const t=Rt.map(It),o=An(hn(n)),a=t.find(e(wt,o))
if(a)return a[1]}function Pt(n){return xt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),xt&&xt===q()?(R("guildSelf",C(n)),"self"):Ht(C(n))}function Gt(n){return n[0]===Et}function Ut(n){Et=Pt(n),Et&&function(n){const t=Mt.find(Gt)
n.parentNode.classList.add(t[1]),l(n.parentNode,`<br>${x(t[2])}`)}(n)}function Jt(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Ln(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!x("enableMaxGroupSizeToJoin"))return'<a class="quickButton buttonJoinAll tip-static fshJoin" '+`href="${G}" `+'data-tipped="Join All Groups"></a>&nbsp;&nbsp;'
const n=x("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${U}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+='<a class="quickButton tip-static fshGold" '+`href="${w}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${H}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===Et?`<a class="quickButton tip-static fshTempleThree" href="${J}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===Et&&x("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${Q}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${p}guilds/${xt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",P(n,o)}function Qt(n,t){const e=t.parentNode,o=O(F,e.nextElementSibling).length-1
l(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?`/${t}`:""}(o,x(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Wt(n){return function(n){return n&&x("renderSelfBio")}(n)||function(n){return!n&&x("renderOtherBios")}(n)}function Ot(n,t){Wt(n)&&function(n){let t=n.innerHTML
t=mn(t),t&&f(t,n)}(t)}function Ft(t){const e=s("profile-bio")
e&&(Ot(t,e),x("enableBioCompressor")&&L(3,kn,[e]),n(e,bn))}function zt(){c("profile","insertQuickWear"),y(V)}function Vt(){const n=s("backpack_tabs"),t=g("tab-selected",n)[0].getAttribute("data-type")
let e=_(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=_(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(B)}function Xt(){const n=parseInt(C(s(Y)),10)
!function(n){return K(Z(g(nn)))===n}(n)?R(tn,n):R(tn,"")}function Yt(n){return on(n.childNodes).filter(n=>3===n.nodeType).map(A).join("")}function Kt(n,t){const e=Number(Yt(s(an))),o=n.dataset.tipped,a=function(n,t){const e=/\(Level: (\d+)\)/.exec(t),o=Number(e[1])
return Math.floor(n*o*.0025)}(t,o)
n.dataset.tipped=`${o.slice(0,-15)}<br>Attack: ${(t-a).toString()}&nbsp;&nbsp;Defense: ${(e+a).toString()}</center></div>`}function Zt(){const n=v('#profileRightColumn img[src$="/60.png"]')
n&&function(n){const t=s(en)
if(!t)return
const e=Number(Yt(t))
dn(e)||Kt(n,e)}(n)}function ne(n){const t=O("td",n)
f(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> `+`<div class="profile-stat-bonus">${C(t[1])}</div>`,n.parentNode)}function te(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ut=x("disableDeactivatePrompts"),n(t.lastElementChild,mt,!0))}(),function(){const n=_("#profileLeftColumn strong")
n.filter(W("Allies")).forEach(e(Qt,!0)),n.filter(W("Enemies")).forEach(e(Qt,!1))}(),Tt(),function(){const n=Xn()
n&&ft(n)}(),function(){const t=v(`#profileRightColumn a[href="${z}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=m({innerHTML:"&nbsp;["}),o=m({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
u(e,o),gn(e,"]"),u(t.parentNode,e),n(o,zt)}(),function(){const t=v(`#profileRightColumn a[href="${X}"]`)
if(!t)return
const e=m({className:"smallLink",textContent:"All"})
n(e,Vt)
const o=m({innerHTML:"[&nbsp;"})
u(o,e),l(o,"&nbsp;]&nbsp;"),u(t.parentNode,o)}(),Xt(),_t(),n(t,wn))}function ee(n,t,e){!function(n){const t=v(`#pCC a[href^="${M}"]`)
t?Ut(t):n&&R("guildSelf","")}(e),Jt(n,fn(un("player_id"),d()),t)}function oe(n,t,e){te(e),ee(n,t,e),Zt(),function(){const n=O(F,s("profileLeftColumn"))[0]
k(F,n).forEach(ne)}(),function(){if(!x("highlightPvpProtection"))return
const n=v(`#profileLeftColumn a[href="${D}"]`)
"N/A"!==A(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),L(3,Ft,[e]),jn(),L(3,Nn)}function ae(n){n.preventDefault()
const t=on(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${ln}?${t}`}export default function(){if(sn())return
const n=v('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=C(O("h1",t)[0]),o=e===rn()
oe(n,e,o),function(n){n||cn(v("#profileRightColumn"),"submit",ae)}(o)}
//# sourceMappingURL=profile-51231918.js.map
