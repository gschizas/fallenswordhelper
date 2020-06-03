import{s as e,R as t,a0 as n,c as i,bj as s,bi as a,w as o,a as f,k as l,i as c,bV as r,o as u,a1 as d,bx as m,x as p,z as b,A as h}from"./calfSystem-f7574730.js"
import"./playerName-b7a62fcc.js"
import"./fshOpen-da8138fa.js"
import{o as y}from"./openQuickBuffByName-811c9a22.js"
import"./idb-14a57c5b.js"
import"./insertElementBefore-b5c9c232.js"
import{i as g}from"./insertElementAfterBegin-5fb4abe9.js"
import{g as j}from"./getArrayByClassName-6077b562.js"
import"./indexAjaxJson-66a839ba.js"
import"./cmdExport-da1f542a.js"
import"./outputFormat-87370a06.js"
import"./splitTime-d77829f1.js"
import{f as $}from"./formatLastActivity-19b48488.js"
import"./getProfile-3530a5f7.js"
import{m as k}from"./myStats-de75fce8.js"
const v=[[e=>e<120,"fshDodgerBlue","fshRed"],[e=>e<300,"fshDodgerBlue","fshRed"],[()=>!0,"fshPowderBlue","fshPink"]]
function x(e,n){return n[0](t-e)}function E(t,i){return`<a class="player-name tip-static ${function(t,n){const i=v.find(e(x,t))
return i?function(e,t){return e?t[1]:t[2]}(n,i):"fshWhite"}(t.last_login,i)}" data-tipped="<b>${t.username}</b><br><table><tbody><tr><td>Level:</td><td>${t.level}</td></tr><tr><td>Last Activity:</td><td>${$(t.last_login)}</td></tr></tbody></table>" href="${n}${t.id}">${t.username}</a>`}function B(e){return t-e.last_login<1800}function S(e,t){return`<li class="player"><div class="player-row">${i.hideBuffSelected?"":'<span class="enemy-buff-check-on"></span>'}${E(t,e)}</div><div class="guild-minibox-actions">${i.hideGuildInfoMessage?"":'<span class="enemy-send-message guild-icon left guild-minibox-action tip-static" data-tipped="Send Message"></span>'}${i.hideGuildInfoBuff?"":'<span class="enemy-quickbuff guild-icon left guild-minibox-action tip-static" data-tipped="Quick Buff"></span>'}${function(e){return i.hideGuildInfoSecureTrade?"":`<a class="enemy-secure-trade guild-icon left guild-minibox-action tip-static" href="${s}${e.username}" data-tipped="Secure Trade"></a>`}(t)}${function(e){return i.hideGuildInfoTrade?"":`<a class="enemy-trade guild-icon left guild-minibox-action tip-static" href="${a}${e.username}" data-tipped="Send Gold/Items/FSP"></a>`}(t)}</div></li>`}function L(t,n){return t.filter(B).map(e(S,n)).join("")}const A=[(e,t)=>e.length+t.length,(e,t)=>{if(!i.enableAllyOnlineList)return t.length},e=>{if(!i.enableEnemyOnlineList)return e.length}]
function C(e,t,n){return 0===n(e,t)}function N(t){const n=d(t._allies,[]),s=d(t._enemies,[]);(function(t,n){return A.every(e(C,t,n))})(n,s)||function(e,t){let n=""
i.enableAllyOnlineList&&(n+=L(e,!0)),i.enableEnemyOnlineList&&(n+=L(t,!1))
const s=p("fshContactList")
b("",s),c(s,n)}(n,s)}function O(e){e.classList.toggle("enemy-buff-check-on"),e.classList.toggle("enemy-buff-check-off")}const R=[["enemy-buff-check-on",O],["enemy-buff-check-off",O],["enemy-send-message",function(e){window.openQuickMsgDialog(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quickbuff",function(e){y(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quick-buff",function(){const e=j("enemy-buff-check-on",p("fshContactList")).map(e=>h(e.nextElementSibling))
y(e.join())}]]
function w(e){const{target:t}=e
"fshResetEnemy"!==t.id?m(R)(e):k(!0).then(N)}function G(e){const t=l({id:"fshAllyEnemy",className:"minibox"})
let n='<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4><div id="minibox-enemy"><ul id="fshContactList"></ul>'
i.hideBuffSelected||(n+='<ul class="enemy-quick-buff">Quick Buff Selected</ul>'),n+="</div></div>",c(t,n),g(r,t),u(t,w),N(e)}function I(e){e&&f(3,G,[e])}export default function(){o()||k(!1).then(I)}
//# sourceMappingURL=allyEnemy-aa2768ee.js.map
