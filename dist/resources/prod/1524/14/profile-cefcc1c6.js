import{o as n,p as t,u as e,aZ as o,bO as a,z as s,m as i,bz as r,$ as c,B as f,f as u,i as l,aE as p,bl as d,S as m,k as b,A as h,J as g,g as k,h as N,C,Q as j,bP as y,a0 as T,bQ as v,aj as S,X as B,F as E,ap as x,bR as L,bh as D,a as A,M,bS as _,a3 as R,b2 as q,aT as I,bT as w,bs as G,Z as H,bU as P,bV as Q,bN as J,s as U,bk as W,b as z,d as F,b5 as O,bW as V,bX as X,bY as Z,H as K,I as Y,K as nn,G as tn,aG as en,y as on,ab as an,e as sn,a9 as rn,W as cn,N as fn}from"./calfSystem-d587d232.js"
import{i as un}from"./isArray-5dbf2807.js"
import{n as ln}from"./numberIsNaN-054e0c59.js"
import"./roundToString-86a4e935.js"
import{r as pn,b as dn}from"./render-856f1983.js"
import{t as mn}from"./toLowerCase-f57cc259.js"
import"./createInput-f5f615ed.js"
import{i as bn}from"./insertTextBeforeEnd-2aca15fb.js"
import"./onlineDot-c976faff.js"
import{s as hn}from"./setTipped-3e31c084.js"
import"./batch-a68928f8.js"
import{c as gn,a as kn}from"./compressBio-9443c9ed.js"
import"./createLabel-d01980d0.js"
import{c as Nn}from"./createTBody-d864b9fe.js"
import{c as $n}from"./createTable-5f8e2bd3.js"
import{c as Cn}from"./createButton-04c4f16f.js"
import"./dialogMsg-8c5a22d3.js"
import"./closest-2b33b59d.js"
import"./closestTable-6cc0678e.js"
import"./insertHtmlBeforeBegin-d42e4723.js"
import{a as jn}from"./addStatTotalToMouseover-08e841f9.js"
import"./all-39781966.js"
import{a as yn}from"./allthen-ba816a7b.js"
import{c as Tn}from"./chunk-7bfa3ec6.js"
import{e as vn,a as Sn,u as Bn}from"./useItem-00e6e986.js"
import"./rnd-172e07c3.js"
import{f as En}from"./fetchdata-512332db.js"
import{j as xn}from"./jConfirm-a3348ddb.js"
import"./dialog-f9fad105.js"
import"./ajaxReturnCode-b9bc06f8.js"
import"./daUseItem-3fde36ea.js"
import{r as Ln}from"./replaceDoubleSpace-0d426517.js"
import{q as Dn}from"./quickBuffHref-a7c3924e.js"
let An
const Mn=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function _n(n,t){return t(n)}function Rn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function qn(n){Rn(5===Number(a(n.href,"section_id"))?(An||(An=s("backpackContainer")),An):n.parentNode.parentNode.nextElementSibling)}function In(n){const{target:t}=n;(function(n){return Mn.every(e(_n,n))})(t)&&(qn(t),o(t.href),n.preventDefault())}function wn(){return r({subcmd:"loadcomponents"})}let Gn,Hn,Pn
function Qn(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Jn(n,t){return`${n}<tr><td><img src="${p}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${d()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Un(n){const t=Nn()
return function(n){Gn=n.r.reduce(Qn,{})}(n),l(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Gn).reduce(Jn,"")),t}function Wn(n,t){const e=function(n){const t=n.insertRow(-1)
l(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
u(e,function(n){const t=n.r.length,e=m()
return f(t,e),e}(t)),bn(e," / "+t.h.cm.toString())}function zn(n,t){if(!un(t.r))return
const e=n.parentNode
e&&(f("",e),u(e,function(n){const t=$n({className:"fshTblCenter",id:"fshTally"})
return u(t,Un(n)),Wn(t,n),t}(t)))}function Fn(n){const t=b(),e=m({className:"sendLink "+mn(n).replace(/ /g,"-"),textContent:n})
return h("[",t),u(t,e),l(t,"]"),t}function On(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Vn(){if(!Hn){const n=g("inventory-table",s("profileRightColumn"))
2===n.length&&([,Hn]=n)}return Hn}function Xn(n,t){return n[t.dataset.tipped.match(N)[2]]=t.parentNode.parentNode,n}function Zn(n,t){n[t]&&f("",n[t])}function Kn(n){n.forEach(e(Zn,function(){if(!Pn){const n=k("img",Vn())
Pn=n.reduce(Xn,{})}return Pn}()))}function Yn(n){const t=Vn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(C(a))
s-=n,h(s,a)}function nt(n){n.s&&un(n.r)&&(Kn(n.r),Yn(n.r.length))}function tt(n){n.parentNode.remove()}function et(n){return On(n).then(nt)}function ot(n,t,e){e.s&&(!function(n){const t=j(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(C(e))-1
h(o,e)}(t),Yn(1),n.parentNode&&f("",n.parentNode))}const at=["Enable Quick Del","Count Components","Quick Extract Components"]
function st(n,t){return u(n,Fn(t)),n}function it(n){l(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rt=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(v)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
u(e,Fn("Delete All Visible")),k("img",Vn()).forEach(it)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
S("compDelBtn",t).forEach(B)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(N),a=o[1]
On([o[2]]).then(vn).then(e(ot,n,a))}],["count-components",function(n){c("components","countComponent"),wn().then(e(zn,n))}],["compDelType",function(n){const t=Gn[n.dataset.compid].del,o=n.parentNode
!function(n){f("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${p}ui/misc/spinner.gif')`}(o)
const a=Tn(30,t).map(et)
yn(a,e(tt,o))}]]
function ct(t){const e=t.parentNode
u(e,at.reduce(st,b({className:"fshCenter"}))),n(e,y(rt))}let ft
function ut(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&f("",n.parentNode)}function lt(n){c("profile","doDebuff");(n=>En({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(vn).then(e(ut,n))}function pt(n){ft?lt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
xn("Remove Skill",t,e(lt,n))}(n)}function dt(n){let t=n.target
if("IMG"===t.tagName)x(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),pt(t)}function mt(n,t){return t.a===n}function bt(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(mt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function ht(n,t,o,a){c("profile","fastAction - "+a)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
h("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(bt,[n,a,s,i]))}function gt(n,t){t.target.classList.contains("fastWear")&&ht(n,t,Sn,"Worn"),t.target.classList.contains("fastUse")&&ht(n,t,Bn,"Used")}function kt(n){return n?"Use":"Wear"}function Nt(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=b({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kt(e)}</span>`})
var a
n.options.checkboxesEnabled&&u(o,t.parentNode.nextElementSibling.nextElementSibling),u(t.parentNode.parentNode,o)}function $t(n){M(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nt,n))}function Ct(n,t){const e=`${p}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?Ct(t,"folder_on"):Ct(t,"folder")}function yt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){M(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),$t(o))},0!==C(s("backpack_current")).length&&A(3,$t,[o]),n(t,e(gt,o))}function Tt(){E("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&yt(n,t)}())}function vt(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let St,Bt,Et
function xt(n,t){t.s&&f("",n.parentNode)}function Lt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&vt(t).then(e(xt,n))}function Dt(){c("profile","nekidBtn")
const n=St.nextElementSibling
k("a",n).forEach(Lt)}function At(){const t=s("profileRightColumn")
St=s("profileCombatSetDiv")
const e=St.parentNode.nextElementSibling,o=function(){const t=b({className:"fshCenter"}),e=Cn({className:"fshBl fshBls",textContent:"Nekid"})
return bn(t,"[ "),u(t,e),bn(t," ]"),n(e,Dt),t}()
t.replaceChild(o,e)}const Mt=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],_t=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rt(n){const t=I(n)
return t?t.map(Ln).map(mn):[]}function qt(n){return[Rt(n[0]),n[1]]}function It(n,t){return t[0].includes(n)}function wt(n){const t=_t.map(qt),o=Ln(mn(n)),a=t.find(e(It,o))
if(a)return a[1]}function Gt(n){return Bt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),Bt&&Bt===q()?(R("guildSelf",C(n)),"self"):wt(C(n))}function Ht(n){return n[0]===Et}function Pt(n){Et=Gt(n),Et&&function(n){const t=Mt.find(Ht)
n.parentNode.classList.add(t[1]),l(n.parentNode,"<br>"+E(t[2]))}(n)}function Qt(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Dn(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!E("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${P}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const n=E("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${Q}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${w}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${G}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===Et?`<a class="quickButton tip-static fshTempleThree" href="${J}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===Et&&E("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${U}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${p}guilds/${Bt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",H(n,o)}function Jt(n,t){const e=t.parentNode,o=z(F,e.nextElementSibling).length-1
l(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?"/"+t:""}(o,E(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Ut(n){return function(n){return n&&E("renderSelfBio")}(n)||function(n){return!n&&E("renderOtherBios")}(n)}function Wt(n,t){Ut(n)&&function(n){let t=n.innerHTML
t=pn(t),t&&f(t,n)}(t)}function zt(t){const e=s("profile-bio")
e&&(Wt(t,e),E("enableBioCompressor")&&A(3,gn,[e]),n(e,dn))}function Ft(){c("profile","insertQuickWear"),T(V)}function Ot(){const n=s("backpack_tabs"),t=g("tab-selected",n)[0].getAttribute("data-type")
let e=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(B)}function Vt(){const n=parseInt(C(s(Z)),10)
!function(n){return K(Y(g(nn)))===n}(n)?R(tn,n):R(tn,"")}const Xt=98,Zt=85,Kt=60
function Yt(n){return Number(en(s("stat-"+n.toLowerCase()).childNodes).filter(n=>3===n.nodeType).map(D).join(""))}function ne(n){const t=b({innerHTML:n.dataset.tipped}),e=k("b",t).map(n=>D(n)),o=Yt(e[2])
ln(o)||function(n,t,e){const o=Yt(t[3]),a=Math.floor(e*(Number(t[1].replace(/[+%]/g,""))/100))
hn(n.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${t[2]}: ${String(e-a)}&nbsp;&nbsp;${t[3]}: ${String(o+a)}$&`),n)}(n,e,o)}function te(n){const t=j(`#profileRightColumn img[src$="/${String(n)}.png"]`)
t&&ne(t)}function ee(n){const t=z("td",n)
f(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${C(t[1])}</div>`,n.parentNode)}function oe(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ft=E("disableDeactivatePrompts"),n(t.lastElementChild,dt,!0))}(),function(){const n=M("#profileLeftColumn strong")
n.filter(W("Allies")).forEach(e(Jt,!0)),n.filter(W("Enemies")).forEach(e(Jt,!1))}(),Tt(),function(){const n=Vn()
n&&ct(n)}(),function(){const t=j(`#profileRightColumn a[href="${O}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=m({innerHTML:"&nbsp;["}),o=m({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
u(e,o),bn(e,"]"),u(t.parentNode,e),n(o,Ft)}(),function(){const t=j(`#profileRightColumn a[href="${X}"]`)
if(!t)return
const e=m({className:"smallLink",textContent:"All"})
n(e,Ot)
const o=m({innerHTML:"[&nbsp;"})
u(o,e),l(o,"&nbsp;]&nbsp;"),u(t.parentNode,o)}(),Vt(),At(),n(t,In))}function ae(n,t,e){!function(n){const t=j(`#pCC a[href^="${_}"]`)
t?Pt(t):n&&R("guildSelf","")}(e)
Qt(n,rn(cn("player_id"),d()),t)}function se(n,t,e){oe(e),ae(n,t,e),[Xt,Zt,Kt].forEach(te),function(){const n=z(F,s("profileLeftColumn"))[0]
k(F,n).forEach(ee)}(),function(){if(!E("highlightPvpProtection"))return
const n=j(`#profileLeftColumn a[href="${L}"]`)
"N/A"!==D(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),A(3,zt,[e]),jn(),A(3,kn)}function ie(n){n.preventDefault()
const t=en(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${fn}?${t}`}export default function(){if(on())return
const n=j('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=C(z("h1",t)[0]),o=e===an()
se(n,e,o),function(n){n||sn(j("#profileRightColumn"),"submit",ie)}(o)}
//# sourceMappingURL=profile-cefcc1c6.js.map
