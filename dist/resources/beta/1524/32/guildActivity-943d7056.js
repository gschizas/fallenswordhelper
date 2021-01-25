import{g as t}from"./guild-611eec4f.js"
import{T as n,a3 as a,t as e}from"./calfSystem-26bcf570.js"
import{u as s,a as m,c as i,m as r,l as o,v as c,g as f}from"./indexConstants-90d4e3b3.js"
import{g as u,s as l}from"./idb-47b3fdf8.js"
let b,d,p
function g(){return b||(b=t({subcmd:"manage"})),b}function h(t){return Math.floor(Math.max(0,n-t)/86400)}function _(t){d.members[t.name].push([h(t.last_activity),t.current_stamina,t.level,t.max_stamina,n,t.vl,t.guild_xp])}const v=[(t,n)=>n.current_stamina!==t[i],(t,n)=>n.max_stamina>t[r],(t,n)=>n.level!==t[o],(t,n)=>n.vl!==t[c],(t,n)=>n.guild_xp!==t[f]]
function x(t,n,a){return a(t,n)}function y(t,a){!function(t,n){return v.some(e(x,t,n))}(t,a)?(t[m]=h(a.last_activity),t[s]=n):_(a)}function j(t,a){!function(t){d.members[t.name]||(d.members[t.name]=[],_(t))}(a)
const e=d.members[a.name],m=e[e.length-1]
n-m[s]>=86100&&y(m,a),t.members[a.name]=d.members[a.name]}function U(t,n){n.members.forEach(e(j,t))}function A(t){t&&t.r&&(p=t,function(){const t={lastUpdate:n,members:{}}
p.r.ranks.forEach(e(U,t)),l("fsh_guildActivity",t)}())}function E(t){d=t||{lastUpdate:0,members:{}},n>a(d.lastUpdate,0)+300&&g().then(A)}function M(){u("fsh_guildActivity").then(E)}export default M
//# sourceMappingURL=guildActivity-943d7056.js.map
