import{e as a,aV as e,D as t,bb as s,K as n,C as o,bc as r,z as i,bd as c,w as f,T as l,t as u,aU as p,be as d,a5 as m,h,m as b,B as g,E as y,i as j,o as w,G as $,M as k,bf as v,bg as C,bh as P,bi as _,a6 as L,Z as T,x as B}from"./calfSystem-9901ad27.js"
import"./playerName-a0f4217f.js"
import{t as x}from"./toLowerCase-dda30e6b.js"
import{a as E}from"./addCommas-8cd7d96d.js"
import{c as R}from"./currentGuildId-86da8be9.js"
import"./fshOpen-ee221b8b.js"
import{o as S}from"./openQuickBuffByName-181ee98a.js"
import"./dataRows-8a79afc4.js"
import{g as G,s as A}from"./idb-efff97cf.js"
import{c as I}from"./createStyle-7b1b43cf.js"
import"./closest-5107b89a.js"
import{c as M}from"./closestTr-5c087056.js"
import"./indexAjaxJson-93ae4cbc.js"
import"./cmdExport-f7c4fb03.js"
import{c as D}from"./csvSplit-4ba7a6af.js"
import{i as Y}from"./insertHtmlAfterEnd-74bf7056.js"
import{p as N}from"./parseDateAsTimestamp-517c1f16.js"
import{b as q}from"./buffObj-6db8253c.js"
import"./getProfile-fa400fda.js"
import{m as z}from"./myStats-6b1ad672.js"
import{c as H}from"./closestTd-bbe44d93.js"
import{g as Q}from"./getMembrList-42ade563.js"
import"./doBuffLinkClick-026a6604.js"
import{a as O}from"./addLogColoring-c78dba45.js"
let W
async function J(t){return R()&&!W&&(W=async function(){return a(await Q(!1)).filter(([,a])=>e(a)).map(([a])=>a)}()),(await W).includes(t)}const K=a=>n(a.cells[2].children[0]),U=async([a,e])=>[a,e,await J(e)]
function V([a,e]){const t=o('a[href*="=createsecure&"]',a)
Y(t,` | <a href="${r}${e}">Attack</a>`)}function X(a){const e=n(H(a).nextElementSibling.children[0])
i("Report",a),Y(a,` | <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function Z(a){return function(a){return f({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let F,aa
function ea(a,[e,t]){return"lastCheck"===e||t.logTime&&t.logTime>a}async function ta(){const e=await G("fsh_pvpCombat")
if(!e)return{lastCheck:l}
const t=l-86400
return!e.lastCheck||e.lastCheck<t?function(e){const t=l-604800,s=a(e).filter(u(ea,t)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(e):e}async function sa(a,e){F||(F=ta())
const t=await F
return t[e]&&t[e].logTime?t[e]:async function(a,e,t){const s=await Z(e)
if(s&&s.s)return aa||(aa={...t}),aa[e]={...s,logTime:N(n(a.cells[1]))/1e3},A("fsh_pvpCombat",aa),s}(a,e,t)}const na=a=>o(d,a),oa=([,a])=>!/\(Guild Conflict\)/.test(a),ra=async([a,e])=>[a,e,await sa(a,/combat_id=(\d+)/.exec(e)[1])]
function ia(a,e,t){return 0!==a?`${e}:<span class="${t}">${E(a)}</span> `:""}function ca(a,e){return 18===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:a}function fa([a,e,t]){const[s,n]=function(a,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",g(a.cells[2].firstChild)]}(a,e),o=function(a,e){return ia(a.r.xp_gain,"XP stolen",e)+ia(a.r.gold_gain,"Gold lost",e)+ia(a.r.gold_stolen,"Gold stolen",e)+ia(a.r.pvp_prestige_gain,"Prestige gain",e)+ia(a.r.pvp_rating_change,"PvP change",e)+a.r.specials.reduce(ca,"")}(t,s)
a.cells[2].firstChild.remove(),m(a.cells[2],n),h(a.cells[2],b({innerHTML:o}))}const la=a=>a.username
let ua
async function pa(){const a=await z(!1)
return{_allies:a._allies.map(la),_enemies:a._enemies.map(la)}}async function da(a){return ua||(ua=pa()),(await ua)._allies.includes(a)}async function ma(a){return ua||(ua=pa()),(await ua)._enemies.includes(a)}async function ha(a){let e=""
const t=n(a),[s,o,r]=await Promise.all([J(t),da(t),ma(t)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function ba(a,[e,t]){return a[t]?a[t].push(e):a[t]=[e],a}const ga={guild:"green",ally:"blue",enemy:"red"}
function ya([a,e]){return`${e.join(", ")} { color: ${ga[a]}; }`}async function ja(e){const s=t(y,e)
if(0===s.length)return
const n=(await Promise.all(s.map(ha))).filter(([,a])=>""!==a),o=a(n.reduce(ba,{})).map(ya)
o.length&&(!function(a){const e=a.rows[0].cells[2]
e&&j(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const wa=a=>(a=>k(H(a).childNodes))(a).map(n)
function $a(a,e){return(a=>o(s,M(a)))(a)&&("Buff"===e||"Reply"===e&&$("enableChatParsing"))}function ka(a){const e=q.find(e=>((a,e)=>D(e.nicks).includes(x(a)))(a,e))
if(e)return e.id}function va(a){const{target:e}=a,t=n(e)
$a(e,t)&&("Reply"===t&&(!function(a){const e=wa(a).slice(0,2),t=e.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),a.preventDefault()),"Buff"===t&&function(a,e){const[t,s]=wa(e),n=/`~(.*)~`/.exec(s)
if(n){const e=D(n[1]).map(ka).filter(a=>a).join(";")
S(t,e),a.preventDefault()}}(a,e))}const Ca=([,a])=>o(v,a)
function Pa([,a,e]){j(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _a(a,[e,,t]){const s=C.exec(e.href)[1],n=a&&!await J(t)?` | <a href="${r}${t}">Attack</a>`:""
j(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${P}${t}">Send</a> | <a href="${_}${t}">Trade</a>`+n+" ]</small>")}let La
const Ta=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ba(a){return Ta.test(g(a.cells[2]))}function xa(a){const e=N(n(a.cells[1]))
e>La&&(T(L,e),La=e)}function Ea(a){!function(a){w(a,va)}(a)
const e=$("addIgnoreLink"),o=$("addAttackLinkToLog")
e&&function(a){t('a[href*="reportMsg"]',a).forEach(X)}(a),$("colorPlayerNames")&&ja(a),o&&async function(a){const e=t(s,a)
if(0===e.length)return
const n=e.map(M).map(a=>[a,K(a)]);(await Promise.all(n.map(U))).filter(([,,a])=>!a).forEach(V)}(a),$("notificationWidgets")&&function(a,e,s){const o=t(y,a)
if(0===o.length)return
const r=o.map(a=>[a,M(a)]).filter(Ca).map(([a,e])=>[a,e,n(a)])
e&&r.forEach(Pa),r.forEach(u(_a,s))}(a,e,o),$("changeButtonLabels")&&function(a){t('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),t('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),$("trackLadderReset")&&function(a){La=$(L),t(v,a).map(M).filter(Ba).forEach(xa)}(a),$("showPvPSummaryInLog")&&async function(a){const e=t('a[href*="&combat_id="]',a)
if(0===e.length)return
const s=e.map(M).filter(na).map(a=>[a,a.cells[2].innerHTML]).filter(oa);(await Promise.all(s.map(ra))).filter(([,,a])=>a&&a.s).forEach(fa)}(a)}export default function(){O("PlayerLog",1),function(){if(B())return
const a=o("#pCC > table:last-of-type")
a&&Ea(a)}()}
//# sourceMappingURL=playerLog-040f38c9.js.map
