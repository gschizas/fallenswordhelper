import{s as n,b3 as t,v as e,ah as r,e as s,aL as u,aj as i,b4 as o}from"./calfSystem-d06402b1.js"
function a(n,t){const e=t||{}
i("fsh_membrList",$.extend(e,n))}function c(n){return r("fsh_membrList").then(e(a,n)),n}function f(n,t,e){n[t][e.username]=e}function m(n,t){const r={}
return r[n]={},r[n].lastUpdate=u,t.forEach(e(f,r,n)),r}function b(t){return function(t){return n({guild_id:t,subcmd:"guild_members"})}(t).then(e(m,t))}function d(n){return b(n).then(c)}const h=[(n,t)=>t,(n,t)=>o(t),(n,t)=>o(t[n]),(n,t)=>"number"==typeof t[n].lastUpdate,(n,t)=>t[n].lastUpdate>u-3e5]
function l(n,t,e){return e(n,t)}function p(n,t){return function(n,t){return h.every(e(l,n,t))}(n,t)?t:d(n)}function L(n,t){return s.membrList=t[n],s.membrList}function _(n){const s=t()
return s?function(n,t){return n?d(t):r("fsh_membrList").then(e(p,t))}(n,s).then(e(L,s)):Promise.reject(new Error("no guild id"))}export{_ as g}
//# sourceMappingURL=getMembrList-fe9ec2a4.js.map
