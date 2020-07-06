import{e as a,aT as t,D as e,b6 as s,K as n,C as o,b7 as r,z as i,b8 as c,w as f,S as l,t as u,aS as d,b9 as p,a7 as m,h,m as g,B as b,E as y,i as j,o as w,G as $,M as k,ba as v,bb as C,bc as P,bd as _,a3 as L,Y as T,x as B}from"./calfSystem-34fcd691.js"
import"./playerName-d0ea3aa5.js"
import{t as x}from"./toLowerCase-dda30e6b.js"
import{a as E}from"./addCommas-8cd7d96d.js"
import{c as S}from"./currentGuildId-fa7da475.js"
import"./fshOpen-ee221b8b.js"
import{o as R}from"./openQuickBuffByName-f52e13a3.js"
import"./dataRows-abf5aa16.js"
import{g as G,s as A}from"./idb-62d2605f.js"
import{c as I}from"./createStyle-44d1ad05.js"
import"./closest-5107b89a.js"
import{c as M}from"./closestTr-dbc0d607.js"
import"./indexAjaxJson-951ebca2.js"
import"./cmdExport-963c885b.js"
import{c as Y}from"./csvSplit-4ba7a6af.js"
import{i as D}from"./insertHtmlAfterEnd-d9a9762d.js"
import{p as N}from"./parseDateAsTimestamp-56d08ae7.js"
import{b as q}from"./buffObj-6db8253c.js"
import"./getProfile-5811c437.js"
import{m as z}from"./myStats-f933dc68.js"
import{c as H}from"./closestTd-c1187591.js"
import{g as Q}from"./getMembrList-d05d4aea.js"
import"./doBuffLinkClick-6b8b0e16.js"
import{a as O}from"./addLogColoring-7b71ad67.js"
let W
async function J(e){return S()&&!W&&(W=async function(){return a(await Q(!1)).filter(([,a])=>t(a)).map(([a])=>a)}()),(await W).includes(e)}const K=a=>n(a.cells[2].children[0]),X=async([a,t])=>[a,t,await J(t)]
function F([a,t]){const e=o('a[href*="=createsecure&"]',a)
D(e,` | <a href="${r}${t}">Attack</a>`)}function U(a){const t=n(H(a).nextElementSibling.children[0])
i("Report",a),D(a,` | <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function V(a){return function(a){return f({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let Z,aa
function ta(a,[t,e]){return"lastCheck"===t||e.logTime&&e.logTime>a}async function ea(){const t=await G("fsh_pvpCombat")
if(!t)return{lastCheck:l}
const e=l-86400
return!t.lastCheck||t.lastCheck<e?function(t){const e=l-604800,s=a(t).filter(u(ta,e)),n={...d(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(t):t}async function sa(a,t){Z||(Z=ea())
const e=await Z
return e[t]&&e[t].logTime?e[t]:async function(a,t,e){const s=await V(t)
if(s&&s.s)return aa||(aa={...e}),aa[t]={...s,logTime:N(n(a.cells[1]))/1e3},A("fsh_pvpCombat",aa),s}(a,t,e)}const na=a=>o(p,a),oa=([,a])=>!/\(Guild Conflict\)/.test(a),ra=async([a,t])=>[a,t,await sa(a,/combat_id=(\d+)/.exec(t)[1])]
function ia(a,t,e){return 0!==a?`${t}:<span class="${e}">${E(a)}</span> `:""}function ca(a,t){return 18===t.id?`${a}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${a}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:a}function fa([a,t,e]){const[s,n]=function(a,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",b(a.cells[2].firstChild)]}(a,t),o=function(a,t){return ia(a.r.xp_gain,"XP stolen",t)+ia(a.r.gold_gain,"Gold lost",t)+ia(a.r.gold_stolen,"Gold stolen",t)+ia(a.r.pvp_prestige_gain,"Prestige gain",t)+ia(a.r.pvp_rating_change,"PvP change",t)+a.r.specials.reduce(ca,"")}(e,s)
a.cells[2].firstChild.remove(),m(a.cells[2],n),h(a.cells[2],g({innerHTML:o}))}const la=a=>a.username
let ua
async function da(){const a=await z(!1)
return{_allies:a._allies.map(la),_enemies:a._enemies.map(la)}}async function pa(a){return ua||(ua=da()),(await ua)._allies.includes(a)}async function ma(a){return ua||(ua=da()),(await ua)._enemies.includes(a)}async function ha(a){let t=""
const e=n(a),[s,o,r]=await Promise.all([J(e),pa(e),ma(e)])
return s?t="guild":o?t="ally":r&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function ga(a,[t,e]){return a[e]?a[e].push(t):a[e]=[t],a}const ba={guild:"green",ally:"blue",enemy:"red"}
function ya([a,t]){return`${t.join(", ")} { color: ${ba[a]}; }`}async function ja(t){const s=e(y,t)
if(0===s.length)return
const n=(await Promise.all(s.map(ha))).filter(([,a])=>""!==a),o=a(n.reduce(ga,{})).map(ya)
o.length&&(!function(a){const t=a.rows[0].cells[2]
t&&j(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const wa=a=>(a=>k(H(a).childNodes))(a).map(n)
function $a(a,t){return(a=>o(s,M(a)))(a)&&("Buff"===t||"Reply"===t&&$("enableChatParsing"))}function ka(a){const t=q.find(t=>((a,t)=>Y(t.nicks).includes(x(a)))(a,t))
if(t)return t.id}function va(a){const{target:t}=a,e=n(t)
$a(t,e)&&("Reply"===e&&(!function(a){const t=wa(a).slice(0,2),e=t.join(" ")
let s=e
e.length>140&&(s=e.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),a.preventDefault()),"Buff"===e&&function(a,t){const[e,s]=wa(t),n=/`~(.*)~`/.exec(s)
if(n){const t=Y(n[1]).map(ka).filter(a=>a).join(";")
R(e,t),a.preventDefault()}}(a,t))}const Ca=([,a])=>o(v,a)
function Pa([,a,t]){j(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _a(a,[t,,e]){const s=C.exec(t.href)[1],n=a&&!await J(e)?` | <a href="${r}${e}">Attack</a>`:""
j(t.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${e}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${P}${e}">Send</a> | <a href="${_}${e}">Trade</a>`+n+" ]</small>")}let La
const Ta=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ba(a){return Ta.test(b(a.cells[2]))}function xa(a){const t=N(n(a.cells[1]))
t>La&&(T(L,t),La=t)}function Ea(a){!function(a){w(a,va)}(a)
const t=$("addIgnoreLink"),o=$("addAttackLinkToLog")
t&&function(a){e('a[href*="reportMsg"]',a).forEach(U)}(a),$("colorPlayerNames")&&ja(a),o&&async function(a){const t=e(s,a)
if(0===t.length)return
const n=t.map(M).map(a=>[a,K(a)]);(await Promise.all(n.map(X))).filter(([,,a])=>!a).forEach(F)}(a),$("notificationWidgets")&&function(a,t,s){const o=e(y,a)
if(0===o.length)return
const r=o.map(a=>[a,M(a)]).filter(Ca).map(([a,t])=>[a,t,n(a)])
t&&r.forEach(Pa),r.forEach(u(_a,s))}(a,t,o),$("changeButtonLabels")&&function(a){e('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),e('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),$("trackLadderReset")&&function(a){La=$(L),e(v,a).map(M).filter(Ba).forEach(xa)}(a),$("showPvPSummaryInLog")&&async function(a){const t=e('a[href*="&combat_id="]',a)
if(0===t.length)return
const s=t.map(M).filter(na).map(a=>[a,a.cells[2].innerHTML]).filter(oa);(await Promise.all(s.map(ra))).filter(([,,a])=>a&&a.s).forEach(fa)}(a)}export default function(){O("PlayerLog",1),function(){if(B())return
const a=o("#pCC > table:last-of-type")
a&&Ea(a)}()}
//# sourceMappingURL=playerLog-82f956e8.js.map
