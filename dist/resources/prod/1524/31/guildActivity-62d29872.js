import{g as t}from"./guild-63d1a956.js"
import{S as a,a2 as n,t as e}from"./calfSystem-7aee5245.js"
import{u as s,a as m,c as i,m as r,l as o,v as c,g as u}from"./indexConstants-dd933112.js"
import{g as f,s as l}from"./idb-12bca0fb.js"
let d,b,p
function g(){return d||(d=t({subcmd:"manage"})),d}function h(t){return Math.floor(Math.max(0,a-t)/86400)}function _(t){b.members[t.name].push([h(t.last_activity),t.current_stamina,t.level,t.max_stamina,a,t.vl,t.guild_xp])}const v=[(t,a)=>a.current_stamina!==t[i],(t,a)=>a.max_stamina>t[r],(t,a)=>a.level!==t[o],(t,a)=>a.vl!==t[c],(t,a)=>a.guild_xp!==t[u]]
function x(t,a,n){return n(t,a)}function y(t,n){!function(t,a){return v.some(e(x,t,a))}(t,n)?(t[m]=h(n.last_activity),t[s]=a):_(n)}function j(t,n){!function(t){b.members[t.name]||(b.members[t.name]=[],_(t))}(n)
const e=b.members[n.name],m=e[e.length-1]
a-m[s]>=86100&&y(m,n),t.members[n.name]=b.members[n.name]}function U(t,a){a.members.forEach(e(j,t))}function A(t){t&&t.r&&(p=t,function(){const t={lastUpdate:a,members:{}}
p.r.ranks.forEach(e(U,t)),l("fsh_guildActivity",t)}())}function E(t){b=t||{lastUpdate:0,members:{}},a>n(b.lastUpdate,0)+300&&g().then(A)}function M(){f("fsh_guildActivity").then(E)}export default M
//# sourceMappingURL=guildActivity-62d29872.js.map
