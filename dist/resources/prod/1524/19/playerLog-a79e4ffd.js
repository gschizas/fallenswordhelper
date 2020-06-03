import{l as a,aU as t,I as e,b5 as s,a8 as n,M as o,b6 as r,y as i,b7 as c,v as f,Q as l,s as u,aT as p,b8 as d,a5 as m,f as h,k as g,b9 as b,i as y,o as j,D as w,aD as $,ba as v,bb as k,bc as C,a1 as P,A as _,W as L,w as T}from"./calfSystem-6fc0cc1b.js"
import"./playerName-958718a3.js"
import{t as x}from"./toLowerCase-9e782464.js"
import{a as B}from"./addCommas-1fbf27a6.js"
import{c as E}from"./currentGuildId-33ea4168.js"
import"./fshOpen-8d675aa9.js"
import{o as R}from"./openQuickBuffByName-b0838d7a.js"
import"./dataRows-ddfae63d.js"
import{g as S,s as A}from"./idb-92d6a2b5.js"
import{c as I}from"./createStyle-68b93dee.js"
import"./closest-958712aa.js"
import"./indexAjaxJson-608117f0.js"
import{c as G}from"./csvSplit-a085f0bc.js"
import{i as M}from"./insertHtmlAfterEnd-cb1e0a76.js"
import"./cmdExport-ce8b0402.js"
import{c as D}from"./closestTr-7bb79481.js"
import{p as Y}from"./parseDateAsTimestamp-576c2f4c.js"
import{b as N}from"./buffObj-e1044e92.js"
import"./getProfile-caf96531.js"
import{m as Q}from"./myStats-121fdc7d.js"
import{c as q}from"./closestTd-82a8fd63.js"
import{g as H}from"./getMembrList-24c64c1b.js"
import{a as W}from"./addLogColoring-5ab3012c.js"
let z
async function O(e){return E()&&!z&&(z=async function(){return a(await H(!1)).filter(([,a])=>t(a)).map(([a])=>a)}()),(await z).includes(e)}const J=a=>n(a.cells[2].children[0]),U=async([a,t])=>[a,t,await O(t)]
function X([a,t]){const e=o('a[href*="=createsecure&"]',a)
M(e,` | <a href="${r}${t}">Attack</a>`)}function F(a){const t=n(q(a).nextElementSibling.children[0])
i("Report",a),M(a,` | <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List">Ignore</a>`)}function K(a){return function(a){return f({cmd:"combat",subcmd:"view",combat_id:a})}(a)}let V,Z
function aa(a,[t,e]){return"lastCheck"===t||e.logTime&&e.logTime>a}async function ta(){const t=await S("fsh_pvpCombat")
if(!t)return{lastCheck:l}
const e=l-86400
return!t.lastCheck||t.lastCheck<e?function(t){const e=l-604800,s=a(t).filter(u(aa,e)),n={...p(s),lastCheck:l}
return A("fsh_pvpCombat",n),n}(t):t}async function ea(a,t){V||(V=ta())
const e=await V
return e[t]&&e[t].logTime?e[t]:async function(a,t,e){const s=await K(t)
if(s&&s.s)return Z||(Z={...e}),Z[t]={...s,logTime:Y(n(a.cells[1]))/1e3},A("fsh_pvpCombat",Z),s}(a,t,e)}const sa=a=>o(d,a),na=([,a])=>!/\(Guild Conflict\)/.test(a),oa=async([a,t])=>[a,t,await ea(a,/combat_id=(\d+)/.exec(t)[1])]
function ra(a,t,e){return 0!==a?`${t}:<span class="${e}">${B(a)}</span> `:""}function ia(a,t){return 18===t.id?`${a}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${a}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:a}function ca([a,t,e]){const[s,n]=function(a,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",a.cells[2].firstChild.textContent]}(a,t),o=function(a,t){return ra(a.r.xp_gain,"XP stolen",t)+ra(a.r.gold_gain,"Gold lost",t)+ra(a.r.gold_stolen,"Gold stolen",t)+ra(a.r.pvp_prestige_gain,"Prestige gain",t)+ra(a.r.pvp_rating_change,"PvP change",t)+a.r.specials.reduce(ia,"")}(e,s)
a.cells[2].firstChild.remove(),m(a.cells[2],n),h(a.cells[2],g({innerHTML:o}))}const fa=a=>a.username
let la
async function ua(){const a=await Q(!1)
return{_allies:a._allies.map(fa),_enemies:a._enemies.map(fa)}}async function pa(a){return la||(la=ua()),(await la)._allies.includes(a)}async function da(a){return la||(la=ua()),(await la)._enemies.includes(a)}async function ma(a){let t=""
const e=n(a),[s,o,r]=await Promise.all([O(e),pa(e),da(e)])
return s?t="guild":o?t="ally":r&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(a).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function ha(a,[t,e]){return a[e]?a[e].push(t):a[e]=[t],a}const ga={guild:"green",ally:"blue",enemy:"red"}
function ba([a,t]){return`${t.join(", ")} { color: ${ga[a]}; }`}async function ya(t){const s=e(b,t)
if(0===s.length)return
const n=(await Promise.all(s.map(ma))).filter(([,a])=>""!==a),o=a(n.reduce(ha,{})).map(ba)
o.length&&(!function(a){const t=a.rows[0].cells[2]
t&&y(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),h(document.body,I(o.join("\n"))))}const ja=a=>(a=>$(q(a).childNodes))(a).map(n)
function wa(a,t){return(a=>o(s,D(a)))(a)&&("Buff"===t||"Reply"===t&&w("enableChatParsing"))}function $a(a){const t=N.find(t=>((a,t)=>G(t.nicks).includes(x(a)))(a,t))
if(t)return t.id}function va(a){const{target:t}=a,e=n(t)
wa(t,e)&&("Reply"===e&&(!function(a){const t=ja(a).slice(0,2),e=t.join(" ")
let s=e
e.length>140&&(s=e.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),a.preventDefault()),"Buff"===e&&function(a,t){const[e,s]=ja(t),n=/`~(.*)~`/.exec(s)
if(n){const t=G(n[1]).map($a).filter(a=>a).join(";")
R(e,t),a.preventDefault()}}(a,t))}const ka=([,a])=>o(v,a)
function Ca([,a,t]){y(a.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function Pa(a,[t,,e]){const s=/&player_id=(\d+)/.exec(t.href)[1],n=a&&!await O(e)?` | <a href="${r}${e}">Attack</a>`:""
y(t.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${e}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${k}${e}">Send</a> | <a href="${C}${e}">Trade</a>`+n+" ]</small>")}let _a
const La=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function Ta(a){return La.test(_(a.cells[2]))}function xa(a){const t=Y(n(a.cells[1]))
t>_a&&(L(P,t),_a=t)}function Ba(a){!function(a){j(a,va)}(a)
const t=w("addIgnoreLink"),o=w("addAttackLinkToLog")
t&&function(a){e('a[href*="reportMsg"]',a).forEach(F)}(a),w("colorPlayerNames")&&ya(a),o&&async function(a){const t=e(s,a)
if(0===t.length)return
const n=t.map(D).map(a=>[a,J(a)]);(await Promise.all(n.map(U))).filter(([,,a])=>!a).forEach(X)}(a),w("notificationWidgets")&&function(a,t,s){const o=e(b,a)
if(0===o.length)return
const r=o.map(a=>[a,D(a)]).filter(ka).map(([a,t])=>[a,t,n(a)])
t&&r.forEach(Ca),r.forEach(u(Pa,s))}(a,t,o),w("changeButtonLabels")&&function(a){e('a[href*="=trade&"]',a).forEach(a=>i("Trade",a)),e('a[href*="=createsecure&"]',a).forEach(a=>i("ST",a))}(a),w("trackLadderReset")&&function(a){_a=w(P),e(v,a).map(D).filter(Ta).forEach(xa)}(a),w("showPvPSummaryInLog")&&async function(a){const t=e('a[href*="&combat_id="]',a)
if(0===t.length)return
const s=t.map(D).filter(sa).map(a=>[a,a.cells[2].innerHTML]).filter(na);(await Promise.all(s.map(oa))).filter(([,,a])=>a&&a.s).forEach(ca)}(a)}export default function(){W("PlayerLog",1),function(){if(T())return
const a=o("#pCC > table:last-of-type")
a&&Ba(a)}()}
//# sourceMappingURL=playerLog-a79e4ffd.js.map
