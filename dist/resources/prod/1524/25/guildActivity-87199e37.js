import{S as t,a2 as a,t as n}from"./calfSystem-71b9378d.js"
import{g as e,s}from"./idb-97e2a44e.js"
import{u as m,a as i,c as r,m as o,l as u,v as c,g as f}from"./indexConstants-00eab081.js"
import{g as l}from"./guild-47ef22aa.js"
let b,d,p
function g(){return b||(b=l({subcmd:"manage"})),b}function h(a){return Math.floor(Math.max(0,t-a)/86400)}function _(a){d.members[a.name].push([h(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const v=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[u],(t,a)=>a.vl!==t[c],(t,a)=>a.guild_xp!==t[f]]
function x(t,a,n){return n(t,a)}function y(a,e){!function(t,a){return v.some(n(x,t,a))}(a,e)?(a[i]=h(e.last_activity),a[m]=t):_(e)}function j(a,n){!function(t){d.members[t.name]||(d.members[t.name]=[],_(t))}(n)
const e=d.members[n.name],s=e[e.length-1]
t-s[m]>=86100&&y(s,n),a.members[n.name]=d.members[n.name]}function U(t,a){a.members.forEach(n(j,t))}function A(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(n(U,a)),s("fsh_guildActivity",a)}())}function E(n){d=n||{lastUpdate:0,members:{}},t>a(d.lastUpdate,0)+300&&g().then(A)}function M(){e("fsh_guildActivity").then(E)}export default M
//# sourceMappingURL=guildActivity-87199e37.js.map
