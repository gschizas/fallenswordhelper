import{T as t,a3 as s,t as a}from"./calfSystem-54df10e3.js"
import{g as e,s as n}from"./idb-7f0d2b39.js"
import{u as m,a as i,c as r,m as o,l as c,v as f,g as l}from"./indexConstants-f8e10236.js"
import"./guild-bcc0307e.js"
import{d as u,l as d}from"./lastActivityToDays-3f5fde7d.js"
let b,p
function v(s){b.members[s.name].push([d(s.last_activity),s.current_stamina,s.level,s.max_stamina,t,s.vl,s.guild_xp])}const _=[(t,s)=>s.current_stamina!==t[r],(t,s)=>s.max_stamina>t[o],(t,s)=>s.level!==t[c],(t,s)=>s.vl!==t[f],(t,s)=>s.guild_xp!==t[l]]
function g(t,s,a){return a(t,s)}function h(s,e){!function(t,s){return _.some(a(g,t,s))}(s,e)?(s[i]=d(e.last_activity),s[m]=t):v(e)}function y(s,a){!function(t){b.members[t.name]||(b.members[t.name]=[],v(t))}(a)
const e=b.members[a.name],n=e[e.length-1]
t-n[m]>=86100&&h(n,a),s.members[a.name]=b.members[a.name]}function x(t,s){s.members.forEach(a(y,t))}function j(s){s&&s.r&&(p=s,function(){const s={lastUpdate:t,members:{}}
p.r.ranks.forEach(a(x,s)),n("fsh_guildActivity",s)}())}function A(a){b=a||{lastUpdate:0,members:{}},t>s(b.lastUpdate,0)+300&&u().then(j)}function U(){e("fsh_guildActivity").then(A)}export default U
//# sourceMappingURL=guildActivity-7680b049.js.map
