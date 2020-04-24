import{o as n,p as t,v as e,a$ as o,bZ as a,A as s,n as i,bl as r,a1 as c,R as u,C as f,h as l,i as p,aI as d,bt as m,U as b,l as h,B as g,K as k,g as N,k as C,D as v,S as j,b_ as y,a2 as T,b$ as S,al as B,Z as x,G as D,at as E,c0 as L,b7 as A,a as _,N as M,bK as R,a5 as I,b4 as q,aW as w,c1 as H,bA as G,$ as P,c2 as J,c3 as U,bY as Q,u as W,b6 as O,b as z,c as F,ba as K,c4 as Y,c5 as Z,c6 as V,I as X,J as nn,L as tn,H as en,aH as on,aK as an,aD as sn,z as rn,ad as cn,f as un,ab as fn,Y as ln,O as pn}from"./calfSystem-9b1fa4ca.js"
import{n as dn}from"./numberIsNaN-6f59053c.js"
import"./round-66c1aede.js"
import"./roundToString-ccdc9ea9.js"
import{r as mn,b as bn}from"./render-1a6685c4.js"
import{t as hn}from"./toLowerCase-cb0a8722.js"
import"./createInput-097870f4.js"
import{i as gn}from"./insertTextBeforeEnd-e7900366.js"
import"./onlineDot-ae55259c.js"
import"./batch-71913221.js"
import{c as kn,a as Nn}from"./compressBio-194cf02b.js"
import"./createLabel-9fc35de2.js"
import{c as $n}from"./createTBody-7410a11b.js"
import{c as Cn}from"./createTable-aa7942b1.js"
import{c as vn}from"./createButton-91feba56.js"
import"./dialogMsg-91ed6ec0.js"
import"./closest-75cbef2b.js"
import"./closestTable-435cb4b9.js"
import"./insertHtmlBeforeBegin-efff1a07.js"
import{a as jn}from"./addStatTotalToMouseover-175866fd.js"
import"./all-d7ba558a.js"
import{a as yn}from"./allthen-db530ef8.js"
import{c as Tn}from"./chunk-ace8b419.js"
import{e as Sn,a as Bn,u as xn}from"./useItem-7b4c354b.js"
import"./rnd-d25cad56.js"
import{f as Dn}from"./fetchdata-2e6a81c2.js"
import{j as En}from"./jConfirm-fc91d158.js"
import"./dialog-e9780cd9.js"
import"./ajaxReturnCode-a3777f53.js"
import"./daUseItem-d939d24c.js"
import{r as Ln}from"./replaceDoubleSpace-fe16267e.js"
import{q as An}from"./quickBuffHref-f4a28822.js"
let _n
const Mn=[n=>"A"===n.tagName,n=>Boolean(n.href),n=>n.href.includes("togglesection")]
function Rn(n,t){return t(n)}function In(n){n.hasAttribute("style")?function(n){"block"===n.style.display&&i(n),n.removeAttribute("style")}(n):n.classList.toggle("fshHide")}function qn(n){In(5===Number(a(n.href,"section_id"))?(_n||(_n=s("backpackContainer")),_n):n.parentNode.parentNode.nextElementSibling)}function wn(n){const{target:t}=n;(function(n){return Mn.every(e(Rn,n))})(t)&&(qn(t),o(t.href),n.preventDefault())}function Hn(){return r({subcmd:"loadcomponents"})}let Gn,Pn,Jn
function Un(n,t){return n[t.b]=n[t.b]||{a:t.a,b:t.b,count:0,del:[],v:t.v},n[t.b].count+=1,n[t.b].del.push(t.a),n}function Qn(n,t){return`${n}<tr><td><img src="${d}items/${t.b}.gif" class="fshTblCenter tip-dynamic" data-tipped="fetchitem.php?`+`item_id=${t.b}&inv_id=${t.a}&t=2&p=${m()}&vcode=${t.v}"></td><td>${t.count}</td><td>[<span class="sendLink compDelType" data-compid="${t.b}">Del</span>]</td></tr>`}function Wn(n){const t=$n()
return function(n){Gn=n.r.reduce(Un,{})}(n),p(t,`<tr><td colspan="3">Component Summary</td></tr>${Object.values(Gn).reduce(Qn,"")}`),t}function On(n,t){const e=function(n){const t=n.insertRow(-1)
p(t,"<td>Total:</td>")
const e=t.insertCell(-1)
return e.colSpan=2,e}(n)
l(e,function(n){const t=n.r.length,e=b()
return f(t,e),e}(t)),gn(e,` / ${t.h.cm.toString()}`)}function zn(n,t){if(!u(t.r))return
const e=n.parentNode
e&&(f("",e),l(e,function(n){const t=Cn({className:"fshTblCenter",id:"fshTally"})
return l(t,Wn(n)),On(t,n),t}(t)))}function Fn(n){const t=h(),e=b({className:`sendLink ${hn(n).replace(/ /g,"-")}`,textContent:n})
return g("[",t),l(t,e),p(t,"]"),t}function Kn(n){return function(n){return r({subcmd:"destroycomponent",removeIndex:n})}(n)}function Yn(){if(!Pn){const n=k("inventory-table",s("profileRightColumn"))
2===n.length&&([,Pn]=n)}return Pn}function Zn(n,t){return n[t.dataset.tipped.match(C)[2]]=t.parentNode.parentNode,n}function Vn(n,t){n[t]&&f("",n[t])}function Xn(n){n.forEach(e(Vn,function(){if(!Jn){const n=N("img",Yn())
Jn=n.reduce(Zn,{})}return Jn}()))}function nt(n){const t=Yn().parentNode
if(!t)return
const e=t.children[2].children[1].children[0]
if("TABLE"!==e.tagName)return
const o=e.rows,a=o[o.length-1].cells[1].children[0]
let s=Number(v(a))
s-=n,g(s,a)}function tt(n){n.s&&u(n.r)&&(Xn(n.r),nt(n.r.length))}function et(n){n.parentNode.remove()}function ot(n){return Kn(n).then(tt)}function at(n,t,e){e.s&&(!function(n){const t=j(`#fshTally [data-compid="${n}"]`)
if(!t)return
const e=t.parentNode.parentNode.children[1],o=Number(v(e))-1
g(o,e)}(t),nt(1),n.parentNode&&f("",n.parentNode))}const st=["Enable Quick Del","Count Components","Quick Extract Components"]
function it(n,t){return l(n,Fn(t)),n}function rt(n){p(n.parentNode.parentNode,'<span class="compDelBtn">Del</span>')}const ct=[["quick-extract-components",function(){c("components","insertQuickExtract"),T(S)}],["enable-quick-del",function(n){c("components","enableDelComponent")
const t=n.parentNode
i(t)
const e=t.parentNode
l(e,Fn("Delete All Visible")),N("img",Yn()).forEach(rt)}],["delete-all-visible",function(n){c("components","delAllComponent")
const t=n.parentNode.parentNode.parentNode.children[0]
B("compDelBtn",t).forEach(x)}],["compDelBtn",function(n){const{tipped:t}=n.parentNode.children[0].children[0].dataset,o=t.match(C),a=o[1]
Kn([o[2]]).then(Sn).then(e(at,n,a))}],["count-components",function(n){c("components","countComponent"),Hn().then(e(zn,n))}],["compDelType",function(n){const t=Gn[n.dataset.compid].del,o=n.parentNode
!function(n){f("",n),n.className="guildTagSpinner",n.style.backgroundImage=`url('${d}ui/misc/spinner.gif')`}(o)
const a=Tn(30,t).map(ot)
yn(a,e(et,o))}]]
function ut(t){const e=t.parentNode
l(e,st.reduce(it,h({className:"fshCenter"}))),n(e,y(ct))}let ft
function lt(n,t){(n=>n&&n.response&&0===n.response.response)(t)&&f("",n.parentNode)}function pt(n){c("profile","doDebuff"),(n=>Dn({a:22,id:n}))(n.href.match(/(\d+)$/)[1]).then(Sn).then(e(lt,n))}function dt(n){ft?pt(n):function(n){const t=n.getAttribute("onclick").match(/Are you sure you wish to remove the .* skill\?/)[0]
En("Remove Skill",t,e(pt,n))}(n)}function mt(n){let t=n.target
if("IMG"===t.tagName)E(n.target),t=t.parentNode
else if("A"!==t.tagName)return
n.stopPropagation(),n.preventDefault(),dt(t)}function bt(n,t){return t.a===n}function ht(n,t){0===t.r?(!function(n,t){const o=n.srcData.findIndex(e(bt,Number(t)));-1!==o&&n.srcData.splice(o,1)}(n[0],n[3]),n[2].classList.remove("fshSpinner"),f(`<span class="fastWorn">${n[1]}</span>`,n[2].parentNode)):n[2].remove()}function gt(n,t,o,a){c("profile",`fastAction - ${a}`)
const{target:s}=t,i=s.parentNode.parentNode.children[0].dataset.inv
g("",s),s.className="fastAction fshSpinner fshSpinner12",o(i).then(e(ht,[n,a,s,i]))}function kt(n,t){t.target.classList.contains("fastWear")&&gt(n,t,Bn,"Worn"),t.target.classList.contains("fastUse")&&gt(n,t,xn,"Used")}function Nt(n){return n?"Use":"Wear"}function $t(n,t){const e=t.classList.contains("backpackContextMenuUsable"),o=h({className:"fastDiv",innerHTML:`<span class="sendLink fastAction ${a=e,a?"fastUse":"fastWear"}">${Nt(e)}</span>`})
var a
n.options.checkboxesEnabled&&l(o,t.parentNode.nextElementSibling.nextElementSibling),l(t.parentNode.parentNode,o)}function Ct(n){M(`#backpackTab_${n.type.toString()} .backpackContextMenuEquippable,.backpackContextMenuUsable`).forEach(e($t,n))}function vt(n,t){const e=`${d}ui/misc/${t}.png`
n.src!==e&&(n.src=e)}function jt(n,t){t.dataset.folder===n?vt(t,"folder_on"):vt(t,"folder")}function yt(t,o){const a=o._showPage
o._showPage=function(n,t){o.tabData&&(!function(n){M(".backpackFolderImage").forEach(e(jt,String(n.folderId)))}(o),a.call(o,n,t),Ct(o))},0!==v(s("backpack_current")).length&&_(3,Ct,[o]),n(t,e(kt,o))}function Tt(){D("enableQuickDrink")&&(function(){const n=s("backpack")
n.className="fshBackpack",n.removeAttribute("style")}(),function(){const n=s("backpackContainer"),t=$(n).data("hcsBackpack")
t&&yt(n,t)}())}function St(n){return function(n){return r({subcmd:"unequipitem",inventory_id:n})}(n)}let Bt,xt,Dt
function Et(n,t){t.s&&f("",n.parentNode)}function Lt(n){const t=/inventory_id=(\d+)/.exec(n.href)[1]
t&&St(t).then(e(Et,n))}function At(){c("profile","nekidBtn")
const n=Bt.nextElementSibling
N("a",n).forEach(Lt)}function _t(){const t=s("profileRightColumn")
Bt=s("profileCombatSetDiv")
const e=Bt.parentNode.nextElementSibling,o=function(){const t=h({className:"fshCenter"}),e=vn({className:"fshBl fshBls",textContent:"Nekid"})
return gn(t,"[ "),l(t,e),gn(t," ]"),n(e,At),t}()
t.replaceChild(o,e)}const Mt=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],Rt=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function It(n){const t=w(n)
return t?t.map(Ln).map(hn):[]}function qt(n){return[It(n[0]),n[1]]}function wt(n,t){return t[0].includes(n)}function Ht(n){const t=Rt.map(qt),o=Ln(hn(n)),a=t.find(e(wt,o))
if(a)return a[1]}function Gt(n){return xt=function(n){const t=/guild_id=([0-9]+)/i.exec(n.href)
if(t)return Number(t[1])}(n),xt&&xt===q()?(I("guildSelf",v(n)),"self"):Ht(v(n))}function Pt(n){return n[0]===Dt}function Jt(n){Dt=Gt(n),Dt&&function(n){const t=Mt.find(Pt)
n.parentNode.classList.add(t[1]),p(n.parentNode,`<br>${D(t[2])}`)}(n)}function Ut(n,t,e){let o='<div align="center">'
o+=`<a class="quickButton buttonQuickBuff tip-static fshQuickBuff" ${An(t)}data-tipped="Buff ${e}"></a>&nbsp;&nbsp;`,o+=function(){if(!D("enableMaxGroupSizeToJoin"))return'<a class="quickButton buttonJoinAll tip-static fshJoin" '+`href="${J}" `+'data-tipped="Join All Groups"></a>&nbsp;&nbsp;'
const n=D("maxGroupSizeToJoin")
return`<a class="quickButton buttonJoinUnder tip-static fshJoin" href="${U}" data-tipped="Join All Groups < ${n} Members"></a>&nbsp;&nbsp;`}(),o+='<a class="quickButton tip-static fshGold" '+`href="${H}&type=-3&tid=${t}" data-tipped="Go to ${e}'s auctions"></a>&nbsp;&nbsp;`,o+=`<a class="quickButton tip-static fshTempleTwo" href="${G}${e}" data-tipped="Create Secure Trade to ${e}"></a>&nbsp;&nbsp;`,o+=function(n){return"self"===Dt?`<a class="quickButton tip-static fshTempleThree" href="${Q}${n}" data-tipped="Recall items from ${n}"></a>&nbsp;&nbsp;`:""}(e),o+=function(n,t){return"self"===Dt&&D("showAdmin")?`<a class="quickButton buttonGuildRank tip-static" href="${W}members&subcmd2=changerank&member_id=${n}" data-tipped="Rank ${t}" style="background-image: url('${d}guilds/${xt}_mini.png');"></a>&nbsp;&nbsp;`:""}(t,e),o+="</div>",P(n,o)}function Qt(n,t){const e=t.parentNode,o=z(F,e.nextElementSibling).length-1
p(e,`<span class="fshBlue">&nbsp;${o.toString()}${function(n,t){return t&&t>=n?`/${t}`:""}(o,D(function(n){return n?"alliestotal":"enemiestotal"}(n)))}</span>`)}function Wt(n){return function(n){return n&&D("renderSelfBio")}(n)||function(n){return!n&&D("renderOtherBios")}(n)}function Ot(n,t){Wt(n)&&function(n){let t=n.innerHTML
t=mn(t),t&&f(t,n)}(t)}function zt(t){const e=s("profile-bio")
e&&(Ot(t,e),D("enableBioCompressor")&&_(3,kn,[e]),n(e,bn))}function Ft(){c("profile","insertQuickWear"),T(Y)}function Kt(){const n=s("backpack_tabs"),t=k("tab-selected",n)[0].getAttribute("data-type")
let e=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const o=M(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
o.length>0&&(e=o),e.forEach(x)}function Yt(){const n=parseInt(v(s(V)),10)
!function(n){return X(nn(k(tn)))===n}(n)?I(en,n):I(en,"")}function Zt(n){return an(n.childNodes).filter(n=>3===n.nodeType).map(A).join("")}function Vt(n,t){const e=Number(Zt(s(sn))),o=n.dataset.tipped,a=function(n,t){const e=/\(Level: (\d+)\)/.exec(t),o=Number(e[1])
return Math.floor(n*o*.0025)}(t,o)
n.dataset.tipped=`${o.slice(0,-15)}<br>Attack: ${(t-a).toString()}&nbsp;&nbsp;Defense: ${(e+a).toString()}</center></div>`}function Xt(){const n=j('#profileRightColumn img[src$="/60.png"]')
n&&function(n){const t=s(on)
if(!t)return
const e=Number(Zt(t))
dn(e)||Vt(n,e)}(n)}function ne(n){const t=z("td",n)
f(`<span id="${t[0].id}">${t[0].innerHTML.replace(/&nbsp;/g," ").trim()}</span> `+`<div class="profile-stat-bonus">${v(t[1])}</div>`,n.parentNode)}function te(o){o&&(!function(){const t=s("profileRightColumn")
t&&(ft=D("disableDeactivatePrompts"),n(t.lastElementChild,mt,!0))}(),function(){const n=M("#profileLeftColumn strong")
n.filter(O("Allies")).forEach(e(Qt,!0)),n.filter(O("Enemies")).forEach(e(Qt,!1))}(),Tt(),function(){const n=Yn()
n&&ut(n)}(),function(){const t=j(`#profileRightColumn a[href="${K}profile&subcmd=togglesection&section_id=2"]`)
if(!t)return
const e=b({innerHTML:"&nbsp;["}),o=b({className:"sendLink",innerHTML:"Quick&nbsp;Wear"})
l(e,o),gn(e,"]"),l(t.parentNode,e),n(o,Ft)}(),function(){const t=j(`#profileRightColumn a[href="${Z}"]`)
if(!t)return
const e=b({className:"smallLink",textContent:"All"})
n(e,Kt)
const o=b({innerHTML:"[&nbsp;"})
l(o,e),p(o,"&nbsp;]&nbsp;"),l(t.parentNode,o)}(),Yt(),_t(),n(t,wn))}function ee(n,t,e){!function(n){const t=j(`#pCC a[href^="${R}"]`)
t?Jt(t):n&&I("guildSelf","")}(e),Ut(n,fn(ln("player_id"),m()),t)}function oe(n,t,e){te(e),ee(n,t,e),Xt(),function(){const n=z(F,s("profileLeftColumn"))[0]
N(F,n).forEach(ne)}(),function(){if(!D("highlightPvpProtection"))return
const n=j(`#profileLeftColumn a[href="${L}"]`)
"N/A"!==A(n.parentNode.nextSibling)&&(n.parentNode.parentNode.style.cssText="border: 3px solid red")}(),_(3,zt,[e]),jn(),_(3,Nn)}function ae(n){n.preventDefault()
const t=an(n.target.closest("form").elements).filter(n=>"submit"!==n.type).map(n=>`${n.name}=${n.value}`).join("&")
window.location=`${pn}?${t}`}export default function(){if(rn())return
const n=j('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!n)return
const e=v(z("h1",t)[0]),o=e===cn()
oe(n,e,o),function(n){n||un(j("#profileRightColumn"),"submit",ae)}(o)}
//# sourceMappingURL=profile-aac87026.js.map
