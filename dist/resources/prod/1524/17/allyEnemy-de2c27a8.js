import{s as e,Q as t,$ as n,c as i,bb as s,ba as a,w as o,a as l,k as f,i as c,bO as r,o as u,a0 as d,bp as m,x as p,z as b,A as h}from"./calfSystem-dec5e071.js"
import"./playerName-aa4fbcf3.js"
import"./fshOpen-eee4440e.js"
import{o as y}from"./openQuickBuffByName-71c2a436.js"
import"./idb-8fe34e30.js"
import"./insertElementBefore-1d764477.js"
import{i as g}from"./insertElementAfterBegin-80cc8c86.js"
import{g as $}from"./getArrayByClassName-82011e34.js"
import"./indexAjaxJson-ecf8d1f5.js"
import"./cmdExport-965d881b.js"
import"./outputFormat-e7a445b0.js"
import{f as j}from"./formatLastActivity-199986c2.js"
import"./getProfile-f1e3acc1.js"
import{m as k}from"./myStats-6490dbe4.js"
const v=[[e=>e<120,"fshDodgerBlue","fshRed"],[e=>e<300,"fshDodgerBlue","fshRed"],[()=>!0,"fshPowderBlue","fshPink"]]
function x(e,n){return n[0](t-e)}function E(t,i){return`<a class="player-name tip-static ${function(t,n){const i=v.find(e(x,t))
return i?function(e,t){return e?t[1]:t[2]}(n,i):"fshWhite"}(t.last_login,i)}" data-tipped="<b>${t.username}</b><br><table><tbody><tr><td>Level:</td><td>${t.level}</td></tr><tr><td>Last Activity:</td><td>${j(t.last_login)}</td></tr></tbody></table>" href="${n}${t.id}">${t.username}</a>`}function B(e){return t-e.last_login<1800}function S(e,t){return`<li class="player"><div class="player-row">${i.hideBuffSelected?"":'<span class="enemy-buff-check-on"></span>'}${E(t,e)}</div><div class="guild-minibox-actions">${i.hideGuildInfoMessage?"":'<span class="enemy-send-message guild-icon left guild-minibox-action tip-static" data-tipped="Send Message"></span>'}${i.hideGuildInfoBuff?"":'<span class="enemy-quickbuff guild-icon left guild-minibox-action tip-static" data-tipped="Quick Buff"></span>'}${function(e){return i.hideGuildInfoSecureTrade?"":`<a class="enemy-secure-trade guild-icon left guild-minibox-action tip-static" href="${s}${e.username}" data-tipped="Secure Trade"></a>`}(t)}${function(e){return i.hideGuildInfoTrade?"":`<a class="enemy-trade guild-icon left guild-minibox-action tip-static" href="${a}${e.username}" data-tipped="Send Gold/Items/FSP"></a>`}(t)}</div></li>`}function L(t,n){return t.filter(B).map(e(S,n)).join("")}const A=[(e,t)=>e.length+t.length,(e,t)=>{if(!i.enableAllyOnlineList)return t.length},e=>{if(!i.enableEnemyOnlineList)return e.length}]
function C(e,t,n){return 0===n(e,t)}function O(t){const n=d(t._allies,[]),s=d(t._enemies,[]);(function(t,n){return A.every(e(C,t,n))})(n,s)||function(e,t){let n=""
i.enableAllyOnlineList&&(n+=L(e,!0)),i.enableEnemyOnlineList&&(n+=L(t,!1))
const s=p("fshContactList")
b("",s),c(s,n)}(n,s)}function N(e){e.classList.toggle("enemy-buff-check-on"),e.classList.toggle("enemy-buff-check-off")}const w=[["enemy-buff-check-on",N],["enemy-buff-check-off",N],["enemy-send-message",function(e){window.openQuickMsgDialog(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quickbuff",function(e){y(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quick-buff",function(){const e=$("enemy-buff-check-on",p("fshContactList")).map(e=>h(e.nextElementSibling))
y(e.join())}]]
function G(e){const{target:t}=e
"fshResetEnemy"!==t.id?m(w)(e):k(!0).then(O)}function I(e){const t=f({id:"fshAllyEnemy",className:"minibox"})
let n='<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4><div id="minibox-enemy"><ul id="fshContactList"></ul>'
i.hideBuffSelected||(n+='<ul class="enemy-quick-buff">Quick Buff Selected</ul>'),n+="</div></div>",c(t,n),g(r,t),u(t,G),O(e)}function Q(e){e&&l(3,I,[e])}export default function(){o()||k(!1).then(Q)}
//# sourceMappingURL=allyEnemy-de2c27a8.js.map
