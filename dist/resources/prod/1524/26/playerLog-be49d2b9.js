import{e as t,aT as e,D as s,b4 as a,b5 as n,E as o,C as r,z as i,b6 as c,G as f,i as l,w as u,S as m,t as p,aS as d,b7 as h,a7 as b,h as g,m as y,B as j,o as w,b8 as C,H as P,M as _,a3 as v,b9 as k,Y as $,x as L}from"./calfSystem-a5fc99d4.js"
import"./playerName-f44ad46e.js"
import{t as T}from"./toLowerCase-b21b7cc8.js"
import{a as B}from"./addCommas-b567f740.js"
import{c as x}from"./createStyle-7fc4c370.js"
import{c as E}from"./currentGuildId-c73fd152.js"
import"./fshOpen-a7890139.js"
import{o as G}from"./openQuickBuffByName-58a2f3ec.js"
import"./dataRows-27d1816d.js"
import{g as R,s as S}from"./idb-b13ab254.js"
import"./closest-c2515a48.js"
import{c as Y}from"./closestTr-a52072b1.js"
import"./indexAjaxJson-a651394e.js"
import"./cmdExport-a361aa41.js"
import{c as A}from"./csvSplit-653f6227.js"
import{i as I}from"./insertHtmlAfterEnd-4d0857c1.js"
import{p as M}from"./parseDateAsTimestamp-cea7abad.js"
import{b as D}from"./buffObj-edd5c6f3.js"
import"./getProfile-5b3b85bb.js"
import{m as H}from"./myStats-5a69344c.js"
import{c as N}from"./closestTd-1d024b4b.js"
import{g as z}from"./getMembrList-8c336a6e.js"
import"./doBuffLinkClick-4bf8b9d7.js"
import{a as O}from"./addLogColoring-36046f00.js"
let Q
async function J(s){return E()&&!Q&&(Q=async function(){return t(await z(!1)).filter(([,t])=>e(t)).map(([t])=>t)}()),(await Q).includes(s)}const W=t=>[t,a(t.href,"target_username")],X=async([t,e])=>[t,e,await J(e)]
function q([t,e]){I(t,` | <a href="${n}${e}">Attack</a>`)}function F(t){return`<a href="${c}${f(t)}" data-tooltip="Add to Ignore List">Ignore</a>`}function K([t,,e]){i("Report",e),I(e," | "+F(t))}function U([t,e]){l(e.cells[1].children[0],`<font size="1"><br>[ ${F(t)} ]</font>`)}function V(t){return function(t){return u({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let Z,tt
function et(t,[e,s]){return"lastCheck"===e||s.logTime&&s.logTime>t}async function st(){const e=await R("fsh_pvpCombat")
if(!e)return{lastCheck:m}
const s=m-86400
return!e.lastCheck||e.lastCheck<s?function(e){const s=m-604800,a=t(e).filter(p(et,s)),n={...d(a),lastCheck:m}
return S("fsh_pvpCombat",n),n}(e):e}async function at(t,e){Z||(Z=st())
const s=await Z
return s[e]&&s[e].logTime?s[e]:async function(t,e,s){const a=await V(e)
if(a&&a.s)return tt||(tt={...s}),tt[e]={...a,logTime:M(f(t.cells[1]))/1e3},S("fsh_pvpCombat",tt),a}(t,e,s)}const nt=t=>r(h,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,e])=>[t,e,await at(t,/combat_id=(\d+)/.exec(e)[1])]
function it(t,e,s){return 0!==t?`${e}:<span class="${s}">${B(t)}</span> `:""}function ct(t,e){return 18===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:t}function ft([t,e,s]){const[a,n]=function(t,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(t.cells[2].firstChild)]}(t,e),o=function(t,e){return it(t.r.xp_gain,"XP stolen",e)+it(t.r.gold_gain,"Gold lost",e)+it(t.r.gold_stolen,"Gold stolen",e)+it(t.r.pvp_prestige_gain,"Prestige gain",e)+it(t.r.pvp_rating_change,"PvP change",e)+t.r.specials.reduce(ct,"")}(s,a)
t.cells[2].firstChild.remove(),b(t.cells[2],n),g(t.cells[2],y({innerHTML:o}))}const lt=t=>t.username
let ut
async function mt(){const t=await H(!1)
return{_allies:t._allies.map(lt),_enemies:t._enemies.map(lt)}}async function pt(t){return ut||(ut=mt()),(await ut)._allies.includes(t)}async function dt(t){return ut||(ut=mt()),(await ut)._enemies.includes(t)}async function ht(t){let e=""
const s=f(t),[a,n,o]=await Promise.all([J(s),pt(s),dt(s)])
return a?e="guild":n?e="ally":o&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function bt(t,[e,s]){return t[s]?t[s].push(e):t[s]=[e],t}const gt={guild:"green",ally:"blue",enemy:"red"}
function yt([t,e]){return`${e.join(", ")} { color: ${gt[t]}; }`}async function jt(e){const a=s(o,e)
if(0===a.length)return
const n=(await Promise.all(a.map(ht))).filter(([,t])=>""!==t),r=t(n.reduce(bt,{})).map(yt)
r.length&&(!function(t){const e=t.rows[0].cells[2]
e&&l(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),g(document.body,x(r.join("\n"))))}const wt=t=>(t=>_(N(t).childNodes))(t).map(f)
function Ct(t,e){return(t=>r(C,Y(t)))(t)&&("Buff"===e||"Reply"===e&&P("enableChatParsing"))}function Pt(t){const e=D.find(e=>((t,e)=>A(e.nicks).includes(T(t)))(t,e))
if(e)return e.id}function _t(t){const{target:e}=t,s=f(e)
Ct(e,s)&&("Reply"===s&&(!function(t){const e=wt(t).slice(0,2),s=e.join(" ")
let a=s
s.length>140&&(a=s.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",a)}(e),t.preventDefault()),"Buff"===s&&function(t,e){const[s,a]=wt(e),n=/`~(.*)~`/.exec(a)
if(n){const e=A(n[1]).map(Pt).filter(t=>t).join(";")
G(s,e),t.preventDefault()}}(t,e))}let vt
const kt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function $t(t){return kt.test(j(t.cells[2]))}function Lt(t){const e=M(f(t.cells[1]))
e>vt&&($(v,e),vt=e)}function Tt(t){!function(t){w(t,_t)}(t)
const e=P("addIgnoreLink"),a=P("addAttackLinkToLog")
e&&function(t){const e=s(o,t)
if(0===e.length)return
const a=e.map(t=>[t,Y(t)]).map(([t,e])=>[t,e,r('a[href*="reportMsg"]',e)])
a.filter(([,,t])=>t).forEach(K),a.filter(([,,t])=>!t).forEach(U)}(t),P("colorPlayerNames")&&jt(t),a&&async function(t){const e=s('a[href*="=createsecure&"]',t)
if(!e.length)return
const a=e.map(W);(await Promise.all(a.map(X))).filter(([,,t])=>!t).forEach(q)}(t),P("changeButtonLabels")&&function(t){s('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),s('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),P("trackLadderReset")&&function(t){vt=P(v),s(k,t).map(Y).filter($t).forEach(Lt)}(t),P("showPvPSummaryInLog")&&async function(t){const e=s('a[href*="&combat_id="]',t)
if(0===e.length)return
const a=e.map(Y).filter(nt).map(t=>[t,t.cells[2].innerHTML]).filter(ot);(await Promise.all(a.map(rt))).filter(([,,t])=>t&&t.s).forEach(ft)}(t)}function Bt(){O("PlayerLog",1),function(){if(L())return
const t=r("#pCC > table:last-of-type")
t&&Tt(t)}()}export default Bt
//# sourceMappingURL=playerLog-be49d2b9.js.map
