import{R as t,a1 as a,s}from"./calfSystem-d49dbbd3.js"
import{g as n,s as e}from"./idb-a6d1a1ba.js"
import{u as m,a as i,c as r,m as o,l as c,v as l,g as u}from"./indexConstants-872f0d21.js"
import"./guild-5830ca1d.js"
import{d as f,l as d}from"./lastActivityToDays-533d368c.js"
let b,p
function v(a){b.members[a.name].push([d(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[c],(t,a)=>a.vl!==t[l],(t,a)=>a.guild_xp!==t[u]]
function g(t,a,s){return s(t,a)}function h(a,n){!function(t,a){return _.some(s(g,t,a))}(a,n)?(a[i]=d(n.last_activity),a[m]=t):v(n)}function y(a,s){!function(t){b.members[t.name]||(b.members[t.name]=[],v(t))}(s)
const n=b.members[s.name],e=n[n.length-1]
t-e[m]>=86100&&h(e,s),a.members[s.name]=b.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(s(x,a)),e("fsh_guildActivity",a)}())}function A(s){b=s||{lastUpdate:0,members:{}},t>a(b.lastUpdate,0)+300&&f().then(j)}export default function(){n("fsh_guildActivity").then(A)}
//# sourceMappingURL=guildActivity-05369546.js.map
