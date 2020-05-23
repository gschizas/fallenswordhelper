import{l as t,h as s,C as a,v as e,f as i,m as n,i as o,aI as r,bl as c,aK as f,O as l,S as p,p as m,bm as u,Q as d,ai as v,R as j,az as b,bn as $,bo as g,ak as h,ac as y,A as _}from"./calfSystem-70b0df7f.js"
import"./dontPost-66858ca6.js"
import"./numberIsNaN-888b325e.js"
import{t as x}from"./toLowerCase-28f7d145.js"
import"./setTipped-19f09302.js"
import{a as S}from"./all-d4a4126a.js"
import"./allthen-82910129.js"
import"./lvlTests-5da07455.js"
import"./loadDataTables-26792ea2.js"
import{i as T,v as N}from"./arena-70b90780.js"
import"./changeMinMax-7b8b065f.js"
import"./assets-50822cf1.js"
import"./updateUrl-33a1c85f.js"
import{a as k}from"./arena-0d41ce41.js"
import{t as w}from"./thisTournament-46cd8efd.js"
import{c as C}from"./createSelect-fcc0f12a.js"
import{i as E}from"./isSelected-a73fc347.js"
import{f as I}from"./fromEntries-c01da06d.js"
let M
function q(t,s){let a=String(s-1)
0===s&&(a="x"),o(t,`<img src="${r}arena/${a}.png" class="moveImg">`)}function D(t,s){return`<option value="${String(s.id)}"${E(t.slots.join(),s.slots.join())}>${s.name}</option>`}function L(i,n){const o=function(a){return M||(M=s(a,t())),M}(n)
a("",o),i.slots.forEach(e(q,o))}function A(t,s,a){var e;(e=s.target.value,k({subcmd:"usesetup",set_id:e})).then(s=>{s.s&&L(a,t)})}function H(t,s,a){const e=t.sets.find(t=>t.id===Number(a.target.value))
e&&A(s,a,e)}function J(a,o,r){if(r.specials){const r=t({className:"flex"})
!function(a,o){if(a.sets.length>0){const r=C({innerHTML:a.sets.map(e(D,a.current_set)).join("")})
i(r,"change",e(H,a,o))
const c=t({className:"flex"})
s(c,r),n(o,c)}}(a,r),L(a.current_set,r),s(o,r)}}function P(t){return k({subcmd:"join",pvp_id:t})}function z(t){t.preventDefault()
const s=f(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${l}?${s}`}const F=t=>I(t.r.attributes.map(t=>[`stat_${x(g[t.id])}`,t.value])),K=t=>I(t.r.map(t=>[x($[t.t]),t.n]))
async function O(t){t.preventDefault()
const s=w(),[a,e,i]=await S([c({subcmd:"loadequipped"}),P(s),v("fsh_arenaJoined")])
if(j(a.r)){const t={pvpId:s,joined:b,...K(a),...F(e)},n=i||[]
n.push(t),h("fsh_arenaJoined",n)}z(t)}function Q(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${a=s,String(Number(a))}.png"></div></div>`
var a}function R(t){const s=p("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const a=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${Q("Specials",t.specials)}${Q("Hell Forge",t.hellforge)}${Q("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(a)),J(t.r,s,a),function(){const t=p('input[type="submit"]',m)
t&&(u(t,"click",z),d(t,"click",O))}()}}export default function(){_("arenaTypeTabs")?T():(!function(){const t=p('input[type="submit"]',m)
t&&d(t,"click",z)}(),N().catch(()=>({})).then(R))}
//# sourceMappingURL=arenaJoin-eaee0330.js.map
