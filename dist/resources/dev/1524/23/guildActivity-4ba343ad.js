import{T as t,a3 as a,t as s}from"./calfSystem-9901ad27.js"
import{g as n,s as e}from"./idb-efff97cf.js"
import{u as m,a as i,c as r,m as o,l as c,v as f,g as l}from"./indexConstants-a42acd82.js"
import"./guild-1d87405d.js"
import{d as u,l as d}from"./lastActivityToDays-0f06daa3.js"
let p,b
function v(a){p.members[a.name].push([d(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[c],(t,a)=>a.vl!==t[f],(t,a)=>a.guild_xp!==t[l]]
function g(t,a,s){return s(t,a)}function h(a,n){!function(t,a){return _.some(s(g,t,a))}(a,n)?(a[i]=d(n.last_activity),a[m]=t):v(n)}function y(a,s){!function(t){p.members[t.name]||(p.members[t.name]=[],v(t))}(s)
const n=p.members[s.name],e=n[n.length-1]
t-e[m]>=86100&&h(e,s),a.members[s.name]=p.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(b=a,function(){const a={lastUpdate:t,members:{}}
b.r.ranks.forEach(s(x,a)),e("fsh_guildActivity",a)}())}function A(s){p=s||{lastUpdate:0,members:{}},t>a(p.lastUpdate,0)+300&&u().then(j)}export default function(){n("fsh_guildActivity").then(A)}
//# sourceMappingURL=guildActivity-4ba343ad.js.map
