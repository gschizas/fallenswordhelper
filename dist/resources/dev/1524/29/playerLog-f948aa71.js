import{e as t,aU as e,D as n,ba as a,bb as s,E as o,C as r,z as i,bc as c,G as f,i as l,w as u,T as m,t as p,aT as d,bd as h,a5 as b,h as g,m as y,B as j,o as w,be as C,H as P,M as _,a6 as v,bf as k,Z as $,x as L}from"./calfSystem-02c48ff5.js"
import"./playerName-5ca71009.js"
import{t as T}from"./toLowerCase-0a22477f.js"
import{a as B}from"./addCommas-0aacc5f1.js"
import{c as E}from"./createStyle-a35475d1.js"
import{c as x}from"./currentGuildId-cefcefd6.js"
import"./fshOpen-71b2b356.js"
import{o as G}from"./openQuickBuffByName-6e7bf41a.js"
import"./dataRows-46078e55.js"
import{g as R,s as S}from"./idb-49c5b621.js"
import"./closest-14c30e26.js"
import{c as A}from"./closestTr-9052729a.js"
import"./indexAjaxJson-afad01c3.js"
import"./cmdExport-3fceba30.js"
import{c as I}from"./csvSplit-b214d56b.js"
import{i as M}from"./insertHtmlAfterEnd-b7d6a20f.js"
import{p as Y}from"./parseDateAsTimestamp-c157f06b.js"
import{b as D}from"./buffObj-cea0717c.js"
import"./getProfile-a7de2d2c.js"
import{m as H}from"./myStats-bbbc339d.js"
import{c as N}from"./closestTd-4c5a848a.js"
import{g as z}from"./getMembrList-3e9950fc.js"
import"./doBuffLinkClick-991b04a9.js"
import{a as O}from"./addLogColoring-68535fbf.js"
let Q
async function J(n){return x()&&!Q&&(Q=async function(){return t(await z(!1)).filter(([,t])=>e(t)).map(([t])=>t)}()),(await Q).includes(n)}const U=t=>[t,a(t.href,"target_username")],W=async([t,e])=>[t,e,await J(e)]
function X([t,e]){M(t,` | <a href="${s}${e}">Attack</a>`)}function Z(t){return`<a href="${c}${f(t)}" data-tooltip="Add to Ignore List">Ignore</a>`}function q([t,,e]){i("Report",e),M(e," | "+Z(t))}function F([t,e]){l(e.cells[1].children[0],`<font size="1"><br>[ ${Z(t)} ]</font>`)}function K(t){return function(t){return u({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let V,tt
function et(t,[e,n]){return"lastCheck"===e||n.logTime&&n.logTime>t}async function nt(){const e=await R("fsh_pvpCombat")
if(!e)return{lastCheck:m}
const n=m-86400
return!e.lastCheck||e.lastCheck<n?function(e){const n=m-604800,a=t(e).filter(p(et,n)),s={...d(a),lastCheck:m}
return S("fsh_pvpCombat",s),s}(e):e}async function at(t,e){V||(V=nt())
const n=await V
return n[e]&&n[e].logTime?n[e]:async function(t,e,n){const a=await K(e)
if(a&&a.s)return tt||(tt={...n}),tt[e]={...a,logTime:Y(f(t.cells[1]))/1e3},S("fsh_pvpCombat",tt),a}(t,e,n)}const st=t=>r(h,t),ot=([,t])=>!/\(Guild Conflict\)/.test(t),rt=async([t,e])=>[t,e,await at(t,/combat_id=(\d+)/.exec(e)[1])]
function it(t,e,n){return 0!==t?`${e}:<span class="${n}">${B(t)}</span> `:""}function ct(t,e){return 18===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${t}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:t}function ft([t,e,n]){const[a,s]=function(t,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",j(t.cells[2].firstChild)]}(t,e),o=function(t,e){return it(t.r.xp_gain,"XP stolen",e)+it(t.r.gold_gain,"Gold lost",e)+it(t.r.gold_stolen,"Gold stolen",e)+it(t.r.pvp_prestige_gain,"Prestige gain",e)+it(t.r.pvp_rating_change,"PvP change",e)+t.r.specials.reduce(ct,"")}(n,a)
t.cells[2].firstChild.remove(),b(t.cells[2],s),g(t.cells[2],y({innerHTML:o}))}const lt=([,,t])=>t&&t.s
const ut=t=>t.username
let mt
async function pt(){const t=await H(!1)
return{_allies:t._allies.map(ut),_enemies:t._enemies.map(ut)}}async function dt(t){return mt||(mt=pt()),(await mt)._allies.includes(t)}async function ht(t){return mt||(mt=pt()),(await mt)._enemies.includes(t)}async function bt(t){let e=""
const n=f(t),[a,s,o]=await Promise.all([J(n),dt(n),ht(n)])
return a?e="guild":s?e="ally":o&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${A(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function gt(t,[e,n]){return t[n]?t[n].push(e):t[n]=[e],t}const yt={guild:"green",ally:"blue",enemy:"red"}
function jt([t,e]){return`${e.join(", ")} { color: ${yt[t]}; }`}const wt=([,t])=>t
function Ct(e,n){const a=function(e){return t(e.filter(wt).reduce(gt,{})).map(jt)}(n)
a.length&&(!function(t){const e=t.rows[0].cells[2]
e&&l(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),g(document.body,E(a.join("\n"))))}const Pt=t=>(t=>_(N(t).childNodes))(t).map(f)
function _t(t,e){return(t=>r(C,A(t)))(t)&&("Buff"===e||"Reply"===e&&P("enableChatParsing"))}function vt(t){const e=D.find(e=>((t,e)=>I(e.nicks).includes(T(t)))(t,e))
if(e)return e.id}function kt(t){const{target:e}=t,n=f(e)
_t(e,n)&&("Reply"===n&&(!function(t){const e=Pt(t).slice(0,2),n=e.join(" ")
let a=n
n.length>140&&(a=n.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",a)}(e),t.preventDefault()),"Buff"===n&&function(t,e){const[n,a]=Pt(e),s=/`~(.*)~`/.exec(a)
if(s){const e=I(s[1]).map(vt).filter(t=>t).join(";")
G(n,e),t.preventDefault()}}(t,e))}let $t
const Lt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Tt(t){return Lt.test(j(t.cells[2]))}function Bt(t){const e=Y(f(t.cells[1]))
e>$t&&($(v,e),$t=e)}const Et=[["addIgnoreLink",function(t){const e=n(o,t)
if(0===e.length)return
const a=e.map(t=>[t,A(t)]).map(([t,e])=>[t,e,r('a[href*="reportMsg"]',e)])
a.filter(([,,t])=>t).forEach(q),a.filter(([,,t])=>!t).forEach(F)}],["colorPlayerNames",async function(t){const e=n(o,t)
if(!e.length)return
Ct(t,await Promise.all(e.map(bt)))}],["addAttackLinkToLog",async function(t){const e=n('a[href*="=createsecure&"]',t)
if(!e.length)return
const a=e.map(U);(await Promise.all(a.map(W))).filter(([,,t])=>!t).forEach(X)}],["changeButtonLabels",function(t){n('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),n('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}],["trackLadderReset",function(t){$t=P(v),n(k,t).map(A).filter(Tt).forEach(Bt)}],["showPvPSummaryInLog",async function(t){const e=n('a[href*="&combat_id="]',t)
if(0===e.length)return;(await Promise.all(function(t){return t.map(A).filter(st).map(t=>[t,t.cells[2].innerHTML]).filter(ot).map(rt)}(e))).filter(lt).forEach(ft)}]]
function xt(t,e){P(e[0])&&e[1](t)}function Gt(t){!function(t){w(t,kt)}(t),Et.forEach(p(xt,t))}function Rt(){O("PlayerLog",1),function(){if(L())return
const t=r("#pCC > table:last-of-type")
t&&Gt(t)}()}export default Rt
//# sourceMappingURL=playerLog-f948aa71.js.map
