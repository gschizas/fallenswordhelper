import{t,c as n,aT as r,a7 as e,aU as s}from"./calfSystem-02c48ff5.js"
import{c as u}from"./currentGuildId-cefcefd6.js"
import{g as o,s as c}from"./idb-49c5b621.js"
import{c as i}from"./cmdExport-3fceba30.js"
function m(t,n){const r=n||{}
c("fsh_membrList",$.extend(r,t))}function f(n){return o("fsh_membrList").then(t(m,n)),n}function a(t,n){const s=r(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return i({guild_id:t,subcmd:"guild_members"})}(n).then(t(a,n))}function b(t){return d(t).then(f)}const p=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return p.every(t(h,n,r))}(n,r)?r:b(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?b(r):o("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-3e9950fc.js.map
