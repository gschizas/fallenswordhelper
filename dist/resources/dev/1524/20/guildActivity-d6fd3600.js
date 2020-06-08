import{T as t,a3 as a,t as s}from"./calfSystem-a2862afc.js"
import{g as e,s as n}from"./idb-911ff7c2.js"
import{u as m,a as i,c as r,m as o,l as c,v as f,g as l}from"./indexConstants-3e970228.js"
import"./guild-4a5b1ef9.js"
import{d as u,l as d}from"./lastActivityToDays-54a09736.js"
let p,b
function v(a){p.members[a.name].push([d(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[c],(t,a)=>a.vl!==t[f],(t,a)=>a.guild_xp!==t[l]]
function g(t,a,s){return s(t,a)}function h(a,e){!function(t,a){return _.some(s(g,t,a))}(a,e)?(a[i]=d(e.last_activity),a[m]=t):v(e)}function y(a,s){!function(t){p.members[t.name]||(p.members[t.name]=[],v(t))}(s)
const e=p.members[s.name],n=e[e.length-1]
t-n[m]>=86100&&h(n,s),a.members[s.name]=p.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(b=a,function(){const a={lastUpdate:t,members:{}}
b.r.ranks.forEach(s(x,a)),n("fsh_guildActivity",a)}())}function A(s){p=s||{lastUpdate:0,members:{}},t>a(p.lastUpdate,0)+300&&u().then(j)}export default function(){e("fsh_guildActivity").then(A)}
//# sourceMappingURL=guildActivity-d6fd3600.js.map
