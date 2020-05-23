import{o as n,p as t,v as e,a$ as o,bZ as s,A as a,n as i,bl as r,a1 as c,R as f,C as u,h as l,i as p,aI as d,bt as m,U as b,l as h,B as g,K as k,g as N,k as C,D as j,S as v,b_ as y,a2 as T,b$ as S,al as B,Z as x,G as E,at as D,c0 as L,b7 as A,a as _,N as M,bK as R,a5 as I,b4 as q,aW as w,c1 as H,bA as G,$ as P,c2 as J,c3 as U,bY as Q,u as W,b6 as O,b as z,c as F,ba as K,c4 as Y,c5 as Z,c6 as V,I as X,J as nn,L as tn,H as en,aK as on,z as sn,ad as an,f as rn,ab as cn,Y as fn,O as un}from"./calfSystem-01eb06ed.js"
import{n as ln}from"./numberIsNaN-5d7b8ccd.js"
import"./round-0f71090a.js"
import"./roundToString-c0cdd0e8.js"
import{r as pn,b as dn}from"./render-f2cb03f6.js"
import{t as mn}from"./toLowerCase-b5dc48c4.js"
import"./createInput-7fd54c66.js"
import{i as bn}from"./insertTextBeforeEnd-7d27fb10.js"
import"./onlineDot-15ff94f9.js"
import{s as hn}from"./setTipped-483fb9d0.js"
import"./batch-bf64c121.js"
import{c as gn,a as kn}from"./compressBio-8157f878.js"
import"./createLabel-94fe4ec2.js"
import{c as Nn}from"./createTBody-dcdfd89a.js"
import{c as $n}from"./createTable-1806515f.js"
import{c as Cn}from"./createButton-33c18cfd.js"
import"./dialogMsg-7ec2c29d.js"
import"./closest-6fcf191a.js"
import"./closestTable-c3597d67.js"
import"./insertHtmlBeforeBegin-27203589.js"
import{a as jn}from"./addStatTotalToMouseover-d43ff9e3.js"
import"./all-6b303efd.js"
import{a as vn}from"./allthen-385cdb7e.js"
import{c as yn}from"./chunk-ce68ae18.js"
import{e as Tn}from"./errorDialog-3344f8b2.js"
import"./rnd-a99d963a.js"
import{f as Sn}from"./fetchdata-d661f9e6.js"
import{j as Bn}from"./jConfirm-71949d67.js"
import"./dialog-e8202133.js"
import{e as xn,u as En}from"./useItem-e62d6147.js"
import"./ajaxReturnCode-13dfe8bc.js"
import"./daUseItem-50a1f978.js"
import{r as Dn}from"./replaceDoubleSpace-ffff9c4e.js"
import{q as Ln}from"./quickBuffHref-a8c8de7b.js"
let An
const _n=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function Mn(n,t){return t(n)}function Rn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function In(n){Rn(5===Number(s(n.href,"section_id"))?(An||(An=a("backpackContainer")),An):n.parentNode.parentNode.nextElementSibling)}function qn(n){const{target:t}=n;(function(n){return _n.every(e(Mn,n))})(t)&&(In(t),o(t.href),n.preventDefault())}function wn(){return r({subcmd:"loadcomponents"})}let Hn,Gn,Pn
function Jn(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Un(n,t){return`${n}<tr><td><img src="${d}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${m()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Qn(n){const t=Nn()
return function(n){Hn=n.r.reduce(Jn,{})}(n),p(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Hn).reduce(Un,"")),t}function Wn(n,t){const e=function(n){const t=n.insertRow(-1)
p(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
l(e,function(n){const t=n.r.length,e=b()
return u(t,e),e}(t)),bn(e," / "+t.h.cm.toString())}function On(n,t){if(!f(t.r))return
const e=n.parentNode
e&&(u("",e),l(e,function(n){const t=$n({className:"fshTblCenter",id:"fshTally"})
return l(t,Qn(n)),Wn(t,n),t}(t)))}function zn(n){const t=h(),e=b({className:"sendLink "+mn(n).replace(/ /g,"-"),textContent:n})
return g("[",t),l(t,e),p(t,"]"),t}function Fn(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Kn(){if(!Gn){const n=k("inventory-table",a("profileRightColumn"))
2===n.length&&([,Gn]=n)}return Gn}function Yn(n,t){return n[t.dataset.tipped.match(C)[2]]=t.parentNode.parentNode,n}function Zn(n,t){n[t]&&u("",n[t])}function Vn(n){n.forEach(e(Zn,function(){if(!Pn){const n=N("img",Kn())
Pn=n.reduce(Yn,{})}return Pn}()))}function Xn(n){const t=Kn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,s=o[o.length-1].cells[1].children[0]
let a=Number(j(s))
a-=n,g(a,s)}function nt(n){n.s&&f(n.r)&&(Vn(n.r),Xn(n.r.length))}function tt(n){n.parentNode.remove()}function et(n){return Fn(n).then(nt)}function ot(n,t,e){e.s&&(!function(n){const t=v(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(j(e))-1
g(o,e)}(t),Xn(1),n.parentNode&&u("",n.parentNode))}const st=["Enable Quick Del","Count Components","Quick Extract Components"]
function at(n,t){return l(n,zn(t)),n}function it(n){p(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rt=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(S)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
l(e,zn("Delete All Visible")),N("img",Kn()).forEach(it)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
B("compDelBtn",t).forEach(x)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(C),s=o[1]
Fn([o[2]]).then(Tn).then(e(ot,n,s))}],["count-components",function(n){c("components","countComponent"),wn().then(e(On,n))}],["compDelType",function(n){const t=Hn[n.dataset.compid].del,o=n.parentNode
!function(n){u("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${d}ui/misc/spinner.gif')`}(o)
const s=yn(30,t).map(et)
vn(s,e(tt,o))}]]
function ct(t){const e=t.parentNode
l(e,st.reduce(at,h({className:"fshCenter"}))),n(e,y(rt))}let ft
function ut(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&u("",n.parentNode)}function lt(n){c("profile","doDebuff");(n=>Sn({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(Tn).then(e(ut,n))}function pt(n){ft?lt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Bn("Remove Skill",t,e(lt,n))}(n)}function dt(n){let t=n.target
if("IMG"===t.tagName)D(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),pt(t)}function mt(n,t){return t.a===n}function bt(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(mt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),u(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function ht(n,t,o,s){c("profile","fastAction - "+s)
const{target:a}=t,i=a.parentNode.parentNode.children[0].dataset.inv
g("",a),a.className="fastAction fshSpinner fshSpinner12",o(i).then(e(bt,[n,s,a,i]))}function gt(n,t){t.target.classList.contains("fastWear")&&ht(n,t,xn,"Worn"),t.target.classList.contains("fastUse")&&ht(n,t,En,"Used")}function kt(n){return n?"Use":"Wear"}function Nt(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=h({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${s=e,s?"fastUse":"fastWear"}">${kt(e)}</span>`})
var s
n.options.checkboxesEnabled&&l(o,t.parentNode.nextElementSibling.nextElementSibling),l(t.parentNode.parentNode,o)}function $t(n){M(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nt,n))}function Ct(n,t){const e=`${d}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?Ct(t,"folder_on"):Ct(t,"folder")}function vt(t,o){const s=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){M(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),s.call(o,n,t),$t(o))},0!==j(a("backpack_current")).length&&_(3,$t,[o]),n(t,e(gt,o))}function yt(){E("enableQuickDrink")&&(function(){const n=a("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=a("backpackContainer"),t=$(n).data("hcsBackpack")
t&&vt(n,t)}())}function Tt(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let St,Bt,xt
function Et(n,t){t.s&&u("",n.parentNode)}function Dt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&Tt(t).then(e(Et,n))}function Lt(){c("profile","nekidBtn")
const n=St.nextElementSibling
N("a",n).forEach(Dt)}function At(){const t=a("profileRightColumn")
St=a("profileCombatSetDiv")
const e=St.parentNode.nextElementSibling,o=function(){const t=h({className:"fshCenter"}),e=Cn({className:"fshBl fshBls",textContent:"Nekid"})
return bn(t,"[ "),l(t,e),bn(t," ]"),n(e,Lt),t}()
t.replaceChild(o,e)}const _t=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Mt=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rt(n){const t=w(n)
return t?t.map(Dn).map(mn):[]}function It(n){return[Rt(n[0]),n[1]]}function qt(n,t){return t[0].includes(n)}function wt(n){const t=Mt.map(It),o=Dn(mn(n)),s=t.find(e(qt,o))
if(s)return s[1]}function Ht(n){return Bt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),Bt&&Bt===q()?(I("guildSelf",j(n)),"self"):wt(j(n))}function Gt(n){return n[0]===xt}function Pt(n){xt=Ht(n),xt&&function(n){const t=_t.find(Gt)
n.parentNode.classList.add(t[1]),p(n.parentNode,"<br>"+E(t[2]))}(n)}function Jt(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Ln(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!E("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${J}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const n=E("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${U}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${H}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${G}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===xt?`<a class="quickButton tip-static fshTempleThree" href="${Q}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===xt&&E("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${W}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${d}guilds/${Bt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",P(n,o)}function Ut(n,t){const e=t.parentNode,o=z(F,e.nextElementSibling).length-1
p(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?"/"+t:""}(o,E(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Qt(n){return function(n){return n&&E("renderSelfBio")}(n)||function(n){return!n&&E("renderOtherBios")}(n)}function Wt(n,t){Qt(n)&&function(n){let t=n.innerHTML
t=pn(t),t&&u(t,n)}(t)}function Ot(t){const e=a("profile-bio")
e&&(Wt(t,e),E("enableBioCompressor")&&_(3,gn,[e]),n(e,dn))}function zt(){c("profile","insertQuickWear"),T(Y)}function Ft(){const n=a("backpack_tabs"),t=k("tab-selected",n)[0].getAttribute("data-type")
let e=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(x)}function Kt(){const n=parseInt(j(a(V)),10)
!function(n){return X(nn(k(tn)))===n}(n)?I(en,n):I(en,"")}const Yt=98,Zt=85,Vt=60
function Xt(n){return Number(on(a("stat-"+n.toLowerCase()).childNodes).filter(n=>3===n.nodeType).map(A).join(""))}function ne(n){const t=h({innerHTML:n.dataset.tipped}),e=N("b",t).map(n=>A(n)),o=Xt(e[2])
ln(o)||function(n,t,e){const o=Xt(t[3]),s=Math.floor(e*(Number(t[1].replace(/[+%]/g,""))/100))
hn(n.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(s)}<br>${t[2]}: ${String(e-s)}&nbsp;&nbsp;${t[3]}: ${String(o+s)}$&`),n)}(n,e,o)}function te(n){const t=v(`#profileRightColumn img[src$="/${String(n)}.png"]`)
t&&ne(t)}function ee(n){const t=z("td",n)
u(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${j(t[1])}</div>`,n.parentNode)}function oe(o){o&&(!function(){const t=a("profileRightColumn")
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
l(o,e),p(o,"&nbsp;]&nbsp;"),l(t.parentNode,o)}(),Kt(),At(),n(t,qn))}function se(n,t,e){!function(n){const t=v(`#pCC a[href^="${R}"]`)
t?Pt(t):n&&I("guildSelf","")}(e)
Jt(n,cn(fn("player_id"),m()),t)}function ae(n,t,e){oe(e),se(n,t,e),[Yt,Zt,Vt].forEach(te),function(){const n=z(F,a("profileLeftColumn"))[0]
N(F,n).forEach(ee)}(),function(){if(!E("highlightPvpProtection"))return
const n=v(`#profileLeftColumn a[href="${L}"]`)
"N/A"!==A(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),_(3,Ot,[e]),jn(),_(3,kn)}function ie(n){n.preventDefault()
const t=on(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${un}?${t}`}export default function(){if(sn())return
const n=v('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=j(z("h1",t)[0]),o=e===an()
ae(n,e,o),function(n){n||rn(v("#profileRightColumn"),"submit",ie)}(o)}
//# sourceMappingURL=profile-7cc2a2bb.js.map
