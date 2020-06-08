import{m as t,aV as a,D as e,bb as s,K as n,C as o,bc as r,z as i,bd as c,w as f,T as l,t as u,aU as p,be as m,a5 as d,f as h,l as g,E as b,i as y,o as j,G as w,M as $,bf as C,bg as k,bh as v,bi as P,a6 as _,B as L,Z as T,x}from"./calfSystem-a2862afc.js"
import"./playerName-72c7301a.js"
import{t as B}from"./toLowerCase-2574a84c.js"
import{a as E}from"./addCommas-f02ec3aa.js"
import{c as R}from"./currentGuildId-e84c528e.js"
import"./fshOpen-a1ebd7c1.js"
import{o as S}from"./openQuickBuffByName-808f9233.js"
import"./dataRows-b327254e.js"
import{g as G,s as A}from"./idb-911ff7c2.js"
import{c as I}from"./createStyle-571bf4ff.js"
import{i as M}from"./insertHtmlAfterEnd-dd2b68c5.js"
import"./indexAjaxJson-afc1ac85.js"
import"./cmdExport-356fd6f3.js"
import"./closest-75b5e3c5.js"
import{c as D}from"./closestTr-8090afea.js"
import{c as Y}from"./csvSplit-f4c1f44b.js"
import{p as N}from"./parseDateAsTimestamp-0811cfc6.js"
import{b as q}from"./buffObj-517e038a.js"
import"./getProfile-57a9a6d7.js"
import{m as z}from"./myStats-8612677a.js"
import{c as H}from"./closestTd-0e7356b0.js"
import{g as Q}from"./getMembrList-daab7ad2.js"
import"./doBuffLinkClick-0e2cbd69.js"
import{a as O}from"./addLogColoring-cbb58717.js"
let W
async function J(e){return R()&&!W&&(W=async function(){return t(await Q(!1)).filter(([,t])=>a(t)).map(([t])=>t)}()),(await W).includes(e)}const K=t=>n(t.cells[2].children[0]),U=async([t,a])=>[t,a,await J(a)]
function V([t,a]){const e=o('a[href*="=createsecure&"]',t)
M(e,` | <a href="${r}${a}">Attack</a>`)}function X(t){const a=n(H(t).nextElementSibling.children[0])
i("Report",t),M(t,` | <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function Z(t){return function(t){return f({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let F,tt
function at(t,[a,e]){return"lastCheck"===a||e.logTime&&e.logTime>t}async function et(){const a=await G("fsh_pvpCombat")
if(!a)return{lastCheck:l}
const e=l-86400
return!a.lastCheck||a.lastCheck<e?function(a){const e=l-604800,s=t(a).filter(u(at,e)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(a):a}async function st(t,a){F||(F=et())
const e=await F
return e[a]&&e[a].logTime?e[a]:async function(t,a,e){const s=await Z(a)
if(s&&s.s)return tt||(tt={...e}),tt[a]={...s,logTime:N(n(t.cells[1]))/1e3},A("fsh_pvpCombat",tt),s}(t,a,e)}const nt=t=>o(m,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,a])=>[t,a,await st(t,/combat_id=(\d+)/.exec(a)[1])]
function it(t,a,e){return 0!==t?`${a}:<span class="${e}">${E(t)}</span> `:""}function ct(t,a){return 18===a.id?`${t}<br><span class="fshRed fshBold">${a.params[0]} leeched the buff '${a.params[1]}'.</span>`:21===a.id?`${t}<br><span class="fshRed fshBold">${a.params[0]} was mesmerized by Spell Breaker, losing the '${a.params[1]}' buff.</span>`:t}function ft([t,a,e]){const[s,n]=function(t,a){return/You were victorious over/.test(a)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(a)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",t.cells[2].firstChild.textContent]}(t,a),o=function(t,a){return it(t.r.xp_gain,"XP stolen",a)+it(t.r.gold_gain,"Gold lost",a)+it(t.r.gold_stolen,"Gold stolen",a)+it(t.r.pvp_prestige_gain,"Prestige gain",a)+it(t.r.pvp_rating_change,"PvP change",a)+t.r.specials.reduce(ct,"")}(e,s)
t.cells[2].firstChild.remove(),d(t.cells[2],n),h(t.cells[2],g({innerHTML:o}))}const lt=t=>t.username
let ut
async function pt(){const t=await z(!1)
return{_allies:t._allies.map(lt),_enemies:t._enemies.map(lt)}}async function mt(t){return ut||(ut=pt()),(await ut)._allies.includes(t)}async function dt(t){return ut||(ut=pt()),(await ut)._enemies.includes(t)}async function ht(t){let a=""
const e=n(t),[s,o,r]=await Promise.all([J(e),mt(e),dt(e)])
return s?a="guild":o?a="ally":r&&(a="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,a]}function gt(t,[a,e]){return t[e]?t[e].push(a):t[e]=[a],t}const bt={guild:"green",ally:"blue",enemy:"red"}
function yt([t,a]){return`${a.join(", ")} { color: ${bt[t]}; }`}async function jt(a){const s=e(b,a)
if(0===s.length)return
const n=(await Promise.all(s.map(ht))).filter(([,t])=>""!==t),o=t(n.reduce(gt,{})).map(yt)
o.length&&(!function(t){const a=t.rows[0].cells[2]
a&&y(a,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(a),a.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const wt=t=>(t=>$(H(t).childNodes))(t).map(n)
function $t(t,a){return(t=>o(s,D(t)))(t)&&("Buff"===a||"Reply"===a&&w("enableChatParsing"))}function Ct(t){const a=q.find(a=>((t,a)=>Y(a.nicks).includes(B(t)))(t,a))
if(a)return a.id}function kt(t){const{target:a}=t,e=n(a)
$t(a,e)&&("Reply"===e&&(!function(t){const a=wt(t).slice(0,2),e=a.join(" ")
let s=e
e.length>140&&(s=e.substring(0,140)+"..."),window.openQuickMsgDialog(a[0],"",s)}(a),t.preventDefault()),"Buff"===e&&function(t,a){const[e,s]=wt(a),n=/`~(.*)~`/.exec(s)
if(n){const a=Y(n[1]).map(Ct).filter(t=>t).join(";")
S(e,a),t.preventDefault()}}(t,a))}const vt=([,t])=>o(C,t)
function Pt([,t,a]){y(t.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _t(t,[a,,e]){const s=k.exec(a.href)[1],n=t&&!await J(e)?` | <a href="${r}${e}">Attack</a>`:""
y(a.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${e}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${v}${e}">Send</a> | <a href="${P}${e}">Trade</a>`+n+" ]</small>")}let Lt
const Tt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function xt(t){return Tt.test(L(t.cells[2]))}function Bt(t){const a=N(n(t.cells[1]))
a>Lt&&(T(_,a),Lt=a)}function Et(t){!function(t){j(t,kt)}(t)
const a=w("addIgnoreLink"),o=w("addAttackLinkToLog")
a&&function(t){e('a[href*="reportMsg"]',t).forEach(X)}(t),w("colorPlayerNames")&&jt(t),o&&async function(t){const a=e(s,t)
if(0===a.length)return
const n=a.map(D).map(t=>[t,K(t)]);(await Promise.all(n.map(U))).filter(([,,t])=>!t).forEach(V)}(t),w("notificationWidgets")&&function(t,a,s){const o=e(b,t)
if(0===o.length)return
const r=o.map(t=>[t,D(t)]).filter(vt).map(([t,a])=>[t,a,n(t)])
a&&r.forEach(Pt),r.forEach(u(_t,s))}(t,a,o),w("changeButtonLabels")&&function(t){e('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),e('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),w("trackLadderReset")&&function(t){Lt=w(_),e(C,t).map(D).filter(xt).forEach(Bt)}(t),w("showPvPSummaryInLog")&&async function(t){const a=e('a[href*="&combat_id="]',t)
if(0===a.length)return
const s=a.map(D).filter(nt).map(t=>[t,t.cells[2].innerHTML]).filter(ot);(await Promise.all(s.map(rt))).filter(([,,t])=>t&&t.s).forEach(ft)}(t)}export default function(){O("PlayerLog",1),function(){if(x())return
const t=o("#pCC > table:last-of-type")
t&&Et(t)}()}
//# sourceMappingURL=playerLog-e8bc29e2.js.map
