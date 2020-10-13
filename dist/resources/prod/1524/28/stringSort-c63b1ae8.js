import{ai as t,a2 as a,aS as s,c as r}from"./calfSystem-a5da5210.js"
import{a as n}from"./alpha-08ee6ec8.js"
function o(r,n,o){const e=function(t,r,n){let o=t
const e=r.split("."),c=e.length
for(let t=0;t<c;t+=1){if(a(!o,!s(o)))return n
o=o[e[t]]}return o}(r,n,o)
return t(e)?o:e}function e(t){return r.sortAsc?t:-t}function c(t,a){const s=o(t,r.sortBy,"a"),c=o(a,r.sortBy,"a")
return e(n(s,c))}export{c as a,o as p,e as s}
//# sourceMappingURL=stringSort-c63b1ae8.js.map
