import{R as a,a1 as t,s}from"./calfSystem-5545a3e6.js"
import{g as e,s as n}from"./idb-ab1a88c6.js"
import{u as m,a as i,c as r,m as o,l as c,v as l,g as u}from"./indexConstants-6c67af76.js"
import"./guild-1eee44a3.js"
import{d as f,l as d}from"./lastActivityToDays-a36126a2.js"
let p,b
function v(t){p.members[t.name].push([d(t.last_activity),t.current_stamina,t.level,t.max_stamina,a,t.vl,t.guild_xp])}const _=[(a,t)=>t.current_stamina!==a[r],(a,t)=>t.max_stamina>a[o],(a,t)=>t.level!==a[c],(a,t)=>t.vl!==a[l],(a,t)=>t.guild_xp!==a[u]]
function g(a,t,s){return s(a,t)}function h(t,e){!function(a,t){return _.some(s(g,a,t))}(t,e)?(t[i]=d(e.last_activity),t[m]=a):v(e)}function y(t,s){!function(a){p.members[a.name]||(p.members[a.name]=[],v(a))}(s)
const e=p.members[s.name],n=e[e.length-1]
a-n[m]>=86100&&h(n,s),t.members[s.name]=p.members[s.name]}function x(a,t){t.members.forEach(s(y,a))}function j(t){t&&t.r&&(b=t,function(){const t={lastUpdate:a,members:{}}
b.r.ranks.forEach(s(x,t)),n("fsh_guildActivity",t)}())}function A(s){p=s||{lastUpdate:0,members:{}},a>t(p.lastUpdate,0)+300&&f().then(j)}export default function(){e("fsh_guildActivity").then(A)}
//# sourceMappingURL=guildActivity-99451592.js.map
