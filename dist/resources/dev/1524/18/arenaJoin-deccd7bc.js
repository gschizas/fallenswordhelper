import{k as t,f as s,z as a,s as e,e as i,i as n,aG as r,b1 as o,a3 as c,J as m,N as p,p as l,b2 as d,L as f,M as u,R as b,aV as v,b3 as j,b4 as g,x as $}from"./calfSystem-5545a3e6.js"
import"./dontPost-14e1d4b8.js"
import"./numberIsNaN-0d2994c6.js"
import{t as h}from"./toLowerCase-57ae178d.js"
import{a as y}from"./addCommas-757dfba4.js"
import"./setTipped-b17b5374.js"
import"./currentGuildId-2b105bba.js"
import"./intValue-02f9213d.js"
import{g as _,s as x}from"./idb-ab1a88c6.js"
import"./insertElementBefore-babbeb6f.js"
import{i as T}from"./insertElementAfterBegin-f98e43de.js"
import"./closest-b938ab98.js"
import{c as N}from"./closestForm-eb32a866.js"
import{a as S}from"./all-d45d8a77.js"
import"./allthen-d56c46ae.js"
import"./closestTr-4d73d7e9.js"
import"./lvlTests-4716a9a2.js"
import"./loadDataTables-6b7a4c95.js"
import{i as E,v as M}from"./arena-80d4f783.js"
import"./changeMinMax-c13b1b5a.js"
import"./assets-b2433606.js"
import"./updateUrl-f2860fab.js"
import{a as k}from"./arena-f3eca74c.js"
import{t as w}from"./thisTournament-aa40fa37.js"
import{c as C}from"./createSelect-40aa5291.js"
import{i as I}from"./isSelected-59502831.js"
let L
function q(t,s){let a=String(s-1)
0===s&&(a="x"),n(t,`<img src="${r}arena/${a}.png" class="moveImg">`)}function D(t,s){return`<option value="${String(s.id)}"${I(t.slots.join(),s.slots.join())}>${s.name}</option>`}function J(i,n){const r=function(a){return L||(L=s(a,t())),L}(n)
a("",r),i.slots.forEach(e(q,r))}function A(t,s,a){var e;(e=s.target.value,k({subcmd:"usesetup",set_id:e})).then(s=>{s.s&&J(a,t)})}function B(t,s,a){const e=t.sets.find(t=>t.id===Number(a.target.value))
e&&A(s,a,e)}function F(a,n,r){if(r.specials){const r=t({className:"flex"})
!function(a,n){if(a.sets.length>0){const r=C({innerHTML:a.sets.map(e(D,a.current_set)).join("")})
i(r,"change",e(B,a,n))
const o=t({className:"flex"})
s(o,r),T(n,o)}}(a,r),J(a.current_set,r),s(n,r)}}function G(t){return k({subcmd:"join",pvp_id:t})}function H(t){t.preventDefault()
const s=c(N(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${m}?${s}`}const P=t=>v(t.r.attributes.map(t=>["stat_"+h(g[t.id]),t.value])),V=t=>v(t.r.map(t=>[h(j[t.t]),t.n]))
async function z(t){t.preventDefault()
const s=w(),[a,e,i]=await S([o({subcmd:"loadequipped"}),G(s),_("fsh_arenaJoined")])
if(u(a.r)){const t={pvpId:s,joined:b,...V(a),...P(e)},n=i||[]
n.push(t),x("fsh_arenaJoined",n)}H(t)}function R(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${a=s,String(Number(a))}.png"></div></div>`
var a}function U(t){const s=p("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const a=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${R("Specials",t.specials)}${R("Hell Forge",t.hellforge)}${R("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(a)),F(t.r,s,a),function(){const t=p('input[type="submit"]',l)
t&&(d(t,"click",H),f(t,"click",z))}()}}export default function(){$("arenaTypeTabs")?E():(!function(){const t=p('input[type="submit"]',l)
t&&f(t,"click",H)}(),M().catch(()=>({})).then(U))}
//# sourceMappingURL=arenaJoin-deccd7bc.js.map
