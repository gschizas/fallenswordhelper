import{e as t,aV as e,D as a,bb as s,G as n,C as o,bc as r,z as i,bd as c,w as f,T as l,t as u,aU as p,be as d,a5 as m,h,m as g,B as b,E as y,i as j,o as w,H as $,M as k,bf as v,bg as C,bh as P,bi as _,a6 as L,Z as T,x as B}from"./calfSystem-38898f3e.js"
import"./playerName-b488fc7a.js"
import{t as x}from"./toLowerCase-2f55d839.js"
import{a as E}from"./addCommas-6d131931.js"
import{c as R}from"./createStyle-53451d66.js"
import{c as S}from"./currentGuildId-7855dbba.js"
import"./fshOpen-d34bc8a7.js"
import{o as G}from"./openQuickBuffByName-a5e51df0.js"
import"./dataRows-889d37da.js"
import{g as A,s as I}from"./idb-ccc44752.js"
import"./closest-d8e60c46.js"
import{c as M}from"./closestTr-4d04f2f4.js"
import"./indexAjaxJson-2402e0e9.js"
import"./cmdExport-2f232ad1.js"
import{c as D}from"./csvSplit-dcc6dfc9.js"
import{i as Y}from"./insertHtmlAfterEnd-8b82fe39.js"
import{p as N}from"./parseDateAsTimestamp-181259a8.js"
import{b as H}from"./buffObj-370bcf38.js"
import"./getProfile-26340e43.js"
import{m as q}from"./myStats-cc5a7a8d.js"
import{c as z}from"./closestTd-2fe37b69.js"
import{g as Q}from"./getMembrList-822d0963.js"
import"./doBuffLinkClick-501d566a.js"
import{a as O}from"./addLogColoring-d7632ccb.js"
let W
async function J(a){return S()&&!W&&(W=async function(){return t(await Q(!1)).filter(([,t])=>e(t)).map(([t])=>t)}()),(await W).includes(a)}const U=t=>n(t.cells[2].children[0]),V=async([t,e])=>[t,e,await J(e)]
function X([t,e]){const a=o('a[href*="=createsecure&"]',t)
Y(a,` | <a href="${r}${e}">Attack</a>`)}function Z(t){const e=n(z(t).nextElementSibling.children[0])
i("Report",t),Y(t,` | <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function F(t){return function(t){return f({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let K,tt
function et(t,[e,a]){return"lastCheck"===e||a.logTime&&a.logTime>t}async function at(){const e=await A("fsh_pvpCombat")
if(!e)return{lastCheck:l}
const a=l-86400
return!e.lastCheck||e.lastCheck<a?function(e){const a=l-604800,s=t(e).filter(u(et,a)),n={...p(s),lastCheck:l}
return I("fsh_pvpCombat",n),n}(e):e}async function st(t,e){K||(K=at())
const a=await K
return a[e]&&a[e].logTime?a[e]:async function(t,e,a){const s=await F(e)
if(s&&s.s)return tt||(tt={...a}),tt[e]={...s,logTime:N(n(t.cells[1]))/1e3},I("fsh_pvpCombat",tt),s}(t,e,a)}const nt=t=>o(d,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,e])=>[t,e,await st(t,/combat_id=(\d+)/.exec(e)[1])]
function it(t,e,a){return 0!==t?`${e}:<span class="${a}">${E(t)}</span> `:""}function ct(t,e){return 18===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:t}function ft([t,e,a]){const[s,n]=function(t,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",b(t.cells[2].firstChild)]}(t,e),o=function(t,e){return it(t.r.xp_gain,"XP stolen",e)+it(t.r.gold_gain,"Gold lost",e)+it(t.r.gold_stolen,"Gold stolen",e)+it(t.r.pvp_prestige_gain,"Prestige gain",e)+it(t.r.pvp_rating_change,"PvP change",e)+t.r.specials.reduce(ct,"")}(a,s)
t.cells[2].firstChild.remove(),m(t.cells[2],n),h(t.cells[2],g({innerHTML:o}))}const lt=t=>t.username
let ut
async function pt(){const t=await q(!1)
return{_allies:t._allies.map(lt),_enemies:t._enemies.map(lt)}}async function dt(t){return ut||(ut=pt()),(await ut)._allies.includes(t)}async function mt(t){return ut||(ut=pt()),(await ut)._enemies.includes(t)}async function ht(t){let e=""
const a=n(t),[s,o,r]=await Promise.all([J(a),dt(a),mt(a)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function gt(t,[e,a]){return t[a]?t[a].push(e):t[a]=[e],t}const bt={guild:"green",ally:"blue",enemy:"red"}
function yt([t,e]){return`${e.join(", ")} { color: ${bt[t]}; }`}async function jt(e){const s=a(y,e)
if(0===s.length)return
const n=(await Promise.all(s.map(ht))).filter(([,t])=>""!==t),o=t(n.reduce(gt,{})).map(yt)
o.length&&(!function(t){const e=t.rows[0].cells[2]
e&&j(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),h(document.body,R(o.join("\n"))))}const wt=t=>(t=>k(z(t).childNodes))(t).map(n)
function $t(t,e){return(t=>o(s,M(t)))(t)&&("Buff"===e||"Reply"===e&&$("enableChatParsing"))}function kt(t){const e=H.find(e=>((t,e)=>D(e.nicks).includes(x(t)))(t,e))
if(e)return e.id}function vt(t){const{target:e}=t,a=n(e)
$t(e,a)&&("Reply"===a&&(!function(t){const e=wt(t).slice(0,2),a=e.join(" ")
let s=a
a.length>140&&(s=a.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),t.preventDefault()),"Buff"===a&&function(t,e){const[a,s]=wt(e),n=/`~(.*)~`/.exec(s)
if(n){const e=D(n[1]).map(kt).filter(t=>t).join(";")
G(a,e),t.preventDefault()}}(t,e))}const Ct=([,t])=>o(v,t)
function Pt([,t,e]){j(t.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _t(t,[e,,a]){const s=C.exec(e.href)[1],n=t&&!await J(a)?` | <a href="${r}${a}">Attack</a>`:""
j(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${a}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${P}${a}">Send</a> | <a href="${_}${a}">Trade</a>`+n+" ]</small>")}let Lt
const Tt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Bt(t){return Tt.test(b(t.cells[2]))}function xt(t){const e=N(n(t.cells[1]))
e>Lt&&(T(L,e),Lt=e)}function Et(t){!function(t){w(t,vt)}(t)
const e=$("addIgnoreLink"),o=$("addAttackLinkToLog")
e&&function(t){a('a[href*="reportMsg"]',t).forEach(Z)}(t),$("colorPlayerNames")&&jt(t),o&&async function(t){const e=a(s,t)
if(0===e.length)return
const n=e.map(M).map(t=>[t,U(t)]);(await Promise.all(n.map(V))).filter(([,,t])=>!t).forEach(X)}(t),$("notificationWidgets")&&function(t,e,s){const o=a(y,t)
if(0===o.length)return
const r=o.map(t=>[t,M(t)]).filter(Ct).map(([t,e])=>[t,e,n(t)])
e&&r.forEach(Pt),r.forEach(u(_t,s))}(t,e,o),$("changeButtonLabels")&&function(t){a('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),a('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),$("trackLadderReset")&&function(t){Lt=$(L),a(v,t).map(M).filter(Bt).forEach(xt)}(t),$("showPvPSummaryInLog")&&async function(t){const e=a('a[href*="&combat_id="]',t)
if(0===e.length)return
const s=e.map(M).filter(nt).map(t=>[t,t.cells[2].innerHTML]).filter(ot);(await Promise.all(s.map(rt))).filter(([,,t])=>t&&t.s).forEach(ft)}(t)}function Rt(){O("PlayerLog",1),function(){if(B())return
const t=o("#pCC > table:last-of-type")
t&&Et(t)}()}export default Rt
//# sourceMappingURL=playerLog-51e7b8ad.js.map
