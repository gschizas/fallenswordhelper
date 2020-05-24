import{r as n,b2 as t,u as e,ag as r,c as u,aK as s,ai as i,b3 as o}from"./calfSystem-371c414c.js"
function c(n,t){const e=t||{}
i("fsh_membrList",$.extend(e,n))}function a(n){return r("fsh_membrList").then(e(c,n)),n}function f(n,t,e){n[t][e.username]=e}function m(n,t){const r={}
return r[n]={},r[n].lastUpdate=s,t.forEach(e(f,r,n)),r}function b(t){return function(t){return n({guild_id:t,subcmd:"guild_members"})}(t).then(e(m,t))}function d(n){return b(n).then(a)}const h=[(n,t)=>t,(n,t)=>o(t),(n,t)=>o(t[n]),(n,t)=>"number"==typeof t[n].lastUpdate,(n,t)=>t[n].lastUpdate>s-3e5]
function l(n,t,e){return e(n,t)}function p(n,t){return function(n,t){return h.every(e(l,n,t))}(n,t)?t:d(n)}function g(n,t){return u.membrList=t[n],u.membrList}function L(n){const u=t()
return u?function(n,t){return n?d(t):r("fsh_membrList").then(e(p,t))}(n,u).then(e(g,u)):Promise.reject(new Error("no guild id"))}export{L as g}
//# sourceMappingURL=getMembrList-4a06ce80.js.map
