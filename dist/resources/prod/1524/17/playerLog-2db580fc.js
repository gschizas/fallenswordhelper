import{l as e,aU as a,I as t,b5 as s,a8 as n,M as o,b6 as r,y as i,b7 as c,v as f,Q as l,s as u,aT as p,a5 as m,f as d,k as h,b8 as g,i as b,o as y,D as j,aD as w,b9 as $,ba as v,bb as k,a1 as P,A as _,W as C,w as L}from"./calfSystem-dec5e071.js"
import"./playerName-aa4fbcf3.js"
import{t as T}from"./toLowerCase-1ea9a651.js"
import{a as x}from"./addCommas-25733728.js"
import{c as B}from"./currentGuildId-694bbc76.js"
import"./fshOpen-eee4440e.js"
import{o as E}from"./openQuickBuffByName-71c2a436.js"
import"./dataRows-75c1f744.js"
import{g as R,s as S}from"./idb-8fe34e30.js"
import{c as A}from"./createStyle-0016a693.js"
import"./closest-d88a3ae2.js"
import"./indexAjaxJson-ecf8d1f5.js"
import{c as I}from"./csvSplit-655e7fa5.js"
import{i as G}from"./insertHtmlAfterEnd-52e450d3.js"
import"./cmdExport-965d881b.js"
import{c as M}from"./closestTr-37ea13b0.js"
import{p as D}from"./parseDateAsTimestamp-c7307a60.js"
import{b as Y}from"./buffObj-70e3fcf6.js"
import"./getProfile-f1e3acc1.js"
import{m as N}from"./myStats-6490dbe4.js"
import{c as Q}from"./closestTd-c42dbc92.js"
import{g as q}from"./getMembrList-05aad6b2.js"
import{a as H}from"./addLogColoring-133b31c5.js"
let W
async function z(t){return B()&&!W&&(W=async function(){return e(await q(!1)).filter(([,e])=>a(e)).map(([e])=>e)}()),(await W).includes(t)}const O=e=>n(e.cells[2].children[0]),J=async([e,a])=>[e,a,await z(a)]
function U([e,a]){const t=o('a[href*="=createsecure&"]',e)
G(t,` | <a href="${r}${a}">Attack</a>`)}function X(e){const a=n(Q(e).nextElementSibling.children[0])
i("Report",e),G(e,` | <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function F(e){return function(e){return f({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let K,V
function Z(e,[a,t]){return"lastCheck"===a||t.logTime&&t.logTime>e}async function ee(){const a=await R("fsh_pvpCombat")
if(!a)return{lastCheck:l}
const t=l-86400
return!a.lastCheck||a.lastCheck<t?function(a){const t=l-604800,s=e(a).filter(u(Z,t)),n={...p(s),lastCheck:l}
return S("fsh_pvpCombat",n),n}(a):a}async function ae(e,a){K||(K=ee())
const t=await K
return t[a]&&t[a].logTime?t[a]:async function(e,a,t){const s=await F(a)
if(s&&s.s)return V||(V={...t}),V[a]={...s,logTime:D(n(e.cells[1]))/1e3},S("fsh_pvpCombat",V),s}(e,a,t)}const te=([,e])=>!/\(Guild Conflict\)/.test(e),se=async([e,a])=>[e,a,await ae(e,/combat_id=(\d+)/.exec(a)[1])]
function ne(e,a,t){return 0!==e?`${a}:<span class="${t}">${x(e)}</span> `:""}function oe(e,a){return 18===a.id?`${e}<br><span class="fshRed fshBold">${a.params[0]} leeched the buff '${a.params[1]}'.</span>`:21===a.id?`${e}<br><span class="fshRed fshBold">${a.params[0]} was mesmerized by Spell Breaker, losing the '${a.params[1]}' buff.</span>`:e}function re([e,a,t]){const[s,n]=function(e,a){return/You were victorious over/.test(a)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(a)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",e.cells[2].firstChild]}(e,a),o=function(e,a){return ne(e.r.xp_gain,"XP stolen",a)+ne(e.r.gold_gain,"Gold lost",a)+ne(e.r.gold_stolen,"Gold stolen",a)+ne(e.r.pvp_prestige_gain,"Prestige gain",a)+ne(e.r.pvp_rating_change,"PvP change",a)+e.r.specials.reduce(oe,"")}(t,s)
e.cells[2].firstChild.remove(),m(e.cells[2],n),d(e.cells[2],h({innerHTML:o}))}const ie=e=>e.username
let ce
async function fe(){const e=await N(!1)
return{_allies:e._allies.map(ie),_enemies:e._enemies.map(ie)}}async function le(e){return ce||(ce=fe()),(await ce)._allies.includes(e)}async function ue(e){return ce||(ce=fe()),(await ce)._enemies.includes(e)}async function pe(e){let a=""
const t=n(e),[s,o,r]=await Promise.all([z(t),le(t),ue(t)])
return s?a="guild":o?a="ally":r&&(a="enemy"),[`.fshPlayerColoring tr:nth-of-type(${M(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,a]}function me(e,[a,t]){return e[t]?e[t].push(a):e[t]=[a],e}const de={guild:"green",ally:"blue",enemy:"red"}
function he([e,a]){return`${a.join(", ")} { color: ${de[e]}; }`}async function ge(a){const s=t(g,a)
if(0===s.length)return
const n=(await Promise.all(s.map(pe))).filter(([,e])=>""!==e),o=e(n.reduce(me,{})).map(he)
o.length&&(!function(e){const a=e.rows[0].cells[2]
a&&b(a,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(a),a.classList.add("fshPlayerColoring"),d(document.body,A(o.join("\n"))))}const be=e=>(e=>w(Q(e).childNodes))(e).map(n)
function ye(e,a){return(e=>o(s,M(e)))(e)&&("Buff"===a||"Reply"===a&&j("enableChatParsing"))}function je(e){const a=Y.find(a=>((e,a)=>I(a.nicks).includes(T(e)))(e,a))
if(a)return a.id}function we(e){const{target:a}=e,t=n(a)
ye(a,t)&&("Reply"===t&&(!function(e){const a=be(e).slice(0,2),t=a.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(a[0],"",s)}(a),e.preventDefault()),"Buff"===t&&function(e,a){const[t,s]=be(a),n=/`~(.*)~`/.exec(s)
if(n){const a=I(n[1]).map(je).filter(e=>e).join(";")
E(t,a),e.preventDefault()}}(e,a))}const $e=([,e])=>o($,e)
function ve([,e,a]){b(e.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${a}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function ke(e,[a,,t]){const s=/&player_id=(\d+)/.exec(a.href)[1],n=e&&!await z(t)?` | <a href="${r}${t}">Attack</a>`:""
b(a.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${v}${t}">Send</a> | <a href="${k}${t}">Trade</a>`+n+" ]</small>")}let Pe
const _e=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ce(e){return _e.test(_(e.cells[2]))}function Le(e){const a=D(n(e.cells[1]))
a>Pe&&(C(P,a),Pe=a)}function Te(e){!function(e){y(e,we)}(e)
const a=j("addIgnoreLink"),o=j("addAttackLinkToLog")
a&&function(e){t('a[href*="reportMsg"]',e).forEach(X)}(e),j("colorPlayerNames")&&ge(e),o&&async function(e){const a=t(s,e)
if(0===a.length)return
const n=a.map(M).map(e=>[e,O(e)]);(await Promise.all(n.map(J))).filter(([,,e])=>!e).forEach(U)}(e),j("notificationWidgets")&&function(e,a,s){const o=t(g,e)
if(0===o.length)return
const r=o.map(e=>[e,M(e)]).filter($e).map(([e,a])=>[e,a,n(e)])
a&&r.forEach(ve),r.forEach(u(ke,s))}(e,a,o),j("changeButtonLabels")&&function(e){t('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),t('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),j("trackLadderReset")&&function(e){Pe=j(P),t($,e).map(M).filter(Ce).forEach(Le)}(e),j("showPvPSummaryInLog")&&async function(e){const a=t('a[href*="&combat_id="]',e)
if(0===a.length)return
const s=a.map(M).map(e=>[e,e.cells[2].innerHTML]).filter(te);(await Promise.all(s.map(se))).filter(([,,e])=>e&&e.s).forEach(re)}(e)}export default function(){H("PlayerLog",1),function(){if(L())return
const e=o("#pCC > table:last-of-type")
e&&Te(e)}()}
//# sourceMappingURL=playerLog-2db580fc.js.map
