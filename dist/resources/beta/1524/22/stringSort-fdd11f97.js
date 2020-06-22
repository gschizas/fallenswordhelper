import{ai as t,a2 as a,aT as s,c as r}from"./calfSystem-1b876afa.js"
import{a as n}from"./alpha-513ff330.js"
function o(r,n,o){const f=function(t,r,n){let o=t
const f=r.split("."),c=f.length
for(let t=0;t<c;t+=1){if(a(!o,!s(o)))return n
o=o[f[t]]}return o}(r,n,o)
return t(f)?o:f}function f(t){return r.sortAsc?t:-t}function c(t,a){const s=o(t,r.sortBy,"a"),c=o(a,r.sortBy,"a")
return f(n(s,c))}export{c as a,o as p,f as s}
//# sourceMappingURL=stringSort-fdd11f97.js.map
