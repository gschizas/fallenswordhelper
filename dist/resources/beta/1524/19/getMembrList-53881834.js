import{s as t,c as n,aT as r,a2 as e,aU as s}from"./calfSystem-57340987.js"
import{c as u}from"./currentGuildId-fd144a5c.js"
import{g as o,s as i}from"./idb-c55e2904.js"
import{c}from"./cmdExport-1b96d8bc.js"
function m(t,n){const r=n||{}
i("fsh_membrList",$.extend(r,t))}function a(n){return o("fsh_membrList").then(t(m,n)),n}function f(t,n){const s=r(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return c({guild_id:t,subcmd:"guild_members"})}(n).then(t(f,n))}function b(t){return d(t).then(a)}const p=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return p.every(t(h,n,r))}(n,r)?r:b(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?b(r):o("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-53881834.js.map
