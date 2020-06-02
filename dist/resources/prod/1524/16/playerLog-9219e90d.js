import{l as e,aU as a,I as t,b5 as s,a8 as n,M as o,b6 as r,y as i,b7 as c,v as f,Q as l,s as u,aT as p,b8 as m,a5 as d,f as h,k as g,b9 as b,i as y,o as j,D as w,aD as $,ba as v,bb as k,bc as P,a1 as C,A as _,W as L,w as T}from"./calfSystem-be09bdff.js"
import"./playerName-73d6a463.js"
import{t as x}from"./toLowerCase-28455111.js"
import{a as B}from"./addCommas-f6a1bc8a.js"
import{c as E}from"./currentGuildId-a5ce9ac2.js"
import"./fshOpen-d27f23b3.js"
import{o as R}from"./openQuickBuffByName-cbbf176e.js"
import"./dataRows-4159fd61.js"
import{g as S,s as A}from"./idb-a63ec135.js"
import{c as I}from"./createStyle-e061c495.js"
import"./closest-81c3e392.js"
import"./indexAjaxJson-f8cc1f1e.js"
import{c as G}from"./csvSplit-e4a6d9be.js"
import{i as M}from"./insertHtmlAfterEnd-a624273f.js"
import"./cmdExport-8189e42d.js"
import{c as D}from"./closestTr-973c6982.js"
import{p as Y}from"./parseDateAsTimestamp-f5ce65ae.js"
import{b as N}from"./buffObj-03833163.js"
import"./getProfile-394c4f03.js"
import{m as Q}from"./myStats-c8681855.js"
import{c as q}from"./closestTd-8fd36d70.js"
import{g as H}from"./getMembrList-48de369a.js"
import{a as W}from"./addLogColoring-6ac83c50.js"
let z
async function O(t){return E()&&!z&&(z=async function(){return e(await H(!1)).filter(([,e])=>a(e)).map(([e])=>e)}()),(await z).includes(t)}const J=e=>n(e.cells[2].children[0]),U=async([e,a])=>[e,a,await O(a)]
function X([e,a]){const t=o('a[href*="=createsecure&"]',e)
M(t,` | <a href="${r}${a}">Attack</a>`)}function F(e){const a=n(q(e).nextElementSibling.children[0])
i("Report",e),M(e,` | <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function K(e){return function(e){return f({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let V,Z
function ee(e,[a,t]){return"lastCheck"===a||t.logTime&&t.logTime>e}async function ae(){const a=await S("fsh_pvpCombat")
if(!a)return{lastCheck:l}
const t=l-86400
return!a.lastCheck||a.lastCheck<t?function(a){const t=l-604800,s=e(a).filter(u(ee,t)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(a):a}async function te(e,a){V||(V=ae())
const t=await V
return t[a]&&t[a].logTime?t[a]:async function(e,a,t){const s=await K(a)
if(s&&s.s)return Z||(Z={...t}),Z[a]={...s,logTime:Y(n(e.cells[1]))/1e3},A("fsh_pvpCombat",Z),s}(e,a,t)}const se=([,e])=>!/\(Guild Conflict\)/.test(e),ne=async([e,a])=>[e,a,await te(e,/combat_id=(\d+)/.exec(a)[1])]
function oe(e,a,t){return 0!==e?`${a}:<span class="${t}">${B(e)}</span> `:""}function re(e,a){return 18===a.id?`${e}<br><span class="fshRed fshBold">${a.params[0]} leeched the buff '${a.params[1]}'.</span>`:21===a.id?`${e}<br><span class="fshRed fshBold">${a.params[0]} was mesmerized by Spell Breaker, losing the '${a.params[1]}' buff.</span>`:e}function ie([e,a,t]){const[s,n]=function(e,a){return/You were victorious over/.test(a)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(a)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:e.cells[2].firstChild}(e,a),o=function(e,a){return oe(e.r.xp_gain,"XP stolen",a)+oe(e.r.gold_gain,"Gold lost",a)+oe(e.r.gold_stolen,"Gold stolen",a)+oe(e.r.pvp_prestige_gain,"Prestige gain",a)+oe(e.r.pvp_rating_change,"PvP change",a)+e.r.specials.reduce(re,"")}(t,s)
e.cells[2].firstChild.remove(),d(e.cells[2],n),h(e.cells[2],g({innerHTML:o}))}const ce=e=>e.username
let fe
async function le(){const e=await Q(!1)
return{_allies:e._allies.map(ce),_enemies:e._enemies.map(ce)}}async function ue(e){return fe||(fe=le()),(await fe)._allies.includes(e)}async function pe(e){return fe||(fe=le()),(await fe)._enemies.includes(e)}async function me(e){let a=""
const t=n(e),[s,o,r]=await Promise.all([O(t),ue(t),pe(t)])
return s?a="guild":o?a="ally":r&&(a="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,a]}function de(e,[a,t]){return e[t]?e[t].push(a):e[t]=[a],e}const he={guild:"green",ally:"blue",enemy:"red"}
function ge([e,a]){return`${a.join(", ")} { color: ${he[e]}; }`}async function be(a){const s=t(b,a)
if(0===s.length)return
const n=(await Promise.all(s.map(me))).filter(([,e])=>""!==e),o=e(n.reduce(de,{})).map(ge)
o.length&&(!function(e){const a=e.rows[0].cells[2]
a&&y(a,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(a),a.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const ye=e=>(e=>$(q(e).childNodes))(e).map(n)
function je(e,a){return(e=>o(s,D(e)))(e)&&("Buff"===a||"Reply"===a&&w("enableChatParsing"))}function we(e){const a=N.find(a=>((e,a)=>G(a.nicks).includes(x(e)))(e,a))
if(a)return a.id}function $e(e){const{target:a}=e,t=n(a)
je(a,t)&&("Reply"===t&&(!function(e){const a=ye(e).slice(0,2),t=a.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(a[0],"",s)}(a),e.preventDefault()),"Buff"===t&&function(e,a){const[t,s]=ye(a),n=/`~(.*)~`/.exec(s)
if(n){const a=G(n[1]).map(we).filter(e=>e).join(";")
R(t,a),e.preventDefault()}}(e,a))}const ve=([,e])=>o(v,e)
function ke([,e,a]){y(e.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function Pe(e,[a,,t]){const s=/&player_id=(\d+)/.exec(a.href)[1],n=e&&!await O(t)?` | <a href="${r}${t}">Attack</a>`:""
y(a.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${k}${t}">Send</a> | <a href="${P}${t}">Trade</a>`+n+" ]</small>")}let Ce
const _e=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Le(e){return _e.test(_(e.cells[2]))}function Te(e){const a=Y(n(e.cells[1]))
a>Ce&&(L(C,a),Ce=a)}function xe(e){!function(e){j(e,$e)}(e)
const a=w("addIgnoreLink"),o=w("addAttackLinkToLog")
a&&function(e){t('a[href*="reportMsg"]',e).forEach(F)}(e),w("colorPlayerNames")&&be(e),o&&async function(e){const a=t(s,e)
if(0===a.length)return
const n=a.map(D).map(e=>[e,J(e)]);(await Promise.all(n.map(U))).filter(([,,e])=>!e).forEach(X)}(e),w("notificationWidgets")&&function(e,a,s){const o=t(b,e)
if(0===o.length)return
const r=o.map(e=>[e,D(e)]).filter(ve).map(([e,a])=>[e,a,n(e)])
a&&r.forEach(ke),r.forEach(u(Pe,s))}(e,a,o),w("changeButtonLabels")&&function(e){t('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),t('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),w("trackLadderReset")&&function(e){Ce=w(C),t(v,e).map(D).filter(Le).forEach(Te)}(e),w("showPvPSummaryInLog")&&async function(e){const a=t(m,e)
if(0===a.length)return
const s=a.map(D).map(e=>[e,e.cells[2].innerHTML]).filter(se);(await Promise.all(s.map(ne))).filter(([,,e])=>e&&e.s).forEach(ie)}(e)}export default function(){W("PlayerLog",1),function(){if(T())return
const e=o("#pCC > table:last-of-type")
e&&xe(e)}()}
//# sourceMappingURL=playerLog-9219e90d.js.map
