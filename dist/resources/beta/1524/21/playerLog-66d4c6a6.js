import{e,aT as t,D as a,b6 as s,K as n,C as o,b7 as r,z as i,b8 as c,w as f,S as l,t as u,aS as p,b9 as d,a7 as m,h,m as g,B as b,E as y,i as j,o as w,G as $,M as k,ba as v,bb as C,bc as P,bd as _,a3 as L,Y as T,x as B}from"./calfSystem-89b939c8.js"
import"./playerName-8ec11865.js"
import{t as x}from"./toLowerCase-5d1ed3f8.js"
import{a as E}from"./addCommas-37030ade.js"
import{c as S}from"./currentGuildId-ae8f3699.js"
import"./fshOpen-e0d843ec.js"
import{o as R}from"./openQuickBuffByName-47f4b290.js"
import"./dataRows-ffd4e42f.js"
import{g as G,s as A}from"./idb-9be3057e.js"
import{c as I}from"./createStyle-0c87d95a.js"
import"./closest-e1837d80.js"
import{c as M}from"./closestTr-e9bb4ace.js"
import"./indexAjaxJson-dab169e3.js"
import"./cmdExport-788e7045.js"
import{c as Y}from"./csvSplit-7b854e44.js"
import{i as D}from"./insertHtmlAfterEnd-c6efbdf8.js"
import{p as N}from"./parseDateAsTimestamp-ad083d9e.js"
import{b as q}from"./buffObj-61431cf6.js"
import"./getProfile-82a0964d.js"
import{m as z}from"./myStats-fbafa703.js"
import{c as H}from"./closestTd-9554ad25.js"
import{g as Q}from"./getMembrList-2a0664e8.js"
import"./doBuffLinkClick-f07300e1.js"
import{a as O}from"./addLogColoring-47e2af67.js"
let W
async function J(a){return S()&&!W&&(W=async function(){return e(await Q(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await W).includes(a)}const K=e=>n(e.cells[2].children[0]),X=async([e,t])=>[e,t,await J(t)]
function F([e,t]){const a=o('a[href*="=createsecure&"]',e)
D(a,` | <a href="${r}${t}">Attack</a>`)}function U(e){const t=n(H(e).nextElementSibling.children[0])
i("Report",e),D(e,` | <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function V(e){return function(e){return f({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let Z,ee
function te(e,[t,a]){return"lastCheck"===t||a.logTime&&a.logTime>e}async function ae(){const t=await G("fsh_pvpCombat")
if(!t)return{lastCheck:l}
const a=l-86400
return!t.lastCheck||t.lastCheck<a?function(t){const a=l-604800,s=e(t).filter(u(te,a)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(t):t}async function se(e,t){Z||(Z=ae())
const a=await Z
return a[t]&&a[t].logTime?a[t]:async function(e,t,a){const s=await V(t)
if(s&&s.s)return ee||(ee={...a}),ee[t]={...s,logTime:N(n(e.cells[1]))/1e3},A("fsh_pvpCombat",ee),s}(e,t,a)}const ne=e=>o(d,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await se(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,a){return 0!==e?`${t}:<span class="${a}">${E(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,a]){const[s,n]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",b(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(a,s)
e.cells[2].firstChild.remove(),m(e.cells[2],n),h(e.cells[2],g({innerHTML:o}))}const le=e=>e.username
let ue
async function pe(){const e=await z(!1)
return{_allies:e._allies.map(le),_enemies:e._enemies.map(le)}}async function de(e){return ue||(ue=pe()),(await ue)._allies.includes(e)}async function me(e){return ue||(ue=pe()),(await ue)._enemies.includes(e)}async function he(e){let t=""
const a=n(e),[s,o,r]=await Promise.all([J(a),de(a),me(a)])
return s?t="guild":o?t="ally":r&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function ge(e,[t,a]){return e[a]?e[a].push(t):e[a]=[t],e}const be={guild:"green",ally:"blue",enemy:"red"}
function ye([e,t]){return`${t.join(", ")} { color: ${be[e]}; }`}async function je(t){const s=a(y,t)
if(0===s.length)return
const n=(await Promise.all(s.map(he))).filter(([,e])=>""!==e),o=e(n.reduce(ge,{})).map(ye)
o.length&&(!function(e){const t=e.rows[0].cells[2]
t&&j(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const we=e=>(e=>k(H(e).childNodes))(e).map(n)
function $e(e,t){return(e=>o(s,M(e)))(e)&&("Buff"===t||"Reply"===t&&$("enableChatParsing"))}function ke(e){const t=q.find(t=>((e,t)=>Y(t.nicks).includes(x(e)))(e,t))
if(t)return t.id}function ve(e){const{target:t}=e,a=n(t)
$e(t,a)&&("Reply"===a&&(!function(e){const t=we(e).slice(0,2),a=t.join(" ")
let s=a
a.length>140&&(s=a.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),e.preventDefault()),"Buff"===a&&function(e,t){const[a,s]=we(t),n=/`~(.*)~`/.exec(s)
if(n){const t=Y(n[1]).map(ke).filter(e=>e).join(";")
R(a,t),e.preventDefault()}}(e,t))}const Ce=([,e])=>o(v,e)
function Pe([,e,t]){j(e.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _e(e,[t,,a]){const s=C.exec(t.href)[1],n=e&&!await J(a)?` | <a href="${r}${a}">Attack</a>`:""
j(t.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${a}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${P}${a}">Send</a> | <a href="${_}${a}">Trade</a>`+n+" ]</small>")}let Le
const Te=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Be(e){return Te.test(b(e.cells[2]))}function xe(e){const t=N(n(e.cells[1]))
t>Le&&(T(L,t),Le=t)}function Ee(e){!function(e){w(e,ve)}(e)
const t=$("addIgnoreLink"),o=$("addAttackLinkToLog")
t&&function(e){a('a[href*="reportMsg"]',e).forEach(U)}(e),$("colorPlayerNames")&&je(e),o&&async function(e){const t=a(s,e)
if(0===t.length)return
const n=t.map(M).map(e=>[e,K(e)]);(await Promise.all(n.map(X))).filter(([,,e])=>!e).forEach(F)}(e),$("notificationWidgets")&&function(e,t,s){const o=a(y,e)
if(0===o.length)return
const r=o.map(e=>[e,M(e)]).filter(Ce).map(([e,t])=>[e,t,n(e)])
t&&r.forEach(Pe),r.forEach(u(_e,s))}(e,t,o),$("changeButtonLabels")&&function(e){a('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),a('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),$("trackLadderReset")&&function(e){Le=$(L),a(v,e).map(M).filter(Be).forEach(xe)}(e),$("showPvPSummaryInLog")&&async function(e){const t=a('a[href*="&combat_id="]',e)
if(0===t.length)return
const s=t.map(M).filter(ne).map(e=>[e,e.cells[2].innerHTML]).filter(oe);(await Promise.all(s.map(re))).filter(([,,e])=>e&&e.s).forEach(fe)}(e)}export default function(){O("PlayerLog",1),function(){if(B())return
const e=o("#pCC > table:last-of-type")
e&&Ee(e)}()}
//# sourceMappingURL=playerLog-66d4c6a6.js.map
