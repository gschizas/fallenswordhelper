import{ah as t,a0 as a,aU as s,c as r}from"./calfSystem-8b6534a5.js"
import{a as n}from"./alpha-a97dc6ad.js"
function o(r,n,o){const c=function(t,r,n){let o=t
const c=r.split("."),e=c.length
for(let t=0;t<e;t+=1){if(a(!o,!s(o)))return n
o=o[c[t]]}return o}(r,n,o)
return t(c)?o:c}function c(t){return r.sortAsc?t:-t}function e(t,a){const s=o(t,r.sortBy,"a"),e=o(a,r.sortBy,"a")
return c(n(s,e))}export{e as a,o as p,c as s}
//# sourceMappingURL=stringSort-e87c1276.js.map
