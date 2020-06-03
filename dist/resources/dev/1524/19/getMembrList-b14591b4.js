import{s as t,c as n,aV as r,a7 as e,aW as s}from"./calfSystem-f7574730.js"
import{c as u}from"./currentGuildId-3e98e06d.js"
import{g as o,s as i}from"./idb-14a57c5b.js"
import{c as m}from"./cmdExport-da1f542a.js"
function a(t,n){const r=n||{}
i("fsh_membrList",$.extend(r,t))}function c(n){return o("fsh_membrList").then(t(a,n)),n}function f(t,n){const s=r(n.map(t=>[t.username,t]))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return m({guild_id:t,subcmd:"guild_members"})}(n).then(t(f,n))}function p(t){return d(t).then(c)}const b=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return b.every(t(h,n,r))}(n,r)?r:p(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?p(r):o("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-b14591b4.js.map
