import{s as t,c as n,aV as r,a7 as e,aW as s}from"./calfSystem-d49dbbd3.js"
import{c as u}from"./currentGuildId-fb556ea3.js"
import{g as o,s as i}from"./idb-a6d1a1ba.js"
import{c as m}from"./cmdExport-1b537f9c.js"
function a(t,n){const r=n||{}
i("fsh_membrList",$.extend(r,t))}function c(n){return o("fsh_membrList").then(t(a,n)),n}function f(t,n){const s=r(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return m({guild_id:t,subcmd:"guild_members"})}(n).then(t(f,n))}function b(t){return d(t).then(c)}const p=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return p.every(t(h,n,r))}(n,r)?r:b(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?b(r):o("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-819169ef.js.map
