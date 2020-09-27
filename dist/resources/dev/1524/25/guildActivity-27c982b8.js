import{T as t,a3 as a,t as s}from"./calfSystem-69dd5601.js"
import{g as e,s as n}from"./idb-874fe815.js"
import{u as m,a as i,c as r,m as o,l as c,v as l,g as u}from"./indexConstants-00eab081.js"
import"./guild-bc028c80.js"
import{d as f,l as d}from"./lastActivityToDays-03866400.js"
let b,p
function v(a){b.members[a.name].push([d(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[c],(t,a)=>a.vl!==t[l],(t,a)=>a.guild_xp!==t[u]]
function g(t,a,s){return s(t,a)}function h(a,e){!function(t,a){return _.some(s(g,t,a))}(a,e)?(a[i]=d(e.last_activity),a[m]=t):v(e)}function y(a,s){!function(t){b.members[t.name]||(b.members[t.name]=[],v(t))}(s)
const e=b.members[s.name],n=e[e.length-1]
t-n[m]>=86100&&h(n,s),a.members[s.name]=b.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(s(x,a)),n("fsh_guildActivity",a)}())}function A(s){b=s||{lastUpdate:0,members:{}},t>a(b.lastUpdate,0)+300&&f().then(j)}function U(){e("fsh_guildActivity").then(A)}export default U
//# sourceMappingURL=guildActivity-27c982b8.js.map
