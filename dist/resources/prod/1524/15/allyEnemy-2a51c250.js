import{s as e,P as t,_ as n,c as i,bj as s,bi as a,w as o,a as l,k as f,i as c,aX as r,o as u,$ as d,bD as m,x as p,z as h,A as b}from"./calfSystem-740ec4d2.js"
import"./playerName-a172b8d3.js"
import"./fshOpen-78430220.js"
import{o as y}from"./openQuickBuffByName-e399773d.js"
import"./insertElementBefore-d3961941.js"
import{i as g}from"./insertElementAfterBegin-08e27acb.js"
import{g as $}from"./getArrayByClassName-c703ad24.js"
import"./indexAjaxJson-1e1af708.js"
import"./cmdExport-7c541a4f.js"
import"./outputFormat-5edaf4fe.js"
import{f as j}from"./formatLastActivity-00025420.js"
import"./getProfile-b78d4980.js"
import{m as k}from"./myStats-54c00a23.js"
const v=[[e=>e<120,"fshDodgerBlue","fshRed"],[e=>e<300,"fshDodgerBlue","fshRed"],[()=>!0,"fshPowderBlue","fshPink"]]
function x(e,n){return n[0](t-e)}function E(t,i){return`<a class="player-name tip-static ${function(t,n){const i=v.find(e(x,t))
return i?function(e,t){return e?t[1]:t[2]}(n,i):"fshWhite"}(t.last_login,i)}" data-tipped="<b>${t.username}</b><br><table><tbody><tr><td>Level:</td><td>${t.level}</td></tr><tr><td>Last Activity:</td><td>${j(t.last_login)}</td></tr></tbody></table>" href="${n}${t.id}">${t.username}</a>`}function B(e){return t-e.last_login<1800}function S(e,t){return`<li class="player"><div class="player-row">${i.hideBuffSelected?"":'<span class="enemy-buff-check-on"></span>'}${E(t,e)}</div><div class="guild-minibox-actions">${i.hideGuildInfoMessage?"":'<span class="enemy-send-message guild-icon left guild-minibox-action tip-static" data-tipped="Send Message"></span>'}${i.hideGuildInfoBuff?"":'<span class="enemy-quickbuff guild-icon left guild-minibox-action tip-static" data-tipped="Quick Buff"></span>'}${function(e){return i.hideGuildInfoSecureTrade?"":`<a class="enemy-secure-trade guild-icon left guild-minibox-action tip-static" href="${s}${e.username}" data-tipped="Secure Trade"></a>`}(t)}${function(e){return i.hideGuildInfoTrade?"":`<a class="enemy-trade guild-icon left guild-minibox-action tip-static" href="${a}${e.username}" data-tipped="Send Gold/Items/FSP"></a>`}(t)}</div></li>`}function L(t,n){return t.filter(B).map(e(S,n)).join("")}const A=[(e,t)=>e.length+t.length,(e,t)=>{if(!i.enableAllyOnlineList)return t.length},e=>{if(!i.enableEnemyOnlineList)return e.length}]
function C(e,t,n){return 0===n(e,t)}function N(t){const n=d(t._allies,[]),s=d(t._enemies,[]);(function(t,n){return A.every(e(C,t,n))})(n,s)||function(e,t){let n=""
i.enableAllyOnlineList&&(n+=L(e,!0)),i.enableEnemyOnlineList&&(n+=L(t,!1))
const s=p("fshContactList")
h("",s),c(s,n)}(n,s)}function O(e){e.classList.toggle("enemy-buff-check-on"),e.classList.toggle("enemy-buff-check-off")}const _=[["enemy-buff-check-on",O],["enemy-buff-check-off",O],["enemy-send-message",function(e){window.openQuickMsgDialog(b(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quickbuff",function(e){y(b(e.parentNode.previousElementSibling.lastElementChild))}],["enemy-quick-buff",function(){const e=$("enemy-buff-check-on",p("fshContactList")).map(e=>b(e.nextElementSibling))
y(e.join())}]]
function w(e){const{target:t}=e
"fshResetEnemy"!==t.id?m(_)(e):k(!0).then(N)}function G(e){const t=f({id:"fshAllyEnemy",className:"minibox"})
let n='<h3>Allies/Enemies</h3><div class="minibox-content"><h4>Online Contacts <span id="fshResetEnemy">Reset</span></h4><div id="minibox-enemy"><ul id="fshContactList"></ul>'
i.hideBuffSelected||(n+='<ul class="enemy-quick-buff">Quick Buff Selected</ul>'),n+="</div></div>",c(t,n),g(r,t),u(t,w),N(e)}function I(e){e&&l(3,G,[e])}export default function(){o()||k(!1).then(I)}
//# sourceMappingURL=allyEnemy-2a51c250.js.map
