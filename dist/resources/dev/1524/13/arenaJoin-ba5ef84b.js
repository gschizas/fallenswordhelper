import{l as t,h as s,C as e,v as a,f as i,m as n,i as o,aI as r,bl as c,aK as l,O as d,S as p,p as m,bm as f,Q as u,ai as v,R as b,az as j,bn as g,bo as $,ak as h,ac as y,A as _}from"./calfSystem-01eb06ed.js"
import"./dontPost-05b11a96.js"
import"./numberIsNaN-5d7b8ccd.js"
import{t as x}from"./toLowerCase-b5dc48c4.js"
import"./setTipped-483fb9d0.js"
import{a as S}from"./all-6b303efd.js"
import"./allthen-385cdb7e.js"
import"./lvlTests-bc179c25.js"
import"./loadDataTables-00c29ac6.js"
import{i as T,v as N}from"./arena-9a4087b6.js"
import"./changeMinMax-dc4e1ad0.js"
import"./assets-9c2cb0ff.js"
import"./updateUrl-3475ad70.js"
import{a as k}from"./arena-7178bf3d.js"
import{t as w}from"./thisTournament-604e2d20.js"
import{c as C}from"./createSelect-0e33777d.js"
import{i as E}from"./isSelected-20065735.js"
import{f as I}from"./fromEntries-d95cc157.js"
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
window.location=`${d}?${s}`}const F=t=>I(t.r.attributes.map(t=>["stat_"+x($[t.id]),t.value])),K=t=>I(t.r.map(t=>[x(g[t.t]),t.n]))
async function O(t){t.preventDefault()
const s=w(),[e,a,i]=await S([c({subcmd:"loadequipped"}),P(s),v("fsh_arenaJoined")])
if(b(e.r)){const t={pvpId:s,joined:j,...K(e),...F(a)},n=i||[]
n.push(t),h("fsh_arenaJoined",n)}z(t)}function Q(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function R(t){const s=p("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
o(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${Q("Specials",t.specials)}${Q("Hell Forge",t.hellforge)}${Q("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(e)),J(t.r,s,e),function(){const t=p('input[type="submit"]',m)
t&&(f(t,"click",z),u(t,"click",O))}()}}export default function(){_("arenaTypeTabs")?T():(!function(){const t=p('input[type="submit"]',m)
t&&u(t,"click",z)}(),N().catch(()=>({})).then(R))}
//# sourceMappingURL=arenaJoin-ba5ef84b.js.map
