import{t,c as n,ao as r,a6 as e,ae as s}from"./calfSystem-19a5d332.js"
import{c as o}from"./currentGuildId-daa4c793.js"
import{c as u}from"./cmdExport-bf03c29e.js"
import{g as i,s as m}from"./idb-faef0351.js"
function a(t,n){const r=n||{}
m("fsh_membrList",$.extend(r,t))}function c(n){return i("fsh_membrList").then(t(a,n)),n}function f(t,n){const s=r(n.map((t=>[t.username,t])))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return u({guild_id:t,subcmd:"guild_members"})}(n).then(t(f,n))}function p(t){return d(t).then(c)}const b=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return b.every(t(h,n,r))}(n,r)?r:p(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=o()
return r?function(n,r){return n?p(r):i("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-24395dcd.js.map
