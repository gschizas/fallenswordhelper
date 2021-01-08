import{t,c as n,aR as r,a4 as e,aS as s}from"./calfSystem-ebf4b17d.js"
import{c as u}from"./currentGuildId-f7450bbe.js"
import{g as o,s as i}from"./idb-b7d9067e.js"
import{c as m}from"./cmdExport-6e99c1e8.js"
function c(t,n){const r=n||{}
i("fsh_membrList",$.extend(r,t))}function f(n){return o("fsh_membrList").then(t(c,n)),n}function a(t,n){const s=r(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return m({guild_id:t,subcmd:"guild_members"})}(n).then(t(a,n))}function b(t){return d(t).then(f)}const p=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return p.every(t(h,n,r))}(n,r)?r:b(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?b(r):o("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-ba3d7d3d.js.map
