import{m as s,h as t,A as e,t as a,f as i,i as r,aH as n,C as o,b0 as c,b1 as m,p as f,O as d,P as p,T as l,aU as u,b2 as v,b3 as j,y as b}from"./calfSystem-9c7241dc.js"
import"./numberIsNaN-7270cc8c.js"
import{t as g}from"./toLowerCase-9b533dae.js"
import{a as h}from"./addCommas-22ea816a.js"
import"./setTipped-df312394.js"
import"./insertElementBefore-686b8559.js"
import"./currentGuildId-00053b50.js"
import"./intValue-4cb61c79.js"
import{g as $,s as T}from"./idb-5f8a9591.js"
import{i as _}from"./insertElementAfterBegin-2637f36b.js"
import"./formToUrl-39ed921f.js"
import{h as x,i as y}from"./interceptSubmit-9fc997ac.js"
import"./closest-eb66b280.js"
import"./closestTr-5c882599.js"
import"./lvlTests-1f00aff4.js"
import{a as S}from"./all-fed72729.js"
import"./loadDataTables-d7f0915e.js"
import"./allthen-c94a6cae.js"
import{i as N,v as C}from"./arena-87ebc6c5.js"
import"./changeMinMax-38e8d71c.js"
import"./assets-ddd0effd.js"
import{a as E}from"./arena-a87f9650.js"
import{t as I}from"./thisTournament-5b7074c4.js"
import{c as M}from"./createSelect-2095351f.js"
import{i as q}from"./isSelected-057d5cda.js"
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
r.push(s),T("fsh_arenaJoined",r)}x(s)}export default function(){b("arenaTypeTabs")?N():(y(),C().catch(()=>({})).then(U),m(f,"submit",x),d(f,"submit",V))}
//# sourceMappingURL=arenaJoin-832f5d18.js.map
