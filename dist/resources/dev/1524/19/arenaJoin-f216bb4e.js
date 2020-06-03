import{k as t,f as s,z as e,s as a,e as i,i as n,aG as r,b1 as o,a3 as c,J as m,N as f,p,b2 as l,L as d,M as u,R as v,aV as j,b3 as b,b4 as g,x as $}from"./calfSystem-f7574730.js"
import"./dontPost-f800280d.js"
import"./numberIsNaN-92f332e4.js"
import{t as h}from"./toLowerCase-9cb6a319.js"
import{a as y}from"./addCommas-1a19f537.js"
import"./setTipped-71bfe88a.js"
import"./currentGuildId-3e98e06d.js"
import"./intValue-0280032d.js"
import{g as _,s as x}from"./idb-14a57c5b.js"
import"./insertElementBefore-b5c9c232.js"
import{i as T}from"./insertElementAfterBegin-5fb4abe9.js"
import"./closest-807af018.js"
import{c as N}from"./closestForm-b93f80cc.js"
import{a as S}from"./all-d5952527.js"
import"./allthen-0309499d.js"
import"./closestTr-78ace0a3.js"
import"./lvlTests-38a8de9e.js"
import"./loadDataTables-791afcee.js"
import{i as E,v as M}from"./arena-4ffd50c4.js"
import"./changeMinMax-aa6c016a.js"
import"./assets-5d34d620.js"
import"./updateUrl-1670c59a.js"
import{a as k}from"./arena-f2357f8e.js"
import{t as w}from"./thisTournament-a3ecf488.js"
import{c as C}from"./createSelect-0016c807.js"
import{i as I}from"./isSelected-3539c116.js"
let L
function q(t,s){let e=String(s-1)
0===s&&(e="x"),n(t,`<img src="${r}arena/${e}.png" class="moveImg">`)}function D(t,s){return`<option value="${String(s.id)}"${I(t.slots.join(),s.slots.join())}>${s.name}</option>`}function J(i,n){const r=function(e){return L||(L=s(e,t())),L}(n)
e("",r),i.slots.forEach(a(q,r))}function A(t,s,e){var a;(a=s.target.value,k({subcmd:"usesetup",set_id:a})).then(s=>{s.s&&J(e,t)})}function B(t,s,e){const a=t.sets.find(t=>t.id===Number(e.target.value))
a&&A(s,e,a)}function F(e,n,r){if(r.specials){const r=t({className:"flex"})
!function(e,n){if(e.sets.length>0){const r=C({innerHTML:e.sets.map(a(D,e.current_set)).join("")})
i(r,"change",a(B,e,n))
const o=t({className:"flex"})
s(o,r),T(n,o)}}(e,r),J(e.current_set,r),s(n,r)}}function G(t){return k({subcmd:"join",pvp_id:t})}function H(t){t.preventDefault()
const s=c(N(t.target).elements).filter(t=>"submit"!==t.type).map(t=>`${t.name}=${t.value}`).join("&")
window.location=`${m}?${s}`}const P=t=>j(t.r.attributes.map(t=>["stat_"+h(g[t.id]),t.value])),V=t=>j(t.r.map(t=>[h(b[t.t]),t.n]))
async function z(t){t.preventDefault()
const s=w(),[e,a,i]=await S([o({subcmd:"loadequipped"}),G(s),_("fsh_arenaJoined")])
if(u(e.r)){const t={pvpId:s,joined:v,...V(e),...P(a)},n=i||[]
n.push(t),x("fsh_arenaJoined",n)}H(t)}function R(t,s){return`<div><div>${t}</div><div><img src="${r}ui/arena/specials_${e=s,String(Number(e))}.png"></div></div>`
var e}function U(t){const s=f("#pCC > form > table tr:nth-of-type(4) td")
if(t.r&&s){s.setAttribute("align","center")
const e=function(t){const s=w()
return t.arenas.find(t=>t.id===s)}(t.r)
n(s,function(t){return`<div class="flex"><div><div>Players</div><div>${t.players.length} / ${t.max_players}</div></div>${R("Specials",t.specials)}${R("Hell Forge",t.hellforge)}${R("Epic",t.epic)}<div><div>Max Equip Level</div><div>${y(t.equip_level)}</div></div></div>`}(e)),F(t.r,s,e),function(){const t=f('input[type="submit"]',p)
t&&(l(t,"click",H),d(t,"click",z))}()}}export default function(){$("arenaTypeTabs")?E():(!function(){const t=f('input[type="submit"]',p)
t&&d(t,"click",H)}(),M().catch(()=>({})).then(U))}
//# sourceMappingURL=arenaJoin-f216bb4e.js.map
