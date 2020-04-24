import{l as t,h as a,C as s,v as e,f as i,m as n,i as o,aI as r,bl as c,aK as l,O as f,S as d,p as m,bm as p,Q as u,ai as v,az as b,bn as j,bo as $,ak as g,ac as h,A as y}from"./calfSystem-9b1fa4ca.js"
import"./dontPost-f8f2337a.js"
import"./numberIsNaN-6f59053c.js"
import{t as _}from"./toLowerCase-cb0a8722.js"
import{a as x}from"./all-d7ba558a.js"
import"./allthen-db530ef8.js"
import{t as S}from"./thisTournament-14307abb.js"
import"./lvlTests-f9d5d6d3.js"
import"./loadDataTables-ea1c1c43.js"
import{i as N,v as T}from"./arena-14cada72.js"
import"./changeMinMax-85abe113.js"
import"./assets-b7eab2a0.js"
import"./updateUrl-f91ca9dd.js"
import{a as k}from"./arena-cf16de3f.js"
import{c as w}from"./createSelect-30dd16c2.js"
import{i as C}from"./isSelected-7109ea9d.js"
import{f as E}from"./fromEntries-4c2983ea.js"
let I
function M(t,a){let s=String(a-1)
0===a&&(s="x"),o(t,`<img src="${r}arena/${s}.png" class="moveImg">`)}function q(t,a){return`<option value="${String(a.id)}"${C(t.slots.join(),a.slots.join())}>${a.name}</option>`}function D(i,n){const o=function(s){return I||(I=a(s,t())),I}(n)
s("",o),i.slots.forEach(e(M,o))}function L(t,a,s){var e;(e=a.target.value,k({subcmd:"usesetup",set_id:e})).then(a=>{a.s&&D(s,t)})}function A(t,a,s){const e=t.sets.find(t=>t.id===Number(s.target.value))
e&&L(a,s,e)}function H(s,o,r){if(r.specials){const r=t({className:"flex"})
!function(s,o){if(s.sets.length>0){const r=w({innerHTML:s.sets.map(e(q,s.current_set)).join("")})
i(r,"change",e(A,s,o))
const c=t({className:"flex"})
a(c,r),n(o,c)}}(s,r),D(s.current_set,r),a(o,r)}}function J(t){return k({subcmd:"join",pvp_id:t})}function P(t){t.preventDefault()
const a=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${f}?${a}`}const z=t=>E(t.r.attributes.map(t=>[`stat_${_($[t.id])}`,t.value])),F=t=>E(t.r.map(t=>[_(j[t.t]),t.n]))
async function K(t){t.preventDefault()
const a=S(),[s,e,i]=await x([c({subcmd:"loadequipped"}),J(a),v("fsh_arenaJoined")]),n={pvpId:a,joined:b,...F(s),...z(e)},o=i||[]
o.push(n),g("fsh_arenaJoined",o),P(t)}function O(t,a){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${s=a,String(Number(s))}.png"></div></div>`
var s}function Q(t){const a=d("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&a){a.setAttribute("align","center")
const s=function(t){const a=S()
return t.arenas.find(t=>t.id===a)}(t.r)
o(a,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${O("Specials",t.specials)}${O("Hell Forge",t.hellforge)}${O("Epic",t.epic)}<div><div>Max Equip Level</div><div>${h(t.equip_level)}</div></div></div>`}(s)),H(t.r,a,s),function(){const t=d('input[type="submit"]',m)
t&&(p(t,"click",P),u(t,"click",K))}()}}export default function(){y("arenaTypeTabs")?N():(!function(){const t=d('input[type="submit"]',m)
t&&u(t,"click",P)}(),T().then(Q))}
//# sourceMappingURL=arenaJoin-d1607b8a.js.map
