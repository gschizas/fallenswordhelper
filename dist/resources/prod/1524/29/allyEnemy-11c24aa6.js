import{t as e,S as t,a1 as n,c as i,bH as s,bI as a,x as o,a as l,m as f,i as c,bF as r,o as u,a2 as d,bJ as m,y as p,A as b,B as h}from"./calfSystem-57628ebe.js"
import"./playerName-d617838d.js"
import"./insertElementBefore-7e0a7ce8.js"
import"./fshOpen-71b2b356.js"
import{o as y}from"./openQuickBuffByName-4b21bd39.js"
import"./idb-5c863a6f.js"
import{i as g}from"./insertElementAfterBegin-8d3bd0da.js"
import"./indexAjaxJson-676110f0.js"
import"./cmdExport-2dc8f38e.js"
import{g as j}from"./getArrayByClassName-b9f9e51c.js"
import"./outputFormat-f5e04ec1.js"
import{f as $}from"./formatLastActivity-b8322c6a.js"
import"./getProfile-905245f8.js"
import{m as k}from"./myStats-34d3679b.js"
const v=[[e=>e<120,"fshDodgerBlue","fshRed"],[e=>e<300,"fshDodgerBlue","fshRed"],[()=>!0,"fshPowderBlue","fshPink"]]
function x(e,n){return n[0](t-e)}function B(t,i){return`<a class="player-name tip-static ${function(t,n){const i=v.find(e(x,t))
return i?function(e,t){return e?t[1]:t[2]}(n,i):"fshWhite"}(t.last_login,i)}" data-tipped="<b>${t.username}</b><br><table><tbody><tr><td>Level:</td><td>${t.level}</td></tr><tr><td>Last Activity:</td><td>${$(t.last_login)}</td></tr></tbody></table>" href="${n}${t.id}">${t.username}</a>`}function E(e){return t-e.last_login<1800}function S(e,t){return`<li class="player"><div class="player-row">${i.hideBuffSelected?"":'<span class="enemy-buff-check-on"></span>'}${B(t,e)}</div><div class="guild-minibox-actions">${i.hideGuildInfoMessage?"":'<span class="enemy-send-message guild-icon left guild-minibox-action tip-static" data-tipped="Send Message"></span>'}${i.hideGuildInfoBuff?"":'<span class="enemy-quickbuff guild-icon left guild-minibox-action tip-static" data-tipped="Quick Buff"></span>'}${function(e){return i.hideGuildInfoSecureTrade?"":`<a class="enemy-secure-trade guild-icon left guild-minibox-action tip-static" href="${s}${e.username}" data-tipped="Secure Trade"></a>`}(t)}${function(e){return i.hideGuildInfoTrade?"":`<a class="enemy-trade guild-icon left guild-minibox-action tip-static" href="${a}${e.username}" data-tipped="Send Gold/Items/FSP"></a>`}(t)}</div></li>`}function L(t,n){return t.filter(E).map(e(S,n)).join("")}const A=[(e,t)=>e.length+t.length,(e,t)=>{if(!i.enableAllyOnlineList)return t.length},e=>{if(!i.enableEnemyOnlineList)return e.length}]
function C(e,t,n){return 0===n(e,t)}function I(t){const n=d(t._allies,[]),s=d(t._enemies,[]);(function(t,n){return A.every(e(C,t,n))})(n,s)||function(e,t){let n=""
i.enableAllyOnlineList&&(n+=L(e,!0)),i.enableEnemyOnlineList&&(n+=L(t,!1))
const s=p("fshContactList")
b("",s),c(s,n)}(n,s)}function N(e){e.classList.toggle("enemy-buff-check-on"),e.classList.toggle("enemy-buff-check-off")}const O=[["enemy-buff-check-on",N],["enemy-buff-check-off",N],["enemy-send-message",function(e){window.openQuickMsgDialog(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quickbuff",function(e){y(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quick-buff",function(){const e=j("enemy-buff-check-on",p("fshContactList")).map(e=>h(e.nextElementSibling))
y(e.join())}]]
function G(e){const{target:t}=e
"fshResetEnemy"!==t.id?m(O)(e):k(!0).then(I)}function R(e){const t=f({id:"fshAllyEnemy",className:"minibox"})
let n='<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4><div id="minibox-enemy"><ul id="fshContactList"></ul>'
i.hideBuffSelected||(n+='<ul class="enemy-quick-buff">Quick Buff Selected</ul>'),n+="</div></div>",c(t,n),g(r,t),u(t,G),I(e)}function _(e){e&&l(3,R,[e])}function q(){o()||k(!1).then(_)}export default q
//# sourceMappingURL=allyEnemy-11c24aa6.js.map
