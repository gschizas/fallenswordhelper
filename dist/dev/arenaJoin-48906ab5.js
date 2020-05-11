import{l as t,h as s,C as e,v as a,f as i,m as n,i as o,aI as r,bl as c,aK as l,O as p,S as m,p as u,bm as d,Q as f,ai as v,az as b,bn as j,bo as $,ak as g,ac as h,A as y}from"./calfSystem-8dc0fa4b.js"
import"./dontPost-c6d67b14.js"
import"./numberIsNaN-73f607dc.js"
import{t as _}from"./toLowerCase-26121da0.js"
import"./setTipped-e2c23c98.js"
import{a as x}from"./all-905003de.js"
import"./allthen-88a2d4fe.js"
import"./lvlTests-cababa62.js"
import"./loadDataTables-4b77a2be.js"
import{i as S,v as T}from"./arena-351281dc.js"
import"./changeMinMax-04eb4a75.js"
import"./assets-ee86d4ec.js"
import"./updateUrl-c03619d9.js"
import{a as N}from"./arena-398ab6b2.js"
import{t as k}from"./thisTournament-fc433449.js"
import{c as w}from"./createSelect-5b47cd68.js"
import{i as C}from"./isSelected-05c2993c.js"
import{f as E}from"./fromEntries-81ecec83.js"
let I
function M(t,s){let e=String(s-1)
0===s&&(e="x"),o(t,`<img src="${r}arena/${e}.png" class="moveImg">`)}function q(t,s){return`<option value="${String(s.id)}"${C(t.slots.join(),s.slots.join())}>${s.name}</option>`}function D(i,n){const o=function(e){return I||(I=s(e,t())),I}(n)
e("",o),i.slots.forEach(a(M,o))}function L(t,s,e){var a;(a=s.target.value,N({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&D(e,t)})}function A(t,s,e){const a=t.sets.find(t=>t.id===Number(e.target.value))
a&&L(s,e,a)}function H(e,o,r){if(r.specials){const r=t({className:"flex"})
!function(e,o){if(e.sets.length>0){const r=w({innerHTML:e.sets.map(a(q,e.current_set)).join("")})
i(r,"change",a(A,e,o))
const c=t({className:"flex"})
s(c,r),n(o,c)}}(e,r),D(e.current_set,r),s(o,r)}}function J(t){return N({subcmd:"join",pvp_id:t})}function P(t){t.preventDefault()
const s=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${p}?${s}`}const z=t=>E(t.r.attributes.map(t=>[`stat_${_($[t.id])}`,t.value])),F=t=>E(t.r.map(t=>[_(j[t.t]),t.n]))
async function K(t){t.preventDefault()
const s=k(),[e,a,i]=await x([c({subcmd:"loadequipped"}),J(s),v("fsh_arenaJoined")]),n={pvpId:s,joined:b,...F(e),...z(a)},o=i||[]
o.push(n),g("fsh_arenaJoined",o),P(t)}function O(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function Q(t){const s=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=k()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${O("Specials",t.specials)}${O("Hell Forge",t.hellforge)}${O("Epic",t.epic)}<div><div>Max Equip Level</div><div>${h(t.equip_level)}</div></div></div>`}(e)),H(t.r,s,e),function(){const t=m('input[type="submit"]',u)
t&&(d(t,"click",P),f(t,"click",K))}()}}export default function(){y("arenaTypeTabs")?S():(!function(){const t=m('input[type="submit"]',u)
t&&f(t,"click",P)}(),T().then(Q))}
//# sourceMappingURL=arenaJoin-48906ab5.js.map
