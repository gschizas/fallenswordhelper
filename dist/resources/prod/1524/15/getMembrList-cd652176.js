import{s as t,a4 as n,c as r,ay as e,a6 as s,aN as u}from"./calfSystem-740ec4d2.js"
import{c as o}from"./currentGuildId-ce4d8404.js"
import{c}from"./cmdExport-7c541a4f.js"
function i(t,n){const r=n||{}
s("fsh_membrList",$.extend(r,t))}function m(r){return n("fsh_membrList").then(t(i,r)),r}function a(t,n,r){t[n][r.username]=r}function f(n,r){const s={}
return s[n]={},s[n].lastUpdate=e,r.forEach(t(a,s,n)),s}function d(n){return function(t){return c({guild_id:t,subcmd:"guild_members"})}(n).then(t(f,n))}function h(t){return d(t).then(m)}const p=[(t,n)=>n,(t,n)=>u(n),(t,n)=>u(n[t]),(t,n)=>"number"==typeof n[t].lastUpdate,(t,n)=>n[t].lastUpdate>e-3e5]
function b(t,n,r){return r(t,n)}function l(n,r){return function(n,r){return p.every(t(b,n,r))}(n,r)?r:h(n)}function L(t,n){return r.membrList=n[t],r.membrList}function _(r){const e=o()
return e?function(r,e){return r?h(e):n("fsh_membrList").then(t(l,e))}(r,e).then(t(L,e)):Promise.reject(new Error("no guild id"))}export{_ as g}
//# sourceMappingURL=getMembrList-cd652176.js.map
