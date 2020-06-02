import{l as a,aU as e,I as t,b7 as s,a8 as n,M as o,b8 as r,y as i,b9 as c,v as f,Q as l,s as u,aT as p,ba as d,a5 as m,f as h,k as b,bb as g,i as y,o as j,D as w,aD as $,bc as v,bd as k,be as P,a1 as C,A as _,W as L,w as T}from"./calfSystem-9554b525.js"
import"./playerName-855f1e8d.js"
import{t as x}from"./toLowerCase-5de73e6e.js"
import{a as B}from"./addCommas-f0a6ae56.js"
import{c as E}from"./currentGuildId-7c7a6b86.js"
import"./fshOpen-cf721236.js"
import{o as R}from"./openQuickBuffByName-72f82ff2.js"
import"./dataRows-16ab74f1.js"
import{g as S,s as A}from"./idb-e27acc21.js"
import{c as I}from"./createStyle-1635cb7b.js"
import"./closest-687f4f6c.js"
import"./indexAjaxJson-24e555fb.js"
import{c as G}from"./csvSplit-6b438d23.js"
import{i as M}from"./insertHtmlAfterEnd-b9b58b3d.js"
import"./cmdExport-d8ee0a12.js"
import{c as D}from"./closestTr-a2db1fa0.js"
import{p as Y}from"./parseDateAsTimestamp-88f3f0a3.js"
import{b as N}from"./buffObj-01a07e20.js"
import"./getProfile-7babcba2.js"
import{m as Q}from"./myStats-3ad83ab7.js"
import{c as q}from"./closestTd-0b796462.js"
import{g as H}from"./getMembrList-a47eb3dc.js"
import{a as W}from"./addLogColoring-df38d3e2.js"
let z
async function O(t){return E()&&!z&&(z=async function(){return a(await H(!1)).filter(([,a])=>e(a)).map(([a])=>a)}()),(await z).includes(t)}const J=a=>n(a.cells[2].children[0]),U=async([a,e])=>[a,e,await O(e)]
function X([a,e]){const t=o('a[href*="=createsecure&"]',a)
M(t,` | <a href="${r}${e}">Attack</a>`)}function F(a){const e=n(q(a).nextElementSibling.children[0])
i("Report",a),M(a,` | <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function K(a){return function(a){return f({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let V,Z
function aa(a,[e,t]){return"lastCheck"===e||t.logTime&&t.logTime>a}async function ea(){const e=await S("fsh_pvpCombat")
if(!e)return{lastCheck:l}
const t=l-86400
return!e.lastCheck||e.lastCheck<t?function(e){const t=l-604800,s=a(e).filter(u(aa,t)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(e):e}async function ta(a,e){V||(V=ea())
const t=await V
return t[e]&&t[e].logTime?t[e]:async function(a,e,t){const s=await K(e)
if(s&&s.s)return Z||(Z={...t}),Z[e]={...s,logTime:Y(n(a.cells[1]))/1e3},A("fsh_pvpCombat",Z),s}(a,e,t)}const sa=([,a])=>!/\(Guild Conflict\)/.test(a),na=async([a,e])=>[a,e,await ta(a,/combat_id=(\d+)/.exec(e)[1])]
function oa(a,e,t){return 0!==a?`${e}:<span class="${t}">${B(a)}</span> `:""}function ra(a,e){return 18===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:a}function ia([a,e,t]){const[s,n]=function(a,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:a.cells[2].firstChild}(a,e),o=function(a,e){return oa(a.r.xp_gain,"XP stolen",e)+oa(a.r.gold_gain,"Gold lost",e)+oa(a.r.gold_stolen,"Gold stolen",e)+oa(a.r.pvp_prestige_gain,"Prestige gain",e)+oa(a.r.pvp_rating_change,"PvP change",e)+a.r.specials.reduce(ra,"")}(t,s)
a.cells[2].firstChild.remove(),m(a.cells[2],n),h(a.cells[2],b({innerHTML:o}))}const ca=a=>a.username
let fa
async function la(){const a=await Q(!1)
return{_allies:a._allies.map(ca),_enemies:a._enemies.map(ca)}}async function ua(a){return fa||(fa=la()),(await fa)._allies.includes(a)}async function pa(a){return fa||(fa=la()),(await fa)._enemies.includes(a)}async function da(a){let e=""
const t=n(a),[s,o,r]=await Promise.all([O(t),ua(t),pa(t)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function ma(a,[e,t]){return a[t]?a[t].push(e):a[t]=[e],a}const ha={guild:"green",ally:"blue",enemy:"red"}
function ba([a,e]){return`${e.join(", ")} { color: ${ha[a]}; }`}async function ga(e){const s=t(g,e)
if(0===s.length)return
const n=(await Promise.all(s.map(da))).filter(([,a])=>""!==a),o=a(n.reduce(ma,{})).map(ba)
o.length&&(!function(a){const e=a.rows[0].cells[2]
e&&y(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const ya=a=>(a=>$(q(a).childNodes))(a).map(n)
function ja(a,e){return(a=>o(s,D(a)))(a)&&("Buff"===e||"Reply"===e&&w("enableChatParsing"))}function wa(a){const e=N.find(e=>((a,e)=>G(e.nicks).includes(x(a)))(a,e))
if(e)return e.id}function $a(a){const{target:e}=a,t=n(e)
ja(e,t)&&("Reply"===t&&(!function(a){const e=ya(a).slice(0,2),t=e.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),a.preventDefault()),"Buff"===t&&function(a,e){const[t,s]=ya(e),n=/`~(.*)~`/.exec(s)
if(n){const e=G(n[1]).map(wa).filter(a=>a).join(";")
R(t,e),a.preventDefault()}}(a,e))}const va=([,a])=>o(v,a)
function ka([,a,e]){y(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function Pa(a,[e,,t]){const s=/&player_id=(\d+)/.exec(e.href)[1],n=a&&!await O(t)?` | <a href="${r}${t}">Attack</a>`:""
y(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${k}${t}">Send</a> | <a href="${P}${t}">Trade</a>`+n+" ]</small>")}let Ca
const _a=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function La(a){return _a.test(_(a.cells[2]))}function Ta(a){const e=Y(n(a.cells[1]))
e>Ca&&(L(C,e),Ca=e)}function xa(a){!function(a){j(a,$a)}(a)
const e=w("addIgnoreLink"),o=w("addAttackLinkToLog")
e&&function(a){t('a[href*="reportMsg"]',a).forEach(F)}(a),w("colorPlayerNames")&&ga(a),o&&async function(a){const e=t(s,a)
if(0===e.length)return
const n=e.map(D).map(a=>[a,J(a)]);(await Promise.all(n.map(U))).filter(([,,a])=>!a).forEach(X)}(a),w("notificationWidgets")&&function(a,e,s){const o=t(g,a)
if(0===o.length)return
const r=o.map(a=>[a,D(a)]).filter(va).map(([a,e])=>[a,e,n(a)])
e&&r.forEach(ka),r.forEach(u(Pa,s))}(a,e,o),w("changeButtonLabels")&&function(a){t('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),t('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),w("trackLadderReset")&&function(a){Ca=w(C),t(v,a).map(D).filter(La).forEach(Ta)}(a),w("showPvPSummaryInLog")&&async function(a){const e=t(d,a)
if(0===e.length)return
const s=e.map(D).map(a=>[a,a.cells[2].innerHTML]).filter(sa);(await Promise.all(s.map(na))).filter(([,,a])=>a&&a.s).forEach(ia)}(a)}export default function(){W("PlayerLog",1),function(){if(T())return
const a=o("#pCC > table:last-of-type")
a&&xa(a)}()}
//# sourceMappingURL=playerLog-01db3908.js.map
