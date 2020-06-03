import{l as a,aW as t,I as e,bc as s,a4 as n,N as o,bd as r,y as i,be as c,v as f,R as l,s as u,aV as p,bf as d,a5 as m,f as h,k as g,bg as b,i as y,o as j,D as w,a3 as $,bh as v,bi as k,bj as C,a6 as P,A as _,X as L,w as T}from"./calfSystem-f7574730.js"
import"./playerName-b7a62fcc.js"
import{t as x}from"./toLowerCase-9cb6a319.js"
import{a as B}from"./addCommas-1a19f537.js"
import{c as E}from"./currentGuildId-3e98e06d.js"
import"./fshOpen-da8138fa.js"
import{o as R}from"./openQuickBuffByName-811c9a22.js"
import"./dataRows-2e6b99d7.js"
import{g as S,s as A}from"./idb-14a57c5b.js"
import{c as I}from"./createStyle-d4675aa6.js"
import"./closest-807af018.js"
import"./indexAjaxJson-66a839ba.js"
import{c as G}from"./csvSplit-49dcf2f6.js"
import{i as M}from"./insertHtmlAfterEnd-38a30874.js"
import"./cmdExport-da1f542a.js"
import{c as D}from"./closestTr-78ace0a3.js"
import{p as N}from"./parseDateAsTimestamp-e4ec080f.js"
import{b as Y}from"./buffObj-25de2982.js"
import"./getProfile-3530a5f7.js"
import{m as q}from"./myStats-de75fce8.js"
import{c as H}from"./closestTd-63ab82d0.js"
import{g as Q}from"./getMembrList-b14591b4.js"
import{a as W}from"./addLogColoring-5f4631ad.js"
let z
async function O(e){return E()&&!z&&(z=async function(){return a(await Q(!1)).filter(([,a])=>t(a)).map(([a])=>a)}()),(await z).includes(e)}const X=a=>n(a.cells[2].children[0]),J=async([a,t])=>[a,t,await O(t)]
function V([a,t]){const e=o('a[href*="=createsecure&"]',a)
M(e,` | <a href="${r}${t}">Attack</a>`)}function F(a){const t=n(H(a).nextElementSibling.children[0])
i("Report",a),M(a,` | <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function K(a){return function(a){return f({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let U,Z
function aa(a,[t,e]){return"lastCheck"===t||e.logTime&&e.logTime>a}async function ta(){const t=await S("fsh_pvpCombat")
if(!t)return{lastCheck:l}
const e=l-86400
return!t.lastCheck||t.lastCheck<e?function(t){const e=l-604800,s=a(t).filter(u(aa,e)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(t):t}async function ea(a,t){U||(U=ta())
const e=await U
return e[t]&&e[t].logTime?e[t]:async function(a,t,e){const s=await K(t)
if(s&&s.s)return Z||(Z={...e}),Z[t]={...s,logTime:N(n(a.cells[1]))/1e3},A("fsh_pvpCombat",Z),s}(a,t,e)}const sa=a=>o(d,a),na=([,a])=>!/\(Guild Conflict\)/.test(a),oa=async([a,t])=>[a,t,await ea(a,/combat_id=(\d+)/.exec(t)[1])]
function ra(a,t,e){return 0!==a?`${t}:<span class="${e}">${B(a)}</span> `:""}function ia(a,t){return 18===t.id?`${a}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${a}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:a}function ca([a,t,e]){const[s,n]=function(a,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",a.cells[2].firstChild.textContent]}(a,t),o=function(a,t){return ra(a.r.xp_gain,"XP stolen",t)+ra(a.r.gold_gain,"Gold lost",t)+ra(a.r.gold_stolen,"Gold stolen",t)+ra(a.r.pvp_prestige_gain,"Prestige gain",t)+ra(a.r.pvp_rating_change,"PvP change",t)+a.r.specials.reduce(ia,"")}(e,s)
a.cells[2].firstChild.remove(),m(a.cells[2],n),h(a.cells[2],g({innerHTML:o}))}const fa=a=>a.username
let la
async function ua(){const a=await q(!1)
return{_allies:a._allies.map(fa),_enemies:a._enemies.map(fa)}}async function pa(a){return la||(la=ua()),(await la)._allies.includes(a)}async function da(a){return la||(la=ua()),(await la)._enemies.includes(a)}async function ma(a){let t=""
const e=n(a),[s,o,r]=await Promise.all([O(e),pa(e),da(e)])
return s?t="guild":o?t="ally":r&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function ha(a,[t,e]){return a[e]?a[e].push(t):a[e]=[t],a}const ga={guild:"green",ally:"blue",enemy:"red"}
function ba([a,t]){return`${t.join(", ")} { color: ${ga[a]}; }`}async function ya(t){const s=e(b,t)
if(0===s.length)return
const n=(await Promise.all(s.map(ma))).filter(([,a])=>""!==a),o=a(n.reduce(ha,{})).map(ba)
o.length&&(!function(a){const t=a.rows[0].cells[2]
t&&y(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const ja=a=>(a=>$(H(a).childNodes))(a).map(n)
function wa(a,t){return(a=>o(s,D(a)))(a)&&("Buff"===t||"Reply"===t&&w("enableChatParsing"))}function $a(a){const t=Y.find(t=>((a,t)=>G(t.nicks).includes(x(a)))(a,t))
if(t)return t.id}function va(a){const{target:t}=a,e=n(t)
wa(t,e)&&("Reply"===e&&(!function(a){const t=ja(a).slice(0,2),e=t.join(" ")
let s=e
e.length>140&&(s=e.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),a.preventDefault()),"Buff"===e&&function(a,t){const[e,s]=ja(t),n=/`~(.*)~`/.exec(s)
if(n){const t=G(n[1]).map($a).filter(a=>a).join(";")
R(e,t),a.preventDefault()}}(a,t))}const ka=([,a])=>o(v,a)
function Ca([,a,t]){y(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function Pa(a,[t,,e]){const s=/&player_id=(\d+)/.exec(t.href)[1],n=a&&!await O(e)?` | <a href="${r}${e}">Attack</a>`:""
y(t.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${e}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${k}${e}">Send</a> | <a href="${C}${e}">Trade</a>`+n+" ]</small>")}let _a
const La=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ta(a){return La.test(_(a.cells[2]))}function xa(a){const t=N(n(a.cells[1]))
t>_a&&(L(P,t),_a=t)}function Ba(a){!function(a){j(a,va)}(a)
const t=w("addIgnoreLink"),o=w("addAttackLinkToLog")
t&&function(a){e('a[href*="reportMsg"]',a).forEach(F)}(a),w("colorPlayerNames")&&ya(a),o&&async function(a){const t=e(s,a)
if(0===t.length)return
const n=t.map(D).map(a=>[a,X(a)]);(await Promise.all(n.map(J))).filter(([,,a])=>!a).forEach(V)}(a),w("notificationWidgets")&&function(a,t,s){const o=e(b,a)
if(0===o.length)return
const r=o.map(a=>[a,D(a)]).filter(ka).map(([a,t])=>[a,t,n(a)])
t&&r.forEach(Ca),r.forEach(u(Pa,s))}(a,t,o),w("changeButtonLabels")&&function(a){e('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),e('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),w("trackLadderReset")&&function(a){_a=w(P),e(v,a).map(D).filter(Ta).forEach(xa)}(a),w("showPvPSummaryInLog")&&async function(a){const t=e('a[href*="&combat_id="]',a)
if(0===t.length)return
const s=t.map(D).filter(sa).map(a=>[a,a.cells[2].innerHTML]).filter(na);(await Promise.all(s.map(oa))).filter(([,,a])=>a&&a.s).forEach(ca)}(a)}export default function(){W("PlayerLog",1),function(){if(T())return
const a=o("#pCC > table:last-of-type")
a&&Ba(a)}()}
//# sourceMappingURL=playerLog-967425ef.js.map
