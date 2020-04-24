import{l as t,h as s,C as e,v as a,f as i,m as n,i as o,aI as r,bl as c,aK as f,O as l,S as m,p,bm as u,Q as d,ai as v,az as b,bn as j,bo as $,ak as g,ac as h,A as y}from"./calfSystem-94018cd0.js"
import"./dontPost-cebe2d2a.js"
import"./numberIsNaN-b4c6efab.js"
import{t as _}from"./toLowerCase-5662df04.js"
import{a as x}from"./all-e6dbe465.js"
import"./allthen-55ea9059.js"
import{t as S}from"./thisTournament-c2289355.js"
import"./lvlTests-80d9f538.js"
import"./loadDataTables-1819f403.js"
import{i as N,v as T}from"./arena-73e5dfc5.js"
import"./changeMinMax-02149fd9.js"
import"./assets-3b7e982f.js"
import"./updateUrl-48eff90a.js"
import{a as k}from"./arena-e6f62ae5.js"
import{c as w}from"./createSelect-ac84aa43.js"
import{i as C}from"./isSelected-9fb4d004.js"
import{f as E}from"./fromEntries-583a14e3.js"
let I
function M(t,s){let e=String(s-1)
0===s&&(e="x"),o(t,`<img src="${r}arena/${e}.png" class="moveImg">`)}function q(t,s){return`<option value="${String(s.id)}"${C(t.slots.join(),s.slots.join())}>${s.name}</option>`}function D(i,n){const o=function(e){return I||(I=s(e,t())),I}(n)
e("",o),i.slots.forEach(a(M,o))}function L(t,s,e){var a;(a=s.target.value,k({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&D(e,t)})}function A(t,s,e){const a=t.sets.find(t=>t.id===Number(e.target.value))
a&&L(s,e,a)}function H(e,o,r){if(r.specials){const r=t({className:"flex"})
!function(e,o){if(e.sets.length>0){const r=w({innerHTML:e.sets.map(a(q,e.current_set)).join("")})
i(r,"change",a(A,e,o))
const c=t({className:"flex"})
s(c,r),n(o,c)}}(e,r),D(e.current_set,r),s(o,r)}}function J(t){return k({subcmd:"join",pvp_id:t})}function P(t){t.preventDefault()
const s=f(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${l}?${s}`}const z=t=>E(t.r.attributes.map(t=>[`stat_${_($[t.id])}`,t.value])),F=t=>E(t.r.map(t=>[_(j[t.t]),t.n]))
async function K(t){t.preventDefault()
const s=S(),[e,a,i]=await x([c({subcmd:"loadequipped"}),J(s),v("fsh_arenaJoined")]),n={pvpId:s,joined:b,...F(e),...z(a)},o=i||[]
o.push(n),g("fsh_arenaJoined",o),P(t)}function O(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function Q(t){const s=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=S()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${O("Specials",t.specials)}${O("Hell Forge",t.hellforge)}${O("Epic",t.epic)}<div><div>Max Equip Level</div><div>${h(t.equip_level)}</div></div></div>`}(e)),H(t.r,s,e),function(){const t=m('input[type="submit"]',p)
t&&(u(t,"click",P),d(t,"click",K))}()}}export default function(){y("arenaTypeTabs")?N():(!function(){const t=m('input[type="submit"]',p)
t&&d(t,"click",P)}(),T().then(Q))}
//# sourceMappingURL=arenaJoin-3454116a.js.map
