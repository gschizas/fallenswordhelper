import{e,aV as t,D as s,bb as n,bc as a,E as o,C as r,z as i,bd as c,G as f,i as l,w as u,T as m,t as p,aU as d,be as h,a5 as g,h as b,m as y,B as j,o as w,bf as C,H as P,M as _,a6 as v,bg as k,Z as $,x as L}from"./calfSystem-4991bf5b.js"
import"./playerName-69861ead.js"
import{t as T}from"./toLowerCase-b21b7cc8.js"
import{a as B}from"./addCommas-b567f740.js"
import{c as x}from"./createStyle-65df74b6.js"
import{c as E}from"./currentGuildId-56c2c861.js"
import"./fshOpen-a7890139.js"
import{o as G}from"./openQuickBuffByName-94fca028.js"
import"./dataRows-bc8eef13.js"
import{g as R,s as S}from"./idb-ee31c042.js"
import"./closest-c2515a48.js"
import{c as A}from"./closestTr-72e28412.js"
import"./indexAjaxJson-b9139aa9.js"
import"./cmdExport-f5c9af35.js"
import{c as I}from"./csvSplit-653f6227.js"
import{i as M}from"./insertHtmlAfterEnd-93fb4549.js"
import{p as Y}from"./parseDateAsTimestamp-38003be6.js"
import{b as D}from"./buffObj-edd5c6f3.js"
import"./getProfile-80a3e208.js"
import{m as H}from"./myStats-71b5ed12.js"
import{c as N}from"./closestTd-471366fe.js"
import{g as z}from"./getMembrList-8964b15c.js"
import"./doBuffLinkClick-e35eed9e.js"
import{a as O}from"./addLogColoring-3fe40b26.js"
let Q
async function J(s){return E()&&!Q&&(Q=async function(){return e(await z(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await Q).includes(s)}const U=e=>[e,n(e.href,"target_username")],V=async([e,t])=>[e,t,await J(t)]
function W([e,t]){M(e,` | <a href="${a}${t}">Attack</a>`)}function X(e){return`<a href="${c}${f(e)}" data-tooltip="Add to Ignore List">Ignore</a>`}function Z([e,,t]){i("Report",t),M(t," | "+X(e))}function q([e,t]){l(t.cells[1].children[0],`<font size="1"><br>[ ${X(e)} ]</font>`)}function F(e){return function(e){return u({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let K,ee
function te(e,[t,s]){return"lastCheck"===t||s.logTime&&s.logTime>e}async function se(){const t=await R("fsh_pvpCombat")
if(!t)return{lastCheck:m}
const s=m-86400
return!t.lastCheck||t.lastCheck<s?function(t){const s=m-604800,n=e(t).filter(p(te,s)),a={...d(n),lastCheck:m}
return S("fsh_pvpCombat",a),a}(t):t}async function ne(e,t){K||(K=se())
const s=await K
return s[t]&&s[t].logTime?s[t]:async function(e,t,s){const n=await F(t)
if(n&&n.s)return ee||(ee={...s}),ee[t]={...n,logTime:Y(f(e.cells[1]))/1e3},S("fsh_pvpCombat",ee),n}(e,t,s)}const ae=e=>r(h,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await ne(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,s){return 0!==e?`${t}:<span class="${s}">${B(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,s]){const[n,a]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(s,n)
e.cells[2].firstChild.remove(),g(e.cells[2],a),b(e.cells[2],y({innerHTML:o}))}const le=e=>e.username
let ue
async function me(){const e=await H(!1)
return{_allies:e._allies.map(le),_enemies:e._enemies.map(le)}}async function pe(e){return ue||(ue=me()),(await ue)._allies.includes(e)}async function de(e){return ue||(ue=me()),(await ue)._enemies.includes(e)}async function he(e){let t=""
const s=f(e),[n,a,o]=await Promise.all([J(s),pe(s),de(s)])
return n?t="guild":a?t="ally":o&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${A(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function ge(e,[t,s]){return e[s]?e[s].push(t):e[s]=[t],e}const be={guild:"green",ally:"blue",enemy:"red"}
function ye([e,t]){return`${t.join(", ")} { color: ${be[e]}; }`}async function je(t){const n=s(o,t)
if(0===n.length)return
const a=(await Promise.all(n.map(he))).filter(([,e])=>""!==e),r=e(a.reduce(ge,{})).map(ye)
r.length&&(!function(e){const t=e.rows[0].cells[2]
t&&l(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),b(document.body,x(r.join("\n"))))}const we=e=>(e=>_(N(e).childNodes))(e).map(f)
function Ce(e,t){return(e=>r(C,A(e)))(e)&&("Buff"===t||"Reply"===t&&P("enableChatParsing"))}function Pe(e){const t=D.find(t=>((e,t)=>I(t.nicks).includes(T(e)))(e,t))
if(t)return t.id}function _e(e){const{target:t}=e,s=f(t)
Ce(t,s)&&("Reply"===s&&(!function(e){const t=we(e).slice(0,2),s=t.join(" ")
let n=s
s.length>140&&(n=s.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",n)}(t),e.preventDefault()),"Buff"===s&&function(e,t){const[s,n]=we(t),a=/`~(.*)~`/.exec(n)
if(a){const t=I(a[1]).map(Pe).filter(e=>e).join(";")
G(s,t),e.preventDefault()}}(e,t))}let ve
const ke=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function $e(e){return ke.test(j(e.cells[2]))}function Le(e){const t=Y(f(e.cells[1]))
t>ve&&($(v,t),ve=t)}function Te(e){!function(e){w(e,_e)}(e)
const t=P("addIgnoreLink"),n=P("addAttackLinkToLog")
t&&function(e){const t=s(o,e)
if(0===t.length)return
const n=t.map(e=>[e,A(e)]).map(([e,t])=>[e,t,r('a[href*="reportMsg"]',t)])
n.filter(([,,e])=>e).forEach(Z),n.filter(([,,e])=>!e).forEach(q)}(e),P("colorPlayerNames")&&je(e),n&&async function(e){const t=s('a[href*="=createsecure&"]',e)
if(!t.length)return
const n=t.map(U);(await Promise.all(n.map(V))).filter(([,,e])=>!e).forEach(W)}(e),P("changeButtonLabels")&&function(e){s('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),s('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),P("trackLadderReset")&&function(e){ve=P(v),s(k,e).map(A).filter($e).forEach(Le)}(e),P("showPvPSummaryInLog")&&async function(e){const t=s('a[href*="&combat_id="]',e)
if(0===t.length)return
const n=t.map(A).filter(ae).map(e=>[e,e.cells[2].innerHTML]).filter(oe);(await Promise.all(n.map(re))).filter(([,,e])=>e&&e.s).forEach(fe)}(e)}function Be(){O("PlayerLog",1),function(){if(L())return
const e=r("#pCC > table:last-of-type")
e&&Te(e)}()}export default Be
//# sourceMappingURL=playerLog-9fdb6d24.js.map
