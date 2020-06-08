import{S as t,a2 as a,t as n}from"./calfSystem-03970067.js"
import{g as e,s}from"./idb-3dad9172.js"
import{u as m,a as i,c as r,m as o,l as u,v as c,g as f}from"./indexConstants-9926991d.js"
import{g as l}from"./guild-7e15ffba.js"
let d,b,p
function g(){return d||(d=l({subcmd:"manage"})),d}function h(a){return Math.floor(Math.max(0,t-a)/86400)}function _(a){b.members[a.name].push([h(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const v=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[o],(t,a)=>a.level!==t[u],(t,a)=>a.vl!==t[c],(t,a)=>a.guild_xp!==t[f]]
function x(t,a,n){return n(t,a)}function y(a,e){!function(t,a){return v.some(n(x,t,a))}(a,e)?(a[i]=h(e.last_activity),a[m]=t):_(e)}function j(a,n){!function(t){b.members[t.name]||(b.members[t.name]=[],_(t))}(n)
const e=b.members[n.name],s=e[e.length-1]
t-s[m]>=86100&&y(s,n),a.members[n.name]=b.members[n.name]}function U(t,a){a.members.forEach(n(j,t))}function A(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(n(U,a)),s("fsh_guildActivity",a)}())}function E(n){b=n||{lastUpdate:0,members:{}},t>a(b.lastUpdate,0)+300&&g().then(A)}export default function(){e("fsh_guildActivity").then(E)}
//# sourceMappingURL=guildActivity-b7eebf81.js.map
