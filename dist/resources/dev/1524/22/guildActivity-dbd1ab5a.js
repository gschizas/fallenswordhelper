import{T as t,a3 as a,t as s}from"./calfSystem-4cc738f8.js"
import{g as n,s as e}from"./idb-670c0cca.js"
import{u as m,a as i,c,m as r,l as o,v as f,g as l}from"./indexConstants-ac12afb0.js"
import"./guild-152cc6b9.js"
import{d as u,l as b}from"./lastActivityToDays-d2a8efcb.js"
let d,p
function v(a){d.members[a.name].push([b(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[c],(t,a)=>a.max_stamina>t[r],(t,a)=>a.level!==t[o],(t,a)=>a.vl!==t[f],(t,a)=>a.guild_xp!==t[l]]
function g(t,a,s){return s(t,a)}function h(a,n){!function(t,a){return _.some(s(g,t,a))}(a,n)?(a[i]=b(n.last_activity),a[m]=t):v(n)}function y(a,s){!function(t){d.members[t.name]||(d.members[t.name]=[],v(t))}(s)
const n=d.members[s.name],e=n[n.length-1]
t-e[m]>=86100&&h(e,s),a.members[s.name]=d.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(s(x,a)),e("fsh_guildActivity",a)}())}function A(s){d=s||{lastUpdate:0,members:{}},t>a(d.lastUpdate,0)+300&&u().then(j)}export default function(){n("fsh_guildActivity").then(A)}
//# sourceMappingURL=guildActivity-dbd1ab5a.js.map
