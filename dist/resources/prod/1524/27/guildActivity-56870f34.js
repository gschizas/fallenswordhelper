import{T as t,a3 as n,t as a}from"./calfSystem-3bdf319e.js"
import{g as e,s}from"./idb-31fb041e.js"
import{u as m,a as i,c as r,m as o,l as f,v as u,g as c}from"./indexConstants-b81ff7d8.js"
import{g as l}from"./guild-68bbf674.js"
let b,d,p
function g(){return b||(b=l({subcmd:"manage"})),b}function h(n){return Math.floor(Math.max(0,t-n)/86400)}function _(n){d.members[n.name].push([h(n.last_activity),n.current_stamina,n.level,n.max_stamina,t,n.vl,n.guild_xp])}const v=[(t,n)=>n.current_stamina!==t[r],(t,n)=>n.max_stamina>t[o],(t,n)=>n.level!==t[f],(t,n)=>n.vl!==t[u],(t,n)=>n.guild_xp!==t[c]]
function x(t,n,a){return a(t,n)}function y(n,e){!function(t,n){return v.some(a(x,t,n))}(n,e)?(n[i]=h(e.last_activity),n[m]=t):_(e)}function j(n,a){!function(t){d.members[t.name]||(d.members[t.name]=[],_(t))}(a)
const e=d.members[a.name],s=e[e.length-1]
t-s[m]>=86100&&y(s,a),n.members[a.name]=d.members[a.name]}function U(t,n){n.members.forEach(a(j,t))}function A(n){n&&n.r&&(p=n,function(){const n={lastUpdate:t,members:{}}
p.r.ranks.forEach(a(U,n)),s("fsh_guildActivity",n)}())}function E(a){d=a||{lastUpdate:0,members:{}},t>n(d.lastUpdate,0)+300&&g().then(A)}function M(){e("fsh_guildActivity").then(E)}export default M
//# sourceMappingURL=guildActivity-56870f34.js.map
