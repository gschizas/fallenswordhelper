import{m as t,aT as e,D as a,b6 as s,K as n,C as o,b7 as r,z as i,b8 as c,w as f,S as l,t as u,aS as d,b9 as p,a7 as m,f as h,l as b,E as g,i as y,o as j,G as w,M as $,ba as C,bb as k,bc as v,bd as P,a3 as _,B as L,Y as T,x}from"./calfSystem-05554bae.js"
import"./playerName-0e65dbb6.js"
import{t as B}from"./toLowerCase-4d1a2136.js"
import{a as E}from"./addCommas-1723dd41.js"
import{c as S}from"./currentGuildId-03628998.js"
import"./fshOpen-79258363.js"
import{o as R}from"./openQuickBuffByName-5ddc4d1b.js"
import"./dataRows-2cd1da8f.js"
import{g as G,s as A}from"./idb-862da886.js"
import{c as I}from"./createStyle-0d9a7c79.js"
import{i as M}from"./insertHtmlAfterEnd-1461aee3.js"
import"./indexAjaxJson-c1c386d4.js"
import"./cmdExport-9dcb6bc5.js"
import"./closest-a50421eb.js"
import{c as Y}from"./closestTr-de7cfbf0.js"
import{c as D}from"./csvSplit-d1d5e8a8.js"
import{p as N}from"./parseDateAsTimestamp-4d374b86.js"
import{b as q}from"./buffObj-b2053fa5.js"
import"./getProfile-dcbb4eb8.js"
import{m as z}from"./myStats-eebd97e2.js"
import{c as H}from"./closestTd-1b301101.js"
import{g as Q}from"./getMembrList-6b86662c.js"
import"./doBuffLinkClick-75add551.js"
import{a as O}from"./addLogColoring-afafcaa3.js"
let W
async function J(a){return S()&&!W&&(W=async function(){return t(await Q(!1)).filter(([,t])=>e(t)).map(([t])=>t)}()),(await W).includes(a)}const K=t=>n(t.cells[2].children[0]),X=async([t,e])=>[t,e,await J(e)]
function F([t,e]){const a=o('a[href*="=createsecure&"]',t)
M(a,` | <a href="${r}${e}">Attack</a>`)}function U(t){const e=n(H(t).nextElementSibling.children[0])
i("Report",t),M(t,` | <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function V(t){return function(t){return f({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let Z,tt
function et(t,[e,a]){return"lastCheck"===e||a.logTime&&a.logTime>t}async function at(){const e=await G("fsh_pvpCombat")
if(!e)return{lastCheck:l}
const a=l-86400
return!e.lastCheck||e.lastCheck<a?function(e){const a=l-604800,s=t(e).filter(u(et,a)),n={...d(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(e):e}async function st(t,e){Z||(Z=at())
const a=await Z
return a[e]&&a[e].logTime?a[e]:async function(t,e,a){const s=await V(e)
if(s&&s.s)return tt||(tt={...a}),tt[e]={...s,logTime:N(n(t.cells[1]))/1e3},A("fsh_pvpCombat",tt),s}(t,e,a)}const nt=t=>o(p,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,e])=>[t,e,await st(t,/combat_id=(\d+)/.exec(e)[1])]
function it(t,e,a){return 0!==t?`${e}:<span class="${a}">${E(t)}</span> `:""}function ct(t,e){return 18===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:t}function ft([t,e,a]){const[s,n]=function(t,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",t.cells[2].firstChild.textContent]}(t,e),o=function(t,e){return it(t.r.xp_gain,"XP stolen",e)+it(t.r.gold_gain,"Gold lost",e)+it(t.r.gold_stolen,"Gold stolen",e)+it(t.r.pvp_prestige_gain,"Prestige gain",e)+it(t.r.pvp_rating_change,"PvP change",e)+t.r.specials.reduce(ct,"")}(a,s)
t.cells[2].firstChild.remove(),m(t.cells[2],n),h(t.cells[2],b({innerHTML:o}))}const lt=t=>t.username
let ut
async function dt(){const t=await z(!1)
return{_allies:t._allies.map(lt),_enemies:t._enemies.map(lt)}}async function pt(t){return ut||(ut=dt()),(await ut)._allies.includes(t)}async function mt(t){return ut||(ut=dt()),(await ut)._enemies.includes(t)}async function ht(t){let e=""
const a=n(t),[s,o,r]=await Promise.all([J(a),pt(a),mt(a)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function bt(t,[e,a]){return t[a]?t[a].push(e):t[a]=[e],t}const gt={guild:"green",ally:"blue",enemy:"red"}
function yt([t,e]){return`${e.join(", ")} { color: ${gt[t]}; }`}async function jt(e){const s=a(g,e)
if(0===s.length)return
const n=(await Promise.all(s.map(ht))).filter(([,t])=>""!==t),o=t(n.reduce(bt,{})).map(yt)
o.length&&(!function(t){const e=t.rows[0].cells[2]
e&&y(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const wt=t=>(t=>$(H(t).childNodes))(t).map(n)
function $t(t,e){return(t=>o(s,Y(t)))(t)&&("Buff"===e||"Reply"===e&&w("enableChatParsing"))}function Ct(t){const e=q.find(e=>((t,e)=>D(e.nicks).includes(B(t)))(t,e))
if(e)return e.id}function kt(t){const{target:e}=t,a=n(e)
$t(e,a)&&("Reply"===a&&(!function(t){const e=wt(t).slice(0,2),a=e.join(" ")
let s=a
a.length>140&&(s=a.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),t.preventDefault()),"Buff"===a&&function(t,e){const[a,s]=wt(e),n=/`~(.*)~`/.exec(s)
if(n){const e=D(n[1]).map(Ct).filter(t=>t).join(";")
R(a,e),t.preventDefault()}}(t,e))}const vt=([,t])=>o(C,t)
function Pt([,t,e]){y(t.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _t(t,[e,,a]){const s=k.exec(e.href)[1],n=t&&!await J(a)?` | <a href="${r}${a}">Attack</a>`:""
y(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${a}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${v}${a}">Send</a> | <a href="${P}${a}">Trade</a>`+n+" ]</small>")}let Lt
const Tt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function xt(t){return Tt.test(L(t.cells[2]))}function Bt(t){const e=N(n(t.cells[1]))
e>Lt&&(T(_,e),Lt=e)}function Et(t){!function(t){j(t,kt)}(t)
const e=w("addIgnoreLink"),o=w("addAttackLinkToLog")
e&&function(t){a('a[href*="reportMsg"]',t).forEach(U)}(t),w("colorPlayerNames")&&jt(t),o&&async function(t){const e=a(s,t)
if(0===e.length)return
const n=e.map(Y).map(t=>[t,K(t)]);(await Promise.all(n.map(X))).filter(([,,t])=>!t).forEach(F)}(t),w("notificationWidgets")&&function(t,e,s){const o=a(g,t)
if(0===o.length)return
const r=o.map(t=>[t,Y(t)]).filter(vt).map(([t,e])=>[t,e,n(t)])
e&&r.forEach(Pt),r.forEach(u(_t,s))}(t,e,o),w("changeButtonLabels")&&function(t){a('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),a('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),w("trackLadderReset")&&function(t){Lt=w(_),a(C,t).map(Y).filter(xt).forEach(Bt)}(t),w("showPvPSummaryInLog")&&async function(t){const e=a('a[href*="&combat_id="]',t)
if(0===e.length)return
const s=e.map(Y).filter(nt).map(t=>[t,t.cells[2].innerHTML]).filter(ot);(await Promise.all(s.map(rt))).filter(([,,t])=>t&&t.s).forEach(ft)}(t)}export default function(){O("PlayerLog",1),function(){if(x())return
const t=o("#pCC > table:last-of-type")
t&&Et(t)}()}
//# sourceMappingURL=playerLog-40b987dc.js.map
