import{l as e,aU as t,I as a,b7 as s,a8 as n,M as o,b8 as r,y as i,b9 as c,v as f,Q as l,s as u,aT as p,a5 as d,f as m,k as h,ba as g,i as b,o as y,D as j,aD as w,bb as $,bc as v,bd as k,a1 as P,A as _,W as C,w as L}from"./calfSystem-02ae8657.js"
import"./playerName-9873e3df.js"
import{t as T}from"./toLowerCase-f5058453.js"
import{a as x}from"./addCommas-b37f5163.js"
import{c as B}from"./currentGuildId-a8ad9d1f.js"
import"./fshOpen-3e86a886.js"
import{o as E}from"./openQuickBuffByName-0219802a.js"
import"./dataRows-1cf551f5.js"
import{g as R,s as S}from"./idb-ac1635f3.js"
import{c as A}from"./createStyle-1589fe31.js"
import"./closest-8af29cf3.js"
import"./indexAjaxJson-8dbd2034.js"
import{c as I}from"./csvSplit-3188b9df.js"
import{i as G}from"./insertHtmlAfterEnd-23545b48.js"
import"./cmdExport-de6d587e.js"
import{c as M}from"./closestTr-cb33d92d.js"
import{p as D}from"./parseDateAsTimestamp-3e99b4b4.js"
import{b as Y}from"./buffObj-be32ed36.js"
import"./getProfile-de98ee56.js"
import{m as N}from"./myStats-40b81d9d.js"
import{c as Q}from"./closestTd-cba2e801.js"
import{g as q}from"./getMembrList-1f91f8c8.js"
import{a as H}from"./addLogColoring-4ce52d22.js"
let W
async function z(a){return B()&&!W&&(W=async function(){return e(await q(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await W).includes(a)}const O=e=>n(e.cells[2].children[0]),J=async([e,t])=>[e,t,await z(t)]
function U([e,t]){const a=o('a[href*="=createsecure&"]',e)
G(a,` | <a href="${r}${t}">Attack</a>`)}function X(e){const t=n(Q(e).nextElementSibling.children[0])
i("Report",e),G(e,` | <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function F(e){return function(e){return f({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let K,V
function Z(e,[t,a]){return"lastCheck"===t||a.logTime&&a.logTime>e}async function ee(){const t=await R("fsh_pvpCombat")
if(!t)return{lastCheck:l}
const a=l-86400
return!t.lastCheck||t.lastCheck<a?function(t){const a=l-604800,s=e(t).filter(u(Z,a)),n={...p(s),lastCheck:l}
return S("fsh_pvpCombat",n),n}(t):t}async function te(e,t){K||(K=ee())
const a=await K
return a[t]&&a[t].logTime?a[t]:async function(e,t,a){const s=await F(t)
if(s&&s.s)return V||(V={...a}),V[t]={...s,logTime:D(n(e.cells[1]))/1e3},S("fsh_pvpCombat",V),s}(e,t,a)}const ae=([,e])=>!/\(Guild Conflict\)/.test(e),se=async([e,t])=>[e,t,await te(e,/combat_id=(\d+)/.exec(t)[1])]
function ne(e,t,a){return 0!==e?`${t}:<span class="${a}">${x(e)}</span> `:""}function oe(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function re([e,t,a]){const[s,n]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",e.cells[2].firstChild]}(e,t),o=function(e,t){return ne(e.r.xp_gain,"XP stolen",t)+ne(e.r.gold_gain,"Gold lost",t)+ne(e.r.gold_stolen,"Gold stolen",t)+ne(e.r.pvp_prestige_gain,"Prestige gain",t)+ne(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(oe,"")}(a,s)
e.cells[2].firstChild.remove(),d(e.cells[2],n),m(e.cells[2],h({innerHTML:o}))}const ie=e=>e.username
let ce
async function fe(){const e=await N(!1)
return{_allies:e._allies.map(ie),_enemies:e._enemies.map(ie)}}async function le(e){return ce||(ce=fe()),(await ce)._allies.includes(e)}async function ue(e){return ce||(ce=fe()),(await ce)._enemies.includes(e)}async function pe(e){let t=""
const a=n(e),[s,o,r]=await Promise.all([z(a),le(a),ue(a)])
return s?t="guild":o?t="ally":r&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function de(e,[t,a]){return e[a]?e[a].push(t):e[a]=[t],e}const me={guild:"green",ally:"blue",enemy:"red"}
function he([e,t]){return`${t.join(", ")} { color: ${me[e]}; }`}async function ge(t){const s=a(g,t)
if(0===s.length)return
const n=(await Promise.all(s.map(pe))).filter(([,e])=>""!==e),o=e(n.reduce(de,{})).map(he)
o.length&&(!function(e){const t=e.rows[0].cells[2]
t&&b(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),m(document.body,A(o.join("\n"))))}const be=e=>(e=>w(Q(e).childNodes))(e).map(n)
function ye(e,t){return(e=>o(s,M(e)))(e)&&("Buff"===t||"Reply"===t&&j("enableChatParsing"))}function je(e){const t=Y.find(t=>((e,t)=>I(t.nicks).includes(T(e)))(e,t))
if(t)return t.id}function we(e){const{target:t}=e,a=n(t)
ye(t,a)&&("Reply"===a&&(!function(e){const t=be(e).slice(0,2),a=t.join(" ")
let s=a
a.length>140&&(s=a.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),e.preventDefault()),"Buff"===a&&function(e,t){const[a,s]=be(t),n=/`~(.*)~`/.exec(s)
if(n){const t=I(n[1]).map(je).filter(e=>e).join(";")
E(a,t),e.preventDefault()}}(e,t))}const $e=([,e])=>o($,e)
function ve([,e,t]){b(e.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function ke(e,[t,,a]){const s=/&player_id=(\d+)/.exec(t.href)[1],n=e&&!await z(a)?` | <a href="${r}${a}">Attack</a>`:""
b(t.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${a}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${v}${a}">Send</a> | <a href="${k}${a}">Trade</a>`+n+" ]</small>")}let Pe
const _e=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ce(e){return _e.test(_(e.cells[2]))}function Le(e){const t=D(n(e.cells[1]))
t>Pe&&(C(P,t),Pe=t)}function Te(e){!function(e){y(e,we)}(e)
const t=j("addIgnoreLink"),o=j("addAttackLinkToLog")
t&&function(e){a('a[href*="reportMsg"]',e).forEach(X)}(e),j("colorPlayerNames")&&ge(e),o&&async function(e){const t=a(s,e)
if(0===t.length)return
const n=t.map(M).map(e=>[e,O(e)]);(await Promise.all(n.map(J))).filter(([,,e])=>!e).forEach(U)}(e),j("notificationWidgets")&&function(e,t,s){const o=a(g,e)
if(0===o.length)return
const r=o.map(e=>[e,M(e)]).filter($e).map(([e,t])=>[e,t,n(e)])
t&&r.forEach(ve),r.forEach(u(ke,s))}(e,t,o),j("changeButtonLabels")&&function(e){a('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),a('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),j("trackLadderReset")&&function(e){Pe=j(P),a($,e).map(M).filter(Ce).forEach(Le)}(e),j("showPvPSummaryInLog")&&async function(e){const t=a('a[href*="&combat_id="]',e)
if(0===t.length)return
const s=t.map(M).map(e=>[e,e.cells[2].innerHTML]).filter(ae);(await Promise.all(s.map(se))).filter(([,,e])=>e&&e.s).forEach(re)}(e)}export default function(){H("PlayerLog",1),function(){if(L())return
const e=o("#pCC > table:last-of-type")
e&&Te(e)}()}
//# sourceMappingURL=playerLog-fbbc5464.js.map
