import{s as t,a4 as n,c as r,ay as e,a6 as s,aN as u}from"./calfSystem-1262535f.js"
import{c as o}from"./currentGuildId-5a28bdba.js"
import{c as i}from"./cmdExport-721bbaf9.js"
function c(t,n){const r=n||{}
s("fsh_membrList",$.extend(r,t))}function a(r){return n("fsh_membrList").then(t(c,r)),r}function f(t,n,r){t[n][r.username]=r}function m(n,r){const s={}
return s[n]={},s[n].lastUpdate=e,r.forEach(t(f,s,n)),s}function d(n){return function(t){return i({guild_id:t,subcmd:"guild_members"})}(n).then(t(m,n))}function b(t){return d(t).then(a)}const h=[(t,n)=>n,(t,n)=>u(n),(t,n)=>u(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function p(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return h.every(t(p,n,r))}(n,r)?r:b(n)}function L(t,n){return r.membrList=n[t],r.membrList}function _(r){const e=o()
return e?function(r,e){return r?b(e):n("fsh_membrList").then(t(l,e))}(r,e).then(t(L,e)):Promise.reject(new Error("no guild id"))}export{_ as g}
//# sourceMappingURL=getMembrList-c5d771e6.js.map
