import{e,aT as a,D as t,b4 as s,K as n,C as o,b5 as r,z as i,b6 as c,w as f,S as l,t as u,aS as p,b7 as d,a7 as m,h,m as b,B as g,E as y,i as j,o as w,G as $,M as k,b8 as v,b9 as C,ba as P,bb as _,a3 as L,Y as T,x as B}from"./calfSystem-019de1cf.js"
import"./playerName-569fc693.js"
import{t as x}from"./toLowerCase-dda30e6b.js"
import{a as E}from"./addCommas-8cd7d96d.js"
import{c as S}from"./currentGuildId-a399e8da.js"
import"./fshOpen-ee221b8b.js"
import{o as R}from"./openQuickBuffByName-9757122d.js"
import"./dataRows-a75979ec.js"
import{g as G,s as A}from"./idb-1bb3cee2.js"
import{c as I}from"./createStyle-1cbf3329.js"
import"./closest-5107b89a.js"
import{c as M}from"./closestTr-ad14f34f.js"
import"./indexAjaxJson-d1b1f9ac.js"
import"./cmdExport-ca1fffed.js"
import{c as Y}from"./csvSplit-4ba7a6af.js"
import{i as D}from"./insertHtmlAfterEnd-4e8e25bc.js"
import{p as N}from"./parseDateAsTimestamp-1a852ddf.js"
import{b as q}from"./buffObj-6db8253c.js"
import"./getProfile-88b6b0f8.js"
import{m as z}from"./myStats-8f657323.js"
import{c as H}from"./closestTd-f0f2258b.js"
import{g as Q}from"./getMembrList-cc8f3aea.js"
import"./doBuffLinkClick-8ec31086.js"
import{a as O}from"./addLogColoring-d661b083.js"
let W
async function J(t){return S()&&!W&&(W=async function(){return e(await Q(!1)).filter(([,e])=>a(e)).map(([e])=>e)}()),(await W).includes(t)}const K=e=>n(e.cells[2].children[0]),X=async([e,a])=>[e,a,await J(a)]
function F([e,a]){const t=o('a[href*="=createsecure&"]',e)
D(t,` | <a href="${r}${a}">Attack</a>`)}function U(e){const a=n(H(e).nextElementSibling.children[0])
i("Report",e),D(e,` | <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function V(e){return function(e){return f({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let Z,ee
function ae(e,[a,t]){return"lastCheck"===a||t.logTime&&t.logTime>e}async function te(){const a=await G("fsh_pvpCombat")
if(!a)return{lastCheck:l}
const t=l-86400
return!a.lastCheck||a.lastCheck<t?function(a){const t=l-604800,s=e(a).filter(u(ae,t)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(a):a}async function se(e,a){Z||(Z=te())
const t=await Z
return t[a]&&t[a].logTime?t[a]:async function(e,a,t){const s=await V(a)
if(s&&s.s)return ee||(ee={...t}),ee[a]={...s,logTime:N(n(e.cells[1]))/1e3},A("fsh_pvpCombat",ee),s}(e,a,t)}const ne=e=>o(d,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,a])=>[e,a,await se(e,/combat_id=(\d+)/.exec(a)[1])]
function ie(e,a,t){return 0!==e?`${a}:<span class="${t}">${E(e)}</span> `:""}function ce(e,a){return 18===a.id?`${e}<br><span class="fshRed fshBold">${a.params[0]} leeched the buff '${a.params[1]}'.</span>`:21===a.id?`${e}<br><span class="fshRed fshBold">${a.params[0]} was mesmerized by Spell Breaker, losing the '${a.params[1]}' buff.</span>`:e}function fe([e,a,t]){const[s,n]=function(e,a){return/You were victorious over/.test(a)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(a)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",g(e.cells[2].firstChild)]}(e,a),o=function(e,a){return ie(e.r.xp_gain,"XP stolen",a)+ie(e.r.gold_gain,"Gold lost",a)+ie(e.r.gold_stolen,"Gold stolen",a)+ie(e.r.pvp_prestige_gain,"Prestige gain",a)+ie(e.r.pvp_rating_change,"PvP change",a)+e.r.specials.reduce(ce,"")}(t,s)
e.cells[2].firstChild.remove(),m(e.cells[2],n),h(e.cells[2],b({innerHTML:o}))}const le=e=>e.username
let ue
async function pe(){const e=await z(!1)
return{_allies:e._allies.map(le),_enemies:e._enemies.map(le)}}async function de(e){return ue||(ue=pe()),(await ue)._allies.includes(e)}async function me(e){return ue||(ue=pe()),(await ue)._enemies.includes(e)}async function he(e){let a=""
const t=n(e),[s,o,r]=await Promise.all([J(t),de(t),me(t)])
return s?a="guild":o?a="ally":r&&(a="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,a]}function be(e,[a,t]){return e[t]?e[t].push(a):e[t]=[a],e}const ge={guild:"green",ally:"blue",enemy:"red"}
function ye([e,a]){return`${a.join(", ")} { color: ${ge[e]}; }`}async function je(a){const s=t(y,a)
if(0===s.length)return
const n=(await Promise.all(s.map(he))).filter(([,e])=>""!==e),o=e(n.reduce(be,{})).map(ye)
o.length&&(!function(e){const a=e.rows[0].cells[2]
a&&j(a,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(a),a.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const we=e=>(e=>k(H(e).childNodes))(e).map(n)
function $e(e,a){return(e=>o(s,M(e)))(e)&&("Buff"===a||"Reply"===a&&$("enableChatParsing"))}function ke(e){const a=q.find(a=>((e,a)=>Y(a.nicks).includes(x(e)))(e,a))
if(a)return a.id}function ve(e){const{target:a}=e,t=n(a)
$e(a,t)&&("Reply"===t&&(!function(e){const a=we(e).slice(0,2),t=a.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(a[0],"",s)}(a),e.preventDefault()),"Buff"===t&&function(e,a){const[t,s]=we(a),n=/`~(.*)~`/.exec(s)
if(n){const a=Y(n[1]).map(ke).filter(e=>e).join(";")
R(t,a),e.preventDefault()}}(e,a))}const Ce=([,e])=>o(v,e)
function Pe([,e,a]){j(e.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _e(e,[a,,t]){const s=C.exec(a.href)[1],n=e&&!await J(t)?` | <a href="${r}${t}">Attack</a>`:""
j(a.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${P}${t}">Send</a> | <a href="${_}${t}">Trade</a>`+n+" ]</small>")}let Le
const Te=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Be(e){return Te.test(g(e.cells[2]))}function xe(e){const a=N(n(e.cells[1]))
a>Le&&(T(L,a),Le=a)}function Ee(e){!function(e){w(e,ve)}(e)
const a=$("addIgnoreLink"),o=$("addAttackLinkToLog")
a&&function(e){t('a[href*="reportMsg"]',e).forEach(U)}(e),$("colorPlayerNames")&&je(e),o&&async function(e){const a=t(s,e)
if(0===a.length)return
const n=a.map(M).map(e=>[e,K(e)]);(await Promise.all(n.map(X))).filter(([,,e])=>!e).forEach(F)}(e),$("notificationWidgets")&&function(e,a,s){const o=t(y,e)
if(0===o.length)return
const r=o.map(e=>[e,M(e)]).filter(Ce).map(([e,a])=>[e,a,n(e)])
a&&r.forEach(Pe),r.forEach(u(_e,s))}(e,a,o),$("changeButtonLabels")&&function(e){t('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),t('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),$("trackLadderReset")&&function(e){Le=$(L),t(v,e).map(M).filter(Be).forEach(xe)}(e),$("showPvPSummaryInLog")&&async function(e){const a=t('a[href*="&combat_id="]',e)
if(0===a.length)return
const s=a.map(M).filter(ne).map(e=>[e,e.cells[2].innerHTML]).filter(oe);(await Promise.all(s.map(re))).filter(([,,e])=>e&&e.s).forEach(fe)}(e)}export default function(){O("PlayerLog",1),function(){if(B())return
const e=o("#pCC > table:last-of-type")
e&&Ee(e)}()}
//# sourceMappingURL=playerLog-14ab3565.js.map
