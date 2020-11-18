import{T as t,a3 as a,t as s}from"./calfSystem-02c48ff5.js"
import{g as n,s as e}from"./idb-49c5b621.js"
import{u as m,a as i,c as r,m as o,l as c,v as f,g as l}from"./indexConstants-1b0a7800.js"
import"./guild-49f69973.js"
import{d as u,l as b}from"./lastActivityToDays-87330ce2.js"
let d,p
function v(a){d.members[a.name].push([b(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const _=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[c],(t,a)=>a.vl!==t[f],(t,a)=>a.guild_xp!==t[l]]
function g(t,a,s){return s(t,a)}function h(a,n){!function(t,a){return _.some(s(g,t,a))}(a,n)?(a[i]=b(n.last_activity),a[m]=t):v(n)}function y(a,s){!function(t){d.members[t.name]||(d.members[t.name]=[],v(t))}(s)
const n=d.members[s.name],e=n[n.length-1]
t-e[m]>=86100&&h(e,s),a.members[s.name]=d.members[s.name]}function x(t,a){a.members.forEach(s(y,t))}function j(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(s(x,a)),e("fsh_guildActivity",a)}())}function A(s){d=s||{lastUpdate:0,members:{}},t>a(d.lastUpdate,0)+300&&u().then(j)}function U(){n("fsh_guildActivity").then(A)}export default U
//# sourceMappingURL=guildActivity-a60f8dd5.js.map
