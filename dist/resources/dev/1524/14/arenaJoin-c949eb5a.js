import{k as t,f as s,B as a,u as e,e as i,l as n,i as o,aH as r,bk as c,aJ as f,N as l,R as p,p as u,bl as m,P as d,ah as v,Q as b,ay as j,bm as g,bn as $,aj as h,ab as y,z as _}from"./calfSystem-d96a3efd.js"
import"./dontPost-a74ab672.js"
import"./numberIsNaN-5b8bfc11.js"
import{t as x}from"./toLowerCase-a0540d2c.js"
import"./setTipped-906b0642.js"
import{a as N}from"./all-a5e007ad.js"
import"./allthen-182523ad.js"
import"./lvlTests-87272fa2.js"
import"./loadDataTables-366dff61.js"
import{i as S,v as T}from"./arena-bf2d7d5b.js"
import"./changeMinMax-2a9d74c1.js"
import"./assets-1567628f.js"
import"./updateUrl-266f192f.js"
import{a as k}from"./arena-c4be0131.js"
import{t as w}from"./thisTournament-76bfbc42.js"
import{c as E}from"./createSelect-2686597e.js"
import{i as M}from"./isSelected-20ba6606.js"
import{f as q}from"./fromEntries-cf9f1789.js"
let C
function D(t,s){let a=String(s-1)
0===s&&(a="x"),o(t,`<img src="${r}arena/${a}.png" class="moveImg">`)}function H(t,s){return`<option value="${String(s.id)}"${M(t.slots.join(),s.slots.join())}>${s.name}</option>`}function I(i,n){const o=function(a){return C||(C=s(a,t())),C}(n)
a("",o),i.slots.forEach(e(D,o))}function J(t,s,a){var e;(e=s.target.value,k({subcmd:"usesetup",set_id:e})).then(s=>{s.s&&I(a,t)})}function L(t,s,a){const e=t.sets.find(t=>t.id===Number(a.target.value))
e&&J(s,a,e)}function P(a,o,r){if(r.specials){const r=t({className:"flex"})
!function(a,o){if(a.sets.length>0){const r=E({innerHTML:a.sets.map(e(H,a.current_set)).join("")})
i(r,"change",e(L,a,o))
const c=t({className:"flex"})
s(c,r),n(o,c)}}(a,r),I(a.current_set,r),s(o,r)}}function z(t){return k({subcmd:"join",pvp_id:t})}function A(t){t.preventDefault()
const s=f(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${l}?${s}`}const B=t=>q(t.r.attributes.map(t=>["stat_"+x($[t.id]),t.value])),F=t=>q(t.r.map(t=>[x(g[t.t]),t.n]))
async function Q(t){t.preventDefault()
const s=w(),[a,e,i]=await N([c({subcmd:"loadequipped"}),z(s),v("fsh_arenaJoined")])
if(b(a.r)){const t={pvpId:s,joined:j,...F(a),...B(e)},n=i||[]
n.push(t),h("fsh_arenaJoined",n)}A(t)}function R(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${a=s,String(Number(a))}.png"></div></div>`
var a}function U(t){const s=p("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const a=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${R("Specials",t.specials)}${R("Hell Forge",t.hellforge)}${R("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(a)),P(t.r,s,a),function(){const t=p('input[type="submit"]',u)
t&&(m(t,"click",A),d(t,"click",Q))}()}}export default function(){_("arenaTypeTabs")?S():(!function(){const t=p('input[type="submit"]',u)
t&&d(t,"click",A)}(),T().catch(()=>({})).then(U))}
//# sourceMappingURL=arenaJoin-c949eb5a.js.map
