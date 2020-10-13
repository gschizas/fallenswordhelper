import{m as s,h as t,A as e,t as a,f as i,i as r,aH as n,C as o,a$ as c,b0 as m,p as f,O as p,P as d,T as l,aT as u,b1 as v,b2 as b,y as j}from"./calfSystem-b136673a.js"
import"./numberIsNaN-91041dcf.js"
import{t as g}from"./toLowerCase-27ea448e.js"
import{a as h}from"./addCommas-8259c1a9.js"
import"./setTipped-e5305fe4.js"
import"./insertElementBefore-eada6f05.js"
import"./currentGuildId-4405d1bb.js"
import"./intValue-f4d85578.js"
import{g as $,s as T}from"./idb-c31665cb.js"
import{i as _}from"./insertElementAfterBegin-9a4b7ee1.js"
import"./formToUrl-1d96bdd4.js"
import{h as x,i as y}from"./interceptSubmit-957549ab.js"
import"./closest-9ef1a6fc.js"
import"./closestTr-ea8b5479.js"
import"./lvlTests-045a7c7d.js"
import{a as S}from"./all-7e2b4bf6.js"
import"./loadDataTables-fb922282.js"
import"./allthen-7191069a.js"
import{i as N,v as C}from"./arena-3f06ba26.js"
import"./changeMinMax-9ec858ae.js"
import"./assets-48002450.js"
import{a as E}from"./arena-6a803efd.js"
import{t as I}from"./thisTournament-1b272556.js"
import{c as M}from"./createSelect-862cda37.js"
import{i as q}from"./isSelected-1ef1e976.js"
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
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${h(s.equip_level)}</div></div></div>`}(e)),J(s.r,t,e)}}function G(s){return E({subcmd:"join",pvp_id:s})}const O=s=>u(s.r.attributes.map(s=>["stat_"+g(b[s.id]),s.value])),U=s=>u(s.r.map(s=>[g(v[s.t]),s.n]))
async function V(s){s.preventDefault()
const t=I(),[e,a,i]=await S([c({subcmd:"loadequipped"}),G(t),$("fsh_arenaJoined")])
if(d(e.r)){const s={pvpId:t,joined:l,...U(e),...O(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}function k(){j("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(F),m(f,"submit",x),p(f,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-59c406e2.js.map
