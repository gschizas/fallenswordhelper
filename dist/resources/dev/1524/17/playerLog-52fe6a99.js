import{l as a,aW as e,I as t,bc as s,a4 as n,N as o,bd as r,y as i,be as c,v as f,R as l,s as u,aV as p,a5 as d,f as m,k as h,bf as g,i as b,o as y,D as j,a3 as w,bg as $,bh as v,bi as k,a6 as P,A as _,X as C,w as L}from"./calfSystem-1c103624.js"
import"./playerName-191d9509.js"
import{t as T}from"./toLowerCase-9f60cfa4.js"
import{a as x}from"./addCommas-708246cb.js"
import{c as B}from"./currentGuildId-b6fa52f3.js"
import"./fshOpen-19720760.js"
import{o as E}from"./openQuickBuffByName-f6a38ccb.js"
import"./dataRows-ce6adc95.js"
import{g as R,s as S}from"./idb-347cc2af.js"
import{c as A}from"./createStyle-40b3705c.js"
import"./closest-a4273a71.js"
import"./indexAjaxJson-ed231bc3.js"
import{c as I}from"./csvSplit-0d83582d.js"
import{i as G}from"./insertHtmlAfterEnd-cca1ed99.js"
import"./cmdExport-15d3dc9a.js"
import{c as M}from"./closestTr-335afa5f.js"
import{p as D}from"./parseDateAsTimestamp-dbc8fb82.js"
import{b as N}from"./buffObj-bac41881.js"
import"./getProfile-73a4ea38.js"
import{m as Y}from"./myStats-5c94e0f9.js"
import{c as q}from"./closestTd-55144333.js"
import{g as H}from"./getMembrList-d1decafe.js"
import{a as Q}from"./addLogColoring-ecdf8869.js"
let W
async function z(t){return B()&&!W&&(W=async function(){return a(await H(!1)).filter(([,a])=>e(a)).map(([a])=>a)}()),(await W).includes(t)}const O=a=>n(a.cells[2].children[0]),X=async([a,e])=>[a,e,await z(e)]
function J([a,e]){const t=o('a[href*="=createsecure&"]',a)
G(t,` | <a href="${r}${e}">Attack</a>`)}function V(a){const e=n(q(a).nextElementSibling.children[0])
i("Report",a),G(a,` | <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function F(a){return function(a){return f({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let K,U
function Z(a,[e,t]){return"lastCheck"===e||t.logTime&&t.logTime>a}async function aa(){const e=await R("fsh_pvpCombat")
if(!e)return{lastCheck:l}
const t=l-86400
return!e.lastCheck||e.lastCheck<t?function(e){const t=l-604800,s=a(e).filter(u(Z,t)),n={...p(s),lastCheck:l}
return S("fsh_pvpCombat",n),n}(e):e}async function ea(a,e){K||(K=aa())
const t=await K
return t[e]&&t[e].logTime?t[e]:async function(a,e,t){const s=await F(e)
if(s&&s.s)return U||(U={...t}),U[e]={...s,logTime:D(n(a.cells[1]))/1e3},S("fsh_pvpCombat",U),s}(a,e,t)}const ta=([,a])=>!/\(Guild Conflict\)/.test(a),sa=async([a,e])=>[a,e,await ea(a,/combat_id=(\d+)/.exec(e)[1])]
function na(a,e,t){return 0!==a?`${e}:<span class="${t}">${x(a)}</span> `:""}function oa(a,e){return 18===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:a}function ra([a,e,t]){const[s,n]=function(a,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",a.cells[2].firstChild]}(a,e),o=function(a,e){return na(a.r.xp_gain,"XP stolen",e)+na(a.r.gold_gain,"Gold lost",e)+na(a.r.gold_stolen,"Gold stolen",e)+na(a.r.pvp_prestige_gain,"Prestige gain",e)+na(a.r.pvp_rating_change,"PvP change",e)+a.r.specials.reduce(oa,"")}(t,s)
a.cells[2].firstChild.remove(),d(a.cells[2],n),m(a.cells[2],h({innerHTML:o}))}const ia=a=>a.username
let ca
async function fa(){const a=await Y(!1)
return{_allies:a._allies.map(ia),_enemies:a._enemies.map(ia)}}async function la(a){return ca||(ca=fa()),(await ca)._allies.includes(a)}async function ua(a){return ca||(ca=fa()),(await ca)._enemies.includes(a)}async function pa(a){let e=""
const t=n(a),[s,o,r]=await Promise.all([z(t),la(t),ua(t)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function da(a,[e,t]){return a[t]?a[t].push(e):a[t]=[e],a}const ma={guild:"green",ally:"blue",enemy:"red"}
function ha([a,e]){return`${e.join(", ")} { color: ${ma[a]}; }`}async function ga(e){const s=t(g,e)
if(0===s.length)return
const n=(await Promise.all(s.map(pa))).filter(([,a])=>""!==a),o=a(n.reduce(da,{})).map(ha)
o.length&&(!function(a){const e=a.rows[0].cells[2]
e&&b(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),m(document.body,A(o.join("\n"))))}const ba=a=>(a=>w(q(a).childNodes))(a).map(n)
function ya(a,e){return(a=>o(s,M(a)))(a)&&("Buff"===e||"Reply"===e&&j("enableChatParsing"))}function ja(a){const e=N.find(e=>((a,e)=>I(e.nicks).includes(T(a)))(a,e))
if(e)return e.id}function wa(a){const{target:e}=a,t=n(e)
ya(e,t)&&("Reply"===t&&(!function(a){const e=ba(a).slice(0,2),t=e.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),a.preventDefault()),"Buff"===t&&function(a,e){const[t,s]=ba(e),n=/`~(.*)~`/.exec(s)
if(n){const e=I(n[1]).map(ja).filter(a=>a).join(";")
E(t,e),a.preventDefault()}}(a,e))}const $a=([,a])=>o($,a)
function va([,a,e]){b(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function ka(a,[e,,t]){const s=/&player_id=(\d+)/.exec(e.href)[1],n=a&&!await z(t)?` | <a href="${r}${t}">Attack</a>`:""
b(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${v}${t}">Send</a> | <a href="${k}${t}">Trade</a>`+n+" ]</small>")}let Pa
const _a=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ca(a){return _a.test(_(a.cells[2]))}function La(a){const e=D(n(a.cells[1]))
e>Pa&&(C(P,e),Pa=e)}function Ta(a){!function(a){y(a,wa)}(a)
const e=j("addIgnoreLink"),o=j("addAttackLinkToLog")
e&&function(a){t('a[href*="reportMsg"]',a).forEach(V)}(a),j("colorPlayerNames")&&ga(a),o&&async function(a){const e=t(s,a)
if(0===e.length)return
const n=e.map(M).map(a=>[a,O(a)]);(await Promise.all(n.map(X))).filter(([,,a])=>!a).forEach(J)}(a),j("notificationWidgets")&&function(a,e,s){const o=t(g,a)
if(0===o.length)return
const r=o.map(a=>[a,M(a)]).filter($a).map(([a,e])=>[a,e,n(a)])
e&&r.forEach(va),r.forEach(u(ka,s))}(a,e,o),j("changeButtonLabels")&&function(a){t('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),t('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),j("trackLadderReset")&&function(a){Pa=j(P),t($,a).map(M).filter(Ca).forEach(La)}(a),j("showPvPSummaryInLog")&&async function(a){const e=t('a[href*="&combat_id="]',a)
if(0===e.length)return
const s=e.map(M).map(a=>[a,a.cells[2].innerHTML]).filter(ta);(await Promise.all(s.map(sa))).filter(([,,a])=>a&&a.s).forEach(ra)}(a)}export default function(){Q("PlayerLog",1),function(){if(L())return
const a=o("#pCC > table:last-of-type")
a&&Ta(a)}()}
//# sourceMappingURL=playerLog-52fe6a99.js.map
