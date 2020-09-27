import{e as a,aT as e,D as t,b6 as s,G as n,C as o,b7 as r,z as i,b8 as c,U as f,w as l,S as u,t as p,aS as d,b9 as m,a7 as h,h as g,m as b,B as y,E as j,i as w,o as $,H as k,M as v,ba as C,bb as P,bc as L,bd as _,a3 as T,Y as B,x}from"./calfSystem-d3aab5a8.js"
import"./playerName-6a2b4679.js"
import{t as E}from"./toLowerCase-c42114e1.js"
import{a as S}from"./addCommas-bdfe3cd5.js"
import{c as R}from"./createStyle-9acc975b.js"
import{c as G}from"./currentGuildId-b5159547.js"
import"./fshOpen-4f280086.js"
import{o as M}from"./openQuickBuffByName-f588663a.js"
import"./dataRows-87814179.js"
import{g as A,s as I}from"./idb-f33380fa.js"
import"./closest-8d8d60b3.js"
import{c as Y}from"./closestTr-c1780224.js"
import"./indexAjaxJson-86b35353.js"
import"./cmdExport-806d42e0.js"
import{c as D}from"./csvSplit-8c1a6c7f.js"
import{i as N}from"./insertHtmlAfterEnd-d031a1ae.js"
import{p as H}from"./parseDateAsTimestamp-2f425fab.js"
import{b as q}from"./buffObj-33a441d7.js"
import"./getProfile-e3b95fab.js"
import{m as z}from"./myStats-aed09f57.js"
import{c as Q}from"./closestTd-5e92d9d7.js"
import{g as O}from"./getMembrList-1184b6eb.js"
import"./doBuffLinkClick-2191ff6d.js"
import{a as W}from"./addLogColoring-0504d5ae.js"
let J
async function U(t){return G()&&!J&&(J=async function(){return a(await O(!1)).filter(([,a])=>e(a)).map(([a])=>a)}()),(await J).includes(t)}const X=a=>n(a.cells[2].children[0]),F=async([a,e])=>[a,e,await U(e)]
function K([a,e]){const t=o('a[href*="=createsecure&"]',a)
N(t,` | <a href="${r}${e}">Attack</a>`)}function V(a){const e=Q(a).nextElementSibling.children[0]
if(e instanceof Node){const t=n(e)
i("Report",a),N(a,` | <a href="${c}${t}" data-tooltip="Add to Ignore List">Ignore</a>`)}else f("playerLog","missing anchor",Y(a).innerHTML)}function Z(a){return function(a){return l({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let aa,ea
function ta(a,[e,t]){return"lastCheck"===e||t.logTime&&t.logTime>a}async function sa(){const e=await A("fsh_pvpCombat")
if(!e)return{lastCheck:u}
const t=u-86400
return!e.lastCheck||e.lastCheck<t?function(e){const t=u-604800,s=a(e).filter(p(ta,t)),n={...d(s),lastCheck:u}
return I("fsh_pvpCombat",n),n}(e):e}async function na(a,e){aa||(aa=sa())
const t=await aa
return t[e]&&t[e].logTime?t[e]:async function(a,e,t){const s=await Z(e)
if(s&&s.s)return ea||(ea={...t}),ea[e]={...s,logTime:H(n(a.cells[1]))/1e3},I("fsh_pvpCombat",ea),s}(a,e,t)}const oa=a=>o(m,a),ra=([,a])=>!/\(Guild Conflict\)/.test(a),ia=async([a,e])=>[a,e,await na(a,/combat_id=(\d+)/.exec(e)[1])]
function ca(a,e,t){return 0!==a?`${e}:<span class="${t}">${S(a)}</span> `:""}function fa(a,e){return 18===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} leeched the buff '${e.params[1]}'.</span>`:21===e.id?`${a}<br><span class="fshRed fshBold">${e.params[0]} was mesmerized by Spell Breaker, losing the '${e.params[1]}' buff.</span>`:a}function la([a,e,t]){const[s,n]=function(a,e){return/You were victorious over/.test(e)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(e)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",y(a.cells[2].firstChild)]}(a,e),o=function(a,e){return ca(a.r.xp_gain,"XP stolen",e)+ca(a.r.gold_gain,"Gold lost",e)+ca(a.r.gold_stolen,"Gold stolen",e)+ca(a.r.pvp_prestige_gain,"Prestige gain",e)+ca(a.r.pvp_rating_change,"PvP change",e)+a.r.specials.reduce(fa,"")}(t,s)
a.cells[2].firstChild.remove(),h(a.cells[2],n),g(a.cells[2],b({innerHTML:o}))}const ua=a=>a.username
let pa
async function da(){const a=await z(!1)
return{_allies:a._allies.map(ua),_enemies:a._enemies.map(ua)}}async function ma(a){return pa||(pa=da()),(await pa)._allies.includes(a)}async function ha(a){return pa||(pa=da()),(await pa)._enemies.includes(a)}async function ga(a){let e=""
const t=n(a),[s,o,r]=await Promise.all([U(t),ma(t),ha(t)])
return s?e="guild":o?e="ally":r&&(e="enemy"),[`.fshPlayerColoring tr:nth-of-type(${Y(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,e]}function ba(a,[e,t]){return a[t]?a[t].push(e):a[t]=[e],a}const ya={guild:"green",ally:"blue",enemy:"red"}
function ja([a,e]){return`${e.join(", ")} { color: ${ya[a]}; }`}async function wa(e){const s=t(j,e)
if(0===s.length)return
const n=(await Promise.all(s.map(ga))).filter(([,a])=>""!==a),o=a(n.reduce(ba,{})).map(ja)
o.length&&(!function(a){const e=a.rows[0].cells[2]
e&&w(e,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),e.classList.add("fshPlayerColoring"),g(document.body,R(o.join("\n"))))}const $a=a=>(a=>v(Q(a).childNodes))(a).map(n)
function ka(a,e){return(a=>o(s,Y(a)))(a)&&("Buff"===e||"Reply"===e&&k("enableChatParsing"))}function va(a){const e=q.find(e=>((a,e)=>D(e.nicks).includes(E(a)))(a,e))
if(e)return e.id}function Ca(a){const{target:e}=a,t=n(e)
ka(e,t)&&("Reply"===t&&(!function(a){const e=$a(a).slice(0,2),t=e.join(" ")
let s=t
t.length>140&&(s=t.substring(0,140)+"..."),window.openQuickMsgDialog(e[0],"",s)}(e),a.preventDefault()),"Buff"===t&&function(a,e){const[t,s]=$a(e),n=/`~(.*)~`/.exec(s)
if(n){const e=D(n[1]).map(va).filter(a=>a).join(";")
M(t,e),a.preventDefault()}}(a,e))}const Pa=([,a])=>o(C,a)
function La([,a,e]){w(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${e}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _a(a,[e,,t]){const s=P.exec(e.href)[1],n=a&&!await U(t)?` | <a href="${r}${t}">Attack</a>`:""
w(e.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${t}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${L}${t}">Send</a> | <a href="${_}${t}">Trade</a>`+n+" ]</small>")}let Ta
const Ba=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function xa(a){return Ba.test(y(a.cells[2]))}function Ea(a){const e=H(n(a.cells[1]))
e>Ta&&(B(T,e),Ta=e)}function Sa(a){!function(a){$(a,Ca)}(a)
const e=k("addIgnoreLink"),o=k("addAttackLinkToLog")
e&&function(a){t('a[href*="reportMsg"]',a).forEach(V)}(a),k("colorPlayerNames")&&wa(a),o&&async function(a){const e=t(s,a)
if(0===e.length)return
const n=e.map(Y).map(a=>[a,X(a)]);(await Promise.all(n.map(F))).filter(([,,a])=>!a).forEach(K)}(a),k("notificationWidgets")&&function(a,e,s){const o=t(j,a)
if(0===o.length)return
const r=o.map(a=>[a,Y(a)]).filter(Pa).map(([a,e])=>[a,e,n(a)])
e&&r.forEach(La),r.forEach(p(_a,s))}(a,e,o),k("changeButtonLabels")&&function(a){t('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),t('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),k("trackLadderReset")&&function(a){Ta=k(T),t(C,a).map(Y).filter(xa).forEach(Ea)}(a),k("showPvPSummaryInLog")&&async function(a){const e=t('a[href*="&combat_id="]',a)
if(0===e.length)return
const s=e.map(Y).filter(oa).map(a=>[a,a.cells[2].innerHTML]).filter(ra);(await Promise.all(s.map(ia))).filter(([,,a])=>a&&a.s).forEach(la)}(a)}function Ra(){W("PlayerLog",1),function(){if(x())return
const a=o("#pCC > table:last-of-type")
a&&Sa(a)}()}export default Ra
//# sourceMappingURL=playerLog-6ad9dfe8.js.map
