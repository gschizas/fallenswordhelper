import{v as e,t,a5 as n,aj as a,s,Q as r,a7 as i,aQ as o,ak as c,u as l,A as d,S as f,c as u,k as p,f as m,z as h,bm as g,bq as b,br as v,b3 as y,bs as L,W as k,w,D as T,M as j,X as S,i as x,C}from"./calfSystem-ee582533.js"
import"./playerName-e40f24e0.js"
import{t as _}from"./toLowerCase-6383ba3b.js"
import{a as P}from"./addCommas-f872a1dc.js"
import{c as A}from"./currentGuildId-0564d9a0.js"
import"./fshOpen-f1f6c477.js"
import"./openQuickBuffByName-60dde0f6.js"
import{d as M}from"./dataRows-b7cf82e5.js"
import{c as R}from"./createSpan-63b97269.js"
import"./all-b94d2d9d.js"
import{a as H}from"./allthen-f1914fd2.js"
import"./indexAjaxJson-e486d467.js"
import{c as B}from"./csvSplit-7018cdb4.js"
import{q as G}from"./quickBuffHref-35f51ba4.js"
import"./cmdExport-23cec039.js"
import{g as O}from"./getTitle-0b8e386f.js"
import{p as I}from"./parseDateAsTimestamp-aa2b0443.js"
import{b as N}from"./buffObj-05c8a5d9.js"
import"./getProfile-46c78d5c.js"
import{m as z}from"./myStats-2f234ad0.js"
import{g as D}from"./getMembrList-d7782e14.js"
import{a as E}from"./addLogColoring-f78f39be.js"
function Y(t){return function(t){return e({cmd:"combat",subcmd:"view",combat_id:t})}(t)}var q={0:"Dull Edge was activated.",1:"@0 was afflicted by Super Elite Slayer.",2:"@0 was withered.",3:'@0"s armor was shattered.',4:"@0 was infused with extra defense (Constitution).",5:"@0 was infused with extra armor (Sanctuary).",7:"@0 activated Spectral Knight reducing targets armor to zero.",8:"@0 activated Savagery.",9:"@0 activated Shield Strike.",13:"@0 activated Conserve.",17:"@0 activated Four Leaf.",18:'@0 leeched the buff "@1".',19:'@0"s demoralize skill reduced the effectiveness of @1"s enhancements.',20:'@0"s reckoning has improved their skill "@1"',21:'@0 was mesmerized by Spell Breaker, losing the "@1" buff.',22:"@0 was turned Undead by Necrosis.",23:"@0 activated High Guard.",24:"@0 was smote.",25:"@0 activated Barricade.",26:"@0 activated Ageless.",27:"@0 activated Severe Condition.",28:"@0 activated Golden Shield.",29:"@0 activated Anti Deflect.",30:"@0 activated Sealed. (Negated @1)",31:"@0 activated Fist Fight.",33:"@0 activated Dispel Curse.",35:"@0 activated Heavy Weight.",37:"@0 had their armor and defence Inverted.",38:"@0 had their attack reduced by Fumble."}
let F={}
function Q(e,t,n,a){return function(e,t,n){return"lastCheck"===t||e[t].logTime&&e[t].logTime>n}(e,a,t)&&(n[a]=e[a]),n}function W(e){const t=r-86400
!e.lastCheck||e.lastCheck<t?function(e){const t=r-604800
F=a(e).reduce(s(Q,e,t),{}),F.lastCheck=r,i("fsh_pvpCombat",F)}(e):F=e}function J(e){e&&W(e)}function X(e){return e.id in q}function K(e,t,n){if(!X(t)){const a=`${JSON.stringify(t)} ${d(e[n])}`
console.log(a),f("Logs","Missing PvP Special",a)}}function U(e,t){const n=c("#specialsDiv",l(t))
e.r.specials.forEach(s(K,n))}function V(e){var n
e.r.specials.every(X)||(n=e.r.id,t({cmd:"combat",subcmd:"view",combat_id:n})).then(s(U,e))}function Z(e,t){return t.s&&(F[t.r.id]={...t,logTime:I(o(e.cells[1]))/1e3},i("fsh_pvpCombat",F),V(t)),t}function ee(e,t,n){return 0!==e?`${t}:<span class="${n}">${P(e)} </span>`:""}function te(e){return function(e){return e.r.defender.id===g()&&1===e.r.winner}(e)||function(e){return e.r.attacker.id===g()&&0===e.r.winner}(e)?"fshGreen":"fshRed"}function ne(e,t){return 18===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} leeched the buff '${t.params[1]}'.</span>`:21===t.id?`${e}<br><span class="fshRed fshBold">${t.params[0]} was mesmerized by Spell Breaker, losing the '${t.params[1]}' buff.</span>`:e}function ae(e,t){if(!t.s)return
const n=te(t)
h(ee(t.r.xp_gain,"XP stolen",n)+ee(t.r.gold_gain,"Gold lost",n)+ee(t.r.gold_stolen,"Gold stolen",n)+ee(t.r.pvp_prestige_gain,"Prestige gain",n)+ee(t.r.pvp_rating_change,"PvP change",n)+t.r.specials.reduce(ne,""),e)}function se(e,t){const n=R({innerHTML:t})
e.replaceChild(n,e.firstChild)}function re(e){const t=(n=e.cells[2],/You were victorious over/.test(n.innerHTML)?(se(n,'You were <span class="fshGreen">victorious</span> over '),1):/You were defeated by/.test(n.innerHTML)?(se(n,'You were <span class="fshRed">defeated</span> by '),0):void 0)
var n;[0,1].includes(t)&&function(e){const t=/combat_id=(\d+)/.exec(e.cells[2].innerHTML)[1],n=p({style:{color:"gray"}})
m(e.cells[2],n),F[t]&&F[t].logTime?ae(n,F[t]):Y(t).then(s(Z,e)).then(s(ae,n))}(e)}const ie=[(e,t)=>"Combat"===t,()=>u.showPvPSummaryInLog,e=>e.cells[2]&&/combat_id=/.test(e.cells[2].innerHTML),e=>!/\(Guild Conflict\)/.test(d(e.cells[2]))]
function oe(e,t){(function(e,t){return ie.every(n=>n(e,t))})(e,t)&&re(e)}function ce(e,t){return B(t.nicks).includes(_(e))}function le(e){return N.find(s(ce,e)).id}function de(e,t){let n=""
return n=t?G(e,B(t[0].replace(/`~|~`/g,"")).map(le).join(";")):G(e),` | <a ${n}>Buff</a></span>`}function fe(e,t){const n=e.cells[2].innerHTML,a=function(e){return e.substring(0,e.indexOf("<small>")+7)}(n)
h(`${a}<nobr>${function(e,t){let n=""
var a
return u.enableChatParsing&&(n=(a=t.replace(/&nbsp;/g," "),a.replace(/<\/?[^>]+(>|$)/g,"")).substr(0,140)),`[ <span style="cursor:pointer;text-decoration:underline" class="a-reply" target_player="${e}" replyTo="${n}...">Reply</span>`}(t,a)}${function(e){return` | <a href="${b}${e}">Trade</a> | <a title="Secure Trade" href="${v}${e}">ST</a>`}(t)}${function(e){const t=e.substring(e.indexOf(">Reply</a>")+10,e.indexOf(">Buff</a>")+9),n=/quickBuff\((\d+)\)/.exec(t)
return n?de(n[1],e.match(/`~.*?~`/)):""}(n)}${function(e){return u.addAttackLinkToLog?` | <a href="${L}${e}">Attack</a>`:""}(t)}${function(e){return e.substring(e.indexOf(">Trade</a>")+10,e.indexOf("</small>"))}(n)}</nobr>${function(e){return e.substring(e.indexOf("</small>"),e.length)}(n)}`,e.cells[2])}function ue(e,t,n){!function(e,t,n){let a=""
const s=e.cells[1].innerHTML,r=s.substring(0,s.indexOf(">Report")+7),i=s.substring(s.indexOf("Message</a>")+11,s.length)
t||(a=` | <a title="Add to Ignore List" href="${y}${n}">Ignore</a>`),h(`${r}</a>${a}${i}`,e.cells[1])}(e,t,n),fe(e,n)}function pe(e,t){"Notification"===t&&function(e){return u.trackLadderReset&&e.cells[2]&&/You ranked \w{3} in your PvP Band! You have gained \d x PvP Ladder Token/.test(d(e.cells[2]))}(e)&&function(e){const t=I(o(e.cells[1]))
t>u.lastLadderReset&&(k("lastLadderReset",t),u.lastLadderReset=t)}(e)}let me,he,ge=[]
function be(e,t){e.classList.add(t)}function ve(e,t,n){return!!e&&(ge.includes(t)?(be(n,"fshGreen"),!0):(function(e,t){he.includes(e)&&be(t,"fshRed")}(t,n),function(e,t){me.includes(e)&&be(t,"fshBlue")}(t,n),!1))}function $e(e){ge=a(e)}function ye(e){return e.username}function Le(e){me=e._allies.map(ye),he=e._enemies.map(ye)}function ke(e,t,n){!function(e,t,n){if(!n){const n=`<nobr><span style="font-size:x-small;">[ <a title="Add to Ignore List" href="'${y}${t}">Ignore</a> ]</span></nobr>`
h(`${e.cells[1].innerHTML}<br>${n}`,e.cells[1])}}(e,t,n)
const a=C.exec(e.cells[2].innerHTML)[1],s=o(e.cells[2].children[0])
let r=` <span style="font-size:x-small;"><nobr>[ <span style="cursor:pointer;text-decoration:underline" class="a-reply" target_player="${s}">Reply</span> | <a href="${b}${s}">Trade</a> | <a title="Secure Trade" href="${v}${s}">ST</a>`
r+=de(a),u.addAttackLinkToLog&&(r+=` | <a href="${L}${s}">Attack</a>`),r+=" ]</nobr></span>",e.cells[2].innerHTML+=r}function we(e){return e.cells[2].children[0]&&"A"===e.cells[2].children[0].nodeName&&/player_id/.test(e.cells[2].children[0].href)}function Te(e,t){let n,a,s=!1
we(e)&&(n=e.cells[2].children[0],a=o(n),s=!0)
const r=ve(s,a,n)
!function(e,t,n,a){"Chat"===e&&ue(t,n,a)}(t,e,r,a),function(e,t,n,a){"Notification"===t&&we(e)&&ke(e,n,a)}(e,t,a,r)}function je(e){const t=O(e.cells[0].children[0])
t&&(Te(e,t),oe(e,t),pe(e,t),function(e){const t=function(e){return e.cells[2]&&/pvp_id=(\d+)/.exec(e.cells[2].innerHTML)}(e)
t&&t[1]}(e))}function Se(e){window.openQuickMsgDialog(e.target.getAttribute("target_player"),"",e.target.getAttribute("replyTo"))}function xe(e){["enableChatParsing","lastLadderReset","showPvPSummaryInLog","trackLadderReset"].forEach(S),function(e){const t=e.rows[0].cells[2]
t&&x(t,'&nbsp;&nbsp;<span class="fshWhite">(Guild mates show up in <span class="fshGreen">green</span>)</span>')}(e),function(e){M(e.rows,3,0).forEach(je)}(e),$(".a-reply").on("click",Se)}function Ce(){u.addAttackLinkToLog=T("addAttackLinkToLog")
const e=j("#pCC > table:last-of-type")
e&&xe(e)}export default function(){E("PlayerLog",1),function(){if(w())return
const e=[z(!1).then(Le),n("fsh_pvpCombat").then(J)]
A()&&e.push(D(!1).then($e)),H(e,Ce)}()}
//# sourceMappingURL=playerLog-240fa164.js.map
