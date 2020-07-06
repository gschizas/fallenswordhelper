import{m as s,h as t,A as e,t as a,f as i,i as r,aH as n,C as o,b0 as c,b1 as d,p as m,O as f,P as p,T as l,aU as u,b2 as v,b3 as j,y as b}from"./calfSystem-9901ad27.js"
import"./numberIsNaN-cb2409eb.js"
import{t as g}from"./toLowerCase-dda30e6b.js"
import{a as h}from"./addCommas-8cd7d96d.js"
import"./setTipped-d4d554a0.js"
import"./insertElementBefore-f1fdb06b.js"
import"./currentGuildId-86da8be9.js"
import"./intValue-0e84cdad.js"
import{g as $,s as T}from"./idb-efff97cf.js"
import{i as _}from"./insertElementAfterBegin-52f072be.js"
import"./formToUrl-4cebc28a.js"
import{h as x,i as y}from"./interceptSubmit-ce974a7c.js"
import"./closest-5107b89a.js"
import"./closestTr-5c087056.js"
import"./lvlTests-1e58f0ba.js"
import{a as S}from"./all-9da52a21.js"
import"./loadDataTables-d5d683d1.js"
import"./allthen-f8a5c187.js"
import{i as N,v as C}from"./arena-2fd5849c.js"
import"./changeMinMax-29622459.js"
import"./assets-06ec229a.js"
import{a as E}from"./arena-afe5f36a.js"
import{t as I}from"./thisTournament-64d89a19.js"
import{c as M}from"./createSelect-11d681f4.js"
import{i as q}from"./isSelected-04794fec.js"
let A
function H(s,t){let e=String(t-1)
0===t&&(e="x"),r(s,`<img src="${n}arena/${e}.png" class="moveImg">`)}function L(s,t){return`<option value="${String(t.id)}"${q(s.slots.join(),t.slots.join())}>${t.name}</option>`}function w(i,r){const n=function(e){return A||(A=t(e,s())),A}(r)
e("",n),i.slots.forEach(a(H,n))}function B(s,t,e){var a;(a=t.target.value,E({subcmd:"usesetup",set_id:a})).then(t=>{t.s&&w(e,s)})}function D(s,t,e){const a=s.sets.find(s=>s.id===Number(e.target.value))
a&&B(t,e,a)}function J(e,r,n){if(n.specials){const n=s({className:"flex"})
!function(e,r){if(e.sets.length>0){const n=M({innerHTML:e.sets.map(a(L,e.current_set)).join("")})
i(n,"change",a(D,e,r))
const o=s({className:"flex"})
t(o,n),_(r,o)}}(e,n),w(e.current_set,n),t(r,n)}}function P(s,t){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${e=t,String(Number(e))}.png"></div></div>`
var e}function U(s){const t=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&t){t.setAttribute("align","center")
const e=function(s){const t=I()
return s.arenas.find(s=>s.id===t)}(s.r)
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${h(s.equip_level)}</div></div></div>`}(e)),J(s.r,t,e)}}function F(s){return E({subcmd:"join",pvp_id:s})}const G=s=>u(s.r.attributes.map(s=>["stat_"+g(j[s.id]),s.value])),O=s=>u(s.r.map(s=>[g(v[s.t]),s.n]))
async function V(s){s.preventDefault()
const t=I(),[e,a,i]=await S([c({subcmd:"loadequipped"}),F(t),$("fsh_arenaJoined")])
if(p(e.r)){const s={pvpId:t,joined:l,...O(e),...G(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}export default function(){b("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(U),d(m,"submit",x),f(m,"submit",V))}
//# sourceMappingURL=arenaJoin-77fda2b8.js.map
