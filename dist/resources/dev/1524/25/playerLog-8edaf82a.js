import{e,aV as t,D as a,bb as s,G as n,C as o,bc as r,z as i,bd as c,V as f,w as l,T as u,t as p,aU as d,be as m,a5 as h,h as g,m as b,B as y,E as j,i as w,o as $,H as k,M as v,bf as C,bg as P,bh as L,bi as _,a6 as T,Z as B,x}from"./calfSystem-69dd5601.js"
import"./playerName-688c2cbc.js"
import{t as E}from"./toLowerCase-c42114e1.js"
import{a as R}from"./addCommas-bdfe3cd5.js"
import{c as S}from"./createStyle-ced277c4.js"
import{c as G}from"./currentGuildId-a0138513.js"
import"./fshOpen-4f280086.js"
import{o as M}from"./openQuickBuffByName-a66e5d09.js"
import"./dataRows-88052c7e.js"
import{g as A,s as I}from"./idb-874fe815.js"
import"./closest-8d8d60b3.js"
import{c as D}from"./closestTr-29c432ed.js"
import"./indexAjaxJson-2e5777a1.js"
import"./cmdExport-88c93b51.js"
import{c as N}from"./csvSplit-8c1a6c7f.js"
import{i as Y}from"./insertHtmlAfterEnd-df8843e7.js"
import{p as H}from"./parseDateAsTimestamp-02f5c147.js"
import{b as q}from"./buffObj-33a441d7.js"
import"./getProfile-6a2bd83d.js"
import{m as z}from"./myStats-84112137.js"
import{c as Q}from"./closestTd-9fa8339a.js"
import{g as O}from"./getMembrList-c4f4787c.js"
import"./doBuffLinkClick-4c27c3dd.js"
import{a as V}from"./addLogColoring-8b169a75.js"
let W
async function J(a){return G()&&!W&&(W=async function(){return e(await O(!1)).filter(([,e])=>t(e)).map(([e])=>e)}()),(await W).includes(a)}const U=e=>n(e.cells[2].children[0]),X=async([e,t])=>[e,t,await J(t)]
function Z([e,t]){const a=o('a[href*="=createsecure&"]',e)
Y(a,` | <a href="${r}${t}">Attack</a>`)}function F(e){const t=Q(e).nextElementSibling.children[0]
if(t instanceof Node){const a=n(t)
i("Report",e),Y(e,` | <a href="${c}${a}" data-tooltip="Add to Ignore List">Ignore</a>`)}else f("playerLog","missing anchor",D(e).innerHTML)}function K(e){return function(e){return l({cmd:"combat",subcmd:"view",combat_id:e})}(e)}let ee,te
function ae(e,[t,a]){return"lastCheck"===t||a.logTime&&a.logTime>e}async function se(){const t=await A("fsh_pvpCombat")
if(!t)return{lastCheck:u}
const a=u-86400
return!t.lastCheck||t.lastCheck<a?function(t){const a=u-604800,s=e(t).filter(p(ae,a)),n={...d(s),lastCheck:u}
return I("fsh_pvpCombat",n),n}(t):t}async function ne(e,t){ee||(ee=se())
const a=await ee
return a[t]&&a[t].logTime?a[t]:async function(e,t,a){const s=await K(t)
if(s&&s.s)return te||(te={...a}),te[t]={...s,logTime:H(n(e.cells[1]))/1e3},I("fsh_pvpCombat",te),s}(e,t,a)}const oe=e=>o(m,e),re=([,e])=>!/\(Guild Conflict\)/.test(e),ie=async([e,t])=>[e,t,await ne(e,/combat_id=(\d+)/.exec(t)[1])]
function ce(e,t,a){return 0!==e?`${t}:<span class="${a}">${R(e)}</span> `:""}function fe(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function le([e,t,a]){const[s,n]=function(e,t){return/You were victorious over/.test(t)?["fshGreen",'You were <span class="fshGreen">victorious</span> over ']:/You were defeated by/.test(t)?["fshRed",'You were <span class="fshRed">defeated</span> by ']:["",y(e.cells[2].firstChild)]}(e,t),o=function(e,t){return ce(e.r.xp_gain,"XP stolen",t)+ce(e.r.gold_gain,"Gold lost",t)+ce(e.r.gold_stolen,"Gold stolen",t)+ce(e.r.pvp_prestige_gain,"Prestige gain",t)+ce(e.r.pvp_rating_change,"PvP change",t)+e.r.specials.reduce(fe,"")}(a,s)
e.cells[2].firstChild.remove(),h(e.cells[2],n),g(e.cells[2],b({innerHTML:o}))}const ue=e=>e.username
let pe
async function de(){const e=await z(!1)
return{_allies:e._allies.map(ue),_enemies:e._enemies.map(ue)}}async function me(e){return pe||(pe=de()),(await pe)._allies.includes(e)}async function he(e){return pe||(pe=de()),(await pe)._enemies.includes(e)}async function ge(e){let t=""
const a=n(e),[s,o,r]=await Promise.all([J(a),me(a),he(a)])
return s?t="guild":o?t="ally":r&&(t="enemy"),[`.fshPlayerColoring tr:nth-of-type(${D(e).rowIndex+1}) td:nth-of-type(3) > a:first-of-type`,t]}function be(e,[t,a]){return e[a]?e[a].push(t):e[a]=[t],e}const ye={guild:"green",ally:"blue",enemy:"red"}
function je([e,t]){return`${t.join(", ")} { color: ${ye[e]}; }`}async function we(t){const s=a(j,t)
if(0===s.length)return
const n=(await Promise.all(s.map(ge))).filter(([,e])=>""!==e),o=e(n.reduce(be,{})).map(je)
o.length&&(!function(e){const t=e.rows[0].cells[2]
t&&w(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(t),t.classList.add("fshPlayerColoring"),g(document.body,S(o.join("\n"))))}const $e=e=>(e=>v(Q(e).childNodes))(e).map(n)
function ke(e,t){return(e=>o(s,D(e)))(e)&&("Buff"===t||"Reply"===t&&k("enableChatParsing"))}function ve(e){const t=q.find(t=>((e,t)=>N(t.nicks).includes(E(e)))(e,t))
if(t)return t.id}function Ce(e){const{target:t}=e,a=n(t)
ke(t,a)&&("Reply"===a&&(!function(e){const t=$e(e).slice(0,2),a=t.join(" ")
let s=a
a.length>140&&(s=a.substring(0,140)+"..."),window.openQuickMsgDialog(t[0],"",s)}(t),e.preventDefault()),"Buff"===a&&function(e,t){const[a,s]=$e(t),n=/`~(.*)~`/.exec(s)
if(n){const t=N(n[1]).map(ve).filter(e=>e).join(";")
M(a,t),e.preventDefault()}}(e,t))}const Pe=([,e])=>o(C,e)
function Le([,e,t]){w(e.cells[1].children[0],`<font size="1"><br>[ <a href="${c}${t}" class="tip-static" data-tipped="Add to Ignore List" >Ignore</a> ]</font>`)}async function _e(e,[t,,a]){const s=P.exec(t.href)[1],n=e&&!await J(a)?` | <a href="${r}${a}">Attack</a>`:""
w(t.parentNode,`&nbsp;&nbsp; <small>[ <a href="javascript:openQuickMsgDialog(&quot;${a}&quot;);" class="tip-static" data-tipped="Send Message">Reply</a> | <a href="javascript:quickBuff(${s});">Buff</a> | <a href="${L}${a}">Send</a> | <a href="${_}${a}">Trade</a>`+n+" ]</small>")}let Te
const Be=/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/
function xe(e){return Be.test(y(e.cells[2]))}function Ee(e){const t=H(n(e.cells[1]))
t>Te&&(B(T,t),Te=t)}function Re(e){!function(e){$(e,Ce)}(e)
const t=k("addIgnoreLink"),o=k("addAttackLinkToLog")
t&&function(e){a('a[href*="reportMsg"]',e).forEach(F)}(e),k("colorPlayerNames")&&we(e),o&&async function(e){const t=a(s,e)
if(0===t.length)return
const n=t.map(D).map(e=>[e,U(e)]);(await Promise.all(n.map(X))).filter(([,,e])=>!e).forEach(Z)}(e),k("notificationWidgets")&&function(e,t,s){const o=a(j,e)
if(0===o.length)return
const r=o.map(e=>[e,D(e)]).filter(Pe).map(([e,t])=>[e,t,n(e)])
t&&r.forEach(Le),r.forEach(p(_e,s))}(e,t,o),k("changeButtonLabels")&&function(e){a('a[href*="=trade&"]',e).forEach(e=>i("Trade",e)),a('a[href*="=createsecure&"]',e).forEach(e=>i("ST",e))}(e),k("trackLadderReset")&&function(e){Te=k(T),a(C,e).map(D).filter(xe).forEach(Ee)}(e),k("showPvPSummaryInLog")&&async function(e){const t=a('a[href*="&combat_id="]',e)
if(0===t.length)return
const s=t.map(D).filter(oe).map(e=>[e,e.cells[2].innerHTML]).filter(re);(await Promise.all(s.map(ie))).filter(([,,e])=>e&&e.s).forEach(le)}(e)}function Se(){V("PlayerLog",1),function(){if(x())return
const e=o("#pCC > table:last-of-type")
e&&Re(e)}()}export default Se
//# sourceMappingURL=playerLog-8edaf82a.js.map
