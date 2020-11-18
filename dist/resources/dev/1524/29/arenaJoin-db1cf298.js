import{m as s,h as t,A as e,t as a,f as i,i as r,aH as n,C as o,a$ as c,b0 as f,p as m,O as p,P as l,T as d,aT as u,b1 as v,b2 as j,y as b}from"./calfSystem-02c48ff5.js"
import"./numberIsNaN-d1ebf732.js"
import{t as g}from"./toLowerCase-0a22477f.js"
import{a as h}from"./addCommas-0aacc5f1.js"
import"./setTipped-56aeba85.js"
import"./insertElementBefore-7e0a7ce8.js"
import"./currentGuildId-cefcefd6.js"
import"./intValue-f94761c7.js"
import{g as $,s as T}from"./idb-49c5b621.js"
import{i as _}from"./insertElementAfterBegin-b26662c0.js"
import"./formToUrl-b49ee3b5.js"
import{h as x,i as y}from"./interceptSubmit-43d7e549.js"
import"./closest-14c30e26.js"
import"./closestTr-9052729a.js"
import"./lvlTests-a82a58f4.js"
import{a as S}from"./all-01203f8c.js"
import"./loadDataTables-b534a318.js"
import"./allthen-ca11bf0c.js"
import{i as N,v as C}from"./arena-14fc8216.js"
import"./changeMinMax-09af108d.js"
import"./assets-8c112bf6.js"
import{a as E}from"./arena-6c34b7f6.js"
import{t as I}from"./thisTournament-f8f3fca4.js"
import{c as M}from"./createSelect-1dc3a40f.js"
import{i as q}from"./isSelected-ce1d62ee.js"
let A
function H(s,t){let e=String(t-1)
0===t&&(e="x"),r(s,`<img src="${n}arena/${e}.png" class="moveImg">`)}function L(s,t){return`<option value="${String(t.id)}"${q(s.slots.join(),t.slots.join())}>${t.name}</option>`}function w(i,r){const n=function(e){return A||(A=t(e,s())),A}(r)
e("",n),i.slots.forEach(a(H,n))}function B(s,t,e){var a;(a=t.target.value,E({subcmd:"usesetup",set_id:a})).then(t=>{t.s&&w(e,s)})}function D(s,t,e){const a=s.sets.find(s=>s.id===Number(e.target.value))
a&&B(t,e,a)}function J(e,r,n){if(n.specials){const n=s({className:"flex"})
!function(e,r){if(e.sets.length>0){const n=M({innerHTML:e.sets.map(a(L,e.current_set)).join("")})
i(n,"change",a(D,e,r))
const o=s({className:"flex"})
t(o,n),_(r,o)}}(e,n),w(e.current_set,n),t(r,n)}}function P(s,t){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${e=t,String(Number(e))}.png"></div></div>`
var e}function F(s){const t=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&t){t.setAttribute("align","center")
const e=function(s){const t=I()
return s.arenas.find(s=>s.id===t)}(s.r)
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${h(s.equip_level)}</div></div></div>`}(e)),J(s.r,t,e)}}function G(s){return E({subcmd:"join",pvp_id:s})}const O=s=>u(s.r.attributes.map(s=>["stat_"+g(j[s.id]),s.value])),U=s=>u(s.r.map(s=>[g(v[s.t]),s.n]))
async function V(s){s.preventDefault()
const t=I(),[e,a,i]=await S([c({subcmd:"loadequipped"}),G(t),$("fsh_arenaJoined")])
if(l(e.r)){const s={pvpId:t,joined:d,...U(e),...O(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}function k(){b("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(F),f(m,"submit",x),p(m,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-db1cf298.js.map
