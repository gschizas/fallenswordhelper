import{m as s,h as t,A as e,t as a,f as i,i as r,aH as n,C as o,a$ as c,b0 as m,p as f,O as p,P as d,T as l,aT as u,b1 as v,b2 as j,y as b}from"./calfSystem-54df10e3.js"
import"./numberIsNaN-fa7d637d.js"
import{t as g}from"./toLowerCase-5e186769.js"
import{a as h}from"./addCommas-508f0c08.js"
import"./setTipped-c3fa7f51.js"
import"./insertElementBefore-1b96a575.js"
import"./currentGuildId-7eae4191.js"
import"./intValue-e8157483.js"
import{g as $,s as T}from"./idb-7f0d2b39.js"
import{i as _}from"./insertElementAfterBegin-3912763d.js"
import"./formToUrl-54567b6c.js"
import{h as x,i as y}from"./interceptSubmit-d6a9b28d.js"
import"./closest-3bdef2f3.js"
import"./closestTr-612573e8.js"
import"./lvlTests-9878d022.js"
import{a as S}from"./all-36f83e81.js"
import"./loadDataTables-0859fee6.js"
import"./allthen-7d061027.js"
import{i as N,v as C}from"./arena-775e8e47.js"
import"./changeMinMax-649d8c61.js"
import"./assets-c6a1020c.js"
import{a as E}from"./arena-ac278570.js"
import{t as I}from"./thisTournament-370e78a5.js"
import{c as M}from"./createSelect-242bf534.js"
import{i as q}from"./isSelected-9a0f1276.js"
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
if(d(e.r)){const s={pvpId:t,joined:l,...U(e),...O(a)},r=i||[]
r.push(s),T("fsh_arenaJoined",r)}x(s)}function k(){b("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(F),m(f,"submit",x),p(f,"submit",V))}export default k
//# sourceMappingURL=arenaJoin-ccfb67bf.js.map
