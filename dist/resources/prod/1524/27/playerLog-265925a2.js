import{e,aT as t,D as n,b4 as s,b5 as a,E as o,C as r,z as i,b6 as c,G as f,i as l,w as u,T as m,t as p,aS as d,b7 as h,a8 as g,h as b,m as y,B as j,o as w,b8 as C,H as P,M as _,a4 as v,b9 as k,Z as $,x as L}from"./calfSystem-3bdf319e.js"
import"./playerName-26a1f7d9.js"
import{t as T}from"./toLowerCase-33399b5a.js"
import{a as B}from"./addCommas-e12eda5f.js"
import{c as E}from"./createStyle-41532d32.js"
import{c as x}from"./currentGuildId-e8170186.js"
import"./fshOpen-da9a149e.js"
import{o as G}from"./openQuickBuffByName-223a30ec.js"
import"./dataRows-2d50b364.js"
import{g as R,s as S}from"./idb-31fb041e.js"
import"./closest-79b9364e.js"
import{c as A}from"./closestTr-51fa459d.js"
import"./indexAjaxJson-5033dc48.js"
import"./cmdExport-7ba590c1.js"
import{c as I}from"./csvSplit-c9226810.js"
import{i as M}from"./insertHtmlAfterEnd-56f50dfb.js"
import{p as Y}from"./parseDateAsTimestamp-3b93125b.js"
import{b as D}from"./buffObj-fc2481d9.js"
import"./getProfile-ca7df963.js"
import{m as H}from"./myStats-af133fa4.js"
import{c as N}from"./closestTd-9c26bd94.js"
import{g as z}from"./getMembrList-3ee4310f.js"
import"./doBuffLinkClick-eb0bb8de.js"
import{a as O}from"./addLogColoring-a80c43a7.js"
let Q
async function J(n){return x()&&!Q&&(Q=async function(){return e(await z(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await Q).includes(n)}const W=e=>[e,s(e.href,"target_username")],X=async([e,t])=>[e,t,await J(t)]
function Z([e,t]){M(e,` | <a href="${a}${t}">Attack</a>`)}function q(e){return`<a href="${c}${f(e)}" data-tooltip="Add to Ignore List">Ignore</a>`}function F([e,,t]){i("Report",t),M(t," | "+q(e))}function K([e,t]){l(t.cells[1].children[0],`<font size="1"><br>[ ${q(e)} ]</font>`)}function U(e){return function(e){return u({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let V,ee
function te(e,[t,n]){return"lastCheck"===t||n.logTime&&n.logTime>e}async function ne(){const t=await R("fsh_pvpCombat")
if(!t)return{lastCheck:m}
const n=m-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=m-604800,s=e(t).filter(p(te,n)),a={...d(s),lastCheck:m}
return S("fsh_pvpCombat",a),a}(t):t}async function se(e,t){V||(V=ne())
const n=await V
return n[t]&&n[t].logTime?n[t]:async function(e,t,n){const s=await U(t)
if(s&&s.s)return ee||(ee={...n}),ee[t]={...s,logTime:Y(f(e.cells[1]))/1e3},S("fsh_pvpCombat",ee),s}(e,t,n)}const ae=e=>r(h,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await se(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,n){return 0!==e?`${t}:<span class="${n}">${B(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,n]){const[s,a]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(n,s)
e.cells[2].firstChild.remove(),g(e.cells[2],a),b(e.cells[2],y({innerHTML:o}))}const le=([,,e])=>e&&e.s
const ue=e=>e.username
let me
async function pe(){const e=await H(!1)
return{_allies:e._allies.map(ue),_enemies:e._enemies.map(ue)}}async function de(e){return me||(me=pe()),(await me)._allies.includes(e)}async function he(e){return me||(me=pe()),(await me)._enemies.includes(e)}async function ge(e){let t=""
const n=f(e),[s,a,o]=await Promise.all([J(n),de(n),he(n)])
return s?t="guild":a?t="ally":o&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${A(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function be(e,[t,n]){return e[n]?e[n].push(t):e[n]=[t],e}const ye={guild:"green",ally:"blue",enemy:"red"}
function je([e,t]){return`${t.join(", ")} { color: ${ye[e]}; }`}const we=([,e])=>e
function Ce(t,n){const s=function(t){return e(t.filter(we).reduce(be,{})).map(je)}(n)
s.length&&(!function(e){const t=e.rows[0].cells[2]
t&&l(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),b(document.body,E(s.join("\n"))))}const Pe=e=>(e=>_(N(e).childNodes))(e).map(f)
function _e(e,t){return(e=>r(C,A(e)))(e)&&("Buff"===t||"Reply"===t&&P("enableChatParsing"))}function ve(e){const t=D.find(t=>((e,t)=>I(t.nicks).includes(T(e)))(e,t))
if(t)return t.id}function ke(e){const{target:t}=e,n=f(t)
_e(t,n)&&("Reply"===n&&(!function(e){const t=Pe(e).slice(0,2),n=t.join(" ")
let s=n
n.length>140&&(s=n.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),e.preventDefault()),"Buff"===n&&function(e,t){const[n,s]=Pe(t),a=/`~(.*)~`/.exec(s)
if(a){const t=I(a[1]).map(ve).filter(e=>e).join(";")
G(n,t),e.preventDefault()}}(e,t))}let $e
const Le=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Te(e){return Le.test(j(e.cells[2]))}function Be(e){const t=Y(f(e.cells[1]))
t>$e&&($(v,t),$e=t)}const Ee=[["addIgnoreLink",function(e){const t=n(o,e)
if(0===t.length)return
const s=t.map(e=>[e,A(e)]).map(([e,t])=>[e,t,r('a[href*="reportMsg"]',t)])
s.filter(([,,e])=>e).forEach(F),s.filter(([,,e])=>!e).forEach(K)}],["colorPlayerNames",async function(e){const t=n(o,e)
if(!t.length)return
Ce(e,await Promise.all(t.map(ge)))}],["addAttackLinkToLog",async function(e){const t=n('a[href*="=createsecure&"]',e)
if(!t.length)return
const s=t.map(W);(await Promise.all(s.map(X))).filter(([,,e])=>!e).forEach(Z)}],["changeButtonLabels",function(e){n('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),n('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}],["trackLadderReset",function(e){$e=P(v),n(k,e).map(A).filter(Te).forEach(Be)}],["showPvPSummaryInLog",async function(e){const t=n('a[href*="&combat_id="]',e)
if(0===t.length)return;(await Promise.all(function(e){return e.map(A).filter(ae).map(e=>[e,e.cells[2].innerHTML]).filter(oe).map(re)}(t))).filter(le).forEach(fe)}]]
function xe(e,t){P(t[0])&&t[1](e)}function Ge(e){!function(e){w(e,ke)}(e),Ee.forEach(p(xe,e))}function Re(){O("PlayerLog",1),function(){if(L())return
const e=r("#pCC > table:last-of-type")
e&&Ge(e)}()}export default Re
//# sourceMappingURL=playerLog-265925a2.js.map
