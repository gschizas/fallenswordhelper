import{l as t,h as s,C as a,v as e,f as i,m as n,i as o,aI as r,bl as c,aK as f,O as l,S as p,p as m,bm as u,Q as d,ai as v,R as b,az as j,bn as g,bo as $,ak as h,ac as y,A as _}from"./calfSystem-fd021443.js"
import"./dontPost-18b03cba.js"
import"./numberIsNaN-c0f5c8eb.js"
import{t as x}from"./toLowerCase-4cca5593.js"
import"./setTipped-34f0d2bb.js"
import{a as S}from"./all-93b0c1ea.js"
import"./allthen-b8986e95.js"
import"./lvlTests-90d88d7a.js"
import"./loadDataTables-bf6874f7.js"
import{i as T,v as N}from"./arena-2a708ffe.js"
import"./changeMinMax-505ad30d.js"
import"./assets-5a143407.js"
import"./updateUrl-ca744051.js"
import{a as k}from"./arena-a85010a6.js"
import{t as w}from"./thisTournament-f7762e0b.js"
import{c as C}from"./createSelect-11128e92.js"
import{i as E}from"./isSelected-ad5c8299.js"
import{f as I}from"./fromEntries-e7fe3078.js"
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
window.location=`${l}?${s}`}const F=t=>I(t.r.attributes.map(t=>["stat_"+x($[t.id]),t.value])),K=t=>I(t.r.map(t=>[x(g[t.t]),t.n]))
async function O(t){t.preventDefault()
const s=w(),[a,e,i]=await S([c({subcmd:"loadequipped"}),P(s),v("fsh_arenaJoined")])
if(b(a.r)){const t={pvpId:s,joined:j,...K(a),...F(e)},n=i||[]
n.push(t),h("fsh_arenaJoined",n)}z(t)}function Q(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${a=s,String(Number(a))}.png"></div></div>`
var a}function R(t){const s=p("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const a=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${Q("Specials",t.specials)}${Q("Hell Forge",t.hellforge)}${Q("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(a)),J(t.r,s,a),function(){const t=p('input[type="submit"]',m)
t&&(u(t,"click",z),d(t,"click",O))}()}}export default function(){_("arenaTypeTabs")?T():(!function(){const t=p('input[type="submit"]',m)
t&&d(t,"click",z)}(),N().catch(()=>({})).then(R))}
//# sourceMappingURL=arenaJoin-6f8eb57f.js.map
