import{t,c as n,aU as r,a7 as e,aV as s}from"./calfSystem-a2862afc.js"
import{c as u}from"./currentGuildId-e84c528e.js"
import{g as o,s as i}from"./idb-911ff7c2.js"
import{c}from"./cmdExport-356fd6f3.js"
function m(t,n){const r=n||{}
i("fsh_membrList",$.extend(r,t))}function f(n){return o("fsh_membrList").then(t(m,n)),n}function a(t,n){const s=r(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return c({guild_id:t,subcmd:"guild_members"})}(n).then(t(a,n))}function p(t){return d(t).then(f)}const b=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return b.every(t(h,n,r))}(n,r)?r:p(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?p(r):o("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-daab7ad2.js.map
