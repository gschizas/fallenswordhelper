import{v as e,t,a4 as n,ag as a,s,P as r,a6 as i,aS as o,ah as c,u as l,A as d,R as f,c as u,k as p,f as m,z as h,bg as g,bk as b,bl as v,b1 as y,bm as L,V as k,w,D as T,L as j,W as S,i as C,C as x}from"./calfSystem-1262535f.js"
import"./playerName-11654d0b.js"
import{t as _}from"./toLowerCase-0c270c29.js"
import{a as P}from"./addCommas-feda1131.js"
import{c as R}from"./currentGuildId-5a28bdba.js"
import"./fshOpen-6d67ed12.js"
import"./openQuickBuffByName-05521d4e.js"
import{d as A}from"./dataRows-f0bd58da.js"
import{c as M}from"./createSpan-aa5e4be8.js"
import"./all-c00b9c25.js"
import{a as B}from"./allthen-2a364862.js"
import"./indexAjaxJson-f27fbe77.js"
import{c as H}from"./csvSplit-b1d72ffd.js"
import{q as G}from"./quickBuffHref-e5e6eaa1.js"
import"./cmdExport-721bbaf9.js"
import{g as O}from"./getTitle-c55a3ff0.js"
import{p as I}from"./parseDateAsTimestamp-53cf8e3f.js"
import{b as N}from"./buffObj-62dd53f4.js"
import"./getProfile-4b51a044.js"
import{m as z}from"./myStats-385ffe62.js"
import{g as D}from"./getMembrList-c5d771e6.js"
import{a as E}from"./addLogColoring-c53cab2a.js"
function Y(t){return function(t){return e({cmd:"combat",subcmd:"view",combat_id:t})}(t)}var F={0:"Dull Edge was activated.",1:"@0 was afflicted by Super Elite Slayer.",2:"@0 was withered.",3:'@0"s armor was shattered.',4:"@0 was infused with extra defense (Constitution).",5:"@0 was infused with extra armor (Sanctuary).",7:"@0 activated Spectral Knight reducing targets armor to zero.",8:"@0 activated Savagery.",9:"@0 activated Shield Strike.",13:"@0 activated Conserve.",17:"@0 activated Four Leaf.",18:'@0 leeched the buff "@1".',19:'@0"s demoralize skill reduced the effectiveness of @1"s enhancements.',20:'@0"s reckoning has improved their skill "@1"',21:'@0 was mesmerized by Spell Breaker, losing the "@1" buff.',22:"@0 was turned Undead by Necrosis.",23:"@0 activated High Guard.",24:"@0 was smote.",25:"@0 activated Barricade.",26:"@0 activated Ageless.",27:"@0 activated Severe Condition.",28:"@0 activated Golden Shield.",29:"@0 activated Anti Deflect.",30:"@0 activated Sealed. (Negated @1)",31:"@0 activated Fist Fight.",33:"@0 activated Dispel Curse.",35:"@0 activated Heavy Weight.",37:"@0 had their armor and defence Inverted.",38:"@0 had their attack reduced by Fumble."}
let q={}
function W(e,t,n,a){return function(e,t,n){return"lastCheck"===t||e[t].logTime&&e[t].logTime>n}(e,a,t)&&(n[a]=e[a]),n}function J(e){const t=r-86400
!e.lastCheck||e.lastCheck<t?function(e){const t=r-604800
q=a(e).reduce(s(W,e,t),{}),q.lastCheck=r,i("fsh_pvpCombat",q)}(e):q=e}function Q(e){e&&J(e)}function K(e){return e.id in F}function U(e,t,n){if(!K(t)){const a=`${JSON.stringify(t)} ${d(e[n])}`
f("Logs","Missing PvP Special",a)}}function V(e,t){const n=c("#specialsDiv",l(t))
e.r.specials.forEach(s(U,n))}function X(e){var n
e.r.specials.every(K)||(n=e.r.id,t({cmd:"combat",subcmd:"view",combat_id:n})).then(s(V,e))}function Z(e,t){return t.s&&(q[t.r.id]={...t,logTime:I(o(e.cells[1]))/1e3},i("fsh_pvpCombat",q),X(t)),t}function ee(e,t,n){return 0!==e?`${t}:<span class="${n}">${P(e)} </span>`:""}function te(e){return function(e){return e.r.defender.id===g()&&1===e.r.winner}(e)||function(e){return e.r.attacker.id===g()&&0===e.r.winner}(e)?"fshGreen":"fshRed"}function ne(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function ae(e,t){if(!t.s)return
const n=te(t)
h(ee(t.r.xp_gain,"XP stolen",n)+ee(t.r.gold_gain,"Gold lost",n)+ee(t.r.gold_stolen,"Gold stolen",n)+ee(t.r.pvp_prestige_gain,"Prestige gain",n)+ee(t.r.pvp_rating_change,"PvP change",n)+t.r.specials.reduce(ne,""),e)}function se(e,t){const n=M({innerHTML:t})
e.replaceChild(n,e.firstChild)}function re(e){const t=(n=e.cells[2],/You were victorious over/.test(n.innerHTML)?(se(n,'You were <span class="fshGreen">victorious</span> over '),1):/You were defeated by/.test(n.innerHTML)?(se(n,'You were <span class="fshRed">defeated</span> by '),0):void 0)
var n;[0,1].includes(t)&&function(e){const t=/combat_id=(\d+)/.exec(e.cells[2].innerHTML)[1],n=p({style:{color:"gray"}})
m(e.cells[2],n),q[t]&&q[t].logTime?ae(n,q[t]):Y(t).then(s(Z,e)).then(s(ae,n))}(e)}const ie=[(e,t)=>"Combat"===t,()=>u.showPvPSummaryInLog,e=>e.cells[2]&&/combat_id=/.test(e.cells[2].innerHTML),e=>!/\(Guild Conflict\)/.test(d(e.cells[2]))]
function oe(e,t){(function(e,t){return ie.every(n=>n(e,t))})(e,t)&&re(e)}function ce(e,t){return H(t.nicks).includes(_(e))}function le(e){return N.find(s(ce,e)).id}function de(e,t){let n=""
return n=t?G(e,H(t[0].replace(/`~|~`/g,"")).map(le).join(";")):G(e),` | <a ${n}>Buff</a></span>`}function fe(e,t){const n=e.cells[2].innerHTML,a=function(e){return e.substring(0,e.indexOf("<small>")+7)}(n)
h(`${a}<nobr>${function(e,t){let n=""
var a
return u.enableChatParsing&&(n=(a=t.replace(/&nbsp;/g," "),a.replace(/<\/?[^>]+(>|$)/g,"")).substr(0,140)),`[ <span style="cursor:pointer;text-decoration:underline" class="a-reply" target_player="${e}" replyTo="${n}...">Reply</span>`}(t,a)}${function(e){return` | <a href="${b}${e}">Trade</a> | <a title="Secure Trade" href="${v}${e}">ST</a>`}(t)}${function(e){const t=e.substring(e.indexOf(">Reply</a>")+10,e.indexOf(">Buff</a>")+9),n=/quickBuff\((\d+)\)/.exec(t)
return n?de(n[1],e.match(/`~.*?~`/)):""}(n)}${function(e){return u.addAttackLinkToLog?` | <a href="${L}${e}">Attack</a>`:""}(t)}${function(e){return e.substring(e.indexOf(">Trade</a>")+10,e.indexOf("</small>"))}(n)}</nobr>${function(e){return e.substring(e.indexOf("</small>"),e.length)}(n)}`,e.cells[2])}function ue(e,t,n){!function(e,t,n){let a=""
const s=e.cells[1].innerHTML,r=s.substring(0,s.indexOf(">Report")+7),i=s.substring(s.indexOf("Message</a>")+11,s.length)
t||(a=` | <a title="Add to Ignore List" href="${y}${n}">Ignore</a>`),h(`${r}</a>${a}${i}`,e.cells[1])}(e,t,n),fe(e,n)}function pe(e,t){"Notification"===t&&function(e){return u.trackLadderReset&&e.cells[2]&&/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/.test(d(e.cells[2]))}(e)&&function(e){const t=I(o(e.cells[1]))
t>u.lastLadderReset&&(k("lastLadderReset",t),u.lastLadderReset=t)}(e)}let me,he,ge=[]
function be(e,t){e.classList.add(t)}function ve(e,t,n){return!!e&&(ge.includes(t)?(be(n,"fshGreen"),!0):(function(e,t){he.includes(e)&&be(t,"fshRed")}(t,n),function(e,t){me.includes(e)&&be(t,"fshBlue")}(t,n),!1))}function $e(e){ge=a(e)}function ye(e){return e.username}function Le(e){me=e._allies.map(ye),he=e._enemies.map(ye)}function ke(e,t,n){!function(e,t,n){if(!n){const n=`<nobr><span style="font-size:x-small;">[ <a title="Add to Ignore List" href="'${y}${t}">Ignore</a> ]</span></nobr>`
h(`${e.cells[1].innerHTML}<br>${n}`,e.cells[1])}}(e,t,n)
const a=x.exec(e.cells[2].innerHTML)[1],s=o(e.cells[2].children[0])
let r=` <span style="font-size:x-small;"><nobr>[ <span style="cursor:pointer;text-decoration:underline" class="a-reply" target_player="${s}">Reply</span> | <a href="${b}${s}">Trade</a> | <a title="Secure Trade" href="${v}${s}">ST</a>`
r+=de(a),u.addAttackLinkToLog&&(r+=` | <a href="${L}${s}">Attack</a>`),r+=" ]</nobr></span>",e.cells[2].innerHTML+=r}function we(e){return e.cells[2].children[0]&&"A"===e.cells[2].children[0].nodeName&&/player_id/.test(e.cells[2].children[0].href)}function Te(e,t){let n,a,s=!1
we(e)&&(n=e.cells[2].children[0],a=o(n),s=!0)
const r=ve(s,a,n)
!function(e,t,n,a){"Chat"===e&&ue(t,n,a)}(t,e,r,a),function(e,t,n,a){"Notification"===t&&we(e)&&ke(e,n,a)}(e,t,a,r)}function je(e){const t=O(e.cells[0].children[0])
t&&(Te(e,t),oe(e,t),pe(e,t))}function Se(e){window.openQuickMsgDialog(e.target.getAttribute("target_player"),"",e.target.getAttribute("replyTo"))}function Ce(e){["enableChatParsing","lastLadderReset","showPvPSummaryInLog","trackLadderReset"].forEach(S),function(e){const t=e.rows[0].cells[2]
t&&C(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),function(e){A(e.rows,3,0).forEach(je)}(e),$(".a-reply").on("click",Se)}function xe(){u.addAttackLinkToLog=T("addAttackLinkToLog")
const e=j("#pCC > table:last-of-type")
e&&Ce(e)}export default function(){E("PlayerLog",1),function(){if(w())return
const e=[z(!1).then(Le),n("fsh_pvpCombat").then(Q)]
R()&&e.push(D(!1).then($e)),B(e,xe)}()}
//# sourceMappingURL=playerLog-9bd39ce7.js.map
