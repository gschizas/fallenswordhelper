import{e,aS as t,D as n,b5 as s,b6 as a,E as o,C as r,z as i,b7 as c,G as f,i as l,w as u,S as m,t as p,aR as d,b8 as h,a7 as b,h as g,m as y,B as j,o as w,b9 as C,H as P,M as _,a3 as v,ba as k,Y as $,x as L}from"./calfSystem-ebf4b17d.js"
import"./playerName-1bc13590.js"
import{t as T}from"./toLowerCase-5e186769.js"
import{a as B}from"./addCommas-508f0c08.js"
import{c as E}from"./createStyle-c3e0fb47.js"
import{c as x}from"./currentGuildId-f7450bbe.js"
import"./fshOpen-3e1a5fea.js"
import{o as R}from"./openQuickBuffByName-2e10a304.js"
import"./dataRows-1def7750.js"
import{g as G,s as S}from"./idb-b7d9067e.js"
import"./closest-3bdef2f3.js"
import{c as Y}from"./closestTr-24d1e04a.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import{c as A}from"./csvSplit-1d6bbc93.js"
import{i as I}from"./insertHtmlAfterEnd-e822003d.js"
import{p as M}from"./parseDateAsTimestamp-6231b29e.js"
import{b as D}from"./buffObj-59ad5c76.js"
import"./getProfile-45b98f95.js"
import{m as H}from"./myStats-17cad75c.js"
import{c as N}from"./closestTd-51e0957b.js"
import{g as z}from"./getMembrList-ba3d7d3d.js"
import"./doBuffLinkClick-8f18ac4e.js"
import{a as O}from"./addLogColoring-b8441e67.js"
let Q
async function J(n){return x()&&!Q&&(Q=async function(){return e(await z(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await Q).includes(n)}const W=e=>[e,s(e.href,"target_username")],X=async([e,t])=>[e,t,await J(t)]
function q([e,t]){I(e,` | <a href="${a}${t}">Attack</a>`)}function F(e){return`<a href="${c}${f(e)}" data-tooltip="Add to Ignore List">Ignore</a>`}function K([e,,t]){i("Report",t),I(t," | "+F(e))}function U([e,t]){l(t.cells[1].children[0],`<font size="1"><br>[ ${F(e)} ]</font>`)}function V(e){return function(e){return u({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let Z,ee
function te(e,[t,n]){return"lastCheck"===t||n.logTime&&n.logTime>e}async function ne(){const t=await G("fsh_pvpCombat")
if(!t)return{lastCheck:m}
const n=m-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=m-604800,s=e(t).filter(p(te,n)),a={...d(s),lastCheck:m}
return S("fsh_pvpCombat",a),a}(t):t}async function se(e,t){Z||(Z=ne())
const n=await Z
return n[t]&&n[t].logTime?n[t]:async function(e,t,n){const s=await V(t)
if(s&&s.s)return ee||(ee={...n}),ee[t]={...s,logTime:M(f(e.cells[1]))/1e3},S("fsh_pvpCombat",ee),s}(e,t,n)}const ae=e=>r(h,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await se(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,n){return 0!==e?`${t}:<span class="${n}">${B(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,n]){const[s,a]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(n,s)
e.cells[2].firstChild.remove(),b(e.cells[2],a),g(e.cells[2],y({innerHTML:o}))}const le=([,,e])=>e&&e.s
const ue=e=>e.username
let me
async function pe(){const e=await H(!1)
return{_allies:e._allies.map(ue),_enemies:e._enemies.map(ue)}}async function de(e){return me||(me=pe()),(await me)._allies.includes(e)}async function he(e){return me||(me=pe()),(await me)._enemies.includes(e)}async function be(e){let t=""
const n=f(e),[s,a,o]=await Promise.all([J(n),de(n),he(n)])
return s?t="guild":a?t="ally":o&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function ge(e,[t,n]){return e[n]?e[n].push(t):e[n]=[t],e}const ye={guild:"green",ally:"blue",enemy:"red"}
function je([e,t]){return`${t.join(", ")} { color: ${ye[e]}; }`}const we=([,e])=>e
function Ce(t,n){const s=function(t){return e(t.filter(we).reduce(ge,{})).map(je)}(n)
s.length&&(!function(e){const t=e.rows[0].cells[2]
t&&l(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),g(document.body,E(s.join("\n"))))}const Pe=e=>(e=>_(N(e).childNodes))(e).map(f)
function _e(e,t){return(e=>r(C,Y(e)))(e)&&("Buff"===t||"Reply"===t&&P("enableChatParsing"))}function ve(e){const t=D.find(t=>((e,t)=>A(t.nicks).includes(T(e)))(e,t))
if(t)return t.id}function ke(e){const{target:t}=e,n=f(t)
_e(t,n)&&("Reply"===n&&(!function(e){const t=Pe(e).slice(0,2),n=t.join(" ")
let s=n
n.length>140&&(s=n.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),e.preventDefault()),"Buff"===n&&function(e,t){const[n,s]=Pe(t),a=/`~(.*)~`/.exec(s)
if(a){const t=A(a[1]).map(ve).filter(e=>e).join(";")
R(n,t),e.preventDefault()}}(e,t))}let $e
const Le=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Te(e){return Le.test(j(e.cells[2]))}function Be(e){const t=M(f(e.cells[1]))
t>$e&&($(v,t),$e=t)}const Ee=[["addIgnoreLink",function(e){const t=n(o,e)
if(0===t.length)return
const s=t.map(e=>[e,Y(e)]).map(([e,t])=>[e,t,r('a[href*="reportMsg"]',t)])
s.filter(([,,e])=>e).forEach(K),s.filter(([,,e])=>!e).forEach(U)}],["colorPlayerNames",async function(e){const t=n(o,e)
if(!t.length)return
Ce(e,await Promise.all(t.map(be)))}],["addAttackLinkToLog",async function(e){const t=n('a[href*="=createsecure&"]',e)
if(!t.length)return
const s=t.map(W);(await Promise.all(s.map(X))).filter(([,,e])=>!e).forEach(q)}],["changeButtonLabels",function(e){n('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),n('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}],["trackLadderReset",function(e){$e=P(v),n(k,e).map(Y).filter(Te).forEach(Be)}],["showPvPSummaryInLog",async function(e){const t=n('a[href*="&combat_id="]',e)
if(0===t.length)return;(await Promise.all(function(e){return e.map(Y).filter(ae).map(e=>[e,e.cells[2].innerHTML]).filter(oe).map(re)}(t))).filter(le).forEach(fe)}]]
function xe(e,t){P(t[0])&&t[1](e)}function Re(e){!function(e){w(e,ke)}(e),Ee.forEach(p(xe,e))}function Ge(){O("PlayerLog",1),function(){if(L())return
const e=r("#pCC > table:last-of-type")
e&&Re(e)}()}export default Ge
//# sourceMappingURL=playerLog-7d5dacf4.js.map
