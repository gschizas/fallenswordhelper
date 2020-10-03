import{T as t,a3 as a,t as s}from"./calfSystem-4991bf5b.js"
import{g as e,s as n}from"./idb-ee31c042.js"
import{u as m,a as i,c as r,m as o,l as c,v as f,g as l}from"./indexConstants-8cbef74f.js"
import"./guild-b6f6e040.js"
import{d as u,l as b}from"./lastActivityToDays-0233a257.js"
let d,p
function v(a){d.members[a.name].push([b(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[c],(t,a)=>a.vl!==t[f],(t,a)=>a.guild_xp!==t[l]]
function g(t,a,s){return s(t,a)}function h(a,e){!function(t,a){return _.some(s(g,t,a))}(a,e)?(a[i]=b(e.last_activity),a[m]=t):v(e)}function y(a,s){!function(t){d.members[t.name]||(d.members[t.name]=[],v(t))}(s)
const e=d.members[s.name],n=e[e.length-1]
t-n[m]>=86100&&h(n,s),a.members[s.name]=d.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(s(x,a)),n("fsh_guildActivity",a)}())}function A(s){d=s||{lastUpdate:0,members:{}},t>a(d.lastUpdate,0)+300&&u().then(j)}function U(){e("fsh_guildActivity").then(A)}export default U
//# sourceMappingURL=guildActivity-6abb1abb.js.map
