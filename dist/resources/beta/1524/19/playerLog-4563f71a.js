import{l as t,aU as e,I as a,b7 as s,a8 as n,M as o,b8 as r,y as i,b9 as c,v as f,Q as l,s as u,aT as p,ba as d,a5 as m,f as h,k as b,bb as g,i as y,o as j,D as w,aD as $,bc as v,bd as k,be as C,a1 as P,A as _,W as L,w as T}from"./calfSystem-57340987.js"
import"./playerName-8027bacf.js"
import{t as x}from"./toLowerCase-b755896e.js"
import{a as B}from"./addCommas-8127b6a1.js"
import{c as E}from"./currentGuildId-fd144a5c.js"
import"./fshOpen-5a3828f4.js"
import{o as R}from"./openQuickBuffByName-69b6986b.js"
import"./dataRows-bbabdd56.js"
import{g as S,s as A}from"./idb-c55e2904.js"
import{c as I}from"./createStyle-1094727e.js"
import"./closest-f4291115.js"
import"./indexAjaxJson-f0b26dd6.js"
import{c as G}from"./csvSplit-356d0548.js"
import{i as M}from"./insertHtmlAfterEnd-c6138b5e.js"
import"./cmdExport-1b96d8bc.js"
import{c as D}from"./closestTr-ac8ec42f.js"
import{p as Y}from"./parseDateAsTimestamp-c9ded138.js"
import{b as N}from"./buffObj-939c34c8.js"
import"./getProfile-63915fbf.js"
import{m as Q}from"./myStats-aab3f9c7.js"
import{c as q}from"./closestTd-87ddc5fd.js"
import{g as H}from"./getMembrList-53881834.js"
import{a as W}from"./addLogColoring-3f6be2ab.js"
let z
async function O(a){return E()&&!z&&(z=async function(){return t(await H(!1)).filter(([,t])=>e(t)).map(([t])=>t)}()),(await z).includes(a)}const J=t=>n(t.cells[2].children[0]),U=async([t,e])=>[t,e,await O(e)]
function X([t,e]){const a=o('a[href*="=createsecure&"]',t)
M(a,` | <a href="${r}${e}">Attack</a>`)}function F(t){const e=n(q(t).nextElementSibling.children[0])
i("Report",t),M(t,` | <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function K(t){return function(t){return f({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let V,Z
function tt(t,[e,a]){return"lastCheck"===e||a.logTime&&a.logTime>t}async function et(){const e=await S("fsh_pvpCombat")
if(!e)return{lastCheck:l}
const a=l-86400
return!e.lastCheck||e.lastCheck<a?function(e){const a=l-604800,s=t(e).filter(u(tt,a)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(e):e}async function at(t,e){V||(V=et())
const a=await V
return a[e]&&a[e].logTime?a[e]:async function(t,e,a){const s=await K(e)
if(s&&s.s)return Z||(Z={...a}),Z[e]={...s,logTime:Y(n(t.cells[1]))/1e3},A("fsh_pvpCombat",Z),s}(t,e,a)}const st=t=>o(d,t),nt=([,t])=>!/\(Guild Conflict\)/.test(t),ot=async([t,e])=>[t,e,await at(t,/combat_id=(\d+)/.exec(e)[1])]
function rt(t,e,a){return 0!==t?`${e}:<span class="${a}">${B(t)}</span> `:""}function it(t,e){return 18===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:t}function ct([t,e,a]){const[s,n]=function(t,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",t.cells[2].firstChild.textContent]}(t,e),o=function(t,e){return rt(t.r.xp_gain,"XP stolen",e)+rt(t.r.gold_gain,"Gold lost",e)+rt(t.r.gold_stolen,"Gold stolen",e)+rt(t.r.pvp_prestige_gain,"Prestige gain",e)+rt(t.r.pvp_rating_change,"PvP change",e)+t.r.specials.reduce(it,"")}(a,s)
t.cells[2].firstChild.remove(),m(t.cells[2],n),h(t.cells[2],b({innerHTML:o}))}const ft=t=>t.username
let lt
async function ut(){const t=await Q(!1)
return{_allies:t._allies.map(ft),_enemies:t._enemies.map(ft)}}async function pt(t){return lt||(lt=ut()),(await lt)._allies.includes(t)}async function dt(t){return lt||(lt=ut()),(await lt)._enemies.includes(t)}async function mt(t){let e=""
const a=n(t),[s,o,r]=await Promise.all([O(a),pt(a),dt(a)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function ht(t,[e,a]){return t[a]?t[a].push(e):t[a]=[e],t}const bt={guild:"green",ally:"blue",enemy:"red"}
function gt([t,e]){return`${e.join(", ")} { color: ${bt[t]}; }`}async function yt(e){const s=a(g,e)
if(0===s.length)return
const n=(await Promise.all(s.map(mt))).filter(([,t])=>""!==t),o=t(n.reduce(ht,{})).map(gt)
o.length&&(!function(t){const e=t.rows[0].cells[2]
e&&y(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const jt=t=>(t=>$(q(t).childNodes))(t).map(n)
function wt(t,e){return(t=>o(s,D(t)))(t)&&("Buff"===e||"Reply"===e&&w("enableChatParsing"))}function $t(t){const e=N.find(e=>((t,e)=>G(e.nicks).includes(x(t)))(t,e))
if(e)return e.id}function vt(t){const{target:e}=t,a=n(e)
wt(e,a)&&("Reply"===a&&(!function(t){const e=jt(t).slice(0,2),a=e.join(" ")
let s=a
a.length>140&&(s=a.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),t.preventDefault()),"Buff"===a&&function(t,e){const[a,s]=jt(e),n=/`~(.*)~`/.exec(s)
if(n){const e=G(n[1]).map($t).filter(t=>t).join(";")
R(a,e),t.preventDefault()}}(t,e))}const kt=([,t])=>o(v,t)
function Ct([,t,e]){y(t.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function Pt(t,[e,,a]){const s=/&player_id=(\d+)/.exec(e.href)[1],n=t&&!await O(a)?` | <a href="${r}${a}">Attack</a>`:""
y(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${a}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${k}${a}">Send</a> | <a href="${C}${a}">Trade</a>`+n+" ]</small>")}let _t
const Lt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Tt(t){return Lt.test(_(t.cells[2]))}function xt(t){const e=Y(n(t.cells[1]))
e>_t&&(L(P,e),_t=e)}function Bt(t){!function(t){j(t,vt)}(t)
const e=w("addIgnoreLink"),o=w("addAttackLinkToLog")
e&&function(t){a('a[href*="reportMsg"]',t).forEach(F)}(t),w("colorPlayerNames")&&yt(t),o&&async function(t){const e=a(s,t)
if(0===e.length)return
const n=e.map(D).map(t=>[t,J(t)]);(await Promise.all(n.map(U))).filter(([,,t])=>!t).forEach(X)}(t),w("notificationWidgets")&&function(t,e,s){const o=a(g,t)
if(0===o.length)return
const r=o.map(t=>[t,D(t)]).filter(kt).map(([t,e])=>[t,e,n(t)])
e&&r.forEach(Ct),r.forEach(u(Pt,s))}(t,e,o),w("changeButtonLabels")&&function(t){a('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),a('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),w("trackLadderReset")&&function(t){_t=w(P),a(v,t).map(D).filter(Tt).forEach(xt)}(t),w("showPvPSummaryInLog")&&async function(t){const e=a('a[href*="&combat_id="]',t)
if(0===e.length)return
const s=e.map(D).filter(st).map(t=>[t,t.cells[2].innerHTML]).filter(nt);(await Promise.all(s.map(ot))).filter(([,,t])=>t&&t.s).forEach(ct)}(t)}export default function(){W("PlayerLog",1),function(){if(T())return
const t=o("#pCC > table:last-of-type")
t&&Bt(t)}()}
//# sourceMappingURL=playerLog-4563f71a.js.map
