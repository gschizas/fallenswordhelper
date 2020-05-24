import{r as n,b3 as t,u as e,ah as r,c as u,aN as s,aj as i,b4 as o}from"./calfSystem-d96a3efd.js"
function a(n,t){const e=t||{}
i("fsh_membrList",$.extend(e,n))}function c(n){return r("fsh_membrList").then(e(a,n)),n}function f(n,t,e){n[t][e.username]=e}function m(n,t){const r={}
return r[n]={},r[n].lastUpdate=s,t.forEach(e(f,r,n)),r}function d(t){return function(t){return n({guild_id:t,subcmd:"guild_members"})}(t).then(e(m,t))}function b(n){return d(n).then(c)}const h=[(n,t)=>t,(n,t)=>o(t),(n,t)=>o(t[n]),(n,t)=>"number"==typeof t[n].lastUpdate,(n,t)=>t[n].lastUpdate>s-3e5]
function l(n,t,e){return e(n,t)}function p(n,t){return function(n,t){return h.every(e(l,n,t))}(n,t)?t:b(n)}function L(n,t){return u.membrList=t[n],u.membrList}function _(n){const u=t()
return u?function(n,t){return n?b(t):r("fsh_membrList").then(e(p,t))}(n,u).then(e(L,u)):Promise.reject(new Error("no guild id"))}export{_ as g}
//# sourceMappingURL=getMembrList-5baa5a87.js.map
