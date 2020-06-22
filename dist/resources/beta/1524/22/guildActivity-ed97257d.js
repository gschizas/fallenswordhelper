import{S as t,a2 as a,t as n}from"./calfSystem-1b876afa.js"
import{g as s,s as e}from"./idb-0681f9af.js"
import{u as m,a as i,c as r,m as f,l as o,v as c,g as u}from"./indexConstants-2b72c7cb.js"
import{g as l}from"./guild-f2f2bff5.js"
let b,d,p
function g(){return b||(b=l({subcmd:"manage"})),b}function h(a){return Math.floor(Math.max(0,t-a)/86400)}function _(a){d.members[a.name].push([h(a.last_activity),a.current_stamina,a.level,a.max_stamina,t,a.vl,a.guild_xp])}const v=[(t,a)=>a.current_stamina!==t[r],(t,a)=>a.max_stamina>t[f],(t,a)=>a.level!==t[o],(t,a)=>a.vl!==t[c],(t,a)=>a.guild_xp!==t[u]]
function x(t,a,n){return n(t,a)}function y(a,s){!function(t,a){return v.some(n(x,t,a))}(a,s)?(a[i]=h(s.last_activity),a[m]=t):_(s)}function j(a,n){!function(t){d.members[t.name]||(d.members[t.name]=[],_(t))}(n)
const s=d.members[n.name],e=s[s.length-1]
t-e[m]>=86100&&y(e,n),a.members[n.name]=d.members[n.name]}function U(t,a){a.members.forEach(n(j,t))}function A(a){a&&a.r&&(p=a,function(){const a={lastUpdate:t,members:{}}
p.r.ranks.forEach(n(U,a)),e("fsh_guildActivity",a)}())}function E(n){d=n||{lastUpdate:0,members:{}},t>a(d.lastUpdate,0)+300&&g().then(A)}export default function(){s("fsh_guildActivity").then(E)}
//# sourceMappingURL=guildActivity-ed97257d.js.map
