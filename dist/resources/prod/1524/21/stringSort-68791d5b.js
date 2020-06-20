import{ai as t,a2 as s,aT as a,c as r}from"./calfSystem-2741d97b.js"
import{a as n}from"./alpha-a3cc277e.js"
function o(r,n,o){const c=function(t,r,n){let o=t
const c=r.split("."),e=c.length
for(let t=0;t<e;t+=1){if(s(!o,!a(o)))return n
o=o[c[t]]}return o}(r,n,o)
return t(c)?o:c}function c(t){return r.sortAsc?t:-t}function e(t,s){const a=o(t,r.sortBy,"a"),e=o(s,r.sortBy,"a")
return c(n(a,e))}export{e as a,o as p,c as s}
//# sourceMappingURL=stringSort-68791d5b.js.map
