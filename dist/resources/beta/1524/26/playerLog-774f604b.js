import{e,aT as t,D as s,b6 as a,b7 as n,E as o,C as r,z as i,b8 as c,G as f,i as l,w as u,S as m,t as p,aS as d,b9 as h,a7 as b,h as g,m as y,B as j,o as w,ba as C,H as P,M as _,a3 as v,bb as k,Y as $,x as L}from"./calfSystem-cf4d22a7.js"
import"./playerName-b9ef36e6.js"
import{t as T}from"./toLowerCase-b21b7cc8.js"
import{a as B}from"./addCommas-b567f740.js"
import{c as x}from"./createStyle-1ea5a054.js"
import{c as E}from"./currentGuildId-5763962b.js"
import"./fshOpen-a7890139.js"
import{o as G}from"./openQuickBuffByName-905195be.js"
import"./dataRows-1c64b1cb.js"
import{g as R,s as S}from"./idb-4798970d.js"
import"./closest-c2515a48.js"
import{c as Y}from"./closestTr-c0ecc50a.js"
import"./indexAjaxJson-451a313a.js"
import"./cmdExport-b7dc8f76.js"
import{c as A}from"./csvSplit-653f6227.js"
import{i as I}from"./insertHtmlAfterEnd-a7b25c39.js"
import{p as M}from"./parseDateAsTimestamp-21fc8baa.js"
import{b as D}from"./buffObj-edd5c6f3.js"
import"./getProfile-ff141b7e.js"
import{m as H}from"./myStats-a5a471c2.js"
import{c as N}from"./closestTd-a53fb75e.js"
import{g as z}from"./getMembrList-5556413d.js"
import"./doBuffLinkClick-8560d233.js"
import{a as O}from"./addLogColoring-c8983eab.js"
let Q
async function J(s){return E()&&!Q&&(Q=async function(){return e(await z(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await Q).includes(s)}const W=e=>[e,a(e.href,"target_username")],X=async([e,t])=>[e,t,await J(t)]
function q([e,t]){I(e,` | <a href="${n}${t}">Attack</a>`)}function F(e){return`<a href="${c}${f(e)}" data-tooltip="Add to Ignore List">Ignore</a>`}function K([e,,t]){i("Report",t),I(t," | "+F(e))}function U([e,t]){l(t.cells[1].children[0],`<font size="1"><br>[ ${F(e)} ]</font>`)}function V(e){return function(e){return u({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let Z,ee
function te(e,[t,s]){return"lastCheck"===t||s.logTime&&s.logTime>e}async function se(){const t=await R("fsh_pvpCombat")
if(!t)return{lastCheck:m}
const s=m-86400
return!t.lastCheck||t.lastCheck<s?function(t){const s=m-604800,a=e(t).filter(p(te,s)),n={...d(a),lastCheck:m}
return S("fsh_pvpCombat",n),n}(t):t}async function ae(e,t){Z||(Z=se())
const s=await Z
return s[t]&&s[t].logTime?s[t]:async function(e,t,s){const a=await V(t)
if(a&&a.s)return ee||(ee={...s}),ee[t]={...a,logTime:M(f(e.cells[1]))/1e3},S("fsh_pvpCombat",ee),a}(e,t,s)}const ne=e=>r(h,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await ae(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,s){return 0!==e?`${t}:<span class="${s}">${B(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,s]){const[a,n]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(s,a)
e.cells[2].firstChild.remove(),b(e.cells[2],n),g(e.cells[2],y({innerHTML:o}))}const le=e=>e.username
let ue
async function me(){const e=await H(!1)
return{_allies:e._allies.map(le),_enemies:e._enemies.map(le)}}async function pe(e){return ue||(ue=me()),(await ue)._allies.includes(e)}async function de(e){return ue||(ue=me()),(await ue)._enemies.includes(e)}async function he(e){let t=""
const s=f(e),[a,n,o]=await Promise.all([J(s),pe(s),de(s)])
return a?t="guild":n?t="ally":o&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function be(e,[t,s]){return e[s]?e[s].push(t):e[s]=[t],e}const ge={guild:"green",ally:"blue",enemy:"red"}
function ye([e,t]){return`${t.join(", ")} { color: ${ge[e]}; }`}async function je(t){const a=s(o,t)
if(0===a.length)return
const n=(await Promise.all(a.map(he))).filter(([,e])=>""!==e),r=e(n.reduce(be,{})).map(ye)
r.length&&(!function(e){const t=e.rows[0].cells[2]
t&&l(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),g(document.body,x(r.join("\n"))))}const we=e=>(e=>_(N(e).childNodes))(e).map(f)
function Ce(e,t){return(e=>r(C,Y(e)))(e)&&("Buff"===t||"Reply"===t&&P("enableChatParsing"))}function Pe(e){const t=D.find(t=>((e,t)=>A(t.nicks).includes(T(e)))(e,t))
if(t)return t.id}function _e(e){const{target:t}=e,s=f(t)
Ce(t,s)&&("Reply"===s&&(!function(e){const t=we(e).slice(0,2),s=t.join(" ")
let a=s
s.length>140&&(a=s.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",a)}(t),e.preventDefault()),"Buff"===s&&function(e,t){const[s,a]=we(t),n=/`~(.*)~`/.exec(a)
if(n){const t=A(n[1]).map(Pe).filter(e=>e).join(";")
G(s,t),e.preventDefault()}}(e,t))}let ve
const ke=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function $e(e){return ke.test(j(e.cells[2]))}function Le(e){const t=M(f(e.cells[1]))
t>ve&&($(v,t),ve=t)}function Te(e){!function(e){w(e,_e)}(e)
const t=P("addIgnoreLink"),a=P("addAttackLinkToLog")
t&&function(e){const t=s(o,e)
if(0===t.length)return
const a=t.map(e=>[e,Y(e)]).map(([e,t])=>[e,t,r('a[href*="reportMsg"]',t)])
a.filter(([,,e])=>e).forEach(K),a.filter(([,,e])=>!e).forEach(U)}(e),P("colorPlayerNames")&&je(e),a&&async function(e){const t=s('a[href*="=createsecure&"]',e)
if(!t.length)return
const a=t.map(W);(await Promise.all(a.map(X))).filter(([,,e])=>!e).forEach(q)}(e),P("changeButtonLabels")&&function(e){s('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),s('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),P("trackLadderReset")&&function(e){ve=P(v),s(k,e).map(Y).filter($e).forEach(Le)}(e),P("showPvPSummaryInLog")&&async function(e){const t=s('a[href*="&combat_id="]',e)
if(0===t.length)return
const a=t.map(Y).filter(ne).map(e=>[e,e.cells[2].innerHTML]).filter(oe);(await Promise.all(a.map(re))).filter(([,,e])=>e&&e.s).forEach(fe)}(e)}function Be(){O("PlayerLog",1),function(){if(L())return
const e=r("#pCC > table:last-of-type")
e&&Te(e)}()}export default Be
//# sourceMappingURL=playerLog-774f604b.js.map
