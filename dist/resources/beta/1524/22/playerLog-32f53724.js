import{e as t,aT as a,D as e,b6 as s,K as n,C as o,b7 as r,z as i,b8 as c,w as f,S as l,t as u,aS as p,b9 as d,a7 as m,h,m as b,B as g,E as y,i as j,o as w,G as $,M as k,ba as v,bb as C,bc as P,bd as _,a3 as L,Y as T,x as B}from"./calfSystem-1b876afa.js"
import"./playerName-14ec00f6.js"
import{t as x}from"./toLowerCase-128bd9cb.js"
import{a as E}from"./addCommas-97b5462a.js"
import{c as S}from"./currentGuildId-000cb2c0.js"
import"./fshOpen-3cbd8c34.js"
import{o as R}from"./openQuickBuffByName-40bbfe57.js"
import"./dataRows-d97d1e1d.js"
import{g as G,s as A}from"./idb-0681f9af.js"
import{c as I}from"./createStyle-923684dd.js"
import"./closest-f51e0443.js"
import{c as M}from"./closestTr-21ae2865.js"
import"./indexAjaxJson-1a78cb06.js"
import"./cmdExport-f01a6b63.js"
import{c as Y}from"./csvSplit-e0564c5b.js"
import{i as D}from"./insertHtmlAfterEnd-dd9b917d.js"
import{p as N}from"./parseDateAsTimestamp-50780e09.js"
import{b as q}from"./buffObj-a877b5f5.js"
import"./getProfile-712ac5b2.js"
import{m as z}from"./myStats-ab6896d7.js"
import{c as H}from"./closestTd-01c90426.js"
import{g as Q}from"./getMembrList-abec8b2f.js"
import"./doBuffLinkClick-dc6cfb27.js"
import{a as O}from"./addLogColoring-9af57996.js"
let W
async function J(e){return S()&&!W&&(W=async function(){return t(await Q(!1)).filter(([,t])=>a(t)).map(([t])=>t)}()),(await W).includes(e)}const K=t=>n(t.cells[2].children[0]),X=async([t,a])=>[t,a,await J(a)]
function F([t,a]){const e=o('a[href*="=createsecure&"]',t)
D(e,` | <a href="${r}${a}">Attack</a>`)}function U(t){const a=n(H(t).nextElementSibling.children[0])
i("Report",t),D(t,` | <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function V(t){return function(t){return f({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let Z,tt
function at(t,[a,e]){return"lastCheck"===a||e.logTime&&e.logTime>t}async function et(){const a=await G("fsh_pvpCombat")
if(!a)return{lastCheck:l}
const e=l-86400
return!a.lastCheck||a.lastCheck<e?function(a){const e=l-604800,s=t(a).filter(u(at,e)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(a):a}async function st(t,a){Z||(Z=et())
const e=await Z
return e[a]&&e[a].logTime?e[a]:async function(t,a,e){const s=await V(a)
if(s&&s.s)return tt||(tt={...e}),tt[a]={...s,logTime:N(n(t.cells[1]))/1e3},A("fsh_pvpCombat",tt),s}(t,a,e)}const nt=t=>o(d,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,a])=>[t,a,await st(t,/combat_id=(\d+)/.exec(a)[1])]
function it(t,a,e){return 0!==t?`${a}:<span class="${e}">${E(t)}</span> `:""}function ct(t,a){return 18===a.id?`${t}<br><span class="fshRed fshBold">${a.params[0]} leeched the buff '${a.params[1]}'.</span>`:21===a.id?`${t}<br><span class="fshRed fshBold">${a.params[0]} was mesmerized by Spell Breaker, losing the '${a.params[1]}' buff.</span>`:t}function ft([t,a,e]){const[s,n]=function(t,a){return/You were victorious over/.test(a)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(a)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",g(t.cells[2].firstChild)]}(t,a),o=function(t,a){return it(t.r.xp_gain,"XP stolen",a)+it(t.r.gold_gain,"Gold lost",a)+it(t.r.gold_stolen,"Gold stolen",a)+it(t.r.pvp_prestige_gain,"Prestige gain",a)+it(t.r.pvp_rating_change,"PvP change",a)+t.r.specials.reduce(ct,"")}(e,s)
t.cells[2].firstChild.remove(),m(t.cells[2],n),h(t.cells[2],b({innerHTML:o}))}const lt=t=>t.username
let ut
async function pt(){const t=await z(!1)
return{_allies:t._allies.map(lt),_enemies:t._enemies.map(lt)}}async function dt(t){return ut||(ut=pt()),(await ut)._allies.includes(t)}async function mt(t){return ut||(ut=pt()),(await ut)._enemies.includes(t)}async function ht(t){let a=""
const e=n(t),[s,o,r]=await Promise.all([J(e),dt(e),mt(e)])
return s?a="guild":o?a="ally":r&&(a="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,a]}function bt(t,[a,e]){return t[e]?t[e].push(a):t[e]=[a],t}const gt={guild:"green",ally:"blue",enemy:"red"}
function yt([t,a]){return`${a.join(", ")} { color: ${gt[t]}; }`}async function jt(a){const s=e(y,a)
if(0===s.length)return
const n=(await Promise.all(s.map(ht))).filter(([,t])=>""!==t),o=t(n.reduce(bt,{})).map(yt)
o.length&&(!function(t){const a=t.rows[0].cells[2]
a&&j(a,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(a),a.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const wt=t=>(t=>k(H(t).childNodes))(t).map(n)
function $t(t,a){return(t=>o(s,M(t)))(t)&&("Buff"===a||"Reply"===a&&$("enableChatParsing"))}function kt(t){const a=q.find(a=>((t,a)=>Y(a.nicks).includes(x(t)))(t,a))
if(a)return a.id}function vt(t){const{target:a}=t,e=n(a)
$t(a,e)&&("Reply"===e&&(!function(t){const a=wt(t).slice(0,2),e=a.join(" ")
let s=e
e.length>140&&(s=e.substring(0,140)+"..."),window.openQuickMsgDialog(a[0],"",s)}(a),t.preventDefault()),"Buff"===e&&function(t,a){const[e,s]=wt(a),n=/`~(.*)~`/.exec(s)
if(n){const a=Y(n[1]).map(kt).filter(t=>t).join(";")
R(e,a),t.preventDefault()}}(t,a))}const Ct=([,t])=>o(v,t)
function Pt([,t,a]){j(t.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _t(t,[a,,e]){const s=C.exec(a.href)[1],n=t&&!await J(e)?` | <a href="${r}${e}">Attack</a>`:""
j(a.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${e}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${P}${e}">Send</a> | <a href="${_}${e}">Trade</a>`+n+" ]</small>")}let Lt
const Tt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Bt(t){return Tt.test(g(t.cells[2]))}function xt(t){const a=N(n(t.cells[1]))
a>Lt&&(T(L,a),Lt=a)}function Et(t){!function(t){w(t,vt)}(t)
const a=$("addIgnoreLink"),o=$("addAttackLinkToLog")
a&&function(t){e('a[href*="reportMsg"]',t).forEach(U)}(t),$("colorPlayerNames")&&jt(t),o&&async function(t){const a=e(s,t)
if(0===a.length)return
const n=a.map(M).map(t=>[t,K(t)]);(await Promise.all(n.map(X))).filter(([,,t])=>!t).forEach(F)}(t),$("notificationWidgets")&&function(t,a,s){const o=e(y,t)
if(0===o.length)return
const r=o.map(t=>[t,M(t)]).filter(Ct).map(([t,a])=>[t,a,n(t)])
a&&r.forEach(Pt),r.forEach(u(_t,s))}(t,a,o),$("changeButtonLabels")&&function(t){e('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),e('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),$("trackLadderReset")&&function(t){Lt=$(L),e(v,t).map(M).filter(Bt).forEach(xt)}(t),$("showPvPSummaryInLog")&&async function(t){const a=e('a[href*="&combat_id="]',t)
if(0===a.length)return
const s=a.map(M).filter(nt).map(t=>[t,t.cells[2].innerHTML]).filter(ot);(await Promise.all(s.map(rt))).filter(([,,t])=>t&&t.s).forEach(ft)}(t)}export default function(){O("PlayerLog",1),function(){if(B())return
const t=o("#pCC > table:last-of-type")
t&&Et(t)}()}
//# sourceMappingURL=playerLog-32f53724.js.map
