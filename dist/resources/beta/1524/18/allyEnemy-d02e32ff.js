import{s as e,Q as t,$ as n,c as i,be as s,bd as a,w as o,a as l,k as c,i as f,bT as r,o as d,a0 as u,bv as m,x as p,z as h,A as b}from"./calfSystem-4197cc22.js"
import"./playerName-8ec525d6.js"
import"./fshOpen-e5d8c136.js"
import{o as y}from"./openQuickBuffByName-d8a01295.js"
import"./idb-f3252f63.js"
import"./insertElementBefore-fe70cd72.js"
import{i as g}from"./insertElementAfterBegin-aa3c6e65.js"
import{g as j}from"./getArrayByClassName-22badefd.js"
import"./indexAjaxJson-914501b6.js"
import"./cmdExport-ccb93370.js"
import"./outputFormat-17a9e7be.js"
import"./splitTime-7907aed0.js"
import{f as $}from"./formatLastActivity-1d8ce8de.js"
import"./getProfile-92484501.js"
import{m as k}from"./myStats-1e0221a4.js"
const v=[[e=>e<120,"fshDodgerBlue","fshRed"],[e=>e<300,"fshDodgerBlue","fshRed"],[()=>!0,"fshPowderBlue","fshPink"]]
function x(e,n){return n[0](t-e)}function E(t,i){return`<a class="player-name tip-static ${function(t,n){const i=v.find(e(x,t))
return i?function(e,t){return e?t[1]:t[2]}(n,i):"fshWhite"}(t.last_login,i)}" data-tipped="<b>${t.username}</b><br><table><tbody><tr><td>Level:</td><td>${t.level}</td></tr><tr><td>Last Activity:</td><td>${$(t.last_login)}</td></tr></tbody></table>" href="${n}${t.id}">${t.username}</a>`}function B(e){return t-e.last_login<1800}function S(e,t){return`<li class="player"><div class="player-row">${i.hideBuffSelected?"":'<span class="enemy-buff-check-on"></span>'}${E(t,e)}</div><div class="guild-minibox-actions">${i.hideGuildInfoMessage?"":'<span class="enemy-send-message guild-icon left guild-minibox-action tip-static" data-tipped="Send Message"></span>'}${i.hideGuildInfoBuff?"":'<span class="enemy-quickbuff guild-icon left guild-minibox-action tip-static" data-tipped="Quick Buff"></span>'}${function(e){return i.hideGuildInfoSecureTrade?"":`<a class="enemy-secure-trade guild-icon left guild-minibox-action tip-static" href="${s}${e.username}" data-tipped="Secure Trade"></a>`}(t)}${function(e){return i.hideGuildInfoTrade?"":`<a class="enemy-trade guild-icon left guild-minibox-action tip-static" href="${a}${e.username}" data-tipped="Send Gold/Items/FSP"></a>`}(t)}</div></li>`}function L(t,n){return t.filter(B).map(e(S,n)).join("")}const A=[(e,t)=>e.length+t.length,(e,t)=>{if(!i.enableAllyOnlineList)return t.length},e=>{if(!i.enableEnemyOnlineList)return e.length}]
function C(e,t,n){return 0===n(e,t)}function N(t){const n=u(t._allies,[]),s=u(t._enemies,[]);(function(t,n){return A.every(e(C,t,n))})(n,s)||function(e,t){let n=""
i.enableAllyOnlineList&&(n+=L(e,!0)),i.enableEnemyOnlineList&&(n+=L(t,!1))
const s=p("fshContactList")
h("",s),f(s,n)}(n,s)}function O(e){e.classList.toggle("enemy-buff-check-on"),e.classList.toggle("enemy-buff-check-off")}const w=[["enemy-buff-check-on",O],["enemy-buff-check-off",O],["enemy-send-message",function(e){window.openQuickMsgDialog(b(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quickbuff",function(e){y(b(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quick-buff",function(){const e=j("enemy-buff-check-on",p("fshContactList")).map(e=>b(e.nextElementSibling))
y(e.join())}]]
function G(e){const{target:t}=e
"fshResetEnemy"!==t.id?m(w)(e):k(!0).then(N)}function I(e){const t=c({id:"fshAllyEnemy",className:"minibox"})
let n='<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4><div id="minibox-enemy"><ul id="fshContactList"></ul>'
i.hideBuffSelected||(n+='<ul class="enemy-quick-buff">Quick Buff Selected</ul>'),n+="</div></div>",f(t,n),g(r,t),d(t,G),N(e)}function Q(e){e&&l(3,I,[e])}export default function(){o()||k(!1).then(Q)}
//# sourceMappingURL=allyEnemy-d02e32ff.js.map
