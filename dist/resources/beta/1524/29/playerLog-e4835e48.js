import{e as t,aS as e,D as n,b5 as s,b6 as a,E as o,C as r,z as i,b7 as c,G as f,i as l,w as u,S as m,t as p,aR as d,b8 as h,a7 as g,h as b,m as y,B as j,o as w,b9 as C,H as P,M as _,a3 as v,ba as k,Y as $,x as L}from"./calfSystem-f9a27018.js"
import"./playerName-6c5f1f5b.js"
import{t as T}from"./toLowerCase-0a22477f.js"
import{a as B}from"./addCommas-0aacc5f1.js"
import{c as E}from"./createStyle-601211fe.js"
import{c as x}from"./currentGuildId-a542fdb9.js"
import"./fshOpen-71b2b356.js"
import{o as R}from"./openQuickBuffByName-77bb54c1.js"
import"./dataRows-1ff76178.js"
import{g as G,s as S}from"./idb-5c501cd3.js"
import"./closest-14c30e26.js"
import{c as Y}from"./closestTr-0d6f3b27.js"
import"./indexAjaxJson-e32f2264.js"
import"./cmdExport-c40c0dde.js"
import{c as A}from"./csvSplit-b214d56b.js"
import{i as I}from"./insertHtmlAfterEnd-18e893ae.js"
import{p as M}from"./parseDateAsTimestamp-83334593.js"
import{b as D}from"./buffObj-cea0717c.js"
import"./getProfile-f70d5e2d.js"
import{m as H}from"./myStats-f6662cd8.js"
import{c as N}from"./closestTd-f9925bf4.js"
import{g as z}from"./getMembrList-2275ea18.js"
import"./doBuffLinkClick-c3ac034f.js"
import{a as O}from"./addLogColoring-d3c74d7e.js"
let Q
async function J(n){return x()&&!Q&&(Q=async function(){return t(await z(!1)).filter(([,t])=>e(t)).map(([t])=>t)}()),(await Q).includes(n)}const W=t=>[t,s(t.href,"target_username")],X=async([t,e])=>[t,e,await J(e)]
function q([t,e]){I(t,` | <a href="${a}${e}">Attack</a>`)}function F(t){return`<a href="${c}${f(t)}" data-tooltip="Add to Ignore List">Ignore</a>`}function K([t,,e]){i("Report",e),I(e," | "+F(t))}function U([t,e]){l(e.cells[1].children[0],`<font size="1"><br>[ ${F(t)} ]</font>`)}function V(t){return function(t){return u({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let Z,tt
function et(t,[e,n]){return"lastCheck"===e||n.logTime&&n.logTime>t}async function nt(){const e=await G("fsh_pvpCombat")
if(!e)return{lastCheck:m}
const n=m-86400
return!e.lastCheck||e.lastCheck<n?function(e){const n=m-604800,s=t(e).filter(p(et,n)),a={...d(s),lastCheck:m}
return S("fsh_pvpCombat",a),a}(e):e}async function st(t,e){Z||(Z=nt())
const n=await Z
return n[e]&&n[e].logTime?n[e]:async function(t,e,n){const s=await V(e)
if(s&&s.s)return tt||(tt={...n}),tt[e]={...s,logTime:M(f(t.cells[1]))/1e3},S("fsh_pvpCombat",tt),s}(t,e,n)}const at=t=>r(h,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,e])=>[t,e,await st(t,/combat_id=(\d+)/.exec(e)[1])]
function it(t,e,n){return 0!==t?`${e}:<span class="${n}">${B(t)}</span> `:""}function ct(t,e){return 18===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:t}function ft([t,e,n]){const[s,a]=function(t,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(t.cells[2].firstChild)]}(t,e),o=function(t,e){return it(t.r.xp_gain,"XP stolen",e)+it(t.r.gold_gain,"Gold lost",e)+it(t.r.gold_stolen,"Gold stolen",e)+it(t.r.pvp_prestige_gain,"Prestige gain",e)+it(t.r.pvp_rating_change,"PvP change",e)+t.r.specials.reduce(ct,"")}(n,s)
t.cells[2].firstChild.remove(),g(t.cells[2],a),b(t.cells[2],y({innerHTML:o}))}const lt=([,,t])=>t&&t.s
const ut=t=>t.username
let mt
async function pt(){const t=await H(!1)
return{_allies:t._allies.map(ut),_enemies:t._enemies.map(ut)}}async function dt(t){return mt||(mt=pt()),(await mt)._allies.includes(t)}async function ht(t){return mt||(mt=pt()),(await mt)._enemies.includes(t)}async function gt(t){let e=""
const n=f(t),[s,a,o]=await Promise.all([J(n),dt(n),ht(n)])
return s?e="guild":a?e="ally":o&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function bt(t,[e,n]){return t[n]?t[n].push(e):t[n]=[e],t}const yt={guild:"green",ally:"blue",enemy:"red"}
function jt([t,e]){return`${e.join(", ")} { color: ${yt[t]}; }`}const wt=([,t])=>t
function Ct(e,n){const s=function(e){return t(e.filter(wt).reduce(bt,{})).map(jt)}(n)
s.length&&(!function(t){const e=t.rows[0].cells[2]
e&&l(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),b(document.body,E(s.join("\n"))))}const Pt=t=>(t=>_(N(t).childNodes))(t).map(f)
function _t(t,e){return(t=>r(C,Y(t)))(t)&&("Buff"===e||"Reply"===e&&P("enableChatParsing"))}function vt(t){const e=D.find(e=>((t,e)=>A(e.nicks).includes(T(t)))(t,e))
if(e)return e.id}function kt(t){const{target:e}=t,n=f(e)
_t(e,n)&&("Reply"===n&&(!function(t){const e=Pt(t).slice(0,2),n=e.join(" ")
let s=n
n.length>140&&(s=n.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),t.preventDefault()),"Buff"===n&&function(t,e){const[n,s]=Pt(e),a=/`~(.*)~`/.exec(s)
if(a){const e=A(a[1]).map(vt).filter(t=>t).join(";")
R(n,e),t.preventDefault()}}(t,e))}let $t
const Lt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Tt(t){return Lt.test(j(t.cells[2]))}function Bt(t){const e=M(f(t.cells[1]))
e>$t&&($(v,e),$t=e)}const Et=[["addIgnoreLink",function(t){const e=n(o,t)
if(0===e.length)return
const s=e.map(t=>[t,Y(t)]).map(([t,e])=>[t,e,r('a[href*="reportMsg"]',e)])
s.filter(([,,t])=>t).forEach(K),s.filter(([,,t])=>!t).forEach(U)}],["colorPlayerNames",async function(t){const e=n(o,t)
if(!e.length)return
Ct(t,await Promise.all(e.map(gt)))}],["addAttackLinkToLog",async function(t){const e=n('a[href*="=createsecure&"]',t)
if(!e.length)return
const s=e.map(W);(await Promise.all(s.map(X))).filter(([,,t])=>!t).forEach(q)}],["changeButtonLabels",function(t){n('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),n('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}],["trackLadderReset",function(t){$t=P(v),n(k,t).map(Y).filter(Tt).forEach(Bt)}],["showPvPSummaryInLog",async function(t){const e=n('a[href*="&combat_id="]',t)
if(0===e.length)return;(await Promise.all(function(t){return t.map(Y).filter(at).map(t=>[t,t.cells[2].innerHTML]).filter(ot).map(rt)}(e))).filter(lt).forEach(ft)}]]
function xt(t,e){P(e[0])&&e[1](t)}function Rt(t){!function(t){w(t,kt)}(t),Et.forEach(p(xt,t))}function Gt(){O("PlayerLog",1),function(){if(L())return
const t=r("#pCC > table:last-of-type")
t&&Rt(t)}()}export default Gt
//# sourceMappingURL=playerLog-e4835e48.js.map
