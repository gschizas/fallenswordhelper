import{o as n,p as t,u as e,aZ as o,bU as a,z as s,m as i,bB as r,$ as c,B as f,f as u,i as l,aE as p,bn as d,S as m,k as b,A as h,J as g,g as k,h as N,C,Q as j,bV as y,a0 as T,bW as v,aj as S,X as B,F as E,ap as x,bX as D,bj as L,a as A,M,bH as _,a3 as R,b2 as q,aT as I,bY as w,bu as H,Z as G,bZ as P,b_ as J,bT as Q,s as U,bm as W,b as F,d as z,b5 as O,b$ as Z,c0 as V,c1 as X,H as K,I as Y,K as nn,G as tn,aG as en,y as on,ab as an,e as sn,a9 as rn,W as cn,N as fn}from"./calfSystem-371c414c.js"
import{i as un}from"./isArray-f2e9e1ad.js"
import{n as ln}from"./numberIsNaN-987e3021.js"
import"./roundToString-a82a9cde.js"
import{r as pn,b as dn}from"./render-4289268b.js"
import{t as mn}from"./toLowerCase-08111a24.js"
import"./createInput-d378f9d2.js"
import{i as bn}from"./insertTextBeforeEnd-b8da3766.js"
import"./onlineDot-b47e695a.js"
import{s as hn}from"./setTipped-a7231de6.js"
import"./batch-96f40a5d.js"
import{c as gn,a as kn}from"./compressBio-ca6fc476.js"
import"./createLabel-146da34f.js"
import{c as Nn}from"./createTBody-51b8edc4.js"
import{c as $n}from"./createTable-ad174066.js"
import{c as Cn}from"./createButton-957980b2.js"
import"./dialogMsg-33712041.js"
import"./closest-d5dda5d9.js"
import"./closestTable-b335e246.js"
import"./insertHtmlBeforeBegin-410252ec.js"
import{a as jn}from"./addStatTotalToMouseover-f726fede.js"
import"./all-93023d41.js"
import{a as yn}from"./allthen-691ee788.js"
import{c as Tn}from"./chunk-5be7da04.js"
import{e as vn}from"./errorDialog-c2f7094e.js"
import"./rnd-1c21bb8a.js"
import{f as Sn}from"./fetchdata-735cc8df.js"
import{j as Bn}from"./jConfirm-4672f8e0.js"
import"./dialog-3e1a0a78.js"
import{e as En,u as xn}from"./useItem-45a468ee.js"
import"./ajaxReturnCode-946f7e47.js"
import"./daUseItem-a54df2cc.js"
import{r as Dn}from"./replaceDoubleSpace-29753e20.js"
import{q as Ln}from"./quickBuffHref-091b47a4.js"
let An
const Mn=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function _n(n,t){return t(n)}function Rn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function qn(n){Rn(5===Number(a(n.href,"section_id"))?(An||(An=s("backpackContainer")),An):n.parentNode.parentNode.nextElementSibling)}function In(n){const{target:t}=n;(function(n){return Mn.every(e(_n,n))})(t)&&(qn(t),o(t.href),n.preventDefault())}function wn(){return r({subcmd:"loadcomponents"})}let Hn,Gn,Pn
function Jn(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Qn(n,t){return`${n}<tr><td><img src="${p}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${d()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Un(n){const t=Nn()
return function(n){Hn=n.r.reduce(Jn,{})}(n),l(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Hn).reduce(Qn,"")),t}function Wn(n,t){const e=function(n){const t=n.insertRow(-1)
l(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
u(e,function(n){const t=n.r.length,e=m()
return f(t,e),e}(t)),bn(e," / "+t.h.cm.toString())}function Fn(n,t){if(!un(t.r))return
const e=n.parentNode
e&&(f("",e),u(e,function(n){const t=$n({className:"fshTblCenter",id:"fshTally"})
return u(t,Un(n)),Wn(t,n),t}(t)))}function zn(n){const t=b(),e=m({className:"sendLink "+mn(n).replace(/ /g,"-"),textContent:n})
return h("[",t),u(t,e),l(t,"]"),t}function On(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Zn(){if(!Gn){const n=g("inventory-table",s("profileRightColumn"))
2===n.length&&([,Gn]=n)}return Gn}function Vn(n,t){return n[t.dataset.tipped.match(N)[2]]=t.parentNode.parentNode,n}function Xn(n,t){n[t]&&f("",n[t])}function Kn(n){n.forEach(e(Xn,function(){if(!Pn){const n=k("img",Zn())
Pn=n.reduce(Vn,{})}return Pn}()))}function Yn(n){const t=Zn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(C(a))
s-=n,h(s,a)}function nt(n){n.s&&un(n.r)&&(Kn(n.r),Yn(n.r.length))}function tt(n){n.parentNode.remove()}function et(n){return On(n).then(nt)}function ot(n,t,e){e.s&&(!function(n){const t=j(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(C(e))-1
h(o,e)}(t),Yn(1),n.parentNode&&f("",n.parentNode))}const at=["Enable Quick Del","Count Components","Quick Extract Components"]
function st(n,t){return u(n,zn(t)),n}function it(n){l(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rt=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(v)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
u(e,zn("Delete All Visible")),k("img",Zn()).forEach(it)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",t).forEach(B)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(N),a=o[1]
On([o[2]]).then(vn).then(e(ot,n,a))}],["count-components",function(n){c("components","countComponent"),wn().then(e(Fn,n))}],["compDelType",function(n){const t=Hn[n.dataset.compid].del,o=n.parentNode
!function(n){f("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${p}ui/misc/spinner.gif')`}(o)
const a=Tn(30,t).map(et)
yn(a,e(tt,o))}]]
function ct(t){const e=t.parentNode
u(e,at.reduce(st,b({className:"fshCenter"}))),n(e,y(rt))}let ft
function ut(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&f("",n.parentNode)}function lt(n){c("profile","doDebuff");(n=>Sn({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(vn).then(e(ut,n))}function pt(n){ft?lt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Bn("Remove Skill",t,e(lt,n))}(n)}function dt(n){let t=n.target
if("IMG"===t.tagName)x(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),pt(t)}function mt(n,t){return t.a===n}function bt(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(mt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function ht(n,t,o,a){c("profile","fastAction - "+a)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
h("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(bt,[n,a,s,i]))}function gt(n,t){t.target.classList.contains("fastWear")&&ht(n,t,En,"Worn"),t.target.classList.contains("fastUse")&&ht(n,t,xn,"Used")}function kt(n){return n?"Use":"Wear"}function Nt(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=b({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kt(e)}</span>`})
var a
n.options.checkboxesEnabled&&u(o,t.parentNode.nextElementSibling.nextElementSibling),u(t.parentNode.parentNode,o)}function $t(n){M(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nt,n))}function Ct(n,t){const e=`${p}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?Ct(t,"folder_on"):Ct(t,"folder")}function yt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){M(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),$t(o))},0!==C(s("backpack_current")).length&&A(3,$t,[o]),n(t,e(gt,o))}function Tt(){E("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&yt(n,t)}())}function vt(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let St,Bt,Et
function xt(n,t){t.s&&f("",n.parentNode)}function Dt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&vt(t).then(e(xt,n))}function Lt(){c("profile","nekidBtn")
const n=St.nextElementSibling
k("a",n).forEach(Dt)}function At(){const t=s("profileRightColumn")
St=s("profileCombatSetDiv")
const e=St.parentNode.nextElementSibling,o=function(){const t=b({className:"fshCenter"}),e=Cn({className:"fshBl fshBls",textContent:"Nekid"})
return bn(t,"[ "),u(t,e),bn(t," ]"),n(e,Lt),t}()
t.replaceChild(o,e)}const Mt=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],_t=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rt(n){const t=I(n)
return t?t.map(Dn).map(mn):[]}function qt(n){return[Rt(n[0]),n[1]]}function It(n,t){return t[0].includes(n)}function wt(n){const t=_t.map(qt),o=Dn(mn(n)),a=t.find(e(It,o))
if(a)return a[1]}function Ht(n){return Bt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),Bt&&Bt===q()?(R("guildSelf",C(n)),"self"):wt(C(n))}function Gt(n){return n[0]===Et}function Pt(n){Et=Ht(n),Et&&function(n){const t=Mt.find(Gt)
n.parentNode.classList.add(t[1]),l(n.parentNode,"<br>"+E(t[2]))}(n)}function Jt(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Ln(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!E("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${P}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const n=E("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${J}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${w}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${H}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===Et?`<a class="quickButton tip-static fshTempleThree" href="${Q}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===Et&&E("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${U}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${p}guilds/${Bt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",G(n,o)}function Qt(n,t){const e=t.parentNode,o=F(z,e.nextElementSibling).length-1
l(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?"/"+t:""}(o,E(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Ut(n){return function(n){return n&&E("renderSelfBio")}(n)||function(n){return!n&&E("renderOtherBios")}(n)}function Wt(n,t){Ut(n)&&function(n){let t=n.innerHTML
t=pn(t),t&&f(t,n)}(t)}function Ft(t){const e=s("profile-bio")
e&&(Wt(t,e),E("enableBioCompressor")&&A(3,gn,[e]),n(e,dn))}function zt(){c("profile","insertQuickWear"),T(Z)}function Ot(){const n=s("backpack_tabs"),t=g("tab-selected",n)[0].getAttribute("data-type")
let e=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(B)}function Zt(){const n=parseInt(C(s(X)),10)
!function(n){return K(Y(g(nn)))===n}(n)?R(tn,n):R(tn,"")}const Vt=98,Xt=85,Kt=60
function Yt(n){return Number(en(s("stat-"+n.toLowerCase()).childNodes).filter(n=>3===n.nodeType).map(L).join(""))}function ne(n){const t=b({innerHTML:n.dataset.tipped}),e=k("b",t).map(n=>L(n)),o=Yt(e[2])
ln(o)||function(n,t,e){const o=Yt(t[3]),a=Math.floor(e*(Number(t[1].replace(/[+%]/g,""))/100))
hn(n.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${t[2]}: ${String(e-a)}&nbsp;&nbsp;${t[3]}: ${String(o+a)}$&`),n)}(n,e,o)}function te(n){const t=j(`#profileRightColumn img[src$="/${String(n)}.png"]`)
t&&ne(t)}function ee(n){const t=F("td",n)
f(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${C(t[1])}</div>`,n.parentNode)}function oe(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ft=E("disableDeactivatePrompts"),n(t.lastElementChild,dt,!0))}(),function(){const n=M("#profileLeftColumn strong")
n.filter(W("Allies")).forEach(e(Qt,!0)),n.filter(W("Enemies")).forEach(e(Qt,!1))}(),Tt(),function(){const n=Zn()
n&&ct(n)}(),function(){const t=j(`#profileRightColumn a[href="${O}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=m({innerHTML:"&nbsp;["}),o=m({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
u(e,o),bn(e,"]"),u(t.parentNode,e),n(o,zt)}(),function(){const t=j(`#profileRightColumn a[href="${V}"]`)
if(!t)return
const e=m({className:"smallLink",textContent:"All"})
n(e,Ot)
const o=m({innerHTML:"[&nbsp;"})
u(o,e),l(o,"&nbsp;]&nbsp;"),u(t.parentNode,o)}(),Zt(),At(),n(t,In))}function ae(n,t,e){!function(n){const t=j(`#pCC a[href^="${_}"]`)
t?Pt(t):n&&R("guildSelf","")}(e)
Jt(n,rn(cn("player_id"),d()),t)}function se(n,t,e){oe(e),ae(n,t,e),[Vt,Xt,Kt].forEach(te),function(){const n=F(z,s("profileLeftColumn"))[0]
k(z,n).forEach(ee)}(),function(){if(!E("highlightPvpProtection"))return
const n=j(`#profileLeftColumn a[href="${D}"]`)
"N/A"!==L(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),A(3,Ft,[e]),jn(),A(3,kn)}function ie(n){n.preventDefault()
const t=en(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${fn}?${t}`}export default function(){if(on())return
const n=j('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=C(F("h1",t)[0]),o=e===an()
se(n,e,o),function(n){n||sn(j("#profileRightColumn"),"submit",ie)}(o)}
//# sourceMappingURL=profile-a9217518.js.map
