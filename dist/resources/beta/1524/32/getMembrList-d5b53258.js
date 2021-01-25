import{t,c as n,aA as r,a5 as e,ad as s}from"./calfSystem-26bcf570.js"
import{c as u}from"./currentGuildId-b9dbffa6.js"
import{c as o}from"./cmdExport-3b45fb85.js"
import{g as i,s as f}from"./idb-47b3fdf8.js"
function m(t,n){const r=n||{}
f("fsh_membrList",$.extend(r,t))}function c(n){return i("fsh_membrList").then(t(m,n)),n}function a(t,n){const s=r(n.map((t=>[t.username,t])))
return{[t]:{lastUpdate:e,...s}}}function d(n){return function(t){return o({guild_id:t,subcmd:"guild_members"})}(n).then(t(a,n))}function b(t){return d(t).then(c)}const p=[(t,n)=>n,(t,n)=>s(n),(t,n)=>s(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function h(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return p.every(t(h,n,r))}(n,r)?r:b(n)}function g(t,r){return n.membrList=r[t],n.membrList}function j(n){const r=u()
return r?function(n,r){return n?b(r):i("fsh_membrList").then(t(l,r))}(n,r).then(t(g,r)):Promise.reject(new Error("no guild id"))}export{j as g}
//# sourceMappingURL=getMembrList-d5b53258.js.map
