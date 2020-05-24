import{o as n,p as t,u as e,a_ as o,bY as a,z as s,m as i,bk as r,a0 as c,Q as f,B as u,f as l,i as p,aH as d,bs as m,T as b,k as h,A as g,J as k,g as N,h as C,C as j,R as v,bZ as y,a1 as T,b_ as S,ak as B,Y as x,F as E,as as D,b$ as L,b6 as _,a as A,M,bJ as R,a4 as q,b3 as I,aV as w,c0 as H,bz as J,_ as G,c1 as P,c2 as Q,bX as U,s as W,b5 as z,b as F,d as O,b9 as V,c3 as X,c4 as Y,c5 as K,H as Z,I as nn,K as tn,G as en,aJ as on,y as an,ac as sn,e as rn,aa as cn,X as fn,N as un}from"./calfSystem-d96a3efd.js"
import{n as ln}from"./numberIsNaN-5b8bfc11.js"
import"./round-0cc3c134.js"
import"./roundToString-372e64d2.js"
import{r as pn,b as dn}from"./render-2dfa221a.js"
import{t as mn}from"./toLowerCase-a0540d2c.js"
import"./createInput-2717f905.js"
import{i as bn}from"./insertTextBeforeEnd-4a698b23.js"
import"./onlineDot-17edd2c6.js"
import{s as hn}from"./setTipped-906b0642.js"
import"./batch-cdb16fc8.js"
import{c as gn,a as kn}from"./compressBio-9800c306.js"
import"./createLabel-30fdcb3b.js"
import{c as Nn}from"./createTBody-f70881cb.js"
import{c as $n}from"./createTable-13920811.js"
import{c as Cn}from"./createButton-e6d20fb1.js"
import"./dialogMsg-da77a98e.js"
import"./closest-f6c323ce.js"
import"./closestTable-2bbeb9ce.js"
import"./insertHtmlBeforeBegin-449d0625.js"
import{a as jn}from"./addStatTotalToMouseover-d77e3128.js"
import"./all-a5e007ad.js"
import{a as vn}from"./allthen-182523ad.js"
import{c as yn}from"./chunk-77a11107.js"
import{e as Tn}from"./errorDialog-70b04a3c.js"
import"./rnd-7b78c248.js"
import{f as Sn}from"./fetchdata-34c92592.js"
import{j as Bn}from"./jConfirm-ad7882ae.js"
import"./dialog-62f3abd8.js"
import{e as xn,u as En}from"./useItem-d0013989.js"
import"./ajaxReturnCode-2df80530.js"
import"./daUseItem-4a0793b9.js"
import{r as Dn}from"./replaceDoubleSpace-712a985e.js"
import{q as Ln}from"./quickBuffHref-27f89c10.js"
let _n
const An=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function Mn(n,t){return t(n)}function Rn(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function qn(n){Rn(5===Number(a(n.href,"section_id"))?(_n||(_n=s("backpackContainer")),_n):n.parentNode.parentNode.nextElementSibling)}function In(n){const{target:t}=n;(function(n){return An.every(e(Mn,n))})(t)&&(qn(t),o(t.href),n.preventDefault())}function wn(){return r({subcmd:"loadcomponents"})}let Hn,Jn,Gn
function Pn(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Qn(n,t){return`${n}<tr><td><img src="${d}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?item_id=${t.b}&inv_id=${t.a}&t=2&p=${m()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Un(n){const t=Nn()
return function(n){Hn=n.r.reduce(Pn,{})}(n),p(t,'<tr><td colspan="3">Component Summary</td></tr>'+Object.values(Hn).reduce(Qn,"")),t}function Wn(n,t){const e=function(n){const t=n.insertRow(-1)
p(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
l(e,function(n){const t=n.r.length,e=b()
return u(t,e),e}(t)),bn(e," / "+t.h.cm.toString())}function zn(n,t){if(!f(t.r))return
const e=n.parentNode
e&&(u("",e),l(e,function(n){const t=$n({className:"fshTblCenter",id:"fshTally"})
return l(t,Un(n)),Wn(t,n),t}(t)))}function Fn(n){const t=h(),e=b({className:"sendLink "+mn(n).replace(/ /g,"-"),textContent:n})
return g("[",t),l(t,e),p(t,"]"),t}function On(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Vn(){if(!Jn){const n=k("inventory-table",s("profileRightColumn"))
2===n.length&&([,Jn]=n)}return Jn}function Xn(n,t){return n[t.dataset.tipped.match(C)[2]]=t.parentNode.parentNode,n}function Yn(n,t){n[t]&&u("",n[t])}function Kn(n){n.forEach(e(Yn,function(){if(!Gn){const n=N("img",Vn())
Gn=n.reduce(Xn,{})}return Gn}()))}function Zn(n){const t=Vn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(j(a))
s-=n,g(s,a)}function nt(n){n.s&&f(n.r)&&(Kn(n.r),Zn(n.r.length))}function tt(n){n.parentNode.remove()}function et(n){return On(n).then(nt)}function ot(n,t,e){e.s&&(!function(n){const t=v(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(j(e))-1
g(o,e)}(t),Zn(1),n.parentNode&&u("",n.parentNode))}const at=["Enable Quick Del","Count Components","Quick Extract Components"]
function st(n,t){return l(n,Fn(t)),n}function it(n){p(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const rt=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(S)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
l(e,Fn("Delete All Visible")),N("img",Vn()).forEach(it)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
B("compDelBtn",t).forEach(x)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(C),a=o[1]
On([o[2]]).then(Tn).then(e(ot,n,a))}],["count-components",function(n){c("components","countComponent"),wn().then(e(zn,n))}],["compDelType",function(n){const t=Hn[n.dataset.compid].del,o=n.parentNode
!function(n){u("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${d}ui/misc/spinner.gif')`}(o)
const a=yn(30,t).map(et)
vn(a,e(tt,o))}]]
function ct(t){const e=t.parentNode
l(e,at.reduce(st,h({className:"fshCenter"}))),n(e,y(rt))}let ft
function ut(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&u("",n.parentNode)}function lt(n){c("profile","doDebuff");(n=>Sn({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(Tn).then(e(ut,n))}function pt(n){ft?lt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
Bn("Remove Skill",t,e(lt,n))}(n)}function dt(n){let t=n.target
if("IMG"===t.tagName)D(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),pt(t)}function mt(n,t){return t.a===n}function bt(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(mt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),u(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function ht(n,t,o,a){c("profile","fastAction - "+a)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
g("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(bt,[n,a,s,i]))}function gt(n,t){t.target.classList.contains("fastWear")&&ht(n,t,xn,"Worn"),t.target.classList.contains("fastUse")&&ht(n,t,En,"Used")}function kt(n){return n?"Use":"Wear"}function Nt(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=h({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${kt(e)}</span>`})
var a
n.options.checkboxesEnabled&&l(o,t.parentNode.nextElementSibling.nextElementSibling),l(t.parentNode.parentNode,o)}function $t(n){M(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e(Nt,n))}function Ct(n,t){const e=`${d}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?Ct(t,"folder_on"):Ct(t,"folder")}function vt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){M(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),$t(o))},0!==j(s("backpack_current")).length&&A(3,$t,[o]),n(t,e(gt,o))}function yt(){E("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&vt(n,t)}())}function Tt(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let St,Bt,xt
function Et(n,t){t.s&&u("",n.parentNode)}function Dt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&Tt(t).then(e(Et,n))}function Lt(){c("profile","nekidBtn")
const n=St.nextElementSibling
N("a",n).forEach(Dt)}function _t(){const t=s("profileRightColumn")
St=s("profileCombatSetDiv")
const e=St.parentNode.nextElementSibling,o=function(){const t=h({className:"fshCenter"}),e=Cn({className:"fshBl fshBls",textContent:"Nekid"})
return bn(t,"[ "),l(t,e),bn(t," ]"),n(e,Lt),t}()
t.replaceChild(o,e)}const At=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Mt=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function Rt(n){const t=w(n)
return t?t.map(Dn).map(mn):[]}function qt(n){return[Rt(n[0]),n[1]]}function It(n,t){return t[0].includes(n)}function wt(n){const t=Mt.map(qt),o=Dn(mn(n)),a=t.find(e(It,o))
if(a)return a[1]}function Ht(n){return Bt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),Bt&&Bt===I()?(q("guildSelf",j(n)),"self"):wt(j(n))}function Jt(n){return n[0]===xt}function Gt(n){xt=Ht(n),xt&&function(n){const t=At.find(Jt)
n.parentNode.classList.add(t[1]),p(n.parentNode,"<br>"+E(t[2]))}(n)}function Pt(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${Ln(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!E("enableMaxGroupSizeToJoin"))return`<a class="quickButton buttonJoinAll tip-static fshJoin" href="${P}" data-tipped="Join All Groups"></a>&nbsp;&nbsp;`
const n=E("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${Q}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+=`<a class="quickButton tip-static fshGold" href="${H}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${J}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===xt?`<a class="quickButton tip-static fshTempleThree" href="${U}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===xt&&E("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${W}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${d}guilds/${Bt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",G(n,o)}function Qt(n,t){const e=t.parentNode,o=F(O,e.nextElementSibling).length-1
p(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?"/"+t:""}(o,E(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Ut(n){return function(n){return n&&E("renderSelfBio")}(n)||function(n){return!n&&E("renderOtherBios")}(n)}function Wt(n,t){Ut(n)&&function(n){let t=n.innerHTML
t=pn(t),t&&u(t,n)}(t)}function zt(t){const e=s("profile-bio")
e&&(Wt(t,e),E("enableBioCompressor")&&A(3,gn,[e]),n(e,dn))}function Ft(){c("profile","insertQuickWear"),T(X)}function Ot(){const n=s("backpack_tabs"),t=k("tab-selected",n)[0].getAttribute("data-type")
let e=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(x)}function Vt(){const n=parseInt(j(s(K)),10)
!function(n){return Z(nn(k(tn)))===n}(n)?q(en,n):q(en,"")}const Xt=98,Yt=85,Kt=60
function Zt(n){return Number(on(s("stat-"+n.toLowerCase()).childNodes).filter(n=>3===n.nodeType).map(_).join(""))}function ne(n){const t=h({innerHTML:n.dataset.tipped}),e=N("b",t).map(n=>_(n)),o=Zt(e[2])
ln(o)||function(n,t,e){const o=Zt(t[3]),a=Math.floor(e*(Number(t[1].replace(/[+%]/g,""))/100))
hn(n.dataset.tipped.replace("</center></div>",`<br>Buff Effect: ${String(a)}<br>${t[2]}: ${String(e-a)}&nbsp;&nbsp;${t[3]}: ${String(o+a)}$&`),n)}(n,e,o)}function te(n){const t=v(`#profileRightColumn img[src$="/${String(n)}.png"]`)
t&&ne(t)}function ee(n){const t=F("td",n)
u(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> <div class="profile-stat-bonus">${j(t[1])}</div>`,n.parentNode)}function oe(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ft=E("disableDeactivatePrompts"),n(t.lastElementChild,dt,!0))}(),function(){const n=M("#profileLeftColumn strong")
n.filter(z("Allies")).forEach(e(Qt,!0)),n.filter(z("Enemies")).forEach(e(Qt,!1))}(),yt(),function(){const n=Vn()
n&&ct(n)}(),function(){const t=v(`#profileRightColumn a[href="${V}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=b({innerHTML:"&nbsp;["}),o=b({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
l(e,o),bn(e,"]"),l(t.parentNode,e),n(o,Ft)}(),function(){const t=v(`#profileRightColumn a[href="${Y}"]`)
if(!t)return
const e=b({className:"smallLink",textContent:"All"})
n(e,Ot)
const o=b({innerHTML:"[&nbsp;"})
l(o,e),p(o,"&nbsp;]&nbsp;"),l(t.parentNode,o)}(),Vt(),_t(),n(t,In))}function ae(n,t,e){!function(n){const t=v(`#pCC a[href^="${R}"]`)
t?Gt(t):n&&q("guildSelf","")}(e)
Pt(n,cn(fn("player_id"),m()),t)}function se(n,t,e){oe(e),ae(n,t,e),[Xt,Yt,Kt].forEach(te),function(){const n=F(O,s("profileLeftColumn"))[0]
N(O,n).forEach(ee)}(),function(){if(!E("highlightPvpProtection"))return
const n=v(`#profileLeftColumn a[href="${L}"]`)
"N/A"!==_(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),A(3,zt,[e]),jn(),A(3,kn)}function ie(n){n.preventDefault()
const t=on(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${un}?${t}`}export default function(){if(an())return
const n=v('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=j(F("h1",t)[0]),o=e===sn()
se(n,e,o),function(n){n||rn(v("#profileRightColumn"),"submit",ie)}(o)}
//# sourceMappingURL=profile-b0bc6d87.js.map
