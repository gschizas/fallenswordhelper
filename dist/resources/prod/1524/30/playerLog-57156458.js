import{e,aS as t,D as n,b3 as a,b4 as s,E as o,C as r,z as i,b5 as c,G as f,i as l,w as u,S as m,t as p,aR as d,b6 as h,a7 as g,h as b,m as y,B as j,o as w,b7 as C,H as P,M as _,a3 as v,b8 as k,Y as $,x as L}from"./calfSystem-6459f18a.js"
import"./playerName-d1c3e398.js"
import{t as T}from"./toLowerCase-5e186769.js"
import{a as B}from"./addCommas-508f0c08.js"
import{c as E}from"./createStyle-0479102d.js"
import{c as x}from"./currentGuildId-da0b8fda.js"
import"./fshOpen-3e1a5fea.js"
import{o as R}from"./openQuickBuffByName-240bf7ec.js"
import"./dataRows-55e47afb.js"
import{g as G,s as S}from"./idb-737f325b.js"
import"./closest-3bdef2f3.js"
import{c as Y}from"./closestTr-98dcae50.js"
import"./indexAjaxJson-14aa1022.js"
import"./cmdExport-7faecab1.js"
import{c as A}from"./csvSplit-1d6bbc93.js"
import{i as I}from"./insertHtmlAfterEnd-deef01ad.js"
import{p as M}from"./parseDateAsTimestamp-6a159a44.js"
import{b as D}from"./buffObj-59ad5c76.js"
import"./getProfile-65933826.js"
import{m as H}from"./myStats-2518aba3.js"
import{c as N}from"./closestTd-635bc015.js"
import{g as z}from"./getMembrList-78f4e922.js"
import"./doBuffLinkClick-067ebf8a.js"
import{a as O}from"./addLogColoring-58d8a76c.js"
let Q
async function J(n){return x()&&!Q&&(Q=async function(){return e(await z(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await Q).includes(n)}const W=e=>[e,a(e.href,"target_username")],X=async([e,t])=>[e,t,await J(t)]
function q([e,t]){I(e,` | <a href="${s}${t}">Attack</a>`)}function F(e){return`<a href="${c}${f(e)}" data-tooltip="Add to Ignore List">Ignore</a>`}function K([e,,t]){i("Report",t),I(t," | "+F(e))}function U([e,t]){l(t.cells[1].children[0],`<font size="1"><br>[ ${F(e)} ]</font>`)}function V(e){return function(e){return u({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let Z,ee
function te(e,[t,n]){return"lastCheck"===t||n.logTime&&n.logTime>e}async function ne(){const t=await G("fsh_pvpCombat")
if(!t)return{lastCheck:m}
const n=m-86400
return!t.lastCheck||t.lastCheck<n?function(t){const n=m-604800,a=e(t).filter(p(te,n)),s={...d(a),lastCheck:m}
return S("fsh_pvpCombat",s),s}(t):t}async function ae(e,t){Z||(Z=ne())
const n=await Z
return n[t]&&n[t].logTime?n[t]:async function(e,t,n){const a=await V(t)
if(a&&a.s)return ee||(ee={...n}),ee[t]={...a,logTime:M(f(e.cells[1]))/1e3},S("fsh_pvpCombat",ee),a}(e,t,n)}const se=e=>r(h,e),oe=([,e])=>!/\(Guild Conflict\)/.test(e),re=async([e,t])=>[e,t,await ae(e,/combat_id=(\d+)/.exec(t)[1])]
function ie(e,t,n){return 0!==e?`${t}:<span class="${n}">${B(e)}</span> `:""}function ce(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function fe([e,t,n]){const[a,s]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ie(e.r.xp_gain,"XP stolen",t)+ie(e.r.gold_gain,"Gold lost",t)+ie(e.r.gold_stolen,"Gold stolen",t)+ie(e.r.pvp_prestige_gain,"Prestige gain",t)+ie(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(ce,"")}(n,a)
e.cells[2].firstChild.remove(),g(e.cells[2],s),b(e.cells[2],y({innerHTML:o}))}const le=([,,e])=>e&&e.s
const ue=e=>e.username
let me
async function pe(){const e=await H(!1)
return{_allies:e._allies.map(ue),_enemies:e._enemies.map(ue)}}async function de(e){return me||(me=pe()),(await me)._allies.includes(e)}async function he(e){return me||(me=pe()),(await me)._enemies.includes(e)}async function ge(e){let t=""
const n=f(e),[a,s,o]=await Promise.all([J(n),de(n),he(n)])
return a?t="guild":s?t="ally":o&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function be(e,[t,n]){return e[n]?e[n].push(t):e[n]=[t],e}const ye={guild:"green",ally:"blue",enemy:"red"}
function je([e,t]){return`${t.join(", ")} { color: ${ye[e]}; }`}const we=([,e])=>e
function Ce(t,n){const a=function(t){return e(t.filter(we).reduce(be,{})).map(je)}(n)
a.length&&(!function(e){const t=e.rows[0].cells[2]
t&&l(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),b(document.body,E(a.join("\n"))))}const Pe=e=>(e=>_(N(e).childNodes))(e).map(f)
function _e(e,t){return(e=>r(C,Y(e)))(e)&&("Buff"===t||"Reply"===t&&P("enableChatParsing"))}function ve(e){const t=D.find(t=>((e,t)=>A(t.nicks).includes(T(e)))(e,t))
if(t)return t.id}function ke(e){const{target:t}=e,n=f(t)
_e(t,n)&&("Reply"===n&&(!function(e){const t=Pe(e).slice(0,2),n=t.join(" ")
let a=n
n.length>140&&(a=n.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",a)}(t),e.preventDefault()),"Buff"===n&&function(e,t){const[n,a]=Pe(t),s=/`~(.*)~`/.exec(a)
if(s){const t=A(s[1]).map(ve).filter(e=>e).join(";")
R(n,t),e.preventDefault()}}(e,t))}let $e
const Le=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Te(e){return Le.test(j(e.cells[2]))}function Be(e){const t=M(f(e.cells[1]))
t>$e&&($(v,t),$e=t)}const Ee=[["addIgnoreLink",function(e){const t=n(o,e)
if(0===t.length)return
const a=t.map(e=>[e,Y(e)]).map(([e,t])=>[e,t,r('a[href*="reportMsg"]',t)])
a.filter(([,,e])=>e).forEach(K),a.filter(([,,e])=>!e).forEach(U)}],["colorPlayerNames",async function(e){const t=n(o,e)
if(!t.length)return
Ce(e,await Promise.all(t.map(ge)))}],["addAttackLinkToLog",async function(e){const t=n('a[href*="=createsecure&"]',e)
if(!t.length)return
const a=t.map(W);(await Promise.all(a.map(X))).filter(([,,e])=>!e).forEach(q)}],["changeButtonLabels",function(e){n('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),n('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}],["trackLadderReset",function(e){$e=P(v),n(k,e).map(Y).filter(Te).forEach(Be)}],["showPvPSummaryInLog",async function(e){const t=n('a[href*="&combat_id="]',e)
if(0===t.length)return;(await Promise.all(function(e){return e.map(Y).filter(se).map(e=>[e,e.cells[2].innerHTML]).filter(oe).map(re)}(t))).filter(le).forEach(fe)}]]
function xe(e,t){P(t[0])&&t[1](e)}function Re(e){!function(e){w(e,ke)}(e),Ee.forEach(p(xe,e))}function Ge(){O("PlayerLog",1),function(){if(L())return
const e=r("#pCC > table:last-of-type")
e&&Re(e)}()}export default Ge
//# sourceMappingURL=playerLog-57156458.js.map
