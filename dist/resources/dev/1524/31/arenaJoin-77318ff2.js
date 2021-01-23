import{m as s,h as t,A as e,t as a,f as i,i as r,ak as n,C as o,al as c,am as m,p as d,O as p,P as l,T as f,an as u,ao as v,ap as j,y as b}from"./calfSystem-393ab895.js"
import{a as g,i as h,v as $}from"./arena-d61d47d0.js"
import{h as T,i as _}from"./interceptSubmit-193429ea.js"
import{a as x}from"./addCommas-02eed580.js"
import{t as y}from"./thisTournament-d87a26c2.js"
import{c as S}from"./createSelect-586b1e3a.js"
import{i as N}from"./insertElementAfterBegin-b64fd488.js"
import{i as C}from"./isSelected-7a00c567.js"
import{a as E}from"./all-6dfbd6b8.js"
import{t as I}from"./toLowerCase-51740687.js"
import{g as M,s as q}from"./idb-46b78b1e.js"
import"./allthen-3a9178b8.js"
import"./closestTr-e70c5c37.js"
import"./closest-77701dcf.js"
import"./intValue-e7ef611d.js"
import"./changeMinMax-9086d4c2.js"
import"./numberIsNaN-53300e34.js"
import"./assets-ad350aab.js"
import"./lvlTests-64ed0189.js"
import"./loadDataTables-06b95544.js"
import"./currentGuildId-469c60c3.js"
import"./setTipped-777d443c.js"
import"./formToUrl-7683ac99.js"
import"./insertElementBefore-43970b1f.js"
let A
function L(s,t){let e=String(t-1)
0===t&&(e="x"),r(s,`<img src="${n}arena/${e}.png" class="moveImg">`)}function w(s,t){return`<option value="${String(t.id)}"${C(s.slots.join(),t.slots.join())}>${t.name}</option>`}function B(i,r){const n=function(e){return A||(A=t(e,s())),A}(r)
e("",n),i.slots.forEach(a(L,n))}function D(s,t,e){var a;(a=t.target.value,g({subcmd:"usesetup",set_id:a})).then((t=>{t.s&&B(e,s)}))}function H(s,t,e){const a=s.sets.find((s=>s.id===Number(e.target.value)))
a&&D(t,e,a)}function J(e,r,n){if(n.specials){const n=s({className:"flex"})
!function(e,r){if(e.sets.length>0){const n=S({innerHTML:e.sets.map(a(w,e.current_set)).join("")})
i(n,"change",a(H,e,r))
const o=s({className:"flex"})
t(o,n),N(r,o)}}(e,n),B(e.current_set,n),t(r,n)}}function P(s,t){return`<div><div>${s}</div><div><img src="${n}ui/arena/specials_${e=t,String(Number(e))}.png"></div></div>`
var e}function k(s){const t=o("#pCC > form > table tr:nth-of-type(4) td")
if(s.r&&t){t.setAttribute("align","center")
const e=function(s){const t=y()
return s.arenas.find((s=>s.id===t))}(s.r)
r(t,function(s){return`<div class="flex"><div><div>Players</div><div>${s.players.length} / ${s.max_players}</div></div>${P("Specials",s.specials)}${P("Hell Forge",s.hellforge)}${P("Epic",s.epic)}<div><div>Max Equip Level</div><div>${x(s.equip_level)}</div></div></div>`}(e)),J(s.r,t,e)}}function F(s){return g({subcmd:"join",pvp_id:s})}const G=s=>u(s.r.attributes.map((s=>[`stat_${I(j[s.id])}`,s.value]))),O=s=>u(s.r.map((s=>[I(v[s.t]),s.n])))
async function U(s){s.preventDefault()
const t=y(),[e,a,i]=await E([c({subcmd:"loadequipped"}),F(t),M("fsh_arenaJoined")])
if(l(e.r)){const s={pvpId:t,joined:f,...O(e),...G(a)},r=i||[]
r.push(s),q("fsh_arenaJoined",r)}T(s)}function V(){b("arenaTypeTabs")?h():(_(),$().catch((()=>({}))).then(k),m(d,"submit",T),p(d,"submit",U))}export default V
//# sourceMappingURL=arenaJoin-77318ff2.js.map
