import{T as t,a3 as a,t as s}from"./calfSystem-38898f3e.js"
import{g as e,s as n}from"./idb-ccc44752.js"
import{u as m,a as i,c as r,m as c,l as o,v as f,g as l}from"./indexConstants-d904ae0d.js"
import"./guild-fea08105.js"
import{d as u,l as d}from"./lastActivityToDays-cb8f37b5.js"
let b,p
function v(a){b.members[a.name].push([d(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[c],(t,a)=>a.level!==t[o],(t,a)=>a.vl!==t[f],(t,a)=>a.guild_xp!==t[l]]
function g(t,a,s){return s(t,a)}function h(a,e){!function(t,a){return _.some(s(g,t,a))}(a,e)?(a[i]=d(e.last_activity),a[m]=t):v(e)}function y(a,s){!function(t){b.members[t.name]||(b.members[t.name]=[],v(t))}(s)
const e=b.members[s.name],n=e[e.length-1]
t-n[m]>=86100&&h(n,s),a.members[s.name]=b.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(s(x,a)),n("fsh_guildActivity",a)}())}function A(s){b=s||{lastUpdate:0,members:{}},t>a(b.lastUpdate,0)+300&&u().then(j)}function U(){e("fsh_guildActivity").then(A)}export default U
//# sourceMappingURL=guildActivity-a6abc30b.js.map
