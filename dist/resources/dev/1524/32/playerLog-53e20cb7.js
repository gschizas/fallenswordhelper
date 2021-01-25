import{a as e}from"./addLogColoring-dc48c73c.js"
import{e as t,ae as n,D as a,bg as s,bh as o,E as r,C as i,z as c,bi as f,G as l,i as u,w as m,U as p,t as d,ao as h,bj as g,a9 as b,h as y,m as j,B as w,o as C,bk as _,H as P,M as k,a5 as v,bl as $,_ as L,x as T}from"./calfSystem-19a5d332.js"
import{i as B}from"./insertHtmlAfterEnd-6d4e13a3.js"
import{c as E}from"./currentGuildId-daa4c793.js"
import{g as x}from"./getMembrList-24395dcd.js"
import{c as G}from"./closestTr-1e3a3aee.js"
import{a as R}from"./addCommas-b2b2ad82.js"
import{p as S}from"./parseDateAsTimestamp-09891562.js"
import{g as A,s as I}from"./idb-faef0351.js"
import{c as M}from"./createStyle-5f85d03e.js"
import{m as Y}from"./myStats-1a3a33f7.js"
import{b as D}from"./buffObj-40298e85.js"
import{c as H}from"./closestTd-c6a3fcb1.js"
import{c as N}from"./csvSplit-a4e91aa0.js"
import{o as z}from"./openQuickBuffByName-a375d5da.js"
import{t as O}from"./toLowerCase-ace931b6.js"
import"./dataRows-22fc1a62.js"
import"./doBuffLinkClick-7521fd4c.js"
import"./cmdExport-bf03c29e.js"
import"./indexAjaxJson-bdfce70d.js"
import"./closest-331833f9.js"
import"./getProfile-d128b80b.js"
import"./playerName-09521e4e.js"
import"./fshOpen-56a6fafa.js"
let Q
async function J(e){return E()&&!Q&&(Q=async function(){return t(await x(!1)).filter((([,e])=>n(e))).map((([e])=>e))}()),(await Q).includes(e)}const U=e=>[e,s(e.href,"target_username")],W=async([e,t])=>[e,t,await J(t)]
function X([e,t]){B(e,` | <a href="${o}${t}">Attack</a>`)}function q(e){return`<a href="${f}${l(e)}" data-tooltip="Add to Ignore List">Ignore</a>`}function F([e,,t]){c("Report",t),B(t,` | ${q(e)}`)}function K([e,t]){u(t.cells[1].children[0],`<font size="1"><br>[ ${q(e)} ]</font>`)}function V(e){return function(e){return m({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let Z,ee
function te(e,[t,n]){return"lastCheck"===t||n.logTime&&n.logTime>e}async function ne(){const e=await A("fsh_pvpCombat")
if(!e)return{lastCheck:p}
const n=p-86400
return!e.lastCheck||e.lastCheck<n?function(e){const n=p-604800,a=t(e).filter(d(te,n)),s={...h(a),lastCheck:p}
return I("fsh_pvpCombat",s),s}(e):e}async function ae(e,t){Z||(Z=ne())
const n=await Z
return n[t]&&n[t].logTime?n[t]:async function(e,t,n){const a=await V(t)
if(a&&a.s)return ee||(ee={...n}),ee[t]={...a,logTime:S(l(e.cells[1]))/1e3},I("fsh_pvpCombat",ee),a}(e,t,n)}const se=e=>i(g,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await ae(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,n){return 0!==e?`${t}:<span class="${n}">${R(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,n]){const[a,s]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",w(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(n,a)
e.cells[2].firstChild.remove(),b(e.cells[2],s),y(e.cells[2],j({innerHTML:o}))}const le=([,,e])=>e&&e.s
const ue=e=>e.username
let me
async function pe(){const e=await Y(!1)
return{_allies:e._allies.map(ue),_enemies:e._enemies.map(ue)}}async function de(e){return me||(me=pe()),(await me)._allies.includes(e)}async function he(e){return me||(me=pe()),(await me)._enemies.includes(e)}async function ge(e){let t=""
const n=l(e),[a,s,o]=await Promise.all([J(n),de(n),he(n)])
return a?t="guild":s?t="ally":o&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${G(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function be(e,[t,n]){return e[n]?e[n].push(t):e[n]=[t],e}const ye={guild:"green",ally:"blue",enemy:"red"}
function je([e,t]){return`${t.join(", ")} { color: ${ye[e]}; }`}const we=([,e])=>e
function Ce(e,n){const a=function(e){return t(e.filter(we).reduce(be,{})).map(je)}(n)
a.length&&(!function(e){const t=e.rows[0].cells[2]
t&&u(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),y(document.body,M(a.join("\n"))))}const _e=e=>(e=>k(H(e).childNodes))(e).map(l)
function Pe(e,t){return(e=>i(_,G(e)))(e)&&("Buff"===t||"Reply"===t&&P("enableChatParsing"))}function ke(e){const t=D.find((t=>((e,t)=>N(t.nicks).includes(O(e)))(e,t)))
if(t)return t.id}function ve(e){const{target:t}=e,n=l(t)
Pe(t,n)&&("Reply"===n&&(!function(e){const t=_e(e).slice(0,2),n=t.join(" ")
let a=n
n.length>140&&(a=`${n.substring(0,140)}...`),window.openQuickMsgDialog(t[0],"",a)}(t),e.preventDefault()),"Buff"===n&&function(e,t){const[n,a]=_e(t),s=/`~(.*)~`/.exec(a)
if(s){const t=N(s[1]).map(ke).filter((e=>e)).join(";")
z(n,t),e.preventDefault()}}(e,t))}let $e
const Le=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Te(e){return Le.test(w(e.cells[2]))}function Be(e){const t=S(l(e.cells[1]))
t>$e&&(L(v,t),$e=t)}const Ee=[["addIgnoreLink",function(e){const t=a(r,e)
if(0===t.length)return
const n=t.map((e=>[e,G(e)])).map((([e,t])=>[e,t,i('a[href*="reportMsg"]',t)]))
n.filter((([,,e])=>e)).forEach(F),n.filter((([,,e])=>!e)).forEach(K)}],["colorPlayerNames",async function(e){const t=a(r,e)
if(!t.length)return
Ce(e,await Promise.all(t.map(ge)))}],["addAttackLinkToLog",async function(e){const t=a('a[href*="=createsecure&"]',e)
if(!t.length)return
const n=t.map(U);(await Promise.all(n.map(W))).filter((([,,e])=>!e)).forEach(X)}],["changeButtonLabels",function(e){a('a[href*="=trade&"]',e).forEach((e=>c("Trade",e))),a('a[href*="=createsecure&"]',e).forEach((e=>c("ST",e)))}],["trackLadderReset",function(e){$e=P(v),a($,e).map(G).filter(Te).forEach(Be)}],["showPvPSummaryInLog",async function(e){const t=a('a[href*="&combat_id="]',e)
if(0===t.length)return;(await Promise.all(function(e){return e.map(G).filter(se).map((e=>[e,e.cells[2].innerHTML])).filter(oe).map(re)}(t))).filter(le).forEach(fe)}]]
function xe(e,t){P(t[0])&&t[1](e)}function Ge(e){!function(e){C(e,ve)}(e),Ee.forEach(d(xe,e))}function Re(){e("PlayerLog",1),function(){if(T())return
const e=i("#pCC > table:last-of-type")
e&&Ge(e)}()}export default Re
//# sourceMappingURL=playerLog-53e20cb7.js.map
