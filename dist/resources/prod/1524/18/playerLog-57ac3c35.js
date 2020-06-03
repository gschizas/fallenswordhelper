import{l as t,aU as a,I as e,b5 as s,a8 as n,M as o,b6 as r,y as i,b7 as c,v as f,Q as l,s as u,aT as p,b8 as d,a5 as m,f as h,k as b,b9 as g,i as y,o as j,D as w,aD as $,ba as v,bb as k,bc as C,a1 as P,A as _,W as L,w as T}from"./calfSystem-8b6534a5.js"
import"./playerName-bb9c2b65.js"
import{t as x}from"./toLowerCase-91b39a88.js"
import{a as B}from"./addCommas-02f70763.js"
import{c as E}from"./currentGuildId-4a8535f4.js"
import"./fshOpen-b5a7c2c8.js"
import{o as R}from"./openQuickBuffByName-ccc15ff1.js"
import"./dataRows-7ad53ca7.js"
import{g as S,s as A}from"./idb-abce8d8d.js"
import{c as I}from"./createStyle-046c3f77.js"
import"./closest-92f48152.js"
import"./indexAjaxJson-b43ddbcc.js"
import{c as G}from"./csvSplit-69b90268.js"
import{i as M}from"./insertHtmlAfterEnd-4546785f.js"
import"./cmdExport-a4cd29b8.js"
import{c as D}from"./closestTr-6d4448c3.js"
import{p as Y}from"./parseDateAsTimestamp-c909c985.js"
import{b as N}from"./buffObj-24b0dd01.js"
import"./getProfile-7daaa2a5.js"
import{m as Q}from"./myStats-eb7eae50.js"
import{c as q}from"./closestTd-8826bc16.js"
import{g as H}from"./getMembrList-fd92f287.js"
import{a as W}from"./addLogColoring-7c1e6876.js"
let z
async function O(e){return E()&&!z&&(z=async function(){return t(await H(!1)).filter(([,t])=>a(t)).map(([t])=>t)}()),(await z).includes(e)}const J=t=>n(t.cells[2].children[0]),U=async([t,a])=>[t,a,await O(a)]
function X([t,a]){const e=o('a[href*="=createsecure&"]',t)
M(e,` | <a href="${r}${a}">Attack</a>`)}function F(t){const a=n(q(t).nextElementSibling.children[0])
i("Report",t),M(t,` | <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function K(t){return function(t){return f({cmd:"combat",subcmd:"view",combat_id:t})}(t)}let V,Z
function tt(t,[a,e]){return"lastCheck"===a||e.logTime&&e.logTime>t}async function at(){const a=await S("fsh_pvpCombat")
if(!a)return{lastCheck:l}
const e=l-86400
return!a.lastCheck||a.lastCheck<e?function(a){const e=l-604800,s=t(a).filter(u(tt,e)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(a):a}async function et(t,a){V||(V=at())
const e=await V
return e[a]&&e[a].logTime?e[a]:async function(t,a,e){const s=await K(a)
if(s&&s.s)return Z||(Z={...e}),Z[a]={...s,logTime:Y(n(t.cells[1]))/1e3},A("fsh_pvpCombat",Z),s}(t,a,e)}const st=([t])=>o(d,t),nt=([,t])=>!/\(Guild Conflict\)/.test(t),ot=async([t,a])=>[t,a,await et(t,/combat_id=(\d+)/.exec(a)[1])]
function rt(t,a,e){return 0!==t?`${a}:<span class="${e}">${B(t)}</span> `:""}function it(t,a){return 18===a.id?`${t}<br><span class="fshRed fshBold">${a.params[0]} leeched the buff '${a.params[1]}'.</span>`:21===a.id?`${t}<br><span class="fshRed fshBold">${a.params[0]} was mesmerized by Spell Breaker, losing the '${a.params[1]}' buff.</span>`:t}function ct([t,a,e]){const[s,n]=function(t,a){return/You were victorious over/.test(a)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(a)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",t.cells[2].firstChild.textContent]}(t,a),o=function(t,a){return rt(t.r.xp_gain,"XP stolen",a)+rt(t.r.gold_gain,"Gold lost",a)+rt(t.r.gold_stolen,"Gold stolen",a)+rt(t.r.pvp_prestige_gain,"Prestige gain",a)+rt(t.r.pvp_rating_change,"PvP change",a)+t.r.specials.reduce(it,"")}(e,s)
t.cells[2].firstChild.remove(),m(t.cells[2],n),h(t.cells[2],b({innerHTML:o}))}const ft=t=>t.username
let lt
async function ut(){const t=await Q(!1)
return{_allies:t._allies.map(ft),_enemies:t._enemies.map(ft)}}async function pt(t){return lt||(lt=ut()),(await lt)._allies.includes(t)}async function dt(t){return lt||(lt=ut()),(await lt)._enemies.includes(t)}async function mt(t){let a=""
const e=n(t),[s,o,r]=await Promise.all([O(e),pt(e),dt(e)])
return s?a="guild":o?a="ally":r&&(a="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(t).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,a]}function ht(t,[a,e]){return t[e]?t[e].push(a):t[e]=[a],t}const bt={guild:"green",ally:"blue",enemy:"red"}
function gt([t,a]){return`${a.join(", ")} { color: ${bt[t]}; }`}async function yt(a){const s=e(g,a)
if(0===s.length)return
const n=(await Promise.all(s.map(mt))).filter(([,t])=>""!==t),o=t(n.reduce(ht,{})).map(gt)
o.length&&(!function(t){const a=t.rows[0].cells[2]
a&&y(a,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(a),a.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const jt=t=>(t=>$(q(t).childNodes))(t).map(n)
function wt(t,a){return(t=>o(s,D(t)))(t)&&("Buff"===a||"Reply"===a&&w("enableChatParsing"))}function $t(t){const a=N.find(a=>((t,a)=>G(a.nicks).includes(x(t)))(t,a))
if(a)return a.id}function vt(t){const{target:a}=t,e=n(a)
wt(a,e)&&("Reply"===e&&(!function(t){const a=jt(t).slice(0,2),e=a.join(" ")
let s=e
e.length>140&&(s=e.substring(0,140)+"..."),window.openQuickMsgDialog(a[0],"",s)}(a),t.preventDefault()),"Buff"===e&&function(t,a){const[e,s]=jt(a),n=/`~(.*)~`/.exec(s)
if(n){const a=G(n[1]).map($t).filter(t=>t).join(";")
R(e,a),t.preventDefault()}}(t,a))}const kt=([,t])=>o(v,t)
function Ct([,t,a]){y(t.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function Pt(t,[a,,e]){const s=/&player_id=(\d+)/.exec(a.href)[1],n=t&&!await O(e)?` | <a href="${r}${e}">Attack</a>`:""
y(a.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${e}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${k}${e}">Send</a> | <a href="${C}${e}">Trade</a>`+n+" ]</small>")}let _t
const Lt=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Tt(t){return Lt.test(_(t.cells[2]))}function xt(t){const a=Y(n(t.cells[1]))
a>_t&&(L(P,a),_t=a)}function Bt(t){!function(t){j(t,vt)}(t)
const a=w("addIgnoreLink"),o=w("addAttackLinkToLog")
a&&function(t){e('a[href*="reportMsg"]',t).forEach(F)}(t),w("colorPlayerNames")&&yt(t),o&&async function(t){const a=e(s,t)
if(0===a.length)return
const n=a.map(D).map(t=>[t,J(t)]);(await Promise.all(n.map(U))).filter(([,,t])=>!t).forEach(X)}(t),w("notificationWidgets")&&function(t,a,s){const o=e(g,t)
if(0===o.length)return
const r=o.map(t=>[t,D(t)]).filter(kt).map(([t,a])=>[t,a,n(t)])
a&&r.forEach(Ct),r.forEach(u(Pt,s))}(t,a,o),w("changeButtonLabels")&&function(t){e('a[href*="=trade&"]',t).forEach(t=>i("Trade",t)),e('a[href*="=createsecure&"]',t).forEach(t=>i("ST",t))}(t),w("trackLadderReset")&&function(t){_t=w(P),e(v,t).map(D).filter(Tt).forEach(xt)}(t),w("showPvPSummaryInLog")&&async function(t){const a=e('a[href*="&combat_id="]',t)
if(0===a.length)return
const s=a.map(D).filter(st).map(t=>[t,t.cells[2].innerHTML]).filter(nt);(await Promise.all(s.map(ot))).filter(([,,t])=>t&&t.s).forEach(ct)}(t)}export default function(){W("PlayerLog",1),function(){if(T())return
const t=o("#pCC > table:last-of-type")
t&&Bt(t)}()}
//# sourceMappingURL=playerLog-57ac3c35.js.map
