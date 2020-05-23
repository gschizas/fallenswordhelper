import{l as t,h as s,C as e,v as a,f as i,m as n,i as o,aI as r,bl as c,aK as l,O as p,S as m,p as u,bm as d,Q as f,ai as v,R as b,az as j,bn as $,bo as g,ak as h,ac as y,A as _}from"./calfSystem-0e5d6faf.js"
import"./dontPost-2f9bbd28.js"
import"./numberIsNaN-a4c8282b.js"
import{t as x}from"./toLowerCase-adcc7aa6.js"
import"./setTipped-a747706b.js"
import{a as S}from"./all-9248ebd2.js"
import"./allthen-ecc09c9c.js"
import"./lvlTests-6c0bd1bb.js"
import"./loadDataTables-6dbe583c.js"
import{i as T,v as N}from"./arena-da57e22e.js"
import"./changeMinMax-ba462eb9.js"
import"./assets-e88e9d09.js"
import"./updateUrl-1997a60e.js"
import{a as k}from"./arena-52bce975.js"
import{t as w}from"./thisTournament-9dc95920.js"
import{c as C}from"./createSelect-40cc42eb.js"
import{i as E}from"./isSelected-11ad70e7.js"
import{f as I}from"./fromEntries-00e6eae5.js"
let M
function q(t,s){let e=String(s-1)
0===s&&(e="x"),o(t,`<img src="${r}arena/${e}.png" class="moveImg">`)}function D(t,s){return`<option value="${String(s.id)}"${E(t.slots.join(),s.slots.join())}>${s.name}</option>`}function L(i,n){const o=function(e){return M||(M=s(e,t())),M}(n)
e("",o),i.slots.forEach(a(q,o))}function A(t,s,e){var a;(a=s.target.value,k({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&L(e,t)})}function H(t,s,e){const a=t.sets.find(t=>t.id===Number(e.target.value))
a&&A(s,e,a)}function J(e,o,r){if(r.specials){const r=t({className:"flex"})
!function(e,o){if(e.sets.length>0){const r=C({innerHTML:e.sets.map(a(D,e.current_set)).join("")})
i(r,"change",a(H,e,o))
const c=t({className:"flex"})
s(c,r),n(o,c)}}(e,r),L(e.current_set,r),s(o,r)}}function P(t){return k({subcmd:"join",pvp_id:t})}function z(t){t.preventDefault()
const s=l(t.target.closest("form").elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${p}?${s}`}const F=t=>I(t.r.attributes.map(t=>[`stat_${x(g[t.id])}`,t.value])),K=t=>I(t.r.map(t=>[x($[t.t]),t.n]))
async function O(t){t.preventDefault()
const s=w(),[e,a,i]=await S([c({subcmd:"loadequipped"}),P(s),v("fsh_arenaJoined")])
if(b(e.r)){const t={pvpId:s,joined:j,...K(e),...F(a)},n=i||[]
n.push(t),h("fsh_arenaJoined",n)}z(t)}function Q(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function R(t){const s=m("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${Q("Specials",t.specials)}${Q("Hell Forge",t.hellforge)}${Q("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(e)),J(t.r,s,e),function(){const t=m('input[type="submit"]',u)
t&&(d(t,"click",z),f(t,"click",O))}()}}export default function(){_("arenaTypeTabs")?T():(!function(){const t=m('input[type="submit"]',u)
t&&f(t,"click",z)}(),N().catch(()=>({})).then(R))}
//# sourceMappingURL=arenaJoin-82b6ba01.js.map
