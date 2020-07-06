import{t as e,S as t,a1 as n,c as i,bd as s,bc as a,x as o,a as l,m as f,i as c,bO as r,o as u,a2 as d,bQ as m,y as p,A as b,B as h}from"./calfSystem-34fcd691.js"
import"./playerName-d0ea3aa5.js"
import"./insertElementBefore-f1fdb06b.js"
import"./fshOpen-ee221b8b.js"
import{o as y}from"./openQuickBuffByName-f52e13a3.js"
import"./idb-62d2605f.js"
import{i as g}from"./insertElementAfterBegin-e1b4401b.js"
import"./indexAjaxJson-951ebca2.js"
import"./cmdExport-963c885b.js"
import{g as j}from"./getArrayByClassName-674a825f.js"
import"./outputFormat-989c4647.js"
import"./splitTime-3bc21465.js"
import{f as $}from"./formatLastActivity-7a763dd4.js"
import"./getProfile-5811c437.js"
import{m as k}from"./myStats-f933dc68.js"
const v=[[e=>e<120,"fshDodgerBlue","fshRed"],[e=>e<300,"fshDodgerBlue","fshRed"],[()=>!0,"fshPowderBlue","fshPink"]]
function x(e,n){return n[0](t-e)}function B(t,i){return`<a class="player-name tip-static ${function(t,n){const i=v.find(e(x,t))
return i?function(e,t){return e?t[1]:t[2]}(n,i):"fshWhite"}(t.last_login,i)}" data-tipped="<b>${t.username}</b><br><table><tbody><tr><td>Level:</td><td>${t.level}</td></tr><tr><td>Last Activity:</td><td>${$(t.last_login)}</td></tr></tbody></table>" href="${n}${t.id}">${t.username}</a>`}function E(e){return t-e.last_login<1800}function S(e,t){return`<li class="player"><div class="player-row">${i.hideBuffSelected?"":'<span class="enemy-buff-check-on"></span>'}${B(t,e)}</div><div class="guild-minibox-actions">${i.hideGuildInfoMessage?"":'<span class="enemy-send-message guild-icon left guild-minibox-action tip-static" data-tipped="Send Message"></span>'}${i.hideGuildInfoBuff?"":'<span class="enemy-quickbuff guild-icon left guild-minibox-action tip-static" data-tipped="Quick Buff"></span>'}${function(e){return i.hideGuildInfoSecureTrade?"":`<a class="enemy-secure-trade guild-icon left guild-minibox-action tip-static" href="${s}${e.username}" data-tipped="Secure Trade"></a>`}(t)}${function(e){return i.hideGuildInfoTrade?"":`<a class="enemy-trade guild-icon left guild-minibox-action tip-static" href="${a}${e.username}" data-tipped="Send Gold/Items/FSP"></a>`}(t)}</div></li>`}function L(t,n){return t.filter(E).map(e(S,n)).join("")}const A=[(e,t)=>e.length+t.length,(e,t)=>{if(!i.enableAllyOnlineList)return t.length},e=>{if(!i.enableEnemyOnlineList)return e.length}]
function C(e,t,n){return 0===n(e,t)}function O(t){const n=d(t._allies,[]),s=d(t._enemies,[]);(function(t,n){return A.every(e(C,t,n))})(n,s)||function(e,t){let n=""
i.enableAllyOnlineList&&(n+=L(e,!0)),i.enableEnemyOnlineList&&(n+=L(t,!1))
const s=p("fshContactList")
b("",s),c(s,n)}(n,s)}function N(e){e.classList.toggle("enemy-buff-check-on"),e.classList.toggle("enemy-buff-check-off")}const G=[["enemy-buff-check-on",N],["enemy-buff-check-off",N],["enemy-send-message",function(e){window.openQuickMsgDialog(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quickbuff",function(e){y(h(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quick-buff",function(){const e=j("enemy-buff-check-on",p("fshContactList")).map(e=>h(e.nextElementSibling))
y(e.join())}]]
function I(e){const{target:t}=e
"fshResetEnemy"!==t.id?m(G)(e):k(!0).then(O)}function Q(e){const t=f({id:"fshAllyEnemy",className:"minibox"})
let n='<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4><div id="minibox-enemy"><ul id="fshContactList"></ul>'
i.hideBuffSelected||(n+='<ul class="enemy-quick-buff">Quick Buff Selected</ul>'),n+="</div></div>",c(t,n),g(r,t),u(t,I),O(e)}function R(e){e&&l(3,Q,[e])}export default function(){o()||k(!1).then(R)}
//# sourceMappingURL=allyEnemy-d2c91d26.js.map
